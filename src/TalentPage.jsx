import { useState } from "react";

const C = {
    ignite: "#FF4D1C", blueprint: "#1C3FFF",
    surge: "#00C896", canvas: "#F5F4F0",
    midGray: "#888880",
};

const TALENT = [
    { id: 1, name: "Arjun Mehta", role: "Full-Stack Engineer", avatar: "AM", color: "#1C3FFF", skills: ["React", "Node.js", "PostgreSQL", "AWS"], rate: "$95/hr", location: "Bangalore, IN", bio: "5 years building SaaS at scale. Previously at Razorpay.", available: true, projects: 12 },
    { id: 2, name: "Zainab Osei", role: "Product Designer", avatar: "ZO", color: "#FF4D1C", skills: ["Figma", "Motion Design", "Design Systems", "UX Research"], rate: "$80/hr", location: "Lagos, NG", bio: "Crafting interfaces that feel inevitable. Ex-Flutterwave.", available: true, projects: 8 },
    { id: 3, name: "Matías Vera", role: "ML Engineer", avatar: "MV", color: "#00C896", skills: ["PyTorch", "LLMs", "MLOps", "Python"], rate: "$110/hr", location: "Buenos Aires, AR", bio: "Building AI systems that actually ship to production.", available: false, projects: 6 },
    { id: 4, name: "Priya Anand", role: "Backend Engineer", avatar: "PA", color: "#888880", skills: ["Go", "Kubernetes", "Redis", "Kafka"], rate: "$90/hr", location: "Chennai, IN", bio: "Distributed systems specialist. Open-source contributor.", available: true, projects: 15 },
    { id: 5, name: "Léa Dubois", role: "Growth Marketer", avatar: "LD", color: "#FF4D1C", skills: ["SEO", "Paid Ads", "Analytics", "CRO"], rate: "$70/hr", location: "Paris, FR", bio: "0→1 growth for 7 funded startups. Data-first approach.", available: true, projects: 20 },
    { id: 6, name: "Omar Farouk", role: "Blockchain Dev", avatar: "OF", color: "#1C3FFF", skills: ["Solidity", "Rust", "Web3.js", "DeFi"], rate: "$120/hr", location: "Cairo, EG", bio: "Building the decentralized future, one contract at a time.", available: true, projects: 9 },
];

function TalentCard({ t, onView, showToast }) {
    return <div className="talent-card card" onClick={onView} data-hover>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
            <div className="talent-avatar" style={{ background: t.color + '22', color: t.color }}>{t.avatar}</div>
            {t.available && <span className="verified-badge">✓ Available</span>}
        </div>
        <div className="talent-name">{t.name}</div>
        <div className="talent-role">{t.role} · {t.location}</div>
        <div className="talent-skills">{t.skills.map(s => <span key={s} className="tag">{s}</span>)}</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="talent-rate">{t.rate}</span>
            <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, color: '#444', letterSpacing: '.08em' }}>{t.projects} projects</span>
        </div>
    </div>;
}

function TalentModal({ t, onClose, showToast }) {
    return <div className="modal-overlay" onClick={onClose}>
        <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
                <div>
                    <div className="talent-avatar" style={{ background: t.color + '22', color: t.color, marginBottom: 12 }}>{t.avatar}</div>
                    <div style={{ fontWeight: 800, fontSize: 22 }}>{t.name}</div>
                    <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: '#888880', letterSpacing: '.06em', marginTop: 4 }}>{t.role} · {t.location}</div>
                </div>
                <button className="modal-close" onClick={onClose}>✕</button>
            </div>
            <div className="modal-body">
                <p style={{ fontSize: 14, color: '#888880', lineHeight: 1.7, marginBottom: 24 }}>{t.bio}</p>
                <div style={{ marginBottom: 20 }}>
                    <div className="form-label" style={{ marginBottom: 10 }}>Skills</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>{t.skills.map(s => <span key={s} className="tag">{s}</span>)}</div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 28 }}>
                    <div className="cohort-stat"><div className="cohort-stat-num">{t.rate}</div><div className="cohort-stat-label">Hourly Rate</div></div>
                    <div className="cohort-stat"><div className="cohort-stat-num">{t.projects}</div><div className="cohort-stat-label">Projects Done</div></div>
                </div>
                {t.available
                    ? <button className="btn btn-ignite" style={{ width: '100%', justifyContent: 'center' }} onClick={() => { showToast(`Request sent to ${t.name}!`); onClose(); }}>Request to Connect</button>
                    : <button className="btn btn-outline" style={{ width: '100%', justifyContent: 'center', opacity: .5 }} disabled>Not Available</button>}
            </div>
        </div>
    </div>;
}

