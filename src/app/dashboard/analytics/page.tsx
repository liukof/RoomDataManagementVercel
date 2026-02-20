import Link from 'next/link';

export default function AnalyticsPage() {
    return (
        <div style={{ padding: '2rem', minHeight: '100vh', background: 'var(--background)', color: 'var(--foreground)' }}>
            <h1>Analisi</h1>
            <p>Questa è la pagina placeholder per le Analisi.</p>
            <br />
            <Link href="/dashboard" style={{ color: '#3b82f6', textDecoration: 'underline' }}>
                &larr; Torna alla Dashboard
            </Link>
        </div>
    );
}
