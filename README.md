# Culturele INTROWEEK MBO — Complete Lokale Setup Guide (A tot Z)

Deze handleiding helpt je het project lokaal te draaien met een Supabase database, inclusief geavanceerde tips, troubleshooting en productie-advies.

Inhoud:
- Systeemvereisten
- Project downloaden (ZIP of Git)
- Node.js installeren
- Dependencies installeren
- Environment variables (.env.local)
- Database-setup in Supabase (tabellen, policies, admin, storage)
- Starten van de development server
- Testscenario’s (publiek + admin)
- Verifiëren van databaseconnectie
- Projectstructuur
- Troubleshooting
- Development scripts en quality
- Beveiliging en productie
- Checklist (alles werkend)
- Appendix: Supabase lokaal (optioneel)

---

## Systeemvereisten

- OS: macOS, Windows 10/11 of Linux
- Node.js: LTS 18.x of 20.x (aanbevolen)
- npm 9+ (of pnpm 8+ / yarn 3+)
- Git 2.4+
- Supabase account (gratis tier is voldoende)
- Browser: Chrome/Edge/Firefox (laatste)

Controleer versies:
```sh
node --version
npm --version
git --version
```

---

## Stap 1: Download het Project

Optie A — Download ZIP:
1. Klik op de ⋯ (drie puntjes) rechtsboven → “Download ZIP”
2. Pak het ZIP-bestand uit
3. Open Terminal/Command Prompt en navigeer naar de map:
```sh
cd pad/naar/culture-introweek-mbo
```

Optie B — Via GitHub:
```sh
git clone <jouw-repository-url>
cd culture-introweek-mbo
```

---

## Stap 2: Installeer Node.js

1. Ga naar https://nodejs.org
2. Download LTS (18 of 20)
3. Installeer en verifieer:
```sh
node --version
npm --version
```

---

## Stap 3: Installeer Project Dependencies

In de projectmap:
```sh
npm install
```
- Dit haalt alle packages op (Next.js, React, Tailwind CSS, e.d.)
- Tip: wil je pnpm gebruiken?
  ```sh
  corepack enable
  pnpm install
  ```

---

## Stap 4: Environment Variables (.env.local)

Maak in de root een bestand `.env.local` met jouw Supabase gegevens:
```dotenv
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://jouw-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=jouw_anon_key_hier
SUPABASE_SERVICE_ROLE_KEY=jouw_service_role_key_hier

# Optioneel (handig voor links en e-mail)
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Next.js telemetrie uitschakelen (optioneel)
NEXT_TELEMETRY_DISABLED=1
```

Belangrijk:
- NEXT_PUBLIC_ waarden komen in de browser; plaats daar geen secrets.
- SUPABASE_SERVICE_ROLE_KEY is alleen server-side te gebruiken (nooit client-side loggen of exposen).
- Herstart de dev server na wijzigingen in .env.local.

---

## Stap 5: Database Setup (Supabase Cloud)

### 5.1 Maak een Supabase Account en Project
1. Ga naar https://supabase.com → “Start your project”
2. Maak een gratis account
3. “New Project”
   - Name: `culturele-introweek-mbo`
   - Database Password: sterk wachtwoord (noteer dit)
   - Region: West EU (Ireland)
4. Wacht ±2–3 minuten

### 5.2 Haal API-gegevens op
1. In je project: Settings → API
2. Kopieer:
   - Project URL (bv. `https://xxxxx.supabase.co`)
   - anon public key
   - service_role key

Vul deze in je `.env.local` in.

