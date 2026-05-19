const { neon } = require('@neondatabase/serverless')
require('dotenv').config()

const sql = neon(process.env.DATABASE_URL)

async function setup() {
  console.log('Setting up database...')
  
  // Create tables (same as in lib/db.ts)
  
  // Seed initial admin (password: Admin123!)
  const bcrypt = require('bcryptjs')
  const hashedPassword = await bcrypt.hash('Admin123!', 10)
  
  await sql`
    INSERT INTO admin_users (username, password_hash)
    VALUES ('admin', ${hashedPassword})
    ON CONFLICT (username) DO NOTHING
  `
  
  // Seed initial data
  await sql`
    INSERT INTO hero_content (title, subtitle, button1_text, button1_link, button2_text, button2_link)
    VALUES (
      'Yes, I Can Become',
      'Restoring hope and opportunity to teen mothers in rural Malawi',
      'Support a Girl',
      '/donate',
      'Our Programs',
      '/programs'
    )
  `
  
  console.log('Database setup complete!')
  console.log('Admin login: admin / Admin123!')
}

setup().catch(console.error)
