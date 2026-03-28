"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { PageHero } from "@/components/pageHero";
import { ArrowRight, Mail, MapPin } from "lucide-react";
import { getSiteConfig } from "@/content/site";

export default function ContactPage() {
  const formRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
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

  // Direct timeline animation on mount - no ScrollTrigger dependency
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });
    if (formRef.current) {
      tl.fromTo(
        formRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );
    }
    if (sidebarRef.current) {
      tl.fromTo(
        sidebarRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
        "-=0.5"
      );
    }
    return () => {
      tl.kill();
    };
  }, []);

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
    <div className="w-full text-white min-h-screen overflow-x-hidden relative z-[1]">
      {/* Page Hero */}
      <PageHero
        title="Contact"
        subtitle="Let's Build What's Next."
      />

      {/* Contact Section - transparent bg, stars show through like homepage */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Form */}
            <div ref={formRef} className="lg:col-span-2" style={{ opacity: 0 }}>
              <h2 className="text-3xl font-semibold mb-8 text-white font-heading">
                Start the Conversation
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold text-white mb-3 font-heading">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-surface/80 border border-border rounded-lg text-white placeholder-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors font-body backdrop-blur-sm"
                    placeholder="John Doe"
                  />
                </div>

                {/* Company */}
                <div>
                  <label className="block text-sm font-semibold text-white mb-3 font-heading">
                    Company
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-surface/80 border border-border rounded-lg text-white placeholder-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors font-body backdrop-blur-sm"
                    placeholder="Acme Corp"
                  />
                </div>

                {/* Email and Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-white mb-3 font-heading">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-surface/80 border border-border rounded-lg text-white placeholder-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors font-body backdrop-blur-sm"
                      placeholder="john@acme.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-white mb-3 font-heading">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-surface/80 border border-border rounded-lg text-white placeholder-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors font-body backdrop-blur-sm"
                      placeholder="+971 50 000 0000"
                    />
                  </div>
                </div>

                {/* Service */}
                <div>
                  <label className="block text-sm font-semibold text-white mb-3 font-heading">
                    What can we help with?
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-surface/80 border border-border rounded-lg text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors font-body backdrop-blur-sm"
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
                  <label className="block text-sm font-semibold text-white mb-3 font-heading">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full px-4 py-3 bg-surface/80 border border-border rounded-lg text-white placeholder-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors resize-none font-body backdrop-blur-sm"
                    placeholder="Tell us about your project and what you are looking to achieve..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-primary text-[#111318] font-semibold rounded-lg hover:bg-primary/90 transition-colors btn-glow flex items-center justify-center gap-2 font-heading"
                >
                  Start the Conversation
                  <ArrowRight className="w-5 h-5" />
                </button>
              </form>
            </div>

            {/* Contact Info Sidebar */}
            <div ref={sidebarRef} className="lg:col-span-1" style={{ opacity: 0 }}>
              <div className="sticky top-20">
                <h3 className="text-2xl font-semibold mb-8 text-white font-heading">
                  Get in Touch
                </h3>

                <div className="space-y-8">
                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <Mail className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-sm text-muted mb-2 font-body">
                        Email
                      </p>
                      <a
                        href={`mailto:${siteConfig.email}`}
                        className="text-white hover:text-primary transition-colors font-semibold font-heading"
                      >
                        {siteConfig.email}
                      </a>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-sm text-muted mb-2 font-body">
                        Location
                      </p>
                      <p className="text-white font-semibold font-heading">
                        {siteConfig.location}
                      </p>
                    </div>
                  </div>

                  {/* Response Time */}
                  <div className="mt-12 p-6 bg-surface/60 backdrop-blur-sm border border-border/60 rounded-xl">
                    <p className="text-sm text-muted mb-2 font-body">
                      Response Time
                    </p>
                    <p className="text-white font-semibold font-heading">
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
