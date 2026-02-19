"use client";

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function DebugSupabase() {
    const [tables, setTables] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function checkSupabase() {
            try {
                const supabase = createClient();

                // Cerchiamo di capire quali tabelle esistono provando query comuni
                // Dato che non possiamo listare tabelle via JS client facilmente senza permessi speciali,
                // proviamo a interrogare una tabella 'rooms' o 'locali' che è il core del progetto.
                const { data, error: fetchError } = await supabase
                    .from('rooms')
                    .select('*')
                    .limit(1);

                if (fetchError) {
                    // Se 'rooms' non esiste, proviamo 'locali'
                    const { data: data2, error: fetchError2 } = await supabase
                        .from('locali')
                        .select('*')
                        .limit(1);

                    if (fetchError2) {
                        setError(`Errore nel trovare tabelle standard (rooms/locali): ${fetchError.message}`);
                    } else {
                        setTables([{ name: 'locali', sample: data2 }]);
                    }
                } else {
                    setTables([{ name: 'rooms', sample: data }]);
                }
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        checkSupabase();
    }, []);

    if (loading) return <div style={{ padding: '2rem' }}>Connessione a Supabase in corso...</div>;
    if (error) return <div style={{ padding: '2rem', color: 'red' }}>Errore: {error}</div>;

    return (
        <div style={{ padding: '2rem' }}>
            <h1>Debug Supabase</h1>
            <p>Tabelle trovate:</p>
            <pre>{JSON.stringify(tables, null, 2)}</pre>
        </div>
    );
}
