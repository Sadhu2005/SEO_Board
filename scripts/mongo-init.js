// MongoDB initialization script for FlowMind AI
// This script runs when the MongoDB container starts for the first time

// Switch to the flowmind database
db = db.getSiblingDB('flowmind');

// Create collections with validation
db.createCollection('users', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['email', 'username'],
      properties: {
        email: {
          bsonType: 'string',
          pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        },
        username: {
          bsonType: 'string',
          minLength: 3,
          maxLength: 50
        }
      }
    }
  }
});

db.createCollection('analytics', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['timestamp', 'type'],
      properties: {
        timestamp: {
          bsonType: 'date'
        },
        type: {
          bsonType: 'string',
          enum: ['traffic', 'engagement', 'conversions', 'social']
        }
      }
    }
  }
});

db.createCollection('ai_insights', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['timestamp', 'type', 'priority'],
      properties: {
        timestamp: {
          bsonType: 'date'
        },
        type: {
          bsonType: 'string',
          enum: ['opportunity', 'alert', 'achievement', 'recommendation']
        },
        priority: {
          bsonType: 'string',
          enum: ['low', 'medium', 'high']
        }
      }
    }
  }
});

db.createCollection('automation_logs', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['timestamp', 'action', 'status'],
      properties: {
        timestamp: {
          bsonType: 'date'
        },
        action: {
          bsonType: 'string'
        },
        status: {
          bsonType: 'string',
          enum: ['success', 'failed', 'pending']
        }
      }
    }
  }
});

// Create indexes for better performance
db.analytics.createIndex({ timestamp: 1 });
db.analytics.createIndex({ type: 1 });
db.ai_insights.createIndex({ timestamp: -1 });
db.ai_insights.createIndex({ priority: 1 });
db.automation_logs.createIndex({ timestamp: -1 });

// Insert sample data
db.analytics.insertMany([
  {
    timestamp: new Date(),
    type: 'traffic',
    value: 12500,
    metadata: { source: 'organic' }
  },
  {
    timestamp: new Date(),
    type: 'engagement',
    value: 6.8,
    metadata: { platform: 'twitter' }
  }
]);

db.ai_insights.insertMany([
  {
    timestamp: new Date(),
    type: 'opportunity',
    priority: 'high',
    title: 'Optimal Posting Window Detected',
    description: 'Your audience engagement peaks between 1-3 PM today.',
    impact: '+35% expected engagement',
    action: 'Schedule post for 2:00 PM'
  }
]);

print('MongoDB initialization completed for FlowMind AI');
