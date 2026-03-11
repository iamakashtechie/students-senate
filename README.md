# Students' Senate — IIEST Shibpur

Official website of the Students' Senate, Indian Institute of Engineering Science and Technology, Shibpur.

Built with **Next.js 14 (App Router)** and **Tailwind CSS**.

---

## Setup

```bash
npm install
```

Copy the environment variables file and fill in your values:

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:

```
ADMIN_PASSWORD=your_strong_password_here
ADMIN_KEY=a_random_secret_string_here
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Structure

```
app/
  page.js              home page
  about/page.js        about us page
  notifications/       notifications listing
  admin/page.js        admin panel (password protected)
  api/
    notifications/     crud api for notices
    members/           crud api for members
    resolution/        api for resolution text
    admin/login/       login endpoint
components/
  Navbar.jsx
  Footer.jsx
  NotificationCard.jsx
  MemberCard.jsx
lib/
  dataStore.js         file-based json store
data/
  notifications.json   persisted notification data
  members.json         persisted member data
  resolution.json      persisted resolution text
public/
  uploads/             uploaded attachments (auto-created)
  assets/
    imgs/              place your image files here
    illustrations/     place hand-drawn sketch images here
```

---

## Image Assets

Place the following files in `public/assets/imgs/`:
- `IIEST_Shibpur_Clock.png` — clock tower image for hero section
- `Students_Senate_Logo.png` — senate logo

Place hand-drawn illustrations in `public/assets/illustrations/`:
- `senate-sketch-1.png`
- `senate-sketch-2.png`

---

## Admin Panel

Visit `/admin` to access the admin panel.

Features:
- add and delete notifications (with PDF or image attachments)
- update the resolution text
- add and remove general council members

---

## Color Palette

| Name      | Hex       | Usage                        |
|-----------|-----------|------------------------------|
| Primary   | `#576A8F` | headings, borders, bg        |
| Secondary | `#B7BDF7` | accents, soft highlights     |
| Cream     | `#FFF8DE` | page background              |
| Accent    | `#FF7444` | cta, highlights, important   |