### 5.3 Maak de Database Tabellen en Policies
Supabase → SQL Editor → New Query → plak en run:
```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create institutions table
CREATE TABLE IF NOT EXISTS institutions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  general_email TEXT,
  logo_url TEXT,
  postal_address TEXT,
  postal_city TEXT,
  postal_zipcode TEXT,
  visit_address TEXT,
  visit_city TEXT,
  visit_zipcode TEXT,
  availability JSONB DEFAULT '[]'::jsonb,
  time_slots JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create teachers table
CREATE TABLE IF NOT EXISTS teachers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  function TEXT,
  email TEXT NOT NULL,
  email_confirm TEXT NOT NULL,
  school TEXT NOT NULL,
  program_name TEXT,
  program_address TEXT,
  number_of_classes INTEGER DEFAULT 1,
  classes JSONB DEFAULT '[]'::jsonb,
  preferred_day TEXT,
  activity_count INTEGER DEFAULT 1,
  time_preference TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create admins table
CREATE TABLE IF NOT EXISTS admins (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_login TIMESTAMP WITH TIME ZONE
);

-- Create contact_messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE institutions ENABLE ROW LEVEL SECURITY;
ALTER TABLE teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Policies for institutions (public can submit, authenticated can manage)
CREATE POLICY "Allow public insert institutions" 
  ON institutions FOR INSERT 
  TO anon 
  WITH CHECK (true);

CREATE POLICY "Allow authenticated read institutions" 
  ON institutions FOR SELECT 
  TO authenticated 
  USING (true);

CREATE POLICY "Allow authenticated update institutions" 
  ON institutions FOR UPDATE 
  TO authenticated 
  USING (true);

CREATE POLICY "Allow authenticated delete institutions" 
  ON institutions FOR DELETE 
  TO authenticated 
  USING (true);

-- Policies for teachers (public can submit, authenticated can manage)
CREATE POLICY "Allow public insert teachers" 
  ON teachers FOR INSERT 
  TO anon 
  WITH CHECK (true);

CREATE POLICY "Allow authenticated read teachers" 
  ON teachers FOR SELECT 
  TO authenticated 
  USING (true);

CREATE POLICY "Allow authenticated update teachers" 
  ON teachers FOR UPDATE 
  TO authenticated 
  USING (true);

CREATE POLICY "Allow authenticated delete teachers" 
  ON teachers FOR DELETE 
  TO authenticated 
  USING (true);

-- Policies for contact messages
CREATE POLICY "Allow public insert contact_messages" 
  ON contact_messages FOR INSERT 
  TO anon 
  WITH CHECK (true);

CREATE POLICY "Allow authenticated read contact_messages" 
  ON contact_messages FOR SELECT 
  TO authenticated 
  USING (true);

-- Policies for admins
CREATE POLICY "Allow authenticated read admins" 
  ON admins FOR SELECT 
  TO authenticated 
  USING (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_institutions_email ON institutions(email);
CREATE INDEX IF NOT EXISTS idx_teachers_email ON teachers(email);
CREATE INDEX IF NOT EXISTS idx_teachers_school ON teachers(school);
CREATE INDEX IF NOT EXISTS idx_admins_email ON admins(email);
CREATE INDEX IF NOT EXISTS idx_institutions_created_at ON institutions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_teachers_created_at ON teachers(created_at DESC);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers for updated_at
CREATE TRIGGER update_institutions_updated_at BEFORE UPDATE ON institutions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_teachers_updated_at BEFORE UPDATE ON teachers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

Je zou “Success. No rows returned” moeten zien.

### 5.4 Seed een Admin-gebruiker
SQL Editor → New Query → plak en run (pas email/wachtwoord aan):
```sql
-- Install pgcrypto extension for password hashing
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Create admin user (VERANDER EMAIL EN WACHTWOORD!)
INSERT INTO admins (email, password_hash, name)
VALUES (
  'admin@cultureleintroweek.nl',
  crypt('JouwWachtwoord123!', gen_salt('bf')),
  'Admin Gebruiker'
);
```
Noteer:
- Email: `admin@cultureleintroweek.nl`
- Wachtwoord: `JouwWachtwoord123!`

### 5.5 Storage voor Logo Uploads (optioneel maar aanbevolen)
1. Supabase → Storage → Create new bucket:
   - Name: `logos`
   - Public: ON (makkelijker voor dev; in productie kun je strenger maken)
2. Policies voor bucket `logos` (SQL Editor):
```sql
-- Public read
CREATE POLICY "Public read logos"
ON storage.objects FOR SELECT
TO anon
USING (bucket_id = 'logos');

