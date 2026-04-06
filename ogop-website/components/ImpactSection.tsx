"use client";
import { GraduationCap, Heart, Users, BookOpen, Star } from "lucide-react";

const iconMap: Record<string, React.ElementType> = { GraduationCap, Heart, Users, BookOpen, Star };

interface Stat { id: number; label: string; value: string; icon: string; }
interface Story { id: number; name: string; story: string; year: number; }

export default function ImpactSection({ stats, stories }: { stats: Stat[]; stories: Story[] }) {
  return (
    <section id="impact" className="py-24 bg-gradient-to-br from-purple-900 via-purple-800 to-purple-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-block bg-yellow-400/20 text-yellow-300 border border-yellow-400/30 rounded-full px-4 py-1.5 text-sm font-semibold mb-4">
            Our Impact
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">Transforming Lives</h2>
          <p className="text-purple-300 max-w-xl mx-auto">Every number represents a real girl whose life has been changed forever.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {stats.map((s) => {
            const Icon = iconMap[s.icon] || Star;
            return (
              <div key={s.id} className="bg-white/10 backdrop-blur border border-white/20 rounded-3xl p-7 text-center card-hover">
                <div className="w-14 h-14 rounded-full bg-yellow-400/20 border border-yellow-400/40 flex items-center justify-center mx-auto mb-5">
                  <Icon size={24} className="text-yellow-400" />
                </div>
                <div className="font-display text-4xl font-bold text-white mb-2">{s.value}</div>
                <div className="text-purple-300 text-sm leading-snug">{s.label}</div>
              </div>
            );
          })}
        </div>

        {stories.length > 0 && (
          <>
            <h3 className="font-display text-3xl font-bold text-white text-center mb-10">Success Stories</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {stories.map((s) => (
                <div key={s.id} className="bg-white/10 backdrop-blur border border-white/20 rounded-3xl p-8">
                  <div className="text-yellow-400 text-4xl font-display font-bold mb-4">&ldquo;</div>
                  <p className="text-purple-100 leading-relaxed mb-5">{s.story}</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-yellow-400/30 flex items-center justify-center text-yellow-300 font-bold">
                      {s.name[0]}
                    </div>
                    <div>
                      <div className="text-white font-semibold">{s.name}</div>
                      {s.year && <div className="text-purple-400 text-xs">{s.year}</div>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
