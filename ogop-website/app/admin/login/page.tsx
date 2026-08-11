'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Lock, Mail } from 'lucide-react'
import Image from 'next/image'

export default function AdminLogin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, action: 'login' })
      })

      const data = await res.json()

      if (data.success) {
        localStorage.setItem('ogop_admin_token', data.token)
        localStorage.setItem('ogop_admin_user', JSON.stringify(data.user))
        router.push('/admin/dashboard')
      } else {
        setError(data.error || 'Login failed')
      }
    } catch (err) {
      setError('Network error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#003A99] px-4">
      <div className="w-full max-w-md border border-[#E0E2E6] bg-white p-8">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-white mx-auto flex items-center justify-center mb-4 border border-[#E0E2E6] overflow-hidden">
            <img 
              src="https://res.cloudinary.com/dfsvnaslv/image/upload/v1786219258/file_0000000034e48246addcab843282da68_260808214416_l1r4bm.png"
              alt="One Girl One Promise Logo"
              className="w-full h-full object-contain p-2"
            />
          </div>
          <h2 className="text-2xl font-bold text-[#1A1A1A]">Admin Login</h2>
          <p className="text-[#4A4F59] text-sm mt-1">One Girl One Promise</p>
        </div>
        
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <div className="flex items-center border border-[#E0E2E6] focus-within:border-[#003A99] transition-colors">
              <Mail className="w-5 h-5 text-[#4A4F59] ml-3 flex-shrink-0" />
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full px-3 py-3 outline-none bg-transparent"
              />
            </div>
          </div>
          
          <div className="mb-6">
            <div className="flex items-center border border-[#E0E2E6] focus-within:border-[#003A99] transition-colors">
              <Lock className="w-5 h-5 text-[#4A4F59] ml-3 flex-shrink-0" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-3 outline-none bg-transparent"
              />
            </div>
          </div>
          
          {error && (
            <div className="bg-[#E31E24] text-white px-4 py-2 mb-4 text-center text-sm">
              {error}
            </div>
          )}
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-[#1A7F00] text-white py-3 font-bold hover:bg-[#136000] transition-colors disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  )
}
