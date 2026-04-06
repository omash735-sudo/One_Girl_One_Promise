import sql from './db';
import bcrypt from 'bcryptjs';

export async function seedDatabase() {
  // Seed hero/about content
  await sql`
    INSERT INTO site_content (section, content) VALUES
    ('hero', ${JSON.stringify({
      headline: "One Girl One Promise",
      tagline: "Yes, I Can Become",
      subtitle: "Empowering teen mothers to return to school, reclaim their education, and fulfill their dreams.",
      cta_primary: "Our Programs",
      cta_secondary: "Donate Now"
    })})
    ON CONFLICT (section) DO NOTHING
  `;

  await sql`
    INSERT INTO site_content (section, content) VALUES
    ('about', ${JSON.stringify({
      title: "About OGOP",
      description: "One Girl One Promise (OGOP) is a non-governmental organization founded on Godly principles, based in Malawi. Founded in 2023, OGOP is committed to restoring hope and opportunity to teenage mothers from underprivileged rural communities.",
      scripture: "Instead of your shame there shall be a double portion; instead of dishonor they shall rejoice in their lot; therefore in their land they shall possess a double portion; they shall have everlasting joy.",
      scripture_ref: "Isaiah 61:7",
      founder_name: "Gift Sibale",
      founder_title: "Founder & Country Director",
      founder_bio: "A passionate advocate for girls' education and women's rights."
    })})
    ON CONFLICT (section) DO NOTHING
  `;

  await sql`
    INSERT INTO site_content (section, content) VALUES
    ('mission', ${JSON.stringify({
      vision: "A Malawi where every teen mother has the opportunity to return to school, achieve her dreams, and contribute meaningfully to society.",
      mission: "To empower teen mothers from underprivileged communities by providing educational support, psychological and spiritual rehabilitation, and skills development, enabling them to reintegrate into school and lead dignified lives.",
      values: [
        { title: "Compassion", desc: "We treat each girl with love, respect, and understanding." },
        { title: "Empowerment", desc: "We believe in equipping teen mothers with education and skills for self-reliance." },
        { title: "Integrity", desc: "We uphold transparency, accountability, and ethical conduct in everything we do." },
        { title: "Inclusivity", desc: "We serve all teen mothers irrespective of background, religion, or ethnicity." },
        { title: "Faith-Based Approach", desc: "We integrate Christian values in counselling and rehabilitation." }
      ]
    })})
    ON CONFLICT (section) DO NOTHING
  `;

  await sql`
    INSERT INTO site_content (section, content) VALUES
    ('contact', ${JSON.stringify({
      address: "Mdeka, Malawi",
      phone: "0983711922",
      email: "onegirlonepromise@gmail.com",
      social_facebook: "",
      social_twitter: "",
      social_instagram: ""
    })})
    ON CONFLICT (section) DO NOTHING
  `;

  // Seed impact stats
  const statsCount = await sql`SELECT COUNT(*) FROM impact_stats`;
  if (parseInt(statsCount[0].count) === 0) {
    await sql`
      INSERT INTO impact_stats (label, value, icon, sort_order) VALUES
      ('Teen Mothers Re-enrolled', '4+', 'GraduationCap', 1),
      ('Reported Improved Mental Health', '50%', 'Heart', 2),
      ('Parents Now Supporting Girls Education', '50%', 'Users', 3),
      ('Returned to School', '50%', 'BookOpen', 4)
    `;
  }

  // Seed programs
  const programsCount = await sql`SELECT COUNT(*) FROM programs`;
  if (parseInt(programsCount[0].count) === 0) {
    await sql`
      INSERT INTO programs (title, description, icon, sort_order) VALUES
      ('Back-to-School Program', 'Payment of school fees and provision of learning materials to enable teen mothers to return and stay in school.', 'GraduationCap', 1),
      ('Psychological Rehabilitation', 'Christian-based counselling for teen mothers and survivors of sexual abuse, helping them heal and regain confidence.', 'Heart', 2),
      ('Parental & Community Sensitization', 'Workshops on sex education and child rights for parents, guardians, and community members.', 'Users', 3),
      ('Skills Development Program', 'Vocational training in tailoring, baking, and entrepreneurship to promote self-sustainability.', 'Briefcase', 4),
      ('Sexual & Reproductive Health', 'Awareness and access to SRH services, education and information for young mothers.', 'Shield', 5),
      ('Advocacy & Sensitization', 'Gender equality and sex education campaigns at the community level.', 'Megaphone', 6)
    `;
  }

  // Seed success stories
  const storiesCount = await sql`SELECT COUNT(*) FROM success_stories`;
  if (parseInt(storiesCount[0].count) === 0) {
    await sql`
      INSERT INTO success_stories (name, story, year) VALUES
      ('Success Story', 'Two girls successfully completed their Form Four at Namikasi Secondary School, obtaining their certificates and proving that with the right support, teen mothers can achieve academic excellence.', 2024)
    `;
  }

  // Seed admin
  const adminCount = await sql`SELECT COUNT(*) FROM admins`;
  if (parseInt(adminCount[0].count) === 0) {
    const hash = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'Admin@OGOP2024', 10);
    await sql`
      INSERT INTO admins (email, password_hash) VALUES
      (${process.env.ADMIN_EMAIL || 'admin@ogop.org'}, ${hash})
    `;
  }

  console.log('Database seeded successfully');
}
