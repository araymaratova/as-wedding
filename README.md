# Wedding invitation

A digital wedding invitation that opens like the real thing: guests see a sealed
powder-blue envelope with an embossed monogram, tap it, the flap swings open and
the invitation slides out. Below it are the rest of the cards: details, order
of the day, a note from the couple, where to stay, the reply card, and FAQs.

Plain HTML, CSS and JavaScript. No build step, no dependencies.

## Make it yours

Everything couple-specific is in **`config.js`**: names, monogram initials, date,
venues, map links, dress code, schedule, hotels, FAQ, RSVP and music. All the
values in it now are placeholders.

- **RSVP**: set `rsvp.url` to a form link (Google Forms, Tally, etc.) and a
  "Reply online" button appears on the reply card. While it's empty, the card
  says reply details will follow.
- **Music**: drop an `.mp3` into `assets/` and set `music: "assets/your-song.mp3"`.
  A play/pause button appears and the song starts when the envelope is opened.
- **Dress code swatches**: edit the five `<li style="--c:...">` colours in `index.html`.
- The page `<title>` is filled from the names, but also update the `<title>` and
  `og:` tags in `index.html` so link previews in chat apps show the right names.

## Run locally

```sh
python3 -m http.server 8000
# open http://localhost:8000
```

Add `?open` to the URL to skip the envelope, e.g. `https://.../?open`.

## Deploy

The repo is set up for GitHub Pages (Settings → Pages → deploy from `main`, root).
Any static host works: Vercel, Netlify, Cloudflare Pages.
