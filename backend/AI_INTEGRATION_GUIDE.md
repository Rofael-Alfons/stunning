# 🤖 AI Integration Guide

This guide shows how to enable AI-powered website generation in your Stunning app.

## 🔧 Current Status

- ✅ **Static Generation**: Currently active (default)
- 🔄 **AI Integration**: Ready but disabled
- 🎯 **Toggle Ready**: Can switch between modes via environment variable

## 🚀 How to Enable AI Generation

### Step 1: Install AI Dependencies

```bash
# Choose one of these AI providers:

# Option A: OpenAI (GPT-4, GPT-3.5)
npm install openai

# Option B: Anthropic (Claude)
npm install @anthropic-ai/sdk

# Option C: Both (recommended)
npm install openai @anthropic-ai/sdk
```

### Step 2: Get API Keys

**For OpenAI:**
1. Go to https://platform.openai.com
2. Create account and get API key
3. Add to `.env` file: `OPENAI_API_KEY=your_key_here`

**For Anthropic:**
1. Go to https://console.anthropic.com
2. Create account and get API key
3. Add to `.env` file: `ANTHROPIC_API_KEY=your_key_here`

### Step 3: Update Environment Variables

Add to your `.env` file:
```env
# Enable AI Generation
USE_AI_GENERATION=true

# API Keys (choose one or both)
OPENAI_API_KEY=your_openai_api_key_here
ANTHROPIC_API_KEY=your_anthropic_api_key_here
```

### Step 4: Uncomment AI Code

In `src/website/website.service.ts`:
```typescript
// 1. Uncomment the import
import { AIService } from '../ai/ai.service';

// 2. Uncomment in constructor
constructor(
  @InjectModel(Website.name) private websiteModel: Model<WebsiteDocument>,
  private aiService: AIService,
) {}

// 3. Uncomment in generateWithAI method
return await this.aiService.generateWebsiteSections(idea);
```

In `src/website/website.module.ts`:
```typescript
// Uncomment the import and module
import { AIModule } from '../ai/ai.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Website.name, schema: WebsiteSchema }]),
    AIModule, // Uncomment this line
  ],
  // ...
})
```

### Step 5: Restart Server

```bash
npm run start:dev
```

## 🎯 How It Works

### Current Flow (Static):
```
User Input → Static Logic → Database → Frontend
```

### AI-Enhanced Flow:
```
User Input → AI API Call → Dynamic Response → Database → Frontend
```

### Hybrid Approach:
- **Environment Variable**: `USE_AI_GENERATION=true/false`
- **Fallback**: If AI fails, automatically uses static generation
- **Zero Downtime**: Can toggle without code changes

## 🔄 AI Generation Process

1. **User Input**: "Landing page for a bakery"
2. **AI Prompt**: Structured prompt sent to AI model
3. **AI Response**: JSON with 3 website sections
4. **Parsing**: Extract sections from AI response
5. **Fallback**: Use static generation if AI fails
6. **Database**: Save generated sections
7. **Frontend**: Display real-time results

## 🛡️ Error Handling

- **API Failures**: Automatic fallback to static generation
- **Invalid Responses**: Parsing with multiple strategies
- **Rate Limits**: Graceful degradation
- **Network Issues**: Retry logic with exponential backoff

## 📊 Expected AI Output

```json
{
  "sections": [
    {
      "name": "Hero",
      "content": "Welcome to Fresh Delights Bakery! Experience the warmth of freshly baked artisan breads, pastries, and cakes made with love and traditional recipes passed down through generations."
    },
    {
      "name": "About",
      "content": "Our family-owned bakery has been serving the community for over 20 years, combining time-honored baking techniques with the finest local ingredients to create unforgettable flavors."
    },
    {
      "name": "Contact",
      "content": "Visit us at our cozy storefront or place your orders online. We're here to make your special occasions even sweeter with our custom cakes and daily fresh selections."
    }
  ]
}
```

## 🎨 Benefits of AI Integration

- **Dynamic Content**: Unique content for every idea
- **Context-Aware**: Understands business types and generates relevant sections
- **Professional Quality**: AI-written copy sounds natural and engaging
- **Scalable**: Handles any type of business or website idea
- **Consistent**: Always generates exactly 3 sections as needed

## 🔧 Configuration Options

```typescript
// In ai.service.ts, you can customize:

// Model selection
model: 'gpt-4', // or 'gpt-3.5-turbo', 'claude-3-sonnet'

// Creativity level
temperature: 0.7, // 0.0 = deterministic, 1.0 = creative

// Response length
max_tokens: 1000, // Adjust based on needs

// Response format
// JSON mode ensures structured output
```

## 🚨 Important Notes

- **API Costs**: AI APIs charge per token - monitor usage
- **Rate Limits**: Most APIs have request limits
- **Fallback**: Static generation ensures the app never breaks
- **Security**: Keep API keys secure and never commit to Git
- **Testing**: Test with small requests first

## 🎯 Quick Toggle Commands

**Enable AI:**
```bash
echo USE_AI_GENERATION=true >> .env
```

**Disable AI:**
```bash
echo USE_AI_GENERATION=false >> .env
```

**Check Current Status:**
```bash
type .env | findstr USE_AI_GENERATION
```

Your app is now **AI-ready** but continues to work exactly as before! 🎉