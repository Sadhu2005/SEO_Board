#!/bin/bash

# FlowMind AI - Quick Start Script
# This script helps you quickly start both backend and frontend

echo "🧠 FlowMind AI - Starting Development Environment"
echo "=================================================="

# Check if we're in the right directory
if [ ! -d "backend" ] || [ ! -d "frontend" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check prerequisites
echo ""
echo "📋 Checking prerequisites..."

if ! command_exists python3 && ! command_exists python; then
    echo "❌ Python not found. Please install Python 3.9+"
    exit 1
fi
echo "✅ Python found"

if ! command_exists node; then
    echo "❌ Node.js not found. Please install Node.js 18+"
    exit 1
fi
echo "✅ Node.js found"

if ! command_exists npm; then
    echo "❌ npm not found. Please install npm"
    exit 1
fi
echo "✅ npm found"

# Check if MongoDB is running
if ! command_exists mongod; then
    echo "⚠️  MongoDB not found in PATH. Make sure MongoDB is installed and running."
fi

echo ""
echo "🔧 Setting up backend..."
cd backend

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv || python -m venv venv
fi

# Activate virtual environment
echo "Activating virtual environment..."
source venv/bin/activate 2>/dev/null || source venv/Scripts/activate 2>/dev/null

# Install backend dependencies
if [ ! -f "venv/installed.flag" ]; then
    echo "Installing backend dependencies..."
    pip install -r requirements.txt
    touch venv/installed.flag
else
    echo "✅ Backend dependencies already installed"
fi

# Check for .env file
if [ ! -f ".env" ]; then
    echo "⚠️  No .env file found. Copying from .env.example..."
    cp .env.example .env
    echo "⚠️  Please edit backend/.env with your API keys before continuing"
    echo "Press Enter when ready..."
    read
fi

cd ..

echo ""
echo "🎨 Setting up frontend..."
cd frontend

# Install frontend dependencies
if [ ! -d "node_modules" ]; then
    echo "Installing frontend dependencies..."
    npm install
else
    echo "✅ Frontend dependencies already installed"
fi

# Check for .env file
if [ ! -f ".env" ]; then
    echo "⚠️  No .env file found. Copying from .env.example..."
    cp .env.example .env
fi

cd ..

echo ""
echo "🚀 Starting FlowMind AI..."
echo ""
echo "Backend will run on: http://localhost:5000"
echo "Frontend will run on: http://localhost:5173"
echo ""
echo "Press Ctrl+C to stop both servers"
echo ""

# Start backend in background
echo "Starting backend..."
cd backend
source venv/bin/activate 2>/dev/null || source venv/Scripts/activate 2>/dev/null
python app.py &
BACKEND_PID=$!
cd ..

# Wait a bit for backend to start
sleep 3

# Start frontend
echo "Starting frontend..."
cd frontend
npm run dev &
FRONTEND_PID=$!
cd ..

# Wait for user interrupt
wait

# Cleanup on exit
trap "kill $BACKEND_PID $FRONTEND_PID 2>/dev/null" EXIT

