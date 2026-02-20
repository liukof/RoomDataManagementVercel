import Link from 'next/link';

export default function SettingsPage() {
    return (
        <div style={{ padding: '2rem', minHeight: '100vh', background: 'var(--background)', color: 'var(--foreground)' }}>
            <h1>Impostazioni</h1>
            <p>Questa è la pagina placeholder per le Impostazioni.</p>
            <br />
            <Link href="/dashboard" style={{ color: '#3b82f6', textDecoration: 'underline' }}>
                &larr; Torna alla Dashboard
            </Link>
        </div>
    );
}
