import { useState } from "react";

const C = {
    ignite: "#FF4D1C", blueprint: "#1C3FFF",
    surge: "#00C896", canvas: "#F5F4F0",
    midGray: "#888880",
};

const SERVICES = [
    { id: "mvp", title: "MVP in 90 Days", price: "$12,000", desc: "Full design + dev sprint. Figma → shipped product.", includes: ["Product scoping", "UI/UX design", "Frontend + backend", "Deployment & docs"], color: C.blueprint },
    { id: "cto", title: "Fractional CTO", price: "$3,500/mo", desc: "Senior tech leadership without the full-time cost.", includes: ["Tech strategy", "Hiring support", "Architecture review", "Weekly standups"], color: C.surge },
    { id: "squad", title: "Dev Squad", price: "From $8,000", desc: "A dedicated team of 2–4 engineers for your project.", includes: ["Team of 2-4 engineers", "Agile sprints", "Daily comms", "QA included"], color: C.ignite },
];

export default function BuildPage({ setPage, showToast }) {
    const [selected, setSelected] = useState(null);
    return <div className="page">
        <style>{`
      .build-hero{padding:80px 48px 60px;border-bottom:1px solid rgba(245,244,240,.06);}
      .build-hl{font-family:'DM Serif Display',serif;font-size:clamp(48px,6vw,80px);letter-spacing:-.03em;line-height:1;margin-bottom:20px;}
      .services-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:2px;padding:48px;background:rgba(245,244,240,.02);}
      .service-card{padding:44px 36px;position:relative;overflow:hidden;cursor:none;}
      .service-card::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:var(--sc);transform:scaleX(0);transform-origin:left;transition:transform .4s;}
      .service-card:hover::before{transform:scaleX(1);}
      .service-card:hover{background:rgba(245,244,240,.02);}
      .service-price{font-family:'DM Serif Display',serif;font-size:36px;letter-spacing:-.02em;margin:16px 0 8px;}
      .service-desc{font-size:14px;color:#888880;line-height:1.6;margin-bottom:24px;}
      .service-includes{list-style:none;display:flex;flex-direction:column;gap:10px;margin-bottom:28px;}
      .service-includes li{font-size:13px;color:#888880;display:flex;gap:10px;align-items:flex-start;}
      .service-includes li::before{content:'✓';color:var(--sc);font-family:'DM Mono',monospace;font-size:11px;margin-top:2px;flex-shrink:0;}
      .process-section{padding:80px 48px;border-top:1px solid rgba(245,244,240,.06);}
      .trusted-section{padding:80px 48px;border-top:1px solid rgba(245,244,240,.06);background:rgba(245,244,240,.015);}
      .logos-row{display:flex;gap:32px;flex-wrap:wrap;margin-top:40px;align-items:center;}
      .logo-pill{font-family:'DM Mono',monospace;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#444;padding:10px 20px;border:1px solid rgba(245,244,240,.07);}
      @media(max-width:900px){.services-grid{grid-template-columns:1fr;padding:24px;}.build-hero,.process-section,.trusted-section{padding:60px 24px;}}
    `}</style>
        <div className="build-hero">
            <div className="s-label">and build</div>
            <h1 className="build-hl anim-fade-up">You have the idea.<br /><span style={{ color: C.blueprint }}>We have the team.</span></h1>
            <p style={{ fontSize: 15, color: '#888880', maxWidth: 520, lineHeight: 1.65 }}>Fractional CTOs. Dev squads. Design sprints. We're the tech partnership arm for student startups and local businesses ready to build.</p>
        </div>
        <div className="services-grid">
            {SERVICES.map(s => <div key={s.id} className="service-card card" style={{ '--sc': s.color }} data-hover>
                <div className="s-label" style={{ marginBottom: 16 }}>{s.id.toUpperCase()}</div>
                <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 22, letterSpacing: '-.02em' }}>{s.title}</div>
                <div className="service-price" style={{ color: s.color }}>{s.price}</div>
                <div className="service-desc">{s.desc}</div>
                <ul className="service-includes">{s.includes.map(i => <li key={i}>{i}</li>)}</ul>
                <button className="btn btn-outline" data-hover onClick={() => { setSelected(s); }}>Get Started</button>
            </div>)}
        </div>

        {/* PROCESS */}
        <section className="process-section">
            <div className="s-label">How It Works</div>
            {[
                { n: "01", t: "Discovery Call", d: "30-minute call to understand your product, goals, and constraints. No commitment required." },
                { n: "02", t: "Proposal & Team Match", d: "We send a detailed proposal within 48 hours. You meet your matched team before signing." },
                { n: "03", t: "Sprint Kickoff", d: "Kick off your first sprint within 5 days. Weekly demos, daily async updates." },
                { n: "04", t: "Ship & Hand Off", d: "You own everything. Full source code, docs, and a handoff call so your team can take over." },
            ].map(s => <div key={s.n} className="step">
                <div className="step-num">{s.n}</div>
                <div><div className="step-title">{s.t}</div><div className="step-desc">{s.d}</div></div>
            </div>)}
        </section>

        {/* TRUSTED */}
        <section className="trusted-section">
            <div className="s-label">Trusted By Builders From</div>
            <div className="logos-row">
                {["Lagos", "Bangalore", "Nairobi", "Jakarta", "Buenos Aires", "Cairo", "Manila", "Dhaka"].map(c => <div key={c} className="logo-pill">{c}</div>)}
            </div>
            <div style={{ marginTop: 48 }}>
                <button className="btn btn-primary" onClick={() => setPage('apply')}>Work With Us</button>
            </div>
        </section>

        {selected && <div className="modal-overlay" onClick={() => setSelected(null)}>
            <div className="modal" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <div>
                        <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, letterSpacing: '.12em', textTransform: 'uppercase', color: '#888880', marginBottom: 8 }}>{selected.id}</div>
                        <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 22 }}>{selected.title}</div>
                        <div style={{ fontFamily: "'DM Serif Display',serif", fontSize: 28, color: selected.color, marginTop: 6 }}>{selected.price}</div>
                    </div>
                    <button className="modal-close" onClick={() => setSelected(null)}>✕</button>
                </div>
                <div className="modal-body">
                    <div className="form-group" style={{ marginBottom: 16 }}>
                        <label className="form-label">Your Name</label>
                        <input className="form-input" placeholder="Amara Diallo" />
                    </div>
                    <div className="form-group" style={{ marginBottom: 16 }}>
                        <label className="form-label">Email</label>
                        <input className="form-input" placeholder="amara@startup.com" />
                    </div>
                    <div className="form-group" style={{ marginBottom: 24 }}>
                        <label className="form-label">Tell us about your project</label>
                        <textarea className="form-input form-textarea" placeholder="We're building a…" />
                    </div>
                    <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => { showToast("Request submitted! We'll be in touch within 48hrs."); setSelected(null); }}>Submit Request</button>
                </div>
            </div>
        </div>}
    </div>;
}
