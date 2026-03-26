"use client";

import { useState, useRef } from "react";
import { useGsapReveal } from "@/lib/gsapUtils";
import { PageHero } from "@/components/pageHero";
import { ArrowRight, Mail, MapPin } from "lucide-react";
import { getSiteConfig } from "@/content/site";

export default function ContactPage() {
  const formRef = useGsapReveal({ duration: 0.8, delay: 0.1 });
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const siteConfig = getSiteConfig();

  const serviceOptions = [
    "Management Consultancy",
    "Brand & Marketing",
    "Innovation & Ventures",
    "Technology & Development",
    "Other",
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="w-full bg-[#090B10] text-white min-h-screen overflow-x-hidden">
      {/* Page Hero */}
      <PageHero
        title="Contact"
        subtitle="Let us build what is next."
      />

      {/* Contact Section */}
      <section className="py-24 px-6 md:px-12 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Form */}
            <div ref={formRef} data-reveal className="lg:col-span-2">
              <h2 className="text-3xl font-semibold mb-8 text-white font-[family-name:var(--font-sora)]">
                Start the Conversation
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold text-white mb-3 font-[family-name:var(--font-sora)]">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-[#1A1D24] border border-[#1F2733] rounded-lg text-white placeholder-[#8A9BB0] focus:outline-none focus:border-[#00C4AF] focus:ring-1 focus:ring-[#00C4AF]/20 transition-colors font-[family-name:var(--font-dm-sans)]"
                    placeholder="John Doe"
                  />
                </div>

                {/* Company */}
                <div>
                  <label className="block text-sm font-semibold text-white mb-3 font-[family-name:var(--font-sora)]">
                    Company
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#1A1D24] border border-[#1F2733] rounded-lg text-white placeholder-[#8A9BB0] focus:outline-none focus:border-[#00C4AF] focus:ring-1 focus:ring-[#00C4AF]/20 transition-colors font-[family-name:var(--font-dm-sans)]"
                    placeholder="Acme Corp"
                  />
                </div>

                {/* Email and Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-white mb-3 font-[family-name:var(--font-sora)]">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-[#1A1D24] border border-[#1F2733] rounded-lg text-white placeholder-[#8A9BB0] focus:outline-none focus:border-[#00C4AF] focus:ring-1 focus:ring-[#00C4AF]/20 transition-colors font-[family-name:var(--font-dm-sans)]"
                      placeholder="john@acme.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-white mb-3 font-[family-name:var(--font-sora)]">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#1A1D24] border border-[#1F2733] rounded-lg text-white placeholder-[#8A9BB0] focus:outline-none focus:border-[#00C4AF] focus:ring-1 focus:ring-[#00C4AF]/20 transition-colors font-[family-name:var(--font-dm-sans)]"
                      placeholder="+971 50 000 0000"
                    />
                  </div>
                </div>

                {/* Service */}
                <div>
                  <label className="block text-sm font-semibold text-white mb-3 font-[family-name:var(--font-sora)]">
                    What can we help with?
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#1A1D24] border border-[#1F2733] rounded-lg text-white focus:outline-none focus:border-[#00C4AF] focus:ring-1 focus:ring-[#00C4AF]/20 transition-colors font-[family-name:var(--font-dm-sans)]"
                  >
                    <option value="">Select a service area</option>
                    {serviceOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-semibold text-white mb-3 font-[family-name:var(--font-sora)]">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full px-4 py-3 bg-[#1A1D24] border border-[#1F2733] rounded-lg text-white placeholder-[#8A9BB0] focus:outline-none focus:border-[#00C4AF] focus:ring-1 focus:ring-[#00C4AF]/20 transition-colors resize-none font-[family-name:var(--font-dm-sans)]"
                    placeholder="Tell us about your project and what you are looking to achieve..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-[#00C4AF] text-[#111318] font-semibold rounded-lg hover:bg-[#00C4AF]/90 transition-colors flex items-center justify-center gap-2 font-[family-name:var(--font-sora)]"
                >
                  Start the Conversation
                  <ArrowRight className="w-5 h-5" />
                </button>
              </form>
            </div>

            {/* Contact Info Sidebar */}
            <div data-reveal className="lg:col-span-1">
              <div className="sticky top-20">
                <h3 className="text-2xl font-semibold mb-8 text-white font-[family-name:var(--font-sora)]">
                  Get in Touch
                </h3>

                <div className="space-y-8">
                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <Mail className="w-6 h-6 text-[#00C4AF] flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-sm text-[#8A9BB0] mb-2 font-[family-name:var(--font-dm-sans)]">
                        Email
                      </p>
                      <a
                        href={`mailto:${siteConfig.email}`}
                        className="text-white hover:text-[#00C4AF] transition-colors font-semibold font-[family-name:var(--font-sora)]"
                      >
                        {siteConfig.email}
                      </a>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 text-[#00C4AF] flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-sm text-[#8A9BB0] mb-2 font-[family-name:var(--font-dm-sans)]">
                        Location
                      </p>
                      <p className="text-white font-semibold font-[family-name:var(--font-sora)]">
                        {siteConfig.location}
                      </p>
                    </div>
                  </div>

                  {/* Response Time */}
                  <div className="mt-12 p-6 border border-[#1F2733] rounded-lg bg-[#1A1D24]">
                    <p className="text-sm text-[#8A9BB0] mb-2 font-[family-name:var(--font-dm-sans)]">
                      Response Time
                    </p>
                    <p className="text-white font-semibold font-[family-name:var(--font-sora)]">
                      Within 24 hours
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
