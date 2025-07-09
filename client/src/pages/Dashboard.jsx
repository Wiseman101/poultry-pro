import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

export default function Dashboard() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [income, setIncome] = useState([])
  const [expenses, setExpenses] = useState([])
  const [eggCollections, setEggCollections] = useState([])
  const [chickens, setChickens] = useState([])

  useEffect(() => {
    document.title = '🐔 PoultryPro | Dashboard'
    const storedUser = JSON.parse(localStorage.getItem('user'))
    if (storedUser && storedUser.username) {
      setUsername(storedUser.username)
    }
    // Initial load
    loadData()
    // Listen for custom event to update dashboard
    window.addEventListener('dataUpdated', loadData)
    return () => window.removeEventListener('dataUpdated', loadData)
  }, [])

  function loadData() {
    setIncome(JSON.parse(localStorage.getItem('income')) || [])
    setExpenses(JSON.parse(localStorage.getItem('expenses')) || [])
    setEggCollections(JSON.parse(localStorage.getItem('eggCollections')) || [])
    setChickens(JSON.parse(localStorage.getItem('chickens')) || [])
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  // Example chart data (replace with real data if needed)
  const chartData = [
    { name: 'Week 1', chickens: chickens.length },
    { name: 'Week 2', chickens: chickens.length },
    { name: 'Week 3', chickens: chickens.length },
  ]

  // Example stats (replace with real calculations)
  const totalIncome = income.reduce((acc, rec) => acc + (rec.amount || 0), 0)
  const totalExpenses = expenses.reduce((acc, rec) => acc + (rec.amount || 0), 0)
  const eggsToday = eggCollections.filter(e => e.date === new Date().toISOString().slice(0,10)).reduce((sum, e) => sum + (e.eggs || 0), 0)
  const eggsThisWeek = eggCollections.reduce((sum, e) => sum + (e.eggs || 0), 0) // Simplified
  const chickensSold = 0 // Add logic if you track sales
  const mortality = 0 // Add logic if you track deaths
  const feedStock = 'N/A' // Add logic if you track feed
  const vaccinationStatus = 'Up to date ✅' // Add logic if you track vaccination
  const feedingRoutine = '3 times/day' // Example

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Welcome {username} 🐥</h1>
          <p className="text-gray-600">Manage your poultry records and performance</p>
        </div>
        <button onClick={logout} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
          Logout
        </button>
      </div>

      {/* Example Stats Grid */}
      <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-8">
        <Stat label="Total Income" value={`KSh ${totalIncome.toLocaleString()}`} />
        <Stat label="Total Expenses" value={`KSh ${totalExpenses.toLocaleString()}`} />
        <Stat label="Chickens in Stock" value={chickens.length} />
        <Stat label="Eggs Collected Today" value={eggsToday} />
        <Stat label="Eggs This Week" value={eggsThisWeek} />
        <Stat label="Chickens Sold" value={chickensSold} />
        <Stat label="Mortality" value={mortality} />
        <Stat label="Feed Stock" value={feedStock} />
        <Stat label="Vaccination Status" value={vaccinationStatus} />
        <Stat label="Feeding Routine" value={feedingRoutine} />
      </div>

      {/* Chicken Bar Chart */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-4">Weekly Chicken Population</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="chickens" fill="#4ADE80" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

function Stat({ label, value }) {
  return (
    <div className="bg-white p-4 rounded shadow text-center">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-xl font-bold text-gray-800">{value}</p>
    </div>
  )
}
