import { useState, useEffect } from 'react'

export default function EggCollection() {
  const [collections, setCollections] = useState([])
  const [date, setDate] = useState('')
  const [eggs, setEggs] = useState('')
  const [grade, setGrade] = useState('')
  const [notes, setNotes] = useState('')

  // Load from localStorage on mount
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('eggCollections')) || []
    setCollections(saved)
  }, [])

  // Sync collections across tabs
  useEffect(() => {
    function syncCollections(e) {
      if (e.key === 'eggCollections') {
        setCollections(JSON.parse(e.newValue) || [])
      }
    }
    window.addEventListener('storage', syncCollections)
    return () => window.removeEventListener('storage', syncCollections)
  }, [])

  // Defensive save to localStorage
  useEffect(() => {
    if (Array.isArray(collections)) {
      localStorage.setItem('eggCollections', JSON.stringify(collections))
    }
  }, [collections])

  const handleAddCollection = (e) => {
    e.preventDefault()
    const newEntry = { date, eggs: Number(eggs), grade, notes }
    setCollections([...collections, newEntry])
    // Reset form
    setDate('')
    setEggs('')
    setGrade('')
    setNotes('')
    // Notify dashboard
    window.dispatchEvent(new Event('dataUpdated'))
  }

  const totalEggs = collections.reduce((sum, item) => sum + item.eggs, 0)
  const avgDaily = collections.length ? Math.round(totalEggs / collections.length) : 0

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-2xl font-bold mb-4">🥚 Egg Collection</h2>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow">
          <p className="text-sm text-gray-500">Current Inventory</p>
          <p className="text-2xl font-bold">{totalEggs}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <p className="text-sm text-gray-500">This Week</p>
          <p className="text-2xl font-bold">{totalEggs}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <p className="text-sm text-gray-500">Average Daily</p>
          <p className="text-2xl font-bold">{avgDaily}</p>
        </div>
      </div>

      {/* Egg Collection Form */}
      <form onSubmit={handleAddCollection} className="bg-white shadow p-4 rounded mb-6 space-y-4">
        <h2 className="text-xl font-semibold">Record Today's Collection</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border p-2 rounded"
            required
          />
          <input
            type="number"
            placeholder="Number of Eggs"
            value={eggs}
            onChange={(e) => setEggs(e.target.value)}
            className="border p-2 rounded"
            required
          />
          <select
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            className="border p-2 rounded"
            required
          >
            <option value="">Select Quality Grade</option>
            <option value="A">A (Best)</option>
            <option value="B">B</option>
            <option value="C">C (Lowest)</option>
          </select>
          <input
            type="text"
            placeholder="Notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="border p-2 rounded"
          />
        </div>
        <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Add</button>
      </form>

      {/* Recent Collections Table */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-semibold mb-2">📅 Recent Collections</h3>
        <table className="w-full text-left border">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2">Date</th>
              <th className="p-2">Eggs</th>
              <th className="p-2">Grade</th>
              <th className="p-2">Notes</th>
            </tr>
          </thead>
          <tbody>
            {collections.map((col, i) => (
              <tr key={i} className="border-t">
                <td className="p-2">{col.date}</td>
                <td className="p-2">{col.eggs}</td>
                <td className="p-2">{col.grade}</td>
                <td className="p-2">{col.notes}</td>
              </tr>
            ))}
            {collections.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center text-gray-500 py-4">
                  No collections recorded yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
