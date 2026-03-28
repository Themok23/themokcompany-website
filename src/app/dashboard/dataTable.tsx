"use client";

import { useState, useMemo } from "react";
import {
  Edit2,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Search,
  Filter,
  ExternalLink,
} from "lucide-react";
import type { SectionDefinition } from "@/lib/contentStore";
import {
  getContentOverride,
  hasOverride,
  getContentMeta,
} from "@/lib/contentStore";

export interface ColumnDef {
  key: string;
  label: string;
  width?: string;
  sortable?: boolean;
  filterable?: boolean;
  filterOptions?: string[];
  render?: (value: unknown, row: Record<string, unknown>) => React.ReactNode;
}

interface DataTableProps {
  sections: SectionDefinition[];
  columns: ColumnDef[];
  onEdit: (section: SectionDefinition) => void;
  slugPrefix?: string;
}

type SortDir = "asc" | "desc" | null;

function formatDate(iso?: string): string {
  if (!iso) return "-";
  const d = new Date(iso);
  return d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatDateTime(iso?: string): string {
  if (!iso) return "-";
  const d = new Date(iso);
  return d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function DataTable({
  sections,
  columns,
  onEdit,
  slugPrefix,
}: DataTableProps) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<Record<string, string>>({});

  // Build enriched data rows
  const rows = useMemo(() => {
    return sections.map((section) => {
      const defaults = section.getDefaults();
      const current = getContentOverride(section.page, section.id, defaults);
      const meta = getContentMeta(section.page, section.id);
      const isModified = hasOverride(section.page, section.id);

      return {
        _section: section,
        _isModified: isModified,
        _modifiedAt: meta.modifiedAt || null,
        _createdAt: meta.createdAt || (current.date as string) || null,
        ...current,
      } as Record<string, unknown>;
    });
  }, [sections]);

  // Filter
  const filtered = useMemo(() => {
    let result = rows;

    // Text search across all text fields
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter((row) => {
        return Object.entries(row).some(([key, val]) => {
          if (key.startsWith("_")) return false;
          if (typeof val === "string") return val.toLowerCase().includes(q);
          return false;
        });
      });
    }

    // Column filters
    for (const [key, filterVal] of Object.entries(filters)) {
      if (!filterVal || filterVal === "__all__") continue;
      result = result.filter((row) => {
        const val = row[key];
        if (typeof val === "string") return val.toLowerCase() === filterVal.toLowerCase();
        return false;
      });
    }

    return result;
  }, [rows, searchQuery, filters]);

  // Sort
  const sorted = useMemo(() => {
    if (!sortKey || !sortDir) return filtered;

    return [...filtered].sort((a, b) => {
      let aVal: unknown;
      let bVal: unknown;

      if (sortKey === "_modifiedAt" || sortKey === "_createdAt") {
        aVal = a[sortKey] || "";
        bVal = b[sortKey] || "";
      } else {
        aVal = a[sortKey];
        bVal = b[sortKey];
      }

      const aStr = typeof aVal === "string" ? aVal : String(aVal || "");
      const bStr = typeof bVal === "string" ? bVal : String(bVal || "");

      const cmp = aStr.localeCompare(bStr);
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [filtered, sortKey, sortDir]);

  const handleSort = (key: string) => {
    if (sortKey === key) {
      if (sortDir === "asc") setSortDir("desc");
      else if (sortDir === "desc") {
        setSortKey(null);
        setSortDir(null);
      }
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const filterableColumns = columns.filter((c) => c.filterable && c.filterOptions);

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex items-center gap-4 flex-wrap">
        {/* Search */}
        <div className="relative flex-1 min-w-[240px] max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5A6B80]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2.5 bg-[#1A1D24] border border-[#1F2733] rounded-lg text-white placeholder-[#5A6B80] text-sm focus:border-[#00C4AF] focus:ring-1 focus:ring-[#00C4AF] outline-none transition-colors"
          />
        </div>

        {/* Filters */}
        {filterableColumns.map((col) => (
          <div key={col.key} className="relative">
            <select
              value={filters[col.key] || "__all__"}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, [col.key]: e.target.value }))
              }
              className="appearance-none pl-3 pr-8 py-2.5 bg-[#1A1D24] border border-[#1F2733] rounded-lg text-[#8A9BB0] text-sm focus:border-[#00C4AF] outline-none cursor-pointer"
            >
              <option value="__all__">All {col.label}</option>
              {col.filterOptions?.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            <Filter className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#5A6B80] pointer-events-none" />
          </div>
        ))}

        {/* Count */}
        <span className="text-xs text-[#5A6B80] ml-auto">
          {sorted.length} of {rows.length} items
        </span>
      </div>

      {/* Table */}
      <div className="bg-[#1A1D24] border border-[#1F2733] rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#1F2733]">
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className={`px-4 py-3 text-left text-xs font-medium text-[#5A6B80] uppercase tracking-wider ${
                      col.sortable !== false ? "cursor-pointer hover:text-[#8A9BB0] select-none" : ""
                    }`}
                    style={col.width ? { width: col.width } : undefined}
                    onClick={() => col.sortable !== false && handleSort(col.key)}
                  >
                    <div className="flex items-center gap-1.5">
                      {col.label}
                      {col.sortable !== false && (
                        <span className="flex-shrink-0">
                          {sortKey === col.key ? (
                            sortDir === "asc" ? (
                              <ArrowUp className="w-3.5 h-3.5 text-[#00C4AF]" />
                            ) : (
                              <ArrowDown className="w-3.5 h-3.5 text-[#00C4AF]" />
                            )
                          ) : (
                            <ArrowUpDown className="w-3.5 h-3.5 opacity-40" />
                          )}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
                {/* Date columns */}
                <th
                  className="px-4 py-3 text-left text-xs font-medium text-[#5A6B80] uppercase tracking-wider cursor-pointer hover:text-[#8A9BB0] select-none"
                  onClick={() => handleSort("_modifiedAt")}
                >
                  <div className="flex items-center gap-1.5">
                    Modified
                    <span className="flex-shrink-0">
                      {sortKey === "_modifiedAt" ? (
                        sortDir === "asc" ? (
                          <ArrowUp className="w-3.5 h-3.5 text-[#00C4AF]" />
                        ) : (
                          <ArrowDown className="w-3.5 h-3.5 text-[#00C4AF]" />
                        )
                      ) : (
                        <ArrowUpDown className="w-3.5 h-3.5 opacity-40" />
                      )}
                    </span>
                  </div>
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-[#5A6B80] uppercase tracking-wider w-24">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1F2733]/50">
              {sorted.map((row) => {
                const section = row._section as SectionDefinition;
                const isModified = row._isModified as boolean;

                return (
                  <tr
                    key={section.id}
                    className="hover:bg-[#0F1117]/50 transition-colors group"
                  >
                    {columns.map((col) => {
                      const val = row[col.key];
                      return (
                        <td key={col.key} className="px-4 py-3.5 text-sm">
                          {col.render ? (
                            col.render(val, row)
                          ) : typeof val === "string" ? (
                            <span className="text-[#C8D6E5]">
                              {val.length > 60 ? val.substring(0, 57) + "..." : val}
                            </span>
                          ) : (
                            <span className="text-[#5A6B80]">-</span>
                          )}
                        </td>
                      );
                    })}
                    {/* Modified date */}
                    <td className="px-4 py-3.5 text-sm">
                      {isModified ? (
                        <span className="text-[#8A9BB0] text-xs" title={formatDateTime(row._modifiedAt as string | undefined)}>
                          {formatDate(row._modifiedAt as string | undefined)}
                        </span>
                      ) : (
                        <span className="text-[#5A6B80] text-xs">Original</span>
                      )}
                    </td>
                    {/* Actions */}
                    <td className="px-4 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {slugPrefix && (
                          <a
                            href={`${slugPrefix}${(row as Record<string, unknown>).slug || section.id.replace(/^(case-|venture-|insight-)/, "")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded text-[#5A6B80] hover:text-[#00C4AF] hover:bg-[#00C4AF]/10 transition-colors opacity-0 group-hover:opacity-100"
                            title="View on site"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                        <button
                          onClick={() => onEdit(section)}
                          className="p-1.5 rounded text-[#00C4AF] hover:bg-[#00C4AF]/20 transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {sorted.length === 0 && (
                <tr>
                  <td
                    colSpan={columns.length + 2}
                    className="px-4 py-12 text-center text-[#5A6B80] text-sm"
                  >
                    No items match your search or filters
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