-- Allow anon uploads (dev)
CREATE POLICY "Anon insert logos"
ON storage.objects FOR INSERT
TO anon
WITH CHECK (bucket_id = 'logos');
```
Tip:
- Overweeg in productie alleen geauthenticeerde uploads toe te staan en uploads server-side te proxien met de service role key.

---

## Stap 6: Start de Development Server

```sh
npm run dev
```

Verwachting:
```
▲ Next.js 15.x.x
- Local:        http://localhost:3000
- Ready in ~2-4s
```

---

## Stap 7: Test de Website

Open: http://localhost:3000

Publieke pagina’s:
1. Homepage: `/`
   - Hero banner, info cards, zintuigen sectie
2. Instellingen formulier: `/instellingen`
   - Vul in, upload logo (optioneel), “Verstuur Aanmelding”
   - Controleer Supabase → Table Editor → institutions
3. Docenten formulier: `/docenten`
   - Vul in, selecteer college (14 specifieke), meerdere klassen
   - Controleer Supabase → Table Editor → teachers
4. Programma: `/programma`
   - Bekijk alle instellingen, filters (zintuig, stadsdeel, zoeken)
5. Bronnen: `/bronnen`
6. Contact: `/contact`

Admin:
1. Login: `/admin/login`
   - Email/wachtwoord zoals ge-seed
2. Dashboard: `/admin/dashboard`
   - Statistieken, tabellen, zoeken, edit, delete, export naar PDF

Realtime check:
- Open dashboard in tab A
- Verstuur nieuwe aanmelding in tab B
- Refresh dashboard → nieuwe rij zichtbaar

---

## Project Structuur

```plaintext
culture-introweek-mbo/
├── app/                          # Next.js App Router
│   ├── page.tsx                 # Homepage
│   ├── globals.css              # Globale styles
│   ├── layout.tsx               # Root layout
│   ├── instellingen/            # Instellingen formulier
│   │   └── page.tsx
│   ├── docenten/                # Docenten formulier
│   │   └── page.tsx
│   ├── programma/               # Programma pagina
│   │   ├── page.tsx
│   │   └── loading.tsx
│   ├── bronnen/                 # Bronnen pagina
│   │   └── page.tsx
│   ├── contact/                 # Contact pagina
│   │   └── page.tsx
│   └── admin/                   # Admin sectie
│       ├── login/
│       ├── register/
│       ├── forgot-password/
│       └── dashboard/
├── components/                   # Herbruikbare componenten
│   ├── navigation.tsx
│   ├── footer.tsx
│   ├── hero-banner.tsx
│   ├── logo.tsx
│   ├── info-cards.tsx
│   ├── senses-section.tsx
│   ├── admin-edit-modal.tsx
│   └── ui/
├── lib/                          # Utilities
│   ├── admin-store.ts
│   ├── institutions-data.ts
│   └── utils.ts
├── public/                       # Statische assets
│   └── *.jpg
├── .env.local                    # Environment variables (zelf aanmaken)
├── package.json                  # Dependencies & scripts
└── tsconfig.json                 # TypeScript configuratie
```

---

## Troubleshooting

Port 3000 bezet:
```sh
npx kill-port 3000
# of
npm run dev -- -p 3001
```

Installatieproblemen:
```sh
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

Env niet geladen:
- Zorg dat `.env.local` in de projectroot staat
- Herstart `npm run dev` na wijzigingen
- Controleer typfouten en juiste variabelenamen
- Gebruik geen aanhalingstekens

Supabase connectie errors:
- Verifieer URL/keys in `.env.local`
- Check Supabase project status
- Controleer RLS policies (SQL hierboven)
- Test in Supabase Table/SQL Editor

Formulieren werken niet:
1. Open browser console (F12)
2. Bekijk network requests en errors
3. Check `.env.local`
4. Bestaan tabellen/policies?
5. CORS: Supabase URL moet juist zijn

Admin login werkt niet:
- Is admin ge-seed? (admins tabel)
- `pgcrypto` extensie geïnstalleerd?
- Wachtwoord juist?
- Server-side code gebruikt service role key (niet client)?

Uploads falen:
- Bestaat bucket `logos`?
- Policies zijn toegepast?
- File size/type beperkingen lokaal valideren

---

## Development scripts en quality

Veelgebruikte scripts:
```sh
npm run dev        # Start lokale server
npm run build      # Productiebouw
npm start          # Start productie-bouw lokaal
npm run lint       # ESLint
npm run typecheck  # TypeScript type checking (indien aanwezig)
```

Tips:
- Houd server logs en browser console open tijdens dev.
- Gebruik React/Next DevTools voor debuggen.

---

## Beveiliging en productie

- Plaats nooit `SUPABASE_SERVICE_ROLE_KEY` in client code of logs.
- Overweeg strengere RLS policies in productie.
- Voor uploads: laat alleen geauthenticeerde inserts toe, of proxie via API route.
- Activeer monitoring:
  - Vercel Analytics, Sentry (errors), en performance tools.
- Backups: Supabase biedt automatische backups; controleer retentie.

---

## Deploy naar Vercel (aanbevolen)

1. Push naar GitHub:
```sh
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <repo-url>
git push -u origin main
```

2. Vercel:
- Import repo
- Voeg environment variables toe (exact zoals in `.env.local`)
- Deploy
- Koppel custom domein (Settings → Domains)

---

## Checklist

- Node.js 18+ geïnstalleerd
- Dependencies geïnstalleerd (`npm install`)
- Supabase project aangemaakt
- `.env.local` ingevuld met juiste URL/keys
- Tabellen + policies aangemaakt (SQL gedraaid)
- Admin gebruiker ge-seed
- Storage bucket `logos` (optioneel) aangemaakt met policies
- `npm run dev` werkt en site draait op http://localhost:3000
- Formulieren schrijven naar database
- Admin login en dashboard werken
- Edit, delete en export naar PDF werken

Als alles aangevinkt is, draait het project lokaal met database.

---

## Appendix: Supabase lokaal (optioneel, advanced)

Je kunt Supabase lokaal draaien met de CLI (Docker vereist):
```sh
npm i -g supabase
supabase start
supabase status
```
- Vul dan je `.env.local` met de lokale URL/keys (zie `supabase status`)
- Run de SQL uit stap 5.3 op de lokale instance
- Handig voor offline dev; voor team/deploy blijft Supabase Cloud aangeraden.
