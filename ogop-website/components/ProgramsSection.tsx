"use client";
import { GraduationCap, Heart, Users, Briefcase, Shield, Megaphone, Star, BookOpen } from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  GraduationCap, Heart, Users, Briefcase, Shield, Megaphone, Star, BookOpen
};

interface Program { id: number; title: string; description: string; icon: string; }

export default function ProgramsSection({ programs }: { programs: Program[] }) {
  return (
    <section id="programs" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-block bg-purple-100 text-purple-700 rounded-full px-4 py-1.5 text-sm font-semibold mb-4">
            What We Do
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Programs</h2>
          <p className="text-gray-500 max-w-xl mx-auto">Holistic support designed to transform lives — from classroom to community.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((p, i) => {
            const Icon = iconMap[p.icon] || Star;
            const accent = i % 3 === 0 ? "text-purple-600 bg-purple-100" : i % 3 === 1 ? "text-yellow-600 bg-yellow-100" : "text-green-600 bg-green-100";
            return (
              <div key={p.id} className="program-card card-hover">
                <div className={`w-12 h-12 rounded-2xl ${accent} flex items-center justify-center mb-5`}>
                  <Icon size={22} />
                </div>
                <h3 className="font-display text-xl font-bold text-gray-900 mb-3">{p.title}</h3>
                <p className="text-gray-500 leading-relaxed text-sm">{p.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
