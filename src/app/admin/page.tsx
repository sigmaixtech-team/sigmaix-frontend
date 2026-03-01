"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  Star,
  MessageSquare,
  Settings,
  LogOut,
  Plus,
  Trash2,
  ArrowLeft,
} from "lucide-react";
import { API_ENDPOINTS } from "../../../lib/api";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("projects");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      router.push("/admin/login");
    }
  }, [router]);

  const tabs = [
    { id: "projects", label: "Projects", icon: FolderKanban },
    { id: "features", label: "Features", icon: Star },
    { id: "testimonials", label: "Testimonials", icon: MessageSquare },
    { id: "enquiries", label: "Enquiries", icon: LayoutDashboard },
    { id: "contact", label: "Contact Info", icon: Settings },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-orange-500">
            Sigmaix Admin
          </h1>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center w-full px-4 py-3 rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? "bg-yellow-50 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400 font-medium"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                <Icon size={20} className="mr-3" />
                {tab.label}
              </button>
            );
          })}
        </nav>
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={() => {
              localStorage.removeItem("adminToken");
              router.push("/admin/login");
            }}
            className="flex items-center w-full px-4 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-colors"
          >
            <LogOut size={20} className="mr-3" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">
        <div className="max-w-5xl mx-auto">
          {activeTab === "projects" && (
            <ResourceManager title="Projects" type="projects" />
          )}
          {activeTab === "features" && (
            <ResourceManager title="Features" type="features" />
          )}
          {activeTab === "testimonials" && (
            <ResourceManager title="Testimonials" type="testimonials" />
          )}
          {activeTab === "enquiries" && <EnquiriesView />}
          {activeTab === "settings" && <SettingsView />}
          {activeTab === "contact" && <ContactInfoView />}
        </div>
      </main>
    </div>
  );
}

// --- GENERIC COMPONENT FOR RESOURCES (List + Add/Edit) ---

