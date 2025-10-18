import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const ChartCard = ({ title, data }) => {
  return (
    <div className="glass-card p-6 rounded-xl h-full">
      <h2 className="text-xl font-bold mb-6">{title}</h2>
      
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1A1F2C" />
          <XAxis 
            dataKey="date" 
            stroke="#666"
            tick={{ fill: '#999' }}
          />
          <YAxis 
            stroke="#666"
            tick={{ fill: '#999' }}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: '#0A0F1C',
              border: '1px solid #00BFFF',
              borderRadius: '8px',
            }}
          />
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke="#00BFFF" 
            strokeWidth={3}
            dot={{ fill: '#00BFFF', r: 4 }}
            activeDot={{ r: 6, fill: '#8A2BE2' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default ChartCard

