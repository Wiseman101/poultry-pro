import { useState } from 'react'
import { registerUser } from '../services/authService'
import { useNavigate } from 'react-router-dom'
import henImg from '../assets/hen.jpg' // Place a hen image in assets folder or use a placeholder

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    try {
      const { token, user } = await registerUser(form)
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
      navigate('/') // Redirect to home after registration
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-900">
      <div className="bg-white p-8 rounded shadow-md w-96 flex flex-col items-center">
        <img src={henImg} alt="Hen" className="w-20 h-20 mb-4" />
        <h1 className="text-3xl font-bold text-blue-900 mb-2">Poultry Pro</h1>
        <form onSubmit={handleRegister} className="w-full space-y-4">
          <h2 className="text-2xl font-bold text-center">📝 Register</h2>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="w-full border p-2 rounded"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full border p-2 rounded"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full border p-2 rounded"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Register
          </button>
          <p className="text-sm text-center">
            Already have an account?{' '}
            <a href="/login" className="text-blue-600 hover:underline">
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  )
}