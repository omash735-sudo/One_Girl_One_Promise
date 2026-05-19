import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL!)

// Initialize tables
export async function initDB() {
  await sql`
    CREATE TABLE IF NOT EXISTS site_settings (
      id SERIAL PRIMARY KEY,
      key VARCHAR(100) UNIQUE NOT NULL,
      value TEXT,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `

  await sql`
    CREATE TABLE IF NOT EXISTS hero_content (
      id SERIAL PRIMARY KEY,
      title VARCHAR(200),
      subtitle TEXT,
      button1_text VARCHAR(100),
      button1_link VARCHAR(200),
      button2_text VARCHAR(100),
      button2_link VARCHAR(200),
      background_image VARCHAR(500),
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `

  await sql`
    CREATE TABLE IF NOT EXISTS about_content (
      id SERIAL PRIMARY KEY,
      scripture TEXT,
      description TEXT,
      vision TEXT,
      mission TEXT,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `

  await sql`
    CREATE TABLE IF NOT EXISTS core_values (
      id SERIAL PRIMARY KEY,
      icon VARCHAR(50),
      title VARCHAR(100),
      description TEXT,
      display_order INTEGER DEFAULT 0,
      is_active BOOLEAN DEFAULT true
    )
  `

  await sql`
    CREATE TABLE IF NOT EXISTS programs (
      id SERIAL PRIMARY KEY,
      icon VARCHAR(50),
      title VARCHAR(200),
      description TEXT,
      long_description TEXT,
      image VARCHAR(500),
      display_order INTEGER DEFAULT 0,
      is_active BOOLEAN DEFAULT true,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `

  await sql`
    CREATE TABLE IF NOT EXISTS stats (
      id SERIAL PRIMARY KEY,
      number INTEGER,
      label VARCHAR(200),
      suffix VARCHAR(20),
      display_order INTEGER DEFAULT 0,
      is_active BOOLEAN DEFAULT true
    )
  `

  await sql`
    CREATE TABLE IF NOT EXISTS success_stories (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100),
      age INTEGER,
      story TEXT,
      achievement VARCHAR(200),
      image VARCHAR(500),
      is_featured BOOLEAN DEFAULT false,
      display_order INTEGER DEFAULT 0,
      is_active BOOLEAN DEFAULT true,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `

  await sql`
    CREATE TABLE IF NOT EXISTS impact_milestones (
      id SERIAL PRIMARY KEY,
      milestone TEXT,
      display_order INTEGER DEFAULT 0,
      is_active BOOLEAN DEFAULT true
    )
  `

  await sql`
    CREATE TABLE IF NOT EXISTS impact_metrics (
      id SERIAL PRIMARY KEY,
      metric_name VARCHAR(100),
      percentage INTEGER,
      display_order INTEGER DEFAULT 0
    )
  `

  await sql`
    CREATE TABLE IF NOT EXISTS team_members (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100),
      position VARCHAR(100),
      bio TEXT,
      image VARCHAR(500),
      email VARCHAR(100),
      display_order INTEGER DEFAULT 0,
      is_active BOOLEAN DEFAULT true
    )
  `

  await sql`
    CREATE TABLE IF NOT EXISTS contact_messages (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100),
      email VARCHAR(100),
      subject VARCHAR(200),
      message TEXT,
      is_read BOOLEAN DEFAULT false,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `

  await sql`
    CREATE TABLE IF NOT EXISTS newsletter_subscribers (
      id SERIAL PRIMARY KEY,
      email VARCHAR(100) UNIQUE,
      subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `

  await sql`
    CREATE TABLE IF NOT EXISTS admin_users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(50) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      role VARCHAR(50) DEFAULT 'admin',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `
}

export { sql }
