"use client";

import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="container" style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      backgroundImage: `radial-gradient(at 0% 0%, var(--glass-border) 0, transparent 50%), radial-gradient(at 50% 100%, var(--glass-border) 0, transparent 50%)`
    }}>
      {/* Header / Nav */}
      <header className="glass" style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        padding: '1rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{
            width: '32px',
            height: '32px',
            background: 'var(--accent)',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold'
          }}>B</div>
          <span style={{ fontWeight: 700, fontSize: '1.2rem', letterSpacing: '-0.5px' }}>BIM DASHBOARD</span>
        </div>
        <nav style={{ display: 'flex', gap: '2rem', fontSize: '0.9rem', fontWeight: 500 }}>
          <a href="#" style={{ opacity: 0.8 }}>Home</a>
          <a href="#" style={{ opacity: 0.8 }}>Progetti</a>
          <a href="#" style={{ opacity: 0.8 }}>Analisi</a>
          <Link href="/dashboard" style={{
            background: 'var(--foreground)',
            color: 'var(--background)',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '6px',
            fontWeight: 600,
            cursor: 'pointer',
            textDecoration: 'none'
          }}>Sign In</Link>
        </nav>
      </header>

      {/* Hero Section */}
      <main style={{ flex: 1, padding: '4rem 2rem' }}>
        <div className="animate-fade" style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <h1 style={{
            fontSize: '4rem',
            fontWeight: 800,
            lineHeight: 1.1,
            marginBottom: '1.5rem',
            background: 'linear-gradient(135deg, var(--foreground) 0%, var(--accent) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Gestisci i tuoi dati BIM <br /> con velocità ed eleganza.
          </h1>
          <p style={{
            fontSize: '1.25rem',
            opacity: 0.7,
            maxWidth: '700px',
            margin: '0 auto 3rem',
            lineHeight: 1.6
          }}>
            La piattaforma cloud definitiva per centralizzare le informazioni degli ambienti,
            sincronizzare i modelli Revit e analizzare i dati in tempo reale.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '5rem' }}>
            <Link href="/dashboard" style={{
              background: 'var(--accent)',
              color: 'white',
              border: 'none',
              padding: '1rem 2rem',
              borderRadius: '12px',
              fontSize: '1.1rem',
              fontWeight: 600,
              cursor: 'pointer',
              textDecoration: 'none',
              boxShadow: '0 10px 15px -3px var(--accent-glow)'
            }}>Inizia Ora</Link>
            <button className="glass" style={{
              padding: '1rem 2rem',
              borderRadius: '12px',
              fontSize: '1.1rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}>Guarda Demo</button>
          </div>

          {/* Feature Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            marginTop: '4rem'
          }}>
            <FeatureCard
              icon="📍"
              title="Room Management"
              desc="Controlla parametri, superfici e finiture di ogni locale dal tuo browser."
            />
            <FeatureCard
              icon="🔄"
              title="Cloud Sync"
              desc="Sincronizzazione bidirezionale istantanea con i tuoi modelli BIM centralizzati."
            />
            <FeatureCard
              icon="📊"
              title="Advanced Analytics"
              desc="Visualizza grafici e report dettagliati sull'andamento del progetto."
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer style={{
        padding: '3rem 2rem',
        borderTop: '1px solid var(--card-border)',
        textAlign: 'center',
        opacity: 0.6,
        fontSize: '0.9rem'
      }}>
        © 2026 BIM Data Manager Pro. Precisione e Design nel settore AEC.
      </footer>
    </div>

  );
}

function FeatureCard({ icon, title, desc }: { icon: string, title: string, desc: string }) {
  return (
    <div className="glass" style={{
      padding: '2.5rem',
      borderRadius: '24px',
      textAlign: 'left',
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      transition: 'transform 0.3s ease'
    }}>
      <div style={{ fontSize: '2.5rem' }}>{icon}</div>
      <h3 style={{ fontWeight: 700, fontSize: '1.5rem' }}>{title}</h3>
      <p style={{ opacity: 0.7, lineHeight: 1.5 }}>{desc}</p>
    </div>
  );
}