function ResourceManager({
  title,
  type,
}: {
  title: string;
  type: "projects" | "features" | "testimonials";
}) {
  const [view, setView] = useState<"list" | "add" | "edit">("list");
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<any>(null);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_ENDPOINTS[type]);
      if (res.ok) {
        const data = await res.json();
        setItems(data);
      }
    } catch (err) {
      console.error(`Error fetching ${type}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [type]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch(`${API_ENDPOINTS[type]}/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setItems(items.filter((i) => i._id !== id));
      } else {
        alert("Failed to delete item");
      }
    } catch (err) {
      alert("Error deleting item");
    }
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setView("edit");
  };

  if (view === "add" || view === "edit") {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
        <button
          onClick={() => {
            setView("list");
            setEditingItem(null);
          }}
          className="flex items-center text-sm text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
        >
          <ArrowLeft size={16} className="mr-1" /> Back to list
        </button>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold mb-6">
            {view === "add" ? "Add New" : "Edit"} {title.slice(0, -1)}
          </h2>
          {type === "projects" && (
            <ProjectForm
              initialData={editingItem}
              onSuccess={() => {
                setView("list");
                fetchItems();
                setEditingItem(null);
              }}
            />
          )}
          {type === "features" && (
            <FeatureForm
              initialData={editingItem}
              onSuccess={() => {
                setView("list");
                fetchItems();
                setEditingItem(null);
              }}
            />
          )}
          {type === "testimonials" && (
            <TestimonialForm
              initialData={editingItem}
              onSuccess={() => {
                setView("list");
                fetchItems();
                setEditingItem(null);
              }}
            />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{title}</h2>
        <button
          onClick={() => setView("add")}
          className="group flex items-center px-5 py-2.5 bg-gray-900 hover:bg-gray-800 dark:bg-yellow-500 dark:hover:bg-yellow-400 text-white dark:text-gray-900 font-semibold rounded-full transition-all shadow-md hover:shadow-lg transform active:scale-95"
        >
          <Plus
            size={20}
            className="mr-2 group-hover:rotate-90 transition-transform"
          />
          Add New
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500"></div>
        </div>
      ) : items.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-12 text-center border border-dashed border-gray-300 dark:border-gray-700">
          <p className="text-gray-500 mb-4">No {title.toLowerCase()} found.</p>
          <button
            onClick={() => setView("add")}
            className="text-yellow-600 hover:text-yellow-700 font-medium"
          >
            Create your first one
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {items.map((item) => (
            <div
              key={item._id}
              className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 flex justify-between items-center group hover:border-yellow-200 dark:hover:border-yellow-900/50 transition-colors"
            >
              <div>
                <h3 className="font-bold text-lg">{item.title || item.name}</h3>
                {(item.role || item.client || item.desc) && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {item.role && (
                      <span className="mr-2 text-yellow-600 dark:text-yellow-500">
                        {item.role}
                      </span>
                    )}
                    {item.client && (
                      <span>
                        for {item.client} • {item.year}
                      </span>
                    )}
                    {item.desc && <span>{item.desc}</span>}
                    {item.quote && (
                      <span className="italic">
                        "
                        {item.quote.length > 60
                          ? item.quote.slice(0, 60) + "..."
                          : item.quote}
                        "
                      </span>
                    )}
                  </p>
                )}
              </div>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-all">
                <button
                  onClick={() => handleEdit(item)}
                  className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-full transition-all"
                  title="Edit"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                  </svg>
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-all"
                  title="Delete"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// --- ENQUIRIES & SETTINGS (No "Add" view) ---

function EnquiriesView() {
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEnquiries = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch(API_ENDPOINTS.enquiries, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setEnquiries(data);
      }
    } catch (err) {
      console.error("Error fetching enquiries");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this enquiry?")) return;
    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch(`${API_ENDPOINTS.enquiries}/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setEnquiries(enquiries.filter((e) => e._id !== id));
      } else {
        alert("Failed to delete enquiry");
      }
    } catch (err) {
      alert("Error deleting enquiry");
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <h2 className="text-2xl font-bold">Enquiries</h2>
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500"></div>
        </div>
      ) : enquiries.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-12 text-center border border-dashed border-gray-300 dark:border-gray-700">
          <p className="text-gray-500">No enquiries found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {enquiries.map((enq) => (
            <div
              key={enq._id}
              className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 relative group"
            >
              <div className="flex justify-between items-start mb-2 pr-8">
                <div>
                  <h3 className="font-bold text-lg">{enq.subject}</h3>
                  <p className="text-sm font-medium text-yellow-600 dark:text-yellow-400 mt-1">
                    {enq.name}{" "}
                    <span className="text-gray-400 font-normal">
                      ({enq.email})
                    </span>
                  </p>
                </div>
                <span className="text-xs text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                  {new Date(enq.date).toLocaleDateString()}
                </span>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mt-2 p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg text-sm leading-relaxed">
                {enq.message}
              </p>
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => handleDelete(enq._id)}
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors"
                  title="Delete"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ContactInfoView() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");

  // GET Contact Info
  const fetchContactInfo = async () => {
    try {
      const res = await fetch(API_ENDPOINTS.contactInfo);
      if (res.ok) {
        const data = await res.json();
        setEmail(data.email || "");
        setPhone(data.phone || "");
      }
    } catch (err) {
      console.error("Error fetching contact info");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContactInfo();
  }, []);

  // UPDATE Contact Info
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("Updating...");

    try {
      const token = localStorage.getItem("adminToken");

      const res = await fetch(API_ENDPOINTS.contactInfo, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email, phone }),
      });

      if (res.ok) {
        setStatus("Contact info updated successfully!");
      } else {
        setStatus("Error updating contact info.");
      }
    } catch (err) {
      setStatus("Error updating contact info.");
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <h2 className="text-2xl font-bold">Contact Information</h2>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500"></div>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm border border-gray-200 dark:border-gray-700 max-w-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-3 rounded-lg border bg-gray-50 dark:bg-gray-900 dark:border-gray-700 focus:ring-2 focus:ring-yellow-500 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Phone Number
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="w-full p-3 rounded-lg border bg-gray-50 dark:bg-gray-900 dark:border-gray-700 focus:ring-2 focus:ring-yellow-500 outline-none transition-all"
              />
            </div>

            <button
              type="submit"
              className="w-full px-5 py-3 bg-gray-900 hover:bg-gray-800 dark:bg-yellow-500 dark:hover:bg-yellow-400 text-white dark:text-gray-900 font-bold rounded-full transition-all shadow-md hover:shadow-lg transform active:scale-95"
            >
              Update Contact Info
            </button>

            {status && (
              <p
                className={`text-sm text-center font-medium ${
                  status.includes("Error") ? "text-red-500" : "text-green-500"
                }`}
              >
                {status}
              </p>
            )}
          </form>
        </div>
      )}
    </div>
  );
}

function SettingsView() {
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("Updating...");
    const formData = new FormData(e.currentTarget);
    const data: any = {};
    if (formData.get("username")) data.username = formData.get("username");
    if (formData.get("password")) data.password = formData.get("password");

    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch(API_ENDPOINTS.profile, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus("Profile updated successfully! You may need to relogin.");
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus("Error updating profile.");
      }
    } catch (err) {
      setStatus("Error updating profile.");
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <h2 className="text-2xl font-bold">Admin Settings</h2>
      <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm border border-gray-200 dark:border-gray-700 max-w-xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800/50 rounded-lg text-sm text-blue-700 dark:text-blue-300">
            Leave fields blank to keep current values.
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">
              New Username
            </label>
            <input
              name="username"
              className="w-full p-3 rounded-lg border bg-gray-50 dark:bg-gray-900 dark:border-gray-700 focus:ring-2 focus:ring-yellow-500 outline-none transition-all"
              placeholder="Enter new username"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">
              New Password
            </label>
            <input
              name="password"
              type="password"
              className="w-full p-3 rounded-lg border bg-gray-50 dark:bg-gray-900 dark:border-gray-700 focus:ring-2 focus:ring-yellow-500 outline-none transition-all"
              placeholder="Enter new password"
            />
          </div>
          <button
            type="submit"
            className="w-full px-5 py-3 bg-gray-900 hover:bg-gray-800 dark:bg-yellow-500 dark:hover:bg-yellow-400 text-white dark:text-gray-900 font-bold rounded-full transition-all shadow-md hover:shadow-lg transform active:scale-95"
          >
            Update Profile
          </button>
          {status && (
            <p
              className={`text-sm text-center font-medium ${status.includes("Error") ? "text-red-500" : "text-green-500"}`}
            >
              {status}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

// --- FORMS (Reused logic, improved styling) ---

function ImageUploadInput({
  name,
  label,
  multiple,
  defaultValue,
}: {
  name: string;
  label: string;
  multiple?: boolean;
  defaultValue?: string;
}) {
  const [urls, setUrls] = useState<string>(defaultValue || "");
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    setUploading(true);
    const newUrls: string[] = [];
    const token = localStorage.getItem("adminToken");

    for (let i = 0; i < e.target.files.length; i++) {
      const file = e.target.files[i];
      const formData = new FormData();
      formData.append("file", file);

      try {
        const res = await fetch(API_ENDPOINTS.upload, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        });
        if (res.ok) {
          const data = await res.json();
          newUrls.push(data.url);
        }
      } catch (err) {
        console.error("Upload failed", err);
      }
    }

    setUploading(false);
    if (newUrls.length > 0) {
      setUrls((prev) => {
        if (!multiple) return newUrls[0];
        return prev ? `${prev}, ${newUrls.join(", ")}` : newUrls.join(", ");
      });
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <div className="flex gap-2">
        <input
          type="text"
          name={name}
          value={urls}
          onChange={(e) => setUrls(e.target.value)}
          className="flex-1 p-3 rounded-lg border bg-gray-50 dark:bg-gray-900 dark:border-gray-700 font-mono text-sm"
          placeholder="URL(s)"
        />
        <div className="relative flex items-center">
          <input
            type="file"
            multiple={multiple}
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            accept="image/*"
          />
          <button
            type="button"
            className={`px-4 py-3 bg-gray-200 dark:bg-gray-800 rounded-lg flex items-center font-medium transition-colors ${uploading ? "opacity-50" : "hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"}`}
          >
            {uploading ? "Uploading..." : "Upload File"}
          </button>
        </div>
      </div>
    </div>
  );
}

function ProjectForm({
  initialData,
  onSuccess,
}: {
  initialData?: any;
  onSuccess?: () => void;
}) {
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("Submitting...");
    const formData = new FormData(e.currentTarget);
    const data = {
      title: formData.get("title"),
      slug: formData.get("slug"),
      shortDesc: formData.get("shortDesc"),
      fullDesc: formData.get("fullDesc"),
      challenge: formData.get("challenge"),
      solution: formData.get("solution"),
      type: formData.get("type"),
      client: formData.get("client"),
      year: formData.get("year"),
      role: formData.get("role"),
      liveUrl: formData.get("liveUrl"),
      coverImg: formData.get("coverImg"),
      stack: formData.get("stack")
        ? (formData.get("stack") as string).split(",").map((s) => s.trim())
        : [],
      results: formData.get("results")
        ? (formData.get("results") as string).split(",").map((s) => s.trim())
        : [],
      images: formData.get("images")
        ? (formData.get("images") as string).split(",").map((s) => s.trim())
        : [],
    };

    try {
      const token = localStorage.getItem("adminToken");
      const url = initialData
        ? `${API_ENDPOINTS.projects}/${initialData._id}`
        : API_ENDPOINTS.projects;
      const method = initialData ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus(`Project ${initialData ? "updated" : "added"} successfully!`);
        if (!initialData) (e.target as HTMLFormElement).reset();
        if (onSuccess) onSuccess();
      } else {
        setStatus(`Error ${initialData ? "updating" : "adding"} project.`);
      }
    } catch (err) {
      setStatus(`Error ${initialData ? "updating" : "adding"} project.`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-1">Title *</label>
          <input
            name="title"
            required
            defaultValue={initialData?.title}
            className="w-full p-3 rounded-lg border bg-gray-50 dark:bg-gray-900 dark:border-gray-700"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Slug</label>
          <input
            name="slug"
            defaultValue={initialData?.slug}
            className="w-full p-3 rounded-lg border bg-gray-50 dark:bg-gray-900 dark:border-gray-700"
            placeholder="Optional"
          />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium mb-1">
            Short Description *
          </label>
          <input
            name="shortDesc"
            required
            defaultValue={initialData?.shortDesc}
            className="w-full p-3 rounded-lg border bg-gray-50 dark:bg-gray-900 dark:border-gray-700"
          />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium mb-1">
            Full Description
          </label>
          <textarea
            name="fullDesc"
            rows={4}
            defaultValue={initialData?.fullDesc}
            className="w-full p-3 rounded-lg border bg-gray-50 dark:bg-gray-900 dark:border-gray-700"
          />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium mb-1">Challenge</label>
          <textarea
            name="challenge"
            rows={3}
            defaultValue={initialData?.challenge}
            className="w-full p-3 rounded-lg border bg-gray-50 dark:bg-gray-900 dark:border-gray-700"
          />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium mb-1">Solution</label>
          <textarea
            name="solution"
            rows={3}
            defaultValue={initialData?.solution}
            className="w-full p-3 rounded-lg border bg-gray-50 dark:bg-gray-900 dark:border-gray-700"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Type *</label>
          <input
            name="type"
            placeholder="e.g. Web App"
            required
            defaultValue={initialData?.type}
            className="w-full p-3 rounded-lg border bg-gray-50 dark:bg-gray-900 dark:border-gray-700"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Client</label>
          <input
            name="client"
            defaultValue={initialData?.client}
            className="w-full p-3 rounded-lg border bg-gray-50 dark:bg-gray-900 dark:border-gray-700"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Year</label>
          <input
            name="year"
            defaultValue={initialData?.year}
            className="w-full p-3 rounded-lg border bg-gray-50 dark:bg-gray-900 dark:border-gray-700"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Role</label>
          <input
            name="role"
            defaultValue={initialData?.role}
            className="w-full p-3 rounded-lg border bg-gray-50 dark:bg-gray-900 dark:border-gray-700"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Live URL</label>
          <input
            name="liveUrl"
            defaultValue={initialData?.liveUrl}
            className="w-full p-3 rounded-lg border bg-gray-50 dark:bg-gray-900 dark:border-gray-700"
          />
        </div>
        <div className="col-span-2">
          <ImageUploadInput
            name="coverImg"
            label="Cover Image URL"
            defaultValue={initialData?.coverImg}
          />
        </div>
        <div className="col-span-2">
          <ImageUploadInput
            name="images"
            label="Additional Image URLs (comma separated)"
            multiple
            defaultValue={initialData?.images?.join(", ")}
          />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium mb-1">
            Tech Stack (comma separated)
          </label>
          <input
            name="stack"
            placeholder="React, Node.js, ..."
            defaultValue={initialData?.stack?.join(", ")}
            className="w-full p-3 rounded-lg border bg-gray-50 dark:bg-gray-900 dark:border-gray-700"
          />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium mb-1">
            Results (comma separated)
          </label>
          <input
            name="results"
            defaultValue={initialData?.results?.join(", ")}
            className="w-full p-3 rounded-lg border bg-gray-50 dark:bg-gray-900 dark:border-gray-700"
          />
        </div>
      </div>
      <button
        type="submit"
        className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-bold rounded-lg transition-colors"
      >
        Save Project
      </button>
      {status && (
        <p className="text-sm mt-2 font-medium text-gray-600 dark:text-gray-400">
          {status}
        </p>
      )}
    </form>
  );
}

function FeatureForm({
  initialData,
  onSuccess,
}: {
  initialData?: any;
  onSuccess?: () => void;
}) {
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("Submitting...");
    const formData = new FormData(e.currentTarget);
    const data = {
      title: formData.get("title"),
      desc: formData.get("desc"),
    };

    try {
      const token = localStorage.getItem("adminToken");
      const url = initialData
        ? `${API_ENDPOINTS.features}/${initialData._id}`
        : API_ENDPOINTS.features;
      const method = initialData ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus(`Feature ${initialData ? "updated" : "added"} successfully!`);
        if (!initialData) (e.target as HTMLFormElement).reset();
        if (onSuccess) onSuccess();
      } else {
        setStatus(`Error ${initialData ? "updating" : "adding"} feature.`);
      }
    } catch (err) {
      setStatus(`Error ${initialData ? "updating" : "adding"} feature.`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-xl">
      <div>
        <label className="block text-sm font-medium mb-1">Title</label>
        <input
          name="title"
          required
          defaultValue={initialData?.title}
          className="w-full p-3 rounded-lg border bg-gray-50 dark:bg-gray-900 dark:border-gray-700"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <input
          name="desc"
          required
          defaultValue={initialData?.desc}
          className="w-full p-3 rounded-lg border bg-gray-50 dark:bg-gray-900 dark:border-gray-700"
        />
      </div>
      <button
        type="submit"
        className="px-8 py-3 bg-gray-900 hover:bg-gray-800 dark:bg-yellow-500 dark:hover:bg-yellow-400 text-white dark:text-gray-900 font-bold rounded-full transition-all shadow-md hover:shadow-lg transform active:scale-95"
      >
        Save Feature
      </button>
      {status && (
        <p className="text-sm mt-2 font-medium text-gray-600 dark:text-gray-400">
          {status}
        </p>
      )}
    </form>
  );
}

function TestimonialForm({
  initialData,
  onSuccess,
}: {
  initialData?: any;
  onSuccess?: () => void;
}) {
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("Submitting...");
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      role: formData.get("role"),
      quote: formData.get("quote"),
    };

    try {
      const token = localStorage.getItem("adminToken");
      const url = initialData
        ? `${API_ENDPOINTS.testimonials}/${initialData._id}`
        : API_ENDPOINTS.testimonials;
      const method = initialData ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus(
          `Testimonial ${initialData ? "updated" : "added"} successfully!`,
        );
        if (!initialData) (e.target as HTMLFormElement).reset();
        if (onSuccess) onSuccess();
      } else {
        setStatus(`Error ${initialData ? "updating" : "adding"} testimonial.`);
      }
    } catch (err) {
      setStatus(`Error ${initialData ? "updating" : "adding"} testimonial.`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-xl">
      <div>
        <label className="block text-sm font-medium mb-1">Name</label>
        <input
          name="name"
          required
          defaultValue={initialData?.name}
          className="w-full p-3 rounded-lg border bg-gray-50 dark:bg-gray-900 dark:border-gray-700"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Role</label>
        <input
          name="role"
          required
          defaultValue={initialData?.role}
          className="w-full p-3 rounded-lg border bg-gray-50 dark:bg-gray-900 dark:border-gray-700"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Quote</label>
        <textarea
          name="quote"
          required
          rows={3}
          defaultValue={initialData?.quote}
          className="w-full p-3 rounded-lg border bg-gray-50 dark:bg-gray-900 dark:border-gray-700"
        />
      </div>
      <button
        type="submit"
        className="px-8 py-3 bg-gray-900 hover:bg-gray-800 dark:bg-yellow-500 dark:hover:bg-yellow-400 text-white dark:text-gray-900 font-bold rounded-full transition-all shadow-md hover:shadow-lg transform active:scale-95"
      >
        Save Testimonial
      </button>
      {status && (
        <p className="text-sm mt-2 font-medium text-gray-600 dark:text-gray-400">
          {status}
        </p>
      )}
    </form>
  );
}
