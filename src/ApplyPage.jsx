import { useState, useEffect, useRef } from "react";

/* ─── HOOKS ─────────────────────────────────────────────── */
function useWindowWidth() {
    const [w, setW] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
    useEffect(() => {
        const h = () => setW(window.innerWidth);
        window.addEventListener('resize', h);
        return () => window.removeEventListener('resize', h);
    }, []);
    return w;
}

/* ─── DESIGN TOKENS ─────────────────────────────────────── */
const C = {
    void: "#0A0A0A", ignite: "#FF4D1C", blueprint: "#1C3FFF",
    surge: "#00C896", canvas: "#F5F4F0", midGray: "#888880",
};

/* ─── GLOBAL STYLES ─────────────────────────────────────── */
const G = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Syne:wght@400;600;700;800&family=DM+Mono:wght@400;500&family=Fraunces:ital,opsz,wght@0,9..144,300;1,9..144,600&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
  html,body{height:100%;}
  body{font-family:'Syne',sans-serif;overflow-x:hidden;}
  button{border:none;cursor:pointer;font-family:inherit;}
  input,textarea,select{font-family:inherit;}

  @keyframes fadeUp{from{opacity:0;transform:translateY(20px);}to{opacity:1;transform:translateY(0);}}
  @keyframes fadeIn{from{opacity:0;}to{opacity:1;}}
  @keyframes slideLeft{from{opacity:0;transform:translateX(24px);}to{opacity:1;transform:translateX(0);}}
  @keyframes float{0%,100%{transform:translateY(0px);}50%{transform:translateY(-12px);}}
  @keyframes rotate{from{transform:rotate(0deg);}to{transform:rotate(360deg);}}
  @keyframes pulse{0%,100%{opacity:.4;transform:scale(1);}50%{opacity:1;transform:scale(1.05);}}
  @keyframes scanline{0%{top:-8%;}100%{top:108%;}}
  @keyframes blink{0%,100%{opacity:1;}49%{opacity:1;}50%,99%{opacity:0;}}
  @keyframes marqueeV{0%{transform:translateY(0);}100%{transform:translateY(-50%);}}
  @keyframes shimmer{0%{background-position:-200% 0;}100%{background-position:200% 0;}}
  @keyframes drawBorder{from{stroke-dashoffset:1000;}to{stroke-dashoffset:0;}}

  .anim-fade-up{animation:fadeUp .6s ease both;}
  .anim-fade-up-1{animation:fadeUp .6s .1s ease both;}
  .anim-fade-up-2{animation:fadeUp .6s .2s ease both;}
  .anim-fade-up-3{animation:fadeUp .6s .3s ease both;}
  .anim-fade-up-4{animation:fadeUp .6s .4s ease both;}
  .anim-slide-left{animation:slideLeft .5s ease both;}

  /* ── RESPONSIVE BASE ── */
  @media(max-width:768px){
    /* Nav switcher stacks on mobile */
    .switcher-nav{ flex-wrap:wrap; gap:8px; padding:12px 16px !important; }
    .switcher-tabs{ order:2; width:100%; justify-content:center; }
    .switcher-auth{ order:3; width:100%; justify-content:center; }
    .switcher-logo{ order:1; }

    /* Talent signup right panel */
    .talent-right-panel{ padding:40px 24px !important; max-width:100% !important; }

    /* Build signup inner */
    .build-inner{ padding:40px 20px !important; }
    .build-grid-2{ grid-template-columns:1fr !important; }
    .build-cards-3{ grid-template-columns:1fr !important; }
    .build-summary-grid{ grid-template-columns:1fr 1fr !important; }
    .corner-mark{ display:none !important; }

    /* Accelerate */
    .acc-steps-grid{ grid-template-columns:1fr !important; }
    .acc-stats-row{ grid-template-columns:1fr 1fr !important; }

    /* Sign in panels */
    .tsi-right{ padding:40px 24px !important; max-width:100% !important; }
    .bsi-inner{ padding:40px 24px !important; }
    .asi-inner{ padding:48px 24px !important; }

    /* Generic 2-col grids used in step forms */
    .two-col-grid{ grid-template-columns:1fr !important; gap:20px !important; }
  }

  @media(max-width:480px){
    .switcher-tabs button{ padding:7px 10px !important; font-size:9px !important; letter-spacing:.06em !important; }
    .switcher-auth button{ padding:6px 10px !important; font-size:9px !important; }
    .build-nav-btns{ flex-direction:column-reverse !important; gap:10px !important; }
    .build-nav-btns button{ width:100% !important; justify-content:center; }
    .ts-btn-primary,.ts-btn-outline{ padding:12px 20px !important; }
    .acc-stage-grid{ grid-template-columns:1fr !important; }
  }
