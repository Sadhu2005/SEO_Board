import { useState, useEffect } from 'react'
import { Brain, Sparkles } from 'lucide-react'
import { getInsights } from '../services/api'

const InsightsPanel = () => {
  const [insights, setInsights] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchInsights()
  }, [])

  const fetchInsights = async () => {
    try {
      const data = await getInsights()
      setInsights(data.insights.slice(0, 3))
      setLoading(false)
    } catch (error) {
      console.error('Error fetching insights:', error)
      setLoading(false)
    }
  }

  const priorityColors = {
    high: 'border-red-500/40 bg-red-500/10',
    medium: 'border-yellow-500/40 bg-yellow-500/10',
    low: 'border-blue-500/40 bg-blue-500/10',
  }

  if (loading) {
    return (
      <div className="glass-card p-6 rounded-xl h-full flex items-center justify-center">
        <div className="text-center">
          <Brain className="w-12 h-12 text-primary animate-pulse mx-auto mb-2" />
          <p className="text-sm text-gray-400">AI analyzing...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="glass-card p-6 rounded-xl h-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold flex items-center space-x-2">
          <Brain className="w-5 h-5 text-primary" />
          <span>AI Insights</span>
        </h2>
        <Sparkles className="w-5 h-5 text-violet animate-pulse" />
      </div>

      <div className="space-y-4">
        {insights.map((insight) => (
          <div
            key={insight.id}
            className={`p-4 rounded-lg border ${priorityColors[insight.priority]}`}
          >
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold text-sm">{insight.title}</h3>
              <span className={`text-xs px-2 py-1 rounded ${
                insight.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                insight.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                'bg-blue-500/20 text-blue-400'
              }`}>
                {insight.priority}
              </span>
            </div>
            <p className="text-xs text-gray-400 mb-2">{insight.description}</p>
            <p className="text-xs text-primary font-medium">{insight.impact}</p>
          </div>
        ))}
      </div>

      <button className="w-full mt-4 py-2 bg-primary/20 hover:bg-primary/30 rounded-lg text-primary text-sm font-medium transition-colors">
        View All Insights
      </button>
    </div>
  )
}

export default InsightsPanel

