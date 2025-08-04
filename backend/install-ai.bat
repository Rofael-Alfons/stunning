@echo off
echo Installing AI dependencies...

echo [1/3] Installing OpenAI SDK...
npm install openai

echo [2/3] Installing Anthropic SDK (alternative)...
npm install @anthropic-ai/sdk

echo [3/3] Installing additional utilities...
npm install axios

echo.
echo ✅ AI dependencies installed successfully!
echo.
echo Next steps:
echo 1. Add your API key to .env file:
echo    OPENAI_API_KEY=your_api_key_here
echo    or
echo    ANTHROPIC_API_KEY=your_api_key_here
echo.
echo 2. Restart the backend server
echo.
pause