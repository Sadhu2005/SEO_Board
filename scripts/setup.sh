#!/bin/bash

# FlowMind AI - Complete Setup Script
# This script sets up the entire FlowMind AI project

set -e  # Exit on any error

echo "🧠 FlowMind AI - Project Setup"
echo "=============================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_header() {
    echo -e "${BLUE}$1${NC}"
}

# Check if Docker is installed
check_docker() {
    if command -v docker &> /dev/null; then
        print_status "Docker is installed"
        if command -v docker-compose &> /dev/null; then
            print_status "Docker Compose is installed"
            return 0
        else
            print_warning "Docker Compose not found, but Docker is available"
            return 1
        fi
    else
        print_error "Docker is not installed. Please install Docker first."
        print_warning "Visit: https://docs.docker.com/get-docker/"
        return 1
    fi
}

# Check if Python is installed
check_python() {
    if command -v python3 &> /dev/null; then
        PYTHON_VERSION=$(python3 --version | cut -d' ' -f2)
        print_status "Python $PYTHON_VERSION is installed"
        return 0
    else
        print_error "Python 3 is not installed. Please install Python 3.9 or higher."
        return 1
    fi
}

# Check if Node.js is installed
check_node() {
    if command -v node &> /dev/null; then
        NODE_VERSION=$(node --version)
        print_status "Node.js $NODE_VERSION is installed"
        return 0
    else
        print_error "Node.js is not installed. Please install Node.js 18 or higher."
        return 1
    fi
}

# Setup backend
setup_backend() {
    print_header "Setting up Backend..."
    
    cd backend
    
    # Create virtual environment
    print_status "Creating Python virtual environment..."
    python3 -m venv venv
    
    # Activate virtual environment
    print_status "Activating virtual environment..."
    source venv/bin/activate
    
    # Install dependencies
    print_status "Installing Python dependencies..."
    pip install --upgrade pip
    pip install -r requirements.txt
    
    # Create .env file from example
    if [ ! -f .env ]; then
        print_status "Creating .env file from template..."
        cp env.example .env
        print_warning "Please edit backend/.env with your API keys!"
    else
        print_status ".env file already exists"
    fi
    
    cd ..
    print_status "Backend setup completed!"
}

# Setup frontend
setup_frontend() {
    print_header "Setting up Frontend..."
    
    cd frontend
    
    # Install dependencies
    print_status "Installing Node.js dependencies..."
    npm install
    
    # Create .env file from example
    if [ ! -f .env ]; then
        print_status "Creating .env file from template..."
        cp env.example .env
        print_warning "Please edit frontend/.env with your API URL!"
    else
        print_status ".env file already exists"
    fi
    
    cd ..
    print_status "Frontend setup completed!"
}

# Setup with Docker
setup_docker() {
    print_header "Setting up with Docker..."
    
    # Create .env files for Docker
    if [ ! -f backend/.env ]; then
        print_status "Creating backend .env for Docker..."
        cp backend/env.example backend/.env
    fi
    
    if [ ! -f frontend/.env ]; then
        print_status "Creating frontend .env for Docker..."
        cp frontend/env.example frontend/.env
    fi
    
    # Build and start containers
    print_status "Building and starting Docker containers..."
    docker-compose up --build -d
    
    print_status "Docker setup completed!"
    print_status "Services are starting up..."
    print_status "Backend: http://localhost:5000"
    print_status "Frontend: http://localhost:5173"
}

# Main setup function
main() {
    print_header "FlowMind AI Setup Script"
    echo "This script will set up your FlowMind AI project."
    echo ""
    
    # Check prerequisites
    print_header "Checking Prerequisites..."
    
    DOCKER_AVAILABLE=false
    if check_docker; then
        DOCKER_AVAILABLE=true
    fi
    
    check_python
    check_node
    
    echo ""
    print_header "Setup Options:"
    echo "1. Docker Setup (Recommended - includes MongoDB and Redis)"
    echo "2. Manual Setup (Requires MongoDB and Redis installed locally)"
    echo "3. Exit"
    echo ""
    
    read -p "Choose setup option (1-3): " choice
    
    case $choice in
        1)
            if [ "$DOCKER_AVAILABLE" = true ]; then
                setup_docker
            else
                print_error "Docker is required for option 1. Please install Docker first."
                exit 1
            fi
            ;;
        2)
            setup_backend
            setup_frontend
            print_warning "Don't forget to install and start MongoDB and Redis!"
            ;;
        3)
            print_status "Setup cancelled."
            exit 0
            ;;
        *)
            print_error "Invalid option. Please choose 1, 2, or 3."
            exit 1
            ;;
    esac
    
    echo ""
    print_header "Setup Complete! 🎉"
    echo ""
    print_status "Next steps:"
    echo "1. Edit the .env files with your API keys"
    echo "2. Start the services:"
    if [ "$DOCKER_AVAILABLE" = true ] && [ "$choice" = "1" ]; then
        echo "   docker-compose up -d"
    else
        echo "   Backend: cd backend && source venv/bin/activate && python app.py"
        echo "   Frontend: cd frontend && npm run dev"
    fi
    echo "3. Open http://localhost:5173 in your browser"
    echo ""
    print_status "For more information, check the documentation in the docs/ folder"
}

# Run main function
main "$@"
