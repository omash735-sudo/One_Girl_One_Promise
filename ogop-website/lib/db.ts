import { neon } from '@neondatabase/serverless';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set');
}

const sql = neon(process.env.DATABASE_URL);

export default sql;

export async function initializeDatabase() {
  await sql`
    CREATE TABLE IF NOT EXISTS site_content (
      id SERIAL PRIMARY KEY,
      section VARCHAR(100) NOT NULL UNIQUE,
      content JSONB NOT NULL,
      updated_at TIMESTAMP DEFAULT NOW()
    )`;
  await sql`
    CREATE TABLE IF NOT EXISTS impact_stats (
      id SERIAL PRIMARY KEY,
      label VARCHAR(200) NOT NULL,
      value VARCHAR(100) NOT NULL,
      icon VARCHAR(50),
      sort_order INTEGER DEFAULT 0,
      updated_at TIMESTAMP DEFAULT NOW()
    )`;
  await sql`
    CREATE TABLE IF NOT EXISTS programs (
      id SERIAL PRIMARY KEY,
      title VARCHAR(200) NOT NULL,
      description TEXT NOT NULL,
      icon VARCHAR(50),
      active BOOLEAN DEFAULT true,
      sort_order INTEGER DEFAULT 0,
      updated_at TIMESTAMP DEFAULT NOW()
    )`;
  await sql`
    CREATE TABLE IF NOT EXISTS success_stories (
      id SERIAL PRIMARY KEY,
      name VARCHAR(200) NOT NULL,
      story TEXT NOT NULL,
      year INTEGER,
      active BOOLEAN DEFAULT true,
      updated_at TIMESTAMP DEFAULT NOW()
    )`;
  await sql`
    CREATE TABLE IF NOT EXISTS contact_messages (
      id SERIAL PRIMARY KEY,
      name VARCHAR(200) NOT NULL,
      email VARCHAR(200) NOT NULL,
      message TEXT NOT NULL,
      read BOOLEAN DEFAULT false,
      created_at TIMESTAMP DEFAULT NOW()
    )`;
  await sql`
    CREATE TABLE IF NOT EXISTS admins (
      id SERIAL PRIMARY KEY,
      email VARCHAR(200) NOT NULL UNIQUE,
      password_hash VARCHAR(200) NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    )`;
}
