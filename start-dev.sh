#!/bin/bash

echo "Starting Stunning Website Generator..."
echo

echo "[1/2] Starting Backend Server..."
cd backend && npm run start:dev &
BACKEND_PID=$!

echo "[2/2] Starting Frontend Server..."
sleep 3
cd ../frontend && npm run dev &
FRONTEND_PID=$!

echo
echo "Both servers are starting up!"
echo "Frontend: http://localhost:3000"
echo "Backend:  http://localhost:3001"
echo
echo "Press Ctrl+C to stop both servers"

# Wait for user to stop
wait $BACKEND_PID $FRONTEND_PID