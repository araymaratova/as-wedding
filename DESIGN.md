# Design

The site is a stationery suite laid out on a powder-blue table.

## World
- **Ground** periwinkle `#c9d1ee` with fine grain and paper fibre texture (SVG turbulence, data URIs in `styles.css`).
- **Envelope** smooth stock: `#d3daf2`, flap `#dbe1f5` (lit), side pockets `#ccd4ef`, liner `#22335a` with a white sprig motif. Folds read as a bright cut edge (a white copy of each piece nudged 0.15cqh) plus a soft shadow; the flap tip is rounded; a room-light gradient falls from the top left.
- **Cards** cotton white `#fbfbf9`, letterpressed in navy `#1f2c4a`; secondary text `#44557a`. Rules are navy at 26% alpha, often doubled (border + inset outline) like an engraved frame.
- **Vellum**: the couple's note is translucent paper overlapping the schedule card.
- Cards sit at small tilts (−1.3° to 1.4°) and settle onto the table as they scroll in.

## Type
- **Bodoni Moda** (optical sizing) for everything roman: spaced uppercase for names and labels, italic for the invitation wording.
- **Pinyon Script** for the monogram, card titles and signatures.

## Envelope
Built from clipped layers inside a `container-type: size` button: liner, letter,
pocket (left, right, bottom flaps), top flap (3D `rotateX`, front and liner-back
faces), embossed monogram, hint. `main.js` steps through
`is-lifting → is-flap-open → is-flap-behind → is-letter-out → is-leaving`.
On phones the envelope is a real 1.42:1 envelope 118svh tall, so the first view is a close-up of the flap tip and monogram; tapping pulls back (scale computed in `main.js`) to the whole envelope before the flap opens. On wider screens it is an object with a drop shadow from the start.

## Layout
Single column up to 1000px. Above that, two columns: the invitation is sticky on
the left while the other cards pass on the right.
