// ═══════════════════════════════════════════════════════════════════════════
//  JC RESOURCE LAB — COMBINED FULL-STACK SERVER
//  Run:  node server.js
//  Open: http://localhost:5000
// ═══════════════════════════════════════════════════════════════════════════
require("dotenv").config();
const express = require("express");
const cors    = require("cors");
const multer  = require("multer");
const bcrypt  = require("bcryptjs");
const jwt     = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const { createClient } = require("@supabase/supabase-js");
const fs      = require("fs");
const path    = require("path");
const babel   = require("@babel/core");

const app  = express();
const PORT = process.env.PORT || 5000;

// ── Supabase ──────────────────────────────────────────────────────────────
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// ── Middleware ────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Handle malformed JSON errors from body-parser so server doesn't crash
app.use((err, req, res, next) => {
  if (err && err.type === 'entity.parse.failed') {
    console.error('[API] Malformed JSON body:', err.message);
    return res.status(400).json({ error: 'Invalid JSON body' });
  }
  // Some versions throw a SyntaxError instead
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    console.error('[API] Malformed JSON SyntaxError:', err.message);
    return res.status(400).json({ error: 'Invalid JSON body' });
  }
  next(err);
});

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 50 * 1024 * 1024 } });

// ── JWT helpers ───────────────────────────────────────────────────────────
function signToken(user) {
  return jwt.sign(
    { id: user.id, name: user.name, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
}
function authMiddleware(req, res, next) {
  const h = req.headers.authorization;
  if (!h || !h.startsWith("Bearer ")) return res.status(401).json({ error: "No token" });
  try { req.user = jwt.verify(h.split(" ")[1], process.env.JWT_SECRET); next(); }
  catch { return res.status(401).json({ error: "Invalid token" }); }
}
function adminOnly(req, res, next) {
  if (req.user?.role !== "admin") return res.status(403).json({ error: "Admin only" });
  next();
}

// ═══════════════════════════════════════════════════════════════════════════
//  BACKEND API ROUTES
// ═══════════════════════════════════════════════════════════════════════════

// ── AUTH ──────────────────────────────────────────────────────────────────
app.post("/api/auth/signup", async (req, res) => {
  try {
    console.log('[API] POST /api/auth/signup - body:', req.body);
    const { name, email, password, phone } = req.body;
    if (!name || !email || !password) return res.status(400).json({ error: "name, email, password required" });
    if (password.length < 6) return res.status(400).json({ error: "Password min 6 characters" });

    const { data: existing, error: existingErr } = await supabase.from("users").select("id").eq("email", email).maybeSingle();
    if (existing) return res.status(409).json({ error: "Email already registered" });
    if (existingErr) console.warn('[API] existing check error:', existingErr.message || existingErr);

    const hash = await bcrypt.hash(password, 10);
    // New signups are created with approved=false so admin can review and approve.
    // If the database schema does not have the `approved` column (older deployments),
    // retry inserting without that field for backward-compatibility.
    let user, err;
    try {
      const insertRes = await supabase
        .from("users").insert({ name, email, phone: phone || null, password: hash, role: "student", approved: false })
        .select("id,name,email,phone,role,approved,created_at").single();
      user = insertRes.data;
      err = insertRes.error;
    } catch (e) {
      err = e;
    }

    if (err) {
      const msg = (err && err.message) ? String(err.message) : String(err || "");
      console.warn('[API] signup insert error:', msg);
      if (msg.toLowerCase().includes("approved") || msg.toLowerCase().includes("column")) {
        const retry = await supabase.from("users").insert({ name, email, phone: phone || null, password: hash, role: "student" }).select("id,name,email,phone,role,created_at").single();
        if (retry.error) {
          console.error('[API] signup retry error:', retry.error);
          return res.status(500).json({ error: retry.error.message });
        }
        user = retry.data;
      } else {
        console.error('[API] signup fatal error:', msg);
        return res.status(500).json({ error: msg });
      }
    }

    res.status(201).json({ token: signToken(user), user });
  } catch (e) {
    console.error('[API] Unexpected error in /api/auth/signup:', e);
    res.status(500).json({ error: e.message || 'Internal server error' });
  }
});

app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: "email and password required" });

  const { data: user } = await supabase.from("users")
    .select("id,name,email,phone,role,password,created_at").eq("email", email).maybeSingle();

  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(401).json({ error: "Invalid email or password" });

  if (user.approved === false && user.role !== "admin")
    return res.status(403).json({ error: "Account not approved by admin yet" });

  const { password: _pw, ...safeUser } = user;
  res.json({ token: signToken(safeUser), user: safeUser });
});

