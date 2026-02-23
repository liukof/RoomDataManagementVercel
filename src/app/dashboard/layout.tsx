import Sidebar from './components/Sidebar';
import styles from './dashboard.module.css';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className={styles.dashboardContainer}>
            <Sidebar />
            {/* Contenitore principale dove Next.js idraterà il componente della pagina corrente */}
            {children}
        </div>
    );
}
