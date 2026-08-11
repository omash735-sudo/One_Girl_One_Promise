import { NextResponse } from 'next/server'
import { sql, initDB } from '@/lib/db'
import { hashPassword } from '@/lib/auth'

export async function GET() {
  try {
    await initDB()
    
    // Always reset admin password to default
    const hashedPassword = await hashPassword('Admin@OGOP2024')
    
    // Check if admin exists
    const adminCount = await sql`SELECT COUNT(*) FROM admin_users`
    if (parseInt(adminCount[0].count) === 0) {
      // Create new admin
      await sql`
        INSERT INTO admin_users (username, password_hash, role)
        VALUES ('admin', ${hashedPassword}, 'admin')
      `
    } else {
      // Update existing admin password
      await sql`
        UPDATE admin_users 
        SET password_hash = ${hashedPassword}
        WHERE username = 'admin'
      `
    }
    
    const heroCount = await sql`SELECT COUNT(*) FROM hero_content`
    if (parseInt(heroCount[0].count) === 0) {
      await sql`
        INSERT INTO hero_content (title, subtitle, button1_text, button1_link, button2_text, button2_link)
        VALUES (
          'Yes, I Can Become',
          'Restoring hope and opportunity to teen mothers in rural Malawi',
          'Support a Girl',
          '/support/sponsor',
          'Our Programs',
          '/programs'
        )
      `
    }
    
    const aboutCount = await sql`SELECT COUNT(*) FROM about_content`
    if (parseInt(aboutCount[0].count) === 0) {
      await sql`
        INSERT INTO about_content (scripture, description, vision, mission)
        VALUES (
          'Instead of your shame there shall be a double portion; instead of dishonor they shall rejoice in their lot; therefore in their land they shall possess a double portion; they shall have everlasting joy.',
          'One Girl One Promise (OGOP) is a non-governmental organization founded on Godly principles, based in Malawi. Founded in 2023, OGOP is committed to restoring hope and opportunity to teenage mothers from underprivileged rural communities.',
          'A Malawi where every teen mother has the opportunity to return to school, achieve her dreams, and contribute meaningfully to society.',
          'To empower teen mothers from underprivileged communities by providing educational support, psychological and spiritual rehabilitation, and skills development, enabling them to reintegrate into school and lead dignified lives.'
        )
      `
    }
    
    const settingsCount = await sql`SELECT COUNT(*) FROM site_settings`
    if (parseInt(settingsCount[0].count) === 0) {
      await sql`
        INSERT INTO site_settings (key, value) VALUES
        ('siteTitle', 'One Girl One Promise'),
        ('contactEmail', 'onegirlonepromise@gmail.com'),
        ('contactPhone', '+265 983 711 922'),
        ('address', 'Mdeka, Malawi')
      `
    }
    
    const programsCount = await sql`SELECT COUNT(*) FROM programs`
    if (parseInt(programsCount[0].count) === 0) {
      await sql`
        INSERT INTO programs (icon, title, description, display_order) VALUES
        ('fa-graduation-cap', 'Back-to-School Program', 'Payment of school fees and provision of learning materials to enable teen mothers to return and stay in school.', 1),
        ('fa-heart', 'Psychological Rehabilitation', 'Christian-based counselling for teen mothers and survivors of sexual abuse, helping them heal and regain confidence.', 2),
        ('fa-users', 'Parental & Community Sensitization', 'Workshops on sex education and child rights for parents, guardians, and community members.', 3),
        ('fa-briefcase', 'Skills Development Program', 'Vocational training in tailoring, baking, and entrepreneurship to promote self-sustainability.', 4),
        ('fa-shield', 'Sexual & Reproductive Health', 'Awareness and access to SRH services, education and information for young mothers.', 5),
        ('fa-bullhorn', 'Advocacy & Sensitization', 'Gender equality and sex education campaigns at the community level.', 6)
      `
    }
    
    const storiesCount = await sql`SELECT COUNT(*) FROM success_stories`
    if (parseInt(storiesCount[0].count) === 0) {
      await sql`
        INSERT INTO success_stories (name, age, story, achievement, is_featured) VALUES
        ('Grace', 18, 'After completing our program, I returned to school and am now in Form Four. I have hope for my future and my child''s future.', 'Returned to School', true),
        ('Chifundo', 17, 'The counselling and support I received helped me heal and believe in myself again. I am now running my own small business.', 'Small Business Owner', true)
      `
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Database seeded successfully! Admin password reset to: Admin@OGOP2024' 
    })
    
  } catch (error) {
    console.error('Seed error:', error)
    return NextResponse.json({ 
      error: 'Seed failed', 
      details: String(error) 
    }, { status: 500 })
  }
}
