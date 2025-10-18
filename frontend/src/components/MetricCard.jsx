import { ArrowUp, ArrowDown } from 'lucide-react'

const MetricCard = ({ title, value, change, trend, icon: Icon, color = 'primary' }) => {
  const colorClasses = {
    primary: 'from-primary/20 to-primary/5 border-primary/40',
    violet: 'from-violet/20 to-violet/5 border-violet/40',
  }

  const iconColorClasses = {
    primary: 'bg-primary/20 text-primary',
    violet: 'bg-violet/20 text-violet',
  }

  return (
    <div className={`metric-card bg-gradient-to-br ${colorClasses[color]}`}>
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-lg ${iconColorClasses[color]} flex items-center justify-center`}>
          <Icon className="w-6 h-6" />
        </div>
        
        <div className={`flex items-center space-x-1 text-sm ${
          trend === 'up' ? 'text-green-400' : 'text-red-400'
        }`}>
          {trend === 'up' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
          <span className="font-medium">{change}</span>
        </div>
      </div>

      <div>
        <p className="text-gray-400 text-sm mb-1">{title}</p>
        <p className="text-3xl font-bold">{value}</p>
      </div>
    </div>
  )
}

export default MetricCard

