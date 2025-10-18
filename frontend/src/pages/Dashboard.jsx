import { useState, useEffect } from 'react'
import { 
  TrendingUp, 
  Users, 
  Eye, 
  Target,
  ArrowUp,
  ArrowDown
} from 'lucide-react'
import MetricCard from '../components/MetricCard'
import ChartCard from '../components/ChartCard'
import InsightsPanel from '../components/InsightsPanel'
import { getOverview, getTimeseries } from '../services/api'

const Dashboard = () => {
  const [metrics, setMetrics] = useState(null)
  const [chartData, setChartData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const [overviewData, timeseriesData] = await Promise.all([
        getOverview(),
        getTimeseries(7, 'traffic')
      ])
      
      setMetrics(overviewData)
      setChartData(timeseriesData.data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-orbitron font-bold mb-2">
          <span className="neon-text">Autonomous Marketing</span> Dashboard
        </h1>
        <p className="text-gray-400">Where Intelligence Flows and Decisions Drive Themselves</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Organic Traffic"
          value={metrics?.seo?.organic_traffic?.toLocaleString() || '0'}
          change="+12.5%"
          trend="up"
          icon={Eye}
          color="primary"
        />
        <MetricCard
          title="Social Followers"
          value={metrics?.social?.total_followers?.toLocaleString() || '0'}
          change="+8.2%"
          trend="up"
          icon={Users}
          color="violet"
        />
        <MetricCard
          title="Engagement Rate"
          value={`${metrics?.social?.engagement_rate || '0'}%`}
          change="-2.1%"
          trend="down"
          icon={TrendingUp}
          color="primary"
        />
        <MetricCard
          title="Conversions"
          value={metrics?.content?.conversions?.toLocaleString() || '0'}
          change="+15.7%"
          trend="up"
          icon={Target}
          color="violet"
        />
      </div>

      {/* Charts and Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ChartCard 
            title="Traffic Trend (Last 7 Days)" 
            data={chartData}
          />
        </div>
        
        <div className="lg:col-span-1">
          <InsightsPanel />
        </div>
      </div>

      {/* AI Recommendations */}
      <div className="glass-card p-6 rounded-xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold flex items-center space-x-2">
            <Target className="w-5 h-5 text-primary" />
            <span>AI Recommendations</span>
          </h2>
          <span className="text-xs text-gray-400">Updated 5 min ago</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-navy-light rounded-lg border border-primary/20">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center flex-shrink-0">
                <ArrowUp className="w-5 h-5 text-green-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-green-400 mb-1">Optimal Posting Time</h3>
                <p className="text-sm text-gray-400">Post between 2-3 PM today for +35% engagement</p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-navy-light rounded-lg border border-violet/20">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-5 h-5 text-yellow-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-yellow-400 mb-1">Content Opportunity</h3>
                <p className="text-sm text-gray-400">High volume for "AI automation" - create content now</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

