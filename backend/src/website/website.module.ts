import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WebsiteController } from './website.controller';
import { WebsiteService } from './website.service';
import { Website, WebsiteSchema } from './website.schema';
// import { AIModule } from '../ai/ai.module'; // Ready for AI integration

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Website.name, schema: WebsiteSchema }]),
    // AIModule, // Uncomment when ready to use AI
  ],
  controllers: [WebsiteController],
  providers: [WebsiteService],
})
export class WebsiteModule {}