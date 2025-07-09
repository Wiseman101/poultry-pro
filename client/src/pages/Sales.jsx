import { useState, useEffect } from 'react'

export default function Sales() {
  const [incomeRecords, setIncomeRecords] = useState([])
  const [expenseRecords, setExpenseRecords] = useState([])

  // Form states
  const [type, setType] = useState('income') // income or expense
  const [category, setCategory] = useState('')
  const [amount, setAmount] = useState('')
  const [date, setDate] = useState('')
  const [notes, setNotes] = useState('')

  // Load from localStorage
  useEffect(() => {
    const savedIncome = JSON.parse(localStorage.getItem('income')) || []
    const savedExpenses = JSON.parse(localStorage.getItem('expenses')) || []
    setIncomeRecords(savedIncome)
    setExpenseRecords(savedExpenses)
  }, [])

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('income', JSON.stringify(incomeRecords))
    localStorage.setItem('expenses', JSON.stringify(expenseRecords))
  }, [incomeRecords, expenseRecords])

  const handleAddRecord = (e) => {
    e.preventDefault()
    const newRecord = { category, amount: parseFloat(amount), date, notes }

    if (type === 'income') {
      setIncomeRecords([...incomeRecords, newRecord])
    } else {
      setExpenseRecords([...expenseRecords, newRecord])
    }

    // Reset form
    setCategory('')
    setAmount('')
    setDate('')
    setNotes('')
  }

  const handleDelete = (type, index) => {
    if (type === 'income') {
      const updated = [...incomeRecords]
      updated.splice(index, 1)
      setIncomeRecords(updated)
    } else {
      const updated = [...expenseRecords]
      updated.splice(index, 1)
      setExpenseRecords(updated)
    }
  }

  const totalIncome = incomeRecords.reduce((acc, rec) => acc + rec.amount, 0)
  const totalExpenses = expenseRecords.reduce((acc, rec) => acc + rec.amount, 0)

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">💰 Sales Overview</h1>

      {/* Form */}
      <form onSubmit={handleAddRecord} className="bg-white shadow p-4 rounded mb-6 space-y-4">
        <div className="flex space-x-4">
          <select value={type} onChange={(e) => setType(e.target.value)} className="border p-2 rounded">
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border p-2 rounded"
            required
          >
            <option value="">Select Category</option>
            {type === 'income' ? (
              <>
                <option value="Egg Sales">Egg Sales</option>
                <option value="Chicken Sales">Chicken Sales</option>
              </>
            ) : (
              <>
                <option value="Feeds">Feeds</option>
                <option value="Vaccines">Vaccines</option>
                <option value="Labour">Labour</option>
                <option value="Repairs">Repairs</option>
                <option value="Transport">Transport</option>
                <option value="Extras">Extras</option>
              </>
            )}
          </select>
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="border p-2 rounded"
            required
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            placeholder="Notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="border p-2 rounded"
          />
        </div>
        <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Add Record
        </button>
      </form>

      {/* Summary */}
      <div className="bg-white shadow p-4 rounded mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <h2 className="font-semibold text-lg mb-2">📈 Income</h2>
          <ul className="space-y-1">
            {incomeRecords.map((rec, i) => (
              <li key={i} className="flex justify-between border-b py-1">
                <span>{rec.date} - {rec.category}</span>
                <span>Ksh {rec.amount}</span>
                <button onClick={() => handleDelete('income', i)} className="text-red-500 ml-2">✖</button>
              </li>
            ))}
          </ul>
          <p className="mt-2 font-bold">Total: Ksh {totalIncome}</p>
        </div>

        <div>
          <h2 className="font-semibold text-lg mb-2">📉 Expenses</h2>
          <ul className="space-y-1">
            {expenseRecords.map((rec, i) => (
              <li key={i} className="flex justify-between border-b py-1">
                <span>{rec.date} - {rec.category}</span>
                <span>Ksh {rec.amount}</span>
                <button onClick={() => handleDelete('expense', i)} className="text-red-500 ml-2">✖</button>
              </li>
            ))}
          </ul>
          <p className="mt-2 font-bold">Total: Ksh {totalExpenses}</p>
        </div>
      </div>
    </div>
  )
}
