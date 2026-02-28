import { useState } from "react";

const C = {
    ignite: "#FF4D1C", blueprint: "#1C3FFF",
    surge: "#00C896", canvas: "#F5F4F0",
    midGray: "#888880",
};

const COHORT_COMPANIES = [
    { name: "Kazi", desc: "AI-powered job matching for East Africa", stage: "Seed", raise: "$220K", vertical: "HR Tech", flag: "🇰🇪" },
    { name: "Veza", desc: "B2B payments infrastructure for SEA", stage: "Pre-Seed", raise: "$180K", vertical: "FinTech", flag: "🇵🇭" },
    { name: "Nomad", desc: "Remote work compliance automation", stage: "Seed", raise: "$310K", vertical: "Legal Tech", flag: "🇧🇷" },
    { name: "Solara", desc: "Solar micro-grid management platform", stage: "Pre-Seed", raise: "$150K", vertical: "CleanTech", flag: "🇮🇳" },
    { name: "Bukhari", desc: "Islamic finance BNPL for MENA", stage: "Seed", raise: "$280K", vertical: "FinTech", flag: "🇸🇦" },
    { name: "Tutor AI", desc: "Personalized learning for rural students", stage: "Pre-Seed", raise: "$120K", vertical: "EdTech", flag: "🇧🇩" },
];

