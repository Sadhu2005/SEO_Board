import { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { TrendingUp, Youtube, Twitter, Instagram } from 'lucide-react'
import { getSocialMetrics, getSEOHealth } from '../services/api'

const Analytics = () => {
  const [socialMetrics, setSocialMetrics] = useState(null)
  const [seoHealth, setSeoHealth] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAnalytics()
  }, [])

  const fetchAnalytics = async () => {
    try {
      const [social, seo] = await Promise.all([
        getSocialMetrics(),
        getSEOHealth()
      ])
      setSocialMetrics(social)
      setSeoHealth(seo)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching analytics:', error)
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading analytics...</p>
        </div>
      </div>
    )
  }

  const platformData = socialMetrics ? [
    { name: 'YouTube', value: socialMetrics.youtube?.subscribers || 0, color: '#FF0000' },
    { name: 'Twitter', value: socialMetrics.twitter?.followers || 0, color: '#1DA1F2' },
    { name: 'Instagram', value: socialMetrics.instagram?.followers || 0, color: '#E4405F' },
  ] : []

  const engagementData = socialMetrics ? [
    { platform: 'YouTube', engagement: socialMetrics.youtube?.engagement || 0 },
    { platform: 'Twitter', engagement: socialMetrics.twitter?.engagement || 0 },
    { platform: 'Instagram', engagement: socialMetrics.instagram?.engagement || 0 },
  ] : []

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-orbitron font-bold mb-2">
          <span className="neon-text">Advanced</span> Analytics
        </h1>
        <p className="text-gray-400">Deep dive into your marketing performance</p>
      </div>

      {/* SEO Health Score */}
      <div className="glass-card p-6 rounded-xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">SEO Health Score</h2>
          <div className="text-4xl font-bold neon-text">{seoHealth?.overall_score || 0}/100</div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-red-500/10 rounded-lg border border-red-500/20">
            <p className="text-sm text-gray-400 mb-1">Critical Issues</p>
            <p className="text-3xl font-bold text-red-400">{seoHealth?.issues?.critical || 0}</p>
          </div>
          <div className="p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
            <p className="text-sm text-gray-400 mb-1">Warnings</p>
            <p className="text-3xl font-bold text-yellow-400">{seoHealth?.issues?.warnings || 0}</p>
          </div>
          <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
            <p className="text-sm text-gray-400 mb-1">Notices</p>
            <p className="text-3xl font-bold text-blue-400">{seoHealth?.issues?.notices || 0}</p>
          </div>
        </div>
      </div>

      {/* Social Media Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card p-6 rounded-xl">
          <h2 className="text-xl font-bold mb-6">Platform Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={platformData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {platformData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-card p-6 rounded-xl">
          <h2 className="text-xl font-bold mb-6">Engagement by Platform</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={engagementData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1A1F2C" />
              <XAxis dataKey="platform" stroke="#666" tick={{ fill: '#999' }} />
              <YAxis stroke="#666" tick={{ fill: '#999' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0A0F1C',
                  border: '1px solid #00BFFF',
                  borderRadius: '8px',
                }}
              />
              <Bar dataKey="engagement" fill="#00BFFF" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Keywords */}
      <div className="glass-card p-6 rounded-xl">
        <h2 className="text-xl font-bold mb-6">Top Performing Keywords</h2>
        <div className="space-y-4">
          {seoHealth?.top_keywords?.map((keyword, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-navy-light rounded-lg">
              <div className="flex-1">
                <p className="font-medium">{keyword.keyword}</p>
                <p className="text-sm text-gray-400">{keyword.volume.toLocaleString()} monthly searches</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm text-gray-400">Position</p>
                  <p className="text-2xl font-bold text-primary">#{keyword.position}</p>
                </div>
                <TrendingUp className="w-5 h-5 text-green-400" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Analytics

