"use client";

import { useState } from "react";
import { Save } from "lucide-react";

type Field = {
  key: string;
  label: string;
  type?: "text" | "textarea";
  rows?: number;
};

type Props = {
  title: string;
  fields: Field[];
  initialData: Record<string, string>;
  apiUrl?: string;
};

export default function SettingsForm({
  title,
  fields,
  initialData,
  apiUrl = "/api/admin/settings",
}: Props) {
  const [data, setData] = useState(initialData);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  async function handleSave() {
    setStatus("saving");
    try {
      const payload: Record<string, string> = {};
      for (const field of fields) {
        payload[field.key] = data[field.key] ?? "";
      }
      const res = await fetch(apiUrl, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      setStatus(res.ok ? "saved" : "error");
      if (res.ok) setTimeout(() => setStatus("idle"), 2000);
    } catch {
      setStatus("error");
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">{title}</h1>
        <button
          onClick={handleSave}
          disabled={status === "saving"}
          className="inline-flex items-center gap-2 px-5 py-2.5 gradient-gold text-white font-semibold rounded-lg hover:opacity-90 disabled:opacity-50 shadow-sm"
        >
          <Save className="w-4 h-4" />
          {status === "saving" ? "Saving..." : "Save Changes"}
        </button>
      </div>

      <div className="space-y-6">
        {fields.map((field) => (
          <div key={field.key}>
            <label className="block text-sm font-medium text-foreground/80 mb-2">
              {field.label}
            </label>
            {field.type === "textarea" ? (
              <textarea
                rows={field.rows ?? 4}
                value={data[field.key] ?? ""}
                onChange={(e) => setData({ ...data, [field.key]: e.target.value })}
                className="w-full px-4 py-3 bg-white border border-dark-border rounded-lg text-foreground focus:border-gold focus:outline-none resize-none"
              />
            ) : (
              <input
                type="text"
                value={data[field.key] ?? ""}
                onChange={(e) => setData({ ...data, [field.key]: e.target.value })}
                className="w-full px-4 py-3 bg-white border border-dark-border rounded-lg text-foreground focus:border-gold focus:outline-none"
              />
            )}
          </div>
        ))}
      </div>

      {status === "saved" && (
        <p className="text-green-400 text-sm mt-4">Saved successfully!</p>
      )}
      {status === "error" && (
        <p className="text-red-400 text-sm mt-4">Failed to save. Please try again.</p>
      )}
    </div>
  );
}
