import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { sql } from './db'
import { NextRequest } from 'next/server'

const JWT_SECRET = process.env.JWT_SECRET || 'ogop-secret-key-change-in-production'

export async function verifyAdminCredentials(username: string, password: string) {
  const users = await sql`
    SELECT * FROM admin_users WHERE username = ${username}
  `
  
  if (users.length === 0) return null
  
  const user = users[0]
  const isValid = await bcrypt.compare(password, user.password_hash)
  
  if (!isValid) return null
  
  return { id: user.id, username: user.username, role: user.role }
}

export function generateToken(user: any) {
  return jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    JWT_SECRET,
    { expiresIn: '7d' }
  )
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch {
    return null
  }
}

export async function hashPassword(password: string) {
  return await bcrypt.hash(password, 10)
}

export function isAuthenticated(request: NextRequest) {
  const token = request.headers.get('authorization')?.replace('Bearer ', '')
  if (!token) return null
  return verifyToken(token)
}

export default { verifyAdminCredentials, generateToken, verifyToken, hashPassword, isAuthenticated }
