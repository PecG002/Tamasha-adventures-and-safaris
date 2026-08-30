# Tamasha Services + Social Footer Update

This is a drop-in update for the existing Tamasha Adventure & Safaris GitHub Pages site.

## Added
- `services.html` — a full Services page for:
  1. Car hire
  2. Sound hire
  3. Event planning & management
  4. Team building
  5. Hotel booking
- Service navigation link added to every page.
- Social icons added to the footer of every page.
- Social links:
  - Instagram: https://www.instagram.com/tamashaadventures/
  - TikTok: https://www.tiktok.com/@tamashaadventures
  - Facebook: https://www.facebook.com/tamashaadventures/
  - WhatsApp: https://wa.me/254743403920
- Responsive service cards and footer social styling added to `style.css`.

## Deployment
Replace the HTML/CSS/JS files in your existing repository with the files in this package.
KEEP your existing `assets/` folder because the current site logo and trip imagery are stored there.

The five service cards use externally hosted Unsplash images so the page works immediately. For the strongest client-facing version, replace those five image URLs with real Tamasha photography stored in `assets/services/`.

## Important
The Facebook URL follows the handle supplied by the client. If the real Facebook page uses a different URL, change only that link in the footer and `services.html`.

No fake reviews, awards, certifications or customer numbers were added.

## Latest refinements
- Social icons reduced to a more restrained 34px footprint with 16px SVG marks.
- Service enquiry buttons no longer stretch across the card; service cards use a flex layout so actions stay anchored at the bottom and cannot visually climb into the next card.
- Team Building now uses a real outdoor team-building image featuring Black adults playing an outdoor game, sourced from Pexels: https://www.pexels.com/photo/group-of-people-playing-outdoor-game-7551430/