app.get("/api/auth/me", authMiddleware, async (req, res) => {
  const { data: user } = await supabase.from("users")
    .select("id,name,email,phone,role,created_at").eq("id", req.user.id).single();
  if (!user) return res.status(404).json({ error: "Not found" });
  res.json({ user });
});

// Change password for authenticated users
app.post("/api/auth/change-password", authMiddleware, async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) return res.status(400).json({ error: "oldPassword and newPassword required" });
  if (newPassword.length < 6) return res.status(400).json({ error: "New password must be at least 6 characters" });

  const { data: user } = await supabase.from("users")
    .select("id,name,email,phone,role,password").eq("id", req.user.id).maybeSingle();
  if (!user) return res.status(404).json({ error: "User not found" });

  const ok = await bcrypt.compare(oldPassword, user.password || "");
  if (!ok) return res.status(401).json({ error: "Old password is incorrect" });

  const hash = await bcrypt.hash(newPassword, 10);
  const { error } = await supabase.from("users").update({ password: hash }).eq("id", req.user.id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ message: "Password changed" });
});

// ── RESOURCES ─────────────────────────────────────────────────────────────
app.get("/api/resources", async (req, res) => {
  let q = supabase.from("resources").select("*").order("created_at", { ascending: false });
  ["type","class","board","subject","stream","faculty","chapter"].forEach(f => {
    if (req.query[f]) q = q.eq(f, req.query[f]);
  });
  const { data, error } = await q;
  if (error) return res.status(500).json({ error: error.message });
  res.json({ resources: data });
});

app.post("/api/resources", authMiddleware, adminOnly, upload.single("file"), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });
  const { title, type, class: cls, board, subject, stream, chapter, faculty } = req.body;
  if (!title || !type) return res.status(400).json({ error: "title and type required" });

  const ext = req.file.originalname.split(".").pop();
  const filePath = `${type}/${uuidv4()}.${ext}`;

  const { error: se } = await supabase.storage.from("resources")
    .upload(filePath, req.file.buffer, { contentType: req.file.mimetype });
  if (se) return res.status(500).json({ error: se.message });

  const { data: urlData } = supabase.storage.from("resources").getPublicUrl(filePath);

  const { data, error } = await supabase.from("resources").insert({
    title, type, class: cls||null, board: board||null, subject: subject||null,
    stream: stream||null, chapter: chapter||null, faculty: faculty||null,
    file_url: urlData.publicUrl, file_name: req.file.originalname,
    file_size: req.file.size, uploaded_by: req.user.id
  }).select().single();

  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json({ resource: data });
});

app.put("/api/resources/:id", authMiddleware, adminOnly, async (req, res) => {
  const updates = {};
  ["title","type","class","board","subject","stream","chapter","faculty"].forEach(f => {
    if (req.body[f] !== undefined) updates[f] = req.body[f];
  });
  const { data, error } = await supabase.from("resources").update(updates)
    .eq("id", req.params.id).select().single();
  if (error) return res.status(500).json({ error: error.message });
  res.json({ resource: data });
});

app.delete("/api/resources/:id", authMiddleware, adminOnly, async (req, res) => {
  const { data: r } = await supabase.from("resources").select("file_url").eq("id", req.params.id).single();
  if (r?.file_url) {
    // Public URL format: .../storage/v1/object/public/resources/<path>
    // We need just the <path> portion after the bucket name
    const marker = "/object/public/resources/";
    const idx = r.file_url.indexOf(marker);
    if (idx !== -1) {
      const storagePath = r.file_url.slice(idx + marker.length);
      await supabase.storage.from("resources").remove([storagePath]);
    }
  }
  const { error } = await supabase.from("resources").delete().eq("id", req.params.id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ message: "Deleted" });
});

// ── VIDEOS ────────────────────────────────────────────────────────────────
app.get("/api/videos", async (req, res) => {
  let q = supabase.from("videos").select("*").order("created_at", { ascending: false });
  ["class","board","subject","stream","faculty","chapter"].forEach(f => {
    if (req.query[f]) q = q.eq(f, req.query[f]);
  });
  const { data, error } = await q;
  if (error) return res.status(500).json({ error: error.message });
  res.json({ videos: data });
});

