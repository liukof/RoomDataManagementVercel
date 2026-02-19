"use client";

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import styles from '../dashboard.module.css';
import { Map as MapIcon, Search, Plus, Trash2, Save } from 'lucide-react';

export default function RoomsManagement() {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchRooms();
    }, []);

    const fetchRooms = async () => {
        const supabase = createClient();
        const { data, error } = await supabase
            .from('rooms')
            .select('*')
            .order('room_number', { ascending: true });

        if (!error && data) setRooms(data);
        setLoading(false);
    };

    // Filtro ricerca (logica simile al tuo Streamlit)
    const filteredRooms = rooms.filter(room => 
        room.room_number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        room.room_name_planned?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className={styles.dashboardContainer}>
            <main className={styles.mainContent}>
                <header className={styles.topBar}>
                    <h1 className={styles.welcomeText}>📍 Rooms Management</h1>
                </header>

                {/* Statistiche come nel tuo Streamlit */}
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
                            <input 
                                type="text" 
                                placeholder="Cerca numero o nome..." 
                                className={styles.searchInput}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className={styles.tableWrapper}>
                        <table className={styles.dataTable}>
                            <thead>
                                <tr>
                                    <th className={styles.tableHeaderCell}>STATUS</th>
                                    <th className={styles.tableHeaderCell}>NUMBER</th>
                                    <th className={styles.tableHeaderCell}>NAME</th>
                                    <th className={styles.tableHeaderCell}>AREA (m²)</th>
                                    <th className={styles.tableHeaderCell}>LAST SYNC</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr><td colSpan={5} style={{textAlign:'center', padding:'2rem'}}>Caricamento...</td></tr>
                                ) : filteredRooms.map((room: any) => (
                                    <tr key={room.id}>
                                        <td className={styles.tableCell}>
                                            {room.is_synced ? "✅" : "❌"}
                                        </td>
                                        <td className={styles.tableCell}><strong>{room.room_number}</strong></td>
                                        <td className={styles.tableCell}>{room.room_name_planned}</td>
                                        <td className={styles.tableCell}>{room.area || 0} m²</td>
                                        <td className={styles.tableCell}>
                                            {room.last_sync_at ? new Date(room.last_sync_at).toLocaleDateString() : "Mai"}
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
