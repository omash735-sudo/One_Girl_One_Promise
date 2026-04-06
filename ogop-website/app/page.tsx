import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import MissionSection from "@/components/MissionSection";
import ProgramsSection from "@/components/ProgramsSection";
import ImpactSection from "@/components/ImpactSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

async function getData() {
  try {
    const { initializeDatabase } = await import("@/lib/db");
    // Only runs on server
    await initializeDatabase();
    const { seedDatabase } = await import("@/lib/seed");
    await seedDatabase();
  } catch (e) {
    console.error("DB init error:", e);
  }

  try {
    const sql = (await import("@/lib/db")).default;
    const contentRows = await sql`SELECT section, content FROM site_content`;
    const stats = await sql`SELECT * FROM impact_stats ORDER BY sort_order`;
    const programs = await sql`SELECT * FROM programs WHERE active = true ORDER BY sort_order`;
    const stories = await sql`SELECT * FROM success_stories WHERE active = true ORDER BY id DESC`;

    const content: Record<string, unknown> = {};
    contentRows.forEach((r: { section: string; content: unknown }) => { content[r.section] = r.content; });

    return { content, stats, programs, stories };
  } catch (e) {
    console.error("Data fetch error:", e);
    return { content: {}, stats: [], programs: [], stories: [] };
  }
}

export default async function Home() {
  const { content, stats, programs, stories } = await getData();

  const hero = (content.hero || {}) as Record<string, string>;
  const about = (content.about || {}) as Record<string, string>;
  const mission = (content.mission || {}) as Record<string, unknown>;
  const contactData = (content.contact || {}) as Record<string, string>;

  return (
    <main>
      <Navbar />
      <HeroSection content={hero} />
      <AboutSection content={about} />
      <MissionSection content={mission} />
      <ProgramsSection programs={programs as never[]} />
      <ImpactSection stats={stats as never[]} stories={stories as never[]} />
      <ContactSection content={contactData} />
      <Footer contact={contactData} />
    </main>
  );
}
