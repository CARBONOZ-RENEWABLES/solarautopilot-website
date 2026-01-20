'use client'

import { motion } from 'framer-motion'
import { Code, Zap, Database, MessageSquare, Lock, Activity } from 'lucide-react'
import { useState } from 'react'

const apiEndpoints = [
  {
    category: 'AI System',
    icon: Zap,
    endpoints: [
      {
        method: 'GET',
        path: '/ai/status',
        description: 'Get current AI system status and confidence levels',
        response: `{
  "enabled": true,
  "confidence": 0.87,
  "lastUpdate": "2024-01-15T10:30:00Z",
  "models": {
    "solar": "trained",
    "load": "trained",
    "charging": "optimizing"
  }
}`
      },
      {
        method: 'GET',
        path: '/ai/predictions',
        description: 'Get next 24-hour energy predictions',
        response: `{
  "solar": [
    {"time": "2024-01-15T11:00:00Z", "power": 2.5, "confidence": 0.85},
    {"time": "2024-01-15T12:00:00Z", "power": 3.2, "confidence": 0.88}
  ],
  "load": [
    {"time": "2024-01-15T11:00:00Z", "power": 1.2, "confidence": 0.92}
  ]
}`
      },
      {
        method: 'POST',
        path: '/ai/toggle',
        description: 'Enable or disable AI optimization',
        body: `{
  "enabled": true
}`
      }
    ]
  },
  {
    category: 'System Data',
    icon: Database,
    endpoints: [
      {
        method: 'GET',
        path: '/api/system/status',
        description: 'Get real-time system status',
        response: `{
  "battery": {
    "soc": 75,
    "voltage": 52.4,
    "current": 15.2,
    "power": 796.48
  },
  "solar": {
    "power": 3200,
    "voltage": 380,
    "current": 8.4
  },
  "grid": {
    "power": -500,
    "voltage": 230,
    "frequency": 50
  }
}`
      },
      {
        method: 'GET',
        path: '/api/data/history',
        description: 'Query historical energy data',
        params: 'start, end, measurement',
        response: `{
  "data": [
    {"time": "2024-01-15T10:00:00Z", "value": 2.5},
    {"time": "2024-01-15T10:05:00Z", "value": 2.6}
  ]
}`
      }
    ]
  },
  {
    category: 'Notifications',
    icon: MessageSquare,
    endpoints: [
      {
        method: 'GET',
        path: '/api/notifications',
        description: 'Get notification history',
        response: `{
  "notifications": [
    {
      "id": "123",
      "type": "warning",
      "message": "Battery SOC below 20%",
      "timestamp": "2024-01-15T10:30:00Z"
    }
  ]
}`
      },
      {
        method: 'POST',
        path: '/api/notifications/rules',
        description: 'Create notification rule',
        body: `{
  "name": "Low Battery Alert",
  "condition": "battery.soc < 20",
  "channels": ["telegram", "email"]
}`
      }
    ]
  },
  {
    category: 'Control',
    icon: Activity,
    endpoints: [
      {
        method: 'POST',
        path: '/api/control/charge',
        description: 'Control battery charging',
        body: `{
  "action": "start",
  "current": 30,
  "mode": "grid"
}`
      },
      {
        method: 'POST',
        path: '/api/control/mode',
        description: 'Set inverter operating mode',
        body: `{
  "mode": "self_consumption"
}`
      }
    ]
  }
]

const mqttTopics = [
  {
    topic: 'solar/pv/power',
    type: 'sensor',
    description: 'Current PV power generation (W)',
    example: '3200'
  },
  {
    topic: 'solar/battery/soc',
    type: 'sensor',
    description: 'Battery state of charge (%)',
    example: '75'
  },
  {
    topic: 'solar/battery/voltage',
    type: 'sensor',
    description: 'Battery voltage (V)',
    example: '52.4'
  },
  {
    topic: 'solar/grid/power',
    type: 'sensor',
    description: 'Grid power (W, negative = export)',
    example: '-500'
  },
  {
    topic: 'solar/control/charge',
    type: 'command',
    description: 'Control battery charging',
    example: '{"action": "start", "current": 30}'
  },
  {
    topic: 'solar/control/mode',
    type: 'command',
    description: 'Set inverter mode',
    example: 'self_consumption'
  }
]

