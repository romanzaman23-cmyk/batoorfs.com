"use client";

import { useState } from "react";
import { Plus, Trash2, Save, Pencil } from "lucide-react";

type Column = {
  key: string;
  label: string;
  type?: "text" | "textarea" | "number" | "select" | "checkbox";
  options?: { value: string; label: string }[];
};

type Props = {
  title: string;
  resource: string;
  columns: Column[];
  initialItems: Record<string, unknown>[];
  newItemDefaults?: Record<string, unknown>;
};

export default function CrudTable({
  title,
  resource,
  columns,
  initialItems,
  newItemDefaults = {},
}: Props) {
  const [items, setItems] = useState(initialItems);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState<Record<string, unknown>>({});
  const [status, setStatus] = useState<string>("");

  function startEdit(item: Record<string, unknown>) {
    setEditing(item.id as string);
    setForm({ ...item });
  }

  function startNew() {
    setEditing("new");
    setForm({ ...newItemDefaults });
  }

  async function handleSave() {
    setStatus("saving");
    const isNew = editing === "new";
    try {
      const res = await fetch(`/api/admin/${resource}`, {
        method: isNew ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        const saved = await res.json();
        if (isNew) {
          setItems([...items, saved]);
        } else {
          setItems(items.map((i) => (i.id === saved.id ? saved : i)));
        }
        setEditing(null);
        setStatus("saved");
        setTimeout(() => setStatus(""), 2000);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this item?")) return;
    const res = await fetch(`/api/admin/${resource}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (res.ok) {
      setItems(items.filter((i) => i.id !== id));
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">{title}</h1>
        <button
          onClick={startNew}
          className="inline-flex items-center gap-2 px-4 py-2 gradient-gold text-white font-semibold rounded-lg hover:opacity-90 shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Add New
        </button>
      </div>

      {editing && (
        <div className="bg-dark-card border border-dark-border rounded-xl p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">
            {editing === "new" ? "Add New Item" : "Edit Item"}
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {columns.map((col) => (
              <div key={col.key} className={col.type === "textarea" ? "sm:col-span-2" : ""}>
                <label className="block text-sm text-muted mb-1">{col.label}</label>
                {col.type === "textarea" ? (
                  <textarea
                    rows={3}
                    value={(form[col.key] as string) ?? ""}
                    onChange={(e) => setForm({ ...form, [col.key]: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-dark-border rounded-lg text-foreground focus:border-gold focus:outline-none"
                  />
                ) : col.type === "checkbox" ? (
                  <input
                    type="checkbox"
                    checked={!!form[col.key]}
                    onChange={(e) => setForm({ ...form, [col.key]: e.target.checked })}
                    className="w-5 h-5 accent-gold"
                  />
                ) : col.type === "select" ? (
                  <select
                    value={(form[col.key] as string) ?? ""}
                    onChange={(e) => setForm({ ...form, [col.key]: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-dark-border rounded-lg text-foreground focus:border-gold focus:outline-none"
                  >
                    {col.options?.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={col.type === "number" ? "number" : "text"}
                    value={(form[col.key] as string | number) ?? ""}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        [col.key]:
                          col.type === "number" ? Number(e.target.value) : e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 bg-white border border-dark-border rounded-lg text-foreground focus:border-gold focus:outline-none"
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex gap-3 mt-4">
            <button
              onClick={handleSave}
              className="inline-flex items-center gap-2 px-4 py-2 gradient-gold text-white font-semibold rounded-lg shadow-sm"
            >
              <Save className="w-4 h-4" />
              Save
            </button>
            <button
              onClick={() => setEditing(null)}
              className="px-4 py-2 border border-dark-border rounded-lg text-muted hover:text-foreground"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-dark-border text-left text-muted">
              {columns.slice(0, 4).map((col) => (
                <th key={col.key} className="py-3 px-4 font-medium">
                  {col.label}
                </th>
              ))}
              <th className="py-3 px-4 font-medium w-24">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id as string} className="border-b border-dark-border/50 hover:bg-dark-card">
                {columns.slice(0, 4).map((col) => (
                  <td key={col.key} className="py-3 px-4 max-w-xs truncate">
                    {col.type === "checkbox"
                      ? item[col.key]
                        ? "Yes"
                        : "No"
                      : String(item[col.key] ?? "")}
                  </td>
                ))}
                <td className="py-3 px-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => startEdit(item)}
                      className="text-gold hover:text-gold-light"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id as string)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {status === "saved" && <p className="text-green-400 text-sm mt-4">Saved!</p>}
      {status === "error" && <p className="text-red-400 text-sm mt-4">Error saving.</p>}
    </div>
  );
}
