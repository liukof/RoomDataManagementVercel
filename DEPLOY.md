# 🚀 Guida al Deployment su Vercel

Questo progetto è pronto per essere deployato su Vercel tramite Git. Segui questi passaggi:

## 1. Carica il progetto su GitHub
Se non l'hai già fatto, inizializza un repository Git e caricalo su GitHub:

```bash
# Entra nella cartella
cd bim-web-dashboard

# Inizializza (se non già fatto)
git init
git add .
git commit -m "feat: initial premium dashboard design"

# Crea un nuovo repo su GitHub e poi:
git remote add origin https://github.com/TUO_UTENTE/NOME_REPO.git
git branch -M main
git push -u origin main
```

## 2. Collega Vercel
1. Vai su [Vercel](https://vercel.com/new).
2. Seleziona il repository GitHub appena creato.
3. Vercel rileverà automaticamente che si tratta di un progetto **Next.js**.
4. Clicca su **Deploy**.

## 3. Configurazione (Opzionale)
Se il tuo progetto utilizza variabili d'ambiente (es. URL di Supabase), assicurati di aggiungerle nella sezione **Environment Variables** nelle impostazioni del progetto su Vercel.

---

### Sviluppo Locale
Per avviare il progetto in locale:
```bash
npm install
npm run dev
```
L'app sarà disponibile su `http://localhost:3000`.
