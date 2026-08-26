import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
    private transporter: nodemailer.Transporter;
    private readonly logger = new Logger(EmailService.name);

    constructor() {
        // Initialize transporter with environment variables
        // Fallback to simple console logging if no credentials provided (Dev Mode)
        if (process.env.SMTP_HOST && process.env.SMTP_USER) {
            this.transporter = nodemailer.createTransport({
                host: process.env.SMTP_HOST,
                port: Number(process.env.SMTP_PORT) || 587,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASS,
                },
            });
            this.logger.log(`Email Service configured with host: ${process.env.SMTP_HOST}`);
        } else {
            this.logger.warn('SMTP credentials not found. Email Service running in DEBUG mode (logging emails to console).');
        }
    }

    async sendLeadNotification(to: string, leadData: { name: string, email: string, message: string, propertyTitle: string, propertyLink: string }) {
        const subject = `New Lead for ${leadData.propertyTitle} - RentifyAI`;
        const html = `
            <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                <h2 style="color: #0f172a;">You have a new inquiry! 🚀</h2>
                <p><strong>Property:</strong> <a href="${leadData.propertyLink}">${leadData.propertyTitle}</a></p>
                <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
                <p><strong>Buyer Name:</strong> ${leadData.name}</p>
                <p><strong>Email:</strong> ${leadData.email}</p>
                <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px; margin-top: 10px;">
                    <p style="margin: 0; color: #334155; font-style: italic;">"${leadData.message}"</p>
                </div>
                <br>
                <a href="${process.env.NEXT_PUBLIC_APP_URL}/agent/leads" style="background-color: #000; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">View in Dashboard</a>
            </div>
        `;

        if (this.transporter) {
            try {
                await this.transporter.sendMail({
                    from: '"RentifyAI" <noreply@rentify.ai>',
                    to,
                    subject,
                    html,
                });
                this.logger.log(`Lead notification sent to ${to}`);
            } catch (error) {
                this.logger.error(`Failed to send email to ${to}`, error.stack);
            }
        } else {
            // Debug Mode
            this.logger.log(`[DEBUG - Email Warning] To: ${to} | Subject: ${subject}`);
        }
    }

    async sendPasswordReset(to: string, resetLink: string) {
        const subject = `Reset Your Password - RentifyAI`;
        const html = `
            <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                <h2 style="color: #0f172a;">Password Reset Request 🔐</h2>
                <p>You requested to reset your password. Click the button below to proceed:</p>
                <br>
                <a href="${resetLink}" style="background-color: #000; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Reset Password</a>
                <br><br>
                <p style="font-size: 12px; color: #666;">If you didn't request this, please ignore this email. The link expires in 1 hour.</p>
            </div>
        `;

        if (this.transporter) {
            try {
                await this.transporter.sendMail({
                    from: '"RentifyAI Security" <noreply@rentify.ai>',
                    to,
                    subject,
                    html,
                });
                this.logger.log(`Password reset email sent to ${to}`);
            } catch (error) {
                this.logger.error(`Failed to send email to ${to}`, error.stack);
            }
        } else {
            this.logger.log(`[DEBUG - Email Warning] To: ${to} | Link: ${resetLink}`);
        }
    }

    async sendEmailVerification(to: string, verifyLink: string) {
        const subject = `Verify Your Email - RentifyAI`;
        const html = `
            <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                <h2 style="color: #0f172a;">Welcome to RentifyAI! 🏢</h2>
                <p>Please verify your email address to activate your account:</p>
                <br>
                <a href="${verifyLink}" style="background-color: #000; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Verify Email</a>
                <br><br>
                <p style="font-size: 12px; color: #666;">If you didn't sign up for an account, please ignore this email.</p>
            </div>
        `;

        if (this.transporter) {
            try {
                await this.transporter.sendMail({
                    from: '"RentifyAI" <noreply@rentify.ai>',
                    to,
                    subject,
                    html,
                });
                this.logger.log(`Verification email sent to ${to}`);
            } catch (error) {
                this.logger.error(`Failed to send email to ${to}`, error.stack);
            }
        } else {
            this.logger.log(`[DEBUG - Email Warning] To: ${to} | Link: ${verifyLink}`);
        }
    }
}
