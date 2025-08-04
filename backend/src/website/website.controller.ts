import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { WebsiteService } from './website.service';

@Controller('api/websites')
export class WebsiteController {
  constructor(private readonly websiteService: WebsiteService) {}

  @Post('generate')
  async generateWebsite(@Body('idea') idea: string) {
    if (!idea || idea.trim().length === 0) {
      throw new Error('Website idea is required');
    }

    try {
      const website = await this.websiteService.generateWebsite(idea.trim());
      return {
        success: true,
        data: website,
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to generate website',
      };
    }
  }

  @Get()
  async getAllWebsites() {
    try {
      const websites = await this.websiteService.getAllWebsites();
      return {
        success: true,
        data: websites,
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to fetch websites',
      };
    }
  }

  @Get(':id')
  async getWebsiteById(@Param('id') id: string) {
    try {
      const website = await this.websiteService.getWebsiteById(id);
      if (!website) {
        return {
          success: false,
          error: 'Website not found',
        };
      }
      return {
        success: true,
        data: website,
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to fetch website',
      };
    }
  }
}