"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { X, Plus, Trash2, Upload, RotateCcw, Save, Image as ImageIcon } from "lucide-react";
import type { SectionDefinition, FieldDefinition } from "@/lib/contentStore";
import {
  getContentOverride,
  setContentOverride,
  resetContentOverride,
  hasOverride,
  fileToBase64,
} from "@/lib/contentStore";

interface EditModalProps {
  section: SectionDefinition | null;
  onClose: () => void;
  onSave: () => void;
}

function TextField({
  field,
  value,
  onChange,
}: {
  field: FieldDefinition;
  value: string;
  onChange: (val: string) => void;
}) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-[#C8D6E5]">{field.label}</label>
      <input
        type={field.type === "url" ? "url" : "text"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 bg-[#0F1117] border border-[#1F2733] rounded-lg text-white placeholder-[#5A6B80] focus:border-[#00C4AF] focus:ring-1 focus:ring-[#00C4AF] outline-none transition-colors"
        placeholder={`Enter ${field.label.toLowerCase()}`}
      />
    </div>
  );
}

function TextAreaField({
  field,
  value,
  onChange,
}: {
  field: FieldDefinition;
  value: string;
  onChange: (val: string) => void;
}) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-[#C8D6E5]">{field.label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={4}
        className="w-full px-4 py-3 bg-[#0F1117] border border-[#1F2733] rounded-lg text-white placeholder-[#5A6B80] focus:border-[#00C4AF] focus:ring-1 focus:ring-[#00C4AF] outline-none transition-colors resize-y"
        placeholder={`Enter ${field.label.toLowerCase()}`}
      />
    </div>
  );
}