`;

/* ─── NAV SWITCHER ───────────────────────────────────────── */
function Switcher({ active, setActive, onLogoClick, authMode, setAuthMode }) {
    const colors = { talent: C.ignite, build: C.blueprint, accelerate: C.surge };
    const activeColor = colors[active];
    const w = useWindowWidth();
    const isMobile = w < 600;
    const isSmall = w < 768;
    return (
        <div className="switcher-nav" style={{
            position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
            background: 'rgba(10,10,10,.92)', backdropFilter: 'blur(16px)',
            borderBottom: '1px solid rgba(245,244,240,.08)',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            flexWrap: isMobile ? 'wrap' : 'nowrap',
            padding: isMobile ? '12px 16px' : '16px 32px',
            gap: isMobile ? '8px' : '0'
        }}>
            <div className="switcher-logo" onClick={onLogoClick} style={{
                fontFamily: "'DM Serif Display',serif", fontSize: 22, color: '#F5F4F0',
                cursor: 'pointer', opacity: 1, transition: 'opacity .2s',
                ...(isMobile && { order: 1 })
            }}
                onMouseEnter={e => e.currentTarget.style.opacity = '.5'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >and.</div>

            <div className="switcher-tabs" style={{ display: 'flex', gap: 4, background: 'rgba(255,255,255,.04)', padding: 4, ...(isMobile && { width: '100%', justifyContent: 'center', order: 2 }) }}>
                {[
                    { id: 'talent', label: 'and talent', color: C.ignite },
                    { id: 'build', label: 'and build', color: C.blueprint },
                    { id: 'accelerate', label: 'and accelerate', color: C.surge },
                ].map(t => (
                    <button key={t.id} onClick={() => setActive(t.id)} style={{
                        padding: '8px 20px',
                        background: active === t.id ? t.color : 'transparent',
                        color: active === t.id ? '#fff' : '#888880',
                        fontFamily: "'DM Mono',monospace", fontSize: 11, letterSpacing: '.1em',
                        textTransform: 'uppercase', transition: 'all .25s', border: 'none',
                    }}>{isMobile ? t.id.charAt(0).toUpperCase() + t.id.slice(1) : isSmall ? t.id : t.label}</button>
                ))}
            </div>

            {/* Auth mode toggle */}
            <div className="switcher-auth" style={{ display: 'flex', gap: 0, border: `1px solid rgba(245,244,240,.1)`, ...(isMobile && { width: '100%', justifyContent: 'center', order: 3 }) }}>
                {['signup', 'signin'].map(m => (
                    <button key={m} onClick={() => setAuthMode(m)} style={{
                        padding: '7px 16px',
                        background: authMode === m ? activeColor : 'transparent',
                        color: authMode === m ? '#fff' : '#888880',
                        fontFamily: "'DM Mono',monospace", fontSize: 10, letterSpacing: '.08em',
                        textTransform: 'uppercase', transition: 'all .25s', border: 'none', cursor: 'pointer',
                    }}>{m === 'signup' ? 'Sign Up' : 'Sign In'}</button>
                ))}
            </div>
        </div>
    );
}

/* ══════════════════════════════════════════════════════════
   PAGE 1 — AND TALENT
   Aesthetic: Editorial fashion magazine. Split-screen. 
   Vertical marquee of skills. Bold serif. Warm dark tone.
══════════════════════════════════════════════════════════ */
function TalentSignup({ authMode, setAuthMode }) {
    const isMobile = useWindowWidth() < 600;
    const [step, setStep] = useState(1); // 1=identity, 2=craft, 3=rate
    const [form, setForm] = useState({
        name: '', location: '', headline: '',
        skills: [], rate: 80, availability: '', bio: '',
        portfolio: '', email: '', password: ''
    });
    const [hoveredSkill, setHoveredSkill] = useState(null);

    const ALL_SKILLS = [
        "React", "Node.js", "Python", "Figma", "Motion Design",
        "Go", "Rust", "ML / AI", "PostgreSQL", "iOS", "Android",
        "Design Systems", "Solidity", "DevOps", "AWS", "Copywriting",
        "SEO", "Growth", "Branding", "Product Strategy"
    ];

    const MARQUEE_WORDS = [...ALL_SKILLS, ...ALL_SKILLS];

    const toggleSkill = (s) => {
        setForm(f => ({
            ...f,
            skills: f.skills.includes(s) ? f.skills.filter(x => x !== s) : [...f.skills, s]
        }));
    };

    const upd = (k, v) => setForm(f => ({ ...f, [k]: v }));

    if (authMode === 'signin') return <TalentSignIn setAuthMode={setAuthMode} />;
    if (authMode === 'forgot') return <TalentForgotPassword setAuthMode={setAuthMode} />;

    return (
        <div style={{ minHeight: '100vh', background: '#0F0D0A', paddingTop: isMobile ? 112 : 64, display: 'flex', fontFamily: "'Syne',sans-serif" }}>
            <style>{`
        .talent-signup-left{
          flex: 0 0 420px; background: #0F0D0A;
          border-right: 1px solid rgba(245,244,240,.07);
          display: flex; flex-direction: column;
          position: sticky; top: 64px; height: calc(100vh - 64px);
          overflow: hidden;
        }
        .talent-skill-marquee{
          display: flex; flex-direction: column;
          animation: marqueeV 20s linear infinite;
          width: max-content;
        }
        .ts-input{
          background: transparent; border: none;
          border-bottom: 1px solid rgba(245,244,240,.12);
          color: #F5F4F0; padding: 14px 0; font-size: 16px;
          font-family: 'Syne',sans-serif; width: 100%; outline: none;
          transition: border-color .2s;
        }
        .ts-input:focus{ border-bottom-color: #FF4D1C; }
        .ts-input::placeholder{ color: #3a3630; }
        .ts-label{
          font-family: 'DM Mono',monospace; font-size: 10px;
          letter-spacing: .15em; text-transform: uppercase;
          color: #888880; margin-bottom: 6px; display: block;
        }
        .ts-skill-tag{
          padding: 8px 16px; border: 1px solid rgba(245,244,240,.1);
          font-family: 'DM Mono',monospace; font-size: 11px;
          letter-spacing: .06em; text-transform: uppercase;
          color: #888880; cursor: pointer; transition: all .2s;
          background: transparent;
        }
        .ts-skill-tag:hover{ border-color: rgba(255,77,28,.5); color: #F5F4F0; }
        .ts-skill-tag.active{
          background: rgba(255,77,28,.12); border-color: rgba(255,77,28,.6);
          color: #FF4D1C;
        }
        .ts-step-dot{
          width: 8px; height: 8px; border-radius: 50%;
          border: 1px solid rgba(245,244,240,.2); transition: all .3s;
        }
        .ts-step-dot.active{ background: #FF4D1C; border-color: #FF4D1C; }
        .ts-step-dot.done{ background: rgba(255,77,28,.4); border-color: rgba(255,77,28,.4); }
        .ts-btn-primary{
          background: #FF4D1C; color: #fff;
          padding: 14px 28px; font-family: 'DM Mono',monospace;
          font-size: 12px; letter-spacing: .08em; text-transform: uppercase;
          border: none; cursor: pointer; transition: all .2s;
        }
        .ts-btn-primary:hover{ background: #e03a10; transform: translateY(-2px); }
        .ts-btn-outline{
          background: transparent; color: #888880;
          padding: 14px 28px; font-family: 'DM Mono',monospace;
          font-size: 12px; letter-spacing: .08em; text-transform: uppercase;
          border: 1px solid rgba(245,244,240,.12); cursor: pointer; transition: all .2s;
        }
        .ts-btn-outline:hover{ color: #F5F4F0; border-color: rgba(245,244,240,.3); }
        .rate-slider{
          -webkit-appearance: none; width: 100%; height: 2px;
          background: rgba(245,244,240,.1); outline: none; cursor: pointer;
        }
        .rate-slider::-webkit-slider-thumb{
          -webkit-appearance: none; width: 16px; height: 16px;
          border-radius: 50%; background: #FF4D1C; cursor: pointer;
        }
        @media(max-width:900px){ .talent-signup-left{ display: none; } }
      `}</style>

            {/* LEFT PANEL — Vertical skill marquee */}
            <div className="talent-signup-left">
                {/* Header */}
                <div style={{ padding: '40px 40px 32px', borderBottom: '1px solid rgba(245,244,240,.06)' }}>
                    <div style={{ fontFamily: "'DM Serif Display',serif", fontSize: 13, letterSpacing: '.05em', color: '#888880', marginBottom: 6, fontStyle: 'italic' }}>
                        The freelancer marketplace for
                    </div>
                    <div style={{
                        fontFamily: "'DM Serif Display',serif", fontSize: 38,
                        letterSpacing: '-.02em', color: '#F5F4F0', lineHeight: 1
                    }}>builders who<br /><span style={{ color: C.ignite }}>charge their worth.</span></div>
                </div>

                {/* Vertical marquee */}
                <div style={{ flex: 1, overflow: 'hidden', position: 'relative', borderBottom: '1px solid rgba(245,244,240,.06)' }}>
                    {/* Top/bottom fade */}
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 80, background: 'linear-gradient(to bottom, #0F0D0A, transparent)', zIndex: 2 }} />
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 80, background: 'linear-gradient(to top, #0F0D0A, transparent)', zIndex: 2 }} />
                    <div style={{ padding: '80px 40px', display: 'flex', gap: 24 }}>
                        {/* Column 1 */}
                        <div style={{ overflow: 'hidden', flex: 1 }}>
                            <div className="talent-skill-marquee">
                                {MARQUEE_WORDS.filter((_, i) => i % 2 === 0).map((s, i) => (
                                    <div key={i} style={{
                                        padding: '10px 0', fontFamily: "'DM Mono',monospace",
                                        fontSize: 11, letterSpacing: '.1em', textTransform: 'uppercase',
                                        color: form.skills.includes(s) ? C.ignite : '#3a3630',
                                        borderBottom: '1px solid rgba(245,244,240,.04)',
                                        whiteSpace: 'nowrap', transition: 'color .3s'
                                    }}>{s}</div>
                                ))}
                            </div>
                        </div>
                        {/* Column 2 — reverse */}
                        <div style={{ overflow: 'hidden', flex: 1 }}>
                            <div style={{ animation: 'marqueeV 28s linear infinite reverse', display: 'flex', flexDirection: 'column', width: 'max-content' }}>
                                {MARQUEE_WORDS.filter((_, i) => i % 2 === 1).map((s, i) => (
                                    <div key={i} style={{
                                        padding: '10px 0', fontFamily: "'DM Mono',monospace",
                                        fontSize: 11, letterSpacing: '.1em', textTransform: 'uppercase',
                                        color: form.skills.includes(s) ? C.ignite : '#2a2826',
                                        borderBottom: '1px solid rgba(245,244,240,.03)',
                                        whiteSpace: 'nowrap', transition: 'color .3s'
                                    }}>{s}</div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div style={{ padding: '24px 40px', display: 'flex', gap: 0 }}>
                    {[{ n: '1,200+', l: 'Builders' }, { n: '34', l: 'Countries' }, { n: '$95', l: 'Avg Rate' }].map((s, i) => (
                        <div key={s.l} style={{
                            flex: 1, paddingRight: 24,
                            borderRight: i < 2 ? '1px solid rgba(245,244,240,.06)' : 'none',
                            paddingLeft: i > 0 ? 24 : 0
                        }}>
                            <div style={{ fontFamily: "'DM Serif Display',serif", fontSize: 26, color: '#F5F4F0', letterSpacing: '-.02em' }}>{s.n}</div>
                            <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, letterSpacing: '.12em', textTransform: 'uppercase', color: '#888880', marginTop: 3 }}>{s.l}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* RIGHT PANEL — Form */}
            <div className="talent-right-panel" style={{ flex: 1, padding: '60px 64px', overflowY: 'auto', maxWidth: 640 }}>
                {/* Progress dots */}
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 48 }}>
                    {[1, 2, 3].map(n => (
                        <div key={n} className={`ts-step-dot ${step === n ? 'active' : step > n ? 'done' : ''}`} />
                    ))}
                    <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, letterSpacing: '.1em', color: '#888880', marginLeft: 8 }}>
                        {step === 1 ? 'Identity' : step === 2 ? 'Your Craft' : 'Rates & Availability'}
                    </span>
                </div>

                {/* STEP 1 */}
                {step === 1 && (
                    <div className="anim-fade-up">
                        <div style={{ fontFamily: "'DM Serif Display',serif", fontSize: 'clamp(40px,5vw,64px)', letterSpacing: '-.03em', lineHeight: .92, marginBottom: 12, color: '#F5F4F0' }}>
                            Who are<br />you, builder?
                        </div>
                        <p style={{ fontSize: 14, color: '#888880', lineHeight: 1.7, marginBottom: 48 }}>Start with the basics. Your profile is your pitch.</p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
                            <div className="two-col-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}>
                                <div>
                                    <label className="ts-label">Full Name *</label>
                                    <input className="ts-input" placeholder="Amara Diallo" value={form.name} onChange={e => upd('name', e.target.value)} />
                                </div>
                                <div>
                                    <label className="ts-label">Email *</label>
                                    <input className="ts-input" placeholder="you@domain.com" type="email" value={form.email} onChange={e => upd('email', e.target.value)} />
                                </div>
                            </div>
                            <div className="two-col-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}>
                                <div>
                                    <label className="ts-label">Password *</label>
                                    <input className="ts-input" placeholder="••••••••" type="password" value={form.password} onChange={e => upd('password', e.target.value)} />
                                </div>
                                <div>
                                    <label className="ts-label">Location</label>
                                    <input className="ts-input" placeholder="Lagos, NG" value={form.location} onChange={e => upd('location', e.target.value)} />
                                </div>
                            </div>
                            <div>
                                <label className="ts-label">Your One-Line Pitch</label>
                                <input className="ts-input" placeholder="Full-stack engineer specialising in high-scale SaaS" value={form.headline} onChange={e => upd('headline', e.target.value)} />
                            </div>
                            <div>
                                <label className="ts-label">Bio <span style={{ color: '#444' }}>(optional)</span></label>
                                <textarea className="ts-input" style={{ minHeight: 90, resize: 'vertical', lineHeight: 1.6 }} placeholder="Tell clients what makes you different…" value={form.bio} onChange={e => upd('bio', e.target.value)} />
                            </div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 48 }}>
                            <button className="ts-btn-primary" onClick={() => setStep(2)}>Next: Your Craft →</button>
                        </div>
                    </div>
                )}

                {/* STEP 2 */}
                {step === 2 && (
                    <div className="anim-fade-up">
                        <div style={{ fontFamily: "'DM Serif Display',serif", fontSize: 'clamp(40px,5vw,64px)', letterSpacing: '-.03em', lineHeight: .92, marginBottom: 12, color: '#F5F4F0' }}>
                            What do<br />you <span style={{ color: C.ignite, fontStyle: 'italic' }}>build?</span>
                        </div>
                        <p style={{ fontSize: 14, color: '#888880', lineHeight: 1.7, marginBottom: 48 }}>Select all skills that describe your work. Be honest — we verify everything.</p>

                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 40 }}>
                            {ALL_SKILLS.map(s => (
                                <button key={s} className={`ts-skill-tag ${form.skills.includes(s) ? 'active' : ''}`} onClick={() => toggleSkill(s)}>{s}</button>
                            ))}
                        </div>

                        {form.skills.length > 0 && (
                            <div style={{ padding: '16px 20px', background: 'rgba(255,77,28,.06)', border: '1px solid rgba(255,77,28,.15)', marginBottom: 40, animation: 'fadeIn .3s ease' }}>
                                <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, letterSpacing: '.1em', textTransform: 'uppercase', color: C.ignite, marginBottom: 8 }}>
                                    {form.skills.length} skill{form.skills.length > 1 ? 's' : ''} selected
                                </div>
                                <div style={{ fontSize: 13, color: '#888880' }}>{form.skills.join(' · ')}</div>
                            </div>
                        )}

                        <div>
                            <label className="ts-label">Portfolio URL</label>
                            <input className="ts-input" placeholder="your-site.com or github.com/you" value={form.portfolio} onChange={e => upd('portfolio', e.target.value)} />
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 48 }}>
                            <button className="ts-btn-outline" onClick={() => setStep(1)}>← Back</button>
                            <button className="ts-btn-primary" onClick={() => setStep(3)}>Next: Rates →</button>
                        </div>
                    </div>
                )}

                {/* STEP 3 */}
                {step === 3 && (
                    <div className="anim-fade-up">
                        <div style={{ fontFamily: "'DM Serif Display',serif", fontSize: 'clamp(40px,5vw,64px)', letterSpacing: '-.03em', lineHeight: .92, marginBottom: 12, color: '#F5F4F0' }}>
                            Name your<br /><span style={{ color: C.ignite, fontStyle: 'italic' }}>price.</span>
                        </div>
                        <p style={{ fontSize: 14, color: '#888880', lineHeight: 1.7, marginBottom: 48 }}>Set your hourly rate. You can update this anytime.</p>

                        {/* Rate slider */}
                        <div style={{ marginBottom: 48 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 20 }}>
                                <label className="ts-label">Hourly Rate</label>
                                <div style={{ fontFamily: "'DM Serif Display',serif", fontSize: 56, color: '#F5F4F0', letterSpacing: '-.03em', lineHeight: 1 }}>
                                    ${form.rate}<span style={{ fontSize: 18, color: '#888880', letterSpacing: '-.01em' }}>/hr</span>
                                </div>
                            </div>
                            <input type="range" className="rate-slider" min={20} max={300} value={form.rate} onChange={e => upd('rate', +e.target.value)} />
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
                                <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, color: '#444' }}>$20</span>
                                <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, color: '#444' }}>$300</span>
                            </div>
                            {/* Rate context */}
                            <div style={{ marginTop: 16, padding: '12px 16px', background: 'rgba(245,244,240,.03)', borderLeft: `2px solid ${form.rate < 60 ? '#888880' : form.rate < 120 ? C.ignite : C.surge}` }}>
                                <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, letterSpacing: '.1em', color: form.rate < 60 ? '#888880' : form.rate < 120 ? C.ignite : C.surge }}>
                                    {form.rate < 60 ? 'ENTRY · Getting started' : form.rate < 120 ? 'MID-MARKET · Competitive rate' : 'PREMIUM · You\'re worth it'}
                                </span>
                            </div>
                        </div>

                        {/* Availability */}
                        <div style={{ marginBottom: 48 }}>
                            <label className="ts-label" style={{ marginBottom: 16 }}>Availability</label>
                            <div style={{ display: 'flex', gap: 8 }}>
                                {['Full-time', 'Part-time', 'Project basis'].map(a => (
                                    <button key={a} onClick={() => upd('availability', a)} style={{
                                        padding: '10px 18px', border: `1px solid ${form.availability === a ? C.ignite : 'rgba(245,244,240,.1)'}`,
                                        background: form.availability === a ? 'rgba(255,77,28,.1)' : 'transparent',
                                        color: form.availability === a ? C.ignite : '#888880',
                                        fontFamily: "'DM Mono',monospace", fontSize: 11, letterSpacing: '.06em',
                                        textTransform: 'uppercase', cursor: 'pointer', transition: 'all .2s'
                                    }}>{a}</button>
                                ))}
                            </div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <button className="ts-btn-outline" onClick={() => setStep(2)}>← Back</button>
                            <button className="ts-btn-primary">Join and talent ✓</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

/* ══════════════════════════════════════════════════════════
   PAGE 2 — AND BUILD
   Aesthetic: Blueprint / technical. Grid paper background.
   Monospace dominant. Deep navy + blueprint blue. Very 
   structured, form-like, almost like a technical spec sheet.
══════════════════════════════════════════════════════════ */
function BuildSignup({ authMode, setAuthMode }) {
    const isMobile = useWindowWidth() < 600;
    const [step, setStep] = useState(1); // 1=company, 2=project, 3=team
    const [form, setForm] = useState({
        company: '', website: '', email: '', password: '',
        stage: '', vertical: '', description: '',
        service: '', budget: '', timeline: '',
        teamSize: '', cto: ''
    });
    const [focused, setFocused] = useState(null);

    const upd = (k, v) => setForm(f => ({ ...f, [k]: v }));

    const VERTICALS = ['FinTech', 'EdTech', 'HealthTech', 'CleanTech', 'HR Tech', 'Legal Tech', 'AgriTech', 'Other'];
    const STAGES = ['Pre-idea', 'Idea Stage', 'Prototype', 'Early Revenue', 'Growth'];
    const SERVICES = [
        { id: 'mvp', label: 'MVP in 90 Days', price: '$12K', desc: 'Figma → shipped product' },
        { id: 'cto', label: 'Fractional CTO', price: '$3.5K/mo', desc: 'Tech leadership' },
        { id: 'squad', label: 'Dev Squad', price: 'From $8K', desc: '2–4 engineers' },
    ];

    if (authMode === 'signin') return <BuildSignIn setAuthMode={setAuthMode} />;
    if (authMode === 'forgot') return <BuildForgotPassword setAuthMode={setAuthMode} />;
    return (
        <div style={{ minHeight: '100vh', background: '#06080F', paddingTop: isMobile ? 112 : 64, fontFamily: "'Space Mono',monospace" }}>
            <style>{`
        .build-signup {
          background-image:
            linear-gradient(rgba(100,140,255,.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(100,140,255,.08) 1px, transparent 1px);
          background-size: 32px 32px;
          min-height: calc(100vh - 64px);
        }
        .build-field{
          position: relative; margin-bottom: 28px;
        }
        .build-label{
          font-size: 10px; letter-spacing: .18em; text-transform: uppercase;
          color: #7BA4FF; display: block; margin-bottom: 8px;
          font-family: 'Space Mono',monospace; font-weight: 700;
        }
        .build-input{
          background: rgba(100,140,255,.07);
          border: 1px solid rgba(100,140,255,.35);
          color: #E8EEFF; padding: 13px 16px; font-size: 14px;
          font-family: 'Space Mono',monospace; width: 100%; outline: none;
          transition: all .2s;
        }
        .build-input:focus{
          border-color: #5B8AFF;
          background: rgba(100,140,255,.12);
          box-shadow: 0 0 0 3px rgba(100,140,255,.1);
        }
        .build-input::placeholder{ color: rgba(160,190,255,.35); }
        .build-input.active{ border-color: #5B8AFF; }
        .build-select{
          background: rgba(100,140,255,.07);
          border: 1px solid rgba(100,140,255,.35);
          color: #E8EEFF; padding: 13px 16px; font-size: 14px;
          font-family: 'Space Mono',monospace; width: 100%; outline: none;
          appearance: none; cursor: pointer; transition: all .2s;
        }
        .build-select:focus{ border-color: #5B8AFF; }
        .build-select option{ background: #0d1020; color: #E8EEFF; }
        .build-section-label{
          font-size: 9px; letter-spacing: .2em; text-transform: uppercase;
          color: #7BA4FF; border-bottom: 1px solid rgba(100,140,255,.25);
          padding-bottom: 8px; margin-bottom: 24px; display: flex;
          justify-content: space-between; align-items: center;
        }
        .build-card-select{
          border: 1px solid rgba(100,140,255,.3); padding: 20px;
          cursor: pointer; transition: all .2s; background: rgba(100,140,255,.05);
          position: relative; overflow: hidden;
        }
        .build-card-select::before{
          content: ''; position: absolute; left: 0; top: 0; bottom: 0;
          width: 3px; background: #5B8AFF; transform: scaleY(0);
          transform-origin: bottom; transition: transform .3s;
        }
        .build-card-select:hover{ border-color: rgba(100,140,255,.6); background: rgba(100,140,255,.1); }
        .build-card-select:hover::before,
        .build-card-select.active::before{ transform: scaleY(1); }
        .build-card-select.active{
          border-color: #5B8AFF;
          background: rgba(100,140,255,.15);
        }
        .build-tag{
          display: inline-block; padding: 7px 14px;
          border: 1px solid rgba(100,140,255,.3);
          font-size: 10px; letter-spacing: .08em; text-transform: uppercase;
          color: #9AB8FF; cursor: pointer; transition: all .2s;
          margin: 4px;
        }
        .build-tag:hover{ border-color: #5B8AFF; color: #E8EEFF; background: rgba(100,140,255,.1); }
        .build-tag.active{
          background: rgba(100,140,255,.2); border-color: #5B8AFF;
          color: #C0D8FF;
        }
        .build-btn{
          background: #3361FF; color: #fff; padding: 14px 32px;
          font-family: 'Space Mono',monospace; font-size: 11px;
          letter-spacing: .1em; text-transform: uppercase;
          border: none; cursor: pointer; transition: all .2s;
        }
        .build-btn:hover{ background: #4d77ff; transform: translateY(-1px); }
        .build-btn-outline{
          background: transparent; color: #9AB8FF;
          padding: 14px 32px; font-family: 'Space Mono',monospace;
          font-size: 11px; letter-spacing: .1em; text-transform: uppercase;
          border: 1px solid rgba(100,140,255,.35); cursor: pointer; transition: all .2s;
        }
        .build-btn-outline:hover{ border-color: #5B8AFF; color: #E8EEFF; }
        .corner-mark{
          position: absolute; font-size: 9px; color: rgba(150,185,255,.5);
          font-family: 'Space Mono',monospace; letter-spacing: .1em;
        }
      `}</style>

            <div className="build-signup" style={{ position: 'relative' }}>
                {/* Corner marks */}
                <div className="corner-mark" style={{ top: 24, left: 24 }}>AND.BUILD — REGISTRATION</div>
                <div className="corner-mark" style={{ top: 24, right: 24 }}>STEP {step}/3</div>
                <div className="corner-mark" style={{ bottom: 24, left: 24 }}>v1.0.2026</div>
                <div className="corner-mark" style={{ bottom: 24, right: 24 }}>SECURE FORM</div>

                <div className="build-inner" style={{ maxWidth: 800, margin: '0 auto', padding: '60px 40px' }}>

                    {/* Header */}
                    <div style={{ marginBottom: 60, animation: 'fadeUp .5s ease' }}>
                        <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 10, letterSpacing: '.2em', textTransform: 'uppercase', color: '#7BA4FF', marginBottom: 12 }}>
              // and.build — startup registration
                        </div>
                        <h1 style={{
                            fontFamily: "'Fraunces',serif", fontSize: 'clamp(48px,6vw,76px)',
                            letterSpacing: '-.03em', lineHeight: .9, color: '#E8EEFF',
                            marginBottom: 16
                        }}>
                            {step === 1 ? <>Tell us about<br />your <span style={{ color: C.blueprint, fontStyle: 'italic' }}>company.</span></> :
                                step === 2 ? <>Define your<br /><span style={{ color: C.blueprint, fontStyle: 'italic' }}>project.</span></> :
                                    <>Your <span style={{ color: C.blueprint, fontStyle: 'italic' }}>team</span><br />& timeline.</>}
                        </h1>
                        <p style={{ fontSize: 13, color: '#9AB8FF', lineHeight: 1.7, maxWidth: 440 }}>
                            {step === 1 ? 'We review every submission personally. Be direct — no fluff needed.' :
                                step === 2 ? 'Help us understand exactly what you need to build.' :
                                    'Last step. Tell us about your current team and timeline.'}
                        </p>
                    </div>

                    {/* Progress bar */}
                    <div style={{ height: 2, background: 'rgba(100,140,255,.2)', marginBottom: 48, position: 'relative' }}>
                        <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', background: '#3361FF', width: `${(step / 3) * 100}%`, transition: 'width .4s ease' }} />
                        {[1, 2, 3].map(n => (
                            <div key={n} style={{
                                position: 'absolute', top: -4, left: `${((n - 1) / 2) * 100}%`,
                                width: 9, height: 9, background: step >= n ? '#3361FF' : '#06080F',
                                border: `1px solid ${step >= n ? '#3361FF' : 'rgba(100,140,255,.4)'}`,
                                transform: 'translateX(-50%)', transition: 'all .3s'
                            }} />
                        ))}
                    </div>

                    {/* STEP 1 — Company */}
                    {step === 1 && (
                        <div style={{ animation: 'fadeUp .5s ease' }}>
                            <div className="build-section-label"><span>01 — IDENTITY</span><span style={{ color: '#9AB8FF' }}>required fields marked *</span></div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                                <div className="build-field">
                                    <label className="build-label">Company / Project Name *</label>
                                    <input className="build-input" placeholder="Kazi Labs" value={form.company} onChange={e => upd('company', e.target.value)} />
                                </div>
                                <div className="build-field">
                                    <label className="build-label">Website (if any)</label>
                                    <input className="build-input" placeholder="kazi.io" value={form.website} onChange={e => upd('website', e.target.value)} />
                                </div>
                                <div className="build-field">
                                    <label className="build-label">Email *</label>
                                    <input className="build-input" placeholder="founder@kazi.io" type="email" value={form.email} onChange={e => upd('email', e.target.value)} />
                                </div>
                                <div className="build-field">
                                    <label className="build-label">Password *</label>
                                    <input className="build-input" placeholder="••••••••" type="password" value={form.password} onChange={e => upd('password', e.target.value)} />
                                </div>
                            </div>

                            <div style={{ marginBottom: 24 }}>
                                <div className="build-section-label" style={{ marginTop: 8 }}><span>02 — COMPANY STAGE</span></div>
                                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                    {STAGES.map(s => (
                                        <span key={s} className={`build-tag ${form.stage === s ? 'active' : ''}`} onClick={() => upd('stage', s)}>{s}</span>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <div className="build-section-label"><span>03 — VERTICAL</span></div>
                                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                    {VERTICALS.map(v => (
                                        <span key={v} className={`build-tag ${form.vertical === v ? 'active' : ''}`} onClick={() => upd('vertical', v)}>{v}</span>
                                    ))}
                                </div>
                            </div>

                            <div className="build-nav-btns" style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 48 }}>
                                <button className="build-btn" onClick={() => setStep(2)}>Next ▶</button>
                            </div>
                        </div>
                    )}

                    {/* STEP 2 — Project */}
                    {step === 2 && (
                        <div style={{ animation: 'fadeUp .5s ease' }}>
                            <div className="build-section-label"><span>04 — SERVICE REQUIRED</span></div>
                            <div className="build-cards-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 40 }}>
                                {SERVICES.map(s => (
                                    <div key={s.id} className={`build-card-select ${form.service === s.id ? 'active' : ''}`} onClick={() => upd('service', s.id)}>
                                        <div style={{ fontSize: 9, letterSpacing: '.15em', textTransform: 'uppercase', color: '#7BA4FF', marginBottom: 8 }}>{s.id.toUpperCase()}</div>
                                        <div style={{ fontFamily: "'Fraunces',serif", fontSize: 18, color: '#E8EEFF', marginBottom: 4, letterSpacing: '-.01em' }}>{s.label}</div>
                                        <div style={{ fontSize: 20, color: C.blueprint, fontWeight: 700, marginBottom: 6 }}>{s.price}</div>
                                        <div style={{ fontSize: 11, color: '#9AB8FF' }}>{s.desc}</div>
                                        {form.service === s.id && (
                                            <div style={{ position: 'absolute', top: 12, right: 12, width: 12, height: 12, background: C.blueprint, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <div style={{ width: 4, height: 4, background: '#fff' }} />
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            <div className="build-section-label"><span>05 — PROJECT BRIEF</span></div>
                            <div className="build-field">
                                <label className="build-label">What are you building? *</label>
                                <textarea className="build-input" style={{ minHeight: 120, resize: 'vertical', lineHeight: 1.7 }}
                                    placeholder="We're building an AI-powered logistics platform for West Africa. We have a Figma prototype and need a backend engineer and a frontend developer to ship an MVP in 10 weeks…"
                                    value={form.description} onChange={e => upd('description', e.target.value)} />
                            </div>

                            <div className="build-nav-btns" style={{ display: 'flex', justifyContent: 'space-between', marginTop: 48 }}>
                                <button className="build-btn-outline" onClick={() => setStep(1)}>◀ Back</button>
                                <button className="build-btn" onClick={() => setStep(3)}>Next ▶</button>
                            </div>
                        </div>
                    )}

                    {/* STEP 3 — Team & timeline */}
                    {step === 3 && (
                        <div style={{ animation: 'fadeUp .5s ease' }}>
                            <div className="build-section-label"><span>06 — TEAM CONTEXT</span></div>
                            <div className="build-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                                <div className="build-field">
                                    <label className="build-label">Current Team Size</label>
                                    <select className="build-select" value={form.teamSize} onChange={e => upd('teamSize', e.target.value)}>
                                        <option value="">Select…</option>
                                        <option>Solo founder</option>
                                        <option>2–3 people</option>
                                        <option>4–10 people</option>
                                        <option>10+</option>
                                    </select>
                                </div>
                                <div className="build-field">
                                    <label className="build-label">Do you have a CTO?</label>
                                    <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
                                        {['Yes', 'No', 'Need one'].map(o => (
                                            <span key={o} className={`build-tag ${form.cto === o ? 'active' : ''}`} style={{ margin: 0 }} onClick={() => upd('cto', o)}>{o}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="build-section-label"><span>07 — BUDGET & TIMELINE</span></div>
                            <div className="build-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                                <div className="build-field">
                                    <label className="build-label">Budget Range</label>
                                    <select className="build-select" value={form.budget} onChange={e => upd('budget', e.target.value)}>
                                        <option value="">Select…</option>
                                        <option>Under $5,000</option>
                                        <option>$5,000 – $15,000</option>
                                        <option>$15,000 – $50,000</option>
                                        <option>$50,000+</option>
                                    </select>
                                </div>
                                <div className="build-field">
                                    <label className="build-label">Ideal Start</label>
                                    <select className="build-select" value={form.timeline} onChange={e => upd('timeline', e.target.value)}>
                                        <option value="">Select…</option>
                                        <option>ASAP</option>
                                        <option>Within 2 weeks</option>
                                        <option>Within a month</option>
                                        <option>Flexible</option>
                                    </select>
                                </div>
                            </div>

                            {/* Summary box */}
                            <div style={{ padding: '24px', border: '1px solid rgba(100,140,255,.4)', background: 'rgba(100,140,255,.08)', marginTop: 8 }}>
                                <div className="build-section-label" style={{ marginBottom: 16, border: 'none', paddingBottom: 0 }}>SUBMISSION PREVIEW</div>
                                <div className="build-summary-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                                    {[
                                        ['Company', form.company || '—'],
                                        ['Stage', form.stage || '—'],
                                        ['Vertical', form.vertical || '—'],
                                        ['Service', SERVICES.find(s => s.id === form.service)?.label || '—'],
                                        ['Budget', form.budget || '—'],
                                        ['Start', form.timeline || '—'],
                                    ].map(([k, v]) => (
                                        <div key={k}>
                                            <div style={{ fontSize: 9, letterSpacing: '.15em', color: 'rgba(28,63,255,.4)', textTransform: 'uppercase', marginBottom: 3 }}>{k}</div>
                                            <div style={{ fontSize: 13, color: '#E8EEFF' }}>{v}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="build-nav-btns" style={{ display: 'flex', justifyContent: 'space-between', marginTop: 40 }}>
                                <button className="build-btn-outline" onClick={() => setStep(2)}>◀ Back</button>
                                <button className="build-btn">Submit Request ▶</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

/* ══════════════════════════════════════════════════════════
   PAGE 3 — AND ACCELERATE
   Aesthetic: Raw, kinetic. Stark black & white with 
   electric green. Big scanline effect. Almost brutalist.
   Inspired by protest posters meets startup urgency.
══════════════════════════════════════════════════════════ */
function AccelerateSignup({ authMode, setAuthMode }) {
    const isMobile = useWindowWidth() < 600;
    const [step, setStep] = useState(0); // 0=intro, 1-4=form
    const [form, setForm] = useState({
        name: '', email: '', password: '', country: '',
        company: '', stage: '',
        idea: '', problem: '', why: '',
        team: '', raised: '', cohort: ''
    });
    const [charCount, setCharCount] = useState(0);
    const [started, setStarted] = useState(false);

    const upd = (k, v) => setForm(f => ({ ...f, [k]: v }));

    const QUESTIONS = [
        {
            n: 1, of: 4,
            prompt: "Who are you?",
            sub: "Name, country, email, password. The basics.",
            fields: null, type: 'identity'
        },
        {
            n: 2, of: 4,
            prompt: "What are you building?",
            sub: "Be direct. One paragraph max. We read every word.",
            fields: null, type: 'idea'
        },
        {
            n: 3, of: 4,
            prompt: "Why does it matter?",
            sub: "What's the problem, and why are you the one to solve it?",
            fields: null, type: 'why'
        },
        {
            n: 4, of: 4,
            prompt: "Where are you now?",
            sub: "Stage, team, any funding. Honest answer only.",
            fields: null, type: 'context'
        }
    ];

    const STAGES = ['Just an idea', 'Prototype built', 'First users', 'Early revenue'];

    if (authMode === 'signin') return <AccelerateSignIn setAuthMode={setAuthMode} />;
    if (authMode === 'forgot') return <AccelerateForgotPassword setAuthMode={setAuthMode} />;
    return (
        <div style={{ minHeight: '100vh', background: '#0A0A0A', paddingTop: isMobile ? 112 : 64, fontFamily: "'Syne',sans-serif", position: 'relative', overflow: 'hidden' }}>
            <style>{`
        .acc-signup-scanline{
          position: fixed; left: 0; right: 0; height: 8px;
          background: linear-gradient(to bottom, transparent, rgba(0,200,150,.04), transparent);
          animation: scanline 6s linear infinite;
          pointer-events: none; z-index: 1;
        }
        .acc-input-big{
          background: transparent; border: none;
          border-bottom: 2px solid rgba(245,244,240,.12);
          color: #F5F4F0; font-size: clamp(18px,2.5vw,24px);
          font-family: 'Syne',sans-serif; font-weight: 700;
          width: 100%; outline: none; padding: 16px 0;
          transition: border-color .3s; letter-spacing: '-.01em';
        }
        .acc-input-big:focus{ border-bottom-color: #00C896; }
        .acc-input-big::placeholder{ color: rgba(245,244,240,.1); font-weight: 400; }
        .acc-textarea{
          background: transparent; border: none;
          border-bottom: 2px solid rgba(245,244,240,.12);
          color: #F5F4F0; font-size: clamp(16px,2vw,20px);
          font-family: 'Syne',sans-serif; font-weight: 400;
          width: 100%; outline: none; padding: 16px 0;
          resize: none; transition: border-color .3s; line-height: 1.7;
          min-height: 120px;
        }
        .acc-textarea:focus{ border-bottom-color: #00C896; }
        .acc-textarea::placeholder{ color: rgba(245,244,240,.1); }
        .acc-btn-start{
          background: #00C896; color: #0A0A0A;
          padding: 18px 48px; font-family: 'Syne',sans-serif;
          font-size: 14px; font-weight: 800; letter-spacing: '-.01em';
          border: none; cursor: pointer; transition: all .2s;
          text-transform: uppercase; letter-spacing: .05em;
        }
        .acc-btn-start:hover{ background: #00e6ad; transform: scale(1.02); }
        .acc-btn-next{
          background: transparent; color: #00C896;
          padding: 16px 0; font-family: 'DM Mono',monospace;
          font-size: 12px; letter-spacing: .1em; text-transform: uppercase;
          border: none; border-bottom: 1px solid #00C896;
          cursor: pointer; transition: all .2s;
        }
        .acc-btn-next:hover{ letter-spacing: .16em; }
        .acc-btn-back{
          background: transparent; color: rgba(245,244,240,.3);
          padding: 16px 0; font-family: 'DM Mono',monospace;
          font-size: 12px; letter-spacing: .1em; text-transform: uppercase;
          border: none; cursor: pointer; transition: color .2s;
        }
        .acc-btn-back:hover{ color: rgba(245,244,240,.6); }
        .acc-stage-option{
          padding: 14px 20px; border: 1px solid rgba(245,244,240,.08);
          color: rgba(245,244,240,.4); font-family: 'DM Mono',monospace;
          font-size: 11px; letter-spacing: .08em; text-transform: uppercase;
          cursor: pointer; transition: all .25s; background: transparent;
          text-align: left;
        }
        .acc-stage-option:hover{ border-color: rgba(0,200,150,.4); color: #F5F4F0; }
        .acc-stage-option.active{
          border-color: #00C896; color: #00C896;
          background: rgba(0,200,150,.06);
        }
        .acc-number{
          font-family: 'DM Serif Display',serif;
          font-size: clamp(120px,18vw,240px);
          color: rgba(245,244,240,.025);
          line-height: 1; letter-spacing: '-.05em';
          position: absolute; right: -20px; top: -20px;
          pointer-events: none; user-select: none;
        }
        .acc-cohort-badge{
          display: inline-block; padding: 6px 16px;
          border: 1px solid rgba(0,200,150,.3);
          background: rgba(0,200,150,.06);
          font-family: 'DM Mono',monospace; font-size: 10px;
          letter-spacing: .15em; text-transform: uppercase;
          color: #00C896; animation: pulse 2s ease infinite;
        }
      `}</style>

            {/* Scanline effect */}
            <div className="acc-signup-scanline" />

            {/* Intro Screen */}
            {step === 0 && (
                <div style={{
                    minHeight: 'calc(100vh - 64px)', display: 'flex', flexDirection: 'column',
                    justifyContent: 'center', padding: '60px 10vw', position: 'relative'
                }}>
                    {/* Ghost typography */}
                    <div style={{
                        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontFamily: "'DM Serif Display',serif", fontSize: 'clamp(120px,20vw,300px)',
                        color: 'rgba(0,200,150,.03)', lineHeight: 1, letterSpacing: '-.05em',
                        userSelect: 'none', pointerEvents: 'none'
                    }}>ACC.</div>

                    <div style={{ position: 'relative', zIndex: 1, maxWidth: 720 }}>
                        <div className="acc-cohort-badge" style={{ marginBottom: 32 }}>Cohort 03 — Open Now</div>

                        <h1 className="anim-fade-up" style={{
                            fontFamily: "'DM Serif Display',serif",
                            fontSize: 'clamp(56px,9vw,120px)',
                            letterSpacing: '-.04em', lineHeight: .88, color: '#F5F4F0',
                            marginBottom: 32
                        }}>
                            YC said no.<br />
                            <span style={{ color: '#00C896' }}>and says yes.</span>
                        </h1>

                        <p className="anim-fade-up-1" style={{ fontSize: 16, color: '#888880', lineHeight: 1.75, maxWidth: 500, marginBottom: 20 }}>
                            12-week cohort. 3–5% equity. A permanent network. 40 spots. No borders. No excuses.
                        </p>

                        <div className="anim-fade-up-2 acc-stats-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 48, borderTop: '1px solid rgba(245,244,240,.06)', borderBottom: '1px solid rgba(245,244,240,.06)', padding: '24px 0' }}>
                            {[{ n: '40', l: 'Spots' }, { n: '12', l: 'Weeks' }, { n: '34', l: 'Countries' }, { n: '$0', l: 'Programme Fee' }].map(s => (
                                <div key={s.l}>
                                    <div style={{ fontFamily: "'DM Serif Display',serif", fontSize: 36, color: '#F5F4F0', letterSpacing: '-.02em' }}>{s.n}</div>
                                    <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, letterSpacing: '.15em', textTransform: 'uppercase', color: '#888880', marginTop: 4 }}>{s.l}</div>
                                </div>
                            ))}
                        </div>

                        <div className="anim-fade-up-3" style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
                            <button className="acc-btn-start" onClick={() => setStep(1)}>Apply Now — Takes 5 min</button>
                            <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, color: '#444', letterSpacing: '.1em' }}>CLOSES MAR 15, 2026</span>
                        </div>
                    </div>
                </div>
            )}

            {/* QUESTION SCREENS */}
            {step >= 1 && step <= 4 && (
                <div style={{ minHeight: 'calc(100vh - 64px)', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 'clamp(32px,6vw,60px) clamp(20px,8vw,80px)', position: 'relative', maxWidth: 900, margin: '0 auto' }}>
                    {/* Ghost number */}
                    <div className="acc-number">{step}</div>

                    {/* Progress */}
                    <div style={{ display: 'flex', gap: 6, marginBottom: 64, position: 'relative', zIndex: 1 }}>
                        {[1, 2, 3, 4].map(n => (
                            <div key={n} style={{
                                flex: 1, height: 2,
                                background: step >= n ? '#00C896' : 'rgba(245,244,240,.08)',
                                transition: 'background .4s ease'
                            }} />
                        ))}
                    </div>

                    <div style={{ position: 'relative', zIndex: 1 }}>
                        <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, letterSpacing: '.15em', textTransform: 'uppercase', color: '#00C896', marginBottom: 16 }}>
                            Question {step} of 4
                        </div>
                        <h2 style={{
                            fontFamily: "'DM Serif Display',serif",
                            fontSize: 'clamp(40px,5.5vw,72px)',
                            letterSpacing: '-.03em', lineHeight: .92,
                            color: '#F5F4F0', marginBottom: 12
                        }}>{QUESTIONS[step - 1].prompt}</h2>
                        <p style={{ fontSize: 14, color: '#888880', marginBottom: 48, lineHeight: 1.6 }}>{QUESTIONS[step - 1].sub}</p>

                        {/* STEP 1 — Identity */}
                        {step === 1 && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                                <div className="two-col-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, marginBottom: 8 }}>
                                    <div>
                                        <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, letterSpacing: '.15em', textTransform: 'uppercase', color: '#00C896', marginBottom: 8 }}>Name *</div>
                                        <input className="acc-input-big" placeholder="Amara Diallo" value={form.name} onChange={e => upd('name', e.target.value)} />
                                    </div>
                                    <div>
                                        <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, letterSpacing: '.15em', textTransform: 'uppercase', color: '#00C896', marginBottom: 8 }}>Country *</div>
                                        <input className="acc-input-big" placeholder="Ghana" value={form.country} onChange={e => upd('country', e.target.value)} />
                                    </div>
                                </div>
                                <div className="two-col-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, marginTop: 24 }}>
                                    <div>
                                        <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, letterSpacing: '.15em', textTransform: 'uppercase', color: '#00C896', marginBottom: 8 }}>Email *</div>
                                        <input className="acc-input-big" placeholder="amara@startup.io" type="email" value={form.email} onChange={e => upd('email', e.target.value)} />
                                    </div>
                                    <div>
                                        <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, letterSpacing: '.15em', textTransform: 'uppercase', color: '#00C896', marginBottom: 8 }}>Password *</div>
                                        <input className="acc-input-big" placeholder="••••••••" type="password" value={form.password} onChange={e => upd('password', e.target.value)} />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* STEP 2 — Idea */}
                        {step === 2 && (
                            <div>
                                <div>
                                    <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, letterSpacing: '.15em', textTransform: 'uppercase', color: '#00C896', marginBottom: 8 }}>Company / Project Name</div>
                                    <input className="acc-input-big" placeholder="Kazi" value={form.company} onChange={e => upd('company', e.target.value)} />
                                </div>
                                <div style={{ marginTop: 32 }}>
                                    <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, letterSpacing: '.15em', textTransform: 'uppercase', color: '#00C896', marginBottom: 8 }}>
                                        What are you building? *
                                    </div>
                                    <textarea className="acc-textarea"
                                        placeholder="We're building an AI-powered job matching platform for East Africa that connects verified candidates with employers, cutting time-to-hire from 3 months to 3 days…"
                                        value={form.idea}
                                        onChange={e => { upd('idea', e.target.value); setCharCount(e.target.value.length); }}
                                    />
                                    <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, color: charCount > 500 ? '#FF4D1C' : '#444', marginTop: 8, textAlign: 'right' }}>
                                        {charCount}/500
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* STEP 3 — Why */}
                        {step === 3 && (
                            <div>
                                <div>
                                    <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, letterSpacing: '.15em', textTransform: 'uppercase', color: '#00C896', marginBottom: 8 }}>
                                        The Problem *
                                    </div>
                                    <textarea className="acc-textarea" style={{ minHeight: 100 }}
                                        placeholder="85% of East African employers fill roles through informal networks, cutting out millions of qualified candidates who lack the 'right connections'…"
                                        value={form.problem} onChange={e => upd('problem', e.target.value)}
                                    />
                                </div>
                                <div style={{ marginTop: 32 }}>
                                    <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, letterSpacing: '.15em', textTransform: 'uppercase', color: '#00C896', marginBottom: 8 }}>
                                        Why you, why now?
                                    </div>
                                    <textarea className="acc-textarea" style={{ minHeight: 80 }}
                                        placeholder="I've spent 4 years in HR at Safaricom. I know the problem from the inside…"
                                        value={form.why} onChange={e => upd('why', e.target.value)}
                                    />
                                </div>
                            </div>
                        )}

                        {/* STEP 4 — Context */}
                        {step === 4 && (
                            <div>
                                <div style={{ marginBottom: 40 }}>
                                    <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, letterSpacing: '.15em', textTransform: 'uppercase', color: '#00C896', marginBottom: 16 }}>
                                        Current Stage
                                    </div>
                                    <div className="acc-stage-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                                        {STAGES.map(s => (
                                            <button key={s} className={`acc-stage-option ${form.stage === s ? 'active' : ''}`} onClick={() => upd('stage', s)}>{s}</button>
                                        ))}
                                    </div>
                                </div>
                                <div className="two-col-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
                                    <div>
                                        <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, letterSpacing: '.15em', textTransform: 'uppercase', color: '#00C896', marginBottom: 8 }}>Team Size</div>
                                        <input className="acc-input-big" placeholder="2" value={form.team} onChange={e => upd('team', e.target.value)} />
                                    </div>
                                    <div>
                                        <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, letterSpacing: '.15em', textTransform: 'uppercase', color: '#00C896', marginBottom: 8 }}>Raised So Far</div>
                                        <input className="acc-input-big" placeholder="$0 or $50K" value={form.raised} onChange={e => upd('raised', e.target.value)} />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Navigation */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 56 }}>
                            <button className="acc-btn-back" onClick={() => setStep(s => s - 1)}>← Back</button>
                            {step < 4
                                ? <button className="acc-btn-next" onClick={() => setStep(s => s + 1)}>Continue →</button>
                                : (
                                    <button style={{
                                        background: '#00C896', color: '#0A0A0A',
                                        padding: '16px 40px', fontFamily: "'Syne',sans-serif",
                                        fontWeight: 800, fontSize: 13, letterSpacing: '.05em',
                                        textTransform: 'uppercase', border: 'none', cursor: 'pointer',
                                        transition: 'all .2s'
                                    }}>Submit Application →</button>
                                )
                            }
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}



/* ══════════════════════════════════════════════════════════
   SIGN IN — TALENT
   Same warm dark editorial aesthetic. Split panel.
   Left: live skill-tag wall. Right: minimal email+pass form.
══════════════════════════════════════════════════════════ */
function TalentSignIn({ setAuthMode }) {
    const w = useWindowWidth();
    const isMobile = w < 600;
    const isTablet = w >= 600 && w < 1024;
    const isDesktop = w >= 1024;
    const [form, setForm] = useState({ email: '', password: '' });
    const upd = (k, v) => setForm(f => ({ ...f, [k]: v }));
    const TAGS = ["React", "Node.js", "Python", "Figma", "Motion Design", "Go", "Rust", "ML / AI", "PostgreSQL", "iOS", "Android", "Design Systems", "Solidity", "DevOps", "AWS", "Copywriting", "SEO", "Growth", "Branding", "Product Strategy"];
    const DOUBLED = [...TAGS, ...TAGS];

    // Nav height: mobile stacks 3 rows (~112px), desktop single row (64px)
    const navH = isMobile ? 112 : 64;

    return (
        <div style={{
            minHeight: '100vh',
            background: '#0F0D0A',
            paddingTop: navH,
            display: 'flex',
            flexDirection: isDesktop ? 'row' : 'column',
            fontFamily: "'Syne',sans-serif",
        }}>
            <style>{`
        .tsi-input{background:transparent;border:none;border-bottom:1px solid rgba(245,244,240,.12);color:#F5F4F0;padding:14px 0;font-size:16px;font-family:'Syne',sans-serif;width:100%;outline:none;transition:border-color .2s;}
        .tsi-input:focus{border-bottom-color:#FF4D1C;}
        .tsi-input::placeholder{color:#3a3630;}
        .tsi-label{font-family:'DM Mono',monospace;font-size:10px;letter-spacing:.15em;text-transform:uppercase;color:#888880;margin-bottom:6px;display:block;}
        .tsi-social{width:100%;padding:13px 20px;border:1px solid rgba(245,244,240,.1);background:transparent;color:#F5F4F0;font-family:'Syne',sans-serif;font-size:14px;font-weight:600;display:flex;align-items:center;justify-content:center;gap:12px;transition:border-color .2s,background .2s;cursor:pointer;}
        .tsi-social:hover{border-color:rgba(245,244,240,.3);background:rgba(245,244,240,.04);}
        .tsi-divider{display:flex;align-items:center;gap:16px;margin:24px 0;}
        .tsi-divider::before,.tsi-divider::after{content:'';flex:1;height:1px;background:rgba(245,244,240,.08);}
        .tsi-divider span{font-family:'DM Mono',monospace;font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:#444;}
      `}</style>

            {/* ── LEFT PANEL — desktop only decorative marquee ── */}
            {isDesktop && (
                <div style={{
                    flex: '0 0 420px',
                    background: '#0F0D0A',
                    borderRight: '1px solid rgba(245,244,240,.07)',
                    display: 'flex', flexDirection: 'column',
                    position: 'sticky', top: navH,
                    height: `calc(100vh - ${navH}px)`,
                    overflow: 'hidden',
                }}>
                    <div style={{ padding: '40px 40px 32px', borderBottom: '1px solid rgba(245,244,240,.06)' }}>
                        <div style={{ fontFamily: "'DM Serif Display',serif", fontSize: 13, color: '#888880', marginBottom: 6, fontStyle: 'italic' }}>Welcome back to</div>
                        <div style={{ fontFamily: "'DM Serif Display',serif", fontSize: 38, letterSpacing: '-.02em', color: '#F5F4F0', lineHeight: 1 }}>
                            builders who<br /><span style={{ color: C.ignite }}>charge their worth.</span>
                        </div>
                    </div>
                    <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
                        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 80, background: 'linear-gradient(to bottom,#0F0D0A,transparent)', zIndex: 2 }} />
                        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 80, background: 'linear-gradient(to top,#0F0D0A,transparent)', zIndex: 2 }} />
                        <div style={{ padding: '80px 40px', display: 'flex', gap: 24 }}>
                            <div style={{ overflow: 'hidden', flex: 1 }}>
                                <div style={{ display: 'flex', flexDirection: 'column', animation: 'marqueeV 18s linear infinite', width: 'max-content' }}>
                                    {DOUBLED.filter((_, i) => i % 2 === 0).map((s, i) => (
                                        <div key={i} style={{ padding: '10px 0', fontFamily: "'DM Mono',monospace", fontSize: 11, letterSpacing: '.1em', textTransform: 'uppercase', color: '#2a2826', borderBottom: '1px solid rgba(245,244,240,.04)', whiteSpace: 'nowrap' }}>{s}</div>
                                    ))}
                                </div>
                            </div>
                            <div style={{ overflow: 'hidden', flex: 1 }}>
                                <div style={{ display: 'flex', flexDirection: 'column', animation: 'marqueeV 24s linear infinite reverse', width: 'max-content' }}>
                                    {DOUBLED.filter((_, i) => i % 2 === 1).map((s, i) => (
                                        <div key={i} style={{ padding: '10px 0', fontFamily: "'DM Mono',monospace", fontSize: 11, letterSpacing: '.1em', textTransform: 'uppercase', color: '#222', borderBottom: '1px solid rgba(245,244,240,.03)', whiteSpace: 'nowrap' }}>{s}</div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{ padding: '24px 40px', borderTop: '1px solid rgba(245,244,240,.06)' }}>
                        <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: '#888880', lineHeight: 1.6 }}>
                            1,200+ verified builders · 34 countries
                        </div>
                    </div>
                </div>
            )}

            {/* ── RIGHT PANEL — form ── */}
            <div style={{
                flex: 1,
                width: '100%',
                maxWidth: isDesktop ? 560 : '100%',
                margin: isDesktop ? '0' : '0 auto',
                padding: isMobile ? '40px 24px 60px' : isTablet ? '56px 48px 80px' : '60px 64px',
                overflowY: 'auto',
                boxSizing: 'border-box',
            }}>

                {/* Mobile / tablet brand pill */}
                {!isDesktop && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 32, paddingBottom: 20, borderBottom: '1px solid rgba(245,244,240,.06)' }}>
                        <div style={{ width: 6, height: 6, borderRadius: '50%', background: C.ignite, flexShrink: 0 }} />
                        <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, letterSpacing: '.15em', textTransform: 'uppercase', color: '#888880' }}>and talent · sign in</span>
                    </div>
                )}

                {/* Heading */}
                <div style={{ marginBottom: 40 }} className="anim-fade-up">
                    <div style={{ fontFamily: "'DM Serif Display',serif", fontSize: 'clamp(38px,7vw,60px)', letterSpacing: '-.03em', lineHeight: .92, color: '#F5F4F0', marginBottom: 12 }}>
                        Sign back<br /><span style={{ color: C.ignite, fontStyle: 'italic' }}>in.</span>
                    </div>
                    <p style={{ fontSize: 14, color: '#888880', lineHeight: 1.7 }}>Your next project is waiting.</p>
                </div>

                {/* Social buttons */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }} className="anim-fade-up-1">
                    <button className="tsi-social" style={{ fontSize: isMobile ? 13 : 14 }}>
                        <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
                        Continue with Google
                    </button>
                    <button className="tsi-social" style={{ fontSize: isMobile ? 13 : 14 }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="#F5F4F0"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                        Continue with LinkedIn
                    </button>
                </div>

                <div className="tsi-divider"><span>or</span></div>

                {/* Email + Password fields */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }} className="anim-fade-up-2">
                    <div>
                        <label className="tsi-label">Email</label>
                        <input className="tsi-input" type="email" placeholder="you@domain.com" value={form.email} onChange={e => upd('email', e.target.value)} />
                    </div>
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                            <label className="tsi-label" style={{ marginBottom: 0 }}>Password</label>
                            <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, color: '#888880', cursor: 'pointer', letterSpacing: '.06em' }}
                                onClick={() => setAuthMode('forgot')}
                                onMouseEnter={e => e.currentTarget.style.color = '#F5F4F0'}
                                onMouseLeave={e => e.currentTarget.style.color = '#888880'}>
                                Forgot?
                            </span>
                        </div>
                        <input className="tsi-input" type="password" placeholder="••••••••" value={form.password} onChange={e => upd('password', e.target.value)} />
                    </div>
                </div>

                {/* CTA */}
                <button style={{ width: '100%', marginTop: 40, background: C.ignite, color: '#fff', padding: isMobile ? '14px 20px' : '15px 28px', fontFamily: "'DM Mono',monospace", fontSize: 12, letterSpacing: '.08em', textTransform: 'uppercase', border: 'none', cursor: 'pointer', transition: 'all .2s' }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#e03a10'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = C.ignite; e.currentTarget.style.transform = 'translateY(0)'; }}
                    className="anim-fade-up-3"
                >Sign In →</button>

                {/* Switch to signup */}
                <div style={{ marginTop: 32, textAlign: 'center', fontFamily: "'DM Mono',monospace", fontSize: 11, color: '#444', letterSpacing: '.06em' }} className="anim-fade-up-3">
                    Don't have an account?{' '}
                    <span style={{ color: '#888880', cursor: 'pointer' }} onClick={() => setAuthMode('signup')}
                        onMouseEnter={e => e.currentTarget.style.color = '#F5F4F0'}
                        onMouseLeave={e => e.currentTarget.style.color = '#888880'}>
                        Sign up
                    </span>
                </div>
            </div>
        </div>
    );
}

/* ══════════════════════════════════════════════════════════
   SIGN IN — BUILD
   Blueprint / technical aesthetic. Grid bg. Monospace.
   Centered single-column form. Clean spec-sheet style.
══════════════════════════════════════════════════════════ */
function BuildSignIn({ setAuthMode }) {
    const isMobile = useWindowWidth() < 600;
    const [form, setForm] = useState({ email: '', password: '' });
    const upd = (k, v) => setForm(f => ({ ...f, [k]: v }));
    return (
        <div style={{
            minHeight: '100vh', background: '#06080F', paddingTop: 64, fontFamily: "'Space Mono',monospace",
            backgroundImage: 'linear-gradient(rgba(100,140,255,.08) 1px,transparent 1px),linear-gradient(90deg,rgba(100,140,255,.08) 1px,transparent 1px)',
            backgroundSize: '32px 32px', position: 'relative'
        }}>
            <style>{`
        .bsi-input{background:rgba(100,140,255,.07);border:1px solid rgba(100,140,255,.35);color:#E8EEFF;padding:13px 16px;font-size:14px;font-family:'Space Mono',monospace;width:100%;outline:none;transition:all .2s;}
        .bsi-input:focus{border-color:#5B8AFF;background:rgba(100,140,255,.12);box-shadow:0 0 0 3px rgba(100,140,255,.1);}
        .bsi-input::placeholder{color:rgba(160,190,255,.35);}
        .bsi-social{width:100%;padding:13px 20px;border:1px solid rgba(100,140,255,.35);background:rgba(100,140,255,.05);color:#E8EEFF;font-family:'Space Mono',monospace;font-size:12px;display:flex;align-items:center;justify-content:center;gap:12px;transition:all .2s;cursor:pointer;letter-spacing:.04em;}
        .bsi-social:hover{border-color:#5B8AFF;background:rgba(100,140,255,.12);}
        .bsi-divider{display:flex;align-items:center;gap:16px;margin:20px 0;}
        .bsi-divider::before,.bsi-divider::after{content:'';flex:1;height:1px;background:rgba(100,140,255,.2);}
        .bsi-divider span{font-size:9px;letter-spacing:.18em;text-transform:uppercase;color:#7BA4FF;}
      `}</style>

            {/* Corner marks */}
            <div style={{ position: 'fixed', top: 80, left: 24, fontFamily: "'Space Mono',monospace", fontSize: 9, color: '#7BA4FF', letterSpacing: '.1em' }}>AND.BUILD — SIGN IN</div>


            <div className="bsi-inner" style={{ maxWidth: 480, margin: '0 auto', padding: '80px 40px' }}>

                <div style={{ marginBottom: 8, fontFamily: "'Space Mono',monospace", fontSize: 10, letterSpacing: '.2em', textTransform: 'uppercase', color: 'rgba(28,63,255,.6)' }}>
          // and.build — authentication
                </div>
                <h1 style={{ fontFamily: "'Fraunces',serif", fontSize: 'clamp(44px,6vw,72px)', letterSpacing: '-.03em', lineHeight: .9, color: '#E8EEFF', marginBottom: 12 }} className="anim-fade-up">
                    Welcome<br /><span style={{ color: C.blueprint, fontStyle: 'italic' }}>back.</span>
                </h1>
                <p style={{ fontSize: 12, color: '#9AB8FF', lineHeight: 1.7, marginBottom: 40 }}>Sign in to your and.build account.</p>

                {/* Progress bar decorative */}
                <div style={{ height: 1, background: 'rgba(100,140,255,.2)', marginBottom: 40 }}>
                    <div style={{ height: '100%', width: '100%', background: C.blueprint, opacity: .4 }} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 0 }} className="anim-fade-up-1">
                    <button className="bsi-social">
                        <svg width="16" height="16" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
                        Continue with Google
                    </button>
                    <button className="bsi-social">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="#C8D8FF"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                        Continue with LinkedIn
                    </button>
                </div>

                <div className="bsi-divider"><span>or</span></div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }} className="anim-fade-up-2">
                    <div>
                        <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 9, letterSpacing: '.18em', textTransform: 'uppercase', color: '#7BA4FF', marginBottom: 6 }}>Email *</div>
                        <input className="bsi-input" type="email" placeholder="founder@startup.io" value={form.email} onChange={e => upd('email', e.target.value)} />
                    </div>
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                            <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 9, letterSpacing: '.18em', textTransform: 'uppercase', color: '#7BA4FF' }}>Password *</div>
                            <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 9, color: '#7BA4FF', cursor: 'pointer', letterSpacing: '.1em' }}
                                onClick={() => setAuthMode('forgot')}
                                onMouseEnter={e => e.currentTarget.style.color = '#C0D8FF'} onMouseLeave={e => e.currentTarget.style.color = '#7BA4FF'}>
                                FORGOT?
                            </span>
                        </div>
                        <input className="bsi-input" type="password" placeholder="••••••••" value={form.password} onChange={e => upd('password', e.target.value)} />
                    </div>
                </div>

                <button style={{ width: '100%', marginTop: 32, background: '#3361FF', color: '#fff', padding: '14px 32px', fontFamily: "'Space Mono',monospace", fontSize: 11, letterSpacing: '.1em', textTransform: 'uppercase', border: 'none', cursor: 'pointer', transition: 'all .2s' }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#4d77ff'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = '#3361FF'; e.currentTarget.style.transform = 'translateY(0)'; }}
                    className="anim-fade-up-3"
                >Sign In ▶</button>

                <div style={{ marginTop: 28, textAlign: 'center', fontFamily: "'Space Mono',monospace", fontSize: 11, color: '#BDD0FF', letterSpacing: '.06em' }} className="anim-fade-up-3">
                    No account yet?{' '}
                    <span style={{ color: '#E8EEFF', cursor: 'pointer', borderBottom: '1px solid rgba(100,140,255,.5)', paddingBottom: 1 }} onClick={() => setAuthMode('signup')}
                        onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderBottomColor = '#5B8AFF'; }}
                        onMouseLeave={e => { e.currentTarget.style.color = '#E8EEFF'; e.currentTarget.style.borderBottomColor = 'rgba(100,140,255,.5)'; }}>
                        Register
                    </span>
                </div>
            </div>
        </div>
    );
}

/* ══════════════════════════════════════════════════════════
   SIGN IN — ACCELERATE
   Brutalist / kinetic aesthetic. Full-bleed black.
   Electric green. Big type. Scanline. Stark & urgent.
══════════════════════════════════════════════════════════ */
function AccelerateSignIn({ setAuthMode }) {
    const isMobile = useWindowWidth() < 600;
    const [form, setForm] = useState({ email: '', password: '' });
    const upd = (k, v) => setForm(f => ({ ...f, [k]: v }));
    return (
        <div style={{ minHeight: '100vh', background: '#0A0A0A', paddingTop: 64, fontFamily: "'Syne',sans-serif", position: 'relative', overflow: 'hidden' }}>
            <style>{`
        .asi-input{background:transparent;border:none;border-bottom:2px solid rgba(245,244,240,.12);color:#F5F4F0;font-size:clamp(18px,2.5vw,24px);font-family:'Syne',sans-serif;font-weight:700;width:100%;outline:none;padding:16px 0;transition:border-color .3s;letter-spacing:-.01em;}
        .asi-input:focus{border-bottom-color:#00C896;}
        .asi-input::placeholder{color:rgba(245,244,240,.1);font-weight:400;}
        .asi-social{width:100%;padding:14px 20px;border:1px solid rgba(245,244,240,.08);background:transparent;color:#F5F4F0;font-family:'Syne',sans-serif;font-size:14px;font-weight:600;display:flex;align-items:center;justify-content:center;gap:12px;transition:all .2s;cursor:pointer;}
        .asi-social:hover{border-color:rgba(0,200,150,.4);background:rgba(0,200,150,.04);}
        .asi-divider{display:flex;align-items:center;gap:16px;margin:28px 0;}
        .asi-divider::before,.asi-divider::after{content:'';flex:1;height:1px;background:rgba(245,244,240,.06);}
        .asi-divider span{font-family:'DM Mono',monospace;font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:#333;}
      `}</style>

            {/* Scanline */}
            <div style={{ position: 'fixed', left: 0, right: 0, height: 8, background: 'linear-gradient(to bottom,transparent,rgba(0,200,150,.04),transparent)', animation: 'scanline 6s linear infinite', pointerEvents: 'none', zIndex: 1 }} />

            {/* Ghost number */}
            <div style={{ position: 'fixed', right: -20, top: '10%', fontFamily: "'DM Serif Display',serif", fontSize: 'clamp(160px,22vw,320px)', color: 'rgba(0,200,150,.025)', lineHeight: 1, pointerEvents: 'none', userSelect: 'none' }}>↩</div>

            <div className="asi-inner" style={{ maxWidth: 640, margin: '0 auto', padding: '80px 10vw', position: 'relative', zIndex: 2 }}>

                <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, letterSpacing: '.15em', textTransform: 'uppercase', color: '#00C896', marginBottom: 20 }} className="anim-fade-up">
                    and accelerate — sign in
                </div>
                <h1 style={{ fontFamily: "'DM Serif Display',serif", fontSize: 'clamp(52px,8vw,96px)', letterSpacing: '-.04em', lineHeight: .88, color: '#F5F4F0', marginBottom: 16 }} className="anim-fade-up-1">
                    Back to<br /><span style={{ color: '#00C896' }}>build.</span>
                </h1>
                <p style={{ fontSize: 15, color: '#888880', lineHeight: 1.7, marginBottom: 48, maxWidth: 400 }} className="anim-fade-up-2">
                    Sign in to your and accelerate account.
                </p>

                {/* Progress bar — 100% because returning user */}
                <div style={{ height: 2, background: 'rgba(245,244,240,.06)', marginBottom: 48, position: 'relative' }}>
                    <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: '100%', background: '#00C896' }} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }} className="anim-fade-up-2">
                    <button className="asi-social">
                        <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
                        Continue with Google
                    </button>
                    <button className="asi-social">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="#F5F4F0"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                        Continue with LinkedIn
                    </button>
                </div>

                <div className="asi-divider"><span>or</span></div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }} className="anim-fade-up-3">
                    <div style={{ marginBottom: 8 }}>
                        <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, letterSpacing: '.15em', textTransform: 'uppercase', color: '#00C896', marginBottom: 8 }}>Email *</div>
                        <input className="asi-input" type="email" placeholder="amara@startup.io" value={form.email} onChange={e => upd('email', e.target.value)} style={{ fontSize: 'clamp(15px,2.5vw,24px)' }} />
                    </div>
                    <div style={{ marginTop: 24 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                            <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, letterSpacing: '.15em', textTransform: 'uppercase', color: '#00C896' }}>Password *</div>
                            <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, color: '#444', cursor: 'pointer', letterSpacing: '.06em' }}
                                onClick={() => setAuthMode('forgot')}
                                onMouseEnter={e => e.currentTarget.style.color = '#888880'} onMouseLeave={e => e.currentTarget.style.color = '#444'}>
                                Forgot password?
                            </span>
                        </div>
                        <input className="asi-input" type="password" placeholder="••••••••" value={form.password} onChange={e => upd('password', e.target.value)} />
                    </div>
                </div>

                <button style={{ marginTop: 56, background: '#00C896', color: '#0A0A0A', padding: '16px 40px', fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 13, letterSpacing: '.05em', textTransform: 'uppercase', border: 'none', cursor: 'pointer', transition: 'all .2s' }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#00e6ad'; e.currentTarget.style.transform = 'scale(1.02)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = '#00C896'; e.currentTarget.style.transform = 'scale(1)'; }}
                    className="anim-fade-up-4"
                >Sign In →</button>

                <div style={{ marginTop: 32, fontFamily: "'DM Mono',monospace", fontSize: 11, color: '#444', letterSpacing: '.06em' }} className="anim-fade-up-4">
                    New here?{' '}
                    <span style={{ color: '#888880', cursor: 'pointer', borderBottom: '1px solid #444' }} onClick={() => setAuthMode('signup')}
                        onMouseEnter={e => e.currentTarget.style.color = '#F5F4F0'} onMouseLeave={e => e.currentTarget.style.color = '#888880'}>
                        Apply to Cohort 03
                    </span>
                </div>
            </div>
        </div>
    );
}


/* ══════════════════════════════════════════════════════════
   FORGOT PASSWORD — TALENT
   Editorial / fashion magazine. Warm dark. Serif display.
   Two states: email entry → confirmation sent.
══════════════════════════════════════════════════════════ */
function TalentForgotPassword({ setAuthMode }) {
    const w = useWindowWidth();
    const isMobile = w < 600;
    const [email, setEmail] = useState('');
    const [sent, setSent] = useState(false);

    return (
        <div style={{
            minHeight: '100vh', background: '#0F0D0A',
            paddingTop: isMobile ? 112 : 64,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: "'Syne',sans-serif", position: 'relative', overflow: 'hidden'
        }}>
            <style>{`
        .tfp-input{background:transparent;border:none;border-bottom:1px solid rgba(245,244,240,.15);color:#F5F4F0;padding:14px 0;font-size:16px;font-family:'Syne',sans-serif;width:100%;outline:none;transition:border-color .3s;}
        .tfp-input:focus{border-bottom-color:#FF4D1C;}
        .tfp-input::placeholder{color:#2e2a26;}
      `}</style>

            {/* Ghost background text */}
            <div style={{ position: 'fixed', bottom: -40, right: -20, fontFamily: "'DM Serif Display',serif", fontSize: 'clamp(100px,18vw,260px)', color: 'rgba(255,77,28,.03)', lineHeight: 1, pointerEvents: 'none', userSelect: 'none', whiteSpace: 'nowrap' }}>forgot?</div>

            <div style={{ width: '100%', maxWidth: 480, padding: isMobile ? '0 24px' : '0 40px' }}>

                {/* Back link */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 40, cursor: 'pointer' }}
                    onClick={() => setAuthMode('signin')}
                    onMouseEnter={e => e.currentTarget.style.opacity = '.6'}
                    onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
                    <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, letterSpacing: '.15em', textTransform: 'uppercase', color: '#888880' }}>← Back to sign in</span>
                </div>

                {!sent ? (
                    <>
                        <div className="anim-fade-up" style={{ marginBottom: 48 }}>
                            <div style={{ fontFamily: "'DM Serif Display',serif", fontSize: 'clamp(42px,8vw,68px)', letterSpacing: '-.03em', lineHeight: .88, color: '#F5F4F0', marginBottom: 16 }}>
                                Reset your<br /><span style={{ color: C.ignite, fontStyle: 'italic' }}>password.</span>
                            </div>
                            <p style={{ fontSize: 14, color: '#888880', lineHeight: 1.8, maxWidth: 380 }}>
                                Enter the email tied to your and talent account. We'll send a reset link within seconds.
                            </p>
                        </div>

                        {/* Decorative line */}
                        <div style={{ height: 1, background: 'rgba(255,77,28,.15)', marginBottom: 40 }} />

                        <div className="anim-fade-up-1" style={{ marginBottom: 36 }}>
                            <label style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, letterSpacing: '.15em', textTransform: 'uppercase', color: '#888880', display: 'block', marginBottom: 8 }}>Email address</label>
                            <input className="tfp-input" type="email" placeholder="you@domain.com" value={email} onChange={e => setEmail(e.target.value)} />
                        </div>

                        <button className="anim-fade-up-2"
                            onClick={() => email && setSent(true)}
                            style={{ width: '100%', background: email ? C.ignite : 'rgba(255,77,28,.15)', color: email ? '#fff' : '#888880', padding: '15px 28px', fontFamily: "'DM Mono',monospace", fontSize: 12, letterSpacing: '.08em', textTransform: 'uppercase', border: 'none', cursor: email ? 'pointer' : 'default', transition: 'all .3s' }}
                            onMouseEnter={e => { if (email) { e.currentTarget.style.background = '#e03a10'; e.currentTarget.style.transform = 'translateY(-2px)'; } }}
                            onMouseLeave={e => { if (email) { e.currentTarget.style.background = C.ignite; e.currentTarget.style.transform = 'translateY(0)'; } }}>
                            Send Reset Link →
                        </button>

                        <div className="anim-fade-up-2" style={{ marginTop: 24, textAlign: 'center', fontFamily: "'DM Mono',monospace", fontSize: 11, color: '#444', letterSpacing: '.06em' }}>
                            Remember it now?{' '}
                            <span style={{ color: '#888880', cursor: 'pointer' }}
                                onClick={() => setAuthMode('signin')}
                                onMouseEnter={e => e.currentTarget.style.color = '#F5F4F0'}
                                onMouseLeave={e => e.currentTarget.style.color = '#888880'}>
                                Sign in
                            </span>
                        </div>
                    </>
                ) : (
                    /* ── Sent confirmation ── */
                    <div className="anim-fade-up" style={{ textAlign: 'center' }}>
                        <div style={{ width: 64, height: 64, borderRadius: '50%', border: '1px solid rgba(255,77,28,.3)', background: 'rgba(255,77,28,.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 32px', fontSize: 28 }}>✉</div>
                        <div style={{ fontFamily: "'DM Serif Display',serif", fontSize: 'clamp(36px,6vw,56px)', letterSpacing: '-.03em', lineHeight: .9, color: '#F5F4F0', marginBottom: 16 }}>
                            Check your<br /><span style={{ color: C.ignite, fontStyle: 'italic' }}>inbox.</span>
                        </div>
                        <p style={{ fontSize: 14, color: '#888880', lineHeight: 1.8, maxWidth: 360, margin: '0 auto 40px' }}>
                            We sent a reset link to <span style={{ color: '#F5F4F0' }}>{email}</span>. It expires in 15 minutes.
                        </p>
                        <div style={{ height: 1, background: 'rgba(255,77,28,.1)', marginBottom: 32 }} />
                        <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: '#444', letterSpacing: '.06em' }}>
                            Didn't get it?{' '}
                            <span style={{ color: '#888880', cursor: 'pointer' }}
                                onClick={() => setSent(false)}
                                onMouseEnter={e => e.currentTarget.style.color = '#F5F4F0'}
                                onMouseLeave={e => e.currentTarget.style.color = '#888880'}>
                                Resend
                            </span>
                            {' '}·{' '}
                            <span style={{ color: '#888880', cursor: 'pointer' }}
                                onClick={() => setAuthMode('signin')}
                                onMouseEnter={e => e.currentTarget.style.color = '#F5F4F0'}
                                onMouseLeave={e => e.currentTarget.style.color = '#888880'}>
                                Back to sign in
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

/* ══════════════════════════════════════════════════════════
   FORGOT PASSWORD — BUILD
   Blueprint / spec-sheet. Grid bg. Space Mono. Navy.
   Two states: email entry → confirmation sent.
══════════════════════════════════════════════════════════ */
function BuildForgotPassword({ setAuthMode }) {
    const w = useWindowWidth();
    const isMobile = w < 600;
    const [email, setEmail] = useState('');
    const [sent, setSent] = useState(false);

    return (
        <div style={{
            minHeight: '100vh', background: '#06080F',
            paddingTop: isMobile ? 112 : 64,
            fontFamily: "'Space Mono',monospace",
            backgroundImage: 'linear-gradient(rgba(100,140,255,.08) 1px,transparent 1px),linear-gradient(90deg,rgba(100,140,255,.08) 1px,transparent 1px)',
            backgroundSize: '32px 32px', position: 'relative',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
            <style>{`
        .bfp-input{background:rgba(100,140,255,.07);border:1px solid rgba(100,140,255,.35);color:#E8EEFF;padding:13px 16px;font-size:14px;font-family:'Space Mono',monospace;width:100%;outline:none;transition:all .2s;}
        .bfp-input:focus{border-color:#5B8AFF;background:rgba(100,140,255,.12);box-shadow:0 0 0 3px rgba(100,140,255,.1);}
        .bfp-input::placeholder{color:rgba(160,190,255,.35);}
      `}</style>

            {/* Corner mark */}
            {!isMobile && <div style={{ position: 'fixed', top: 80, left: 24, fontFamily: "'Space Mono',monospace", fontSize: 9, color: '#7BA4FF', letterSpacing: '.1em' }}>AND.BUILD — PASSWORD RESET</div>}

            <div style={{ width: '100%', maxWidth: 480, padding: isMobile ? '0 24px' : '0 40px' }}>

                {/* Back */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 40, cursor: 'pointer' }}
                    onClick={() => setAuthMode('signin')}
                    onMouseEnter={e => e.currentTarget.style.opacity = '.6'}
                    onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
                    <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 9, letterSpacing: '.15em', textTransform: 'uppercase', color: '#7BA4FF' }}>◀ BACK TO SIGN IN</span>
                </div>

                {!sent ? (
                    <>
                        <div className="anim-fade-up" style={{ marginBottom: 8 }}>
                            <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 10, letterSpacing: '.2em', textTransform: 'uppercase', color: '#7BA4FF', marginBottom: 12 }}>// and.build — password recovery</div>
                            <h1 style={{ fontFamily: "'Fraunces',serif", fontSize: 'clamp(40px,6vw,64px)', letterSpacing: '-.03em', lineHeight: .9, color: '#E8EEFF', marginBottom: 12 }}>
                                Recover<br /><span style={{ color: '#3361FF', fontStyle: 'italic' }}>access.</span>
                            </h1>
                            <p style={{ fontSize: 12, color: '#9AB8FF', lineHeight: 1.8, maxWidth: 380, marginBottom: 32 }}>
                                Enter your registered email. We'll dispatch a secure reset link immediately.
                            </p>
                        </div>

                        <div style={{ height: 1, background: 'rgba(100,140,255,.2)', marginBottom: 32 }} />

                        <div className="anim-fade-up-1" style={{ marginBottom: 28 }}>
                            <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 9, letterSpacing: '.18em', textTransform: 'uppercase', color: '#7BA4FF', fontWeight: 700, marginBottom: 8 }}>Email *</div>
                            <input className="bfp-input" type="email" placeholder="founder@startup.io" value={email} onChange={e => setEmail(e.target.value)} />
                        </div>

                        <button className="anim-fade-up-2"
                            onClick={() => email && setSent(true)}
                            style={{ width: '100%', background: email ? '#3361FF' : 'rgba(100,140,255,.15)', color: email ? '#fff' : '#7BA4FF', padding: '14px 32px', fontFamily: "'Space Mono',monospace", fontSize: 11, letterSpacing: '.1em', textTransform: 'uppercase', border: 'none', cursor: email ? 'pointer' : 'default', transition: 'all .2s' }}
                            onMouseEnter={e => { if (email) { e.currentTarget.style.background = '#4d77ff'; e.currentTarget.style.transform = 'translateY(-1px)'; } }}
                            onMouseLeave={e => { if (email) { e.currentTarget.style.background = '#3361FF'; e.currentTarget.style.transform = 'translateY(0)'; } }}>
                            Send Reset Link ▶
                        </button>

                        <div className="anim-fade-up-2" style={{ marginTop: 24, textAlign: 'center', fontFamily: "'Space Mono',monospace", fontSize: 10, color: '#7BA4FF', letterSpacing: '.06em' }}>
                            Remember it?{' '}
                            <span style={{ color: '#BDD0FF', cursor: 'pointer', borderBottom: '1px solid rgba(100,140,255,.4)', paddingBottom: 1 }}
                                onClick={() => setAuthMode('signin')}
                                onMouseEnter={e => { e.currentTarget.style.color = '#E8EEFF'; e.currentTarget.style.borderBottomColor = '#5B8AFF'; }}
                                onMouseLeave={e => { e.currentTarget.style.color = '#BDD0FF'; e.currentTarget.style.borderBottomColor = 'rgba(100,140,255,.4)'; }}>
                                Sign In
                            </span>
                        </div>
                    </>
                ) : (
                    <div className="anim-fade-up" style={{ textAlign: 'center' }}>
                        <div style={{ width: 56, height: 56, border: '1px solid rgba(100,140,255,.4)', background: 'rgba(100,140,255,.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 28px', fontSize: 24, color: '#7BA4FF' }}>✉</div>
                        <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 10, letterSpacing: '.2em', textTransform: 'uppercase', color: '#7BA4FF', marginBottom: 12 }}>// transmission sent</div>
                        <h2 style={{ fontFamily: "'Fraunces',serif", fontSize: 'clamp(32px,5vw,52px)', letterSpacing: '-.03em', lineHeight: .9, color: '#E8EEFF', marginBottom: 16 }}>
                            Link<br /><span style={{ color: '#3361FF', fontStyle: 'italic' }}>dispatched.</span>
                        </h2>
                        <p style={{ fontSize: 12, color: '#9AB8FF', lineHeight: 1.8, maxWidth: 360, margin: '0 auto 32px' }}>
                            Reset link sent to <span style={{ color: '#E8EEFF' }}>{email}</span>. Valid for 15 minutes.
                        </p>
                        <div style={{ height: 1, background: 'rgba(100,140,255,.2)', marginBottom: 28 }} />
                        <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 10, color: '#7BA4FF', letterSpacing: '.06em' }}>
                            Not received?{' '}
                            <span style={{ color: '#BDD0FF', cursor: 'pointer' }}
                                onClick={() => setSent(false)}
                                onMouseEnter={e => e.currentTarget.style.color = '#E8EEFF'}
                                onMouseLeave={e => e.currentTarget.style.color = '#BDD0FF'}>
                                Resend
                            </span>
                            {' '}·{' '}
                            <span style={{ color: '#BDD0FF', cursor: 'pointer' }}
                                onClick={() => setAuthMode('signin')}
                                onMouseEnter={e => e.currentTarget.style.color = '#E8EEFF'}
                                onMouseLeave={e => e.currentTarget.style.color = '#BDD0FF'}>
                                Sign In
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

/* ══════════════════════════════════════════════════════════
   FORGOT PASSWORD — ACCELERATE
   Brutalist / kinetic. Black. Electric green. Big type.
   Scanline. Stark urgency.
══════════════════════════════════════════════════════════ */
function AccelerateForgotPassword({ setAuthMode }) {
    const w = useWindowWidth();
    const isMobile = w < 600;
    const [email, setEmail] = useState('');
    const [sent, setSent] = useState(false);

    const navH = isMobile ? 112 : 64;
    const hPad = isMobile ? '24px' : '10vw';

    return (
        <div style={{
            minHeight: '100vh',
            background: '#0A0A0A',
            paddingTop: navH,
            fontFamily: "'Syne',sans-serif",
            position: 'relative',
        }}>
            <style>{`
        .afp-input{background:transparent;border:none;border-bottom:2px solid rgba(245,244,240,.15);color:#F5F4F0;font-size:clamp(16px,2.2vw,22px);font-family:'Syne',sans-serif;font-weight:700;width:100%;outline:none;padding:14px 0;transition:border-color .3s;letter-spacing:-.01em;}
        .afp-input:focus{border-bottom-color:#00C896;}
        .afp-input::placeholder{color:rgba(245,244,240,.15);font-weight:400;}
      `}</style>

            {/* Scanline */}
            <div style={{ position: 'fixed', left: 0, right: 0, height: 8, background: 'linear-gradient(to bottom,transparent,rgba(0,200,150,.04),transparent)', animation: 'scanline 6s linear infinite', pointerEvents: 'none', zIndex: 1 }} />

            {/* Ghost text — pointer-events none so it never blocks scroll */}
            <div style={{ position: 'fixed', right: -20, bottom: -20, fontFamily: "'DM Serif Display',serif", fontSize: 'clamp(100px,18vw,240px)', color: 'rgba(0,200,150,.03)', lineHeight: 1, pointerEvents: 'none', userSelect: 'none', zIndex: 0 }}>reset.</div>

            {/* Main content */}
            <div style={{ maxWidth: 640, margin: '0 auto', padding: `clamp(40px,6vh,80px) ${hPad} 80px`, position: 'relative', zIndex: 2 }}>

                {/* Back link */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 40, cursor: 'pointer', width: 'fit-content' }}
                    onClick={() => setAuthMode('signin')}
                    onMouseEnter={e => e.currentTarget.style.opacity = '.5'}
                    onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
                    <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, letterSpacing: '.15em', textTransform: 'uppercase', color: '#00C896' }}>← Back to sign in</span>
                </div>

                {!sent ? (
                    <>
                        {/* Header */}
                        <div className="anim-fade-up" style={{ marginBottom: 40 }}>
                            <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, letterSpacing: '.15em', textTransform: 'uppercase', color: '#00C896', marginBottom: 20 }}>and accelerate — password reset</div>
                            <h1 style={{ fontFamily: "'DM Serif Display',serif", fontSize: 'clamp(44px,7vw,80px)', letterSpacing: '-.04em', lineHeight: .88, color: '#F5F4F0', marginBottom: 20 }}>
                                Locked<br /><span style={{ color: '#00C896' }}>out?</span>
                            </h1>
                            <p style={{ fontSize: 15, color: '#888880', lineHeight: 1.8, maxWidth: 400 }}>
                                Give us your email and we'll get you back in. No questions asked.
                            </p>
                        </div>

                        {/* Progress bar */}
                        <div style={{ height: 2, background: 'rgba(245,244,240,.06)', marginBottom: 40, position: 'relative' }}>
                            <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: '60%', background: '#00C896', opacity: .6 }} />
                        </div>

                        {/* Email field */}
                        <div className="anim-fade-up-1" style={{ marginBottom: 40 }}>
                            <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, letterSpacing: '.15em', textTransform: 'uppercase', color: '#00C896', marginBottom: 10 }}>Email *</div>
                            <input
                                className="afp-input"
                                type="email"
                                placeholder="amara@startup.io"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>

                        {/* CTA */}
                        <button className="anim-fade-up-2"
                            onClick={() => email && setSent(true)}
                            style={{
                                background: email ? '#00C896' : 'rgba(0,200,150,.1)',
                                color: email ? '#0A0A0A' : '#555',
                                padding: '16px 40px',
                                fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 13,
                                letterSpacing: '.05em', textTransform: 'uppercase',
                                border: 'none', cursor: email ? 'pointer' : 'default',
                                transition: 'all .2s', display: 'block',
                            }}
                            onMouseEnter={e => { if (email) { e.currentTarget.style.background = '#00e6ad'; e.currentTarget.style.transform = 'scale(1.02)'; } }}
                            onMouseLeave={e => { if (email) { e.currentTarget.style.background = '#00C896'; e.currentTarget.style.transform = 'scale(1)'; } }}>
                            Send Reset Link →
                        </button>

                        {/* Switch link */}
                        <div className="anim-fade-up-2" style={{ marginTop: 32, fontFamily: "'DM Mono',monospace", fontSize: 11, color: '#444', letterSpacing: '.06em' }}>
                            Remember it?{' '}
                            <span style={{ color: '#888880', cursor: 'pointer', borderBottom: '1px solid #333', paddingBottom: 1 }}
                                onClick={() => setAuthMode('signin')}
                                onMouseEnter={e => e.currentTarget.style.color = '#F5F4F0'}
                                onMouseLeave={e => e.currentTarget.style.color = '#888880'}>
                                Sign in
                            </span>
                        </div>
                    </>
                ) : (
                    /* ── Sent state ── */
                    <div className="anim-fade-up">
                        <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, letterSpacing: '.15em', textTransform: 'uppercase', color: '#00C896', marginBottom: 16 }}>// sent</div>
                        <h2 style={{ fontFamily: "'DM Serif Display',serif", fontSize: 'clamp(40px,7vw,76px)', letterSpacing: '-.04em', lineHeight: .88, color: '#F5F4F0', marginBottom: 20 }}>
                            Check your<br /><span style={{ color: '#00C896' }}>inbox.</span>
                        </h2>
                        <p style={{ fontSize: 15, color: '#888880', lineHeight: 1.8, maxWidth: 400, marginBottom: 40 }}>
                            Reset link sent to <span style={{ color: '#F5F4F0' }}>{email}</span>.<br />Expires in 15 minutes.
                        </p>
                        <div style={{ height: 2, background: 'rgba(245,244,240,.06)', marginBottom: 40, position: 'relative' }}>
                            <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: '100%', background: '#00C896' }} />
                        </div>
                        <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: '#444', letterSpacing: '.06em' }}>
                            Didn't arrive?{' '}
                            <span style={{ color: '#888880', cursor: 'pointer' }}
                                onClick={() => setSent(false)}
                                onMouseEnter={e => e.currentTarget.style.color = '#F5F4F0'}
                                onMouseLeave={e => e.currentTarget.style.color = '#888880'}>
                                Resend
                            </span>
                            {' · '}
                            <span style={{ color: '#888880', cursor: 'pointer' }}
                                onClick={() => setAuthMode('signin')}
                                onMouseEnter={e => e.currentTarget.style.color = '#F5F4F0'}
                                onMouseLeave={e => e.currentTarget.style.color = '#888880'}>
                                Back to sign in
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

/* ─── APP ROOT ───────────────────────────────────────────── */
export default function App() {
    const [active, setActive] = useState('talent');
    const [authMode, setAuthMode] = useState('signup');

    return (
        <>
            <style>{G}</style>
            <Switcher
                active={active} setActive={setActive}
                onLogoClick={() => window.location.href = '/'}
                authMode={authMode} setAuthMode={setAuthMode}
            />
            {active === 'talent' && <TalentSignup authMode={authMode} setAuthMode={setAuthMode} />}
            {active === 'build' && <BuildSignup authMode={authMode} setAuthMode={setAuthMode} />}
            {active === 'accelerate' && <AccelerateSignup authMode={authMode} setAuthMode={setAuthMode} />}
        </>
    );
}