import { Menu, Bell, Search, User } from 'lucide-react'

const Header = ({ toggleSidebar }) => {
  return (
    <header className="glass-card m-4 mb-0 rounded-2xl p-4 flex items-center justify-between">
      {/* Left section */}
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleSidebar}
          className="p-2 hover:bg-navy-light rounded-lg transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
        
        {/* Search bar */}
        <div className="hidden md:flex items-center space-x-2 bg-navy-light rounded-lg px-4 py-2 w-64">
          <Search className="w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search metrics, insights..."
            className="bg-transparent border-none outline-none text-sm flex-1 text-white placeholder-gray-400"
          />
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center space-x-4">
        {/* AI Status Indicator */}
        <div className="hidden lg:flex items-center space-x-2 px-4 py-2 bg-green-500/10 rounded-lg border border-green-500/20">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-sm text-green-400 font-medium">AI Active</span>
        </div>

        {/* Notifications */}
        <button className="relative p-2 hover:bg-navy-light rounded-lg transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-violet rounded-full"></span>
        </button>

        {/* User profile */}
        <button className="flex items-center space-x-2 p-2 hover:bg-navy-light rounded-lg transition-colors">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-violet flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
        </button>
      </div>
    </header>
  )
}

export default Header

