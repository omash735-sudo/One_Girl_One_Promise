"use client";
import { useEffect, useRef } from "react";
import { ArrowRight, Heart } from "lucide-react";

interface HeroContent {
  headline?: string;
  tagline?: string;
  subtitle?: string;
  cta_primary?: string;
  cta_secondary?: string;
}

export default function HeroSection({ content }: { content: HeroContent }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: { x: number; y: number; r: number; vx: number; vy: number; alpha: number }[] = [];
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2 + 0.5,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -Math.random() * 0.5 - 0.2,
        alpha: Math.random() * 0.6 + 0.2,
      });
    }

    let animId: number;
    function animate() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(252, 211, 77, ${p.alpha})`;
        ctx.fill();
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -5) p.y = canvas.height + 5;
        if (p.x < -5) p.x = canvas.width + 5;
        if (p.x > canvas.width + 5) p.x = -5;
      });
      animId = requestAnimationFrame(animate);
    }
    animate();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <section id="home" className="relative min-h-screen hero-gradient flex items-center overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      {/* Decorative circles */}
      <div className="absolute top-20 right-20 w-96 h-96 rounded-full bg-purple-600/20 blur-3xl" />
      <div className="absolute bottom-20 left-10 w-64 h-64 rounded-full bg-yellow-500/10 blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 grid md:grid-cols-2 gap-16 items-center">
        <div className="animate-slide-up">
          <div className="inline-flex items-center gap-2 bg-yellow-400/20 border border-yellow-400/40 rounded-full px-4 py-2 mb-8">
            <Heart size={14} className="text-yellow-400" />
            <span className="text-yellow-300 text-sm font-medium">Faith • Hope • Empowerment</span>
          </div>

          <h1 className="font-display text-5xl md:text-7xl font-bold text-white leading-tight mb-4">
            {content.headline || "One Girl One Promise"}
          </h1>
          <div className="gold-shimmer text-2xl md:text-3xl font-display font-semibold mb-6">
            {content.tagline || "Yes, I Can Become"}
          </div>
          <p className="text-purple-200 text-lg md:text-xl leading-relaxed mb-10 max-w-lg">
            {content.subtitle || "Empowering teen mothers to return to school, reclaim their education, and fulfill their dreams."}
          </p>

          <div className="flex flex-wrap gap-4">
            <a href="#programs" className="btn-primary">
              {content.cta_primary || "Our Programs"} <ArrowRight size={18} />
            </a>
            <a href="#contact" className="btn-outline">
              {content.cta_secondary || "Donate Now"} <Heart size={18} />
            </a>
          </div>
        </div>

        <div className="hidden md:flex justify-center animate-float">
          <div className="relative">
            <div className="w-80 h-80 rounded-full bg-gradient-to-br from-yellow-400/30 to-purple-600/30 backdrop-blur-sm border border-white/20 flex items-center justify-center">
              <div className="text-center px-8">
                <div className="text-7xl font-display font-bold text-yellow-400 mb-2">4+</div>
                <div className="text-white text-lg font-semibold">Girls Re-enrolled</div>
                <div className="text-purple-300 text-sm mt-1">in school since 2023</div>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 bg-yellow-400 text-purple-900 rounded-full px-4 py-2 text-sm font-bold shadow-lg">
              Since 2023
            </div>
            <div className="absolute -bottom-4 -left-4 bg-white/10 backdrop-blur border border-white/20 rounded-2xl px-5 py-3 text-white">
              <div className="text-xl font-bold">50%</div>
              <div className="text-xs text-purple-300">Mental health improved</div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60 animate-bounce">
        <span className="text-xs">Scroll to explore</span>
        <div className="w-px h-8 bg-white/30" />
      </div>
    </section>
  );
}
