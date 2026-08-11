import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL!)

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

  await sql`
    CREATE TABLE IF NOT EXISTS donations (
      id SERIAL PRIMARY KEY,
      donor_name VARCHAR(200),
      donor_email VARCHAR(200),
      amount DECIMAL(10,2),
      currency VARCHAR(10) DEFAULT 'USD',
      frequency VARCHAR(20) DEFAULT 'one-time',
      payment_method VARCHAR(50),
      is_anonymous BOOLEAN DEFAULT false,
      status VARCHAR(50) DEFAULT 'pending',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `

  await sql`
    CREATE TABLE IF NOT EXISTS supply_donations (
      id SERIAL PRIMARY KEY,
      donor_name VARCHAR(200),
      donor_email VARCHAR(200),
      donor_phone VARCHAR(50),
      donor_location VARCHAR(200),
      item_type VARCHAR(100),
      quantity VARCHAR(100),
      item_condition VARCHAR(50),
      delivery_method VARCHAR(50),
      notes TEXT,
      status VARCHAR(50) DEFAULT 'pending',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `

  await sql`
    CREATE TABLE IF NOT EXISTS fundraiser_requests (
      id SERIAL PRIMARY KEY,
      name VARCHAR(200),
      email VARCHAR(200),
      phone VARCHAR(50),
      fundraiser_type VARCHAR(100),
      goal VARCHAR(100),
      event_date DATE,
      location VARCHAR(200),
      description TEXT,
      notes TEXT,
      status VARCHAR(50) DEFAULT 'pending',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `

  await sql`
    CREATE TABLE IF NOT EXISTS sponsorship_inquiries (
      id SERIAL PRIMARY KEY,
      name VARCHAR(200),
      email VARCHAR(200),
      phone VARCHAR(50),
      sponsorship_tier VARCHAR(50),
      message TEXT,
      status VARCHAR(50) DEFAULT 'pending',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `

  const valuesCount = await sql`SELECT COUNT(*) FROM core_values`
  if (parseInt(valuesCount[0].count) === 0) {
    await sql`
      INSERT INTO core_values (icon, title, description, display_order) VALUES
      ('fa-heart', 'Compassion', 'We treat each girl with love, respect, and understanding.', 1),
      ('fa-star', 'Empowerment', 'We believe in equipping teen mothers with education and skills for self-reliance.', 2),
      ('fa-shield', 'Integrity', 'We uphold transparency, accountability, and ethical conduct in everything we do.', 3),
      ('fa-users', 'Inclusivity', 'We serve all teen mothers irrespective of background, religion, or ethnicity.', 4),
      ('fa-church', 'Faith-Based Approach', 'We integrate Christian values in counselling and rehabilitation.', 5)
    `
  }

  const statsCount = await sql`SELECT COUNT(*) FROM stats`
  if (parseInt(statsCount[0].count) === 0) {
    await sql`
      INSERT INTO stats (number, label, suffix, display_order) VALUES
      (4, 'Teen Mothers Re-enrolled', '+', 1),
      (50, 'Reported Improved Mental Health', '%', 2),
      (50, 'Parents Now Supporting Education', '%', 3),
      (50, 'Returned to School', '%', 4)
    `
  }

  const metricsCount = await sql`SELECT COUNT(*) FROM impact_metrics`
  if (parseInt(metricsCount[0].count) === 0) {
    await sql`
      INSERT INTO impact_metrics (metric_name, percentage, display_order) VALUES
      ('School Re-enrollment', 50, 1),
      ('Mental Health Improvement', 50, 2),
      ('Parental Support', 50, 3)
    `
  }

  const milestonesCount = await sql`SELECT COUNT(*) FROM impact_milestones`
  if (parseInt(milestonesCount[0].count) === 0) {
    await sql`
      INSERT INTO impact_milestones (milestone, display_order) VALUES
      ('Founded in 2023 with a mission to restore hope', 1),
      ('Successfully re-enrolled teen mothers in schools', 2),
      ('Established community partnerships in Malawi', 3),
      ('Launched skills development programs', 4)
    `
  }

  console.log('Database initialized successfully')
}

export { sql }

const db = { sql, initDB }
export default db
