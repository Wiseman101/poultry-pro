import { useState, useEffect } from 'react'

export default function BirdManagement() {
  const [breed, setBreed] = useState('')
  const [age, setAge] = useState('')
  const [quantity, setQuantity] = useState('')
  const [price, setPrice] = useState('')
  const [date, setDate] = useState('')
  const [health, setHealth] = useState('Healthy')
  const [notes, setNotes] = useState('')
  const [vaccinationDate, setVaccinationDate] = useState('')
  const [chickens, setChickens] = useState([])
  const [editingIndex, setEditingIndex] = useState(null)

  // Load from localStorage on mount
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('chickens')) || []
    setChickens(saved)
  }, [])

  // Sync chickens across tabs
  useEffect(() => {
    function syncChickens(e) {
      if (e.key === 'chickens') {
        setChickens(JSON.parse(e.newValue) || [])
      }
    }
    window.addEventListener('storage', syncChickens)
    return () => window.removeEventListener('storage', syncChickens)
  }, [])

  // Defensive save to localStorage
  useEffect(() => {
    if (Array.isArray(chickens)) {
      localStorage.setItem('chickens', JSON.stringify(chickens))
    }
  }, [chickens])

  const handleAdd = (e) => {
    e.preventDefault()
    const newChicken = {
      breed,
      age,
      quantity,
      price,
      date,
      health,
      notes,
      vaccinationDate,
    }

    if (editingIndex !== null) {
      const updated = [...chickens]
      updated[editingIndex] = newChicken
      setChickens(updated)
      setEditingIndex(null)
    } else {
      setChickens([...chickens, newChicken])
    }

    // Reset form
    setBreed('')
    setAge('')
    setQuantity('')
    setPrice('')
    setDate('')
    setHealth('Healthy')
    setNotes('')
    setVaccinationDate('')
    // Notify dashboard
    window.dispatchEvent(new Event('dataUpdated'))
  }

  const handleEdit = (index) => {
    const chicken = chickens[index]
    setBreed(chicken.breed)
    setAge(chicken.age)
    setQuantity(chicken.quantity)
    setPrice(chicken.price)
    setDate(chicken.date)
    setHealth(chicken.health)
    setNotes(chicken.notes)
    setVaccinationDate(chicken.vaccinationDate)
    setEditingIndex(index)
  }

  const handleDelete = (index) => {
    const updated = chickens.filter((_, i) => i !== index)
    setChickens(updated)
    // Notify dashboard
    window.dispatchEvent(new Event('dataUpdated'))
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">🐔 Bird Management</h1>

      {/* Form */}
      <form onSubmit={handleAdd} className="bg-white shadow p-4 rounded mb-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <select value={breed} onChange={(e) => setBreed(e.target.value)} className="border p-2 rounded" required>
            <option value="">Select Breed</option>
            <option value="Rhode Island Red">Rhode Island Red</option>
            <option value="New Hampshire">New Hampshire</option>
            <option value="Light Sussex">Light Sussex</option>
            <option value="Naked Neck Chicken">Naked Neck Chicken</option>
          </select>

          <input
            type="number"
            placeholder="Age (weeks)"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="border p-2 rounded"
            required
          />

          <input
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="border p-2 rounded"
            required
          />

          <input
            type="number"
            placeholder="Purchase Price (Ksh)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border p-2 rounded"
            required
          />

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border p-2 rounded"
            placeholder="Purchase Date"
            required
          />

          <select value={health} onChange={(e) => setHealth(e.target.value)} className="border p-2 rounded">
            <option value="Healthy">Healthy</option>
            <option value="Sick">Sick</option>
          </select>

          <input
            type="date"
            value={vaccinationDate}
            onChange={(e) => setVaccinationDate(e.target.value)}
            className="border p-2 rounded"
            placeholder="Vaccination Date"
          />

          <input
            type="text"
            placeholder="Notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="border p-2 rounded"
          />
        </div>

        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          {editingIndex !== null ? 'Update Chicken' : 'Add Chicken'}
        </button>
      </form>

      {/* Table */}
      {chickens.length > 0 && (
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-xl font-semibold mb-4">📋 Chicken Records</h2>

          <table className="min-w-full table-auto text-sm border border-gray-200">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="px-4 py-2 border">Breed</th>
                <th className="px-4 py-2 border">Age (weeks)</th>
                <th className="px-4 py-2 border">Quantity</th>
                <th className="px-4 py-2 border">Price (Ksh)</th>
                <th className="px-4 py-2 border">Purchase Date</th>
                <th className="px-4 py-2 border">Health</th>
                <th className="px-4 py-2 border">Vaccination Date</th>
                <th className="px-4 py-2 border">Notes</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>

            <tbody>
              {chickens.map((c, i) => (
                <tr key={i} className="border-t text-center hover:bg-gray-50">
                  <td className="border px-4 py-2">{c.breed}</td>
                  <td className="border px-4 py-2">{c.age}</td>
                  <td className="border px-4 py-2">{c.quantity}</td>
                  <td className="border px-4 py-2">{c.price}</td>
                  <td className="border px-4 py-2">{c.date || 'N/A'}</td>
                  <td className="border px-4 py-2">{c.health}</td>
                  <td className="border px-4 py-2">{c.vaccinationDate || 'N/A'}</td>
                  <td className="border px-4 py-2">{c.notes || '-'}</td>
                  <td className="border px-4 py-2 space-x-2">
                    <button onClick={() => handleEdit(i)} className="text-blue-600 hover:underline">Edit</button>
                    <button onClick={() => handleDelete(i)} className="text-red-600 hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
