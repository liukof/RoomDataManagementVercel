"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    BarChart3,
    LayoutDashboard,
    Map as MapIcon,
    Settings,
    Users,
    LogOut,
} from 'lucide-react';
import styles from '../dashboard.module.css';

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className={`${styles.sidebar} glass`}>
            <div className={styles.logoSection}>
                <div className={styles.logoBox}>B</div>
                <span className={styles.logoText}>BIM MANAGER</span>
            </div>

            <nav className={styles.sidebarNav}>
                <Link href="/dashboard" className={`${styles.navItem} ${pathname === '/dashboard' ? styles.active : ''}`}>
                    <LayoutDashboard size={20} />
                    <span>Dashboard</span>
                </Link>
                <Link href="/dashboard/rooms" className={`${styles.navItem} ${pathname === '/dashboard/rooms' ? styles.active : ''}`}>
                    <MapIcon size={20} />
                    <span>Locali</span>
                </Link>
                <Link href="/dashboard/analytics" className={`${styles.navItem} ${pathname === '/dashboard/analytics' ? styles.active : ''}`}>
                    <BarChart3 size={20} />
                    <span>Analisi</span>
                </Link>
                <Link href="/dashboard/users" className={`${styles.navItem} ${pathname === '/dashboard/users' ? styles.active : ''}`}>
                    <Users size={20} />
                    <span>Team</span>
                </Link>
            </nav>

            <div className={styles.sidebarFooter}>
                <Link href="/dashboard/settings" className={`${styles.navItem} ${pathname === '/dashboard/settings' ? styles.active : ''}`}>
                    <Settings size={20} />
                    <span>Impostazioni</span>
                </Link>
                <button className={`${styles.navItem} ${styles.logoutBtn}`}>
                    <LogOut size={20} />
                    <span>Esci</span>
                </button>
            </div>
        </aside>
    );
}
