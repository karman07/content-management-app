import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt'; // Import JwtModule
import { ContentController } from './content.controller';
import { ContentService } from './content.service';
import { Content, ContentSchema } from './schema/content.schema';
import { AuthModule } from '../auth/auth.module'; // Import AuthModule if it's in a separate module

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Content.name, schema: ContentSchema }]),
    JwtModule.register({
      secret: process.env.JWT_SECRET, // Ensure your secret is set here
      signOptions: { expiresIn: '60m' }, // Adjust token expiration as needed
    }),
    AuthModule, // Include AuthModule to ensure AuthService is available
  ],
  controllers: [ContentController],
  providers: [ContentService],
})
export class ContentModule {}
