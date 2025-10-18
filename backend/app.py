"""
FlowMind AI - Autonomous Marketing Dashboard
Main Flask Application
"""

from flask import Flask, jsonify, request
from flask_cors import CORS
from datetime import datetime
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Import routes
from routes.analytics import analytics_bp
from routes.ai_engine import ai_bp
from routes.automation import automation_bp
from routes.integrations import integrations_bp

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for React frontend

# Configuration
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'dev-secret-key-change-in-production')
app.config['MONGODB_URI'] = os.getenv('MONGODB_URI', 'mongodb://localhost:27017/flowmind')

# Register blueprints
app.register_blueprint(analytics_bp, url_prefix='/api/analytics')
app.register_blueprint(ai_bp, url_prefix='/api/ai')
app.register_blueprint(automation_bp, url_prefix='/api/automation')
app.register_blueprint(integrations_bp, url_prefix='/api/integrations')

# Health check endpoint
@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.utcnow().isoformat(),
        'service': 'FlowMind AI Backend'
    }), 200

# Root endpoint
@app.route('/', methods=['GET'])
def root():
    """Root endpoint"""
    return jsonify({
        'message': 'FlowMind AI - Autonomous Marketing Dashboard API',
        'version': '1.0.0',
        'endpoints': {
            'health': '/api/health',
            'analytics': '/api/analytics',
            'ai': '/api/ai',
            'automation': '/api/automation',
            'integrations': '/api/integrations'
        }
    }), 200

# Error handlers
@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Endpoint not found'}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({'error': 'Internal server error'}), 500

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    debug = os.getenv('FLASK_ENV') == 'development'
    app.run(host='0.0.0.0', port=port, debug=debug)