app.post("/api/videos", authMiddleware, adminOnly, async (req, res) => {
  const { title, url, subject, class: cls, board, stream, chapter, faculty } = req.body;
  if (!title || !url) return res.status(400).json({ error: "title and url required" });
  const { data, error } = await supabase.from("videos")
    .insert({ title, url, subject, class: cls, board: board||null, stream, chapter, faculty, uploaded_by: req.user.id })
    .select().single();
  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json({ video: data });
});

app.put("/api/videos/:id", authMiddleware, adminOnly, async (req, res) => {
  const updates = {};
  ["title","url","subject","class","board","stream","chapter","faculty"].forEach(f => {
    if (req.body[f] !== undefined) updates[f] = req.body[f];
  });
  const { data, error } = await supabase.from("videos").update(updates)
    .eq("id", req.params.id).select().single();
  if (error) return res.status(500).json({ error: error.message });
  res.json({ video: data });
});

app.delete("/api/videos/:id", authMiddleware, adminOnly, async (req, res) => {
  const { error } = await supabase.from("videos").delete().eq("id", req.params.id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ message: "Deleted" });
});

// ── CHAPTERS ──────────────────────────────────────────────────────────────
app.get("/api/chapters", async (req, res) => {
  let q = supabase.from("chapters").select("*").order("sort_order", { ascending: true });
  ["class","board","subject","stream"].forEach(f => {
    if (req.query[f]) q = q.eq(f, req.query[f]);
  });
  const { data, error } = await q;
  if (error) return res.status(500).json({ error: error.message });
  res.json({ chapters: data });
});

app.post("/api/chapters", authMiddleware, adminOnly, async (req, res) => {
  const { name, class: cls, board, subject, stream, sort_order } = req.body;
  if (!name) return res.status(400).json({ error: "name required" });
  const { data, error } = await supabase.from("chapters")
    .insert({ name, class: cls, board, subject, stream, sort_order: sort_order||1 })
    .select().single();
  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json({ chapter: data });
});

app.put("/api/chapters/:id", authMiddleware, adminOnly, async (req, res) => {
  const updates = {};
  ["name","class","board","subject","stream","sort_order"].forEach(f => {
    if (req.body[f] !== undefined) updates[f] = req.body[f];
  });
  const { data, error } = await supabase.from("chapters").update(updates)
    .eq("id", req.params.id).select().single();
  if (error) return res.status(500).json({ error: error.message });
  res.json({ chapter: data });
});

app.delete("/api/chapters/:id", authMiddleware, adminOnly, async (req, res) => {
  const { error } = await supabase.from("chapters").delete().eq("id", req.params.id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ message: "Deleted" });
});

// ── FEEDBACK ──────────────────────────────────────────────────────────────
app.post("/api/feedback", async (req, res) => {
  const { name, email, rating, message } = req.body;
  if (!message) return res.status(400).json({ error: "message required" });
  const { data, error } = await supabase.from("feedback")
    .insert({ name: name||"Anonymous", email: email||null, rating: rating||5, message })
    .select().single();
  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json({ feedback: data });
});

app.get("/api/feedback", authMiddleware, adminOnly, async (req, res) => {
  const { data, error } = await supabase.from("feedback").select("*").order("created_at", { ascending: false });
  if (error) return res.status(500).json({ error: error.message });
  res.json({ feedbacks: data });
});

app.delete("/api/feedback/:id", authMiddleware, adminOnly, async (req, res) => {
  const { error } = await supabase.from("feedback").delete().eq("id", req.params.id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ message: "Deleted" });
});

// ── CONTACT ───────────────────────────────────────────────────────────────
app.post("/api/contact", async (req, res) => {
  const { name, email, phone, message } = req.body;
  if (!message) return res.status(400).json({ error: "message required" });
  const { data, error } = await supabase.from("contact_messages")
    .insert({ name, email, phone, message }).select().single();
  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json({ contact: data });
});

app.get("/api/contact", authMiddleware, adminOnly, async (req, res) => {
  const { data, error } = await supabase.from("contact_messages").select("*").order("created_at", { ascending: false });
  if (error) return res.status(500).json({ error: error.message });
  res.json({ messages: data });
});

