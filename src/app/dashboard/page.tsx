"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ChevronRight,
  Edit2,
  Home,
  FileText,
  Briefcase,
  Zap,
  Users,
  MessageSquare,
  Globe,
  Compass,
  Check,
  AlertCircle,
  Settings,
  LogOut,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";
import {
  getSectionDefsForPage,
  getContentOverride,
  hasOverride,
} from "@/lib/contentStore";
import type { SectionDefinition } from "@/lib/contentStore";
import EditModal from "./editModal";
import DataTable from "./dataTable";
import type { ColumnDef } from "./dataTable";

// Simple password auth
const AUTH_PASSWORD = "@123Themok@123";
const AUTH_KEY = "mok-dashboard-auth";

function hashPassword(pw: string): string {
  let hash = 0;
  for (let i = 0; i < pw.length; i++) {
    const char = pw.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return String(hash);
}

const PASSWORD_HASH = hashPassword(AUTH_PASSWORD);

function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(AUTH_KEY) === PASSWORD_HASH;
}

function setAuthenticated(): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(AUTH_KEY, PASSWORD_HASH);
}

function clearAuthentication(): void {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(AUTH_KEY);
}

// Login Screen
function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (hashPassword(password) === PASSWORD_HASH) {
      setAuthenticated();
      onLogin();
    } else {
      setError(true);
      setTimeout(() => setError(false), 3000);
    }
  };

  return (
    <div className="flex h-screen bg-[#060810] items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-[#00C4AF]/10 border border-[#00C4AF]/30 flex items-center justify-center">
            <Lock className="w-8 h-8 text-[#00C4AF]" />
          </div>
          <h1 className="font-heading text-3xl font-bold text-white mb-2">
            MOK Dashboard
          </h1>
          <p className="text-[#8A9BB0] text-sm">Enter your password to access the content manager</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              autoFocus
              className={`w-full px-5 py-4 pr-12 bg-[#1A1D24] border rounded-lg text-white placeholder-[#5A6B80] focus:ring-1 outline-none transition-colors ${error ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-[#1F2733] focus:border-[#00C4AF] focus:ring-[#00C4AF]"}`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#5A6B80] hover:text-white transition-colors"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          {error && (
            <p className="text-red-400 text-sm">Incorrect password. Please try again.</p>
          )}

          <button
            type="submit"
            className="w-full py-4 bg-[#00C4AF] text-[#060810] font-semibold rounded-lg hover:bg-[#00C4AF]/90 transition-colors font-heading"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

// Page types
type PageKey = "home" | "about" | "what-we-do" | "our-work" | "insights" | "ventures" | "contact" | "careers" | "settings";

interface PageConfig {
  id: PageKey;
  label: string;
  icon: React.ReactNode;
}

const pages: PageConfig[] = [
  { id: "home", label: "Home", icon: <Home className="w-4 h-4" /> },
  { id: "about", label: "About", icon: <FileText className="w-4 h-4" /> },
  { id: "what-we-do", label: "What We Do", icon: <Briefcase className="w-4 h-4" /> },
  { id: "our-work", label: "Our Work", icon: <Zap className="w-4 h-4" /> },
  { id: "insights", label: "Insights", icon: <Compass className="w-4 h-4" /> },
  { id: "ventures", label: "Ventures", icon: <Globe className="w-4 h-4" /> },
  { id: "contact", label: "Contact", icon: <MessageSquare className="w-4 h-4" /> },
  { id: "careers", label: "Careers", icon: <Users className="w-4 h-4" /> },
];

// Table view pages and their column configs
const TABLE_PAGES = new Set<string>(["our-work", "insights", "ventures"]);

