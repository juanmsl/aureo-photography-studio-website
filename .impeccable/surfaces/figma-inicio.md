---
version: 1
slug: "figma-inicio"
primary_target: "figma-inicio"
related_targets: []
---

# Áureo — Home (Figma, desktop)

Scope: home page of Áureo Estudio Fotográfico, designed in Figma (file AtRQGqGP7TBk8lSKPd3WOO). Mode: Persuade (inspire and open a conversation), with the work up front.
Audience and action: people looking for photography with a point of view; see the work and book a conversation.
Content: approved slogan and statement (docs/CONTEXT.md §6). Moodboard images as provisional. No invented clients, awards or contact details.
Pending: logo («ÁUREO» is a provisional typographic logotype), relationship with Lina Nieto on the site, contact details.

## Direction contract
THESIS: The site is a camera obscura: a dim room where only what the light reaches can be seen. It rejects the full-screen photo hero with a centered logo and the grid of service cards.
OWN-WORLD: Shadow #120F0D as the ground of the whole page, umbra #1C1714 and ash #2A231E for surfaces and rules; bone #E9E1D6 and pale light #F3DEC0 for text; amber #E8A75B only for light and action. Tenor Sans for the brand voice and headings, Spectral Light/Light Italic for reading. Photos emerge with a soft light falloff into the shadow; no cards, no rounded corners on photos.
STORY: The visitor enters in the dark, sees the first opening of light, reads the slogan, walks through the work revealed by beams, understands that the signature is a way of looking (not a genre) and books a conversation.
FIRST VIEWPORT: Left, the slogan in Tenor Sans 72 over two lines, a Spectral italic subtitle with the disciplines and the amber "Ver la obra" button. Right, the half-open door as the only light source, with an amber pool cast on the floor. Top, the typographic ÁUREO and navigation with "Agenda una conversación".
FORM: Camera obscura, the option the user chose among three examples (position 2 on my list; the roll assigned 4, the user pinned this one). seed:02b0968ae15cb8fc
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, docs/DESIGN.md, and every shipping raster carrying its provenance

## Update (November 2026)
- Typography chosen by the user: the one from Cuarto oscuro (Bricolage Grotesque ExtraBold for brand and headings, Instrument Serif italic as the second voice, Hanken Grotesk for text and controls). It replaces Tenor Sans + Spectral in the Áureo/* styles.
- Desktop screens built: Home, Work, Work photo, Studio, Disciplines, Contact, Message sent ("Escritorio — Áureo" page), with a prototype starting at "Áureo · Escritorio".
- Proposed texts not yet approved: "Por qué Áureo" and "Cruzar el umbral" on Studio; discipline descriptions.
- Light theme: tried and discarded by the user (November 2026). Dark theme only. The "Áureo · Tema" collection keeps a single mode (Oscuro) with the styles bound to it.
- Mobile (November 2026): "Móvil — Áureo" page, 8 screens at 390 px, dark theme only (Home, Menu, Work, Work photo, Studio, Disciplines, Contact, Message sent), flow "Áureo · Móvil". Mobile sizes as local overrides: Display 40, Titular 34, Titular S 24, Cita 32, Bajada 21, Cuerpo 16, Marca 20.
- Code (November 2026): implemented in this repository with React + Vite + Polpo; see README.md.
