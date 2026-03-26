"use client"

import { useState, FormEvent } from "react"
import { ArrowUpRight, Mail, MapPin } from "lucide-react"
import { PageHero } from "@/components/pageHero"
import { useGsapReveal } from "@/lib/gsapUtils"

const services = [
  "Management Consultancy",
  "Brand & Marketing",
  "Innovation & Ventures",
  "Technology & Development",
  "Other",
]

export default function ContactPage() {
  const formRef = useGsapReveal()
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    service: "Management Consultancy",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Basic validation
    if (
      !formData.name ||
      !formData.email ||
      !formData.message
    ) {
      alert("Please fill in all required fields.")
      return
    }

    // Simulate form submission
    console.log("Form submitted:", formData)
    setSubmitted(true)

    // Reset form after 2 seconds
    setTimeout(() => {
      setFormData({
        name: "",
        company: "",
        email: "",
        phone: "",
        service: "Management Consultancy",
        message: "",
      })
      setSubmitted(false)
    }, 2000)
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <PageHero
        title="Contact"
        subtitle="Let's Build What's Next."
      />

      <div className="px-6 py-24 md:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div
            ref={formRef}
            className="lg:col-span-2"
          >
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-2">Send us a Message</h2>
              <p className="text-white/70">
                Tell us about your challenge or opportunity. We'll respond within 24 hours.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-center">
                <p className="font-semibold mb-2">Message Sent Successfully</p>
                <p className="text-sm">
                  Thanks for reaching out. We'll be in touch shortly.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:bg-white/10 focus:border-white/20 focus:outline-none transition-colors"
                    placeholder="Your name"
                    required
                  />
                </div>

                {/* Company */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:bg-white/10 focus:border-white/20 focus:outline-none transition-colors"
                    placeholder="Your company"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:bg-white/10 focus:border-white/20 focus:outline-none transition-colors"
                    placeholder="your@email.com"
                    required
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:bg-white/10 focus:border-white/20 focus:outline-none transition-colors"
                    placeholder="+971 XX XXX XXXX"
                  />
                </div>

                {/* Service */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Service Needed
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:bg-white/10 focus:border-white/20 focus:outline-none transition-colors"
                  >
                    {services.map((service) => (
                      <option
                        key={service}
                        value={service}
                        className="bg-black"
                      >
                        {service}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:bg-white/10 focus:border-white/20 focus:outline-none transition-colors resize-none"
                    placeholder="Tell us about your challenge..."
                    required
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded-full hover:bg-white/90 transition-colors"
                >
                  Start the Conversation
                  <ArrowUpRight size={18} />
                </button>
              </form>
            )}
          </div>

          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <h3 className="text-xl font-semibold mb-8">Get in Touch</h3>

              <div className="space-y-8">
                {/* Email */}
                <div className="flex gap-4">
                  <Mail className="text-white/60 flex-shrink-0 mt-1" size={20} />
                  <div>
                    <p className="text-sm text-white/60 mb-2">Email</p>
                    <a
                      href="mailto:hello@themok.company"
                      className="text-white font-medium hover:text-white/80 transition-colors"
                    >
                      hello@themok.company
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="flex gap-4">
                  <MapPin className="text-white/60 flex-shrink-0 mt-1" size={20} />
                  <div>
                    <p className="text-sm text-white/60 mb-2">Location</p>
                    <p className="text-white font-medium">Dubai, UAE</p>
                  </div>
                </div>

                {/* Hours */}
                <div>
                  <p className="text-sm text-white/60 mb-4">Response Time</p>
                  <p className="text-white font-medium">
                    We typically respond within 24 hours during business days.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
