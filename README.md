# Ironwood Athletic Club – Gym Demo Website

A dark, cinematic, photo-led single-page website template engineered for gym, fitness, CrossFit, and athletic club owners. Built with vanilla HTML5, CSS3, and JavaScript (GSAP 3.12.5 + ScrollTrigger), requiring zero build tools, zero npm packages, and zero frameworks.

---

## 1. Quick Start

### Option A: Direct Browser Launch
Double-click `index.html` in your file explorer. All layout, styling, and vanilla JavaScript features will run directly from `file://`.

### Option B: Local HTTP Server (Recommended for Video & Full GSAP Caching)
Using Python (pre-installed on most operating systems):
```bash
python -m http.server 8000
```
Or with Node.js:
```bash
npx serve
```
Then open `http://localhost:8000` in your web browser.

---

## 2. Media Asset Requirements

The website includes dark radial gradient fallback styling so all components maintain exact aspect ratios and contrast even before photos are added.

To fully populate the cinematic visuals, place the following optimized portrait/landscape photos into `assets/images/` and the looping video into `assets/video/`:

| Filename | Placement & Description | Ideal Dimensions & Crop |
| :--- | :--- | :--- |
| `hero-1-strength.jpg` | Hero Scene 1 & Strength Program (Lifter with barbell under dramatic side light) | 1600×2000px, Portrait crop, focal point centre-left |
| `hero-2-training.jpg` | Hero Scene 2 & Conditioning Program (High-intensity battle ropes / turf sprints) | 1600×2000px, Portrait crop, focal point centre |
| `hero-3-recovery.jpg` | Hero Scene 3 & Recovery Program (Sauna, contrast bath, or calm stretching zone) | 1600×2000px, Portrait crop, focal point centre-right |
| `intro-floor.jpg` | Intro Section split media & Free-Weight bento tile | 1200×1500px, 4:5 Portrait crop |
| `program-classes.jpg` | Group Classes program card | 1200×1500px, 4:5 Portrait crop |
| `program-personal.jpg` | Personal Training program card | 1200×1500px, 4:5 Portrait crop |
| `facility-weights.jpg` | Facilities Bento: Main Strength Arena (2x2 tile) | 1600×1200px, Landscape |
| `facility-cardio.jpg` | Facilities Bento: Conditioning Zone (Wide tile) | 1600×900px, Landscape |
| `facility-wellness.jpg` | Facilities Bento: Thermal Recovery Suite (Tall tile) | 1000×1400px, Portrait |
| `trainer-1.jpg` | Coach 1 portrait (Marcus Vance - Strength) | 900×1200px, 3:4 Portrait |
| `trainer-2.jpg` | Coach 2 portrait (Elena Rostova - Conditioning) | 900×1200px, 3:4 Portrait |
| `trainer-3.jpg` | Coach 3 portrait (David Thorne - Recovery & Mobility) | 900×1200px, 3:4 Portrait |
| `video-poster.jpg` | Cinematic video band fallback and initial poster frame | 1920×1080px, 16:9 Landscape |
| `gym-reel.mp4` | 8–15s cinematic looping reel (`assets/video/`) | 1280×720px, H.264, muted, < 4MB |

---

## 3. Customizing for a New Client in Minutes (`js/config.js`)

All client-specific information is centralized in a single configuration file: `js/config.js`. You never need to touch the HTML or CSS to re-brand the site.

### Brand, Contact & Social Links
```javascript
brand: {
  name: "Your Gym Name",
  shortName: "YourGym",
  tagline: "Your custom gym tagline.",
  city: "Sydney",
  state: "NSW",
  country: "Australia",
  fullAddress: "456 Fitness Way, Surry Hills NSW 2010",
  email: "contact@yourgym.com.au",
  phone: { display: "+61 2 9000 0000", tel: "+61290000000" },
  whatsapp: { number: "61400000000", prefilledMessage: "Hi, I'd like to book a free trial!" },
  social: {
    instagram: "https://instagram.com/yourgym",
    facebook: "https://facebook.com/yourgym",
    youtube: "" // Leaving any link empty hides its icon automatically
  }
}
```

### Color Palette & Theme Tokens
Change the accent colors to match the client's corporate palette:
```javascript
theme: {
  bg: "#0A0A0B",           // Main dark background
  surface: "#141416",      // Primary card surface
  surfaceRaised: "#1B1B1E",// Elevated cards
  border: "#26262A",       // Border stroke
  text: "#F4F1EA",         // High contrast text
  accent: "#FF5A1F",       // Client primary brand color
  accentGlow: "#FF8A4C",   // Secondary hover glow
}
```

### Feature Switches (Zero-Gap Removal)
Every major section and action can be toggled on or off via boolean flags in `SITE_CONFIG.features`:
```javascript
features: {
  trial: true,          // Removes trial CTAs & trial form tab
  membership: true,     // Removes membership form tab
  whatsapp: true,       // Removes WhatsApp buttons everywhere
  call: true,           // Removes phone call buttons & cards
  video: true,          // Removes video band section
  programs: true,       // Removes programs section & nav link
  facilities: true,     // Removes facilities bento grid & nav link
  trainers: true,       // Removes coaches section & nav link
  plans: true,          // Removes membership plans & nav link
  timetable: true,      // Removes timetable & nav link
  gallery: true,        // Removes masonry gallery & lightbox
  testimonials: true,   // Removes reviews carousel
  faq: true,            // Removes accordion FAQ section
  location: true,       // Removes map & hours table
  stickyMobileBar: true // Removes bottom mobile bar
}
```
*Note: Disabling a section cleanly unlinks it from the header navigation, mobile overlay menu, and footer links.*

---

## 4. Connecting Enquiry Forms to Real Inboxes

By default, the forms run in **Demo Simulation Mode**:
1. Field values are validated (name >= 2 characters, phone 8–15 digits, email structure).
2. A 1.2s submission simulation occurs with a live loading spinner.
3. An animated SVG checkmark confirms reservation, displaying a discrete note: *"Demo form: connect an inbox to receive real enquiries."*

### Connecting to a Form Service (Formspree, Web3Forms, Getform, etc.)
Open `js/config.js` and set the `forms.endpoint` property:

```javascript
forms: {
  endpoint: "https://formspree.io/f/xpznwkqy", // Paste your endpoint URL here
  accessKey: "",                               // Optional API key if required
  showDemoNote: false,                         // Hide the demonstration note
  sampleLabels: true                           // Display 'Sample' badge on demo data
}
```

When an endpoint is configured, `js/app.js` issues a direct JSON `fetch(endpoint, { method: "POST", ... })`. If the submission encounters a network issue, a friendly retry prompt is displayed.

---

## 5. Deploying to Static Hosting

Because this project is 100% static:

- **Cloudflare Pages / GitHub Pages**: Push the repository and set the root output directory to `/`. No build command required.
- **Vercel / Netlify**: Deploy as a static directory without a framework preset.
- **Traditional Apache / Nginx / cPanel**: Upload all files to `public_html`.

---

## 6. Sample Content Notice

Every price, timetable slot, trainer profile, testimonial review, address, and amenity is fictional sample content created for presentation to prospective gym owners.

When `SITE_CONFIG.forms.sampleLabels` is set to `true`, small discrete "Sample" tags appear on trainer cards, reviews, and pricing tables to uphold complete transparency.