app.delete("/api/contact/:id", authMiddleware, adminOnly, async (req, res) => {
  const { error } = await supabase.from("contact_messages").delete().eq("id", req.params.id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ message: "Deleted" });
});

// ── STUDENTS ──────────────────────────────────────────────────────────────
app.get("/api/students", authMiddleware, adminOnly, async (req, res) => {
  const { data, error } = await supabase.from("users")
    .select("id,name,email,phone,role,approved,created_at").eq("role","student")
    .order("created_at", { ascending: false });
  if (error) return res.status(500).json({ error: error.message });
  res.json({ students: data });
});

app.get("/api/students/stats", authMiddleware, adminOnly, async (req, res) => {
  const [r1, r2, r3, r4] = await Promise.all([
    supabase.from("users").select("*",{count:"exact",head:true}).eq("role","student"),
    supabase.from("resources").select("*",{count:"exact",head:true}),
    supabase.from("videos").select("*",{count:"exact",head:true}),
    supabase.from("feedback").select("*",{count:"exact",head:true}),
  ]);
  if (r1.error || r2.error || r3.error || r4.error) {
    const err = r1.error || r2.error || r3.error || r4.error;
    return res.status(500).json({ error: err.message });
  }
  res.json({ totalStudents: r1.count ?? 0, totalResources: r2.count ?? 0, totalVideos: r3.count ?? 0, totalFeedbacks: r4.count ?? 0 });
});

app.delete("/api/students/:id", authMiddleware, adminOnly, async (req, res) => {
  const { error } = await supabase.from("users").delete().eq("id", req.params.id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ message: "Deleted" });
});

// Approve a student account
app.post("/api/students/:id/approve", authMiddleware, adminOnly, async (req, res) => {
  const { error } = await supabase.from("users").update({ approved: true }).eq("id", req.params.id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ message: "Approved" });
});

// ═══════════════════════════════════════════════════════════════════════════
//  FRONTEND — Serve the React app at GET /
//  The JSX is decoded from frontend_b64.txt at startup and embedded in HTML
// ═══════════════════════════════════════════════════════════════════════════
const frontendB64 = fs.readFileSync(path.join(__dirname, "frontend_b64.txt"), "utf-8").trim();
let frontendJSX = Buffer.from(frontendB64, "base64").toString("utf-8");
frontendJSX = frontendJSX
  .replace('const [loading, setLoading] = useState(false);',
    'const [loading, setLoading] = useState(false);\n  const deleteContactMessage = async (id) => {\n    try {\n      await contactAPI.delete(id);\n      setMessages(prev => prev.filter(m => m.id !== id));\n    } catch (err) {\n      console.error(err);\n    }\n  };')
  .replace('href={`mailto:${m.email}?subject=Re: Your message to JC Resource Lab`}',
    'href={"mailto:" + m.email + "?subject=Re: Your message to JC Resource Lab"}')
  .replace('              </a>\n            </div>',
    '              </a>\n              <button type="button" onClick={() => deleteContactMessage(m.id)} className="btn btn-danger btn-sm" style={{display:"inline-flex",alignItems:"center",gap:6}}>\n                <Icon name="trash" size={14}/> Delete\n              </button>\n            </div>');
  // Remove visible demo credentials text from frontend UI
  frontendJSX = frontendJSX.replace('🔐 Admin access only. Demo: admin@jcrl.com / admin123', '🔐 Admin access only.');
  // Replace displayed educator name with requested name
  frontendJSX = frontendJSX.replace('Mr. Mohan Kumar', 'Mohan M Gowda');
  frontendJSX = frontendJSX.replace('alt="Mr. Mohan Kumar - Educator, JC Resource Lab"', 'alt="Mohan M Gowda - Educator, JC Resource Lab"');
  // Inject a Change Password button beside Sign Out (uses prompt for quick input)
  frontendJSX = frontendJSX.replace(
    '<button className="btn btn-secondary btn-sm" style={{width:"100%"}} onClick={() => { authAPI.logout(); setLoggedIn(false); setIsAdmin(false); setProfile(false); }}>Sign Out</button>',
    '<><button className="btn btn-secondary btn-sm" style={{width:"100%",marginBottom:8}} onClick={async ()=>{const oldP=prompt("Enter current password"); if(!oldP) return; const newP=prompt("Enter new password (min 6 chars)"); if(!newP) return; try{ await authAPI.changePassword(oldP,newP); alert("Password changed successfully"); authAPI.logout(); setLoggedIn(false); setIsAdmin(false); setProfile(false);}catch(e){alert(e.message||e);} }}><Icon name="lock" size={14}/>Change Password</button><button className="btn btn-secondary btn-sm" style={{width:"100%"}} onClick={() => { authAPI.logout(); setLoggedIn(false); setIsAdmin(false); setProfile(false); }}>Sign Out</button></>'
  );
