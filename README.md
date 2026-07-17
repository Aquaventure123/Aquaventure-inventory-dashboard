# Bluewave Inventory Ageing Dashboard (Static Version)

A dashboard for your sales team to see dead stock / slow-moving inventory — pulled directly
from your Google Sheet. **No backend server needed** — 100% static HTML/CSS/JS, hosted free on
GitHub Pages.

This version assumes your Google Sheet is set to **"Anyone with the link can view."**

---

## Step 1 — Make sure your sheet is link-viewable

Open your Google Sheet → **Share** → under "General access" choose **"Anyone with the link"** →
role **Viewer** → Done.

---

## Step 2 — Get the `gid` for each sales-person tab

Open each tab (e.g. `CS (Kevin)`) and look at your browser's address bar:

```
.../edit?gid=743251402#gid=743251402
```

The number after `gid=` is what you need for that tab.

---

## Step 3 — Edit `js/config.js`

Two tabs are already filled in from your screenshots (`Current Stock (Alice)` and `CS (Wendy)1`).
For every other tab:
1. Copy the block, update `name`, `salesPerson`, and `gid`.
2. Check the actual column **letters** in that tab (SKU, Jaipur, Mumbai, AQV, Total, M.Avg,
   Stock Available months) and update the `columns` object to match.
3. `dataStartRow` = the row number where the first SKU appears (below your headers).

---

## Step 4 — Edit `js/users.js`

Add/remove your sales team's usernames and passwords here — plain text, since there's no
backend to hash them:

```js
{ username: "gunjan", password: "SomePassword123", displayName: "Gunjan" },
```

**Important limitation:** anyone who opens the browser's developer tools (F12) on your live
site can read this file and see every username/password. This is a basic access gate for
convenience, not real security. If you later want proper hidden logins, you'd need the
backend + private-sheet version instead (ask me and I'll give you that code again).

---

## Step 5 — Test locally (optional but recommended)

You can't just double-click `index.html` because browsers block some requests from `file://`
URLs. Instead, run a tiny local server:

```bash
cd bluewave-static-dashboard
python3 -m http.server 8000
```
Then open `http://localhost:8000` in your browser.

---

## Step 6 — Push to GitHub

```bash
cd bluewave-static-dashboard
git init
git add .
git commit -m "Bluewave inventory dashboard"
```

Create an empty repo at https://github.com/new (e.g. `bluewave-inventory-dashboard`), then:

```bash
git remote add origin https://github.com/YOUR-USERNAME/bluewave-inventory-dashboard.git
git branch -M main
git push -u origin main
```

---

## Step 7 — Turn on GitHub Pages

1. On GitHub, open your repo → **Settings → Pages**.
2. Under **Source**, choose branch `main`, folder `/ (root)` → **Save**.
3. Wait ~1 minute. GitHub gives you a live URL like:
   `https://YOUR-USERNAME.github.io/bluewave-inventory-dashboard/`

Share this link with your sales team, along with their username/password from `users.js`.

---

## Updating later

- **New sales person tab** → add an entry in `js/config.js`, commit, push.
- **New user / remove user** → edit `js/users.js`, commit, push.
- **Sheet data itself** → no action needed — it's fetched live every time the dashboard loads.

Changes take about 30-60 seconds to go live on GitHub Pages after you push.

---

## Troubleshooting

- **"Could not load inventory data"** → almost always means either (a) the sheet isn't set to
  "Anyone with the link can view", or (b) a `gid` in `config.js` is wrong/still says
  `PASTE_GID_HERE`.
- **A tab's numbers look wrong** → double check the column letters in `config.js` against the
  actual columns in that specific tab (they can differ tab to tab).

---

## Project structure

```
bluewave-static-dashboard/
├── index.html          ← login page
├── dashboard.html       ← main dashboard
├── css/styles.css
└── js/
    ├── config.js        ← EDIT: spreadsheet id, tab gids, column mapping
    ├── users.js         ← EDIT: sales team usernames/passwords
    ├── csvParser.js      (no edits needed)
    ├── sheetsData.js     (no edits needed - fetches + classifies stock age)
    ├── login.js           (no edits needed)
    └── dashboard.js       (no edits needed - renders cards/pie/table)
```
