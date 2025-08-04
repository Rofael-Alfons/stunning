#!/bin/bash

echo "Setting up environment and starting backend..."

export MONGODB_URI="mongodb+srv://rofaalfons7:veryverystunning@stunningdb.hivrlqo.mongodb.net/?retryWrites=true&w=majority&appName=stunningdb"
export PORT=3001
export NODE_ENV=development

echo "MongoDB URI configured for Atlas"
echo "Starting backend server..."

npm run start:dev