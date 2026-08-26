import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import * as path from 'path';

/**
 * StorageService handles file uploads for the platform.
 * Supports 'local' and 's3' drivers.
 * Rule: ATOMICITY and SCALABILITY focus.
 */
@Injectable()
export class StorageService implements OnModuleInit {
    private s3: S3Client;
    private readonly logger = new Logger(StorageService.name);

    private readonly DRIVER = process.env.STORAGE_DRIVER || 'local';
    private readonly BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME;
    private readonly REGION = process.env.AWS_REGION || 'ap-south-1';

    // Internal paths for local storage
    private readonly LOCAL_UPLOAD_DIR = 'public/uploads';
    private readonly STATIC_SERVE_PATH = '/static/uploads';

    async onModuleInit() {
        if (this.DRIVER === 's3') {
            this.s3 = new S3Client({
                region: this.REGION,
                credentials: {
                    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
                    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
                },
            });
            this.logger.log(`Storage: Initialized S3 Driver (Bucket: ${this.BUCKET_NAME})`);
        } else {
            this.logger.log('Storage: Initialized LOCAL Driver');
            const fullPath = path.join(process.cwd(), this.LOCAL_UPLOAD_DIR);
            if (!fs.existsSync(fullPath)) {
                fs.mkdirSync(fullPath, { recursive: true });
                this.logger.verbose(`Created storage directory: ${fullPath}`);
            }
        }
    }

    /**
     * Uploads a file and returns the full URL.
     * @param file - Multer file object
     * @param folder - Destination folder (e.g., 'properties', 'avatars')
     */
    async uploadFile(file: Express.Multer.File, folder: string = 'properties'): Promise<string> {
        const fileExt = path.extname(file.originalname).toLowerCase();
        const filename = `${folder}/${uuidv4()}${fileExt}`;

        if (this.DRIVER === 's3') {
            return this.uploadToS3(file, filename);
        } else {
            return this.uploadToLocal(file, filename);
        }
    }

    private async uploadToS3(file: Express.Multer.File, key: string): Promise<string> {
        try {
            await this.s3.send(new PutObjectCommand({
                Bucket: this.BUCKET_NAME,
                Key: key,
                Body: file.buffer,
                ContentType: file.mimetype,
                // Note: Ensure bucket is public or use CloudFront for access
            }));

            // Production Rule: Use CloudFront for media delivery if configuration exists
            const cloudFrontDomain = process.env.AWS_CLOUDFRONT_DOMAIN;
            if (cloudFrontDomain) {
                return `https://${cloudFrontDomain}/${key}`;
            }

            return `https://${this.BUCKET_NAME}.s3.${this.REGION}.amazonaws.com/${key}`;
        } catch (error) {
            this.logger.error(`S3 Upload Error for key: ${key}`, error.stack);
            throw new Error('Cloud storage synchronization failed');
        }
    }

    private async uploadToLocal(file: Express.Multer.File, key: string): Promise<string> {
        try {
            const localPath = path.join(process.cwd(), this.LOCAL_UPLOAD_DIR, key);
            const dir = path.dirname(localPath);

            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }

            fs.writeFileSync(localPath, file.buffer);

            // Construct full URL for the client
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
            return `${apiUrl}${this.STATIC_SERVE_PATH}/${key}`;
        } catch (error) {
            this.logger.error(`Local Upload Error for key: ${key}`, error.stack);
            throw new Error('Local file storage failed');
        }
    }
}

