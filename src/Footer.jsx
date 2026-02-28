/* ─── FOOTER ─────────────────────────────────────────────── */
export default function Footer({ setPage }) {
  return (
    <>
      <style>{`
        .footer {
          padding: 48px;
          border-top: 1px solid rgba(245,244,240,.08);
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 24px;
        }
        .footer-logo {
          font-family: 'DM Serif Display', serif;
          font-size: 22px;
        }
        .footer-links {
          display: flex;
          gap: 24px;
          list-style: none;
        }
        .footer-link {
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          letter-spacing: .1em;
          text-transform: uppercase;
          color: #888880;
          transition: color .2s;
          cursor: none;
        }
        .footer-link:hover { color: #F5F4F0; }
        .footer-meta {
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          letter-spacing: .1em;
          text-transform: uppercase;
          color: #333;
        }
        @media (max-width: 768px) {
          .footer { padding: 32px 24px; flex-direction: column; gap: 20px; }
        }
      `}</style>

      <footer className="footer">
        <div
          className="footer-logo"
          onClick={() => setPage('home')}
          data-hover
          style={{ cursor: 'none' }}
        >
          and.
        </div>

        <ul className="footer-links">
          {['talent', 'build', 'accelerate', 'about'].map(p => (
            <li key={p}>
              <span
                className="footer-link"
                onClick={() => setPage(p)}
                data-hover
                style={{ textTransform: 'capitalize' }}
              >
                {p}
              </span>
            </li>
          ))}
        </ul>

        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <a href="mailto:team.andbuild@gmail.com" className="footer-link" style={{ textDecoration: 'none', cursor: 'pointer' }}>
            team.andbuild@gmail.com
          </a>
          <a href="https://www.instagram.com/andbuild.social/" target="_blank" rel="noopener noreferrer" className="footer-link" style={{ textDecoration: 'none', cursor: 'pointer' }}>
            @andbuild.social
          </a>
        </div>

        <div className="footer-meta">v1.0 · 2026 · Brand by and™</div>
      </footer>
    </>
  );
}
