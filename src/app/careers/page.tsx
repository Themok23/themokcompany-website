"use client"

import { useRef } from "react"
import { ArrowUpRight, MapPin, Briefcase, Clock } from "lucide-react"
import { PageHero } from "@/components/pageHero"
import { SectionHeading } from "@/components/sectionHeading"
import { useGsapReveal } from "@/lib/gsapUtils"

const positions = [
  {
    id: 1,
    title: "Senior Brand Strategist",
    department: "Management",
    location: "Dubai, UAE",
    type: "Full-time",
    slug: "senior-brand-strategist",
  },
  {
    id: 2,
    title: "Full-Stack Developer",
    department: "Technology",
    location: "Dubai, UAE",
    type: "Full-time",
    slug: "full-stack-developer",
  },
  {
    id: 3,
    title: "Innovation Lead",
    department: "Innovations",
    location: "Dubai, UAE",
    type: "Full-time",
    slug: "innovation-lead",
  },
]

const departmentColor = {
  Management: "text-blue-400",
  Technology: "text-emerald-400",
  Innovations: "text-purple-400",
}

export default function CareersPage() {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const jobsRef = useGsapReveal({ stagger: 0.1 })

  return (
    <main className="min-h-screen bg-black text-white">
      <PageHero
        title="Careers"
        subtitle="Join the team building what's next."
      />

      <div className="px-6 py-24 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Culture Section */}
          <section className="mb-24 max-w-3xl">
            <h2 className="text-3xl font-semibold mb-6">Why MOK?</h2>
            <p className="text-white/70 text-lg leading-relaxed mb-6">
              At The Mok Company, we're not building just for clients. We're building for the future. We hire people who are curious, strategic, and unafraid of complexity. We offer real ownership, learning opportunities that go beyond your job description, and the chance to shape the future of digital transformation.
            </p>
            <p className="text-white/70 text-lg leading-relaxed">
              We work on problems that matter, with clients who are serious about change, using the latest tools and strategies. If you're ready to do work that challenges you and leaves an impact, you're in the right place.
            </p>
          </section>

          {/* Open Positions */}
          <section className="mb-24">
            <SectionHeading
              title="Open Positions"
              description="We're hiring exceptional people to join our growing team."
            />

            <div
              ref={jobsRef}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
            >
              {positions.map((position, index) => (
                <div
                  key={position.id}
                  ref={(el) => {
                    cardsRef.current[index] = el
                  }}
                  className="group p-8 rounded-lg border border-white/5 bg-gradient-to-br from-white/5 to-transparent hover:border-white/10 transition-all duration-500 flex flex-col"
                >
                  <h3 className="text-xl font-semibold mb-4 group-hover:text-white/90 transition-colors">
                    {position.title}
                  </h3>

                  <div className="space-y-3 mb-8 flex-grow">
                    <div className="flex items-center gap-2">
                      <Briefcase
                        size={16}
                        className={`${departmentColor[position.department as keyof typeof departmentColor]}`}
                      />
                      <span className="text-sm text-white/70">
                        {position.department}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-white/60" />
                      <span className="text-sm text-white/70">
                        {position.location}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-white/60" />
                      <span className="text-sm text-white/70">
                        {position.type}
                      </span>
                    </div>
                  </div>

                  <a
                    href={`/careers/${position.slug}`}
                    className="flex items-center gap-2 text-sm font-medium text-white/80 hover:text-white transition-colors"
                  >
                    <span>View & Apply</span>
                    <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </a>
                </div>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="border-t border-white/5 pt-24">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-semibold mb-6">
                Don't see your role?
              </h2>
              <p className="text-white/70 text-lg leading-relaxed mb-8">
                We're always on the lookout for exceptional people. If you believe you'd be a great fit for MOK but don't see a specific opening, we want to hear from you. Send us your profile and let's explore possibilities together.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-3 bg-white text-black font-semibold rounded-full hover:bg-white/90 transition-colors"
              >
                Get in Touch
                <ArrowUpRight size={18} />
              </a>
            </div>
          </section>
        </div>
      </div>

      <section className="px-6 py-16 md:px-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-semibold mb-6">
            Ready to Join?
          </h2>
          <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
            Apply to one of our open positions or reach out to discuss your career with MOK.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3 bg-white/10 border border-white/20 text-white font-semibold rounded-full hover:bg-white/20 hover:border-white/40 transition-all"
          >
            Start a Conversation
            <ArrowUpRight size={18} />
          </a>
        </div>
      </section>
    </main>
  )
}
