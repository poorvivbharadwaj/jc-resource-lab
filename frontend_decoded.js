const { useState, useEffect, useRef } = React;

const LECTURER_EMAIL = "mohanmgowda120@gmail.com";

// ─── ICONS (inline SVG components) ───────────────────────────────────────────
const Icon = ({ name, size = 20, className = "" }) => {
  const icons = {
    school: (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>),
    college: (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/></svg>),
    book: (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>),
    pdf: (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>),
    video: (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>),
    download: (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>),
    search: (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>),
    moon: (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>),
    sun: (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>),
    menu: (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/></svg>),
    back: (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>),
    user: (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>),
    mail: (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>),
    phone: (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.06 6.06l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>),
    location: (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>),
    close: (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>),
    plus: (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>),
    edit: (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>),
    trash: (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>),
    upload: (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/></svg>),
    shield: (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>),
    message: (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>),
    star: (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>),
    layers: (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>),
    check: (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="20 6 9 17 4 12"/></svg>),
    eye: (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>),
    "eye-off": (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a21.55 21.55 0 0 1 5.06-6.13"/><path d="M1 1l22 22"/><path d="M10.59 10.59A3 3 0 0 0 13.41 13.41"/><path d="M14.12 14.12A6.92 6.92 0 0 1 12 15"/><path d="M9.88 9.88A6.92 6.92 0 0 1 12 9"/><path d="M8.53 5.35A10.94 10.94 0 0 1 12 4c7 0 11 8 11 8a18.53 18.53 0 0 1-2.73 4.47"/></svg>),
    home: (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>),
    award: (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>),
    file: (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/></svg>),
  };
  return icons[name] || null;
};

function PasswordInput({ label, name, value, placeholder, onChange }) {
  const [visible, setVisible] = useState(false);
  return (
    <div className="form-group password-group">
      {label && <label className="form-label" htmlFor={name}>{label}</label>}
      <div className="password-field">
        <input
          id={name}
          name={name}
          className="form-input"
          type={visible ? "text" : "password"}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        <button
          type="button"
          className="password-toggle"
          onClick={() => setVisible(v => !v)}
          aria-label={visible ? "Hide password" : "Show password"}
        >
          <Icon name={visible ? "eye-off" : "eye"} size={18} />
        </button>
      </div>
    </div>
  );
}

// ─── DATA ─────────────────────────────────────────────────────────────────────
const SCHOOL_SUBJECTS_5_8 = [
  "First Language English","First Language Kannada","Second Language English",
  "Second Language Kannada","Third Language Hindi","Mathematics","Science","Social Science"
];
const CBSE_SUBJECTS = ["Mathematics","Science","Social Science","English"];
const SCIENCE_STREAMS = { PCMB:["Physics","Chemistry","Mathematics","Biology"], PCMC:["Physics","Chemistry","Mathematics","Computer Science"], PCME:["Physics","Chemistry","Mathematics","Electronics"] };
const COMMERCE_STREAMS = { CEBA:["Commerce","Economics","Business Studies","Accountancy"], SEBA:["Statistics","Economics","Business Studies","Accountancy"], MEBA:["Mathematics","Economics","Business Studies","Accountancy"] };

const RESOURCE_TYPES = [
  { key:"notes", label:"Notes", icon:"book", color:"#6366f1" },
  { key:"prev_papers", label:"Previous Year Papers", icon:"file", color:"#f59e0b" },
  { key:"practice", label:"Practice Papers", icon:"layers", color:"#10b981" },
  { key:"passing", label:"Passing Package", icon:"award", color:"#ec4899" },
  { key:"modules", label:"Worksheets & Activities", icon:"star", color:"#8b5cf6" },
  { key:"videos", label:"YouTube Videos", icon:"video", color:"#ef4444" },
];

// ─── MOCK DATA ─────────────────────────────────────────────────────────────────
const MOCK_RESOURCES = {
  notes: [],
  prev_papers: [],
  practice: [],
  passing: [],
  modules: [],
  videos: [],
};

// ─── STYLES ───────────────────────────────────────────────────────────────────
const globalCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Fraunces:ital,wght@0,400;0,700;1,400&display=swap');
  
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  
  :root {
    --bg: #ffffff;
    --bg2: #ffffff;
    --bg3: #f5f7fa;
    --card: #ffffff;
    --card-border: #e2e8f0;
    --text: #0f172a;
    --text2: #475569;
    --text3: #94a3b8;
    --accent: #c9a227;
    --accent2: #a07d1c;
    --accent-light: #fdf8ec;
    --navy: #1e3a6e;
    --navy-dark: #122348;
    --blue: #1e3a6e;
    --blue-light: #eef2ff;
    --green: #16a34a;
    --green-light: #f0fdf4;
    --purple: #7c3aed;
    --purple-light: #f5f3ff;
    --amber: #d97706;
    --amber-light: #fffbeb;
    --pink: #db2777;
    --pink-light: #fdf2f8;
    --shadow-sm: 0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04);
    --shadow: 0 4px 16px rgba(0,0,0,0.07), 0 2px 6px rgba(0,0,0,0.04);
    --shadow-lg: 0 12px 40px rgba(0,0,0,0.10), 0 4px 12px rgba(0,0,0,0.06);
    --radius: 16px;
    --radius-sm: 10px;
    --radius-lg: 24px;
    --font: 'Plus Jakarta Sans', sans-serif;
    --font-display: 'Fraunces', serif;
    transition: background 0.3s, color 0.3s;
  }

  .dark {
    --bg: #0f0e0c;
    --bg2: #1a1916;
    --bg3: #221f1b;
    --card: #1e1c18;
    --card-border: #2e2b25;
    --text: #f5f0e8;
    --text2: #b8b0a4;
    --text3: #6b6358;
    --accent-light: #2a1508;
    --blue-light: #0f1a35;
    --green-light: #052513;
    --purple-light: #17103a;
    --amber-light: #1f1200;
    --pink-light: #220d17;
    --shadow-sm: 0 1px 3px rgba(0,0,0,0.3);
    --shadow: 0 4px 16px rgba(0,0,0,0.4);
    --shadow-lg: 0 12px 40px rgba(0,0,0,0.5);
  }

  body { background: var(--bg); color: var(--text); font-family: var(--font); min-height: 100vh; overflow-x:hidden; box-sizing:border-box; }
  
  ::-webkit-scrollbar { width: 6px; height: 6px; }
  ::-webkit-scrollbar-track { background: var(--bg3); }
  ::-webkit-scrollbar-thumb { background: var(--card-border); border-radius: 3px; }
  ::-webkit-scrollbar-thumb:hover { background: var(--text3); }

  .splash { position:fixed; inset:0; background:linear-gradient(135deg, #0f1e3d 0%, #1e3a6e 50%, #122348 100%); display:flex; flex-direction:column; align-items:center; justify-content:center; z-index:9999; }
  .splash-logo { width:160px; height:160px; background:transparent; border-radius:0; display:flex; align-items:center; justify-content:center; animation:splashPop 0.8s cubic-bezier(0.34,1.56,0.64,1) 0.3s both; }
  .splash-title { font-family:var(--font-display); font-size:clamp(2rem,6vw,3.5rem); color:#f5f0e8; margin-top:24px; animation:fadeUp 0.8s ease 0.8s both; letter-spacing:-0.02em; }
  .splash-sub { font-size:1rem; color:#b8a898; margin-top:8px; animation:fadeUp 0.8s ease 1s both; letter-spacing:0.12em; text-transform:uppercase; }
  .splash-dots { display:flex; gap:8px; margin-top:40px; animation:fadeUp 0.8s ease 1.2s both; }
  .splash-dot { width:8px; height:8px; border-radius:50%; background:#c9a227; animation:pulse 1.2s ease-in-out infinite; }
  .splash-dot:nth-child(2) { animation-delay:0.2s; background:#ffffff; }
  .splash-dot:nth-child(3) { animation-delay:0.4s; background:#c9a227; }
  .splash-out { animation:splashFade 0.6s ease forwards; }
  
  @keyframes splashPop { from{opacity:0;transform:scale(0.4) rotate(-10deg)} to{opacity:1;transform:scale(1) rotate(0)} }
  @keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
  @keyframes splashFade { to{opacity:0;transform:scale(1.05)} }
  @keyframes pulse { 0%,100%{transform:scale(1);opacity:0.6} 50%{transform:scale(1.4);opacity:1} }
  @keyframes fadeIn { from{opacity:0} to{opacity:1} }
  @keyframes slideUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
  @keyframes slideInLeft { from{opacity:0;transform:translateX(-30px)} to{opacity:1;transform:translateX(0)} }
  @keyframes scaleIn { from{opacity:0;transform:scale(0.9)} to{opacity:1;transform:scale(1)} }

  .header { background:var(--card); border-bottom:1px solid var(--card-border); position:sticky; top:0; z-index:100; box-shadow:var(--shadow-sm); }
  .header-inner { max-width:1200px; margin:0 auto; padding:12px 20px; display:flex; align-items:center; justify-content:space-between; gap:12px; }
  .header-brand { display:flex; align-items:center; gap:12px; text-decoration:none; flex:1; }
  .header-logo { width:44px; height:44px; background:transparent; border-radius:12px; display:flex; align-items:center; justify-content:center; flex-shrink:0; padding:0; }
  .header-name { font-family:var(--font-display); font-size:1.25rem; color:var(--text); font-weight:700; line-height:1.2; }
  .header-tagline { font-size:0.7rem; color:var(--text3); font-weight:500; letter-spacing:0.05em; }
  .header-actions { display:flex; align-items:center; gap:8px; }

  .navbar { background:var(--bg2); border-bottom:1px solid var(--card-border); }
  .navbar-inner { max-width:1200px; margin:0 auto; padding:0 20px; display:flex; align-items:center; gap:4px; overflow-x:auto; }
  .navbar-inner::-webkit-scrollbar { display:none; }
  .nav-link { padding:14px 16px; font-size:0.875rem; font-weight:600; color:var(--text2); text-decoration:none; white-space:nowrap; border-bottom:3px solid transparent; transition:all 0.2s; cursor:pointer; display:flex; align-items:center; gap:6px; background:none; border:none; border-bottom:3px solid transparent; }
  .nav-link:hover { color:var(--navy); background:var(--accent-light); border-radius:8px 8px 0 0; }
  .nav-link.active { color:var(--navy); border-bottom-color:var(--accent); font-weight:700; }

  .btn { display:inline-flex; align-items:center; gap:8px; padding:10px 18px; border-radius:var(--radius-sm); font-weight:600; font-size:0.875rem; cursor:pointer; transition:all 0.2s; border:none; text-decoration:none; font-family:var(--font); min-height:44px; }
  .btn-primary { background:linear-gradient(135deg,#1e3a6e,#122348); color:#fff; box-shadow:0 4px 14px rgba(30,58,110,0.35); border:1.5px solid #c9a227; }
  .btn-primary:hover { transform:translateY(-1px); box-shadow:0 6px 20px rgba(30,58,110,0.45); }
  .btn-secondary { background:var(--card); color:var(--text2); border:1.5px solid var(--card-border); }
  .btn-secondary:hover { background:var(--bg3); color:var(--text); }
  .btn-ghost { background:transparent; color:var(--text2); padding:8px; border-radius:var(--radius-sm); }
  .btn-ghost:hover { background:var(--bg3); color:var(--text); }
  .btn-sm { padding:8px 14px; font-size:0.85rem; min-height:38px; }
  .btn-icon { width:44px; height:44px; padding:0; justify-content:center; border-radius:12px; }

  .page { max-width:1200px; margin:0 auto; padding:clamp(16px,5vw,32px); animation:fadeIn 0.4s ease; overflow-x:hidden; }
  .page-header { margin-bottom:32px; }
  .page-title { font-family:var(--font-display); font-size:clamp(1.8rem,4vw,2.8rem); color:var(--text); font-weight:700; line-height:1.2; word-break:break-word; }
  .page-subtitle { color:var(--text2); margin-top:8px; font-size:1rem; word-break:break-word; }
  .breadcrumb { display:flex; align-items:center; gap:8px; margin-bottom:20px; font-size:0.85rem; color:var(--text3); flex-wrap:wrap; }
  .breadcrumb-item { cursor:pointer; color:var(--navy); font-weight:600; }
  .breadcrumb-item:hover { text-decoration:underline; }
  .breadcrumb-sep { color:var(--text3); }

  .card { background:var(--card); border:1.5px solid var(--card-border); border-radius:var(--radius); padding:clamp(16px,4vw,24px); box-shadow:var(--shadow-sm); transition:all 0.2s; box-sizing:border-box; word-wrap:break-word; overflow:hidden; }
  .card:hover { box-shadow:var(--shadow); border-color:var(--accent); }
  .card-grid { display:grid; gap:clamp(12px,3vw,20px); }
  .card-grid-2 { grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr)); }
  .card-grid-3 { grid-template-columns:repeat(auto-fit,minmax(min(100%,240px),1fr)); }
  .card-grid-4 { grid-template-columns:repeat(auto-fit,minmax(min(100%,200px),1fr)); }

  .big-card { background:var(--card); border:2px solid var(--card-border); border-radius:var(--radius-lg); padding:clamp(28px,5vw,48px) clamp(20px,5vw,32px); display:flex; flex-direction:column; align-items:center; text-align:center; cursor:pointer; transition:all 0.3s cubic-bezier(0.34,1.56,0.64,1); box-shadow:var(--shadow); box-sizing:border-box; }
  .big-card:hover { transform:translateY(-8px) scale(1.02); box-shadow:var(--shadow-lg); }
  .big-card-icon { width:80px; height:80px; border-radius:20px; display:flex; align-items:center; justify-content:center; margin-bottom:20px; }
  .big-card-title { font-family:var(--font-display); font-size:1.8rem; font-weight:700; margin-bottom:8px; }
  .big-card-desc { color:var(--text2); font-size:0.9rem; line-height:1.6; }

  .class-card { background:var(--card); border:1.5px solid var(--card-border); border-radius:var(--radius); padding:clamp(16px,3vw,28px) clamp(14px,3vw,20px); display:flex; flex-direction:column; align-items:center; text-align:center; cursor:pointer; transition:all 0.25s; box-sizing:border-box; }
  .class-card:hover { transform:translateY(-4px); box-shadow:var(--shadow); background:var(--blue-light); border-color:var(--navy); }
  .class-card-num { font-family:var(--font-display); font-size:clamp(1.8rem,4vw,2.5rem); font-weight:700; color:var(--navy); }
  .class-card-label { font-size:0.8rem; font-weight:600; color:var(--text3); text-transform:uppercase; letter-spacing:0.08em; margin-top:4px; }

  .subject-card { background:var(--card); border:1.5px solid var(--card-border); border-radius:var(--radius); padding:clamp(14px,3vw,20px); cursor:pointer; transition:all 0.2s; display:flex; align-items:center; gap:clamp(12px,3vw,16px); box-sizing:border-box; }
  .subject-card:hover { transform:translateX(4px); box-shadow:var(--shadow); border-color:var(--accent); }
  .subject-icon { width:clamp(40px,3vw,48px); height:clamp(40px,3vw,48px); border-radius:12px; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
  .subject-name { font-weight:700; font-size:1rem; color:var(--text); word-break:break-word; }
  .subject-count { font-size:0.8rem; color:var(--text3); margin-top:2px; }

  .resource-section { margin-bottom:32px; animation:slideUp 0.4s ease both; }
  .resource-section-header { display:flex; align-items:center; justify-content:space-between; margin-bottom:16px; padding-bottom:12px; border-bottom:2px solid var(--card-border); }
  .resource-section-title { display:flex; align-items:center; gap:10px; font-size:1.1rem; font-weight:700; }
  .resource-dot { width:10px; height:10px; border-radius:50%; }
  .resource-item { background:var(--card); border:1.5px solid var(--card-border); border-radius:var(--radius-sm); padding:clamp(12px,3vw,16px) clamp(14px,3vw,20px); display:flex; align-items:center; gap:clamp(8px,2vw,12px); margin-bottom:10px; transition:all 0.2s; box-sizing:border-box; flex-wrap:wrap; }
  .resource-item:hover { box-shadow:var(--shadow-sm); border-color:var(--accent); background:var(--accent-light); }
  .resource-item-info { flex:1; min-width:0; box-sizing:border-box; }
  .resource-item-title { font-weight:600; font-size:0.95rem; color:var(--text); word-break:break-word; overflow-wrap:break-word; }
  .resource-item-meta { font-size:0.78rem; color:var(--text3); margin-top:2px; word-break:break-word; }
  
  .video-grid { display:flex; flex-direction:column; gap:12px; }
  .video-card { border-radius:var(--radius); overflow:hidden; }
  .video-title { font-weight:600; font-size:0.95rem; }

  .sidebar-overlay { position:fixed; inset:0; background:rgba(0,0,0,0.5); z-index:200; animation:fadeIn 0.2s ease; }
  .sidebar { position:fixed; left:0; top:0; bottom:0; width:280px; background:var(--card); z-index:201; box-shadow:var(--shadow-lg); animation:slideInLeft 0.3s ease; display:flex; flex-direction:column; }
  .sidebar-header { padding:24px 20px 20px; border-bottom:1px solid var(--card-border); display:flex; justify-content:space-between; align-items:center; }
  .sidebar-logo { display:flex; align-items:center; gap:10px; }
  .sidebar-nav { flex:1; padding:16px 12px; overflow-y:auto; }
  .sidebar-item { display:flex; align-items:center; gap:12px; padding:13px 16px; border-radius:var(--radius-sm); color:var(--text2); font-weight:600; cursor:pointer; transition:all 0.2s; margin-bottom:4px; font-size:0.9rem; }
  .sidebar-item:hover { background:var(--bg3); color:var(--text); }
  .sidebar-item.active { background:var(--blue-light); color:var(--navy); }

  .modal-overlay { position:fixed; inset:0; background:rgba(0,0,0,0.5); z-index:300; display:flex; align-items:center; justify-content:center; padding:20px; animation:fadeIn 0.2s ease; }
  .modal { background:var(--card); border-radius:var(--radius-lg); width:100%; max-width:480px; box-shadow:var(--shadow-lg); animation:scaleIn 0.3s cubic-bezier(0.34,1.56,0.64,1); max-height:90vh; overflow-y:auto; }
  .modal-header { padding:24px 24px 16px; border-bottom:1px solid var(--card-border); display:flex; justify-content:space-between; align-items:center; }
  .modal-body { padding:24px; }
  .modal-footer { padding:16px 24px 24px; display:flex; gap:12px; justify-content:flex-end; }

  .form-group { margin-bottom:20px; }
  .form-label { display:block; font-size:0.85rem; font-weight:600; color:var(--text2); margin-bottom:8px; word-break:break-word; }
  .form-input { width:100%; padding:11px 14px; background:var(--bg); border:1.5px solid var(--card-border); border-radius:var(--radius-sm); font-size:0.9rem; font-family:var(--font); color:var(--text); transition:border-color 0.2s; outline:none; min-height:44px; box-sizing:border-box; }
  .form-grid { display:grid; gap:12px; grid-template-columns:1fr 1fr; }
  @media(max-width:768px) { .form-grid { grid-template-columns:1fr; } }
  .form-input:focus { border-color:var(--navy); background:var(--card); box-shadow:0 0 0 3px rgba(30,58,110,0.12); }
  .form-input::placeholder { color:var(--text3); }
  .form-textarea { resize:vertical; min-height:100px; }
  .password-field { position:relative; }
  .password-field .form-input { padding-right:50px; }
  .password-toggle { position:absolute; top:50%; right:10px; transform:translateY(-50%); border:none; background:transparent; color:var(--text3); width:38px; height:38px; border-radius:999px; display:flex; align-items:center; justify-content:center; cursor:pointer; }
  .password-toggle:hover { color:var(--navy); background:var(--bg3); }
  .password-toggle:focus { outline:2px solid var(--accent); outline-offset:2px; }
  .password-group { margin-bottom:18px; }
  .table-responsive { width:100%; overflow-x:auto; }
  table { width:100%; border-collapse:collapse; min-width:0; }
  th, td { padding:14px 12px; border-bottom:1px solid var(--card-border); text-align:left; }
  .form-select { appearance:none; cursor:pointer; }

  .badge { display:inline-flex; align-items:center; gap:5px; padding:4px 10px; border-radius:50px; font-size:0.75rem; font-weight:700; }
  .badge-orange { background:var(--accent-light); color:#a07d1c; }
  .badge-blue { background:var(--blue-light); color:var(--navy); }
  .badge-green { background:var(--green-light); color:var(--green); }
  .badge-purple { background:var(--purple-light); color:var(--purple); }

  .board-tabs { display:flex; gap:8px; margin-bottom:28px; background:var(--bg3); padding:6px; border-radius:14px; }
  .board-tab { flex:1; padding:11px 16px; border-radius:10px; text-align:center; cursor:pointer; font-weight:600; font-size:0.9rem; transition:all 0.2s; color:var(--text2); border:none; background:none; font-family:var(--font); }
  .board-tab.active { background:var(--navy); color:#ffffff; box-shadow:var(--shadow-sm); border:1.5px solid var(--accent); }

  .search-bar { background:var(--card); border:1.5px solid var(--card-border); border-radius:50px; padding:10px 20px; display:flex; align-items:center; gap:10px; width:100%; max-width:500px; transition:border-color 0.2s; }
  .search-bar:focus-within { border-color:var(--navy); box-shadow:0 0 0 3px rgba(30,58,110,0.12); }
  .search-bar input { flex:1; border:none; background:none; outline:none; font-family:var(--font); font-size:0.9rem; color:var(--text); }
  .search-bar input::placeholder { color:var(--text3); }

  .profile-dropdown { position:absolute; top:calc(100% + 8px); right:0; background:var(--card); border:1.5px solid var(--card-border); border-radius:var(--radius); box-shadow:var(--shadow-lg); width:280px; z-index:150; animation:scaleIn 0.2s ease; }
  .profile-header { padding:20px; border-bottom:1px solid var(--card-border); display:flex; align-items:center; gap:14px; }
  .profile-avatar { width:52px; height:52px; border-radius:14px; background:linear-gradient(135deg,#1e3a6e,#122348); border:2px solid #c9a227; display:flex; align-items:center; justify-content:center; flex-shrink:0; font-size:1.3rem; color:white; font-weight:700; }
  .profile-info { flex:1; min-width:0; }
  .profile-name { font-weight:700; font-size:1rem; }
  .profile-row { display:flex; align-items:center; gap:8px; padding:12px 20px; font-size:0.85rem; color:var(--text2); border-bottom:1px solid var(--card-border); }
  .profile-row:last-child { border-bottom:none; }

  .hero-banner { background:linear-gradient(135deg,#0f1e3d 0%,#1e3a6e 50%,#122348 100%); border-radius:var(--radius-lg); padding:clamp(32px,5vw,48px) clamp(24px,5vw,40px); margin-bottom:40px; position:relative; overflow:hidden; border:1.5px solid #c9a22740; box-sizing:border-box; }
  .hero-banner::before { content:''; position:absolute; top:-40%; right:-10%; width:400px; height:400px; background:radial-gradient(circle,rgba(201,162,39,0.25) 0%,transparent 70%); }
  .hero-banner::after { content:''; position:absolute; bottom:-30%; left:20%; width:300px; height:300px; background:radial-gradient(circle,rgba(201,162,39,0.12) 0%,transparent 70%); }
  .hero-content { position:relative; z-index:1; }
  .hero-title { font-family:var(--font-display); font-size:clamp(2rem,5vw,3.2rem); color:#f5f0e8; font-weight:700; line-height:1.15; margin-bottom:16px; word-break:break-word; }
  .hero-title span { color:#c9a227; }
  .hero-sub { color:#b8a898; font-size:1.05rem; max-width:500px; line-height:1.7; }
  .hero-stats { display:flex; gap:32px; margin-top:32px; flex-wrap:wrap; }
  .hero-stat-num { font-family:var(--font-display); font-size:1.8rem; color:#c9a227; font-weight:700; }
  .hero-stat-label { font-size:0.8rem; color:#b8a898; text-transform:uppercase; letter-spacing:0.06em; margin-top:2px; }

  .admin-sidebar { width:240px; flex-shrink:0; background:var(--card); border-right:1.5px solid var(--card-border); min-height:calc(100vh - 130px); }
  .admin-content { flex:1; min-width:0; padding:32px; }
  .admin-layout { display:flex; }
  .admin-nav-item { display:flex; align-items:center; gap:10px; padding:12px 20px; font-size:0.875rem; font-weight:600; color:var(--text2); cursor:pointer; transition:all 0.2s; border-left:3px solid transparent; }
  .admin-nav-item:hover { background:var(--bg3); color:var(--text); }
  .admin-nav-item.active { background:var(--blue-light); color:var(--navy); border-left-color:var(--accent); font-weight:700; }
  .stats-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(180px,1fr)); gap:16px; margin-bottom:32px; }
  .stat-card { background:var(--card); border:1.5px solid var(--card-border); border-radius:var(--radius); padding:20px; }
  .stat-num { font-family:var(--font-display); font-size:2rem; font-weight:700; color:var(--navy); }
  .stat-label { font-size:0.85rem; color:var(--text2); margin-top:4px; }

  .stream-card { background:var(--card); border:1.5px solid var(--card-border); border-radius:var(--radius); padding:28px; cursor:pointer; transition:all 0.25s; text-align:center; }
  .stream-card:hover { transform:translateY(-4px); box-shadow:var(--shadow); }
  .stream-title { font-family:var(--font-display); font-size:1.5rem; font-weight:700; margin-bottom:8px; }
  .stream-subjects { font-size:0.82rem; color:var(--text3); line-height:1.6; }

  .empty-state { text-align:center; padding:60px 20px; color:var(--text3); }
  .empty-icon { width:64px; height:64px; background:var(--bg3); border-radius:16px; display:flex; align-items:center; justify-content:center; margin:0 auto 16px; }
  .empty-title { font-size:1.1rem; font-weight:600; color:var(--text2); margin-bottom:8px; }

  @media(max-width:1024px) {
    .page { padding:clamp(16px,4vw,28px); }
    .card-grid-2 { grid-template-columns:repeat(auto-fit,minmax(min(100%,240px),1fr)); }
    .header-tagline { display:none; }
  }
  @media(max-width:768px) {
    .page { padding:clamp(14px,3vw,20px); }
    .hero-banner { padding:clamp(28px,4vw,32px) clamp(20px,3vw,24px); }
    .admin-sidebar { display:none; }
    .admin-layout { flex-direction:column; }
    .admin-mobile-tabs { display:flex; overflow-x:auto; gap:10px; padding-bottom:12px; margin-bottom:16px; }
    .admin-content { padding:clamp(16px,3vw,20px); }
    .card-grid-2, .card-grid-3, .card-grid-4 { grid-template-columns:1fr; }
    .card-grid { gap:clamp(12px,3vw,16px); }
    .big-card { padding:clamp(28px,4vw,36px) clamp(16px,3vw,20px); }
    .header-tagline { display:none; }
    .stats-grid { grid-template-columns:repeat(2,1fr); }
    .hero-stats { gap:20px; }
    .header-inner { flex-wrap:wrap; align-items:flex-start; padding:clamp(12px,3vw,16px); }
    .header-brand { min-width:0; }
    .header-actions { width:100%; justify-content:space-between; margin-top:12px; }
    .navbar-inner { padding:0 clamp(12px,3vw,16px); overflow-x:auto; flex-wrap:wrap; }
    .nav-link { padding:12px 14px; min-height:44px; min-width:auto; flex:1; }
    .modal { max-width:95vw; margin:0 10px; box-sizing:border-box; }
    .modal-body { max-height:60vh; overflow-y:auto; box-sizing:border-box; }
    .modal-footer { flex-direction:column; align-items:stretch; }
    .btn { min-height:44px; }
    .contact-grid { grid-template-columns:1fr; gap:clamp(16px,4vw,20px); }
    .form-input { padding:10px 12px; font-size:16px; }
    .form-textarea { min-height:80px; }
    .board-tabs { flex-direction:column; gap:6px; }
    .resource-item { flex-direction:column; align-items:flex-start; }
    .table-responsive-wrapper { width:100%; overflow-x:auto; }
  }
  @media(max-width:425px) {
    .page { padding:clamp(12px,2vw,16px); }
    .page-title { font-size:clamp(1.4rem,3vw,1.8rem); }
    .page-subtitle { font-size:0.9rem; }
    .hero-banner { padding:clamp(24px,3vw,28px) clamp(16px,2vw,20px); }
    .hero-content { width:100%; }
    .hero-title { font-size:clamp(1.6rem,3vw,2rem); }
    .hero-stats { flex-direction:column; gap:12px; }
    .card { padding:clamp(14px,3vw,16px); }
    .card-grid { gap:clamp(10px,2vw,12px); }
    .big-card { padding:clamp(24px,3vw,28px) clamp(14px,2vw,16px); border-radius:12px; }
    .big-card-icon { width:60px; height:60px; }
    .big-card-title { font-size:clamp(1.3rem,3vw,1.6rem); }
    .class-card { padding:clamp(16px,3vw,20px); }
    .class-card-num { font-size:clamp(2rem,4vw,2.5rem); }
    .stream-card { padding:clamp(16px,3vw,24px); }
    .stream-title { font-size:clamp(1.2rem,3vw,1.5rem); }
    .subject-card { flex-direction:column; align-items:flex-start; gap:10px; text-align:left; }
    .subject-icon { align-self:flex-start; }
    .modal { max-width:calc(100% - 20px); margin:10px auto; }
    .modal-header { padding:clamp(14px,3vw,16px) clamp(14px,2vw,16px); }
    .modal-body { padding:clamp(14px,3vw,20px); }
    .modal-footer { padding:clamp(12px,2vw,16px); }
    .form-group { margin-bottom:16px; }
    .form-input { padding:10px 12px; font-size:16px; }
    .form-textarea { min-height:100px; }
    .btn { padding:clamp(10px,2vw,12px) clamp(14px,3vw,16px); font-size:0.9rem; }
    .header-inner { padding:clamp(10px,2vw,12px); gap:clamp(8px,2vw,10px); }
    .nav-link { padding:10px 12px; min-width:auto; font-size:0.8rem; }
    .password-toggle { width:40px; height:40px; right:6px; }
    .search-bar { max-width:100%; }
    .breadcrumb { font-size:0.8rem; }
    .badge { padding:2px 8px; font-size:0.7rem; }
    .notes-row { flex-direction:column !important; align-items:flex-start !important; }
    .notes-header { display:none; }
    .notes-actions { width:100%; justify-content:flex-start; gap:6px; margin-top:8px; }
    .contact-grid { grid-template-columns:1fr; gap:20px; width:100%; box-sizing:border-box; }
    .contact-form-card { padding-bottom:24px !important; overflow:visible !important; height:auto !important; max-height:none !important; }
    .contact-form-card .btn { margin-top:16px; width:100% !important; box-sizing:border-box; }
    .contact-grid .card { overflow:visible !important; height:auto !important; max-height:none !important; }
    .contact-form-card .form-input, .contact-form-card textarea { width:100%; box-sizing:border-box; }
  }
  @media(max-width:375px) {
    .page { padding:12px; padding-bottom:32px; }
    .page-title { font-size:clamp(1.2rem,3vw,1.6rem); }
    .card { padding:12px; }
    .card-grid { gap:10px; }
    .big-card-icon { width:50px; height:50px; }
    .class-card-num { font-size:clamp(1.8rem,4vw,2.2rem); }
    .form-input { padding:10px 12px; font-size:16px; }
    .btn { padding:10px 12px; }
    .modal { margin:8px auto; }
    .contact-grid { grid-template-columns:1fr; gap:16px; width:100%; box-sizing:border-box; }
    .contact-form-card { overflow:visible !important; height:auto !important; max-height:none !important; padding-bottom:24px !important; }
    .contact-form-card .btn { width:100% !important; box-sizing:border-box; margin-top:16px; }
    .contact-grid .card { overflow:visible !important; height:auto !important; max-height:none !important; }
  }
  @media(max-width:320px) {
    .page { padding:10px; padding-bottom:32px; }
    .page-title { font-size:clamp(1.1rem,2vw,1.4rem); }
    .card { padding:10px; }
    .card-grid { gap:8px; }
    .big-card-title { font-size:clamp(1.1rem,2vw,1.3rem); }
    .class-card-num { font-size:clamp(1.6rem,3vw,2rem); }
    .form-input { padding:8px 10px; font-size:16px; }
    .btn { padding:8px 10px; font-size:0.85rem; }
    .modal { max-width:calc(100% - 10px); margin:5px auto; }
    .search-bar { padding:8px 12px; }
    .breadcrumb { font-size:0.75rem; }
    .contact-grid { grid-template-columns:1fr; gap:14px; width:100%; box-sizing:border-box; }
    .contact-form-card { overflow:visible !important; height:auto !important; max-height:none !important; padding-bottom:24px !important; }
    .contact-form-card .btn { width:100% !important; box-sizing:border-box; margin-top:14px; }
    .contact-grid .card { overflow:visible !important; height:auto !important; max-height:none !important; }
  }
  .notes-actions { display:flex; gap:6px; flex-wrap:wrap; }
  .contact-grid { display:grid; grid-template-columns:1fr 1fr; gap:clamp(16px,5vw,32px); width:100%; box-sizing:border-box; padding:0; align-items:start; }
  .contact-info { box-sizing:border-box; width:100%; }
  .contact-form-card { box-sizing:border-box; width:100%; display:flex; flex-direction:column; gap:16px; overflow:visible !important; height:auto !important; max-height:none !important; }
  .contact-form-card .form-group { width:100%; box-sizing:border-box; }
  .contact-form-card .form-group:last-child { margin-bottom:0; }
  .contact-form-card .btn { width:100% !important; box-sizing:border-box; justify-content:center; margin-top:12px; position:relative; z-index:1; display:flex; }
  .contact-form-card textarea.form-textarea { min-height:140px; width:100%; box-sizing:border-box; }
  .contact-form-card .form-input { width:100%; box-sizing:border-box; }
  .contact-grid .card { box-sizing:border-box; width:100%; overflow:visible !important; height:auto !important; max-height:none !important; }
  .table-responsive-wrapper { overflow-x:auto; }
  .admin-mobile-tabs { display:none; }
  .admin-mobile-tab { border:1px solid var(--card-border); background:var(--card); color:var(--text); padding:10px 14px; border-radius:14px; cursor:pointer; font-weight:600; white-space:nowrap; min-height:44px; transition:all 0.2s; }
  .admin-mobile-tab.active { background:var(--blue-light); color:var(--navy); border-color:var(--accent); }
  .admin-mobile-tab:hover { background:var(--bg3); }
  .admin-layout { display:flex; gap:20px; align-items:flex-start; }
  .admin-sidebar { flex-shrink:0; width:260px; min-width:220px; background:var(--card); border:1px solid var(--card-border); border-radius:var(--radius); overflow:hidden; }
  .admin-sidebar.collapsed { width:0; min-width:0; overflow:hidden; }
  .admin-main { flex:1; min-width:0; }
  .admin-topbar { display:flex; align-items:center; justify-content:space-between; gap:16px; flex-wrap:wrap; margin-bottom:24px; }
  .admin-topbar-left { display:flex; align-items:center; gap:12px; flex-wrap:wrap; }
  .admin-topbar-right { display:flex; align-items:center; gap:12px; flex-wrap:wrap; }
  .admin-panel-title { font-size:1.35rem; font-weight:700; margin:0; line-height:1.2; word-break:break-word; }
  .admin-panel-subtitle { color:var(--text2); font-size:0.95rem; margin:0; }
  .admin-card-grid { display:grid; gap:18px; grid-template-columns:repeat(auto-fit,minmax(min(100%,240px),1fr)); }
  .admin-stat-card { background:var(--card); border:1.5px solid var(--card-border); border-radius:var(--radius); padding:20px; display:flex; align-items:center; gap:14px; min-height:120px; transition:all 0.2s; }
  .admin-stat-icon { width:48px; height:48px; display:flex; align-items:center; justify-content:center; border-radius:14px; background:var(--bg3); flex-shrink:0; }
  .admin-stat-info { min-width:0; }
  .admin-stat-label { font-size:0.85rem; color:var(--text3); margin-bottom:6px; }
  .admin-stat-value { font-size:1.55rem; font-weight:700; line-height:1.1; }
  .admin-table-card { background:var(--card); border:1.5px solid var(--card-border); border-radius:var(--radius); overflow:hidden; }
  .admin-table-wrapper { width:100%; overflow-x:auto; }
  .admin-table { width:100%; border-collapse:collapse; min-width:0; table-layout:auto; }
  .admin-table th, .admin-table td { padding:14px 16px; border-bottom:1px solid var(--card-border); text-align:left; vertical-align:top; }
  .admin-table th { background:var(--bg3); font-weight:700; position:sticky; top:0; z-index:1; }
  .admin-table td { word-break:break-word; white-space:normal; }
  .admin-badge { display:inline-flex; align-items:center; padding:6px 10px; border-radius:999px; font-size:0.75rem; font-weight:700; background:var(--bg3); color:var(--text2); }
  .admin-action-group { display:flex; flex-wrap:wrap; gap:8px; align-items:center; justify-content:flex-end; }
  .admin-action-button { display:inline-flex; align-items:center; justify-content:center; gap:6px; padding:10px 14px; border-radius:12px; border:1px solid transparent; background:var(--bg3); color:var(--text); font-size:0.85rem; min-height:44px; cursor:pointer; transition:all 0.2s; white-space:nowrap; }
  .admin-action-button.primary { background:var(--accent); color:#fff; border-color:var(--accent); }
  .admin-action-button.danger { background:#fef2f2; color:#dc2626; border-color:#fecaca; }
  .admin-action-button.secondary { background:var(--bg3); color:var(--text); }
  .admin-action-button:disabled { opacity:0.6; cursor:not-allowed; }
  .admin-card { background:var(--card); border:1.5px solid var(--card-border); border-radius:var(--radius); padding:20px; box-shadow:var(--shadow-sm); display:flex; flex-direction:column; gap:16px; width:100%; box-sizing:border-box; }
  .admin-card-title { font-size:1.05rem; font-weight:700; margin:0; }
  .admin-card-meta { color:var(--text3); font-size:0.9rem; }
  .admin-card-body { display:flex; flex-direction:column; gap:16px; }
  .admin-card-row { display:grid; gap:14px; grid-template-columns:repeat(auto-fit,minmax(min(100%,180px),1fr)); }
  .admin-form-grid { display:grid; gap:16px; grid-template-columns:repeat(auto-fit,minmax(min(100%,220px),1fr)); }
  .admin-form-group { display:flex; flex-direction:column; gap:8px; }
  .admin-form-label { font-size:0.85rem; font-weight:600; color:var(--text2); }
  .admin-form-control { width:100%; padding:12px 14px; border:1.5px solid var(--card-border); border-radius:var(--radius-sm); background:var(--bg); color:var(--text); font-size:0.95rem; min-height:44px; box-sizing:border-box; }
  .admin-form-control:focus { border-color:var(--navy); box-shadow:0 0 0 3px rgba(30,58,110,0.12); outline:none; }
  .admin-form-textarea { min-height:120px; resize:vertical; }
  .admin-form-fullwidth { grid-column:1/-1; }
  .admin-search-row { display:grid; grid-template-columns:1fr auto; gap:12px; align-items:center; }
  .admin-filter-row { display:grid; grid-template-columns:repeat(auto-fit,minmax(min(100%,180px),1fr)); gap:12px; align-items:end; }
  .admin-sidebar-toggle { display:none; border:none; background:transparent; color:var(--text); font-size:1rem; cursor:pointer; padding:10px; }
  .admin-sidebar-inner { display:flex; flex-direction:column; min-height:100%; }
  .admin-sidebar-nav { display:flex; flex-direction:column; gap:6px; padding:16px; }
  .admin-sidebar-link { display:flex; align-items:center; gap:12px; padding:12px 16px; border-radius:12px; color:var(--text2); text-decoration:none; font-size:0.95rem; transition:all 0.2s; }
  .admin-sidebar-link.active { background:var(--blue-light); color:var(--navy); font-weight:700; }
  .admin-sidebar-link:hover { background:var(--bg3); color:var(--text); }
  .admin-page-content { width:100%; min-width:0; }
  .admin-breadcrumb { display:flex; flex-wrap:wrap; gap:8px; align-items:center; color:var(--text3); font-size:0.85rem; margin-bottom:16px; }
  .admin-breadcrumb span { display:inline-flex; align-items:center; gap:6px; }
  .admin-modal { max-width:100%; width:100%; }
  .admin-topbar-stats { display:flex; flex-wrap:wrap; gap:12px; align-items:center; }
  .admin-chip { display:inline-flex; align-items:center; gap:8px; padding:8px 12px; border-radius:999px; background:var(--bg3); color:var(--text2); font-size:0.85rem; }
  .admin-responsive-table { width:100%; overflow-x:auto; }
`;
const LOGO_IMG = "data:image/jpeg;base64,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1rnozv59Ma0EoTCUkkEiYkRIAJhAJECQJuqzS3d5t5tcc+Py+Ol55XRf70qPS6/MI9nwa6ms8/deUV49P0+AvefS68/6TOHhZ9dR9mNYNaACCQAQmAAgEwTBAABFhZZ386sa69QlEZIdkce7K/NssKuZu7zxVvza+gYZYX81U+9831ZUw2oAAAAAAAAAAAAAAAAAAAAAAAAAzj2dJWMYce2XmtdRtWcFp0ZY6NeoZS1zkTE7Oj1eV6y114ce+3y1r5bSuzZhn284mSRACQmEyAAQQlOw1xc22d/L3HoIw017OHz+V/SecpejanP3XPPaO2h4spjDdsy6MramuajO3Ld1epPpPPPQY387fYUKfdT4a859Lenus4eL1+4r+nLy82tZvngLQAAiYgAAAAII9V5Xfhr6zXs18XRR1vsK3qxoR04okLOsxzui1riw9B4uy59vSzq2c+nnqX3nnenGlG9AAAAAAAAAAAAAAAAAAAAAAAGUevpOdlGPFs8vNPvUm16MlZjMwym4vVw+t8Tho3avTa593Pz9nB1Z6dfl7Rrxx2d3PnMNKTIZL6c7UK+wKWLvIopv8onzz0/RV47d7XOlvK915NLcXborKWutfkqq0esoq221rVdXoeaY26/PxMZNm7bPVtTpSMcoLenuabHTGJa0w17lZm889hjpfUe26pfzlpYVJfd/g9mdvbZeassb7uG2zmPNcXsc9a+Hn2WjSnlHpdV488vsJikXSVKu5hRrGuvURMMcibL0Hirbi6Lec9OGldUem8/146fRed9RavmcPT+btGu0rcZjZptOKtur0XjLLHT0s6tnNr52n935nqxqhtQAAAAAAAAAAAAAAAAAAAAAX9XVdI4t3mttFrXEtunJVJmGRpTv9TzZ8PRs8P6rzGlei+ruKXqKejxic8WfRkzTekzEymYiJ9yUvl9d3Ph51p7ifDwe5nweqY+gaPBpe14/Kzet1X7LCyhj1KYprbiqT1FTV52jXnvz1z17M2lMcpxRMBETBbU9xU464xLbOIyxicYyiJxw2xE4WlZjlf0mig25338N12w8113XGmOuo4oet3eLVn3DxGylvYR5TKHqHmSfSx5n0dZ5fP8AoPO9OOcHTiCYw2RDfdebjDb1dZWduduD0VL3653tXZOLo8c36fS5MbKuiJ26LThpPb6DxtthrfThlz6+W4Pb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888848Qw88888wgwUYww8ccww8csM0MMsM8oAU888MMJseorVFr9TD75u+8gAknOc84g8888sc88w8sM84AQ0888wwwwwIM4wQwMc8MAEIc8wAw8408888MWasfmbrldK7sEE/3v6qVrhJazCGMMc8Qw88kM888w0888oAUww04wwEMc88888AAA40w888sI88oKzwshLnpTn8rx3/NZFg8KOffVxgB6bajI088888Iw8408s8Msc8w0scwAMM88E884kc44088gE888+7HaIXlTDjwjUuWayyqgNJDScQa040QSImMkM888888888888884s8o088gMw8888wAEMMc8sMsMQ8weVE1H8lwAPxpdtd1n1bq+F1X6so4vN0LCx0oJ1w88MMc8888488sAM8MYwM8wMMc884w88wwgMA0xsAWVRlSP4aNPJpatpxDymaEcdDXzOw0EXgWc2Ytj1Q8w0sAAww0888AAM8sAEIAI08w8wAwwAMMMIknDMwLO4luCZBdB+1tFhyKJisN/rXLqQo84H386WLTb19IAgAEMM8884w8MMcMw8ocwww0M88MAw4qIznl/OCH9qCPBhB1VNhxe31D6B5HvfLKIwc4Q/wC5xudh3EaQBDHPPPLHLHPPDCDBBOMNPPPNPCDCAG3+dRNQHKjbbvku0aTY376mIT+8YM4x9/6hOIMIO927ePOxQe1SMMNDHPDHPDPOMMNDPAFPPPPPPPIASQ4UDvB6mO/cWKkns5jpDbQMp7QRxyNFpgPMIDdU242faI17N31DHPMAABOMMMPPDPMNPMPLDAMMMCjDLlH3UxRa/Bz7+VbH9wsBITklITC/Gh/ZKMAF+/8A88U9gj4qbEIjsgSwwxzyxzzzgAAAQgDDSwgRwar6A0TkOI04zT01+JvaBR5p5mqoAXasnCgG0/AkDbDkkXivWzrjLrmpCBDAQzywzzzgAADDDDDzzjB/TPoa6dWoggciSIW71pf431SKie9vnnaYAJSuDJ27/JLl0gGyDyqJz8eLbjDSwzzzzDwwBTwxzzywhrmNoXulgX8rtRDBAr0NXSsqnFcdfKhH1yeQP/rJMscUzopT3yoCvfFMeEv28DDzzzziBADzwAzjDwAQtqk3jmXBmqpfGnYJjnkeY3MVMd9/ft+Y2MCNlc8W5HGIQ77yCXHmHozz4xISoTwxzwzz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";

// ─── TEACHER PHOTO ───────────────────────────────────────────────────────────
const TEACHER_PHOTO = "data:image/jpeg;base64,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";

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
function App() {
  const [splash, setSplash] = useState(true);
  const [splashOut, setSplashOut] = useState(false);
  const [dark, setDark] = useState(false);
  const [page, setPage] = useState("home");
  const [sidebar, setSidebar] = useState(false);
  const [modal, setModal] = useState(null); // 'login','signup','feedback','profile'
  const [profile, setProfile] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [nav, setNav] = useState([]); // breadcrumb stack
  const [searchQuery, setSearchQuery] = useState("");
  const [adminTab, setAdminTab] = useState("dashboard");

  // splash
  useEffect(() => {
    const t1 = setTimeout(() => setSplashOut(true), 2800);
    const t2 = setTimeout(() => setSplash(false), 3400);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const navigate = (p, label) => {
    setNav(prev => [...prev, { page, label }]);
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const goBack = () => {
    if (nav.length === 0) return;
    const prev = nav[nav.length - 1];
    setNav(n => n.slice(0, -1));
    setPage(prev.page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const goHome = () => { setNav([]); setPage("home"); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const navTo = (p) => { setNav([]); setPage(p); window.scrollTo({ top: 0, behavior: "smooth" }); };

  const toggleDark = () => setDark(d => !d);
  const [pageData, setPageData] = useState({});

  const openPage = (p, data = {}) => {
    setPageData(data);
    navigate(p, data.label || p);
  };

  return (
    <>
      <style>{globalCSS}</style>
      <div className={dark ? "dark" : ""} style={{ background: "var(--bg)", minHeight: "100vh" }}>
        {splash && <Splash out={splashOut} />}
        <Header dark={dark} toggleDark={toggleDark} setSidebar={setSidebar} setModal={setModal} loggedIn={loggedIn} setLoggedIn={setLoggedIn} isAdmin={isAdmin} navTo={navTo} page={page} profile={profile} setProfile={setProfile} />
        {sidebar && <Sidebar setSidebar={setSidebar} setModal={setModal} navTo={navTo} isAdmin={isAdmin} />}
        {modal && <Modal modal={modal} setModal={setModal} setLoggedIn={setLoggedIn} setIsAdmin={setIsAdmin} loggedIn={loggedIn} />}

        {page === "home" && <HomePage openPage={openPage} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />}
        {page === "school" && <SchoolPage openPage={openPage} nav={nav} goBack={goBack} goHome={goHome} />}
        {page === "college" && <CollegePage openPage={openPage} nav={nav} goBack={goBack} goHome={goHome} />}
        {page === "classes58" && <Classes58Page openPage={openPage} pageData={pageData} nav={nav} goBack={goBack} goHome={goHome} />}
        {page === "classes910" && <Classes910Page openPage={openPage} pageData={pageData} nav={nav} goBack={goBack} goHome={goHome} />}
        {page === "subjects" && <SubjectsPage openPage={openPage} pageData={pageData} nav={nav} goBack={goBack} goHome={goHome} />}
        {page === "subject_detail" && <SubjectDetailPage pageData={pageData} nav={nav} goBack={goBack} goHome={goHome} loggedIn={loggedIn} setModal={setModal} />}
        {page === "science" && <SciencePage openPage={openPage} nav={nav} goBack={goBack} goHome={goHome} />}
        {page === "commerce" && <CommercePage openPage={openPage} nav={nav} goBack={goBack} goHome={goHome} />}
        {page === "stream" && <StreamPage openPage={openPage} pageData={pageData} nav={nav} goBack={goBack} goHome={goHome} />}
        {page === "about" && <AboutPage nav={nav} goBack={goBack} goHome={goHome} />}
        {page === "contact" && <ContactPage nav={nav} goBack={goBack} goHome={goHome} />}
        {page === "admin" && isAdmin && <AdminPage adminTab={adminTab} setAdminTab={setAdminTab} nav={nav} goBack={goBack} goHome={goHome} />}
        <AppFooter />
      </div>
    </>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
const TEAM_MEMBERS = [
  { name: "Poorvika M J",       role: "Project Lead & Backend Developer",  link: "https://www.linkedin.com/in/poorvika-mj-aba066392?utm_source=share_via&utm_content=profile&utm_medium=member_android", type: "linkedin" },
  { name: "Poorvi V Bharadwaj", role: "Frontend & UI Developer",           link: "https://www.linkedin.com/in/poorvi-v-bharadwaj-603837391?utm_source=share_via&utm_content=profile&utm_medium=member_android", type: "linkedin" },
  { name: "Keerthana D",        role: "Database & Cloud Engineer",          link: "https://www.linkedin.com/in/keerthana-d-653313398",  type: "linkedin" },
  { name: "Pawan Kumar G",      role: "Resource Management Coordinator",   link: "https://www.linkedin.com/in/pawan-kumar-g-54530134b", type: "linkedin" },
];

function AppFooter() {
  const [showTeam, setShowTeam] = useState(false);

  const openModal  = () => setShowTeam(true);
  const closeModal = () => setShowTeam(false);

  // ESC key closes modal
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") closeModal(); };
    if (showTeam) document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [showTeam]);

  const footerCSS = `
    .jcrl-footer {
      background: linear-gradient(135deg, #0f172a 0%, #1e3a6e 60%, #1D4ED8 100%);
      color: white;
      padding: 20px 24px;
      text-align: center;
      font-family: 'Plus Jakarta Sans', sans-serif;
      border-top: 1px solid rgba(59,130,246,0.3);
      position: relative;
      overflow: hidden;
    }
    .jcrl-footer::before {
      content:'';
      position:absolute;
      top:0;left:0;right:0;bottom:0;
      background: radial-gradient(ellipse at 50% 0%, rgba(59,130,246,0.15) 0%, transparent 70%);
      pointer-events:none;
    }
    .jcrl-footer-text {
      font-size: 0.88rem;
      font-weight: 500;
      color: rgba(255,255,255,0.85);
      letter-spacing: 0.02em;
      position: relative;
    }
    .jcrl-team-btn {
      background: none;
      border: none;
      color: #60a5fa;
      font-weight: 700;
      font-size: 0.88rem;
      cursor: pointer;
      padding: 0;
      text-decoration: underline;
      text-underline-offset: 3px;
      transition: color 0.2s, text-shadow 0.2s;
      font-family: inherit;
    }
    .jcrl-team-btn:hover {
      color: #93c5fd;
      text-shadow: 0 0 12px rgba(96,165,250,0.7);
    }
    .team-overlay {
      position: fixed;
      inset: 0;
      background: rgba(2, 6, 23, 0.75);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      z-index: 9998;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      animation: teamOverlayIn 0.25s ease;
      overflow: auto;
      -webkit-user-select: none;
      user-select: none;
    }
    @keyframes teamOverlayIn {
      from { opacity:0; }
      to   { opacity:1; }
    }
    .team-modal {
      background: rgba(15, 23, 42, 0.92);
      border: 1px solid rgba(59,130,246,0.35);
      border-radius: 20px;
      padding: 36px 32px 32px;
      max-width: 680px;
      width: 100%;
      box-shadow: 0 24px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(59,130,246,0.15), inset 0 1px 0 rgba(255,255,255,0.06);
      position: relative;
      animation: teamModalIn 0.3s cubic-bezier(0.34,1.56,0.64,1);
      z-index: 10000;
      max-height: 90vh;
      overflow-y: auto;
      pointer-events: auto;
    }
    @keyframes teamModalIn {
      from { opacity:0; transform: scale(0.88); }
      to   { opacity:1; transform: scale(1); }
    }
    .team-modal-header {
      text-align: center;
      margin-bottom: 28px;
    }
    .team-modal-title {
      font-size: 1.55rem;
      font-weight: 800;
      background: linear-gradient(135deg, #60a5fa, #93c5fd, #3b82f6);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 6px;
      letter-spacing: -0.02em;
    }
    .team-modal-sub {
      color: rgba(148,163,184,0.9);
      font-size: 0.85rem;
      font-weight: 400;
    }
    .team-close-btn {
      position: absolute;
      top: 12px;
      right: 12px;
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: rgba(59,130,246,0.12);
      border: 1px solid rgba(59,130,246,0.25);
      color: rgba(148,163,184,0.9);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.2s;
      font-size: 1.1rem;
      line-height: 1;
      z-index: 10001;
      padding: 0;
      min-width: 44px;
      min-height: 44px;
    }
    .team-close-btn:hover {
      background: rgba(59,130,246,0.25);
      color: white;
      transform: rotate(90deg);
    }
    .team-close-btn:focus {
      outline: 2px solid #3b82f6;
      outline-offset: 2px;
    }
    .team-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
    }
    @media (max-width: 768px) {
      .team-grid { grid-template-columns: 1fr; }
      .team-modal { padding: 28px 20px 24px; }
      .team-modal-title { font-size: 1.35rem; }
      .team-close-btn { width: 40px; height: 40px; }
    }
    @media (max-width: 480px) {
      .team-modal { padding: 24px 16px 20px; margin: 12px; }
      .team-modal-title { font-size: 1.15rem; }
      .team-close-btn { width: 36px; height: 36px; top: 8px; right: 8px; font-size: 0.95rem; }
    }
    .team-card {
      background: rgba(30, 58, 110, 0.45);
      border: 1px solid rgba(59,130,246,0.2);
      border-radius: 16px;
      padding: 22px 18px 18px;
      text-align: center;
      transition: all 0.25s;
      backdrop-filter: blur(6px);
    }
    .team-card:hover {
      border-color: rgba(59,130,246,0.55);
      background: rgba(30, 58, 110, 0.65);
      transform: translateY(-3px);
      box-shadow: 0 8px 28px rgba(37,99,235,0.25);
    }
    .team-avatar {
      width: 72px;
      height: 72px;
      border-radius: 50%;
      background: linear-gradient(135deg, #1D4ED8, #2563EB, #3B82F6);
      border: 3px solid rgba(59,130,246,0.45);
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 14px;
      font-size: 1.6rem;
      font-weight: 800;
      color: white;
      box-shadow: 0 4px 16px rgba(37,99,235,0.4);
    }
    .team-name {
      font-weight: 700;
      font-size: 0.95rem;
      color: white;
      margin-bottom: 4px;
      letter-spacing: -0.01em;
    }
    .team-role {
      font-size: 0.75rem;
      color: rgba(148,163,184,0.85);
      margin-bottom: 14px;
      line-height: 1.4;
    }
    .team-linkedin-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: rgba(37,99,235,0.2);
      border: 1px solid rgba(59,130,246,0.35);
      color: #60a5fa;
      font-size: 0.78rem;
      font-weight: 600;
      padding: 7px 14px;
      border-radius: 8px;
      text-decoration: none;
      transition: all 0.2s;
      font-family: 'Plus Jakarta Sans', sans-serif;
    }
    .team-linkedin-btn:hover {
      background: rgba(37,99,235,0.4);
      border-color: #3b82f6;
      color: white;
      box-shadow: 0 0 16px rgba(59,130,246,0.4);
    }
  `;

  return (
    <>
      <style>{footerCSS}</style>
      <footer className="jcrl-footer">
        <div className="jcrl-footer-text">
          © 2026 JC Resource Lab &nbsp;|&nbsp;{" "}
          <button className="jcrl-team-btn" onClick={openModal} aria-label="Meet Team Udbhav">
            Team Udbhav
          </button>
        </div>
      </footer>

      {showTeam && (
        <div className="team-overlay" role="dialog" aria-modal="true" aria-label="Team Udbhav" onClick={closeModal}>
          <div className="team-modal" onClick={e => e.stopPropagation()}>
            <button className="team-close-btn" onClick={closeModal} aria-label="Close modal">✕</button>
            <div className="team-modal-header">
              <div className="team-modal-title">✦ Team Udbhav</div>
              <div className="team-modal-sub">The minds behind JC Resource Lab</div>
            </div>
            <div className="team-grid">
              {TEAM_MEMBERS.map((member, i) => (
                <div key={i} className="team-card">
                  <div className="team-avatar">{member.name.charAt(0)}</div>
                  <div className="team-name">{member.name}</div>
                  <div className="team-role">{member.role}</div>
                  {member.type === "github" ? (
                    <a href={member.link} target="_blank" rel="noopener noreferrer" className="team-linkedin-btn" style={{borderColor:"rgba(110,118,129,0.4)",color:"#c9d1d9",background:"rgba(22,27,34,0.6)"}}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
                      GitHub
                    </a>
                  ) : (
                    <a href={member.link} target="_blank" rel="noopener noreferrer" className="team-linkedin-btn">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
                      LinkedIn
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ─── SPLASH ───────────────────────────────────────────────────────────────────
function Splash({ out }) {
  return (
    <div className={`splash ${out ? "splash-out" : ""}`}>
      <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
        <img src={LOGO_IMG} alt="JC Resource Lab" style={{width:160,height:160,objectFit:"contain",animation:"splashPop 0.8s cubic-bezier(0.34,1.56,0.64,1) 0.3s both",background:"transparent"}}/>
      </div>
      <div className="splash-title">JC Resource Lab</div>
      <div className="splash-sub">Knowledge · Excellence · Growth</div>
      <div className="splash-dots">
        <div className="splash-dot"/>
        <div className="splash-dot"/>
        <div className="splash-dot"/>
      </div>
    </div>
  );
}

// ─── HEADER ───────────────────────────────────────────────────────────────────
function Header({ dark, toggleDark, setSidebar, setModal, loggedIn, setLoggedIn, isAdmin, navTo, page, profile, setProfile }) {
  const ref = useRef(null);
  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setProfile(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <>
      <header className="header">
        <div className="header-inner">
          <button className="btn btn-ghost btn-icon" onClick={() => setSidebar(true)} title="Menu">
            <Icon name="menu" size={22}/>
          </button>
          <a className="header-brand" onClick={() => navTo("home")} style={{cursor:"pointer"}}>
            <div className="header-logo">
              <img src={LOGO_IMG} alt="JC Resource Lab" style={{width:44,height:44,objectFit:"contain"}}/>
            </div>
            <div>
              <div className="header-name">JC Resource Lab</div>
              <div className="header-tagline">Knowledge · Excellence · Growth</div>
            </div>
          </a>
          <div className="header-actions">
            <button className="btn btn-ghost btn-icon" onClick={toggleDark} title={dark?"Light Mode":"Dark Mode"}>
              <Icon name={dark?"sun":"moon"} size={20}/>
            </button>
            <div style={{position:"relative"}} ref={ref}>
              <button className="btn btn-ghost btn-icon" onClick={() => setProfile(p => !p)} title="Profile">
                <Icon name="user" size={20}/>
              </button>
              {profile && (
                <div className="profile-dropdown">
                  <div className="profile-header">
                    <div className="profile-avatar">JC</div>
                    <div className="profile-info">
                      <div className="profile-name">{loggedIn ? (isAdmin ? "Admin User" : "Student") : "Guest User"}</div>
                      <div style={{fontSize:"0.8rem",color:"var(--text3)",marginTop:"2px"}}>{loggedIn ? "jcresourcelab@edu.in" : "Not signed in"}</div>
                    </div>
                  </div>
                  {loggedIn ? (
                    <>
                      <div className="profile-row"><Icon name="mail" size={15}/> jcresourcelab@edu.in</div>
                      <div style={{padding:"12px 20px"}}>
                        <button className="btn btn-secondary btn-sm" style={{width:"100%"}} onClick={() => { authAPI.logout(); setLoggedIn(false); setIsAdmin(false); setProfile(false); }}>Sign Out</button>
                      </div>
                    </>
                  ) : (
                    <div style={{padding:"16px 20px",display:"flex",gap:"10px"}}>
                      <button className="btn btn-primary btn-sm" style={{flex:1}} onClick={() => { setModal("login"); setProfile(false); }}>Log In</button>
                      <button className="btn btn-secondary btn-sm" style={{flex:1}} onClick={() => { setModal("signup"); setProfile(false); }}>Sign Up</button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
      <nav className="navbar">
        <div className="navbar-inner">
          <button className={`nav-link ${page==="home"?"active":""}`} onClick={() => navTo("home")}><Icon name="home" size={15}/>Home</button>
          <button className={`nav-link ${page==="school"||page==="classes58"||page==="classes910"?"active":""}`} onClick={() => navTo("school")}><Icon name="school" size={15}/>School</button>
          <button className={`nav-link ${page==="college"||page==="science"||page==="commerce"?"active":""}`} onClick={() => navTo("college")}><Icon name="college" size={15}/>College</button>
          <button className={`nav-link ${page==="about"?"active":""}`} onClick={() => navTo("about")}>About Us</button>
          <button className={`nav-link ${page==="contact"?"active":""}`} onClick={() => navTo("contact")}>Contact</button>
          {!loggedIn ? (
            <button className="nav-link" onClick={() => setModal("login")}>Login / Sign Up</button>
          ) : isAdmin ? (
            <button className={`nav-link ${page==="admin"?"active":""}`} onClick={() => navTo("admin")}><Icon name="shield" size={15}/>Admin</button>
          ) : null}
        </div>
      </nav>
    </>
  );
}

// ─── SIDEBAR ──────────────────────────────────────────────────────────────────
function Sidebar({ setSidebar, setModal, navTo, isAdmin }) {
  return (
    <>
      <div className="sidebar-overlay" onClick={() => setSidebar(false)}/>
      <div className="sidebar">
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <div style={{width:40,height:40,display:"flex",alignItems:"center",justifyContent:"center"}}>
              <img src={LOGO_IMG} alt="JC Resource Lab" style={{width:40,height:40,objectFit:"contain"}}/>
            </div>
            <span style={{fontWeight:700,fontSize:"0.95rem"}}>JC Resource Lab</span>
          </div>
          <button className="btn btn-ghost btn-icon" onClick={() => setSidebar(false)}><Icon name="close" size={20}/></button>
        </div>
        <div className="sidebar-nav">
          <p style={{fontSize:"0.7rem",fontWeight:700,color:"var(--text3)",letterSpacing:"0.1em",textTransform:"uppercase",padding:"8px 16px 12px"}}>Navigation</p>
          {[
            { icon:"home", label:"Home", page:"home" },
            { icon:"school", label:"School", page:"school" },
            { icon:"college", label:"College", page:"college" },
            { icon:"book", label:"About Us", page:"about" },
            { icon:"mail", label:"Contact", page:"contact" },
          ].map(item => (
            <div key={item.page} className="sidebar-item" onClick={() => { navTo(item.page); setSidebar(false); }}>
              <Icon name={item.icon} size={18}/> {item.label}
            </div>
          ))}
          <p style={{fontSize:"0.7rem",fontWeight:700,color:"var(--text3)",letterSpacing:"0.1em",textTransform:"uppercase",padding:"16px 16px 12px"}}>More</p>
          <div className="sidebar-item" onClick={() => { setModal("feedback"); setSidebar(false); }}>
            <Icon name="message" size={18}/> Feedback Form
          </div>
          <div className="sidebar-item" onClick={() => { setModal("admin_login"); setSidebar(false); }}>
            <Icon name="shield" size={18}/> Admin Login
          </div>
        </div>
      </div>
    </>
  );
}

// ─── MODAL ────────────────────────────────────────────────────────────────────
function Modal({ modal, setModal, setLoggedIn, setIsAdmin, loggedIn }) {
  const [tab, setTab] = useState(modal === "signup" ? "signup" : "login");
  const [form, setForm] = useState({ email:"", password:"", confirmPassword:"", name:"", phone:"", feedback:"", rating:5 });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const close = () => { setModal(null); setSubmitted(false); setError(""); setSuccess(""); };

  useEffect(() => { setTab(modal === "signup" ? "signup" : "login"); setError(""); }, [modal]);

  const [loading, setLoading] = useState(false);

  const handleLogin = async (admin = false) => {
    if (!form.email || !form.password) { setError("Please fill all fields"); return; }
    setLoading(true); setError("");
    try {
      const d = await authAPI.login(form.email, form.password);
      const isAdminUser = d.user && d.user.role === "admin";
      setLoggedIn(true); setIsAdmin(isAdminUser); close();
      // Notify lecturer via email
      const subject = encodeURIComponent("JC Resource Lab - User Login");
      const body = encodeURIComponent(
        "A student just logged in to JC Resource Lab.\n\n" +
        "Name: " + (d.user.name || "N/A") + "\n" +
        "Email: " + d.user.email + "\n" +
        "Phone: " + (d.user.phone || "N/A") + "\n" +
        "Time: " + new Date().toLocaleString("en-IN")
      );
      window.open(`mailto:${LECTURER_EMAIL}?subject=${subject}&body=${body}`, "_blank");
    } catch(e) {
      setError(e.message || "Login failed. Please check your credentials.");
    } finally { setLoading(false); }
  };

  const handleSignup = async () => {
    if (!form.name || !form.email || !form.password || !form.confirmPassword) { setError("Please fill all fields"); return; }
    if (form.password !== form.confirmPassword) { setError("Passwords do not match"); return; }
    if (form.password.length < 6) { setError("Password must be at least 6 characters"); return; }
    setLoading(true); setError("");
    try {
      const d = await authAPI.signup(form.name, form.email, form.password, form.phone);
      setLoggedIn(true); setIsAdmin(false); close();
      // Notify lecturer via email
      const subject = encodeURIComponent("JC Resource Lab - New Student Registration");
      const body = encodeURIComponent(
        "A new student has registered on JC Resource Lab.\n\n" +
        "Name: " + form.name + "\n" +
        "Email: " + form.email + "\n" +
        "Phone: " + (form.phone || "N/A") + "\n" +
        "Time: " + new Date().toLocaleString("en-IN")
      );
      window.open(`mailto:${LECTURER_EMAIL}?subject=${subject}&body=${body}`, "_blank");
    } catch(e) {
      setError(e.message || "Signup failed. Please try again.");
    } finally { setLoading(false); }
  };

  const handleFeedback = () => { if (!form.feedback) { setError("Please write your feedback"); return; } setSubmitted(true); };

  const isAuthModal = modal === "login" || modal === "signup";

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && close()}>
      <div className="modal">
        <div className="modal-header">
          <h2 style={{fontSize:"1.3rem",fontWeight:700}}>
            {modal === "admin_login" ? "Admin Login" : modal === "feedback" ? "Share Feedback" : "Welcome to JC Resource Lab"}
          </h2>
          <button className="btn btn-ghost btn-icon" onClick={close}><Icon name="close" size={20}/></button>
        </div>

        {/* Login / Signup Tabs */}
        {isAuthModal && (
          <div style={{display:"flex",borderBottom:"2px solid var(--card-border)",padding:"0 24px"}}>
            <button onClick={() => { setTab("login"); setError(""); }} style={{flex:1,padding:"12px 0",fontWeight:700,fontSize:"0.95rem",border:"none",background:"transparent",cursor:"pointer",borderBottom:`3px solid ${tab==="login"?"var(--navy)":"transparent"}`,color:tab==="login"?"var(--navy)":"var(--text3)",transition:"all 0.2s"}}>
              Log In
            </button>
            <button onClick={() => { setTab("signup"); setError(""); }} style={{flex:1,padding:"12px 0",fontWeight:700,fontSize:"0.95rem",border:"none",background:"transparent",cursor:"pointer",borderBottom:`3px solid ${tab==="signup"?"var(--accent)":"transparent"}`,color:tab==="signup"?"var(--accent)":"var(--text3)",transition:"all 0.2s"}}>
              Sign Up
            </button>
          </div>
        )}

        <div className="modal-body">
          {submitted ? (
            <div style={{textAlign:"center",padding:"20px 0"}}>
              <div style={{width:64,height:64,background:"var(--green-light)",borderRadius:16,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 16px"}}>
                <Icon name="check" size={32} style={{color:"var(--green)"}}/>
              </div>
              <p style={{fontWeight:700,fontSize:"1.1rem",marginBottom:8}}>Thank you!</p>
              <p style={{color:"var(--text2)",fontSize:"0.9rem"}}>Your feedback has been submitted successfully.</p>
            </div>
          ) : (
            <>
              {error && <div style={{background:"#fef2f2",color:"#dc2626",padding:"10px 14px",borderRadius:8,marginBottom:16,fontSize:"0.85rem",fontWeight:600,display:"flex",alignItems:"center",gap:8}}><span>⚠</span>{error}</div>}

              {/* LOGIN FORM */}
              {isAuthModal && tab === "login" && (
                <div>
                  <p style={{color:"var(--text2)",fontSize:"0.875rem",marginBottom:20}}>Welcome back! Enter your credentials to access your account.</p>
                  <div className="form-group">
                    <label className="form-label">Email Address</label>
                    <input className="form-input" type="email" placeholder="Enter your email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/>
                  </div>
                  <PasswordInput
                    label="Password"
                    name="loginPassword"
                    value={form.password}
                    placeholder="Enter your password"
                    onChange={e=>setForm({...form,password:e.target.value})}
                  />
                  <div style={{textAlign:"right",marginBottom:16}}>
                    <span style={{fontSize:"0.82rem",color:"var(--navy)",cursor:"pointer",fontWeight:600}}>Forgot password?</span>
                  </div>
                  <button className="btn btn-primary" style={{width:"100%",justifyContent:"center",padding:"12px"}} onClick={() => handleLogin()} disabled={loading}>
                    <Icon name="user" size={16}/> {loading ? "Logging in..." : "Log In"}
                  </button>
                  <p style={{textAlign:"center",marginTop:16,fontSize:"0.85rem",color:"var(--text3)"}}>
                    Don't have an account?{" "}
                    <span style={{color:"var(--accent)",fontWeight:700,cursor:"pointer"}} onClick={() => setTab("signup")}>Sign Up free</span>
                  </p>
                </div>
              )}

              {/* SIGNUP FORM */}
              {isAuthModal && tab === "signup" && (
                <div>
                  <p style={{color:"var(--text2)",fontSize:"0.875rem",marginBottom:20}}>Create your free account to access all study materials.</p>
                  <div className="form-group">
                    <label className="form-label">Full Name *</label>
                    <input className="form-input" placeholder="Enter your full name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email Address *</label>
                    <input className="form-input" type="email" placeholder="Enter your email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Phone Number</label>
                    <input className="form-input" type="tel" placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})}/>
                  </div>
                  <div className="form-grid">
                    <PasswordInput
                      label="Password *"
                      name="signupPassword"
                      value={form.password}
                      placeholder="Min. 6 characters"
                      onChange={e=>setForm({...form,password:e.target.value})}
                    />
                    <PasswordInput
                      label="Confirm Password *"
                      name="signupConfirmPassword"
                      value={form.confirmPassword}
                      placeholder="Re-enter password"
                      onChange={e=>setForm({...form,confirmPassword:e.target.value})}
                    />
                  </div>
                  <div style={{background:"var(--bg3)",borderRadius:8,padding:"10px 14px",margin:"16px 0",fontSize:"0.8rem",color:"var(--text2)"}}>
                    🔒 Your data is safe. We never share your information.
                  </div>
                  <button className="btn btn-primary" style={{width:"100%",justifyContent:"center",padding:"12px",background:"linear-gradient(135deg,var(--accent),#a07d1c)",color:"#fff",border:"none"}} onClick={handleSignup} disabled={loading}>
                    <Icon name="check" size={16}/> {loading ? "Creating account..." : "Create Account"}
                  </button>
                  <p style={{textAlign:"center",marginTop:16,fontSize:"0.85rem",color:"var(--text3)"}}>
                    Already have an account?{" "}
                    <span style={{color:"var(--navy)",fontWeight:700,cursor:"pointer"}} onClick={() => setTab("login")}>Log In</span>
                  </p>
                </div>
              )}

              {/* ADMIN LOGIN */}
              {modal === "admin_login" && (
                <>
                  <div style={{background:"var(--blue-light)",border:"1px solid var(--navy)",borderRadius:8,padding:"10px 14px",marginBottom:16,fontSize:"0.82rem",color:"var(--navy)",fontWeight:600}}>
                    🔐 Admin access only. Demo: admin@jcrl.com / admin123
                  </div>
                  <div className="form-group">
                    <label className="form-label">Admin Email</label>
                    <input className="form-input" type="email" placeholder="admin@jcrl.com" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/>
                  </div>
                  <PasswordInput
                    label="Password"
                    name="adminPassword"
                    value={form.password}
                    placeholder="admin123"
                    onChange={e=>setForm({...form,password:e.target.value})}
                  />
                </>
              )}

              {/* FEEDBACK */}
              {modal === "feedback" && (
                <>
                  <div className="form-group">
                    <label className="form-label">Your Name (optional)</label>
                    <input className="form-input" placeholder="Enter your name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Rating</label>
                    <div style={{display:"flex",gap:8}}>
                      {[1,2,3,4,5].map(n => (
                        <button key={n} onClick={() => setForm({...form,rating:n})} style={{width:40,height:40,borderRadius:10,border:`2px solid ${form.rating>=n?"var(--accent)":"var(--card-border)"}`,background:form.rating>=n?"var(--accent-light)":"var(--card)",cursor:"pointer",color:form.rating>=n?"var(--accent)":"var(--text3)",fontWeight:700}}>{n}</button>
                      ))}
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Your Feedback</label>
                    <textarea className="form-input form-textarea" placeholder="Share your thoughts about JC Resource Lab..." value={form.feedback} onChange={e=>setForm({...form,feedback:e.target.value})}/>
                  </div>
                </>
              )}
            </>
          )}
        </div>

        {!submitted && !isAuthModal && (
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={close}>Cancel</button>
            {modal === "admin_login" && <button className="btn btn-primary" onClick={() => handleLogin()} disabled={loading}><Icon name="shield" size={16}/>{loading ? "Logging in..." : "Admin Login"}</button>}
            {modal === "feedback" && <button className="btn btn-primary" onClick={handleFeedback}><Icon name="check" size={16}/>Submit</button>}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── BACK BUTTON + BREADCRUMB ─────────────────────────────────────────────────
function BackBar({ nav, goBack, goHome }) {
  return (
    <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:24,flexWrap:"wrap"}}>
      {nav.length > 0 && (
        <button className="btn btn-secondary btn-sm" onClick={goBack}><Icon name="back" size={15}/>Back</button>
      )}
      <div className="breadcrumb">
        <span className="breadcrumb-item" onClick={goHome}><Icon name="home" size={13}/> Home</span>
        {nav.map((item, i) => (
          <span key={i} style={{display:"flex",alignItems:"center",gap:8}}>
            <span className="breadcrumb-sep">›</span>
            <span className="breadcrumb-item" onClick={() => { /* simplified */ goBack(); }}>{item.label}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── HOME PAGE ────────────────────────────────────────────────────────────────
function HomePage({ openPage, searchQuery, setSearchQuery }) {
  return (
    <div className="page">
      {/* Hero */}
      <div className="hero-banner">
        <div className="hero-content" style={{textAlign:"center",display:"flex",flexDirection:"column",alignItems:"center"}}>
          <div style={{marginBottom:20}}>
            <img src={LOGO_IMG} alt="JC Resource Lab" style={{width:100,height:100,objectFit:"contain",filter:"drop-shadow(0 4px 16px rgba(201,162,39,0.4))"}}/>
          </div>
          <div className="hero-title" style={{textAlign:"center"}}>Your complete<br/><span>learning resource</span><br/>hub</div>
          <div className="hero-sub" style={{textAlign:"center",margin:"0 auto"}}>Access notes, papers, modules, and video lectures for School and College — all in one place.</div>
          <div className="hero-stats" style={{justifyContent:"center"}}>
            <div style={{textAlign:"center"}}><div className="hero-stat-num">500+</div><div className="hero-stat-label">Study Materials</div></div>
            <div style={{textAlign:"center"}}><div className="hero-stat-num">20+</div><div className="hero-stat-label">Subjects</div></div>
            <div style={{textAlign:"center"}}><div className="hero-stat-num">1000+</div><div className="hero-stat-label">Students</div></div>
            <div style={{textAlign:"center"}}><div className="hero-stat-num">5★</div><div className="hero-stat-label">Rated</div></div>
          </div>
        </div>
      </div>

      {/* Main Cards */}
      <div className="page-header">
        <div className="page-title">Choose Your Section</div>
        <div className="page-subtitle">Select the category that best matches your level of study</div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:24,marginBottom:48}}>
        <div className="big-card" onClick={() => openPage("school",{label:"School"})}>
          <div className="big-card-icon" style={{background:"linear-gradient(135deg,#eff4ff,#dbeafe)"}}>
            <Icon name="school" size={40} style={{color:"var(--blue)"}}/>
          </div>
          <div className="big-card-title" style={{color:"var(--blue)"}}>School</div>
          <div className="big-card-desc">Classes 5th to 10th · State Board & CBSE · Complete study materials with notes, papers & video lessons</div>
          <div style={{marginTop:20,display:"flex",gap:8,flexWrap:"wrap",justifyContent:"center"}}>
            <span className="badge badge-blue">Classes 5–8</span>
            <span className="badge badge-blue">9th & 10th</span>
            <span className="badge badge-blue">State & CBSE</span>
          </div>
        </div>
        <div className="big-card" onClick={() => openPage("college",{label:"College"})}>
          <div className="big-card-icon" style={{background:"linear-gradient(135deg,#f5f3ff,#ede9fe)"}}>
            <Icon name="college" size={40} style={{color:"var(--purple)"}}/>
          </div>
          <div className="big-card-title" style={{color:"var(--purple)"}}>College</div>
          <div className="big-card-desc">Science & Commerce streams · PCMB, PCMC, PCME · CEBA, SEBA, MEBA — comprehensive resources</div>
          <div style={{marginTop:20,display:"flex",gap:8,flexWrap:"wrap",justifyContent:"center"}}>
            <span className="badge badge-purple">Science</span>
            <span className="badge badge-purple">Commerce</span>
            <span className="badge badge-purple">All Streams</span>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="page-header">
        <div className="page-title">What's Available</div>
      </div>
      <div className="card-grid card-grid-3">
        {[
          { icon:"book", color:"#6366f1", bg:"#f5f3ff", title:"Detailed Notes", desc:"Chapter-wise notes crafted by expert teachers for all subjects" },
          { icon:"file", color:"#f59e0b", bg:"#fffbeb", title:"Previous Papers", desc:"Year-wise question papers with answers for exam preparation" },
          { icon:"layers", color:"#10b981", bg:"#f0fdf4", title:"Practice Papers", desc:"Topic-wise practice sets to strengthen your understanding" },
          { icon:"award", color:"#ec4899", bg:"#fdf2f8", title:"Passing Package", desc:"Curated content focused on scoring high marks in exams" },
          { icon:"star", color:"#8b5cf6", bg:"#f5f3ff", title:"Lessons & Modules", desc:"Structured modules for systematic and thorough learning" },
          { icon:"video", color:"#ef4444", bg:"#fef2f2", title:"Video Lectures", desc:"Embedded YouTube lessons explained in simple, clear language" },
        ].map((f,i) => (
          <div key={i} className="card" style={{animationDelay:`${i*0.05}s`}}>
            <div style={{width:48,height:48,borderRadius:12,background:f.bg,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:16}}>
              <Icon name={f.icon} size={24} style={{color:f.color}}/>
            </div>
            <div style={{fontWeight:700,marginBottom:6}}>{f.title}</div>
            <div style={{color:"var(--text2)",fontSize:"0.875rem",lineHeight:1.6}}>{f.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── SCHOOL PAGE ──────────────────────────────────────────────────────────────
function SchoolPage({ openPage, nav, goBack, goHome }) {
  return (
    <div className="page">
      <BackBar nav={nav} goBack={goBack} goHome={goHome}/>
      <div className="page-header">
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:8}}>
          <div style={{width:48,height:48,background:"var(--blue-light)",borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center"}}>
            <Icon name="school" size={26} style={{color:"var(--blue)"}}/>
          </div>
          <div className="page-title">School</div>
        </div>
        <div className="page-subtitle">Select your class to access study materials, notes, and exam resources</div>
      </div>

      <div style={{marginBottom:32}}>
        <h3 style={{fontWeight:700,marginBottom:16,color:"var(--text2)",fontSize:"0.9rem",textTransform:"uppercase",letterSpacing:"0.08em"}}>Classes 5 – 8 (State Syllabus)</h3>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(140px,1fr))",gap:16}}>
          {["5th","6th","7th","8th"].map((cls,i) => (
            <div key={cls} className="class-card" onClick={() => openPage("classes58",{cls,label:`Class ${cls}`})} style={{animationDelay:`${i*0.05}s`}}>
              <div className="class-card-num">{cls}</div>
              <div className="class-card-label">State Syllabus</div>
              <div style={{marginTop:12,display:"flex",gap:4,flexWrap:"wrap",justifyContent:"center"}}>
                <span className="badge badge-blue" style={{fontSize:"0.7rem"}}>8 Subjects</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 style={{fontWeight:700,marginBottom:16,color:"var(--text2)",fontSize:"0.9rem",textTransform:"uppercase",letterSpacing:"0.08em"}}>Classes 9 – 10 (State & CBSE)</h3>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(140px,1fr))",gap:16}}>
          {["9th","10th"].map((cls,i) => (
            <div key={cls} className="class-card" onClick={() => openPage("classes910",{cls,label:`Class ${cls}`})} style={{animationDelay:`${i*0.05+0.2}s`}}>
              <div className="class-card-num">{cls}</div>
              <div className="class-card-label">State & CBSE</div>
              <div style={{marginTop:12,display:"flex",gap:4,flexWrap:"wrap",justifyContent:"center"}}>
                <span className="badge badge-blue" style={{fontSize:"0.7rem"}}>2 Boards</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── CLASSES 5–8 ──────────────────────────────────────────────────────────────
function Classes58Page({ openPage, pageData, nav, goBack, goHome }) {
  const colors = ["#6366f1","#f59e0b","#10b981","#ec4899","#8b5cf6","#3b6ee8","#ef4444","#d97706"];
  return (
    <div className="page">
      <BackBar nav={nav} goBack={goBack} goHome={goHome}/>
      <div className="page-header">
        <div className="page-title">Class {pageData.cls} — State Syllabus</div>
        <div className="page-subtitle">Select a subject to view all available study materials</div>
      </div>
      <div className="card-grid card-grid-2">
        {SCHOOL_SUBJECTS_5_8.map((subj,i) => (
          <div key={subj} className="subject-card" onClick={() => openPage("subject_detail",{subject:subj,cls:pageData.cls,board:"State",label:subj})} style={{animationDelay:`${i*0.04}s`}}>
            <div className="subject-icon" style={{background:`${colors[i]}20`}}>
              <Icon name="book" size={22} style={{color:colors[i]}}/>
            </div>
            <div>
              <div className="subject-name">{subj}</div>
              <div className="subject-count">Notes · Papers · Videos · More</div>
            </div>
            <Icon name="back" size={18} style={{color:"var(--text3)",marginLeft:"auto",transform:"rotate(180deg)"}}/>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── CLASSES 9–10 ─────────────────────────────────────────────────────────────
function Classes910Page({ openPage, pageData, nav, goBack, goHome }) {
  const [board, setBoard] = useState("State");
  const subjects = board === "State" ? SCHOOL_SUBJECTS_5_8 : CBSE_SUBJECTS;
  const colors = ["#6366f1","#f59e0b","#10b981","#ec4899","#8b5cf6","#3b6ee8","#ef4444","#d97706"];
  return (
    <div className="page">
      <BackBar nav={nav} goBack={goBack} goHome={goHome}/>
      <div className="page-header">
        <div className="page-title">Class {pageData.cls}</div>
        <div className="page-subtitle">Select your board, then pick a subject</div>
      </div>
      <div className="board-tabs">
        <button className={`board-tab ${board==="State"?"active":""}`} onClick={() => setBoard("State")}>State Board</button>
        <button className={`board-tab ${board==="CBSE"?"active":""}`} onClick={() => setBoard("CBSE")}>CBSE</button>
      </div>
      <div className="card-grid card-grid-2">
        {subjects.map((subj,i) => (
          <div key={subj} className="subject-card" onClick={() => openPage("subject_detail",{subject:subj,cls:pageData.cls,board,label:subj})} style={{animationDelay:`${i*0.04}s`}}>
            <div className="subject-icon" style={{background:`${colors[i%8]}20`}}>
              <Icon name="book" size={22} style={{color:colors[i%8]}}/>
            </div>
            <div>
              <div className="subject-name">{subj}</div>
              <div className="subject-count">{board} · Notes · Papers · Videos · More</div>
            </div>
            <Icon name="back" size={18} style={{color:"var(--text3)",marginLeft:"auto",transform:"rotate(180deg)"}}/>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── SUBJECT DETAIL ───────────────────────────────────────────────────────────
function SubjectDetailPage({ pageData, nav, goBack, goHome, loggedIn, setModal }) {
  const [activeVideo, setActiveVideo] = useState(null);
  const [liveVideos, setLiveVideos] = useState(null);
  const { subject, cls, board, stream } = pageData;

  useEffect(() => {
    const filters = {};
    if (subject) filters.subject = subject;
    if (cls) filters.class = cls;
    if (board) filters.board = board;
    if (stream) filters.stream = stream;
    videosAPI.list(filters).then(res => setLiveVideos(res.videos || [])).catch(() => setLiveVideos([]));
  }, [subject, cls, board, stream]);

  const videosToShow = liveVideos !== null ? liveVideos : MOCK_RESOURCES.videos;

  // Fetch all resources grouped by type
  const [liveResources, setLiveResources] = useState(null);
  useEffect(() => {
    const filters = {};
    if (subject) filters.subject = subject;
    if (cls) filters.class = cls;
    if (board) filters.board = board;
    if (stream) filters.stream = stream;
    resourcesAPI.list(filters).then(res => {
      const all = res.resources || [];
      const grouped = { notes: [], prev_papers: [], practice: [], passing: [], modules: [] };
      all.forEach(r => { if (grouped[r.type] !== undefined) grouped[r.type].push(r); });
      setLiveResources(grouped);
    }).catch(() => setLiveResources(null));
  }, [subject, cls, board, stream]);
  const resourcesToShow = liveResources !== null ? liveResources : MOCK_RESOURCES;

  const isLocked = (item) => {
    // Check if title contains "Chapter 3" or higher number to require login
    const match = item.title.match(/Chapter\s*(\d+)/i);
    if (match) {
      const chNum = parseInt(match[1], 10);
      if (chNum >= 3 && !loggedIn) return true;
    }
    return false;
  };

  const LockedOverlay = () => (
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"24px 16px",background:"var(--bg3)",borderRadius:"var(--radius-sm)",border:"2px dashed var(--card-border)",textAlign:"center",gap:10}}>
      <div style={{width:44,height:44,background:"var(--accent-light)",borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center"}}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
      </div>
      <div style={{fontWeight:700,fontSize:"0.95rem",color:"var(--text)"}}>Login Required</div>
      <div style={{fontSize:"0.82rem",color:"var(--text2)"}}>Chapter 3 and beyond require a free account</div>
      <button className="btn btn-primary btn-sm" onClick={() => setModal("signup")} style={{marginTop:4}}>Sign Up Free</button>
    </div>
  );

  return (
    <div className="page">
      <BackBar nav={nav} goBack={goBack} goHome={goHome}/>
      <div className="page-header">
        <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:8}}>
          {board && <span className="badge badge-blue">{board}</span>}
          {cls && <span className="badge badge-orange">Class {cls}</span>}
          {stream && <span className="badge badge-purple">{stream}</span>}
        </div>
        <div className="page-title">{subject}</div>
        <div className="page-subtitle">All study materials for {subject}</div>
      </div>

      {RESOURCE_TYPES.filter(r=>r.key!=="videos").map((rt, idx) => (
        <div key={rt.key} className="resource-section" style={{animationDelay:`${idx*0.06}s`}}>
          <div className="resource-section-header">
            <div className="resource-section-title">
              <div className="resource-dot" style={{background:rt.color}}/>
              <Icon name={rt.icon} size={18} style={{color:rt.color}}/>
              {rt.label}
            </div>
            <span className="badge" style={{background:`${rt.color}15`,color:rt.color}}>{resourcesToShow[rt.key].length} files</span>
          </div>
          {resourcesToShow[rt.key].length === 0 ? (
            <div style={{textAlign:"center",padding:"28px 16px",color:"var(--text3)",background:"var(--bg3)",borderRadius:12,border:"1.5px dashed var(--card-border)"}}>
              <Icon name={rt.icon} size={32} style={{color:"var(--text3)",marginBottom:10,display:"block",margin:"0 auto 10px"}}/>
              <div style={{fontWeight:600,fontSize:"0.95rem",marginBottom:4,color:"var(--text2)"}}>No {rt.label} available yet</div>
              <div style={{fontSize:"0.82rem"}}>Resources will be uploaded soon by admin</div>
            </div>
          ) : resourcesToShow[rt.key].map(item => (
            isLocked(item) ? (
              <div key={item.id} style={{marginBottom:10}}><LockedOverlay/></div>
            ) : (
              <div key={item.id} className="resource-item">
                <div style={{width:40,height:40,borderRadius:10,background:`${rt.color}12`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                  <Icon name="pdf" size={20} style={{color:rt.color}}/>
                </div>
                <div className="resource-item-info">
                  <div className="resource-item-title">{item.title}</div>
                  <div className="resource-item-meta">Uploaded {item.uploadedAt || item.created_at?.slice(0,10)} · {item.size || ""}</div>
                </div>
                <a href={item.file_url} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm"><Icon name="eye" size={14}/>View</a>
                <a href={item.file_url} download target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm"><Icon name="download" size={14}/>Download</a>
              </div>
            )
          ))}
        </div>
      ))}

      {/* Videos */}
      <div className="resource-section">
        <div className="resource-section-header">
          <div className="resource-section-title">
            <div className="resource-dot" style={{background:"#ef4444"}}/>
            <Icon name="video" size={18} style={{color:"#ef4444"}}/>
            YouTube Videos
          </div>
          <span className="badge" style={{background:"#ef444415",color:"#ef4444"}}>{videosToShow.length} videos</span>
        </div>
        <div className="video-grid">
          {videosToShow.length === 0 ? (
            <div style={{textAlign:"center",padding:"28px 16px",color:"var(--text3)",background:"var(--bg3)",borderRadius:12,border:"1.5px dashed var(--card-border)"}}>
              <Icon name="video" size={32} style={{color:"var(--text3)",display:"block",margin:"0 auto 10px"}}/>
              <div style={{fontWeight:600,fontSize:"0.95rem",marginBottom:4,color:"var(--text2)"}}>No videos available yet</div>
              <div style={{fontSize:"0.82rem"}}>Videos will be uploaded soon by admin</div>
            </div>
          ) : videosToShow.map((v, vi) => (
            vi >= 2 && !loggedIn ? (
              <div key={v.id}><LockedOverlay/></div>
            ) : (
              <div key={v.id} className="video-card" style={{display:"flex",alignItems:"center",gap:16,padding:16,background:"var(--card)",border:"1.5px solid var(--card-border)",borderRadius:"var(--radius)",cursor:"pointer",transition:"all 0.2s"}}
                onMouseEnter={e=>e.currentTarget.style.borderColor="#c9a227"}
                onMouseLeave={e=>e.currentTarget.style.borderColor="var(--card-border)"}>
                <div style={{width:48,height:48,background:"#ef444415",borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="#ef4444"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </div>
                <div style={{flex:1}}>
                  <div style={{fontWeight:600,fontSize:"0.95rem",color:"var(--text)",marginBottom:4}}>{v.title}</div>
                  <div style={{fontSize:"0.78rem",color:"var(--text3)"}}>Added {v.uploadedAt}</div>
                </div>
                <a href={v.url} target="_blank" rel="noopener noreferrer"
                  style={{display:"inline-flex",alignItems:"center",gap:6,background:"#ef4444",color:"white",padding:"8px 16px",borderRadius:8,fontSize:"0.82rem",fontWeight:600,textDecoration:"none",whiteSpace:"nowrap",flexShrink:0}}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                  Watch on YouTube
                </a>
              </div>
            )
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── COLLEGE PAGE ─────────────────────────────────────────────────────────────
function CollegePage({ openPage, nav, goBack, goHome }) {
  return (
    <div className="page">
      <BackBar nav={nav} goBack={goBack} goHome={goHome}/>
      <div className="page-header">
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:8}}>
          <div style={{width:48,height:48,background:"var(--purple-light)",borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center"}}>
            <Icon name="college" size={26} style={{color:"var(--purple)"}}/>
          </div>
          <div className="page-title">College</div>
        </div>
        <div className="page-subtitle">Select your faculty to explore streams and subjects</div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:24}}>
        <div className="big-card" onClick={() => openPage("science",{label:"Science"})}>
          <div className="big-card-icon" style={{background:"var(--green-light)"}}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="1.5"><path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"/></svg>
          </div>
          <div className="big-card-title" style={{color:"var(--green)"}}>Science</div>
          <div className="big-card-desc">PCMB · PCMC · PCME — Physics, Chemistry, Maths with Biology, Computer Science, or Electronics</div>
          <div style={{marginTop:20,display:"flex",gap:8,justifyContent:"center"}}>
            <span className="badge badge-green">PCMB</span><span className="badge badge-green">PCMC</span><span className="badge badge-green">PCME</span>
          </div>
        </div>
        <div className="big-card" onClick={() => openPage("commerce",{label:"Commerce"})}>
          <div className="big-card-icon" style={{background:"var(--amber-light)"}}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="1.5"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/></svg>
          </div>
          <div className="big-card-title" style={{color:"var(--amber)"}}>Commerce</div>
          <div className="big-card-desc">CEBA · SEBA · MEBA — Commerce, Economics, Business Studies and Accountancy</div>
          <div style={{marginTop:20,display:"flex",gap:8,justifyContent:"center"}}>
            <span className="badge badge-orange">CEBA</span><span className="badge badge-orange">SEBA</span><span className="badge badge-orange">MEBA</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── SCIENCE PAGE ─────────────────────────────────────────────────────────────
function SciencePage({ openPage, nav, goBack, goHome }) {
  return (
    <div className="page">
      <BackBar nav={nav} goBack={goBack} goHome={goHome}/>
      <div className="page-header">
        <div className="page-title">Science Streams</div>
        <div className="page-subtitle">Choose your stream to access subject-wise resources</div>
      </div>
      <div className="card-grid card-grid-3">
        {Object.entries(SCIENCE_STREAMS).map(([stream, subjects],i) => (
          <div key={stream} className="stream-card" onClick={() => openPage("stream",{stream,subjects,faculty:"Science",label:stream})} style={{animationDelay:`${i*0.08}s`}}>
            <div style={{width:56,height:56,background:"var(--green-light)",borderRadius:14,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 16px"}}>
              <span style={{fontSize:"1.3rem",fontWeight:800,color:"var(--green)",fontFamily:"serif"}}>{stream}</span>
            </div>
            <div className="stream-title" style={{color:"var(--green)"}}>{stream}</div>
            <div className="stream-subjects">{subjects.join(" · ")}</div>
            <div style={{marginTop:16,display:"flex",gap:6,justifyContent:"center",flexWrap:"wrap"}}>
              {subjects.map(s=><span key={s} className="badge badge-green" style={{fontSize:"0.7rem"}}>{s}</span>)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── COMMERCE PAGE ────────────────────────────────────────────────────────────
function CommercePage({ openPage, nav, goBack, goHome }) {
  return (
    <div className="page">
      <BackBar nav={nav} goBack={goBack} goHome={goHome}/>
      <div className="page-header">
        <div className="page-title">Commerce Streams</div>
        <div className="page-subtitle">Choose your stream to access subject-wise resources</div>
      </div>
      <div className="card-grid card-grid-3">
        {Object.entries(COMMERCE_STREAMS).map(([stream, subjects],i) => (
          <div key={stream} className="stream-card" onClick={() => openPage("stream",{stream,subjects,faculty:"Commerce",label:stream})} style={{animationDelay:`${i*0.08}s`}}>
            <div style={{width:56,height:56,background:"var(--amber-light)",borderRadius:14,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 16px"}}>
              <span style={{fontSize:"1.3rem",fontWeight:800,color:"var(--amber)",fontFamily:"serif"}}>{stream}</span>
            </div>
            <div className="stream-title" style={{color:"var(--amber)"}}>{stream}</div>
            <div className="stream-subjects">{subjects.join(" · ")}</div>
            <div style={{marginTop:16,display:"flex",gap:6,justifyContent:"center",flexWrap:"wrap"}}>
              {subjects.map(s=><span key={s} className="badge badge-orange" style={{fontSize:"0.7rem"}}>{s}</span>)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── STREAM PAGE ──────────────────────────────────────────────────────────────
function StreamPage({ openPage, pageData, nav, goBack, goHome }) {
  const { stream, subjects, faculty } = pageData;
  const colors = ["#6366f1","#f59e0b","#10b981","#ec4899","#8b5cf6","#3b6ee8"];
  const isScience = faculty === "Science";
  return (
    <div className="page">
      <BackBar nav={nav} goBack={goBack} goHome={goHome}/>
      <div className="page-header">
        <div style={{marginBottom:8}}><span className={`badge ${isScience?"badge-green":"badge-orange"}`}>{faculty}</span></div>
        <div className="page-title">{stream}</div>
        <div className="page-subtitle">Select a subject to view all study materials</div>
      </div>
      <div className="card-grid card-grid-2">
        {(subjects||[]).map((subj,i) => (
          <div key={subj} className="subject-card" onClick={() => openPage("subject_detail",{subject:subj,stream,faculty,label:subj})} style={{animationDelay:`${i*0.06}s`}}>
            <div className="subject-icon" style={{background:`${colors[i%6]}20`}}>
              <Icon name="book" size={22} style={{color:colors[i%6]}}/>
            </div>
            <div>
              <div className="subject-name">{subj}</div>
              <div className="subject-count">{stream} · Notes · Papers · Videos · More</div>
            </div>
            <Icon name="back" size={18} style={{color:"var(--text3)",marginLeft:"auto",transform:"rotate(180deg)"}}/>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── ABOUT PAGE ───────────────────────────────────────────────────────────────

function AboutPage({ nav, goBack, goHome }) {
  return (
    <div className="page">
      <BackBar nav={nav} goBack={goBack} goHome={goHome}/>
      <div className="page-header">
        <div className="page-title">About JC Resource Lab</div>
        <div className="page-subtitle">Dedicated to helping every student learn smarter and achieve academic excellence</div>
      </div>

      {/* Welcome Section */}
      <div className="hero-banner" style={{marginBottom:40}}>
        <div className="hero-content" style={{textAlign:"center",display:"flex",flexDirection:"column",alignItems:"center"}}>
          <div className="hero-title" style={{textAlign:"center"}}>Learn · <span style={{color:"#c9a227"}}>Practice</span> · Grow</div>
          <div className="hero-sub" style={{textAlign:"center",maxWidth:560}}>Welcome to JC Resource Lab, an educational platform dedicated to helping students learn smarter and achieve academic excellence.</div>
        </div>
      </div>

      {/* About Content from PDF */}
      <div className="card" style={{marginBottom:28,lineHeight:1.8,borderLeft:"4px solid #c9a227"}}>
        <p style={{color:"var(--text)",fontSize:"1rem",marginBottom:16}}>
          Welcome to <strong>JC Resource Lab</strong>, a learning platform created to support students from <strong>Class 5 to 10</strong> (State / CBSE), <strong>1st PUC</strong>, <strong>2nd PUC</strong> (Science / Commerce) with quality notes, worksheets, quizzes, explanation videos, and exam resources.
        </p>
        <p style={{color:"var(--text2)",fontSize:"0.95rem",marginBottom:16}}>
          We provide high-quality study materials including notes, worksheets, quizzes, explanation videos, question papers, and interactive learning resources for students from Class 5 to 10. Our content is designed to make learning simple, engaging, and effective for State and CBSE students.
        </p>
        <p style={{color:"var(--text2)",fontSize:"0.95rem"}}>
          At JC Resource Lab, we believe education should inspire curiosity and confidence. Our goal is to support students with concept-based learning, regular practice, and creative educational activities that make studies enjoyable.
        </p>
        <p style={{color:"var(--text2)",fontSize:"0.95rem",marginTop:12}}>
          We continuously work to create useful resources for students, parents, and teachers while building a positive learning community.
        </p>
        <div style={{marginTop:20,padding:"14px 18px",background:"var(--accent-light)",borderRadius:"var(--radius-sm)",borderLeft:"4px solid var(--accent)",display:"inline-block"}}>
          <p style={{fontStyle:"italic",color:"var(--navy)",fontSize:"1rem",fontFamily:"var(--font-display)",fontWeight:700}}>"Learn • Practice • Grow with JC Resource Lab"</p>
        </div>
      </div>

      {/* Mission, Vision, Values */}
      <div className="card-grid card-grid-3" style={{marginBottom:28}}>
        {[
          { icon:"star", color:"#e85d26", bg:"var(--accent-light)", title:"Our Mission", text:"To make learning simple, engaging, and accessible for every student through creative educational resources and concept-based teaching." },
          { icon:"eye", color:"#6366f1", bg:"var(--purple-light)", title:"Our Vision", text:"We aim to create a complete digital learning hub where students can learn, practice, and grow confidently." },
          { icon:"award", color:"#10b981", bg:"var(--green-light)", title:"We Believe", text:"Learning should be interactive and stress-free. Our resources focus on understanding concepts rather than memorization." },
        ].map((item,i) => (
          <div key={i} className="card">
            <div style={{width:48,height:48,borderRadius:12,background:item.bg,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:16}}>
              <Icon name={item.icon} size={24} style={{color:item.color}}/>
            </div>
            <div style={{fontWeight:700,fontSize:"1.1rem",marginBottom:10}}>{item.title}</div>
            <div style={{color:"var(--text2)",fontSize:"0.875rem",lineHeight:1.7}}>{item.text}</div>
          </div>
        ))}
      </div>

      {/* What We Provide */}
      <div className="card" style={{marginBottom:28}}>
        <h3 style={{fontWeight:700,fontSize:"1.2rem",marginBottom:20}}>What We Provide</h3>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:12}}>
          {[
            { icon:"book", color:"#6366f1", text:"Notes and study materials" },
            { icon:"file", color:"#f59e0b", text:"Worksheets" },
            { icon:"layers", color:"#10b981", text:"Practice tests & quizzes" },
            { icon:"video", color:"#ef4444", text:"Video explanations" },
            { icon:"file", color:"#ec4899", text:"Previous year question papers" },
            { icon:"star", color:"#8b5cf6", text:"Grammar activities" },
            { icon:"book", color:"#3b6ee8", text:"Concept-based learning" },
            { icon:"award", color:"#d97706", text:"Exam preparation resources" },
            { icon:"layers", color:"#16a34a", text:"Activity-based learning ideas" },
          ].map((item,i) => (
            <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 12px",background:"var(--bg3)",borderRadius:"var(--radius-sm)"}}>
              <div style={{width:32,height:32,borderRadius:8,background:`${item.color}15`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                <Icon name={item.icon} size={16} style={{color:item.color}}/>
              </div>
              <span style={{fontSize:"0.875rem",fontWeight:500}}>{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Founder Photo at bottom */}
      <div className="card" style={{display:"flex",flexDirection:"column",alignItems:"center",gap:24,padding:"min(6vw,24px)",marginTop:8}}>
        <div style={{display:"inline-flex",alignItems:"center",gap:8,background:"var(--accent-light)",color:"var(--navy)",padding:"6px 14px",borderRadius:50,fontSize:"0.8rem",fontWeight:700}}>
          <Icon name="award" size={14}/> Our Educator
        </div>
          <img
            src={TEACHER_PHOTO}
            alt="Mohan M Gowda - Educator, JC Resource Lab"
            style={{width:"min(60vw,220px)",maxWidth:220,height:"auto",objectFit:"cover",objectPosition:"top",borderRadius:20,boxShadow:"0 8px 32px rgba(30,58,110,0.18)",border:"3px solid #c9a227"}}
          />
        <div style={{textAlign:"center"}}>
          <div style={{fontWeight:700,fontSize:"1.1rem",color:"var(--text)",marginBottom:2}}>Mohan M Gowda</div>
          <div style={{fontSize:"0.82rem",fontWeight:500,color:"var(--text2)",marginBottom:6}}>[B.E, M.Tech, B.Ed]</div>
          <div style={{fontSize:"0.82rem",fontWeight:600,color:"var(--navy)",background:"var(--accent-light)",display:"inline-block",padding:"3px 12px",borderRadius:20,marginBottom:10}}>Founder & Educator</div>
          <p style={{color:"var(--text2)",fontSize:"0.95rem",lineHeight:1.8,textAlign:"center",maxWidth:500}}>
            Passionate about education and dedicated to making quality learning resources accessible to every student.
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── CONTACT PAGE ─────────────────────────────────────────────────────────────
function ContactPage({ nav, goBack, goHome }) {
  const [form, setForm] = useState({ name:"", email:"", phone:"", message:"" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSend = async () => {
    if (!form.message) { setError("Please enter a message"); return; }
    setLoading(true); setError("");
    try {
      // Save to database so admin can view all messages
      await contactAPI.send({ name: form.name||"Anonymous", email: form.email||"", phone: form.phone||"", message: form.message });
      // Also open mailto so the message goes directly to the lecturer's email
      const subject = encodeURIComponent("JC Resource Lab - Message from " + (form.name || "Student"));
      const body = encodeURIComponent(
        "Name: " + (form.name || "N/A") + "\n" +
        "Email: " + (form.email || "N/A") + "\n" +
        "Phone: " + (form.phone || "N/A") + "\n\n" +
        "Message:\n" + form.message
      );
      window.location.href = `mailto:${LECTURER_EMAIL}?subject=${subject}&body=${body}`;
      setSent(true);
    } catch(e) {
      setError(e.message || "Failed to send message. Please try again.");
    } finally { setLoading(false); }
  };

  return (
    <div className="page">
      <BackBar nav={nav} goBack={goBack} goHome={goHome}/>
      <div className="page-header">
        <div className="page-title">Contact Us</div>
        <div className="page-subtitle">Get in touch with us — we'd love to hear from you</div>
      </div>
      <div className="contact-grid">
        <div className="contact-info">
          <div className="card" style={{marginBottom:20}}>
            {[
              { icon:"location", label:"Address", value:"#154, 35th Cross, Juganahalli, Rajajinagar 2nd Block, Bengaluru 560 010" },
              { icon:"phone", label:"Phone", value:"+91 9535576619" },
              { icon:"mail", label:"Email", value:LECTURER_EMAIL },
            ].map((item,i) => (
              <div key={i} style={{display:"flex",alignItems:"flex-start",gap:14,padding:"14px 0",borderBottom:i<2?"1px solid var(--card-border)":"none"}}>
                <div style={{width:40,height:40,background:"var(--accent-light)",borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                  <Icon name={item.icon} size={18} style={{color:"var(--accent)"}}/>
                </div>
                <div>
                  <div style={{fontSize:"0.8rem",fontWeight:600,color:"var(--text3)",marginBottom:2}}>{item.label}</div>
                  <div style={{fontSize:"0.9rem",fontWeight:500}}>{item.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="card contact-form-card">
          {sent ? (
            <div style={{textAlign:"center",padding:"40px 0"}}>
              <div style={{width:64,height:64,background:"var(--green-light)",borderRadius:16,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 16px"}}>
                <Icon name="check" size={32} style={{color:"var(--green)"}}/>
              </div>
              <p style={{fontWeight:700,fontSize:"1.1rem",marginBottom:8}}>Message Sent!</p>
              <p style={{color:"var(--text2)",fontSize:"0.9rem"}}>Your message has been sent to the lecturer and saved. We'll get back to you within 24 hours.</p>
            </div>
          ) : (
            <>
              <h3 style={{fontWeight:700,fontSize:"1.1rem",marginBottom:20}}>Send a Message</h3>
              {error && <div style={{background:"#fef2f2",color:"#dc2626",borderRadius:8,padding:"10px 14px",marginBottom:14,fontSize:"0.85rem"}}>{error}</div>}
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input className="form-input" placeholder="Your name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
              </div>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input className="form-input" type="email" placeholder="your@email.com" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/>
              </div>
              <div className="form-group">
                <label className="form-label">Phone</label>
                <input className="form-input" placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})}/>
              </div>
              <div className="form-group">
                <label className="form-label">Message *</label>
                <textarea className="form-input form-textarea" placeholder="Your message..." value={form.message} onChange={e=>setForm({...form,message:e.target.value})}/>
              </div>
              <button className="btn btn-primary" style={{width:"100%",justifyContent:"center"}} onClick={handleSend} disabled={loading}>
                <Icon name="mail" size={16}/>{loading ? "Sending..." : "Send Message"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── ADMIN PAGE ───────────────────────────────────────────────────────────────
// Shared initial data
const INIT_NOTES = [];
const INIT_PAPERS = [];
const INIT_CHAPTERS = [];
const INIT_VIDEOS = [];
const INIT_STUDENTS = [];
const INIT_FEEDBACKS = [];

function AdminPage({ adminTab, setAdminTab, nav, goBack, goHome }) {
  // ── Shared state across all admin tabs ─────────────────────────────────────
  const [showChangePwd, setShowChangePwd] = useState(false);
  const [cpForm, setCpForm] = useState({ oldPassword: "", newPassword: "", confirm: "" });
  const [cpError, setCpError] = useState("");
  const [cpLoading, setCpLoading] = useState(false);
  const [notes,    setNotes]    = useState(INIT_NOTES);
  const [papers,   setPapers]   = useState(INIT_PAPERS);
  const [practice, setPractice] = useState([]);
  const [passing,  setPassing]  = useState([]);
  const [modules,  setModules]  = useState([]);
  const [chapters, setChapters] = useState(INIT_CHAPTERS);
  const [videos,   setVideos]   = useState(INIT_VIDEOS);
  const [students, setStudents] = useState(INIT_STUDENTS);
  const [feedbacks,setFeedbacks]= useState(INIT_FEEDBACKS);
  const [contactMsgs,setContactMsgs]= useState([]);

  const allItems = [...notes, ...papers, ...practice, ...passing, ...modules]; // for recent uploads

  const tabs = [
    { key:"dashboard", icon:"home",    label:"Dashboard" },
    { key:"chapters",  icon:"layers",  label:"Chapters",        count:chapters.length },
    { key:"notes",     icon:"book",    label:"Notes",           count:notes.length },
    { key:"papers",    icon:"file",    label:"Prev Year Papers", count:papers.length },
    { key:"practice",  icon:"layers",  label:"Practice Papers",  count:practice.length },
    { key:"passing",   icon:"award",   label:"Passing Package",  count:passing.length },
    { key:"modules",   icon:"star",    label:"Worksheets",       count:modules.length },
    { key:"videos",    icon:"video",   label:"Videos",          count:videos.length },
    { key:"subjects",  icon:"star",    label:"Subjects" },
    { key:"students",  icon:"user",    label:"Students",        count:students.length },
    { key:"feedback",  icon:"message", label:"Feedback",        count:feedbacks.length },
    { key:"contact_msgs", icon:"mail", label:"Contact Messages", count:contactMsgs.length },
  ];

  return (
    <div>
      <div style={{background:"linear-gradient(135deg,#0f1e3d,#1e3a6e)",padding:"16px 20px",display:"flex",alignItems:"center",gap:12}}>
        <div style={{width:40,height:40,background:"rgba(201,162,39,0.2)",border:"2px solid #c9a227",borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center"}}>
          <Icon name="shield" size={20} style={{color:"#c9a227"}}/>
        </div>
        <div>
          <div style={{fontWeight:700,fontSize:"1rem",color:"white"}}>Admin Control Panel</div>
          <div style={{fontSize:"0.78rem",color:"rgba(255,255,255,0.6)"}}>JC Resource Lab · Full Access</div>
        </div>
        <div style={{marginLeft:"auto",display:"flex",gap:8}}>
          <button className="btn btn-ghost btn-sm" onClick={() => setShowChangePwd(true)}><Icon name="lock" size={14}/>Change Password</button>
          <button className="btn btn-secondary btn-sm" onClick={goHome}><Icon name="home" size={14}/>Home</button>
        </div>
      </div>
      <div className="admin-layout">
        <div className="admin-sidebar">
          <div style={{padding:"16px 8px"}}>
            {tabs.map(t => (
              <div key={t.key} className={`admin-nav-item ${adminTab===t.key?"active":""}`} onClick={() => setAdminTab(t.key)}
                style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                <span style={{display:"flex",alignItems:"center",gap:8}}><Icon name={t.icon} size={18}/>{t.label}</span>
                {t.count !== undefined && (
                  <span style={{background:adminTab===t.key?"rgba(201,162,39,0.3)":"var(--bg3)",color:adminTab===t.key?"#c9a227":"var(--text3)",borderRadius:20,padding:"1px 8px",fontSize:"0.72rem",fontWeight:700}}>{t.count}</span>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="admin-content">
          <div className="admin-mobile-tabs">
            {tabs.map(t => (
              <button key={t.key} className={`admin-mobile-tab ${adminTab===t.key?"active":""}`} onClick={() => setAdminTab(t.key)}>{t.label}</button>
            ))}
          </div>

          {adminTab !== "dashboard" && (
            <div style={{marginBottom:12}}>
              <button className="btn btn-secondary btn-sm" onClick={() => setAdminTab("dashboard")}><Icon name="back" size={14}/> Back to Dashboard</button>
            </div>
          )}
          {adminTab==="dashboard" && <AdminDashboard notes={notes} papers={papers} chapters={chapters} videos={videos} students={students} allItems={allItems} setNotes={setNotes} setPapers={setPapers} setAdminTab={setAdminTab}/>}
          {adminTab==="chapters"  && <AdminChapters  chapters={chapters} setChapters={setChapters}/>}
          {adminTab==="notes"     && <AdminUpload type="notes"       icon="book"   color="#6366f1" items={notes}    setItems={setNotes}/>}
          {adminTab==="papers"    && <AdminUpload type="prev_papers" icon="file"   color="#f59e0b" items={papers}   setItems={setPapers}/>}
          {adminTab==="practice"  && <AdminUpload type="practice"    icon="layers" color="#10b981" items={practice} setItems={setPractice}/>}
          {adminTab==="modules"   && <AdminUpload type="modules"     icon="star"   color="#8b5cf6" items={modules}  setItems={setModules}/>}
          {adminTab==="passing"   && <AdminUpload type="passing"     icon="award"  color="#ec4899" items={passing}  setItems={setPassing}/>}
          {adminTab==="videos"    && <AdminVideos videos={videos} setVideos={setVideos}/>}
          {adminTab==="subjects"  && <AdminSubjects/>}
          {adminTab==="students"  && <AdminStudents students={students} setStudents={setStudents}/>}
          {adminTab==="feedback"  && <AdminFeedback feedbacks={feedbacks} setFeedbacks={setFeedbacks}/>}
          {adminTab==="contact_msgs" && <AdminContactMessages messages={contactMsgs} setMessages={setContactMsgs}/>}
        </div>
      </div>
      {showChangePwd && (
        <div className="modal-overlay" onClick={() => setShowChangePwd(false)}>
          <div className="modal" style={{maxWidth:420}} onClick={e=>e.stopPropagation()}>
            <div className="modal-header">
              <h2 style={{fontSize:"1.2rem",fontWeight:700}}>Change Password</h2>
              <button className="btn btn-ghost btn-icon" onClick={() => setShowChangePwd(false)}><Icon name="close" size={18}/></button>
            </div>
            <div className="modal-body">
              <div style={{display:"grid",gap:10}}>
                <PasswordInput
                  label="Current password"
                  name="changeOldPassword"
                  value={cpForm.oldPassword}
                  placeholder="Current password"
                  onChange={e=>setCpForm({...cpForm,oldPassword:e.target.value})}
                />
                <PasswordInput
                  label="New password"
                  name="changeNewPassword"
                  value={cpForm.newPassword}
                  placeholder="New password"
                  onChange={e=>setCpForm({...cpForm,newPassword:e.target.value})}
                />
                <PasswordInput
                  label="Confirm new password"
                  name="changeConfirmPassword"
                  value={cpForm.confirm}
                  placeholder="Confirm new password"
                  onChange={e=>setCpForm({...cpForm,confirm:e.target.value})}
                />
                {cpError && <div style={{color:"#ef4444",fontSize:"0.9rem"}}>{cpError}</div>}
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => { setShowChangePwd(false); setCpError(""); }}>Cancel</button>
              <button className="btn btn-primary" onClick={async () => {
                if (!cpForm.oldPassword || !cpForm.newPassword) { setCpError("Please fill all fields"); return; }
                if (cpForm.newPassword !== cpForm.confirm) { setCpError("Passwords do not match"); return; }
                if (cpForm.newPassword.length < 6) { setCpError("Password must be at least 6 characters"); return; }
                setCpLoading(true); setCpError("");
                try {
                  await authAPI.changePassword(cpForm.oldPassword, cpForm.newPassword);
                  alert("Password changed successfully");
                  setShowChangePwd(false);
                } catch(e) { setCpError(e.message || e); }
                setCpLoading(false);
              }} disabled={cpLoading}>{cpLoading ? "Changing..." : "Change Password"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── ADMIN: DASHBOARD ─────────────────────────────────────────────────────────
function AdminDashboard({ notes, papers, chapters, videos, students, allItems, setNotes, setPapers, setAdminTab }) {
  const [editItem, setEditItem] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const stats = [
    { num:notes.length,    label:"Total Notes",       icon:"book",   color:"#6366f1", tab:"notes" },
    { num:papers.filter(p=>p.title.toLowerCase().includes("prev")||p.title.toLowerCase().includes("paper")||true).length, label:"Question Banks / Papers", icon:"file", color:"#f59e0b", tab:"papers" },
    { num:chapters.length, label:"Total Chapters",    icon:"layers", color:"#10b981", tab:"chapters" },
    { num:videos.length,   label:"Video Links",       icon:"video",  color:"#ef4444", tab:"videos" },
    { num:students.length, label:"Total Students",    icon:"user",   color:"#3b6ee8", tab:"students" },
    { num:notes.length+papers.length+videos.length, label:"Total Resources", icon:"star", color:"#ec4899", tab:null },
  ];

  const recent = [...allItems].sort((a,b) => b.id - a.id).slice(0,8);

  const startEdit = (item) => {
    setEditItem(item);
    setEditForm({title:item.title, class:item.class, subject:item.subject, board:item.board, chapter:item.chapter||""});
  };

  const saveEdit = () => {
    if (editItem.type === "Notes") setNotes(prev => prev.map(x => x.id===editItem.id ? {...x,...editForm} : x));
    if (editItem.type === "Papers") setPapers(prev => prev.map(x => x.id===editItem.id ? {...x,...editForm} : x));
    setEditItem(null);
  };

  const doDelete = (item) => {
    if (item.type === "Notes") setNotes(prev => prev.filter(x => x.id!==item.id));
    if (item.type === "Papers") setPapers(prev => prev.filter(x => x.id!==item.id));
    setDeleteConfirm(null);
  };

  return (
    <>
      <h2 style={{fontFamily:"var(--font-display)",fontSize:"1.8rem",marginBottom:24}}>Dashboard</h2>

      {/* Stats — clickable */}
      <div className="stats-grid" style={{marginBottom:32}}>
        {stats.map((s,i) => (
          <div key={i} className="stat-card" onClick={() => s.tab && setAdminTab(s.tab)}
            style={{cursor:s.tab?"pointer":"default",transition:"all 0.2s",border:"1.5px solid var(--card-border)"}}
            onMouseEnter={e=>{if(s.tab){e.currentTarget.style.borderColor=s.color;e.currentTarget.style.transform="translateY(-2px)";}}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor="var(--card-border)";e.currentTarget.style.transform="none";}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
              <div style={{fontFamily:"var(--font-display)",fontSize:"2rem",fontWeight:700,color:s.color}}>{s.num}</div>
              <div style={{width:38,height:38,background:`${s.color}15`,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center"}}>
                <Icon name={s.icon} size={19} style={{color:s.color}}/>
              </div>
            </div>
            <div style={{fontWeight:600,fontSize:"0.85rem",color:"var(--text2)"}}>{s.label}</div>
            {s.tab && <div style={{fontSize:"0.72rem",color:s.color,marginTop:4,fontWeight:600}}>Click to manage →</div>}
          </div>
        ))}
      </div>

      {/* Recent Uploads with real edit/delete */}
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16}}>
        <h3 style={{fontWeight:700,fontSize:"1.1rem"}}>Recent Uploads</h3>
        <div style={{display:"flex",gap:8}}>
          <button className="btn btn-primary btn-sm" onClick={() => setAdminTab("notes")}><Icon name="plus" size={14}/>Add Notes</button>
          <button className="btn btn-secondary btn-sm" onClick={() => setAdminTab("papers")}><Icon name="plus" size={14}/>Add Papers</button>
        </div>
      </div>

      {recent.length===0 && (
        <div className="card" style={{textAlign:"center",padding:"40px 20px",color:"var(--text3)"}}>
          <Icon name="upload" size={40} style={{display:"block",margin:"0 auto 12px",color:"var(--text3)"}}/>
          <p style={{fontWeight:600}}>No uploads yet.</p>
          <p style={{fontSize:"0.875rem",marginTop:4}}>Use the Notes or Papers tabs to add content.</p>
        </div>
      )}

      {recent.length>0 && (
        <div className="card table-responsive-wrapper">
          {/* Column headers */}
          <div className="notes-header" style={{display:"flex",gap:8,padding:"8px 0 12px",borderBottom:"1px solid var(--card-border)",fontSize:"0.75rem",fontWeight:700,color:"var(--text3)"}}>
            <span style={{flex:3}}>TITLE</span>
            <span style={{flex:1}}>CLASS</span>
            <span style={{flex:1}}>BOARD</span>
            <span style={{flex:1}}>TYPE</span>
            <span style={{width:90,textAlign:"right"}}>ACTIONS</span>
          </div>
          {recent.map((item,i) => (
            <div key={item.id} className="notes-row" style={{display:"flex",alignItems:"center",gap:8,padding:"12px 0",borderBottom:i<recent.length-1?"1px solid var(--card-border)":"none"}}>
              <div style={{width:38,height:38,background:"var(--accent-light)",borderRadius:9,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                <Icon name={item.type==="Notes"?"book":"file"} size={18} style={{color:item.type==="Notes"?"#6366f1":"#f59e0b"}}/>
              </div>
              <div style={{flex:3,minWidth:0}}>
                <div style={{fontWeight:600,fontSize:"0.88rem",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{item.title}</div>
                <div style={{fontSize:"0.74rem",color:"var(--text3)",marginTop:1}}>{item.chapter && `${item.chapter} · `}{item.subject}</div>
              </div>
              <div style={{flex:1,fontSize:"0.82rem",color:"var(--text2)"}}>Class {item.class}</div>
              <div style={{flex:1}}><span className="badge badge-blue">{item.board}</span></div>
              <div style={{flex:1}}><span className="badge" style={{background:item.type==="Notes"?"#6366f115":"#f59e0b15",color:item.type==="Notes"?"#6366f1":"#d97706"}}>{item.type}</span></div>
              <div className="notes-actions" style={{width:90,display:"flex",gap:4,justifyContent:"flex-end"}}>
                <button className="btn btn-ghost btn-icon btn-sm" title="Edit" onClick={() => startEdit(item)} style={{color:"var(--navy)"}}><Icon name="edit" size={15}/></button>
                <button className="btn btn-ghost btn-icon btn-sm" title="Delete" onClick={() => setDeleteConfirm(item)} style={{color:"#ef4444"}}><Icon name="trash" size={15}/></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete confirm modal */}
      {deleteConfirm && (
        <div className="modal-overlay" onClick={() => setDeleteConfirm(null)}>
          <div className="modal" style={{maxWidth:380}} onClick={e=>e.stopPropagation()}>
            <div className="modal-header">
              <h2 style={{fontSize:"1.1rem",fontWeight:700,color:"#ef4444"}}>Confirm Delete</h2>
              <button className="btn btn-ghost btn-icon" onClick={() => setDeleteConfirm(null)}><Icon name="close" size={18}/></button>
            </div>
            <div className="modal-body">
              <p style={{color:"var(--text2)",fontSize:"0.9rem"}}>Are you sure you want to delete <strong>"{deleteConfirm.title}"</strong>? This cannot be undone.</p>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setDeleteConfirm(null)}>Cancel</button>
              <button className="btn btn-primary" style={{background:"#ef4444",border:"none"}} onClick={() => doDelete(deleteConfirm)}><Icon name="trash" size={15}/>Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit inline modal */}
      {editItem && (
        <div className="modal-overlay" onClick={() => setEditItem(null)}>
          <div className="modal" style={{maxWidth:480}} onClick={e=>e.stopPropagation()}>
            <div className="modal-header">
              <h2 style={{fontSize:"1.1rem",fontWeight:700}}>Edit — {editItem.type}</h2>
              <button className="btn btn-ghost btn-icon" onClick={() => setEditItem(null)}><Icon name="close" size={18}/></button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label className="form-label">Title</label>
                <input className="form-input" value={editForm.title} onChange={e=>setEditForm({...editForm,title:e.target.value})}/>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(min(100%,240px),1fr))",gap:12}}>
                <div className="form-group" style={{marginBottom:0}}>
                  <label className="form-label">Chapter</label>
                  <input className="form-input" value={editForm.chapter} onChange={e=>setEditForm({...editForm,chapter:e.target.value})}/>
                </div>
                <div className="form-group" style={{marginBottom:0}}>
                  <label className="form-label">Class</label>
                  <select className="form-input form-select" value={editForm.class} onChange={e=>setEditForm({...editForm,class:e.target.value})}>
                    {["5th","6th","7th","8th","9th","10th","1st PUC","2nd PUC"].map(c=><option key={c}>{c}</option>)}
                  </select>
                </div>
                <div className="form-group" style={{marginBottom:0}}>
                  <label className="form-label">Subject</label>
                  <select className="form-input form-select" value={editForm.subject} onChange={e=>setEditForm({...editForm,subject:e.target.value})}>
                    {[...SCHOOL_SUBJECTS_5_8,"Physics","Chemistry","Biology","Commerce","Economics","Accountancy","Business Studies"].map(s=><option key={s}>{s}</option>)}
                  </select>
                </div>
                <div className="form-group" style={{marginBottom:0}}>
                  <label className="form-label">Board</label>
                  <select className="form-input form-select" value={editForm.board} onChange={e=>setEditForm({...editForm,board:e.target.value})}>
                    <option>State</option><option>CBSE</option><option>PUC</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setEditItem(null)}>Cancel</button>
              <button className="btn btn-primary" onClick={saveEdit}><Icon name="check" size={15}/>Save Changes</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ─── ADMIN: UPLOAD (Notes / Papers) ──────────────────────────────────────────
function AdminUpload({ type, icon, color="#c9a227", items, setItems }) {
  const blank = { title:"", class:"9th", subject:"Mathematics", board:"State", chapter:"", type };
  const [form, setForm] = useState(blank);
  const [adding, setAdding] = useState(false);
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const fileInputRef = React.useRef(null);

  useEffect(() => {
    resourcesAPI.list({type}).then(res => setItems(res.resources || [])).catch(() => {});
  }, [type]);

  const save = async () => {
    if (!form.title) return;
    setUploadError("");
    if (editId) {
      try {
        const res = await resourcesAPI.update(editId, {title:form.title,class:form.class,subject:form.subject,board:form.board,chapter:form.chapter,type});
        setItems(prev => prev.map(x => x.id===editId ? res.resource : x));
        setEditId(null); setAdding(false); setForm(blank);
      } catch(e) { setUploadError(e.message); }
    } else {
      if (!selectedFile) { setUploadError("Please select a file to upload."); return; }
      setUploading(true);
      try {
        const meta = {title:form.title, class:form.class, subject:form.subject, board:form.board, chapter:form.chapter, type};
        const res = await resourcesAPI.upload(meta, selectedFile);
        setItems(prev => [res.resource, ...prev]);
        setAdding(false); setForm(blank); setSelectedFile(null);
      } catch(e) { setUploadError(e.message || "Upload failed"); }
      setUploading(false);
    }
  };

  const startEdit = (item) => {
    setForm({title:item.title,class:item.class,subject:item.subject,board:item.board,chapter:item.chapter||"",type});
    setEditId(item.id); setAdding(true); setSelectedFile(null); setUploadError("");
  };

  const filtered = items.filter(x =>
    x.title.toLowerCase().includes(search.toLowerCase()) ||
    x.subject.toLowerCase().includes(search.toLowerCase()) ||
    (x.chapter||"").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16,flexWrap:"wrap",gap:12}}>
        <h2 style={{fontFamily:"var(--font-display)",fontSize:"1.6rem"}}>Manage {type}</h2>
        <button className="btn btn-primary" style={{background:`linear-gradient(135deg,${color},${color}cc)`,border:"none"}}
          onClick={() => { setAdding(true); setEditId(null); setForm(blank); }}>
          <Icon name="plus" size={16}/>Add {type}
        </button>
      </div>

      <div className="search-bar" style={{marginBottom:16}}>
        <Icon name="search" size={16} style={{color:"var(--text3)"}}/>
        <input style={{border:"none",background:"transparent",outline:"none",flex:1,fontSize:"0.9rem"}}
          placeholder={`Search ${type.toLowerCase()} by title, subject, chapter...`}
          value={search} onChange={e=>setSearch(e.target.value)}/>
        {search && <button onClick={()=>setSearch("")} style={{border:"none",background:"none",cursor:"pointer",color:"var(--text3)",fontSize:"1rem"}}>✕</button>}
      </div>

      {adding && (
        <div className="card" style={{marginBottom:20,border:`2px solid ${color}`,background:"var(--bg3)"}}>
          <h3 style={{fontWeight:700,marginBottom:4,color}}>{editId?"Edit":"Add New"} {type}</h3>
          <p style={{fontSize:"0.8rem",color:"var(--text3)",marginBottom:14}}>Fields marked * are required.</p>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(min(100%,240px),1fr))",gap:12}}>
            <div className="form-group" style={{marginBottom:0,gridColumn:"1/-1"}}>
              <label className="form-label">Title *</label>
              <input className="form-input" placeholder={`e.g. Chapter 3 ${type} — Real Numbers`} value={form.title} onChange={e=>setForm({...form,title:e.target.value})}/>
            </div>
            <div className="form-group" style={{marginBottom:0}}>
              <label className="form-label">Chapter</label>
              <input className="form-input" placeholder="e.g. Chapter 3" value={form.chapter} onChange={e=>setForm({...form,chapter:e.target.value})}/>
            </div>
            <div className="form-group" style={{marginBottom:0}}>
              <label className="form-label">Class</label>
              <select className="form-input form-select" value={form.class} onChange={e=>setForm({...form,class:e.target.value})}>
                {["5th","6th","7th","8th","9th","10th","1st PUC","2nd PUC"].map(c=><option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="form-group" style={{marginBottom:0}}>
              <label className="form-label">Subject</label>
              <select className="form-input form-select" value={form.subject} onChange={e=>setForm({...form,subject:e.target.value})}>
                {[...SCHOOL_SUBJECTS_5_8,"Physics","Chemistry","Biology","Commerce","Economics","Accountancy","Business Studies","Computer Science"].map(s=><option key={s}>{s}</option>)}
              </select>
            </div>
            <div className="form-group" style={{marginBottom:0}}>
              <label className="form-label">Board</label>
              <select className="form-input form-select" value={form.board} onChange={e=>setForm({...form,board:e.target.value})}>
                <option>State</option><option>CBSE</option><option>PUC</option>
              </select>
            </div>
          </div>
          <div className="form-group" style={{marginTop:12}}>
            <label className="form-label">Upload PDF / File {editId ? "(optional — leave blank to keep existing)" : "*"}</label>
            <div style={{border:"2px dashed var(--card-border)",borderRadius:"var(--radius-sm)",padding:"18px",textAlign:"center",cursor:"pointer",background:"var(--card)"}} onClick={() => fileInputRef.current && fileInputRef.current.click()}>
              <Icon name="upload" size={24} style={{color:"var(--text3)",display:"block",margin:"0 auto 6px"}}/>
              {selectedFile ? <p style={{color:"var(--accent)",fontSize:"0.875rem",fontWeight:600}}>{selectedFile.name}</p> : <p style={{color:"var(--text2)",fontSize:"0.875rem"}}>Click to browse or drag & drop</p>}
              <p style={{color:"var(--text3)",fontSize:"0.78rem",marginTop:2}}>PDF, DOC, DOCX — Max 25 MB</p>
              <input ref={fileInputRef} type="file" accept=".pdf,.doc,.docx" style={{display:"none"}} onChange={e => { if(e.target.files[0]) setSelectedFile(e.target.files[0]); }} />
            </div>
            {uploadError && <p style={{color:"#ef4444",fontSize:"0.8rem",marginTop:6}}>{uploadError}</p>}
          </div>
          <div style={{display:"flex",gap:10,marginTop:10}}>
            <button className="btn btn-primary" style={{background:`linear-gradient(135deg,${color},${color}cc)`,border:"none",opacity:uploading?0.6:1}} onClick={save} disabled={uploading}>
              <Icon name="check" size={15}/>{uploading ? "Uploading..." : editId?"Save Changes":"Upload"}
            </button>
            <button className="btn btn-secondary" onClick={() => { setAdding(false); setEditId(null); setSelectedFile(null); setUploadError(""); }}>Cancel</button>
          </div>
        </div>
      )}

      <div className="card">
        {filtered.length===0 ? (
          <div style={{textAlign:"center",padding:"30px 0",color:"var(--text3)"}}>
            {search ? `No ${type.toLowerCase()} matching "${search}"` : `No ${type.toLowerCase()} added yet.`}
          </div>
        ) : (
          <>
            <div style={{display:"flex",gap:8,padding:"8px 0 12px",borderBottom:"1px solid var(--card-border)",fontSize:"0.75rem",fontWeight:700,color:"var(--text3)"}}>
              <span style={{width:38}}></span>
              <span style={{flex:3}}>TITLE</span>
              <span style={{flex:1}}>CLASS</span>
              <span style={{flex:1}}>BOARD</span>
              <span style={{flex:1}}>DATE</span>
              <span style={{width:90,textAlign:"right"}}>ACTIONS</span>
            </div>
            {filtered.map((item,i) => (
              <div key={item.id} style={{display:"flex",flexWrap:"wrap",alignItems:"center",gap:8,padding:"11px 0",borderBottom:i<filtered.length-1?"1px solid var(--card-border)":"none"}}>
                <div style={{width:38,height:38,background:`${color}15`,borderRadius:9,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                  <Icon name={icon} size={18} style={{color}}/>
                </div>
                <div style={{flex:3,minWidth:0}}>
                  <div style={{fontWeight:600,fontSize:"0.88rem",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{item.title}</div>
                  <div style={{fontSize:"0.73rem",color:"var(--text3)",marginTop:1}}>{item.chapter&&`${item.chapter} · `}{item.subject}</div>
                </div>
                <div style={{flex:1,fontSize:"0.82rem",color:"var(--text2)"}}>Class {item.class}</div>
                <div style={{flex:1}}><span className="badge badge-blue">{item.board}</span></div>
                <div style={{flex:1,fontSize:"0.78rem",color:"var(--text3)"}}>{item.date}</div>
                <div style={{width:90,display:"flex",gap:4,justifyContent:"flex-end"}}>
                  <button className="btn btn-ghost btn-icon btn-sm" title="Edit" onClick={() => startEdit(item)} style={{color:"var(--navy)"}}><Icon name="edit" size={15}/></button>
                  <button className="btn btn-ghost btn-icon btn-sm" title="Delete" onClick={() => setDeleteConfirm(item)} style={{color:"#ef4444"}}><Icon name="trash" size={15}/></button>
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      {/* Delete confirm */}
      {deleteConfirm && (
        <div className="modal-overlay" onClick={() => setDeleteConfirm(null)}>
          <div className="modal" style={{maxWidth:380}} onClick={e=>e.stopPropagation()}>
            <div className="modal-header">
              <h2 style={{fontSize:"1.1rem",fontWeight:700,color:"#ef4444"}}>Confirm Delete</h2>
              <button className="btn btn-ghost btn-icon" onClick={() => setDeleteConfirm(null)}><Icon name="close" size={18}/></button>
            </div>
            <div className="modal-body">
              <p style={{color:"var(--text2)",fontSize:"0.9rem"}}>Delete <strong>"{deleteConfirm.title}"</strong>? This cannot be undone.</p>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setDeleteConfirm(null)}>Cancel</button>
              <button className="btn btn-primary" style={{background:"#ef4444",border:"none"}} onClick={async () => { try { await resourcesAPI.delete(deleteConfirm.id); setItems(prev=>prev.filter(x=>x.id!==deleteConfirm.id)); } catch(e){} setDeleteConfirm(null); }}>
                <Icon name="trash" size={15}/>Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ─── ADMIN: CHAPTERS ──────────────────────────────────────────────────────────
function AdminChapters({ chapters, setChapters }) {
  const blank = { name:"", class:"10th", subject:"Mathematics", board:"State", order:1 };
  const [form, setForm] = useState(blank);
  const [adding, setAdding] = useState(false);
  const [editId, setEditId] = useState(null);
  const [filterSubj, setFilterSubj] = useState("All");
  const [filterClass, setFilterClass] = useState("All");
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const allSubjects = ["All", ...Array.from(new Set(chapters.map(c => c.subject)))];
  const allClasses  = ["All", ...Array.from(new Set(chapters.map(c => c.class)))];

  const filtered = chapters.filter(c =>
    (filterSubj==="All" || c.subject===filterSubj) &&
    (filterClass==="All" || c.class===filterClass)
  );

  const save = () => {
    if (!form.name) return;
    if (editId) {
      setChapters(prev => prev.map(x => x.id===editId ? {...form,id:editId} : x));
      setEditId(null);
    } else {
      setChapters(prev => [...prev, {...form, id:Date.now()}]);
    }
    setAdding(false); setForm(blank);
  };

  return (
    <>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16,flexWrap:"wrap",gap:12}}>
        <h2 style={{fontFamily:"var(--font-display)",fontSize:"1.6rem"}}>Manage Chapters</h2>
        <button className="btn btn-primary" onClick={() => { setAdding(true); setEditId(null); setForm(blank); }}>
          <Icon name="plus" size={16}/>Add Chapter
        </button>
      </div>

      {adding && (
        <div className="card" style={{marginBottom:20,border:"2px solid var(--navy)",background:"var(--blue-light)"}}>
          <h3 style={{fontWeight:700,marginBottom:4,color:"var(--navy)"}}>{editId?"Edit":"Add New"} Chapter</h3>
          <p style={{fontSize:"0.8rem",color:"var(--text3)",marginBottom:14}}>Add a chapter for any class, subject and board.</p>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(min(100%,240px),1fr))",gap:12}}>
            <div className="form-group" style={{marginBottom:0,gridColumn:"1/-1"}}>
              <label className="form-label">Chapter Name *</label>
              <input className="form-input" placeholder="e.g. Chapter 10 — Circles" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
            </div>
            <div className="form-group" style={{marginBottom:0}}>
              <label className="form-label">Class</label>
              <select className="form-input form-select" value={form.class} onChange={e=>setForm({...form,class:e.target.value})}>
                {["5th","6th","7th","8th","9th","10th","1st PUC","2nd PUC"].map(c=><option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="form-group" style={{marginBottom:0}}>
              <label className="form-label">Subject</label>
              <select className="form-input form-select" value={form.subject} onChange={e=>setForm({...form,subject:e.target.value})}>
                {[...SCHOOL_SUBJECTS_5_8,"Physics","Chemistry","Biology","Commerce","Economics","Accountancy","Business Studies"].map(s=><option key={s}>{s}</option>)}
              </select>
            </div>
            <div className="form-group" style={{marginBottom:0}}>
              <label className="form-label">Board</label>
              <select className="form-input form-select" value={form.board} onChange={e=>setForm({...form,board:e.target.value})}>
                <option>State</option><option>CBSE</option><option>PUC</option>
              </select>
            </div>
            <div className="form-group" style={{marginBottom:0}}>
              <label className="form-label">Chapter Number</label>
              <input className="form-input" type="number" min="1" value={form.order} onChange={e=>setForm({...form,order:parseInt(e.target.value)||1})}/>
            </div>
          </div>
          <div style={{display:"flex",gap:10,marginTop:14}}>
            <button className="btn btn-primary" onClick={save}><Icon name="check" size={15}/>{editId?"Save Changes":"Add Chapter"}</button>
            <button className="btn btn-secondary" onClick={() => { setAdding(false); setEditId(null); }}>Cancel</button>
          </div>
        </div>
      )}

      {/* Filter chips */}
      <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:12}}>
        <span style={{fontSize:"0.78rem",fontWeight:700,color:"var(--text3)",alignSelf:"center",marginRight:4}}>Subject:</span>
        {allSubjects.map(s => (
          <button key={s} onClick={() => setFilterSubj(s)}
            style={{padding:"4px 12px",borderRadius:20,border:`1.5px solid ${filterSubj===s?"var(--navy)":"var(--card-border)"}`,
              background:filterSubj===s?"var(--navy)":"var(--card)",color:filterSubj===s?"white":"var(--text2)",
              fontSize:"0.78rem",fontWeight:600,cursor:"pointer"}}>{s}</button>
        ))}
      </div>
      <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:16}}>
        <span style={{fontSize:"0.78rem",fontWeight:700,color:"var(--text3)",alignSelf:"center",marginRight:4}}>Class:</span>
        {allClasses.map(c => (
          <button key={c} onClick={() => setFilterClass(c)}
            style={{padding:"4px 12px",borderRadius:20,border:`1.5px solid ${filterClass===c?"var(--accent)":"var(--card-border)"}`,
              background:filterClass===c?"var(--accent)":"var(--card)",color:filterClass===c?"white":"var(--text2)",
              fontSize:"0.78rem",fontWeight:600,cursor:"pointer"}}>{c}</button>
        ))}
      </div>

      <div className="card">
        {filtered.length===0 ? (
          <div style={{textAlign:"center",padding:"30px 0",color:"var(--text3)"}}>No chapters found for this filter.</div>
        ) : (
          <>
            <div style={{display:"flex",gap:8,flexWrap:"wrap",padding:"8px 0 12px",borderBottom:"1px solid var(--card-border)",fontSize:"0.75rem",fontWeight:700,color:"var(--text3)"}}>
              <span style={{width:36}}>#</span>
              <span style={{flex:3,minWidth:0}}>CHAPTER NAME</span>
              <span style={{flex:1,minWidth:100}}>CLASS</span>
              <span style={{flex:1,minWidth:100}}>BOARD</span>
              <span style={{width:90,textAlign:"right"}}>ACTIONS</span>
            </div>
            {filtered.sort((a,b)=>a.order-b.order).map((ch,i) => (
              <div key={ch.id} style={{display:"flex",flexWrap:"wrap",alignItems:"center",gap:8,padding:"11px 0",borderBottom:i<filtered.length-1?"1px solid var(--card-border)":"none"}}>
                <div style={{width:36,height:36,background:"var(--blue-light)",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontWeight:700,color:"var(--navy)",fontSize:"0.82rem"}}>{ch.order}</div>
                <div style={{flex:3,minWidth:0}}>
                  <div style={{fontWeight:600,fontSize:"0.88rem",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{ch.name}</div>
                  <div style={{fontSize:"0.73rem",color:"var(--text3)",marginTop:1}}>{ch.subject}</div>
                </div>
                <div style={{flex:1,fontSize:"0.82rem",color:"var(--text2)"}}>Class {ch.class}</div>
                <div style={{flex:1}}><span className="badge badge-blue">{ch.board}</span></div>
                <div style={{width:90,display:"flex",gap:4,justifyContent:"flex-end"}}>
                  <button className="btn btn-ghost btn-icon btn-sm" title="Edit"
                    onClick={() => { setForm({name:ch.name,class:ch.class,subject:ch.subject,board:ch.board,order:ch.order}); setEditId(ch.id); setAdding(true); }}
                    style={{color:"var(--navy)"}}><Icon name="edit" size={15}/></button>
                  <button className="btn btn-ghost btn-icon btn-sm" title="Delete"
                    onClick={() => setDeleteConfirm(ch)} style={{color:"#ef4444"}}><Icon name="trash" size={15}/></button>
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      {deleteConfirm && (
        <div className="modal-overlay" onClick={() => setDeleteConfirm(null)}>
          <div className="modal" style={{maxWidth:380}} onClick={e=>e.stopPropagation()}>
            <div className="modal-header">
              <h2 style={{fontSize:"1.1rem",fontWeight:700,color:"#ef4444"}}>Delete Chapter?</h2>
              <button className="btn btn-ghost btn-icon" onClick={() => setDeleteConfirm(null)}><Icon name="close" size={18}/></button>
            </div>
            <div className="modal-body">
              <p style={{color:"var(--text2)",fontSize:"0.9rem"}}>Delete <strong>"{deleteConfirm.name}"</strong>? This cannot be undone.</p>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setDeleteConfirm(null)}>Cancel</button>
              <button className="btn btn-primary" style={{background:"#ef4444",border:"none"}}
                onClick={() => { setChapters(prev=>prev.filter(x=>x.id!==deleteConfirm.id)); setDeleteConfirm(null); }}>
                <Icon name="trash" size={15}/>Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ─── ADMIN: STUDENTS ──────────────────────────────────────────────────────────
function AdminStudents({ students, setStudents }) {
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [search, setSearch] = useState("");
  const filtered = students.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.email.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16,flexWrap:"wrap",gap:12}}>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <button className="btn btn-secondary btn-sm" onClick={() => window.history.back()} style={{display:"inline-flex",alignItems:"center",gap:8}}><Icon name="back" size={14}/>Back</button>
          <h2 style={{fontFamily:"var(--font-display)",fontSize:"1.6rem",margin:0}}>Registered Students</h2>
        </div>
        <span className="badge badge-blue" style={{fontSize:"0.85rem",padding:"5px 14px"}}>{students.length} students</span>
      </div>
      <div className="search-bar" style={{marginBottom:16}}>
        <Icon name="search" size={16} style={{color:"var(--text3)"}}/>
        <input style={{border:"none",background:"transparent",outline:"none",flex:1,fontSize:"0.9rem"}}
          placeholder="Search by name or email..." value={search} onChange={e=>setSearch(e.target.value)}/>
        {search && <button onClick={()=>setSearch("")} style={{border:"none",background:"none",cursor:"pointer",color:"var(--text3)"}}>✕</button>}
      </div>
      <div className="card">
        {filtered.map((s,i) => (
          <div key={s.id} style={{display:"flex",flexWrap:"wrap",alignItems:"center",gap:10,padding:"12px 0",borderBottom:i<filtered.length-1?"1px solid var(--card-border)":"none"}}>
            <div style={{width:38,height:38,borderRadius:9,background:"linear-gradient(135deg,#1e3a6e,#122348)",display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontWeight:700,fontSize:"0.85rem",flexShrink:0}}>{s.name.charAt(0)}</div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontWeight:600,fontSize:"0.9rem"}}>{s.name}</div>
              <div style={{fontSize:"0.75rem",color:"var(--text3)"}}>{s.email}</div>
            </div>
            <div style={{fontSize:"0.82rem",color:"var(--text2)",width:80}}>Class {s.class}</div>
            <span className="badge badge-blue" style={{width:60,textAlign:"center"}}>{s.board}</span>
            <div style={{fontSize:"0.78rem",color:"var(--text3)",width:90}}>{s.joined}</div>
            {!s.approved ? (
              <button className="btn btn-primary btn-sm" title="Approve student" onClick={async () => {
                try {
                  await studentsAPI.approve(s.id);
                  setStudents(prev => prev.map(x => x.id===s.id ? {...x, approved:true} : x));
                } catch(e) { alert(e.message || e); }
              }} style={{marginRight:8}}>Approve</button>
            ) : null}
            <button className="btn btn-ghost btn-icon btn-sm" title="Remove student" onClick={() => setDeleteConfirm(s)} style={{color:"#ef4444"}}><Icon name="trash" size={15}/></button>
          </div>
        ))}
        {filtered.length===0 && <p style={{textAlign:"center",color:"var(--text3)",padding:"20px 0"}}>No students found.</p>}
      </div>
      {deleteConfirm && (
        <div className="modal-overlay" onClick={() => setDeleteConfirm(null)}>
          <div className="modal" style={{maxWidth:380}} onClick={e=>e.stopPropagation()}>
            <div className="modal-header">
              <h2 style={{fontSize:"1.1rem",fontWeight:700,color:"#ef4444"}}>Remove Student?</h2>
              <button className="btn btn-ghost btn-icon" onClick={() => setDeleteConfirm(null)}><Icon name="close" size={18}/></button>
            </div>
            <div className="modal-body">
              <p style={{color:"var(--text2)",fontSize:"0.9rem"}}>Remove <strong>{deleteConfirm.name}</strong> from the platform?</p>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setDeleteConfirm(null)}>Cancel</button>
              <button className="btn btn-primary" style={{background:"#ef4444",border:"none"}}
                onClick={() => { setStudents(prev=>prev.filter(x=>x.id!==deleteConfirm.id)); setDeleteConfirm(null); }}>
                <Icon name="trash" size={15}/>Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ─── ADMIN: VIDEOS ────────────────────────────────────────────────────────────
function AdminVideos({ videos, setVideos }) {
  const blank = { title:"", url:"", subject:"Mathematics", class:"9th", board:"", chapter:"" };
  const [form, setForm] = useState(blank);
  const [adding, setAdding] = useState(false);
  const [editId, setEditId] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Load videos from API on mount
  useEffect(() => {
    setLoading(true);
    videosAPI.list().then(res => {
      setVideos(res.videos || []);
    }).catch(e => {
      setError("Could not load videos: " + e.message);
    }).finally(() => setLoading(false));
  }, []);

  const needs910Board = form.class === "9th" || form.class === "10th";

  const normalizeUrl = (url) => {
    if (url.includes("youtu.be/")) return "https://www.youtube.com/watch?v=" + url.split("youtu.be/")[1].split("?")[0];
    if (url.includes("/embed/")) return "https://www.youtube.com/watch?v=" + url.split("/embed/")[1].split("?")[0];
    return url;
  };

  const save = async () => {
    if (!form.title || !form.url) return;
    if (needs910Board && !form.board) { setError("Please select State or CBSE board for Class 9th/10th."); return; }
    setError(""); setSaving(true);
    const payload = { ...form, url: normalizeUrl(form.url), board: needs910Board ? form.board : null };
    try {
      if (editId) {
        const res = await videosAPI.update(editId, payload);
        setVideos(prev => prev.map(x => x.id===editId ? res.video : x));
        setEditId(null);
      } else {
        const res = await videosAPI.create(payload);
        setVideos(prev => [res.video, ...prev]);
      }
      setAdding(false); setForm(blank);
    } catch(e) {
      setError("Save failed: " + e.message);
    } finally { setSaving(false); }
  };

  const doDelete = async () => {
    try {
      await videosAPI.delete(deleteConfirm.id);
      setVideos(prev => prev.filter(x => x.id !== deleteConfirm.id));
      setDeleteConfirm(null);
    } catch(e) { setError("Delete failed: " + e.message); }
  };

  return (
    <>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:24}}>
        <h2 style={{fontFamily:"var(--font-display)",fontSize:"1.6rem"}}>YouTube Video Links</h2>
        <button className="btn btn-primary" style={{background:"linear-gradient(135deg,#ef4444,#dc2626)",border:"none"}}
          onClick={() => { setAdding(true); setEditId(null); setForm(blank); setError(""); }}>
          <Icon name="plus" size={16}/>Add Video
        </button>
      </div>
      {error && <div style={{background:"#fef2f2",border:"1px solid #fca5a5",borderRadius:8,padding:"10px 14px",color:"#dc2626",fontSize:"0.85rem",marginBottom:14}}>{error}</div>}
      {adding && (
        <div className="card" style={{marginBottom:20,border:"2px solid #ef4444",background:"#fef2f2"}}>
          <h3 style={{fontWeight:700,marginBottom:4,color:"#ef4444"}}>{editId?"Edit":"Add"} YouTube Video</h3>
          <p style={{fontSize:"0.8rem",color:"var(--text3)",marginBottom:14}}>Paste any YouTube URL — watch, short or embed links all work.</p>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(min(100%,240px),1fr))",gap:12}}>
            <div className="form-group" style={{marginBottom:0,gridColumn:"1/-1"}}>
              <label className="form-label">YouTube URL *</label>
              <input className="form-input" placeholder="https://www.youtube.com/watch?v=..." value={form.url} onChange={e=>setForm({...form,url:e.target.value})}/>
            </div>
            <div className="form-group" style={{marginBottom:0,gridColumn:"1/-1"}}>
              <label className="form-label">Video Title *</label>
              <input className="form-input" placeholder="e.g. Chapter 1 — Introduction to Real Numbers" value={form.title} onChange={e=>setForm({...form,title:e.target.value})}/>
            </div>
            <div className="form-group" style={{marginBottom:0}}>
              <label className="form-label">Class</label>
              <select className="form-input form-select" value={form.class} onChange={e=>setForm({...form,class:e.target.value,board:""})}>
                {["5th","6th","7th","8th","9th","10th","1st PUC","2nd PUC"].map(c=><option key={c}>{c}</option>)}
              </select>
            </div>
            {needs910Board && (
              <div className="form-group" style={{marginBottom:0}}>
                <label className="form-label" style={{color:"#dc2626",fontWeight:700}}>Board * (9th &amp; 10th)</label>
                <select className="form-input form-select" value={form.board} onChange={e=>setForm({...form,board:e.target.value})}
                  style={{borderColor: form.board?"":"#ef4444", background: form.board?"":"#fff5f5"}}>
                  <option value="">— Select Board —</option>
                  <option value="State">State Board</option>
                  <option value="CBSE">CBSE</option>
                </select>
              </div>
            )}
            <div className="form-group" style={{marginBottom:0}}>
              <label className="form-label">Subject</label>
              <select className="form-input form-select" value={form.subject} onChange={e=>setForm({...form,subject:e.target.value})}>
                {[...SCHOOL_SUBJECTS_5_8,"Physics","Chemistry","Biology","Commerce","Economics","Accountancy"].map(s=><option key={s}>{s}</option>)}
              </select>
            </div>
            <div className="form-group" style={{marginBottom:0}}>
              <label className="form-label">Chapter</label>
              <input className="form-input" placeholder="e.g. Chapter 1" value={form.chapter} onChange={e=>setForm({...form,chapter:e.target.value})}/>
            </div>
          </div>
          <div style={{display:"flex",gap:10,marginTop:14}}>
            <button className="btn btn-primary" style={{background:"linear-gradient(135deg,#ef4444,#dc2626)",border:"none"}} onClick={save} disabled={saving}>
              <Icon name="check" size={15}/>{saving?"Saving...":(editId?"Save Changes":"Add Video")}
            </button>
            <button className="btn btn-secondary" onClick={() => { setAdding(false); setEditId(null); setError(""); }}>Cancel</button>
          </div>
        </div>
      )}
      <div className="card">
        {loading && <p style={{textAlign:"center",color:"var(--text3)",padding:"20px 0"}}>Loading videos...</p>}
        {!loading && videos.length===0 && <p style={{textAlign:"center",color:"var(--text3)",padding:"20px 0"}}>No videos added yet.</p>}
        {videos.map((v,i) => (
          <div key={v.id} style={{display:"flex",flexWrap:"wrap",alignItems:"center",gap:10,padding:"13px 0",borderBottom:i<videos.length-1?"1px solid var(--card-border)":"none"}}>
            <div style={{width:40,height:40,background:"#ef444415",borderRadius:9,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#ef4444"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontWeight:600,fontSize:"0.88rem"}}>{v.title}</div>
              <div style={{fontSize:"0.73rem",color:"var(--text3)",marginTop:1}}>
                Class {v.class}{v.board ? <span style={{background:"#dbeafe",color:"#1d4ed8",borderRadius:4,padding:"1px 5px",marginLeft:4,fontWeight:700}}>{v.board}</span> : ""} · {v.subject}{v.chapter?` · ${v.chapter}`:""}
              </div>
              <a href={v.url} target="_blank" rel="noopener noreferrer" style={{fontSize:"0.73rem",color:"#ef4444",display:"block",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",textDecoration:"none"}}>{v.url}</a>
            </div>
            <a href={v.url} target="_blank" rel="noopener noreferrer" style={{display:"inline-flex",alignItems:"center",gap:5,background:"#ef444415",color:"#ef4444",padding:"6px 10px",borderRadius:7,fontSize:"0.78rem",fontWeight:600,textDecoration:"none",flexShrink:0}}>Open</a>
            <button className="btn btn-ghost btn-icon btn-sm" title="Edit" onClick={() => { setForm({title:v.title,url:v.url,subject:v.subject||"Mathematics",class:v.class||"9th",board:v.board||"",chapter:v.chapter||""}); setEditId(v.id); setAdding(true); setError(""); }} style={{color:"var(--navy)"}}><Icon name="edit" size={15}/></button>
            <button className="btn btn-ghost btn-icon btn-sm" title="Delete" onClick={() => setDeleteConfirm(v)} style={{color:"#ef4444"}}><Icon name="trash" size={15}/></button>
          </div>
        ))}
      </div>
      {deleteConfirm && (
        <div className="modal-overlay" onClick={() => setDeleteConfirm(null)}>
          <div className="modal" style={{maxWidth:380}} onClick={e=>e.stopPropagation()}>
            <div className="modal-header">
              <h2 style={{fontSize:"1.1rem",fontWeight:700,color:"#ef4444"}}>Delete Video?</h2>
              <button className="btn btn-ghost btn-icon" onClick={() => setDeleteConfirm(null)}><Icon name="close" size={18}/></button>
            </div>
            <div className="modal-body">
              <p style={{color:"var(--text2)",fontSize:"0.9rem"}}>Delete <strong>"{deleteConfirm.title}"</strong>?</p>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setDeleteConfirm(null)}>Cancel</button>
              <button className="btn btn-primary" style={{background:"#ef4444",border:"none"}} onClick={doDelete}>
                <Icon name="trash" size={15}/>Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function AdminSubjects() {
  return (
    <>
      <h2 style={{fontFamily:"var(--font-display)",fontSize:"1.8rem",marginBottom:24}}>Manage Subjects</h2>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(min(100%,260px),1fr))",gap:24}}>
        <div className="card">
          <h3 style={{fontWeight:700,marginBottom:16}}>School — Classes 5–8</h3>
          {SCHOOL_SUBJECTS_5_8.map((s,i) => (
            <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 0",borderBottom:i<SCHOOL_SUBJECTS_5_8.length-1?"1px solid var(--card-border)":"none"}}>
              <Icon name="book" size={16} style={{color:"var(--accent)"}}/>
              <span style={{flex:1,fontWeight:500,fontSize:"0.9rem"}}>{s}</span>
              <button className="btn btn-ghost btn-icon" style={{width:32,height:32}}><Icon name="edit" size={14}/></button>
            </div>
          ))}
        </div>
        <div className="card">
          <h3 style={{fontWeight:700,marginBottom:16}}>College — Science</h3>
          {Object.entries(SCIENCE_STREAMS).map(([stream,subjects]) => (
            <div key={stream} style={{marginBottom:16}}>
              <div style={{fontWeight:700,fontSize:"0.85rem",color:"var(--green)",marginBottom:8}}>{stream}</div>
              {subjects.map(s => (
                <div key={s} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 0",paddingLeft:12}}>
                  <div style={{width:4,height:4,borderRadius:"50%",background:"var(--green)"}}/>
                  <span style={{fontSize:"0.875rem"}}>{s}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function AdminFeedback({ feedbacks, setFeedbacks }) {
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  return (
    <>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:24}}>
        <h2 style={{fontFamily:"var(--font-display)",fontSize:"1.8rem"}}>Student Feedback</h2>
        <span className="badge badge-blue">{feedbacks.length} reviews</span>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:16}}>
        {feedbacks.map((f,i) => (
          <div key={f.id||i} className="card">
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10}}>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <div style={{width:40,height:40,borderRadius:10,background:"linear-gradient(135deg,#1e3a6e,#122348)",border:"2px solid #c9a227",display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontWeight:700}}>{f.name.charAt(0)}</div>
                <div><div style={{fontWeight:700}}>{f.name}</div><div style={{fontSize:"0.78rem",color:"var(--text3)"}}>{f.date}</div></div>
              </div>
              <div style={{display:"flex",alignItems:"center",gap:8}}>
                <div style={{display:"flex",gap:2}}>
                  {[1,2,3,4,5].map(n=><Icon key={n} name="star" size={14} style={{color:n<=f.rating?"#f59e0b":"var(--card-border)",fill:n<=f.rating?"#f59e0b":"none"}}/>)}
                </div>
                <button className="btn btn-ghost btn-icon btn-sm" title="Delete" onClick={() => setDeleteConfirm(f)} style={{color:"#ef4444"}}><Icon name="trash" size={15}/></button>
              </div>
            </div>
            <p style={{color:"var(--text2)",fontSize:"0.9rem",lineHeight:1.6}}>{f.message}</p>
          </div>
        ))}
        {feedbacks.length===0 && <p style={{textAlign:"center",color:"var(--text3)",padding:"20px 0"}}>No feedback yet.</p>}
      </div>
      {deleteConfirm && (
        <div className="modal-overlay" onClick={() => setDeleteConfirm(null)}>
          <div className="modal" style={{maxWidth:380}} onClick={e=>e.stopPropagation()}>
            <div className="modal-header">
              <h2 style={{fontSize:"1.1rem",fontWeight:700,color:"#ef4444"}}>Delete Feedback?</h2>
              <button className="btn btn-ghost btn-icon" onClick={() => setDeleteConfirm(null)}><Icon name="close" size={18}/></button>
            </div>
            <div className="modal-body">
              <p style={{color:"var(--text2)",fontSize:"0.9rem"}}>Remove feedback from <strong>{deleteConfirm.name}</strong>?</p>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setDeleteConfirm(null)}>Cancel</button>
              <button className="btn btn-primary" style={{background:"#ef4444",border:"none"}}
                onClick={() => { setFeedbacks(prev=>prev.filter(x=>x!==deleteConfirm)); setDeleteConfirm(null); }}>
                <Icon name="trash" size={15}/>Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function AdminContactMessages({ messages, setMessages }) {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    contactAPI.list().then(d => { setMessages(d.messages || []); }).catch(()=>{}).finally(()=>setLoading(false));
  }, []);
  return (
    <>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:24}}>
        <h2 style={{fontFamily:"var(--font-display)",fontSize:"1.8rem"}}>Contact Messages</h2>
        <span className="badge badge-blue">{messages.length} messages</span>
      </div>
      {loading && <p style={{textAlign:"center",color:"var(--text3)",padding:"20px 0"}}>Loading...</p>}
      <div style={{display:"flex",flexDirection:"column",gap:16}}>
        {messages.map((m,i) => (
          <div key={m.id||i} className="card">
            <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:10}}>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <div style={{width:40,height:40,borderRadius:10,background:"linear-gradient(135deg,#1e3a6e,#122348)",border:"2px solid #c9a227",display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontWeight:700}}>
                  {(m.name||"?").charAt(0).toUpperCase()}
                </div>
                <div>
                  <div style={{fontWeight:700}}>{m.name||"Anonymous"}</div>
                  <div style={{fontSize:"0.78rem",color:"var(--text3)"}}>{m.email||""}{m.phone ? " · "+m.phone : ""}</div>
                </div>
              </div>
              <div style={{fontSize:"0.75rem",color:"var(--text3)"}}>{m.created_at ? new Date(m.created_at).toLocaleString("en-IN") : ""}</div>
            </div>
            <p style={{color:"var(--text2)",fontSize:"0.9rem",lineHeight:1.6,background:"var(--bg2)",padding:"10px 14px",borderRadius:8}}>{m.message}</p>
            <div style={{marginTop:10}}>
              <a href={`mailto:${m.email}?subject=Re: Your message to JC Resource Lab`} className="btn btn-secondary btn-sm" style={{textDecoration:"none",display:"inline-flex",alignItems:"center",gap:6}}>
                <Icon name="mail" size={14}/> Reply via Email
              </a>
            </div>
          </div>
        ))}
        {!loading && messages.length===0 && <p style={{textAlign:"center",color:"var(--text3)",padding:"20px 0"}}>No messages yet.</p>}
      </div>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(React.createElement(App));
