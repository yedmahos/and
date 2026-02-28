
const C = {
    ignite: "#FF4D1C", blueprint: "#1C3FFF",
    surge: "#00C896", canvas: "#F5F4F0", offWhite: "#EDECE7",
    lightGray: "#D8D7D2", midGray: "#888880",
};

/* ─── PAGE: ABOUT ────────────────────────────────────────── */
export default function AboutPage({ setPage }) {
    return <div className="page">
        <style>{`
      .about-hero{padding:80px 48px;border-bottom:1px solid rgba(245,244,240,.06);}
      .about-hl{font-family:'DM Serif Display',serif;font-size:clamp(56px,7vw,100px);letter-spacing:-.03em;line-height:.95;margin-bottom:28px;}
      .about-grid{display:grid;grid-template-columns:1fr 1fr;gap:80px;padding:80px 48px;border-top:1px solid rgba(245,244,240,.06);}
      .team-section{padding:80px 48px;border-top:1px solid rgba(245,244,240,.06);}
      .team-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:2px;margin-top:56px;}
      .team-card{padding:32px;}
      .team-avatar{width:64px;height:64px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:'DM Serif Display',serif;font-size:22px;margin-bottom:16px;}
      .team-name{font-weight:800;font-size:18px;margin-bottom:4px;}
      .team-role{font-family:'DM Mono',monospace;font-size:11px;letter-spacing:.06em;color:#888880;margin-bottom:12px;}
      .team-bio{font-size:13px;color:#888880;line-height:1.65;}
      .values-section{padding:80px 48px;border-top:1px solid rgba(245,244,240,.06);background:rgba(245,244,240,.015);}
      .values-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:2px;margin-top:56px;}
      .value-card{padding:40px;}
      .value-num{font-family:'DM Mono',monospace;font-size:10px;letter-spacing:.15em;color:#444;margin-bottom:16px;}
      .value-title{font-weight:800;font-size:20px;margin-bottom:10px;}
      .value-desc{font-size:14px;color:#888880;line-height:1.65;}
      @media(max-width:900px){.about-grid,.team-grid,.values-grid{grid-template-columns:1fr;}.about-hero,.about-grid,.team-section,.values-section{padding:60px 24px;}}
    `}</style>
        <div className="about-hero">
            <div className="s-label">About and.</div>
            <h1 className="about-hl anim-fade-up">We believe<br />the best builders<br /><span style={{ color: C.ignite }}>aren't in SF.</span></h1>
            <p style={{ fontSize: 16, color: '#888880', maxWidth: 560, lineHeight: 1.7 }}>and was born from a simple observation: the infrastructure of opportunity — top-tier talent networks, funded accelerators, elite dev shops — was built for a tiny fraction of the world's founders. We're fixing that.</p>
        </div>
        <div className="about-grid">
            <div>
                <div className="s-label">Our Story</div>
                <p style={{ fontSize: 15, color: '#888880', lineHeight: 1.8, marginBottom: 20 }}>and started in 2024 when three founders — all rejected from top accelerators despite strong products — decided to build the thing they wished existed.</p>
                <p style={{ fontSize: 15, color: '#888880', lineHeight: 1.8, marginBottom: 20 }}>In 18 months, we've run two accelerator cohorts, placed 400+ freelancers, and helped 30 startups ship MVPs. We've done it without VC money, without a San Francisco office, and without asking for permission.</p>
                <p style={{ fontSize: 15, color: '#888880', lineHeight: 1.8 }}>This is what we believe: talent is evenly distributed. Opportunity is not. and exists to close that gap.</p>
            </div>
            <div>
                <div className="s-label">By the Numbers</div>
                {[{ n: "34", l: "Countries represented in our network" }, { n: "$2.4M", l: "Raised by alumni companies" }, { n: "1,200+", l: "Verified builders on the platform" }, { n: "92%", l: "Client satisfaction on and build projects" }].map(s => <div key={s.l} style={{ display: 'flex', gap: 20, padding: '20px 0', borderBottom: '1px solid rgba(245,244,240,.06)' }}>
                    <div style={{ fontFamily: "'DM Serif Display',serif", fontSize: 40, letterSpacing: '-.02em', minWidth: 100 }}>{s.n}</div>
                    <div style={{ fontSize: 14, color: '#888880', lineHeight: 1.5, paddingTop: 8 }}>{s.l}</div>
                </div>)}
            </div>
        </div>

        {/* TEAM */}
        <section className="team-section">
            <div className="s-label">Founding Team</div>
            <div className="team-grid" style={{ marginBottom: 48 }}>
                {[
                    { n: "Soham Dey", r: "Co-Founder & CEO", av: "SD", c: C.ignite, bio: "The architect of and. Obsessed with closing the opportunity gap for builders across the world." },
                    { n: "Sagnik Sarkar", r: "Co-Founder & CTO", av: "SS", c: C.blueprint, bio: "The engineer behind and's infrastructure. Turns ambitious product ideas into reliable, scalable systems." },
                    { n: "Suparna Raha", r: "Co-Founder & COO", av: "SR", c: C.surge, bio: "Brings operational precision to every corner of and. Keeps the mission moving and the team aligned." }
                ].map(t => <div key={t.n} className="team-card card" data-hover>
                    <div className="team-avatar" style={{ background: t.c + '22', color: t.c }}>{t.av}</div>
                    <div className="team-name">{t.n}</div>
                    <div className="team-role">{t.r}</div>
                    <div className="team-bio">{t.bio}</div>
                </div>)}
            </div>

            <div className="s-label">Core Team</div>
            <div className="team-grid">
                {[
                    { n: "Asmita Chakrabarty", r: "Marketing Lead", av: "AC", c: C.ignite, bio: "Shapes how and shows up in the world — from brand storytelling to growth campaigns that actually convert." },
                    { n: "Krishnendu Karmakar", r: "Content Lead", av: "KK", c: '#888880', bio: "The eye behind and's visual identity. Crafts every pixel with intention, turning brand values into lived aesthetics." }
                ].map(t => <div key={t.n} className="team-card card" data-hover>
                    <div className="team-avatar" style={{ background: t.c + '22', color: t.c }}>{t.av}</div>
                    <div className="team-name">{t.n}</div>
                    <div className="team-role">{t.r}</div>
                    <div className="team-bio">{t.bio}</div>
                </div>)}
            </div>
        </section>

        {/* VALUES */}
        <section className="values-section">
            <div className="s-label">Our Values</div>
            <div className="values-grid">
                {[
                    { n: "01", t: "Geography is not destiny.", d: "We believe where you were born should have nothing to do with your access to opportunity." },
                    { n: "02", t: "Ship first. Polish later.", d: "Done beats perfect. We value founders who move fast and learn from real users." },
                    { n: "03", t: "Community over competition.", d: "Your cohort-mates are your biggest resource. We build culture that makes people want to help each other." },
                    { n: "04", t: "Earn trust, don't assume it.", d: "Our verification processes, our equity terms, our pricing — all built to be fair and transparent." },
                ].map(v => <div key={v.n} className="value-card card">
                    <div className="value-num">{v.n}</div>
                    <div className="value-title">{v.t}</div>
                    <div className="value-desc">{v.d}</div>
                </div>)}
            </div>
        </section>
    </div>;
}
