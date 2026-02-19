"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
    BarChart3,
    LayoutDashboard,
    Map as MapIcon,
    Settings,
    Users,
    LogOut,
    Plus,
    Search,
    Filter,
    RefreshCw
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import styles from './dashboard.module.css';

export default function Dashboard() {
    const [rooms, setRooms] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({ total: 0, area: 0, review: 85 });
    const supabase = createClient();

    const fetchRooms = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('rooms')
                .select('*')
                .order('id', { ascending: true });

            if (error) throw error;
            if (data) {
                setRooms(data);
                // Calcola statistiche reali
                const totalArea = data.reduce((acc, room) => acc + (parseFloat(room.area) || 0), 0);
                setStats({
                    total: data.length,
                    area: Math.round(totalArea),
                    review: 85 // Questo potrebbe essere dinamico se hai un campo 'status'
                });
            }
        } catch (err) {
            console.error('Errore caricamento dati:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRooms();
    }, []);

    const getStatusClass = (status: string) => {
        if (!status) return '';
        const s = status.toLowerCase();
        if (s.includes('approvato')) return styles.statusPillApprovato;
        if (s.includes('revisione')) return styles.statusPillInRevisione;
        if (s.includes('elaborazione') || s.includes('progress')) return styles.statusPillInElaborazione;
        return '';
    };

    return (
        <div className={styles.dashboardContainer}>
            {/* Sidebar */}
            <aside className={`${styles.sidebar} glass`}>
                <div className={styles.logoSection}>
                    <div className={styles.logoBox}>B</div>
                    <span className={styles.logoText}>BIM MANAGER</span>
                </div>

                <nav className={styles.sidebarNav}>
                    <Link href="/dashboard" className={`${styles.navItem} ${styles.active}`}>
                        <LayoutDashboard size={20} />
                        <span>Dashboard</span>
                    </Link>
                    <Link href="/dashboard/rooms" className={styles.navItem}>
                        <MapIcon size={20} />
                        <span>Locali</span>
                    </Link>
                    <Link href="/dashboard/analytics" className={styles.navItem}>
                        <BarChart3 size={20} />
                        <span>Analisi</span>
                    </Link>
                    <Link href="/dashboard/users" className={styles.navItem}>
                        <Users size={20} />
                        <span>Team</span>
                    </Link>
                </nav>

                <div className={styles.sidebarFooter}>
                    <Link href="/dashboard/settings" className={styles.navItem}>
                        <Settings size={20} />
                        <span>Impostazioni</span>
                    </Link>
                    <button className={`${styles.navItem} ${styles.logoutBtn}`}>
                        <LogOut size={20} />
                        <span>Esci</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className={styles.mainContent}>
                <header className={styles.contentHeader}>
                    <div className={styles.headerTitle}>
                        <h1 className={styles.headerTitleH1}>Panoramica Progetto</h1>
                        <p className={styles.headerTitleP}>Dati in tempo reale dal tuo database Supabase.</p>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button onClick={fetchRooms} className={styles.filterBtn} style={{ padding: '0.75rem' }}>
                            <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
                        </button>
                        <button className={styles.addBtn}>
                            <Plus size={18} />
                            Nuovo Locale
                        </button>
                    </div>
                </header>

                {/* Stats Grid */}
                <section className={styles.statsGrid}>
                    <div className={`${styles.statCard} glass`}>
                        <span className={styles.statLabel}>Locali Totali</span>
                        <span className={styles.statValue}>{loading ? '...' : stats.total}</span>
                        <span className={`${styles.statTrend} ${styles.statTrendPositive}`}>Sincronizzato</span>
                    </div>
                    <div className={`${styles.statCard} glass`}>
                        <span className={styles.statLabel}>Superficie Totale</span>
                        <span className={styles.statValue}>{loading ? '...' : `${stats.area} m²`}</span>
                        <span className={styles.statTrend}>Dal modello BIM</span>
                    </div>
                    <div className={`${styles.statCard} glass`}>
                        <span className={styles.statLabel}>Stato Revisione</span>
                        <span className={styles.statValue}>{stats.review}%</span>
                        <span className={`${styles.statTrend} ${styles.statTrendPositive}`}>In linea</span>
                    </div>
                </section>

                {/* Table Section */}
                <section className={`${styles.tableSection} glass`}>
                    <div className={styles.tableHeader}>
                        <h2 className={styles.tableHeaderH2}>Dettaglio Room Data</h2>
                        <div className={styles.tableActions}>
                            <div className={styles.searchBox}>
                                <Search size={16} />
                                <input type="text" placeholder="Cerca locale..." />
                            </div>
                            <button className={styles.filterBtn}>
                                <Filter size={16} />
                                Filtra
                            </button>
                        </div>
                    </div>

                    <div className={styles.tableWrapper}>
                        {loading ? (
                            <div style={{ padding: '3rem', textAlign: 'center', opacity: 0.5 }}>Caricamento dati...</div>
                        ) : (
                            <table className={styles.dataTable}>
                                <thead>
                                    <tr>
                                        <th className={styles.tableHeaderCell}>ID</th>
                                        <th className={styles.tableHeaderCell}>Nome Locale</th>
                                        <th className={styles.tableHeaderCell}>Superficie</th>
                                        <th className={styles.tableHeaderCell}>Finitura</th>
                                        <th className={styles.tableHeaderCell}>Stato</th>
                                        <th className={styles.tableHeaderCell}>Azione</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rooms.length === 0 ? (
                                        <tr>
                                            <td colSpan={6} className={styles.tableCell} style={{ textAlign: 'center', padding: '2rem' }}>
                                                Nessun locale trovato nella tabella 'rooms'.
                                            </td>
                                        </tr>
                                    ) : (
                                        rooms.map((room) => (
                                            <tr key={room.id}>
                                                <td className={styles.tableCell}><strong>{room.number || room.id}</strong></td>
                                                <td className={styles.tableCell}>{room.name || 'Senza nome'}</td>
                                                <td className={styles.tableCell}>{room.area ? `${room.area} m²` : '-'}</td>
                                                <td className={styles.tableCell}><span className={styles.tagFinish}>{room.finish_wall || room.finish || 'Non spec.'}</span></td>
                                                <td className={styles.tableCell}>
                                                    <span className={`${styles.statusPill} ${getStatusClass(room.status || 'In Elaborazione')}`}>
                                                        {room.status || 'Sincronizzato'}
                                                    </span>
                                                </td>
                                                <td className={styles.tableCell}>
                                                    <button className={styles.editLink}>Modifica</button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
}