const frontendHelperJS = `
const API_BASE = window.location.origin + "/api";
const getToken = () => localStorage.getItem("jc_token");
const setToken = (t) => localStorage.setItem("jc_token", t);
const clearToken = () => localStorage.removeItem("jc_token");

function authHeaders(extra) {
  const token = getToken();
  return { "Content-Type": "application/json", ...(token ? { Authorization: "Bearer " + token } : {}), ...extra };
}
async function apiFetch(url, opts) {
  try {
    const res = await fetch(API_BASE + url, opts);
    const text = await res.text();
    let json;
    try { json = text ? JSON.parse(text) : {}; } catch (e) { json = { error: text || (res.status + ' ' + res.statusText) }; }
    if (!res.ok) throw new Error(json.error || ('Request failed (' + res.status + ')'));
    return json;
  } catch (e) {
    throw new Error(e.message || 'Network error');
  }
}

const authAPI = {
  async login(email, password) {
    const d = await apiFetch("/auth/login", { method:"POST", headers:authHeaders(), body:JSON.stringify({email,password}) });
    setToken(d.token); return d;
  },
  async signup(name, email, password, phone) {
    const d = await apiFetch("/auth/signup", { method:"POST", headers:authHeaders(), body:JSON.stringify({name,email,password,phone}) });
    setToken(d.token); return d;
  },
  async changePassword(oldPassword, newPassword) {
    return apiFetch("/auth/change-password", { method: "POST", headers: authHeaders(), body: JSON.stringify({ oldPassword, newPassword }) });
  },
  logout() { clearToken(); }
};
const resourcesAPI = {
  list(filters) { const p = new URLSearchParams(filters||{}).toString(); return apiFetch("/resources?" + p); },
  async upload(meta, file) {
    const form = new FormData();
    form.append("file", file);
    Object.entries(meta).forEach(([k,v]) => { if (v) form.append(k, v); });
    const token = getToken();
    const res = await fetch(API_BASE + "/resources", { method:"POST", headers: token ? { Authorization:"Bearer "+token } : {}, body: form });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error);
    return json;
  },
  update(id, u) { return apiFetch("/resources/"+id, { method:"PUT", headers:authHeaders(), body:JSON.stringify(u) }); },
  delete(id)    { return apiFetch("/resources/"+id, { method:"DELETE", headers:authHeaders() }); }
};
const videosAPI = {
  list(f)    { return apiFetch("/videos?" + new URLSearchParams(f||{}).toString()); },
  create(d)  { return apiFetch("/videos", { method:"POST", headers:authHeaders(), body:JSON.stringify(d) }); },
  update(id,d){ return apiFetch("/videos/"+id, { method:"PUT", headers:authHeaders(), body:JSON.stringify(d) }); },
  delete(id) { return apiFetch("/videos/"+id, { method:"DELETE", headers:authHeaders() }); }
};
const chaptersAPI = {
  list(f)    { return apiFetch("/chapters?" + new URLSearchParams(f||{}).toString()); },
  create(d)  { return apiFetch("/chapters", { method:"POST", headers:authHeaders(), body:JSON.stringify(d) }); },
  update(id,d){ return apiFetch("/chapters/"+id, { method:"PUT", headers:authHeaders(), body:JSON.stringify(d) }); },
  delete(id) { return apiFetch("/chapters/"+id, { method:"DELETE", headers:authHeaders() }); }
};
const feedbackAPI = {
  submit(d)  { return apiFetch("/feedback", { method:"POST", headers:authHeaders(), body:JSON.stringify(d) }); },
  list()     { return apiFetch("/feedback", { headers:authHeaders() }); },
  delete(id) { return apiFetch("/feedback/"+id, { method:"DELETE", headers:authHeaders() }); }
};
const contactAPI = {
  send(d)    { return apiFetch("/contact", { method:"POST", headers:authHeaders(), body:JSON.stringify(d) }); },
  list()     { return apiFetch("/contact", { headers:authHeaders() }); },
  delete(id) { return apiFetch("/contact/"+id, { method:"DELETE", headers:authHeaders() }); }
};
const studentsAPI = {
  list()     { return apiFetch("/students", { headers:authHeaders() }); },
  stats()    { return apiFetch("/students/stats", { headers:authHeaders() }); },
  delete(id) { return apiFetch("/students/"+id, { method:"DELETE", headers:authHeaders() }); },
  approve(id) { return apiFetch("/students/"+id+"/approve", { method:"POST", headers:authHeaders() }); }
};
`;
const compiledFrontendJS = babel.transformSync(frontendHelperJS + "\n" + frontendJSX, {
  presets: [
    ["@babel/preset-env", { targets: "defaults" }],
    ["@babel/preset-react", { runtime: "classic" }]
  ],
  sourceType: "script",
}).code.replace(/<\/script>/g, "<\\/script>");

const HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>JC Resource Lab</title>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Fraunces:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet"/>
  <script src="https://unpkg.com/react@18/umd/react.development.js" crossorigin></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin></script>
  <style>
    *{box-sizing:border-box;margin:0;padding:0}
    html,body{min-height:100%;}
    body{font-family:Plus Jakarta Sans,system-ui,Arial,sans-serif;background:#f4f6fb;color:#111;line-height:1.6;}
    .container{max-width:1200px;margin:0 auto;padding:20px;}
    .card{width:100%;}
    .btn{border:none;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;gap:8px;}
    .btn-sm{padding:10px 16px;font-size:0.9rem;}
    .btn-danger{background:#dc2626;color:#fff;}
    .btn-secondary{background:#1e3a6e;color:#fff;}
    .badge{display:inline-block;padding:4px 10px;border-radius:999px;font-size:0.8rem;}
    .table-responsive{width:100%;overflow-x:auto;}
    .section-header{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;margin-bottom:24px;}
    .form-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px;}
    .form-grid > *{min-width:0;}
    .text-center{text-align:center;}
    @media(max-width:768px){
      body{padding:0 12px;}
      .container{padding:16px;}
      .card{padding:18px!important;margin:0!important;}
      .btn{width:100%;}
      .btn + .btn{margin-top:10px;}
      .section-header{flex-direction:column;align-items:stretch;}
      .form-grid{grid-template-columns:1fr;}
    }
  </style>
</head>
<body>
  <div id="root"></div>
  <script>
${compiledFrontendJS}
  </script>
</body>
</html>`;

// Serve frontend for all non-API routes
app.get("/", (req, res) => res.send(HTML));

// 404 for unknown API routes
app.use("/api", (req, res) => res.status(404).json({ error: "API route not found" }));

// Catch-all: serve frontend for any other path (SPA behaviour)
app.get("*", (req, res) => res.send(HTML));

// ── Start ─────────────────────────────────────────────────────────────────
app.listen(PORT, async () => {
  console.log("\n✅ JC Resource Lab is running!");
  console.log("🌐 Open in browser: http://localhost:" + PORT);
  // Demo admin credentials (for local/dev only)
  console.log("🔐 Admin login: admin@jcrl.com  /  admin123");
  console.log("📦 Supabase:        " + (process.env.SUPABASE_URL || "⚠️  Not set — fill in .env"));
  console.log("\n");

  // ── Supabase connection test ─────────────────────────────────────────────
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
  if (!key || key === "PASTE_YOUR_SERVICE_ROLE_KEY_HERE" || key.startsWith("sb_secret_")) {
    console.error("❌  SUPABASE_SERVICE_ROLE_KEY looks wrong in your .env file.");
    console.error("   It must be the long JWT from: Supabase Dashboard → Settings → API → service_role");
    console.error("   It starts with: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...\n");
    return;
  }
  const { error: pingError } = await supabase.from("users").select("id").limit(1);
  if (pingError) {
    console.error("❌  Supabase connection FAILED:", pingError.message);
    console.error("   Check SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in your .env file.\n");
  } else {
    console.log("✅  Supabase connected successfully!\n");
  }
});
