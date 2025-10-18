import { useState, useEffect } from 'react'
import { Brain, Sparkles, TrendingUp, AlertTriangle, CheckCircle, Lightbulb } from 'lucide-react'
import { getInsights, getRecommendations } from '../services/api'

const AIInsights = () => {
  const [insights, setInsights] = useState([])
  const [recommendations, setRecommendations] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAIData()
  }, [])

  const fetchAIData = async () => {
    try {
      const [insightsData, recsData] = await Promise.all([
        getInsights(),
        getRecommendations()
      ])
      setInsights(insightsData.insights)
      setRecommendations(recsData.recommendations.slice(0, 6))
      setLoading(false)
    } catch (error) {
      console.error('Error fetching AI data:', error)
      setLoading(false)
    }
  }

  const getTypeIcon = (type) => {
    switch(type) {
      case 'opportunity': return CheckCircle
      case 'alert': return AlertTriangle
      case 'achievement': return Sparkles
      case 'recommendation': return Lightbulb
      default: return Brain
    }
  }

  const getTypeColor = (type) => {
    switch(type) {
      case 'opportunity': return 'text-green-400 bg-green-500/10 border-green-500/20'
      case 'alert': return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20'
      case 'achievement': return 'text-violet bg-violet/10 border-violet/20'
      case 'recommendation': return 'text-primary bg-primary/10 border-primary/20'
      default: return 'text-gray-400 bg-gray-500/10 border-gray-500/20'
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <Brain className="w-16 h-16 text-primary animate-pulse mx-auto mb-4" />
          <p className="text-gray-400">AI is analyzing your data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-orbitron font-bold mb-2 flex items-center space-x-3">
            <Brain className="w-8 h-8 text-primary" />
            <span className="neon-text">AI</span>
            <span>Insights</span>
          </h1>
          <p className="text-gray-400">Powered by advanced machine learning and predictive analytics</p>
        </div>
        <div className="flex items-center space-x-2 px-4 py-2 bg-green-500/10 rounded-lg border border-green-500/20">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-sm text-green-400 font-medium">AI Active</span>
        </div>
      </div>

      {/* Insights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {insights.map((insight) => {
          const Icon = getTypeIcon(insight.type)
          return (
            <div
              key={insight.id}
              className={`glass-card p-6 rounded-xl border ${getTypeColor(insight.type)}`}
            >
              <div className="flex items-start space-x-4">
                <div className={`w-12 h-12 rounded-lg ${getTypeColor(insight.type)} flex items-center justify-center flex-shrink-0`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-lg">{insight.title}</h3>
                    <span className={`text-xs px-2 py-1 rounded ${
                      insight.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                      insight.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-blue-500/20 text-blue-400'
                    }`}>
                      {insight.priority}
                    </span>
                  </div>
                  <p className="text-gray-300 mb-3">{insight.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-primary">{insight.impact}</span>
                    <button className="text-sm text-violet hover:text-violet-light transition-colors">
                      {insight.action} →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* AI Recommendations */}
      <div className="glass-card p-6 rounded-xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold flex items-center space-x-2">
            <Lightbulb className="w-6 h-6 text-violet" />
            <span>Actionable Recommendations</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recommendations.map((rec) => (
            <div key={rec.id} className="p-4 bg-navy-light rounded-lg border border-primary/20 hover:border-primary/40 transition-all">
              <div className="flex items-center justify-between mb-3">
                <span className={`text-xs px-2 py-1 rounded ${
                  rec.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                  rec.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-blue-500/20 text-blue-400'
                }`}>
                  {rec.priority} priority
                </span>
                <div className="flex items-center space-x-1 text-xs text-gray-400">
                  <TrendingUp className="w-3 h-3" />
                  <span>{rec.impact} impact</span>
                </div>
              </div>
              
              <h3 className="font-semibold mb-2">{rec.title}</h3>
              <p className="text-sm text-gray-400 mb-3">{rec.description}</p>
              
              <div className="flex items-center justify-between">
                <span className="text-xs text-primary font-medium">{rec.estimated_improvement}</span>
                <span className="text-xs text-gray-500">{rec.effort} effort</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AIInsights

