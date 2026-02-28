import { useState, useEffect, useRef, useCallback } from "react";
import Footer from './Footer';
import AboutPage from './AboutPage';
import ApplyPage from './ApplyPage';
import TalentPage from './TalentPage';
import BuildPage from './BuildPage';
import AcceleratePage from './AcceleratePage';

/* ─── DESIGN TOKENS ─────────────────────────────────────── */
const C = {
  void: "#0A0A0A", ignite: "#FF4D1C", blueprint: "#1C3FFF",
  surge: "#00C896", canvas: "#F5F4F0", offWhite: "#EDECE7",
  lightGray: "#D8D7D2", midGray: "#888880",
};

/* ─── GLOBAL STYLES ─────────────────────────────────────── */
const G = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Syne:wght@400;600;800&family=DM+Mono:wght@400;500&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
  html{scroll-behavior:smooth;}
  body{background:#0A0A0A;color:#F5F4F0;font-family:'Syne',sans-serif;overflow-x:hidden;cursor:none;}
  a{text-decoration:none;color:inherit;}
  button{border:none;cursor:none;}
  input,textarea,select{font-family:'Syne',sans-serif;}
  ::-webkit-scrollbar{width:4px;}
  ::-webkit-scrollbar-track{background:#0A0A0A;}
  ::-webkit-scrollbar-thumb{background:#333;}

  @keyframes fadeUp{from{opacity:0;transform:translateY(32px);}to{opacity:1;transform:translateY(0);}}
  @keyframes fadeIn{from{opacity:0;}to{opacity:1;}}
  @keyframes scaleIn{from{opacity:0;transform:scale(0.95);}to{opacity:1;transform:scale(1);}}
  @keyframes marquee{from{transform:translateX(0);}to{transform:translateX(-50%);}}
  @keyframes pulse{0%,100%{opacity:1;}50%{opacity:.4;}}
  @keyframes spin{from{transform:rotate(0deg);}to{transform:rotate(360deg);}}
  @keyframes slideIn{from{transform:translateX(100%);}to{transform:translateX(0);}}
  @keyframes slideDown{from{opacity:0;transform:translateY(-12px);}to{opacity:1;transform:translateY(0);}}
  @keyframes glow{0%,100%{box-shadow:0 0 20px rgba(255,77,28,0);}50%{box-shadow:0 0 40px rgba(255,77,28,0.15);}}

  .anim-fade-up{animation:fadeUp .7s ease both;}
  .anim-fade-up-1{animation:fadeUp .7s .1s ease both;}
  .anim-fade-up-2{animation:fadeUp .7s .2s ease both;}
  .anim-fade-up-3{animation:fadeUp .7s .3s ease both;}
  .anim-scale-in{animation:scaleIn .5s ease both;}

  /* CURSOR */
  .cursor{position:fixed;width:12px;height:12px;background:#F5F4F0;border-radius:50%;pointer-events:none;z-index:9999;transition:transform .15s,background .2s;mix-blend-mode:difference;}
  .cursor.hovering{transform:scale(3);background:#FF4D1C;}
  .cursor-ring{position:fixed;width:36px;height:36px;border:1px solid rgba(245,244,240,.3);border-radius:50%;pointer-events:none;z-index:9998;transition:transform .4s ease,opacity .3s;}

  /* NAV */
  .nav{position:fixed;top:0;left:0;right:0;z-index:500;padding:20px 48px;display:flex;justify-content:space-between;align-items:center;transition:background .3s,backdrop-filter .3s;}
  .nav.scrolled{background:rgba(10,10,10,.88);backdrop-filter:blur(16px);border-bottom:1px solid rgba(245,244,240,.06);}
  .nav-logo{font-family:'DM Serif Display',serif;font-size:26px;letter-spacing:-.02em;cursor:none;}
  .nav-links{display:flex;gap:28px;list-style:none;}
  .nav-link{font-family:'DM Mono',monospace;font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:#888880;transition:color .2s;cursor:none;}
  .nav-link:hover,.nav-link.active{color:#F5F4F0;}
  .nav-link.active{position:relative;}
  .nav-link.active::after{content:'';position:absolute;bottom:-4px;left:0;right:0;height:1px;background:#FF4D1C;}
  .nav-cta{font-family:'DM Mono',monospace;font-size:11px;letter-spacing:.08em;text-transform:uppercase;background:#F5F4F0;color:#0A0A0A;padding:10px 20px;transition:background .2s,color .2s;cursor:none;}
  .nav-cta:hover{background:#FF4D1C;color:#fff;}
  .nav-mobile-toggle{display:none;background:transparent;color:#F5F4F0;font-size:20px;cursor:none;}

  /* MOBILE MENU */
  .mobile-menu{position:fixed;inset:0;background:#0A0A0A;z-index:400;display:flex;flex-direction:column;justify-content:center;align-items:center;gap:40px;animation:fadeIn .3s ease;}
  .mobile-menu-link{font-family:'DM Serif Display',serif;font-size:48px;cursor:none;}

  /* BUTTONS */
  .btn{font-family:'DM Mono',monospace;font-size:12px;letter-spacing:.08em;text-transform:uppercase;padding:14px 28px;cursor:none;transition:all .2s;display:inline-flex;align-items:center;gap:8px;}
  .btn-primary{background:#F5F4F0;color:#0A0A0A;}
  .btn-primary:hover{background:#FF4D1C;color:#fff;transform:translateY(-2px);}
  .btn-outline{background:transparent;color:#F5F4F0;border:1px solid rgba(245,244,240,.2);}
  .btn-outline:hover{border-color:#F5F4F0;transform:translateY(-2px);}
  .btn-ignite{background:#FF4D1C;color:#fff;}
  .btn-ignite:hover{background:#e03a10;transform:translateY(-2px);}
  .btn-surge{background:#00C896;color:#0A0A0A;}
  .btn-surge:hover{background:#00a87e;transform:translateY(-2px);}

  /* PAGE WRAPPER */
  .page{min-height:100vh;padding-top:80px;}

  /* SECTION LABEL */
  .s-label{font-family:'DM Mono',monospace;font-size:10px;letter-spacing:.15em;text-transform:uppercase;color:#888880;display:flex;align-items:center;gap:16px;margin-bottom:56px;}
  .s-label::after{content:'';flex:1;height:1px;background:rgba(245,244,240,.08);}

  /* CARDS */
  .card{border:1px solid rgba(245,244,240,.07);transition:border-color .3s,background .3s;}
  .card:hover{border-color:rgba(245,244,240,.15);}

  /* TAGS */
  .tag{font-family:'DM Mono',monospace;font-size:10px;letter-spacing:.08em;text-transform:uppercase;padding:5px 10px;border:1px solid rgba(245,244,240,.15);color:#888880;}
  .tag.active{background:rgba(255,77,28,.1);border-color:rgba(255,77,28,.4);color:#FF4D1C;}

  /* MARQUEE */
  .marquee-outer{overflow:hidden;border-top:1px solid rgba(245,244,240,.07);border-bottom:1px solid rgba(245,244,240,.07);padding:18px 0;background:rgba(245,244,240,.015);}
  .marquee-track{display:flex;animation:marquee 25s linear infinite;width:max-content;}
  .marquee-item{font-family:'DM Mono',monospace;font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:#888880;white-space:nowrap;padding:0 40px;}
  .marquee-item span{color:#FF4D1C;}

  /* FOOTER */
  .footer{padding:48px;border-top:1px solid rgba(245,244,240,.08);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:24px;}
  .footer-logo{font-family:'DM Serif Display',serif;font-size:22px;}
  .footer-links{display:flex;gap:24px;list-style:none;}
  .footer-link{font-family:'DM Mono',monospace;font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:#888880;transition:color .2s;cursor:none;}
  .footer-link:hover{color:#F5F4F0;}
  .footer-meta{font-family:'DM Mono',monospace;font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:#333;}

  /* FORM */
  .form-group{display:flex;flex-direction:column;gap:8px;}
  .form-label{font-family:'DM Mono',monospace;font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:#888880;}
  .form-input{background:rgba(245,244,240,.04);border:1px solid rgba(245,244,240,.1);color:#F5F4F0;padding:14px 16px;font-size:15px;transition:border-color .2s;outline:none;font-family:'Syne',sans-serif;}
  .form-input:focus{border-color:rgba(245,244,240,.4);}
  .form-input::placeholder{color:#444;}
  .form-textarea{min-height:120px;resize:vertical;}
  .form-select{appearance:none;background:rgba(245,244,240,.04);border:1px solid rgba(245,244,240,.1);color:#F5F4F0;padding:14px 16px;font-size:15px;transition:border-color .2s;outline:none;font-family:'Syne',sans-serif;cursor:none;}
  .form-select:focus{border-color:rgba(245,244,240,.4);}
  .form-select option{background:#1a1a1a;}

  /* TOAST */
  .toast{position:fixed;bottom:32px;right:32px;background:#F5F4F0;color:#0A0A0A;padding:16px 24px;font-family:'DM Mono',monospace;font-size:12px;letter-spacing:.06em;z-index:1000;animation:slideIn .4s ease;}

  /* STAT */
  .stat-num{font-family:'DM Serif Display',serif;font-size:clamp(48px,6vw,80px);line-height:1;letter-spacing:-.03em;}
  .stat-label{font-family:'DM Mono',monospace;font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:#888880;margin-top:8px;}

  /* TALENT CARD */
  .talent-card{padding:28px;cursor:none;position:relative;overflow:hidden;}
  .talent-card::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;transform:scaleX(0);transform-origin:left;transition:transform .4s ease;background:#FF4D1C;}
  .talent-card:hover::before{transform:scaleX(1);}
  .talent-avatar{width:52px;height:52px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:'DM Serif Display',serif;font-size:20px;margin-bottom:16px;}
  .talent-name{font-weight:800;font-size:17px;margin-bottom:4px;}
  .talent-role{font-family:'DM Mono',monospace;font-size:11px;letter-spacing:.06em;color:#888880;margin-bottom:16px;}
  .talent-skills{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:16px;}
  .talent-rate{font-family:'DM Mono',monospace;font-size:13px;color:#00C896;}
  .verified-badge{font-family:'DM Mono',monospace;font-size:9px;letter-spacing:.1em;text-transform:uppercase;background:rgba(0,200,150,.1);border:1px solid rgba(0,200,150,.3);color:#00C896;padding:3px 8px;}

  /* COHORT CARD */
  .cohort-stat{text-align:center;padding:24px;border:1px solid rgba(245,244,240,.07);}
  .cohort-stat-num{font-family:'DM Serif Display',serif;font-size:36px;letter-spacing:-.02em;}
  .cohort-stat-label{font-family:'DM Mono',monospace;font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:#888880;margin-top:6px;}

  /* STEPS */
  .step{display:flex;gap:24px;padding:32px 0;border-bottom:1px solid rgba(245,244,240,.06);}
  .step-num{font-family:'DM Mono',monospace;font-size:11px;letter-spacing:.1em;color:#444;min-width:32px;padding-top:4px;}
  .step-title{font-family:'Syne',sans-serif;font-weight:800;font-size:20px;margin-bottom:8px;}
  .step-desc{font-size:14px;color:#888880;line-height:1.6;}

  /* PROGRESS */
  .progress-bar{height:2px;background:rgba(245,244,240,.1);position:relative;}
  .progress-fill{height:100%;transition:width .5s ease;position:absolute;top:0;left:0;}

  /* MODAL */
  .modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,.8);z-index:600;display:flex;align-items:center;justify-content:center;padding:24px;animation:fadeIn .2s ease;}
  .modal{background:#111;border:1px solid rgba(245,244,240,.1);max-width:560px;width:100%;max-height:90vh;overflow-y:auto;animation:scaleIn .3s ease;}
  .modal-header{padding:28px 28px 0;display:flex;justify-content:space-between;align-items:flex-start;}
  .modal-body{padding:28px;}
  .modal-close{background:transparent;color:#888880;font-size:20px;cursor:none;transition:color .2s;}
  .modal-close:hover{color:#F5F4F0;}

  /* CHIP */
  .chip{font-family:'DM Mono',monospace;font-size:10px;letter-spacing:.06em;text-transform:uppercase;padding:4px 10px;border-radius:999px;background:rgba(245,244,240,.06);color:#888880;}

  @media(max-width:768px){
    .nav{padding:16px 24px;}
    .nav-links{display:none;}
    .nav-mobile-toggle{display:block;}
    .footer{padding:32px 24px;flex-direction:column;gap:20px;}
  }
`;



/* ─── ORBITAL GRAPHIC ───────────────────────────────────── */
function OrbitalGraphic() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let w, h, cx, cy;

    const orbits = [
      { frac: 0.28, speed: 0.0007, color: '#1C3FFF', size: 13, offset: Math.PI * 1.7 },
      { frac: 0.46, speed: 0.00045, color: '#00C896', size: 12, offset: Math.PI * 0.8 },
      { frac: 0.65, speed: 0.00025, color: '#FF4D1C', size: 14, offset: Math.PI * 0.3 },
    ];

    function resize() {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
      cx = w / 2;
      cy = h / 2;
    }

    function draw(ts) {
      ctx.clearRect(0, 0, w, h);
      const baseR = Math.min(w, h) * 0.48;

      // Draw orbit rings
      orbits.forEach(o => {
        const r = baseR * o.frac;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(245,244,240,0.1)';
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // Draw center dot
      ctx.beginPath();
      ctx.arc(cx, cy, 5, 0, Math.PI * 2);
      ctx.fillStyle = '#F5F4F0';
      ctx.fill();

      // Draw orbiting dots with glow
      orbits.forEach(o => {
        const r = baseR * o.frac;
        const angle = ts * o.speed + o.offset;
        const dx = cx + Math.cos(angle) * r;
        const dy = cy + Math.sin(angle) * r;

        // Glow
        const grd = ctx.createRadialGradient(dx, dy, 0, dx, dy, o.size * 2.5);
        grd.addColorStop(0, o.color + 'aa');
        grd.addColorStop(1, o.color + '00');
        ctx.beginPath();
        ctx.arc(dx, dy, o.size * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        // Dot
        ctx.beginPath();
        ctx.arc(dx, dy, o.size / 2, 0, Math.PI * 2);
        ctx.fillStyle = o.color;
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    }

    resize();
    animId = requestAnimationFrame(draw);
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    return () => { cancelAnimationFrame(animId); ro.disconnect(); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0, right: 0,
        width: '60%',
        height: '100%',
        opacity: 0.9,
        pointerEvents: 'none',
      }}
    />
  );
}

/* ─── HOOKS ─────────────────────────────────────────────── */
function useCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);
  useEffect(() => {
    const move = e => setPos({ x: e.clientX, y: e.clientY });
    const over = e => { if (e.target.closest('button,a,[data-hover]')) setHovering(true); };
    const out = () => setHovering(false);
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', over);
    window.addEventListener('mouseout', out);
    return () => { window.removeEventListener('mousemove', move); window.removeEventListener('mouseover', over); window.removeEventListener('mouseout', out); };
  }, []);
  return { pos, hovering };
}

function useScroll() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const h = () => setY(window.scrollY);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);
  return y;
}

function useToast() {
  const [toast, setToast] = useState(null);
  const show = useCallback((msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  }, []);
  return { toast, show };
}

/* ─── COMPONENTS ─────────────────────────────────────────── */
function Cursor({ pos, hovering }) {
  return <>
    <div className={`cursor${hovering ? ' hovering' : ''}`} style={{ left: pos.x - 6, top: pos.y - 6 }} />
    <div className="cursor-ring" style={{ left: pos.x - 18, top: pos.y - 18, opacity: hovering ? 0 : 1 }} />
  </>;
}

function Marquee({ items }) {
  const doubled = [...items, ...items];
  return <div className="marquee-outer">
    <div className="marquee-track">
      {doubled.map((t, i) => <span key={i} className="marquee-item">{t.icon && <span>{t.icon}</span>} {t.text}</span>)}
    </div>
  </div>;
}

function Nav({ page, setPage }) {
  const scrollY = useScroll();
  const [mobile, setMobile] = useState(false);
  const links = [{ key: 'home', label: 'Home' }, { key: 'talent', label: 'Talent' }, { key: 'build', label: 'Build' }, { key: 'accelerate', label: 'Accelerate' }, { key: 'about', label: 'About' }];
  return <>
    <style>{`.nav-ham{display:flex;flex-direction:column;gap:5px;width:22px;} .nav-ham span{display:block;height:1px;background:#F5F4F0;transition:all .3s;}`}</style>
    <nav className={`nav${scrollY > 30 ? ' scrolled' : ''}`}>
      <div className="nav-logo" onClick={() => { setPage('home'); setMobile(false); }}>and.</div>
      <ul className="nav-links">
        {links.map(l => <li key={l.key}><span className={`nav-link${page === l.key ? ' active' : ''}`} onClick={() => setPage(l.key)} data-hover>{l.label}</span></li>)}
      </ul>
      <button className="nav-cta" onClick={() => setPage('apply')}>Apply Now</button>
      <button className="nav-mobile-toggle" onClick={() => setMobile(!mobile)}>
        <div className="nav-ham"><span /><span /><span /></div>
      </button>
    </nav>
    {mobile && <div className="mobile-menu">
      <div className="nav-logo" style={{ fontSize: 32, marginBottom: 16 }} onClick={() => { setPage('home'); setMobile(false); }}>and.</div>
      {links.map(l => <span key={l.key} className="mobile-menu-link" onClick={() => { setPage(l.key); setMobile(false); }} data-hover>{l.label}</span>)}
      <button className="btn btn-primary" style={{ marginTop: 16 }} onClick={() => { setPage('apply'); setMobile(false); }}>Apply Now</button>
    </div>}
  </>;
}


/* ─── PAGE: HOME ─────────────────────────────────────────── */
function HomePage({ setPage }) {
  const marqueeItems = [
    { text: "and talent", icon: "·" }, { text: "Verified Builders", icon: "·" }, { text: "and build", icon: "·" },
    { text: "MVP in 90 Days", icon: "·" }, { text: "and accelerate", icon: "·" }, { text: "Apply. Ship. Grow.", icon: "·" },
    { text: "Your Geography Is Not Your Destiny", icon: "·" }, { text: "YC Said No. and Says Yes.", icon: "·" },
  ];
  return <div className="page">
    <style>{`
      .home-hero{min-height:calc(100vh - 80px);display:flex;flex-direction:column;justify-content:flex-end;padding:0 48px 80px;position:relative;overflow:hidden;}
      .home-hero-ghost{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-family:'DM Serif Display',serif;font-size:clamp(160px,25vw,380px);color:rgba(245,244,240,.025);letter-spacing:-.05em;user-select:none;pointer-events:none;white-space:nowrap;}
      .home-hero-meta{font-family:'DM Mono',monospace;font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:#888880;margin-bottom:24px;}
      .home-headline{font-family:'DM Serif Display',serif;font-size:clamp(56px,9vw,130px);line-height:.93;letter-spacing:-.03em;}
      .home-headline .ig{color:#FF4D1C;}
      .home-sub{max-width:500px;margin-top:28px;font-size:16px;color:#888880;line-height:1.65;}
      .home-actions{display:flex;gap:14px;margin-top:44px;flex-wrap:wrap;}
      .home-scroll{position:absolute;bottom:40px;right:48px;font-family:'DM Mono',monospace;font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:#444;writing-mode:vertical-rl;}
      .home-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:rgba(245,244,240,.07);margin:0;border-top:1px solid rgba(245,244,240,.07);}
      .home-stat{background:#0A0A0A;padding:40px 32px;}
      .home-verticals{padding:100px 48px;}
      .vert-row{display:grid;grid-template-columns:1fr 1fr 1fr;gap:2px;margin-top:56px;}
      .vert-cell{padding:44px 36px;position:relative;overflow:hidden;cursor:none;}
      .vert-cell-ghost{position:absolute;bottom:-20px;right:-8px;font-family:'DM Serif Display',serif;font-size:160px;opacity:.04;line-height:1;pointer-events:none;transition:opacity .3s;}
      .vert-cell:hover .vert-cell-ghost{opacity:.09;}
      .vert-dot{width:10px;height:10px;border-radius:50%;margin-bottom:20px;animation:pulse 2.5s ease infinite;}
      .vert-name{font-family:'DM Mono',monospace;font-size:10px;letter-spacing:.15em;text-transform:uppercase;color:#888880;margin-bottom:16px;}
      .vert-title{font-family:'Syne',sans-serif;font-weight:800;font-size:clamp(18px,2vw,24px);line-height:1.2;margin-bottom:12px;letter-spacing:-.02em;}
      .vert-desc{font-size:14px;color:#888880;line-height:1.6;margin-bottom:28px;}
      .vert-arrow{font-family:'DM Mono',monospace;font-size:12px;transition:color .2s;}
      .vert-cell::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;transform:scaleX(0);transform-origin:left;transition:transform .4s;}
      .vert-cell:hover::before{transform:scaleX(1);}
      .manifesto-section{padding:100px 48px;display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:center;border-top:1px solid rgba(245,244,240,.06);}
      .manifesto-hl{font-family:'DM Serif Display',serif;font-size:clamp(44px,5.5vw,80px);line-height:1;letter-spacing:-.03em;}
      .manifesto-hl em{font-style:italic;color:#00C896;}
      .voice-list{display:flex;flex-direction:column;gap:24px;}
      .voice-item{padding:24px;border-left:2px solid rgba(245,244,240,.08);transition:border-color .3s;}
      .voice-item:hover{border-left-color:#FF4D1C;}
      .voice-lbl{font-family:'Syne',sans-serif;font-weight:800;font-size:17px;margin-bottom:6px;}
      .voice-q{font-size:13px;color:#888880;line-height:1.6;margin-bottom:10px;}
      .voice-ex{font-family:'DM Mono',monospace;font-size:12px;color:#F5F4F0;}
      .home-cta-section{padding:140px 48px;text-align:center;position:relative;overflow:hidden;}
      .home-cta-glow{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:600px;height:600px;background:radial-gradient(ellipse,rgba(255,77,28,.06) 0%,transparent 70%);pointer-events:none;}
      .home-cta-hl{font-family:'DM Serif Display',serif;font-size:clamp(48px,7.5vw,110px);line-height:.95;letter-spacing:-.03em;margin-bottom:28px;}
      @media(max-width:768px){
        .home-hero{padding:0 24px 60px;}
        .home-stats{grid-template-columns:repeat(2,1fr);}
        .vert-row{grid-template-columns:1fr;}
        .manifesto-section{grid-template-columns:1fr;padding:80px 24px;}
        .home-verticals{padding:80px 24px;}
        .home-cta-section{padding:100px 24px;}
      }
    `}</style>

    {/* HERO */}
    <section className="home-hero" style={{ position: 'relative' }}>
      <OrbitalGraphic />
      <div className="home-hero-ghost">and.</div>
      <div className="home-hero-meta anim-fade-up">V1.0 · 2026 · The platform for builders</div>
      <h1 className="home-headline anim-fade-up-1">
        Build more.<br />
        Wait <span className="ig">less.</span><br />
        Grow together.
      </h1>
      <p className="home-sub anim-fade-up-2">and connects the builders, the makers, and the dreamers — giving every founder a fair shot, regardless of where they're from.</p>
      <div className="home-actions anim-fade-up-3">
        <button className="btn btn-primary" onClick={() => setPage('talent')}>Explore Talent</button>
        <button className="btn btn-outline" onClick={() => setPage('apply')}>Apply to Accelerate</button>
      </div>
      <div className="home-scroll">Scroll to explore ↓</div>
    </section>

    {/* STATS */}
    <div className="home-stats">
      {[{ n: "1,200+", l: "Verified Builders" }, { n: "90", l: "Days to MVP" }, { n: "$2.4M", l: "Raised by Alumni" }, { n: "34", l: "Countries" }].map(s => (
        <div className="home-stat card" key={s.l}>
          <div className="stat-num">{s.n}</div>
          <div className="stat-label">{s.l}</div>
        </div>
      ))}
    </div>

    {/* MARQUEE */}
    <Marquee items={marqueeItems} />

    {/* VERTICALS */}
    <section className="home-verticals">
      <div className="s-label">01 — Our Verticals</div>
      <div className="vert-row">
        {[
          { id: 'talent', dot: C.ignite, letter: 'T', name: 'and talent', title: 'Verified freelancers. Premium matching. Real trust signals.', desc: 'The curated marketplace for specialists who build at the frontier.', cta: 'Explore Talent →' },
          { id: 'build', dot: C.blueprint, letter: 'B', name: 'and build', title: 'Fractional CTOs. Dev squads. MVP in 90 days.', desc: 'The tech partnership arm for startups that have the idea but not the team.', cta: 'Start Building →' },
          { id: 'accelerate', dot: C.surge, letter: 'A', name: 'and accelerate', title: '12-week cohorts. 3–5% equity. Permanent network.', desc: 'The combinator program for founders locked out of the system.', cta: 'Apply Now →' },
        ].map(v => (
          <div key={v.id} className="vert-cell card" onClick={() => setPage(v.id)} data-hover
            style={{ '--vc': v.dot }}
          >
            <style>{`.vert-cell[data-id="${v.id}"]::before{background:${v.dot};} .vert-cell:hover{background:${v.dot}08;}`}</style>
            <div className="vert-cell-ghost" style={{ color: v.dot }}>{v.letter}</div>
            <div className="vert-dot" style={{ background: v.dot }} />
            <div className="vert-name">{v.name}</div>
            <div className="vert-title">{v.title}</div>
            <div className="vert-desc">{v.desc}</div>
            <div className="vert-arrow" style={{ color: v.dot }}>{v.cta}</div>
          </div>
        ))}
      </div>
    </section>

    {/* MANIFESTO */}
    <section className="manifesto-section">
      <div>
        <div className="s-label">02 — Who We Are</div>
        <h2 className="manifesto-hl">Your geography<br />is not your<br /><em>destiny.</em></h2>
      </div>
      <div className="voice-list">
        {[
          { lbl: "Direct.", q: "No fluff. No jargon. We say exactly what we mean.", ex: "Apply. Ship. Grow." },
          { lbl: "Bold.", q: "We make strong claims because we back them up.", ex: "YC said no. and says yes." },
          { lbl: "Human.", q: "Behind every badge and cohort is a person betting on themselves.", ex: "We grow when you grow." },
        ].map(v => <div key={v.lbl} className="voice-item">
          <div className="voice-lbl">{v.lbl}</div>
          <div className="voice-q">{v.q}</div>
          <div className="voice-ex">{v.ex}</div>
        </div>)}
      </div>
    </section>

    {/* CTA */}
    <section className="home-cta-section">
      <div className="home-cta-glow" />
      <div className="s-label" style={{ justifyContent: 'center', marginBottom: 48 }}>03 — Join and.</div>
      <h2 className="home-cta-hl">The best founders<br />aren't in SF.</h2>
      <p style={{ fontSize: 16, color: '#888880', maxWidth: 440, margin: '0 auto 44px', lineHeight: 1.65 }}>YC said no. and says yes. Apply to our next cohort and join a permanent network of builders who bet on themselves.</p>
      <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
        <button className="btn btn-primary" onClick={() => setPage('apply')}>Apply to Accelerate</button>
        <button className="btn btn-outline" onClick={() => setPage('talent')}>Browse Talent</button>
      </div>
      <div style={{ marginTop: 40, fontFamily: "'DM Mono',monospace", fontSize: 10, letterSpacing: '.12em', textTransform: 'uppercase', color: '#333' }}>cohort.03 — feb 2026 · and.build/apply →</div>
    </section>
  </div>;
}





/* ─── APP ────────────────────────────────────────────────── */
export default function App() {
  const [page, setPage] = useState('home');
  const [navState, setNavState] = useState({ active: false, fading: false, text: '' });
  const { pos, hovering } = useCursor();
  const { toast, show: showToast } = useToast();

  const handleSetPage = (newPage) => {
    if (newPage === page || navState.active) return;
    setNavState({
      active: true,
      fading: false,
      text: newPage === 'talent' ? 'LOADING TALENT MARKETPLACE' :
        newPage === 'build' ? 'INITIALIZING BUILD ENVIRONMENT' :
          newPage === 'accelerate' ? 'PREPARING ACCELERATOR' :
            newPage === 'apply' ? 'LOADING APPLICATION' :
              newPage === 'about' ? 'FETCHING MANIFESTO' :
                'INITIALIZING PLATFORM'
    });

    setTimeout(() => {
      setPage(newPage);
      window.scrollTo(0, 0);
      setNavState(prev => ({ ...prev, fading: true }));
      setTimeout(() => {
        setNavState({ active: false, fading: false, text: '' });
      }, 400);
    }, 700);
  };

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const pages = { home: HomePage, talent: TalentPage, build: BuildPage, accelerate: AcceleratePage, about: AboutPage, apply: ApplyPage };
  const Page = pages[page] || HomePage;

  return <>
    <style>{G}</style>
    <style>{`
      @keyframes loadingBarAnim {
        0% { left: -100%; right: 100%; }
        50% { left: 0%; right: 0%; }
        100% { left: 100%; right: -100%; }
      }
      .loading-bar {
        position: absolute;
        top: 0; bottom: 0;
        background: #FF4D1C;
        animation: loadingBarAnim 1.5s ease-in-out infinite;
      }
      .app-overlay {
        position: fixed; inset: 0; z-index: 9999;
        background: #0A0A0A;
        display: flex; align-items: center; justify-content: center;
        transition: opacity 0.4s ease;
      }
      .app-overlay.fading { opacity: 0; pointer-events: none; }
    `}</style>
    <Cursor pos={pos} hovering={hovering} />
    {page !== 'apply' && <Nav page={page} setPage={handleSetPage} />}
    <Page setPage={handleSetPage} showToast={showToast} />
    <Marquee items={[
      { text: "and talent", icon: "·" }, { text: "and build", icon: "·" }, { text: "and accelerate", icon: "·" },
      { text: "Build more. Wait less.", icon: "·" }, { text: "Your geography is not your destiny.", icon: "·" },
    ]} />
    <Footer setPage={handleSetPage} />
    {toast && <div className="toast">{toast}</div>}

    {navState.active && (
      <div className={`app-overlay ${navState.fading ? 'fading' : ''}`}>
        <div className="app-card" style={{ textAlign: 'center' }}>
          <div className="loading-screen">
            <div className="loading-logo" style={{ fontFamily: "'DM Serif Display',serif", fontSize: 48, marginBottom: 24, letterSpacing: '-.02em', color: '#F5F4F0' }}>and.</div>
            <div className="loading-bar-wrap" style={{ width: 200, height: 2, background: 'rgba(245,244,240,.1)', margin: '0 auto 24px', position: 'relative', overflow: 'hidden' }}>
              <div className="loading-bar"></div>
            </div>
            <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: 'rgba(245,244,240,0.4)', letterSpacing: '.2em', textTransform: 'uppercase' }}>
              {navState.text}
            </div>
          </div>
        </div>
      </div>
    )}
  </>;
}
