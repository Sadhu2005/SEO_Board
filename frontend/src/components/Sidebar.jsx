import { Link, useLocation } from 'react-router-dom'
import { 
  LayoutDashboard, 
  BarChart3, 
  Brain, 
  Zap, 
  Link as LinkIcon 
} from 'lucide-react'

const Sidebar = ({ isOpen }) => {
  const location = useLocation()
  
  const navItems = [
    { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/analytics', icon: BarChart3, label: 'Analytics' },
    { path: '/ai-insights', icon: Brain, label: 'AI Insights' },
    { path: '/automation', icon: Zap, label: 'Automation' },
    { path: '/integrations', icon: LinkIcon, label: 'Integrations' },
  ]

  return (
    <aside 
      className={`${
        isOpen ? 'w-64' : 'w-20'
      } glass-card m-4 rounded-2xl transition-all duration-300 flex flex-col`}
    >
      {/* Logo */}
      <div className="p-6 border-b border-primary/20">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-violet flex items-center justify-center animate-glow">
            <Brain className="w-6 h-6 text-white" />
          </div>
          {isOpen && (
            <div>
              <h1 className="text-xl font-orbitron font-bold neon-text">FlowMind</h1>
              <p className="text-xs text-gray-400">AI Dashboard</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.path
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                isActive
                  ? 'bg-gradient-to-r from-primary/20 to-violet/20 border border-primary/40 text-primary'
                  : 'hover:bg-navy-light/50 text-gray-300 hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {isOpen && <span className="font-medium">{item.label}</span>}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      {isOpen && (
        <div className="p-4 border-t border-primary/20">
          <div className="glass-card p-3 rounded-lg">
            <p className="text-xs text-gray-400">AI Status</p>
            <div className="flex items-center space-x-2 mt-1">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-sm text-green-400">Active</span>
            </div>
          </div>
        </div>
      )}
    </aside>
  )
}

export default Sidebar