export default function APIDocumentation() {
  const [activeTab, setActiveTab] = useState('rest')

  return (
    <section id="api-docs" className="section-padding bg-dark-secondary">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            API <span className="text-primary">Documentation</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Complete REST API and MQTT reference for integrating with SolarAutopilot
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex justify-center gap-4 mb-12">
          <button
            onClick={() => setActiveTab('rest')}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'rest'
                ? 'bg-primary text-dark'
                : 'bg-dark border border-gray-700 text-text-secondary hover:border-primary'
            }`}
          >
            <Code className="inline mr-2" size={20} />
            REST API
          </button>
          <button
            onClick={() => setActiveTab('mqtt')}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'mqtt'
                ? 'bg-primary text-dark'
                : 'bg-dark border border-gray-700 text-text-secondary hover:border-primary'
            }`}
          >
            <MessageSquare className="inline mr-2" size={20} />
            MQTT Topics
          </button>
          <button
            onClick={() => setActiveTab('websocket')}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'websocket'
                ? 'bg-primary text-dark'
                : 'bg-dark border border-gray-700 text-text-secondary hover:border-primary'
            }`}
          >
            <Zap className="inline mr-2" size={20} />
            WebSocket
          </button>
        </div>

        {/* REST API Content */}
        {activeTab === 'rest' && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-12"
          >
            {apiEndpoints.map((category, catIndex) => (
              <div key={catIndex}>
                <div className="flex items-center space-x-3 mb-6">
                  <category.icon className="text-primary" size={28} />
                  <h3 className="text-2xl font-bold">{category.category}</h3>
                </div>
                
                <div className="space-y-6">
                  {category.endpoints.map((endpoint, endIndex) => (
                    <motion.div
                      key={endIndex}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: endIndex * 0.1 }}
                      className="card"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <span className={`px-3 py-1 rounded text-sm font-bold ${
                            endpoint.method === 'GET' ? 'bg-blue-500/20 text-blue-400' :
                            endpoint.method === 'POST' ? 'bg-green-500/20 text-green-400' :
                            'bg-yellow-500/20 text-yellow-400'
                          }`}>
                            {endpoint.method}
                          </span>
                          <code className="text-primary font-mono">{endpoint.path}</code>
                        </div>
                      </div>
                      
                      <p className="text-text-secondary mb-4">{endpoint.description}</p>
                      
                      {'params' in endpoint && endpoint.params && (
                        <div className="mb-4">
                          <div className="text-sm text-primary font-semibold mb-2">Parameters:</div>
                          <code className="text-sm text-text-secondary">{endpoint.params}</code>
                        </div>
                      )}
                      
                      {'body' in endpoint && endpoint.body && (
                        <div className="mb-4">
                          <div className="text-sm text-primary font-semibold mb-2">Request Body:</div>
                          <pre className="bg-dark rounded-lg p-4 border border-gray-700 overflow-x-auto">
                            <code className="text-sm text-text-secondary">{endpoint.body}</code>
                          </pre>
                        </div>
                      )}
                      
                      {'response' in endpoint && endpoint.response && (
                        <div>
                          <div className="text-sm text-primary font-semibold mb-2">Response:</div>
                          <pre className="bg-dark rounded-lg p-4 border border-gray-700 overflow-x-auto">
                            <code className="text-sm text-text-secondary">{endpoint.response}</code>
                          </pre>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* MQTT Topics Content */}
        {activeTab === 'mqtt' && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {mqttTopics.map((topic, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className={`px-3 py-1 rounded text-xs font-bold ${
                        topic.type === 'sensor' ? 'bg-blue-500/20 text-blue-400' :
                        'bg-green-500/20 text-green-400'
                      }`}>
                        {topic.type}
                      </span>
                      <code className="text-primary font-mono">{topic.topic}</code>
                    </div>
                    <p className="text-text-secondary">{topic.description}</p>
                  </div>
                </div>
                
                <div>
                  <div className="text-sm text-primary font-semibold mb-2">Example:</div>
                  <pre className="bg-dark rounded-lg p-4 border border-gray-700 overflow-x-auto">
                    <code className="text-sm text-text-secondary">{topic.example}</code>
                  </pre>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* WebSocket Content */}
        {activeTab === 'websocket' && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="card"
          >
            <h3 className="text-2xl font-bold mb-6">WebSocket Connection</h3>
            
            <div className="space-y-6">
              <div>
                <div className="text-sm text-primary font-semibold mb-2">Connection URL:</div>
                <pre className="bg-dark rounded-lg p-4 border border-gray-700">
                  <code className="text-sm text-text-secondary">ws://localhost:8000/ws</code>
                </pre>
              </div>
              
              <div>
                <div className="text-sm text-primary font-semibold mb-2">Subscribe to Updates:</div>
                <pre className="bg-dark rounded-lg p-4 border border-gray-700 overflow-x-auto">
                  <code className="text-sm text-text-secondary">{`{
  "action": "subscribe",
  "topics": ["system", "battery", "solar", "ai"]
}`}</code>
                </pre>
              </div>
              
              <div>
                <div className="text-sm text-primary font-semibold mb-2">Real-time Updates:</div>
                <pre className="bg-dark rounded-lg p-4 border border-gray-700 overflow-x-auto">
                  <code className="text-sm text-text-secondary">{`{
  "type": "update",
  "topic": "battery",
  "data": {
    "soc": 75,
    "voltage": 52.4,
    "current": 15.2,
    "timestamp": "2024-01-15T10:30:00Z"
  }
}`}</code>
                </pre>
              </div>
            </div>
          </motion.div>
        )}

        {/* Authentication Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 card bg-primary/5 border-primary/20"
        >
          <div className="flex items-start space-x-4">
            <Lock className="text-primary flex-shrink-0 mt-1" size={24} />
            <div>
              <h3 className="text-xl font-semibold mb-2">Authentication</h3>
              <p className="text-text-secondary mb-4">
                All API requests require authentication using session cookies or API tokens.
              </p>
              <pre className="bg-dark rounded-lg p-4 border border-gray-700 overflow-x-auto">
                <code className="text-sm text-text-secondary">{`curl -H "Authorization: Bearer YOUR_API_TOKEN" \\
     http://localhost:6789/ai/status`}</code>
              </pre>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
