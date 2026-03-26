"use client";

import { useGsapReveal } from "@/lib/gsapUtils";
import { useRef, ReactNode } from "react";
import { ArrowRight } from "lucide-react";

export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const storyRef = useGsapReveal({ duration: 0.8, delay: 0.1 });
  const philosophyRef = useGsapReveal({ duration: 0.8, delay: 0.2, stagger: 0.1 });
  const approachRef = useGsapReveal({ duration: 0.8, delay: 0.3, stagger: 0.12 });

  return (
    <div className="w-full bg-black text-white min-h-screen overflow-x-hidden">
      {/* Page Hero */}
      <section
        ref={heroRef}
        className="relative flex items-center justify-center min-h-screen px-6 py-20 border-b border-zinc-800"
      >
        <div className="max-w-4xl text-center">
          <h1 className="text-7xl md:text-8xl font-light tracking-tight leading-tight whitespace-pre-line">
            About<br />The Mok Company
          </h1>
          <p className="mt-12 text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Integrated solutions for ambitious companies. Management, marketing, innovation, and technology unified.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="border-b border-zinc-800 py-24 px-6 md:px-12 lg:px-20">
        <div ref={storyRef} className="max-w-4xl mx-auto">
          <div className="mb-12">
            <h2 className="text-xs uppercase tracking-widest text-zinc-500 font-semibold">
              Our Story
            </h2>
          </div>

          <div className="space-y-8">
            <p className="text-2xl md:text-3xl font-light leading-relaxed text-white">
              We started as a tech venture. We evolved because we had to.
            </p>
            <p className="text-lg text-zinc-300 leading-relaxed">
              In a decade of building and advising across retail, finance, and automotive, we discovered a hard truth: most businesses don't need more consultants. They need one partner who speaks every language.
            </p>
            <p className="text-lg text-zinc-300 leading-relaxed">
              Strategy without technology fails. Technology without strategy wastes millions. Marketing without execution is noise. Execution without vision is motion without purpose.
            </p>
            <div className="pt-8 border-t border-zinc-700">
              <p className="text-xl text-white italic font-light">
                We evolved because businesses don't need fragmented solutions. They need integrated growth engines.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Philosophy Section */}
      <section className="border-b border-zinc-800 py-24 px-6 md:px-12 lg:px-20">
        <div ref={philosophyRef} className="max-w-4xl mx-auto">
          <div className="mb-12">
            <h2 className="text-xs uppercase tracking-widest text-zinc-500 font-semibold">
              Our Philosophy
            </h2>
          </div>

          <div className="space-y-12">
            {[
              {
                title: "Creativity must serve strategy",
                description:
                  "Beautiful ideas without direction are expensive mistakes. Every creative decision maps to business outcomes.",
              },
              {
                title: "Strategy must lead to execution",
                description:
                  "A perfect plan that never ships is a waste of time. Execution is strategy made real. We build both.",
              },
              {
                title: "Execution must drive measurable growth",
                description:
                  "If it doesn't move the needle, we change it. We obsess over metrics, not activities. Growth is the only measure.",
              },
            ].map((belief, idx) => (
              <div key={idx} data-reveal className="border-l-2 border-zinc-700 pl-8 py-6">
                <h3 className="text-xl font-semibold mb-3 text-white">{belief.title}</h3>
                <p className="text-zinc-400 leading-relaxed">{belief.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 pt-12 border-t border-zinc-700">
            <p className="text-sm uppercase tracking-widest text-zinc-500 font-semibold">
              Anything less is incomplete.
            </p>
          </div>
        </div>
      </section>

      {/* Our Approach Section */}
      <section className="py-24 px-6 md:px-12 lg:px-20">
        <div ref={approachRef} className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-xs uppercase tracking-widest text-zinc-500 font-semibold">
              How We Work
            </h2>
            <h3 className="text-3xl md:text-4xl font-light mt-6 mb-8">
              The Mok Approach
            </h3>
            <p className="text-lg text-zinc-400 max-w-2xl">
              A deliberate four-phase process designed to move you from where you are to where you need to be.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {[
              {
                number: "01",
                title: "Discover",
                description:
                  "We immerse ourselves in your world. Deep analysis, market intelligence, competitive landscape, internal diagnosis. We ask the questions nobody else thinks to ask.",
                items: [
                  "Market & competitive analysis",
                  "Brand positioning audit",
                  "Internal capability review",
                  "Stakeholder interviews",
                ],
              },
              {
                number: "02",
                title: "Design",
                description:
                  "Insights become strategy. We architect your playbook: positioning, messaging, operational systems, technology roadmap. Clarity on what, how, and why.",
                items: [
                  "Strategic architecture",
                  "Go-to-market framework",
                  "Brand & messaging design",
                  "Technology blueprint",
                ],
              },
              {
                number: "03",
                title: "Deploy",
                description:
                  "Plans become motion. We execute end-to-end: activations, content, platforms, operations, training. Strategy in motion across every channel.",
                items: [
                  "Marketing activation",
                  "Technology implementation",
                  "Team enablement",
                  "Launch management",
                ],
              },
              {
                number: "04",
                title: "Dominate",
                description:
                  "Motion becomes mastery. We optimize, scale, and defend. You own the market position. We build systems for sustained competitive advantage.",
                items: [
                  "Performance optimization",
                  "Scale & automation",
                  "Continuous improvement",
                  "Market leadership",
                ],
              },
            ].map((phase, idx) => (
              <div key={idx} data-reveal className="group">
                <div className="mb-6">
                  <div className="text-6xl font-light text-zinc-700 group-hover:text-zinc-600 transition-colors">
                    {phase.number}
                  </div>
                </div>
                <h4 className="text-2xl font-semibold mb-4 text-white">{phase.title}</h4>
                <p className="text-zinc-400 leading-relaxed mb-6">{phase.description}</p>
                <ul className="space-y-2">
                  {phase.items.map((item, i) => (
                    <li key={i} className="text-sm text-zinc-500 flex items-start gap-3">
                      <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-zinc-800 py-16 px-6 md:px-12 lg:px-20 bg-zinc-900/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-light mb-6">
            Ready to build your growth engine?
          </h2>
          <p className="text-lg text-zinc-400 mb-8">
            Let's talk about what's possible for your business.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-semibold hover:bg-zinc-100 transition-colors"
          >
            Start a Conversation
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>
    </div>
  );
}