export default function AcceleratePage({ setPage }) {
    const [openFaq, setOpenFaq] = useState(null);
    const faqs = [
        { q: "Who is this for?", a: "First-time founders, solo founders, and small teams with an idea or early traction. Especially those from markets and backgrounds underrepresented in traditional VC." },
        { q: "What do you take in equity?", a: "3–5% of your company, depending on team size and stage. No fees. No salary cuts. Just equity." },
        { q: "Is it remote or in-person?", a: "100% remote. Our cohorts span 30+ countries. We do one in-person gathering at the end of each cohort." },
        { q: "What happens after the 12 weeks?", a: "You join the permanent and alumni network. Access to follow-on funding, introductions, and community forever." },
        { q: "What stage should I be at?", a: "Idea-stage to early revenue. If you have a working prototype and some signal, that's ideal. We also accept pre-product founders with exceptional backgrounds." },
    ];
    return <div className="page">
        <style>{`
      .acc-hero{padding:80px 48px 60px;border-bottom:1px solid rgba(245,244,240,.06);position:relative;overflow:hidden;}
      .acc-hl{font-family:'DM Serif Display',serif;font-size:clamp(48px,6vw,80px);letter-spacing:-.03em;line-height:1;margin-bottom:20px;}
      .acc-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:rgba(245,244,240,.07);}
      .acc-portfolio{padding:80px 48px;border-top:1px solid rgba(245,244,240,.06);}
      .portfolio-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:2px;margin-top:56px;}
      .port-card{padding:32px;position:relative;}
      .port-flag{font-size:28px;margin-bottom:12px;}
      .port-name{font-family:'Syne',sans-serif;font-weight:800;font-size:20px;margin-bottom:6px;}
      .port-desc{font-size:13px;color:#888880;line-height:1.6;margin-bottom:16px;}
      .port-meta{display:flex;gap:10px;flex-wrap:wrap;}
      .timeline-section{padding:80px 48px;border-top:1px solid rgba(245,244,240,.06);}
      .timeline{display:flex;flex-direction:column;gap:0;}
      .tl-item{display:flex;gap:32px;padding:28px 0;border-bottom:1px solid rgba(245,244,240,.05);}
      .tl-week{font-family:'DM Mono',monospace;font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:#444;min-width:80px;padding-top:4px;}
      .tl-title{font-weight:800;font-size:17px;margin-bottom:6px;}
      .tl-desc{font-size:13px;color:#888880;line-height:1.6;}
      .faq-section{padding:80px 48px;border-top:1px solid rgba(245,244,240,.06);background:rgba(245,244,240,.015);}
      .faq-item{border-bottom:1px solid rgba(245,244,240,.07);cursor:none;}
      .faq-q{display:flex;justify-content:space-between;align-items:center;padding:24px 0;font-weight:800;font-size:16px;}
      .faq-a{padding:0 0 24px;font-size:14px;color:#888880;line-height:1.7;}
      .acc-cta{padding:100px 48px;text-align:center;}
      .acc-cta-hl{font-family:'DM Serif Display',serif;font-size:clamp(44px,6vw,88px);line-height:.95;letter-spacing:-.03em;margin-bottom:24px;}
      @media(max-width:900px){
        .portfolio-grid{grid-template-columns:1fr 1fr;}
        .acc-stats{grid-template-columns:repeat(2,1fr);}
        .acc-hero,.acc-portfolio,.timeline-section,.faq-section,.acc-cta{padding:60px 24px;}
      }
      @media(max-width:600px){.portfolio-grid{grid-template-columns:1fr;}}
    `}</style>
        <div className="acc-hero">
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '600px', height: '600px', background: 'radial-gradient(ellipse,rgba(0,200,150,.05) 0%,transparent 70%)', pointerEvents: 'none' }} />
            <div className="s-label">and accelerate</div>
            <h1 className="acc-hl anim-fade-up">The program for<br />founders who<br /><span style={{ color: C.surge }}>deserve a shot.</span></h1>
            <p style={{ fontSize: 15, color: '#888880', maxWidth: 520, lineHeight: 1.65, marginBottom: 36 }}>12-week cohorts. 3–5% equity. A permanent alumni network. The combinator program for founders locked out of the traditional system.</p>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                <button className="btn btn-surge" onClick={() => setPage('apply')}>Apply to Cohort 03</button>
                <button className="btn btn-outline">Learn More</button>
            </div>
            <div style={{ marginTop: 28, fontFamily: "'DM Mono',monospace", fontSize: 10, letterSpacing: '.12em', textTransform: 'uppercase', color: '#333' }}>Applications close Mar 15, 2026 · cohort.03</div>
        </div>

        <div className="acc-stats">
            {[{ n: "Cohort 03", l: "Now Open" }, { n: "12 Weeks", l: "Program Length" }, { n: "3–5%", l: "Equity Taken" }, { n: "34", l: "Alumni Companies" }].map(s => <div key={s.l} className="home-stat card">
                <div className="stat-num" style={{ fontSize: 'clamp(32px,4vw,56px)' }}>{s.n}</div>
                <div className="stat-label">{s.l}</div>
            </div>)}
        </div>

        {/* PORTFOLIO */}
        <section className="acc-portfolio">
            <div className="s-label">Alumni Portfolio</div>
            <div className="portfolio-grid">
                {COHORT_COMPANIES.map(c => <div key={c.name} className="port-card card" data-hover>
                    <div className="port-flag">{c.flag}</div>
                    <div className="port-name">{c.name}</div>
                    <div className="port-desc">{c.desc}</div>
                    <div className="port-meta">
                        <span className="chip">{c.stage}</span>
                        <span className="chip">{c.raise}</span>
                        <span className="chip">{c.vertical}</span>
                    </div>
                </div>)}
            </div>
        </section>

        {/* TIMELINE */}
        <section className="timeline-section">
            <div className="s-label">12-Week Timeline</div>
            <div className="timeline">
                {[
                    { w: "Weeks 1–2", t: "Discovery & Foundation", d: "Understand your market, sharpen your thesis, define your ideal customer." },
                    { w: "Weeks 3–4", t: "Build in Public", d: "Ship your first version. Get real user feedback. Kill your darlings." },
                    { w: "Weeks 5–7", t: "Growth & Distribution", d: "Growth experiments, first revenue, and finding your distribution channel." },
                    { w: "Weeks 8–10", t: "Fundraising & Pitch", d: "Deck reviews, investor intros, and mock pitches with founders who've been through it." },
                    { w: "Weeks 11–12", t: "Demo Day Prep", d: "Refine your narrative. Meet your metrics. Present to 200+ investors and angels." },
                ].map(t => <div key={t.w} className="tl-item">
                    <div className="tl-week">{t.w}</div>
                    <div><div className="tl-title">{t.t}</div><div className="tl-desc">{t.d}</div></div>
                </div>)}
            </div>
        </section>

        {/* FAQ */}
        <section className="faq-section">
            <div className="s-label">FAQ</div>
            {faqs.map((f, i) => <div key={i} className="faq-item">
                <div className="faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)} data-hover>
                    <span>{f.q}</span>
                    <span style={{ color: '#444', fontSize: 18, transition: 'transform .3s', display: 'inline-block', transform: openFaq === i ? 'rotate(45deg)' : 'rotate(0)' }}>+</span>
                </div>
                {openFaq === i && <div className="faq-a" style={{ animation: 'slideDown .3s ease' }}>{f.a}</div>}
            </div>)}
        </section>

        {/* CTA */}
        <section className="acc-cta">
            <h2 className="acc-cta-hl">Ready to build<br />something real?</h2>
            <p style={{ fontSize: 16, color: '#888880', maxWidth: 400, margin: '0 auto 40px', lineHeight: 1.65 }}>Applications for Cohort 03 are open. 40 spots. 34 countries. One shot.</p>
            <button className="btn btn-surge" onClick={() => setPage('apply')}>Apply Now — It's Free</button>
        </section>
    </div>;
}
