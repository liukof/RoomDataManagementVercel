import Link from 'next/link';

export default function UsersPage() {
    return (
        <div style={{ padding: '2rem', minHeight: '100vh', background: 'var(--background)', color: 'var(--foreground)' }}>
            <h1>Team</h1>
            <p>Questa è la pagina placeholder per il Team.</p>
            <br />
            <Link href="/dashboard" style={{ color: '#3b82f6', textDecoration: 'underline' }}>
                &larr; Torna alla Dashboard
            </Link>
        </div>
    );
}
