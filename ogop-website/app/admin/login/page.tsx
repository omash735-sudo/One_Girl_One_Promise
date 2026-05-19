'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

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
    <div className="admin-login">
      <div className="login-card">
        <div className="login-header">
          <img src="/logo.png" alt="OGOP" className="login-logo" />
          <h2>Admin Login</h2>
          <p>One Girl One Promise</p>
        </div>
        
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          {error && <div className="error-message">{error}</div>}
          
          <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>

      <style jsx>{`
        .admin-login {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #E91E63, #9C27B0);
        }
        .login-card {
          background: white;
          padding: 40px;
          border-radius: 10px;
          width: 100%;
          max-width: 400px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.2);
        }
        .login-header {
          text-align: center;
          margin-bottom: 30px;
        }
        .login-logo {
          width: 80px;
          margin-bottom: 15px;
        }
        .login-header h2 {
          color: #E91E63;
          margin-bottom: 5px;
        }
        .form-group {
          margin-bottom: 20px;
        }
        .form-group input {
          width: 100%;
          padding: 12px;
          border: 1px solid #ddd;
          border-radius: 5px;
          font-size: 16px;
        }
        button {
          width: 100%;
          padding: 12px;
          background: #E91E63;
          color: white;
          border: none;
          border-radius: 5px;
          font-size: 16px;
          cursor: pointer;
        }
        button:hover {
          background: #C2185B;
        }
        .error-message {
          background: #ffebee;
          color: #c62828;
          padding: 10px;
          border-radius: 5px;
          margin-bottom: 20px;
          text-align: center;
        }
      `}</style>
    </div>
  )
}
