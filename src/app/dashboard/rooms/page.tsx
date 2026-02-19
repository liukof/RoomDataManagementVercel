"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
    Map as MapIcon, 
    Plus, 
    Search, 
    Filter, 
    ArrowLeft 
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import styles from '../dashboard.module.css'; // Riutilizziamo i tuoi stili

interface Room {
    id: string;
    number?: string;
    name?: string;
    area?: string;
    finish_wall?: string;
    status?: string;
}

export default function RoomsPage() {
    const [rooms, setRooms] = useState<Room[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRooms = async () => {
            const supabase = createClient();
            const { data, error } = await supabase
                .from('rooms')
                .select('*')
                .order('number', { ascending: true });

            if (!error && data) {
                setRooms(data as Room[]);
            }
            setLoading(false);
        };

        fetchRooms();
    }, []);

    return (
        <div className={styles.dashboardContainer}>
            {/* Sidebar semplificata o riutilizzata */}
            <main className={styles.mainContent}>
                <header className={styles.topBar}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <Link href="/dashboard" className={styles.filterBtn}>
                            <ArrowLeft size={18} />
                        </Link>
                        <h1 className={styles.welcomeText}>Gestione Locali</h1>
                    </div>
                </header>

                <section className={styles.statsGrid}>
                    <div className={styles.statCard}>
                        <div className={styles.statInfo}>
                            <span className={styles.statLabel}>Locali Totali</span>
                            <span className={styles.statValue}>{rooms.length}</span>
                        </div>
                        <div className={`${styles.statIcon} ${styles.blueIcon}`}>
                            <MapIcon size={24} />
                        </div>
                    </div>
                </section>

                <section className={styles.tableSection}>
                    <div className={styles.tableHeader}>
                        <div className={styles.searchBar}>
                            <Search size={18} />
                            <input type="text" placeholder="Cerca locale o numero..." className={styles.searchInput} />
                        </div>
                        <button className={styles.addBtn}>
                            <Plus size={18} /> Nuovo Locale
                        </button>
                    </div>

                    <div className={styles.tableWrapper}>
                        {loading ? (
                            <p style={{ padding: '2rem' }}>Caricamento locali...</p>
                        ) : (
                            <table className={styles.dataTable}>
                                <thead>
                                    <tr>
                                        <th className={styles.tableHeaderCell}>N. LOCALE</th>
                                        <th className={styles.tableHeaderCell}>NOME</th>
                                        <th className={styles.tableHeaderCell}>SUPERFICIE</th>
                                        <th className={styles.tableHeaderCell}>FINITURA PARETI</th>
                                        <th className={styles.tableHeaderCell}>STATO</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rooms.map((room) => (
                                        <tr key={room.id}>
                                            <td className={styles.tableCell}><strong>{room.number || room.id}</strong></td>
                                            <td className={styles.tableCell}>{room.name || 'N/A'}</td>
                                            <td className={styles.tableCell}>{room.area ? `${room.area} m²` : '-'}</td>
                                            <td className={styles.tableCell}>
                                                <span className={styles.tagFinish}>{room.finish_wall || 'Standard'}</span>
                                            </td>
                                            <td className={styles.tableCell}>
                                                <span className={styles.statusPill}>
                                                    {room.status || 'Sincronizzato'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
}
