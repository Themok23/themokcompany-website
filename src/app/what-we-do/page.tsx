"use client";

import { useGsapReveal } from "@/lib/gsapUtils";
import { useRef } from "react";
import { Brain, Rocket, Cog, ArrowRight } from "lucide-react";

export default function WhatWeDoPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const managementRef = useGsapReveal({ duration: 0.8, delay: 0.1 });
  const innovationsRef = useGsapReveal({ duration: 0.8, delay: 0.2 });
  const technologiesRef = useGsapReveal({ duration: 0.8, delay: 0.3 });

  return (
    <div className="w-full bg-black text-white min-h-screen overflow-x-hidden">
      {/* Page Hero */}
      <section
        ref={heroRef}
        className="relative flex items-center justify-center min-h-screen px-6 py-20 border-b border-zinc-800"
      >
        <div className="max-w-4xl text-center">
          <h1 className="text-7xl md:text-8xl font-light tracking-tight leading-tight mb-6">
            What We Do
          </h1>
          <p className="text-2xl md:text-3xl font-light text-zinc-400 leading-relaxed">
            Three integrated arms. One unified vision.
          </p>
        </div>
      </section>

      {/* The Mok Management */}
      <section
        id="management"
        className="border-b border-zinc-800 py-24 px-6 md:px-12 lg:px-20"
      >
        <div ref={managementRef} className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Left: Content */}
            <div className="flex flex-col justify-start pt-4" data-reveal>
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-zinc-900 rounded-lg">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xs uppercase tracking-widest text-zinc-500 font-semibold">
                    The Mok Management
                  </h3>
                </div>
              </div>

              <h2 className="text-4xl md:text-5xl font-light mb-6">
                360 Management & Marketing Consultancy
              </h2>

              <p className="text-lg text-zinc-400 mb-10 leading-relaxed">
                Strategy and execution for ambitious enterprises. We diagnose, design, and deploy winning business models, brand strategies, and growth systems.
              </p>

              <div className="space-y-4">
                {[
                  "Business model design & transformation",
                  "Brand architecture & positioning",
                  "Marketing strategy & activation",
                  "Operational systems design",
                  "Execution oversight & optimization",
                  "Growth strategy & scaling",
                ].map((service, idx) => (
                  <div key={idx} className="flex items-start gap-3 group">
                    <ArrowRight className="w-5 h-5 mt-1 text-zinc-600 group-hover:text-white transition-colors flex-shrink-0" />
                    <span className="text-zinc-300 group-hover:text-white transition-colors">
                      {service}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Visual */}
            <div data-reveal className="hidden lg:flex items-center justify-center">
              <div className="relative w-full aspect-square bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-xl border border-zinc-700 flex items-center justify-center">
                <div className="text-center">
                  <Brain className="w-24 h-24 text-zinc-700 mx-auto mb-4" />
                  <p className="text-sm text-zinc-500 max-w-xs">
                    Strategic thinking meets operational excellence
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Mok Innovations */}
      <section
        id="innovations"
        className="border-b border-zinc-800 py-24 px-6 md:px-12 lg:px-20"
      >
        <div ref={innovationsRef} className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Left: Visual */}
            <div data-reveal className="hidden lg:flex items-center justify-center order-2">
              <div className="relative w-full aspect-square bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-xl border border-zinc-700 flex items-center justify-center">
                <div className="text-center">
                  <Rocket className="w-24 h-24 text-zinc-700 mx-auto mb-4" />
                  <p className="text-sm text-zinc-500 max-w-xs">
                    Turning bold ideas into market realities
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Content */}
            <div className="flex flex-col justify-start pt-4 order-1 lg:order-2" data-reveal>
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-zinc-900 rounded-lg">
                  <Rocket className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xs uppercase tracking-widest text-zinc-500 font-semibold">
                    The Mok Innovations
                  </h3>
                </div>
              </div>

              <h2 className="text-4xl md:text-5xl font-light mb-6">
                Venture & Innovation Lab
              </h2>

              <p className="text-lg text-zinc-400 mb-10 leading-relaxed">
                Incubate, validate, and scale new business ideas and venture models. We provide strategy, structure, and systems to move from concept to market.
              </p>

              <div className="space-y-4">
                {[
                  "Innovation lab setup & facilitation",
                  "Brand incubation & IP development",
                  "Product-market fit strategy",
                  "Business model validation",
                  "Pilot testing & rapid iteration",
                  "Go-to-market planning",
                ].map((service, idx) => (
                  <div key={idx} className="flex items-start gap-3 group">
                    <ArrowRight className="w-5 h-5 mt-1 text-zinc-600 group-hover:text-white transition-colors flex-shrink-0" />
                    <span className="text-zinc-300 group-hover:text-white transition-colors">
                      {service}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Mok Technologies */}
      <section
        id="technologies"
        className="border-b border-zinc-800 py-24 px-6 md:px-12 lg:px-20"
      >
        <div ref={technologiesRef} className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Left: Content */}
            <div className="flex flex-col justify-start pt-4" data-reveal>
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-zinc-900 rounded-lg">
                  <Cog className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xs uppercase tracking-widest text-zinc-500 font-semibold">
                    The Mok Technologies
                  </h3>
                </div>
              </div>

              <h2 className="text-4xl md:text-5xl font-light mb-6">
                Digital & Systems Execution
              </h2>

              <p className="text-lg text-zinc-400 mb-10 leading-relaxed">
                Custom platforms, scalable systems, and AI-enabled solutions that power your business. From architecture to deployment to optimization.
              </p>

              <div className="space-y-4">
                {[
                  "Custom platform & application development",
                  "Scalable systems architecture",
                  "AI & automation solutions",
                  "Cloud infrastructure & DevOps",
                  "Integration & API development",
                  "Performance optimization & scaling",
                ].map((service, idx) => (
                  <div key={idx} className="flex items-start gap-3 group">
                    <ArrowRight className="w-5 h-5 mt-1 text-zinc-600 group-hover:text-white transition-colors flex-shrink-0" />
                    <span className="text-zinc-300 group-hover:text-white transition-colors">
                      {service}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Visual */}
            <div data-reveal className="hidden lg:flex items-center justify-center">
              <div className="relative w-full aspect-square bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-xl border border-zinc-700 flex items-center justify-center">
                <div className="text-center">
                  <Cog className="w-24 h-24 text-zinc-700 mx-auto mb-4" />
                  <p className="text-sm text-zinc-500 max-w-xs">
                    Engineering solutions that scale with your ambition
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Integration Section */}
      <section className="py-24 px-6 md:px-12 lg:px-20 border-b border-zinc-800">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <h2 className="text-xs uppercase tracking-widest text-zinc-500 font-semibold">
              Why Three Arms
            </h2>
          </div>
          <h3 className="text-3xl md:text-4xl font-light mb-8">
            Integrated from the ground up
          </h3>
          <p className="text-lg text-zinc-400 leading-relaxed mb-8 max-w-3xl mx-auto">
            Most consultancies specialize. We integrate. Your strategy informs your innovation. Your innovation drives your technology. Your technology enables your growth. No handoffs. No silos. One unified vision, executed end-to-end.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {[
              {
                label: "Aligned",
                description: "Strategy, innovation, and technology move together",
              },
              {
                label: "Integrated",
                description: "No disconnects between what we design and what we build",
              },
              {
                label: "Accountable",
                description: "We own outcomes across all three dimensions",
              },
            ].map((item, idx) => (
              <div key={idx} className="p-6 border border-zinc-700 rounded-lg hover:border-zinc-600 transition-colors">
                <h4 className="font-semibold mb-2 text-white">{item.label}</h4>
                <p className="text-sm text-zinc-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 md:px-12 lg:px-20 bg-zinc-900/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-light mb-6">
            Ready to build something remarkable?
          </h2>
          <p className="text-lg text-zinc-400 mb-8">
            Let's explore what's possible when strategy, innovation, and technology come together.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-semibold hover:bg-zinc-100 transition-colors"
          >
            Get Started
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>
    </div>
  );
}
