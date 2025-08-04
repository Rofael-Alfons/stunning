import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Website, WebsiteDocument } from './website.schema';
// import { AIService } from '../ai/ai.service'; // Ready for AI integration

@Injectable()
export class WebsiteService {
  constructor(
    @InjectModel(Website.name) private websiteModel: Model<WebsiteDocument>,
    // private aiService: AIService, // Ready for AI integration
  ) {}

  async generateWebsite(idea: string): Promise<Website> {
    // Toggle between AI and static generation
    const useAI = process.env.USE_AI_GENERATION === 'true';
    
    const sections = useAI 
      ? await this.generateWithAI(idea)
      : this.generateSections(idea);

    const website = new this.websiteModel({
      idea,
      sections,
    });

    return website.save();
  }

  async getAllWebsites(): Promise<Website[]> {
    return this.websiteModel.find().sort({ createdAt: -1 }).exec();
  }

  async getWebsiteById(id: string): Promise<Website> {
    return this.websiteModel.findById(id).exec();
  }

  // AI Generation Method - Ready for integration
  private async generateWithAI(idea: string): Promise<Array<{ name: string; content: string }>> {
    try {
      // TODO: Uncomment when ready to use AI
      // return await this.aiService.generateWebsiteSections(idea);
      
      // For now, return static generation with a note
      console.log('🤖 AI generation requested but not enabled. Using static generation.');
      return this.generateSections(idea);
      
    } catch (error) {
      console.error('AI generation failed, falling back to static:', error);
      return this.generateSections(idea);
    }
  }

  private generateSections(idea: string): Array<{ name: string; content: string }> {
    // Simple logic to generate relevant sections based on the idea
    const ideaLower = idea.toLowerCase();
    
    let sections = [
      {
        name: 'Hero',
        content: `Welcome to ${this.extractBusinessName(idea)}! ${this.generateHeroContent(ideaLower)}`
      },
      {
        name: 'About',
        content: this.generateAboutContent(ideaLower)
      },
      {
        name: 'Contact',
        content: 'Get in touch with us today! We\'d love to hear from you and discuss how we can help with your needs.'
      }
    ];

    // Add specific sections based on business type
    if (ideaLower.includes('restaurant') || ideaLower.includes('bakery') || ideaLower.includes('cafe')) {
      sections.splice(2, 0, {
        name: 'Menu',
        content: 'Discover our delicious offerings, crafted with the finest ingredients and served with passion.'
      });
    } else if (ideaLower.includes('portfolio') || ideaLower.includes('designer') || ideaLower.includes('artist')) {
      sections.splice(2, 0, {
        name: 'Portfolio',
        content: 'Explore our latest work and creative projects that showcase our skills and artistic vision.'
      });
    } else if (ideaLower.includes('shop') || ideaLower.includes('store') || ideaLower.includes('ecommerce')) {
      sections.splice(2, 0, {
        name: 'Products',
        content: 'Browse our carefully curated selection of products designed to meet your needs and exceed your expectations.'
      });
    } else {
      sections.splice(2, 0, {
        name: 'Services',
        content: 'We provide exceptional services tailored to your specific needs with professional expertise and dedication.'
      });
    }

    return sections.slice(0, 3); // Return only first 3 sections
  }

  private extractBusinessName(idea: string): string {
    const words = idea.split(' ');
    if (words.includes('for') && words.includes('a')) {
      const forIndex = words.indexOf('for');
      const aIndex = words.lastIndexOf('a');
      if (forIndex > aIndex) {
        return words.slice(aIndex + 1, forIndex).join(' ');
      }
    }
    return 'Your Business';
  }

  private generateHeroContent(idea: string): string {
    if (idea.includes('bakery')) return 'Freshly baked goods made with love and traditional recipes.';
    if (idea.includes('restaurant')) return 'Experience culinary excellence with our chef-crafted dishes.';
    if (idea.includes('portfolio')) return 'Showcasing creativity and professional expertise.';
    if (idea.includes('agency')) return 'Professional services that drive results for your business.';
    if (idea.includes('shop') || idea.includes('store')) return 'Quality products curated just for you.';
    return 'Your trusted partner for exceptional quality and service.';
  }

  private generateAboutContent(idea: string): string {
    if (idea.includes('bakery')) return 'Our family-owned bakery has been serving the community for years with authentic recipes passed down through generations.';
    if (idea.includes('restaurant')) return 'We are passionate about creating memorable dining experiences with fresh, locally-sourced ingredients.';
    if (idea.includes('portfolio')) return 'With years of experience and a passion for innovation, we bring creative visions to life.';
    if (idea.includes('agency')) return 'Our team of experts combines strategy, creativity, and technology to deliver outstanding results.';
    return 'We are dedicated to providing exceptional value and building lasting relationships with our customers.';
  }
}