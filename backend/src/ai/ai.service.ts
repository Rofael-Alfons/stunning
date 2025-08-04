import { Injectable } from '@nestjs/common';
import { aiConfig, isAIEnabled } from '../config/ai.config';
// import OpenAI from 'openai'; // Uncomment when ready
// import Anthropic from '@anthropic-ai/sdk'; // Uncomment when ready

@Injectable()
export class AIService {
  // private openai: OpenAI; // Uncomment when ready
  // private anthropic: Anthropic; // Uncomment when ready

  constructor() {
    // Initialize AI clients when ready
    // if (aiConfig.openaiApiKey) {
    //   this.openai = new OpenAI({
    //     apiKey: aiConfig.openaiApiKey,
    //   });
    // }
    
    // if (aiConfig.anthropicApiKey) {
    //   this.anthropic = new Anthropic({
    //     apiKey: aiConfig.anthropicApiKey,
    //   });
    // }
  }

  async generateWebsiteSections(idea: string): Promise<Array<{ name: string; content: string }>> {
    // Check if AI is enabled and configured
    if (!isAIEnabled()) {
      console.log('🤖 AI generation not enabled or configured. Using fallback.');
      return this.fallbackGeneration(idea);
    }

    try {
      const prompt = this.buildPrompt(idea);
      
      // TODO: Uncomment when AI dependencies are installed
      // const response = await this.openai.chat.completions.create({
      //   model: aiConfig.openai.model,
      //   messages: [
      //     {
      //       role: 'system',
      //       content: 'You are a professional web designer and copywriter. Generate website sections based on user ideas.'
      //     },
      //     {
      //       role: 'user',
      //       content: prompt
      //     }
      //   ],
      //   temperature: aiConfig.openai.temperature,
      //   max_tokens: aiConfig.openai.maxTokens,
      // });

      // const aiContent = response.choices[0]?.message?.content;
      // return this.parseAIResponse(aiContent);

      // For now, return fallback
      console.log('🤖 AI code ready but commented out. Using fallback.');
      return this.fallbackGeneration(idea);

    } catch (error) {
      console.error('AI API Error:', error);
      // Fallback to static generation if AI fails
      return this.fallbackGeneration(idea);
    }
  }

  private buildPrompt(idea: string): string {
    return `
Create 3 website sections for: "${idea}"

Requirements:
- Generate exactly 3 sections
- Choose appropriate section types (Hero, About, Services, Contact, Menu, Portfolio, etc.)
- Write compelling, professional content for each section
- Keep content concise but engaging (2-3 sentences per section)
- Make it specific to the business idea provided

Format your response as JSON:
{
  "sections": [
    {"name": "SectionName", "content": "Section content here..."},
    {"name": "SectionName", "content": "Section content here..."},
    {"name": "SectionName", "content": "Section content here..."}
  ]
}
    `.trim();
  }

  private parseAIResponse(aiContent: string): Array<{ name: string; content: string }> {
    try {
      // Try to parse JSON response
      const parsed = JSON.parse(aiContent);
      if (parsed.sections && Array.isArray(parsed.sections)) {
        return parsed.sections.slice(0, 3); // Ensure only 3 sections
      }
    } catch (error) {
      console.error('Failed to parse AI response:', error);
    }

    // Fallback parsing if JSON fails
    return this.parseTextResponse(aiContent);
  }

  private parseTextResponse(content: string): Array<{ name: string; content: string }> {
    // Parse text-based response if JSON parsing fails
    const sections = [];
    const lines = content.split('\n').filter(line => line.trim());
    
    let currentSection = null;
    let currentContent = '';

    for (const line of lines) {
      if (line.includes(':') && (line.includes('Hero') || line.includes('About') || line.includes('Contact') || line.includes('Services') || line.includes('Menu') || line.includes('Portfolio'))) {
        if (currentSection) {
          sections.push({ name: currentSection, content: currentContent.trim() });
        }
        currentSection = line.split(':')[0].trim();
        currentContent = line.split(':').slice(1).join(':').trim();
      } else if (currentSection && line.trim()) {
        currentContent += ' ' + line.trim();
      }
    }

    if (currentSection && sections.length < 3) {
      sections.push({ name: currentSection, content: currentContent.trim() });
    }

    return sections.slice(0, 3);
  }

  private fallbackGeneration(idea: string): Array<{ name: string; content: string }> {
    // Your existing static generation logic as fallback
    const ideaLower = idea.toLowerCase();
    
    return [
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
    return 'Your trusted partner for exceptional quality and service.';
  }

  private generateAboutContent(idea: string): string {
    if (idea.includes('bakery')) return 'Our family-owned bakery has been serving the community for years with authentic recipes passed down through generations.';
    if (idea.includes('restaurant')) return 'We are passionate about creating memorable dining experiences with fresh, locally-sourced ingredients.';
    return 'We are dedicated to providing exceptional value and building lasting relationships with our customers.';
  }
}