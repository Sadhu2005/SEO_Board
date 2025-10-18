import { useState, useEffect } from 'react'
import { Link as LinkIcon, CheckCircle, XCircle, RefreshCw, Youtube, Twitter, Instagram } from 'lucide-react'
import { getIntegrationStatus } from '../services/api'

const Integrations = () => {
  const [integrations, setIntegrations] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchIntegrations()
  }, [])

  const fetchIntegrations = async () => {
    try {
      const data = await getIntegrationStatus()
      setIntegrations(data.integrations)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching integrations:', error)
      setLoading(false)
    }
  }

  const platforms = [
    {
      id: 'youtube',
      name: 'YouTube',
      icon: Youtube,
      color: 'text-red-500',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500/20',
      description: 'Sync video analytics and engagement metrics'
    },
    {
      id: 'twitter',
      name: 'Twitter / X',
      icon: Twitter,
      color: 'text-blue-400',
      bgColor: 'bg-blue-400/10',
      borderColor: 'border-blue-400/20',
      description: 'Track tweets, followers, and impressions'
    },
    {
      id: 'instagram',
      name: 'Instagram',
      icon: Instagram,
      color: 'text-pink-500',
      bgColor: 'bg-pink-500/10',
      borderColor: 'border-pink-500/20',
      description: 'Monitor posts, stories, and audience growth'
    },
    {
      id: 'google_search_console',
      name: 'Google Search Console',
      icon: LinkIcon,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/20',
      description: 'SEO metrics and search performance data'
    },
    {
      id: 'google_analytics',
      name: 'Google Analytics',
      icon: LinkIcon,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10',
      borderColor: 'border-yellow-500/20',
      description: 'Website traffic and user behavior insights'
    }
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <LinkIcon className="w-16 h-16 text-primary animate-pulse mx-auto mb-4" />
          <p className="text-gray-400">Loading integrations...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-orbitron font-bold mb-2 flex items-center space-x-3">
          <LinkIcon className="w-8 h-8 text-primary" />
          <span className="neon-text">API</span>
          <span>Integrations</span>
        </h1>
        <p className="text-gray-400">Connect your marketing platforms for unified insights</p>
      </div>

      {/* Integration Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 rounded-xl">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-400 text-sm">Connected</p>
            <CheckCircle className="w-5 h-5 text-green-400" />
          </div>
          <p className="text-3xl font-bold text-green-400">
            {Object.values(integrations).filter(i => i.status === 'connected').length}
          </p>
        </div>
        
        <div className="glass-card p-6 rounded-xl">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-400 text-sm">Total Platforms</p>
            <LinkIcon className="w-5 h-5 text-primary" />
          </div>
          <p className="text-3xl font-bold">{platforms.length}</p>
        </div>
        
        <div className="glass-card p-6 rounded-xl">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-400 text-sm">Data Synced</p>
            <RefreshCw className="w-5 h-5 text-violet" />
          </div>
          <p className="text-3xl font-bold">Real-time</p>
        </div>
      </div>

      {/* Platform Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {platforms.map((platform) => {
          const Icon = platform.icon
          const integration = integrations[platform.id]
          const isConnected = integration?.status === 'connected'
          
          return (
            <div
              key={platform.id}
              className={`glass-card p-6 rounded-xl border ${platform.borderColor} hover:border-opacity-60 transition-all`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg ${platform.bgColor} flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 ${platform.color}`} />
                </div>
                
                <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${
                  isConnected ? 'bg-green-500/20' : 'bg-gray-500/20'
                }`}>
                  {isConnected ? (
                    <>
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-xs text-green-400 font-medium">Connected</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4 text-gray-400" />
                      <span className="text-xs text-gray-400 font-medium">Disconnected</span>
                    </>
                  )}
                </div>
              </div>

              <h3 className="text-xl font-bold mb-2">{platform.name}</h3>
              <p className="text-sm text-gray-400 mb-4">{platform.description}</p>

              {isConnected && (
                <div className="mb-4 p-3 bg-navy-light rounded-lg">
                  <p className="text-xs text-gray-400 mb-1">Last Synced</p>
                  <p className="text-sm font-medium">{integration.last_sync}</p>
                </div>
              )}

              <button
                className={`w-full py-2 rounded-lg font-medium transition-all ${
                  isConnected
                    ? 'bg-navy-light hover:bg-red-500/20 text-red-400'
                    : `${platform.bgColor} hover:opacity-80 ${platform.color}`
                }`}
              >
                {isConnected ? 'Disconnect' : 'Connect'}
              </button>
            </div>
          )
        })}
      </div>

      {/* API Key Management */}
      <div className="glass-card p-6 rounded-xl">
        <h2 className="text-2xl font-bold mb-6">API Configuration</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Gemini API Key</label>
            <input
              type="password"
              placeholder="Enter your Gemini API key"
              className="w-full px-4 py-2 bg-navy-light border border-primary/20 rounded-lg focus:border-primary outline-none transition-colors"
            />
          </div>
          
          <div>
            <label className="block text-sm text-gray-400 mb-2">YouTube API Key</label>
            <input
              type="password"
              placeholder="Enter your YouTube API key"
              className="w-full px-4 py-2 bg-navy-light border border-primary/20 rounded-lg focus:border-primary outline-none transition-colors"
            />
          </div>
          
          <button className="px-6 py-2 bg-primary/20 hover:bg-primary/30 rounded-lg text-primary font-medium transition-colors">
            Save Configuration
          </button>
        </div>
      </div>
    </div>
  )
}

export default Integrations