export default function TalentPage({ showToast }) {
    const [filter, setFilter] = useState('All');
    const [search, setSearch] = useState('');
    const [selected, setSelected] = useState(null);
    const roles = ['All', 'Engineer', 'Designer', 'Marketer', 'ML / AI', 'Blockchain'];
    const filtered = TALENT.filter(t => {
        const matchRole = filter === 'All' || t.role.toLowerCase().includes(filter.toLowerCase()) ||
            (filter === 'ML / AI' && t.role.includes('ML')) || (filter === 'Blockchain' && t.role.includes('Block'));
        const matchSearch = !search || t.name.toLowerCase().includes(search.toLowerCase()) || t.role.toLowerCase().includes(search.toLowerCase()) || t.skills.some(s => s.toLowerCase().includes(search.toLowerCase()));
        return matchRole && matchSearch;
    });
    return <div className="page">
        <style>{`
      .talent-hero{padding:80px 48px 60px;border-bottom:1px solid rgba(245,244,240,.06);}
      .talent-hl{font-family:'DM Serif Display',serif;font-size:clamp(48px,6vw,80px);letter-spacing:-.03em;line-height:1;margin-bottom:20px;}
      .talent-search{background:rgba(245,244,240,.04);border:1px solid rgba(245,244,240,.1);color:#F5F4F0;padding:14px 20px;font-size:15px;outline:none;width:100%;max-width:400px;font-family:'Syne',sans-serif;transition:border-color .2s;}
      .talent-search:focus{border-color:rgba(245,244,240,.35);}
      .talent-search::placeholder{color:#444;}
      .filters{display:flex;gap:8px;flex-wrap:wrap;margin-top:24px;}
      .talent-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:2px;padding:48px;background:rgba(245,244,240,.02);}
      @media(max-width:900px){.talent-grid{grid-template-columns:repeat(2,1fr);}}
      @media(max-width:600px){.talent-grid{grid-template-columns:1fr;padding:24px;}.talent-hero{padding:60px 24px 40px;}}
    `}</style>
        <div className="talent-hero">
            <div className="s-label">and talent</div>
            <h1 className="talent-hl anim-fade-up">Verified freelancers.<br /><span style={{ color: C.ignite }}>Premium matching.</span></h1>
            <p style={{ fontSize: 15, color: '#888880', maxWidth: 520, lineHeight: 1.65, marginBottom: 28 }}>Every builder on and talent is manually vetted. No spam profiles, no race to the bottom. Real trust signals from day one.</p>
            <input className="talent-search" placeholder="Search by name, role, or skill…" value={search} onChange={e => setSearch(e.target.value)} />
            <div className="filters">
                {roles.map(r => <button key={r} className={`tag${filter === r ? ' active' : ''}`} onClick={() => setFilter(r)} data-hover>{r}</button>)}
            </div>
        </div>
        <div className="talent-grid">
            {filtered.length === 0
                ? <div style={{ gridColumn: '1/-1', padding: '60px 0', textAlign: 'center', color: '#444', fontFamily: "'DM Mono',monospace", fontSize: 12, letterSpacing: '.08em' }}>NO BUILDERS FOUND</div>
                : filtered.map(t => <TalentCard key={t.id} t={t} onView={() => setSelected(t)} showToast={showToast} />)}
        </div>
        {selected && <TalentModal t={selected} onClose={() => setSelected(null)} showToast={showToast} />}
    </div>;
}