function ArrayField({
  field,
  value,
  onChange,
}: {
  field: FieldDefinition;
  value: string[];
  onChange: (val: string[]) => void;
}) {
  const addItem = () => {
    onChange([...value, ""]);
  };

  const removeItem = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, newVal: string) => {
    const updated = value.map((item, i) => (i === index ? newVal : item));
    onChange(updated);
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-[#C8D6E5]">{field.label}</label>
      <div className="space-y-2">
        {value.map((item, idx) => (
          <div key={idx} className="flex gap-2">
            <input
              type="text"
              value={item}
              onChange={(e) => updateItem(idx, e.target.value)}
              className="flex-1 px-4 py-2.5 bg-[#0F1117] border border-[#1F2733] rounded-lg text-white placeholder-[#5A6B80] focus:border-[#00C4AF] focus:ring-1 focus:ring-[#00C4AF] outline-none transition-colors text-sm"
              placeholder={`Item ${idx + 1}`}
            />
            <button
              onClick={() => removeItem(idx)}
              className="p-2.5 rounded-lg bg-[#1F2733] hover:bg-red-500/20 text-red-400 transition-colors flex-shrink-0"
              title="Remove item"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
      <button
        onClick={addItem}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1F2733] hover:bg-[#00C4AF]/20 text-[#00C4AF] text-sm transition-colors"
      >
        <Plus className="w-4 h-4" />
        Add Item
      </button>
    </div>
  );
}

function SelectField({
  field,
  value,
  onChange,
}: {
  field: FieldDefinition;
  value: string;
  onChange: (val: string) => void;
}) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-[#C8D6E5]">{field.label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 bg-[#0F1117] border border-[#1F2733] rounded-lg text-white focus:border-[#00C4AF] focus:ring-1 focus:ring-[#00C4AF] outline-none transition-colors"
      >
        {field.options?.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

function ImageField({
  field,
  value,
  onChange,
}: {
  field: FieldDefinition;
  value: string;
  onChange: (val: string) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    // Validate file size (max 2MB for localStorage)
    if (file.size > 2 * 1024 * 1024) {
      alert("Image must be under 2MB. Please use a URL for larger images.");
      return;
    }

    try {
      const base64 = await fileToBase64(file);
      onChange(base64);
    } catch {
      alert("Failed to process image. Try a URL instead.");
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-[#C8D6E5]">{field.label}</label>

      {/* URL Input */}
      <input
        type="url"
        value={value.startsWith("data:") ? "" : value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 bg-[#0F1117] border border-[#1F2733] rounded-lg text-white placeholder-[#5A6B80] focus:border-[#00C4AF] focus:ring-1 focus:ring-[#00C4AF] outline-none transition-colors"
        placeholder="Paste image URL or upload below"
      />

      {/* Upload Button */}
      <div className="flex gap-3 items-center">
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1F2733] hover:bg-[#00C4AF]/20 text-[#00C4AF] text-sm transition-colors"
        >
          <Upload className="w-4 h-4" />
          Upload Image
        </button>
        {value && (
          <button
            onClick={() => onChange("")}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1F2733] hover:bg-red-500/20 text-red-400 text-sm transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Remove
          </button>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      {/* Preview */}
      {value && (
        <div className="mt-3 rounded-lg border border-[#1F2733] overflow-hidden bg-[#0F1117] p-2">
          <div className="relative w-full h-40 flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={value}
              alt="Preview"
              className="max-w-full max-h-full object-contain rounded"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
        </div>
      )}

      {!value && (
        <div className="mt-3 rounded-lg border border-dashed border-[#1F2733] p-6 flex flex-col items-center justify-center text-[#5A6B80]">
          <ImageIcon className="w-8 h-8 mb-2" />
          <span className="text-sm">No image selected</span>
        </div>
      )}
    </div>
  );
}

export default function EditModal({ section, onClose, onSave }: EditModalProps) {
  const [formData, setFormData] = useState<Record<string, unknown>>({});
  const [isModified, setIsModified] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const loadData = useCallback(() => {
    if (!section) return;
    const defaults = section.getDefaults();
    const current = getContentOverride(section.page, section.id, defaults);
    setFormData({ ...current });
    setIsModified(false);
  }, [section]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  if (!section) return null;

  const updateField = (key: string, value: unknown) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setIsModified(true);
  };

  const handleSave = () => {
    setContentOverride(section.page, section.id, formData);
    setIsModified(false);
    onSave();
  };

  const handleReset = () => {
    resetContentOverride(section.page, section.id);
    loadData();
    setShowResetConfirm(false);
    onSave();
  };

  const isOverridden = hasOverride(section.page, section.id);

  return (
    <div className="fixed inset-0 z-50 flex" data-lenis-prevent>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Panel */}
      <div className="relative ml-auto w-full max-w-2xl bg-[#1A1D24] border-l border-[#1F2733] flex flex-col h-full shadow-2xl animate-in slide-in-from-right">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#1F2733]">
          <div>
            <h2 className="font-heading text-xl font-bold text-white">
              Edit: {section.title}
            </h2>
            <p className="text-[#8A9BB0] text-sm mt-1">
              {section.page} page
              {isOverridden && (
                <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-[#00C4AF]/20 text-[#00C4AF]">
                  Modified
                </span>
              )}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-[#1F2733] text-[#8A9BB0] hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Fields */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          {section.fields.map((field) => {
            const value = formData[field.key];

            switch (field.type) {
              case "text":
              case "url":
              case "number":
                return (
                  <TextField
                    key={field.key}
                    field={field}
                    value={(value as string) || ""}
                    onChange={(v) => updateField(field.key, v)}
                  />
                );
              case "textarea":
                return (
                  <TextAreaField
                    key={field.key}
                    field={field}
                    value={(value as string) || ""}
                    onChange={(v) => updateField(field.key, v)}
                  />
                );
              case "array":
                return (
                  <ArrayField
                    key={field.key}
                    field={field}
                    value={(value as string[]) || []}
                    onChange={(v) => updateField(field.key, v)}
                  />
                );
              case "select":
                return (
                  <SelectField
                    key={field.key}
                    field={field}
                    value={(value as string) || field.options?.[0] || ""}
                    onChange={(v) => updateField(field.key, v)}
                  />
                );
              case "image":
                return (
                  <ImageField
                    key={field.key}
                    field={field}
                    value={(value as string) || ""}
                    onChange={(v) => updateField(field.key, v)}
                  />
                );
              default:
                return null;
            }
          })}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-[#1F2733] flex items-center gap-3">
          <button
            onClick={handleSave}
            disabled={!isModified}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm transition-colors ${
              isModified
                ? "bg-[#00C4AF] text-[#060810] hover:bg-[#00C4AF]/90"
                : "bg-[#1F2733] text-[#5A6B80] cursor-not-allowed"
            }`}
          >
            <Save className="w-4 h-4" />
            Save Changes
          </button>

          {isOverridden && !showResetConfirm && (
            <button
              onClick={() => setShowResetConfirm(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#1F2733] hover:bg-orange-500/20 text-orange-400 text-sm transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Reset to Default
            </button>
          )}

          {showResetConfirm && (
            <div className="flex items-center gap-2">
              <span className="text-orange-400 text-sm">Are you sure?</span>
              <button
                onClick={handleReset}
                className="px-3 py-1.5 rounded bg-orange-500/20 text-orange-400 text-sm hover:bg-orange-500/30 transition-colors"
              >
                Yes, reset
              </button>
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-3 py-1.5 rounded bg-[#1F2733] text-[#8A9BB0] text-sm hover:text-white transition-colors"
              >
                Cancel
              </button>
            </div>
          )}

          <button
            onClick={onClose}
            className="ml-auto px-4 py-2.5 rounded-lg bg-[#1F2733] hover:bg-[#2A2F3A] text-[#8A9BB0] hover:text-white text-sm transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
