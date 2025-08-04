export const aiConfig = {
  // Toggle AI generation on/off
  enabled: process.env.USE_AI_GENERATION === 'true',
  
  // API Keys
  openaiApiKey: process.env.OPENAI_API_KEY,
  anthropicApiKey: process.env.ANTHROPIC_API_KEY,
  
  // AI Model Settings
  openai: {
    model: 'gpt-4', // or 'gpt-3.5-turbo' for faster/cheaper
    temperature: 0.7,
    maxTokens: 1000,
  },
  
  anthropic: {
    model: 'claude-3-sonnet-20240229',
    maxTokens: 1000,
  },
  
  // Fallback settings
  enableFallback: true,
  fallbackToStatic: true,
  
  // Retry settings
  maxRetries: 3,
  retryDelay: 1000, // ms
};

export const isAIEnabled = (): boolean => {
  return aiConfig.enabled && (
    !!aiConfig.openaiApiKey || 
    !!aiConfig.anthropicApiKey
  );
};

export const getAvailableProviders = (): string[] => {
  const providers = [];
  if (aiConfig.openaiApiKey) providers.push('openai');
  if (aiConfig.anthropicApiKey) providers.push('anthropic');
  return providers;
};