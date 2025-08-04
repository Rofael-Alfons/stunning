@echo off
echo Setting up environment and starting backend...

set MONGODB_URI=mongodb+srv://rofaalfons7:veryverystunning@stunningdb.hivrlqo.mongodb.net/?retryWrites=true^&w=majority^&appName=stunningdb
set PORT=3001
set NODE_ENV=development

echo MongoDB URI configured for Atlas
echo Starting backend server...

npm run start:dev