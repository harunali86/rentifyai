import { Module, Global } from '@nestjs/common';
import { EmailService } from './email.service';

@Global() // Global module request so we don't have to import it everywhere
@Module({
    providers: [EmailService],
    exports: [EmailService],
})
export class EmailModule { }
