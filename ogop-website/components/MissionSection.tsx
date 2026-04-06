"use client";

interface Value { title: string; desc: string; }
interface MissionContent {
  vision?: string;
  mission?: string;
  values?: Value[];
}

const valueColors = [
  "from-purple-500 to-purple-700",
  "from-yellow-500 to-orange-500",
  "from-green-500 to-teal-600",
  "from-blue-500 to-indigo-600",
  "from-pink-500 to-rose-600",
];

export default function MissionSection({ content }: { content: MissionContent }) {
  return (
    <section id="mission" className="py-24 bg-gradient-to-br from-slate-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-block bg-yellow-100 text-yellow-700 rounded-full px-4 py-1.5 text-sm font-semibold mb-4">
            Our Direction
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900">Mission & Vision</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-purple-900 rounded-3xl p-8 text-white">
            <div className="text-yellow-400 text-sm font-bold uppercase tracking-widest mb-4">Our Vision</div>
            <p className="font-display text-xl leading-relaxed text-purple-100">{content.vision}</p>
          </div>
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-purple-100">
            <div className="text-purple-600 text-sm font-bold uppercase tracking-widest mb-4">Our Mission</div>
            <p className="font-display text-xl leading-relaxed text-gray-700">{content.mission}</p>
          </div>
        </div>

        <h3 className="font-display text-3xl font-bold text-center text-gray-900 mb-10">Core Values</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {(content.values || []).map((v, i) => (
            <div key={i} className="card-hover">
              <div className={`rounded-2xl p-6 bg-gradient-to-br ${valueColors[i % valueColors.length]} text-white h-full`}>
                <div className="text-3xl font-bold font-display opacity-30 mb-3">{(i + 1).toString().padStart(2, "0")}</div>
                <h4 className="font-bold text-lg mb-2">{v.title}</h4>
                <p className="text-white/80 text-sm leading-relaxed">{v.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