const caseStudyColumns: ColumnDef[] = [
  {
    key: "client",
    label: "Client",
    width: "160px",
    render: (val, row) => (
      <div>
        <span className="text-white font-medium">{val as string}</span>
        {(row._isModified as boolean) && (
          <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded-full bg-[#00C4AF]/20 text-[#00C4AF]">Edited</span>
        )}
      </div>
    ),
  },
  { key: "title", label: "Project", width: "200px" },
  {
    key: "category",
    label: "Category",
    width: "140px",
    filterable: true,
    filterOptions: ["Enterprise Platform", "AI & Data", "Corporate Branding", "Experience Design", "SaaS Product", "Emerging Tech", "Digital Marketing", "Corporate Identity", "Innovation Lab", "Digital Transformation"],
    render: (val) => (
      <span className="inline-flex px-2 py-0.5 rounded-full text-xs bg-[#1F2733] text-[#8A9BB0]">{val as string}</span>
    ),
  },
  {
    key: "featured",
    label: "Featured",
    width: "90px",
    filterable: true,
    filterOptions: ["true", "false"],
    render: (val) => (
      val === "true"
        ? <span className="inline-flex items-center gap-1 text-[#00C4AF] text-xs"><Check className="w-3 h-3" /> Yes</span>
        : <span className="text-[#5A6B80] text-xs">No</span>
    ),
  },
  { key: "description", label: "Description" },
];

const insightColumns: ColumnDef[] = [
  {
    key: "title",
    label: "Title",
    width: "280px",
    render: (val, row) => (
      <div>
        <span className="text-white font-medium">{(val as string).length > 50 ? (val as string).substring(0, 47) + "..." : val as string}</span>
        {(row._isModified as boolean) && (
          <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded-full bg-[#00C4AF]/20 text-[#00C4AF]">Edited</span>
        )}
      </div>
    ),
  },
  {
    key: "category",
    label: "Category",
    width: "160px",
    filterable: true,
    filterOptions: ["articles", "research", "thought-leadership"],
    render: (val) => (
      <span className="inline-flex px-2 py-0.5 rounded-full text-xs bg-[#1F2733] text-[#8A9BB0] capitalize">{val as string}</span>
    ),
  },
  { key: "date", label: "Date", width: "120px" },
  { key: "readTime", label: "Read Time", width: "100px" },
  {
    key: "featured",
    label: "Featured",
    width: "90px",
    filterable: true,
    filterOptions: ["true", "false"],
    render: (val) => (
      val === "true"
        ? <span className="inline-flex items-center gap-1 text-[#00C4AF] text-xs"><Check className="w-3 h-3" /> Yes</span>
        : <span className="text-[#5A6B80] text-xs">No</span>
    ),
  },
];

const ventureColumns: ColumnDef[] = [
  {
    key: "name",
    label: "Product",
    width: "160px",
    render: (val, row) => (
      <div>
        <span className="text-white font-medium">{val as string}</span>
        {(row._isModified as boolean) && (
          <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded-full bg-[#00C4AF]/20 text-[#00C4AF]">Edited</span>
        )}
      </div>
    ),
  },
  { key: "tagline", label: "Tagline", width: "220px" },
  {
    key: "status",
    label: "Status",
    width: "120px",
    filterable: true,
    filterOptions: ["active", "launched", "stealth", "coming-soon"],
    render: (val) => {
      const colors: Record<string, string> = {
        active: "bg-green-500/20 text-green-400",
        launched: "bg-blue-500/20 text-blue-400",
        stealth: "bg-purple-500/20 text-purple-400",
        "coming-soon": "bg-yellow-500/20 text-yellow-400",
      };
      const cls = colors[val as string] || "bg-[#1F2733] text-[#8A9BB0]";
      return <span className={`inline-flex px-2 py-0.5 rounded-full text-xs ${cls}`}>{val as string}</span>;
    },
  },
  {
    key: "url",
    label: "URL",
    width: "140px",
    sortable: false,
    render: (val) =>
      val ? (
        <a href={val as string} target="_blank" rel="noopener noreferrer" className="text-[#00C4AF] text-xs hover:underline truncate block max-w-[130px]">
          {(val as string).replace(/^https?:\/\//, "")}
        </a>
      ) : (
        <span className="text-[#5A6B80] text-xs">-</span>
      ),
  },
  { key: "description", label: "Description" },
];

function getColumnsForPage(page: string): ColumnDef[] {
  switch (page) {
    case "our-work": return caseStudyColumns;
    case "insights": return insightColumns;
    case "ventures": return ventureColumns;
    default: return [];
  }
}

function getSlugPrefixForPage(page: string): string | undefined {
  switch (page) {
    case "our-work": return "/our-work/";
    case "ventures": return "/ventures/";
    default: return undefined;
  }
}

// Settings page component
function SettingsPage() {
  return (
    <div className="p-8 max-w-4xl">
      <div className="space-y-8">
        {/* Site Info */}
        <div className="bg-[#1A1D24] border border-[#1F2733] rounded-lg p-6">
          <h3 className="font-heading text-lg font-semibold text-white mb-4">Site Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-[#5A6B80]">Company</span>
              <p className="text-white mt-1">The Mok Company</p>
            </div>
            <div>
              <span className="text-[#5A6B80]">Website</span>
              <p className="text-white mt-1">mok-website.vercel.app</p>
            </div>
            <div>
              <span className="text-[#5A6B80]">Email</span>
              <p className="text-white mt-1">hello@themok.company</p>
            </div>
            <div>
              <span className="text-[#5A6B80]">Location</span>
              <p className="text-white mt-1">Dubai, UAE</p>
            </div>
          </div>
        </div>

        {/* Content Stats */}
        <div className="bg-[#1A1D24] border border-[#1F2733] rounded-lg p-6">
          <h3 className="font-heading text-lg font-semibold text-white mb-4">Content Overview</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {pages.filter(p => p.id !== "settings").map((page) => {
              const defs = getSectionDefsForPage(page.id);
              const overrides = defs.filter((s) => hasOverride(s.page, s.id)).length;
              return (
                <div key={page.id} className="text-center p-4 bg-[#0F1117] rounded-lg">
                  <p className="text-2xl font-bold text-white">{defs.length}</p>
                  <p className="text-[#5A6B80] text-xs mt-1">{page.label} sections</p>
                  {overrides > 0 && (
                    <p className="text-[#00C4AF] text-xs mt-1">{overrides} edited</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Social Links */}
        <div className="bg-[#1A1D24] border border-[#1F2733] rounded-lg p-6">
          <h3 className="font-heading text-lg font-semibold text-white mb-4">Social Links</h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between p-3 bg-[#0F1117] rounded-lg">
              <span className="text-[#8A9BB0]">LinkedIn</span>
              <span className="text-[#00C4AF]">linkedin.com/company/themokcompany</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-[#0F1117] rounded-lg">
              <span className="text-[#8A9BB0]">Instagram</span>
              <span className="text-[#00C4AF]">instagram.com/themokcompany</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-[#0F1117] rounded-lg">
              <span className="text-[#8A9BB0]">X (Twitter)</span>
              <span className="text-[#00C4AF]">x.com/themokcompany</span>
            </div>
          </div>
        </div>

        {/* CMS Info */}
        <div className="bg-[#1A1D24] border border-[#1F2733] rounded-lg p-6">
          <h3 className="font-heading text-lg font-semibold text-white mb-4">System</h3>
          <div className="space-y-2 text-sm text-[#8A9BB0]">
            <p>CMS Type: Client-side (localStorage)</p>
            <p>Framework: Next.js 16 + Turbopack</p>
            <p>Hosting: Vercel</p>
            <p>All edits are stored in your browser and persist across sessions.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Content Card
function ContentCard({
  section,
  onEdit,
}: {
  section: SectionDefinition;
  onEdit: () => void;
}) {
  const defaults = section.getDefaults();
  const current = getContentOverride(section.page, section.id, defaults);
  const isModified = hasOverride(section.page, section.id);

  const previewParts: string[] = [];
  for (const field of section.fields) {
    if (field.type === "text" || field.type === "textarea") {
      const val = current[field.key];
      if (typeof val === "string" && val.length > 0) {
        previewParts.push(val);
        if (previewParts.length >= 2) break;
      }
    }
  }
  const preview = previewParts.join(" - ");
  const truncated = preview.length > 140 ? `${preview.substring(0, 137)}...` : preview;

  const imageField = section.fields.find((f) => f.type === "image");
  const imageUrl = imageField ? (current[imageField.key] as string) : null;

  return (
    <div className="bg-[#1A1D24] border border-[#1F2733] rounded-lg p-6 hover:border-[#00C4AF]/30 transition-colors group">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2">
          <h3 className="font-heading text-lg font-semibold text-white">
            {section.title}
          </h3>
          {isModified && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-[#00C4AF]/20 text-[#00C4AF]">
              Edited
            </span>
          )}
        </div>
        <button
          onClick={onEdit}
          className="p-2 rounded-lg bg-[#1F2733] hover:bg-[#00C4AF]/20 text-[#00C4AF] transition-colors group-hover:bg-[#00C4AF]/10"
          title="Edit this section"
        >
          <Edit2 className="w-4 h-4" />
        </button>
      </div>

      {imageUrl && (
        <div className="mb-3 rounded-lg overflow-hidden bg-[#0F1117] h-24 flex items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt=""
            className="max-w-full max-h-full object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        </div>
      )}

      <p className="text-[#8A9BB0] text-sm leading-relaxed">{truncated || "No content yet"}</p>

      <div className="mt-3 flex items-center gap-4 text-xs text-[#5A6B80]">
        <span>{section.fields.length} editable fields</span>
        {section.fields.some((f) => f.type === "image") && (
          <span className="flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            Has image
          </span>
        )}
        {section.fields.some((f) => f.type === "array") && (
          <span>Has list items</span>
        )}
      </div>
    </div>
  );
}

// Main Dashboard
function DashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageParam = searchParams.get("page") as PageKey | null;

  const [currentPage, setCurrentPage] = useState<PageKey>(pageParam || "home");
  const [editingSection, setEditingSection] = useState<SectionDefinition | null>(null);
  const [sections, setSections] = useState<SectionDefinition[]>([]);
  const [toast, setToast] = useState<string | null>(null);

  const currentPageLabel = currentPage === "settings"
    ? "Settings"
    : pages.find((p) => p.id === currentPage)?.label || "Home";

  const isTablePage = TABLE_PAGES.has(currentPage);

  const loadSections = useCallback(() => {
    if (currentPage === "settings") {
      setSections([]);
      return;
    }
    const defs = getSectionDefsForPage(currentPage);
    setSections(defs);
  }, [currentPage]);

  useEffect(() => {
    loadSections();
  }, [loadSections]);

  // Sync URL with page state
  useEffect(() => {
    const url = new URL(window.location.href);
    if (url.searchParams.get("page") !== currentPage) {
      url.searchParams.set("page", currentPage);
      router.replace(url.pathname + url.search, { scroll: false });
    }
  }, [currentPage, router]);

  // Sync page state with URL on mount/navigation
  useEffect(() => {
    if (pageParam && pageParam !== currentPage) {
      setCurrentPage(pageParam);
    }
  }, [pageParam]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleSave = () => {
    loadSections();
    showToast("Content saved successfully");
  };

  const handleLogout = () => {
    clearAuthentication();
    window.location.reload();
  };

  const overrideCount = sections.filter((s) => hasOverride(s.page, s.id)).length;

  return (
    <div className="flex h-screen bg-[#060810]" data-lenis-prevent>
      {/* Sidebar */}
      <aside className="w-64 bg-[#1A1D24] border-r border-[#1F2733] flex flex-col flex-shrink-0">
        <div className="px-6 py-6 border-b border-[#1F2733]">
          <h1 className="font-heading text-xl font-bold text-white">MOK Dashboard</h1>
          <p className="text-[#8A9BB0] text-xs mt-1">Content Management</p>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-2">
          {pages.map((page) => {
            const pageOverrides = getSectionDefsForPage(page.id).filter((s) => hasOverride(s.page, s.id)).length;

            return (
              <button
                key={page.id}
                onClick={() => setCurrentPage(page.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left ${currentPage === page.id ? "bg-[#00C4AF]/20 text-[#00C4AF] border border-[#00C4AF]/30" : "text-[#8A9BB0] hover:text-white hover:bg-[#1F2733]"}`}
              >
                <span className="flex-shrink-0">{page.icon}</span>
                <span className="text-sm font-medium flex-1">{page.label}</span>
                {pageOverrides > 0 && (
                  <span className="text-xs px-1.5 py-0.5 rounded-full bg-[#00C4AF]/20 text-[#00C4AF]">
                    {pageOverrides}
                  </span>
                )}
                {currentPage === page.id && <ChevronRight className="w-4 h-4 flex-shrink-0" />}
              </button>
            );
          })}

          {/* Settings */}
          <div className="pt-2 mt-2 border-t border-[#1F2733]">
            <button
              onClick={() => setCurrentPage("settings")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left ${currentPage === "settings" ? "bg-[#00C4AF]/20 text-[#00C4AF] border border-[#00C4AF]/30" : "text-[#8A9BB0] hover:text-white hover:bg-[#1F2733]"}`}
            >
              <Settings className="w-4 h-4" />
              <span className="text-sm font-medium flex-1">Settings</span>
              {currentPage === "settings" && <ChevronRight className="w-4 h-4 flex-shrink-0" />}
            </button>
          </div>
        </nav>

        {/* Logout */}
        <div className="px-4 py-4 border-t border-[#1F2733]">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#1F2733] hover:bg-red-500/20 text-[#8A9BB0] hover:text-red-400 text-sm transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col bg-[#060810] min-w-0">
        <header className="border-b border-[#1F2733] bg-[#0F1117] flex-shrink-0">
          <div className="px-8 py-6">
            <div className="flex items-center gap-2 mb-4 text-[#8A9BB0]">
              <span className="text-sm">Dashboard</span>
              <ChevronRight className="w-4 h-4" />
              <span className="text-sm text-white">{currentPageLabel}</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-heading text-3xl font-bold text-white">
                  {currentPage === "settings" ? "Settings" : `${currentPageLabel} Page`}
                </h2>
                {currentPage !== "settings" && (
                  <p className="text-[#8A9BB0] text-sm mt-2">
                    {sections.length} {isTablePage ? "item" : "section"}{sections.length !== 1 ? "s" : ""} available
                    {overrideCount > 0 && (
                      <span className="ml-2 text-[#00C4AF]">
                        ({overrideCount} modified)
                      </span>
                    )}
                  </p>
                )}
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto">
          {currentPage === "settings" ? (
            <SettingsPage />
          ) : isTablePage && sections.length > 0 ? (
            <div className="p-8 max-w-7xl">
              <DataTable
                sections={sections}
                columns={getColumnsForPage(currentPage)}
                onEdit={(section) => setEditingSection(section)}
                slugPrefix={getSlugPrefixForPage(currentPage)}
              />
            </div>
          ) : sections.length > 0 ? (
            <div className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl">
                {sections.map((section) => (
                  <ContentCard
                    key={section.id}
                    section={section}
                    onEdit={() => setEditingSection(section)}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-[#8A9BB0]">No content sections yet for this page.</p>
            </div>
          )}
        </div>
      </main>

      <EditModal
        section={editingSection}
        onClose={() => setEditingSection(null)}
        onSave={handleSave}
      />

      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3 rounded-lg bg-[#00C4AF] text-[#060810] font-medium text-sm shadow-lg">
          <Check className="w-4 h-4" />
          {toast}
        </div>
      )}
    </div>
  );
}

// Auth wrapper
export default function Dashboard() {
  const [mounted, setMounted] = useState(false);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    setMounted(true);
    setAuthed(isAuthenticated());
  }, []);

  if (!mounted) {
    return (
      <div className="flex h-screen bg-[#060810] items-center justify-center">
        <div className="text-[#8A9BB0]">Loading...</div>
      </div>
    );
  }

  if (!authed) {
    return <LoginScreen onLogin={() => setAuthed(true)} />;
  }

  return <Suspense fallback={<div className="flex h-screen bg-[#060810] items-center justify-center"><div className="text-[#8A9BB0]">Loading...</div></div>}><DashboardContent /></Suspense>;
}
