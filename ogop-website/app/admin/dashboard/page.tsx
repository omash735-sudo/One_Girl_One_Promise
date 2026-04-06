"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard, FileText, Star, BookOpen, MessageSquare,
  LogOut, Save, Plus, Trash2, Edit3, Eye, EyeOff, Menu, X, CheckCircle
} from "lucide-react";

type Tab = "overview" | "hero" | "about" | "mission" | "programs" | "stats" | "stories" | "messages" | "contact";

interface ContentMap { [key: string]: Record<string, unknown>; }
interface Program { id?: number; title: string; description: string; icon: string; active?: boolean; sort_order?: number; }
interface Stat { id?: number; label: string; value: string; icon: string; sort_order?: number; }
interface Story { id?: number; name: string; story: string; year: number; active?: boolean; }
interface Message { id: number; name: string; email: string; message: string; read: boolean; created_at: string; }

export default function AdminDashboard() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [content, setContent] = useState<ContentMap>({});
  const [programs, setPrograms] = useState<Program[]>([]);
  const [stats, setStats] = useState<Stat[]>([]);
  const [stories, setStories] = useState<Story[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [adminEmail, setAdminEmail] = useState("");

  const fetchAll = useCallback(async () => {
    const [contentRes, statsRes, programsRes, storiesRes, msgsRes] = await Promise.all([
      fetch("/api/content"),
      fetch("/api/stats"),
      fetch("/api/programs"),
      fetch("/api/stories"),
      fetch("/api/contact"),
    ]);
    if (contentRes.ok) {
      const d = await contentRes.json();
      setContent(d.content || {});
    }
    if (statsRes.ok) { const d = await statsRes.json(); setStats(d.stats || []); }
    if (programsRes.ok) { const d = await programsRes.json(); setPrograms(d.programs || []); }
    if (storiesRes.ok) { const d = await storiesRes.json(); setStories(d.stories || []); }
    if (msgsRes.ok) { const d = await msgsRes.json(); setMessages(d.messages || []); }
  }, []);

  useEffect(() => {
    fetch("/api/auth").then(r => {
      if (!r.ok) router.push("/admin/login");
      else r.json().then(d => setAdminEmail(d.email));
    });
    fetchAll();
  }, [router, fetchAll]);

  async function logout() {
    await fetch("/api/auth", { method: "DELETE" });
    router.push("/admin/login");
  }

  async function saveContent(section: string, data: Record<string, unknown>) {
    setSaving(true);
    await fetch("/api/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ section, content: data }),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  async function saveProgram(p: Program) {
    const method = p.id ? "PUT" : "POST";
    await fetch("/api/programs", {
      method, headers: { "Content-Type": "application/json" },
      body: JSON.stringify(p),
    });
    fetchAll();
  }

  async function deleteProgram(id: number) {
    if (!confirm("Delete this program?")) return;
    await fetch("/api/programs", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    fetchAll();
  }

  async function saveStat(s: Stat) {
    const method = s.id ? "PUT" : "POST";
    await fetch("/api/stats", {
      method, headers: { "Content-Type": "application/json" },
      body: JSON.stringify(s),
    });
    fetchAll();
  }

  async function deleteStat(id: number) {
    if (!confirm("Delete this stat?")) return;
    await fetch("/api/stats", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    fetchAll();
  }

  async function saveStory(s: Story) {
    const method = s.id ? "PUT" : "POST";
    await fetch("/api/stories", {
      method, headers: { "Content-Type": "application/json" },
      body: JSON.stringify(s),
    });
    fetchAll();
  }

  async function deleteStory(id: number) {
    if (!confirm("Delete this story?")) return;
    await fetch("/api/stories", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    fetchAll();
  }

  async function markMessage(id: number, read: boolean) {
    await fetch("/api/messages", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, read }) });
    fetchAll();
  }

  async function deleteMessage(id: number) {
    if (!confirm("Delete this message?")) return;
    await fetch("/api/messages", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    fetchAll();
  }

  function updateContent(section: string, field: string, value: unknown) {
    setContent(prev => ({
      ...prev,
      [section]: { ...(prev[section] || {}), [field]: value }
    }));
  }

  const navItems: { id: Tab; label: string; icon: React.ElementType }[] = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "hero", label: "Hero Section", icon: Star },
    { id: "about", label: "About", icon: FileText },
    { id: "mission", label: "Mission & Vision", icon: BookOpen },
    { id: "programs", label: "Programs", icon: Edit3 },
    { id: "stats", label: "Impact Stats", icon: Star },
    { id: "stories", label: "Success Stories", icon: BookOpen },
    { id: "messages", label: `Messages${messages.filter(m => !m.read).length > 0 ? ` (${messages.filter(m => !m.read).length})` : ""}`, icon: MessageSquare },
    { id: "contact", label: "Contact Info", icon: FileText },
  ];

  const inputCls = "w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition text-sm";
  const textareaCls = `${inputCls} resize-none`;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-purple-950 text-white flex flex-col transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static`}>
        <div className="p-6 border-b border-purple-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center font-bold text-sm">OG</div>
            <div>
              <div className="font-bold font-display">OGOP Admin</div>
              <div className="text-purple-400 text-xs">{adminEmail}</div>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map(({ id, label, icon: Icon }) => (
            <button key={id} onClick={() => { setTab(id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition font-medium ${tab === id ? "bg-purple-700 text-white" : "text-purple-300 hover:bg-purple-800 hover:text-white"}`}>
              <Icon size={16} /> {label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-purple-800">
          <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-purple-300 hover:bg-red-900/40 hover:text-red-300 transition font-medium">
            <LogOut size={16} /> Sign Out
          </button>
          <a href="/" target="_blank" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-purple-300 hover:bg-purple-800 hover:text-white transition mt-1">
            <Eye size={16} /> View Website
          </a>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center gap-4 sticky top-0 z-30">
          <button className="lg:hidden text-gray-500" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
          <h1 className="font-display text-xl font-bold text-gray-900 capitalize">{tab.replace("-", " ")}</h1>
          {saved && (
            <div className="ml-auto flex items-center gap-2 text-green-600 bg-green-50 px-3 py-1.5 rounded-full text-sm">
              <CheckCircle size={14} /> Saved!
            </div>
          )}
        </header>

        <main className="flex-1 p-6 overflow-y-auto">

          {/* OVERVIEW */}
          {tab === "overview" && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
              {[
                { label: "Programs", value: programs.length, color: "purple" },
                { label: "Impact Stats", value: stats.length, color: "yellow" },
                { label: "Success Stories", value: stories.length, color: "green" },
                { label: "Unread Messages", value: messages.filter(m => !m.read).length, color: "red" },
              ].map(({ label, value, color }) => (
                <div key={label} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                  <div className={`text-4xl font-bold font-display mb-1 text-${color}-600`}>{value}</div>
                  <div className="text-gray-500 text-sm">{label}</div>
                </div>
              ))}
              <div className="sm:col-span-2 lg:col-span-4 bg-gradient-to-r from-purple-900 to-purple-700 rounded-2xl p-6 text-white">
                <h3 className="font-display text-xl font-bold mb-2">Welcome to OGOP Admin Panel</h3>
                <p className="text-purple-200 text-sm">Use the sidebar to edit any section of the website. Changes are saved to Neon database and reflected instantly.</p>
              </div>
            </div>
          )}

          {/* HERO */}
          {tab === "hero" && (
            <div className="bg-white rounded-2xl p-6 border border-gray-100 max-w-2xl">
              <h2 className="font-bold text-lg mb-5">Hero Section</h2>
              {["headline", "tagline", "subtitle", "cta_primary", "cta_secondary"].map(field => (
                <div key={field} className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5 capitalize">{field.replace("_", " ")}</label>
                  {field === "subtitle"
                    ? <textarea rows={3} className={textareaCls} value={(content.hero?.[field] as string) || ""} onChange={e => updateContent("hero", field, e.target.value)} />
                    : <input type="text" className={inputCls} value={(content.hero?.[field] as string) || ""} onChange={e => updateContent("hero", field, e.target.value)} />
                  }
                </div>
              ))}
              <button onClick={() => saveContent("hero", content.hero || {})} disabled={saving}
                className="btn-primary py-2.5 px-6 rounded-xl mt-2 disabled:opacity-60">
                <Save size={16} /> {saving ? "Saving…" : "Save Changes"}
              </button>
            </div>
          )}

          {/* ABOUT */}
          {tab === "about" && (
            <div className="bg-white rounded-2xl p-6 border border-gray-100 max-w-2xl">
              <h2 className="font-bold text-lg mb-5">About Section</h2>
              {[
                { field: "title", label: "Title", type: "text" },
                { field: "description", label: "Description", type: "textarea" },
                { field: "scripture", label: "Scripture Quote", type: "textarea" },
                { field: "scripture_ref", label: "Scripture Reference", type: "text" },
                { field: "founder_name", label: "Founder Name", type: "text" },
                { field: "founder_title", label: "Founder Title", type: "text" },
                { field: "founder_bio", label: "Founder Bio", type: "textarea" },
              ].map(({ field, label, type }) => (
                <div key={field} className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
                  {type === "textarea"
                    ? <textarea rows={3} className={textareaCls} value={(content.about?.[field] as string) || ""} onChange={e => updateContent("about", field, e.target.value)} />
                    : <input type="text" className={inputCls} value={(content.about?.[field] as string) || ""} onChange={e => updateContent("about", field, e.target.value)} />
                  }
                </div>
              ))}
              <button onClick={() => saveContent("about", content.about || {})} disabled={saving}
                className="btn-primary py-2.5 px-6 rounded-xl mt-2 disabled:opacity-60">
                <Save size={16} /> {saving ? "Saving…" : "Save Changes"}
              </button>
            </div>
          )}

          {/* MISSION */}
          {tab === "mission" && (
            <div className="bg-white rounded-2xl p-6 border border-gray-100 max-w-2xl">
              <h2 className="font-bold text-lg mb-5">Mission & Vision</h2>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Vision</label>
                <textarea rows={3} className={textareaCls} value={(content.mission?.vision as string) || ""} onChange={e => updateContent("mission", "vision", e.target.value)} />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Mission</label>
                <textarea rows={3} className={textareaCls} value={(content.mission?.mission as string) || ""} onChange={e => updateContent("mission", "mission", e.target.value)} />
              </div>
              <h3 className="font-bold text-base mb-4">Core Values</h3>
              {((content.mission?.values as { title: string; desc: string }[]) || []).map((v, i) => (
                <div key={i} className="border border-gray-100 rounded-xl p-4 mb-3">
                  <input className={`${inputCls} mb-2`} placeholder="Value title" value={v.title} onChange={e => {
                    const vals = [...((content.mission?.values as { title: string; desc: string }[]) || [])];
                    vals[i] = { ...vals[i], title: e.target.value };
                    updateContent("mission", "values", vals);
                  }} />
                  <textarea rows={2} className={textareaCls} placeholder="Value description" value={v.desc} onChange={e => {
                    const vals = [...((content.mission?.values as { title: string; desc: string }[]) || [])];
                    vals[i] = { ...vals[i], desc: e.target.value };
                    updateContent("mission", "values", vals);
                  }} />
                </div>
              ))}
              <button onClick={() => {
                const vals = [...((content.mission?.values as { title: string; desc: string }[]) || []), { title: "", desc: "" }];
                updateContent("mission", "values", vals);
              }} className="flex items-center gap-2 text-purple-600 text-sm font-medium mb-4 hover:text-purple-800">
                <Plus size={16} /> Add Value
              </button>
              <button onClick={() => saveContent("mission", content.mission || {})} disabled={saving}
                className="btn-primary py-2.5 px-6 rounded-xl disabled:opacity-60">
                <Save size={16} /> {saving ? "Saving…" : "Save Changes"}
              </button>
            </div>
          )}

          {/* PROGRAMS */}
          {tab === "programs" && (
            <div className="max-w-3xl">
              <div className="flex justify-between items-center mb-5">
                <h2 className="font-bold text-lg">Programs</h2>
                <button onClick={() => setPrograms(p => [...p, { title: "", description: "", icon: "Star", active: true, sort_order: p.length }])}
                  className="flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-xl text-sm font-medium hover:bg-purple-200 transition">
                  <Plus size={16} /> Add Program
                </button>
              </div>
              <div className="space-y-4">
                {programs.map((p, i) => (
                  <div key={p.id || i} className="bg-white rounded-2xl p-5 border border-gray-100">
                    <div className="grid sm:grid-cols-2 gap-3 mb-3">
                      <div>
                        <label className="text-xs text-gray-500 mb-1 block">Title</label>
                        <input className={inputCls} value={p.title} onChange={e => setPrograms(prev => prev.map((x, j) => j === i ? { ...x, title: e.target.value } : x))} />
                      </div>
                      <div>
                        <label className="text-xs text-gray-500 mb-1 block">Icon (lucide name)</label>
                        <input className={inputCls} value={p.icon} onChange={e => setPrograms(prev => prev.map((x, j) => j === i ? { ...x, icon: e.target.value } : x))} />
                      </div>
                    </div>
                    <label className="text-xs text-gray-500 mb-1 block">Description</label>
                    <textarea rows={2} className={`${textareaCls} mb-3`} value={p.description} onChange={e => setPrograms(prev => prev.map((x, j) => j === i ? { ...x, description: e.target.value } : x))} />
                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                        <input type="checkbox" checked={p.active !== false} onChange={e => setPrograms(prev => prev.map((x, j) => j === i ? { ...x, active: e.target.checked } : x))} />
                        Active
                      </label>
                      <div className="flex gap-2">
                        <button onClick={() => saveProgram(p)} className="bg-purple-600 text-white px-4 py-1.5 rounded-lg text-sm hover:bg-purple-700 transition flex items-center gap-1">
                          <Save size={14} /> Save
                        </button>
                        {p.id && (
                          <button onClick={() => deleteProgram(p.id!)} className="bg-red-50 text-red-500 px-4 py-1.5 rounded-lg text-sm hover:bg-red-100 transition flex items-center gap-1">
                            <Trash2 size={14} /> Delete
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STATS */}
          {tab === "stats" && (
            <div className="max-w-3xl">
              <div className="flex justify-between items-center mb-5">
                <h2 className="font-bold text-lg">Impact Stats</h2>
                <button onClick={() => setStats(s => [...s, { label: "", value: "", icon: "Star", sort_order: s.length }])}
                  className="flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-xl text-sm font-medium hover:bg-purple-200 transition">
                  <Plus size={16} /> Add Stat
                </button>
              </div>
              <div className="space-y-4">
                {stats.map((s, i) => (
                  <div key={s.id || i} className="bg-white rounded-2xl p-5 border border-gray-100">
                    <div className="grid sm:grid-cols-3 gap-3 mb-3">
                      <div>
                        <label className="text-xs text-gray-500 mb-1 block">Value (e.g. 50%)</label>
                        <input className={inputCls} value={s.value} onChange={e => setStats(prev => prev.map((x, j) => j === i ? { ...x, value: e.target.value } : x))} />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="text-xs text-gray-500 mb-1 block">Label</label>
                        <input className={inputCls} value={s.label} onChange={e => setStats(prev => prev.map((x, j) => j === i ? { ...x, label: e.target.value } : x))} />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex-1 mr-3">
                        <label className="text-xs text-gray-500 mb-1 block">Icon</label>
                        <input className={inputCls} value={s.icon} onChange={e => setStats(prev => prev.map((x, j) => j === i ? { ...x, icon: e.target.value } : x))} />
                      </div>
                      <div className="flex gap-2 mt-5">
                        <button onClick={() => saveStat(s)} className="bg-purple-600 text-white px-4 py-1.5 rounded-lg text-sm hover:bg-purple-700 transition flex items-center gap-1">
                          <Save size={14} /> Save
                        </button>
                        {s.id && (
                          <button onClick={() => deleteStat(s.id!)} className="bg-red-50 text-red-500 px-4 py-1.5 rounded-lg text-sm hover:bg-red-100 transition flex items-center gap-1">
                            <Trash2 size={14} /> Delete
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STORIES */}
          {tab === "stories" && (
            <div className="max-w-3xl">
              <div className="flex justify-between items-center mb-5">
                <h2 className="font-bold text-lg">Success Stories</h2>
                <button onClick={() => setStories(s => [...s, { name: "", story: "", year: new Date().getFullYear(), active: true }])}
                  className="flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-xl text-sm font-medium hover:bg-purple-200 transition">
                  <Plus size={16} /> Add Story
                </button>
              </div>
              <div className="space-y-4">
                {stories.map((s, i) => (
                  <div key={s.id || i} className="bg-white rounded-2xl p-5 border border-gray-100">
                    <div className="grid sm:grid-cols-2 gap-3 mb-3">
                      <div>
                        <label className="text-xs text-gray-500 mb-1 block">Name / Title</label>
                        <input className={inputCls} value={s.name} onChange={e => setStories(prev => prev.map((x, j) => j === i ? { ...x, name: e.target.value } : x))} />
                      </div>
                      <div>
                        <label className="text-xs text-gray-500 mb-1 block">Year</label>
                        <input type="number" className={inputCls} value={s.year} onChange={e => setStories(prev => prev.map((x, j) => j === i ? { ...x, year: parseInt(e.target.value) } : x))} />
                      </div>
                    </div>
                    <label className="text-xs text-gray-500 mb-1 block">Story</label>
                    <textarea rows={3} className={`${textareaCls} mb-3`} value={s.story} onChange={e => setStories(prev => prev.map((x, j) => j === i ? { ...x, story: e.target.value } : x))} />
                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                        <input type="checkbox" checked={s.active !== false} onChange={e => setStories(prev => prev.map((x, j) => j === i ? { ...x, active: e.target.checked } : x))} />
                        Active
                      </label>
                      <div className="flex gap-2">
                        <button onClick={() => saveStory(s)} className="bg-purple-600 text-white px-4 py-1.5 rounded-lg text-sm hover:bg-purple-700 transition flex items-center gap-1">
                          <Save size={14} /> Save
                        </button>
                        {s.id && (
                          <button onClick={() => deleteStory(s.id!)} className="bg-red-50 text-red-500 px-4 py-1.5 rounded-lg text-sm hover:bg-red-100 transition flex items-center gap-1">
                            <Trash2 size={14} /> Delete
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* MESSAGES */}
          {tab === "messages" && (
            <div className="max-w-3xl">
              <h2 className="font-bold text-lg mb-5">Contact Messages</h2>
              {messages.length === 0 && <p className="text-gray-400 text-sm">No messages yet.</p>}
              <div className="space-y-4">
                {messages.map(m => (
                  <div key={m.id} className={`bg-white rounded-2xl p-5 border transition ${m.read ? "border-gray-100 opacity-70" : "border-purple-200 shadow-sm"}`}>
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="font-semibold text-gray-900 flex items-center gap-2">
                          {m.name}
                          {!m.read && <span className="w-2 h-2 bg-purple-500 rounded-full inline-block" />}
                        </div>
                        <div className="text-gray-400 text-xs">{m.email} · {new Date(m.created_at).toLocaleDateString()}</div>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => markMessage(m.id, !m.read)} title={m.read ? "Mark unread" : "Mark read"}
                          className="text-gray-400 hover:text-purple-600 transition p-1.5 rounded-lg hover:bg-purple-50">
                          {m.read ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                        <button onClick={() => deleteMessage(m.id)}
                          className="text-gray-400 hover:text-red-500 transition p-1.5 rounded-lg hover:bg-red-50">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">{m.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CONTACT */}
          {tab === "contact" && (
            <div className="bg-white rounded-2xl p-6 border border-gray-100 max-w-2xl">
              <h2 className="font-bold text-lg mb-5">Contact Information</h2>
              {[
                { field: "address", label: "Address", type: "text" },
                { field: "phone", label: "Phone", type: "text" },
                { field: "email", label: "Email", type: "email" },
                { field: "social_facebook", label: "Facebook URL", type: "url" },
                { field: "social_twitter", label: "Twitter URL", type: "url" },
                { field: "social_instagram", label: "Instagram URL", type: "url" },
              ].map(({ field, label, type }) => (
                <div key={field} className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
                  <input type={type} className={inputCls} value={(content.contact?.[field] as string) || ""} onChange={e => updateContent("contact", field, e.target.value)} />
                </div>
              ))}
              <button onClick={() => saveContent("contact", content.contact || {})} disabled={saving}
                className="btn-primary py-2.5 px-6 rounded-xl mt-2 disabled:opacity-60">
                <Save size={16} /> {saving ? "Saving…" : "Save Changes"}
              </button>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
