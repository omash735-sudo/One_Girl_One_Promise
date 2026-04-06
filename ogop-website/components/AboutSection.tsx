"use client";

interface AboutContent {
  title?: string;
  description?: string;
  scripture?: string;
  scripture_ref?: string;
  founder_name?: string;
  founder_title?: string;
  founder_bio?: string;
}

export default function AboutSection({ content }: { content: AboutContent }) {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-block bg-purple-100 text-purple-700 rounded-full px-4 py-1.5 text-sm font-semibold mb-6">
              Who We Are
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {content.title || "About OGOP"}
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              {content.description}
            </p>

            <div className="bg-gradient-to-br from-purple-50 to-yellow-50 rounded-2xl p-6 border-l-4 border-yellow-500">
              <p className="text-gray-700 italic text-lg leading-relaxed mb-3">
                &ldquo;{content.scripture}&rdquo;
              </p>
              <p className="text-purple-700 font-semibold text-sm">— {content.scripture_ref}</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-br from-purple-900 to-purple-700 rounded-3xl p-8 text-white">
              <div className="w-16 h-16 rounded-full bg-yellow-400/20 border border-yellow-400/40 flex items-center justify-center mb-5 text-2xl font-bold text-yellow-300 font-display">
                {(content.founder_name || "GS").split(" ").map(n => n[0]).join("")}
              </div>
              <h3 className="font-display text-2xl font-bold mb-1">{content.founder_name || "Gift Sibale"}</h3>
              <p className="text-yellow-300 text-sm font-medium mb-4">{content.founder_title || "Founder & Country Director"}</p>
              <p className="text-purple-200 leading-relaxed">{content.founder_bio}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-purple-50 rounded-2xl p-5 text-center">
                <div className="text-3xl font-bold text-purple-700 font-display">2023</div>
                <div className="text-gray-500 text-sm mt-1">Founded</div>
              </div>
              <div className="bg-yellow-50 rounded-2xl p-5 text-center">
                <div className="text-3xl font-bold text-yellow-600 font-display">Malawi</div>
                <div className="text-gray-500 text-sm mt-1">Based In</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
