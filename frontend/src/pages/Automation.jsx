import { useState, useEffect } from 'react'
import { Zap, Play, Pause, Clock, CheckCircle, AlertCircle } from 'lucide-react'
import { getTriggers, getAutomationLogs } from '../services/api'

const Automation = () => {
  const [triggers, setTriggers] = useState([])
  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAutomationData()
  }, [])

  const fetchAutomationData = async () => {
    try {
      const [triggersData, logsData] = await Promise.all([
        getTriggers(),
        getAutomationLogs()
      ])
      setTriggers(triggersData.triggers)
      setLogs(logsData.logs)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching automation data:', error)
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <Zap className="w-16 h-16 text-violet animate-pulse mx-auto mb-4" />
          <p className="text-gray-400">Loading automation...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-orbitron font-bold mb-2 flex items-center space-x-3">
          <Zap className="w-8 h-8 text-violet" />
          <span className="neon-text">Autonomous</span>
          <span>Workflows</span>
        </h1>
        <p className="text-gray-400">AI-powered automation that acts on your behalf</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="glass-card p-6 rounded-xl">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-400 text-sm">Active Triggers</p>
            <CheckCircle className="w-5 h-5 text-green-400" />
          </div>
          <p className="text-3xl font-bold">{triggers.filter(t => t.status === 'active').length}</p>
        </div>
        
        <div className="glass-card p-6 rounded-xl">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-400 text-sm">Actions Today</p>
            <Zap className="w-5 h-5 text-violet" />
          </div>
          <p className="text-3xl font-bold">24</p>
        </div>
        
        <div className="glass-card p-6 rounded-xl">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-400 text-sm">Time Saved</p>
            <Clock className="w-5 h-5 text-primary" />
          </div>
          <p className="text-3xl font-bold">4.5h</p>
        </div>
        
        <div className="glass-card p-6 rounded-xl">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-400 text-sm">Success Rate</p>
            <CheckCircle className="w-5 h-5 text-green-400" />
          </div>
          <p className="text-3xl font-bold">98.5%</p>
        </div>
      </div>

      {/* Active Triggers */}
      <div className="glass-card p-6 rounded-xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Active Automation Triggers</h2>
          <button className="px-4 py-2 bg-violet/20 hover:bg-violet/30 rounded-lg text-violet text-sm font-medium transition-colors">
            + Create New Trigger
          </button>
        </div>

        <div className="space-y-4">
          {triggers.map((trigger) => (
            <div key={trigger.id} className="p-4 bg-navy-light rounded-lg border border-primary/20 hover:border-primary/40 transition-all">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="font-bold text-lg">{trigger.name}</h3>
                    <span className={`text-xs px-2 py-1 rounded ${
                      trigger.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'
                    }`}>
                      {trigger.status}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                    <div>
                      <p className="text-xs text-gray-400 mb-1">Condition</p>
                      <p className="text-sm font-mono bg-navy/50 px-2 py-1 rounded">{trigger.condition}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 mb-1">Action</p>
                      <p className="text-sm font-medium text-primary">{trigger.action}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 mb-1">Last Triggered</p>
                      <p className="text-sm text-gray-300">{trigger.last_triggered}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 ml-4">
                  <button className="p-2 bg-primary/20 hover:bg-primary/30 rounded-lg transition-colors">
                    {trigger.status === 'active' ? <Pause className="w-4 h-4 text-primary" /> : <Play className="w-4 h-4 text-primary" />}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Automation Logs */}
      <div className="glass-card p-6 rounded-xl">
        <h2 className="text-2xl font-bold mb-6">Recent Automation Logs</h2>
        
        <div className="space-y-3">
          {logs.map((log, index) => (
            <div key={index} className="flex items-center space-x-4 p-3 bg-navy-light/50 rounded-lg">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                log.status === 'success' ? 'bg-green-500/20' : 'bg-red-500/20'
              }`}>
                {log.status === 'success' ? 
                  <CheckCircle className="w-5 h-5 text-green-400" /> : 
                  <AlertCircle className="w-5 h-5 text-red-400" />
                }
              </div>
              
              <div className="flex-1">
                <p className="font-medium">{log.action}</p>
                <p className="text-sm text-gray-400">{log.details}</p>
              </div>
              
              <div className="text-right">
                <p className="text-xs text-gray-500">{log.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Automation

