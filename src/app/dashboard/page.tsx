"use client";

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
    Filter
} from 'lucide-react';
import styles from './dashboard.module.css';

export default function Dashboard() {
    // Demo data
    const rooms = [
        { id: '101', name: 'Ufficio 01', area: '25.5 m²', finish: 'Parquet', status: 'In Revisione' },
        { id: '102', name: 'Sala Riunioni', area: '42.0 m²', finish: 'Moquette', status: 'Approvato' },
        { id: '103', name: 'Open Space', area: '120.3 m²', finish: 'Resina', status: 'In Elaborazione' },
        { id: '104', name: 'Deposito', area: '15.2 m²', finish: 'Cemento Alt.', status: 'Approvato' },
    ];

    const getStatusClass = (status: string) => {
        switch (status) {
            case 'Approvato': return styles.statusPillApprovato;
            case 'In Revisione': return styles.statusPillInRevisione;
            case 'In Elaborazione': return styles.statusPillInElaborazione;
            default: return '';
        }
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
                        <h1>Panoramica Progetto</h1>
                        <p>Benvenuto, ecco i dati aggiornati del tuo modello BIM.</p>
                    </div>
                    <button className={styles.addBtn}>
                        <Plus size={18} />
                        Nuovo Locale
                    </button>
                </header>

                {/* Stats Grid */}
                <section className={styles.statsGrid}>
                    <div className={`${styles.statCard} glass`}>
                        <span className={styles.statLabel}>Locali Totali</span>
                        <span className={styles.statValue}>124</span>
                        <span className={`${styles.statTrend} ${styles.statTrendPositive}`}>+3 questa settimana</span>
                    </div>
                    <div className={`${styles.statCard} glass`}>
                        <span className={styles.statLabel}>Superficie Totale</span>
                        <span className={styles.statValue}>2,450 m²</span>
                        <span className={styles.statTrend}>Nessuna modifica</span>
                    </div>
                    <div className={`${styles.statCard} glass`}>
                        <span className={styles.statLabel}>Stato Revisione</span>
                        <span className={styles.statValue}>85%</span>
                        <span className={`${styles.statTrend} ${styles.statTrendPositive}`}>+12% vs ieri</span>
                    </div>
                </section>

                {/* Table Section */}
                <section className={`${styles.tableSection} glass`}>
                    <div className={styles.tableHeader}>
                        <h2>Dettaglio Room Data</h2>
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
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nome Locale</th>
                                    <th>Superficie</th>
                                    <th>Finitura</th>
                                    <th>Stato</th>
                                    <th>Azione</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rooms.map((room) => (
                                    <tr key={room.id}>
                                        <td><strong>{room.id}</strong></td>
                                        <td>{room.name}</td>
                                        <td>{room.area}</td>
                                        <td><span className={styles.tagFinish}>{room.finish}</span></td>
                                        <td>
                                            <span className={`${styles.statusPill} ${getStatusClass(room.status)}`}>
                                                {room.status}
                                            </span>
                                        </td>
                                        <td>
                                            <button className={styles.editLink}>Modifica</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </main>
        </div>
    );
}
