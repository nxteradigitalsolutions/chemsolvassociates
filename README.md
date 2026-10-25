# Chemsolv Associates

Official corporate website for **Chemsolv Associates** — Water & Wastewater Treatment Solutions, based in Ariyalur, Tamil Nadu, India (PIN 621715).

## Overview

Chemsolv Associates delivers commercial and industrial water treatment systems, wastewater plants (STP/ETP), treatment consumables, process monitoring instruments, swimming pool accessories, and HVAC spares, complemented by comprehensive engineering services including Annual Maintenance Contracts (AMC).

## Features

- **Ultra-Fast Performance (<3s Load Target)**: Built with clean, semantic HTML5, Vanilla CSS, and modern modular JavaScript without bulky framework dependencies.
- **Desktop-First & Fully Mobile Responsive**: Seamless responsive layouts across desktop displays, laptops, tablets, and smartphones down to 375px viewports.
- **Floating RAG Knowledge Chatbot**: Interactive client-side AI knowledge assistant pre-indexed with approved product descriptions, treatment specifications, service scopes, and location details with automated WhatsApp/contact fallbacks.
- **Floating WhatsApp Quick-Contact**: Direct touchpoint for instant technical and sales enquiries.
- **Single-Page Products Catalogue**: Filterable sticky anchor navigation covering:
  - Water Treatment Systems (RO, Softeners, Iron Removal, DM, Ultrafiltration)
  - Wastewater Treatment Systems (STP, ETP, MBBR, MBR, Sludge Dewatering)
  - Treatment Products & Spares (Dosing pumps, membranes, diffusers, filter media)
  - Swimming Pool Accessories
  - Process Monitoring Instrumentation (Flowmeters, online pH/TDS controllers)
  - HVAC Spares & Cooling Water Spares
- **Technical Services & AMC Scope**: Clear presentation of Planning & Design, Equipment Supply, AMC, Repair & Refurbishment, Retrofitting, and Consultancy.
- **Search Engine Optimization (SEO)**: Page-level metadata, OpenGraph tags, JSON-LD Schema.org structured data, `sitemap.xml`, and `robots.txt`.
- **Contact Form with Spam Protection**: Validated customer enquiry form with honeypot bot trap and submission confirmation.

## Project Structure

```
├── index.html                   # Home Page
├── about.html                   # About Us & Company Profile
├── products.html                # Products Catalogue with Sticky Navigation
├── services.html                # Technical Engineering & AMC Services
├── contact.html                 # Contact Us, Form & Ariyalur Location Card
├── sitemap.xml                  # XML Sitemap for Search Engines
├── robots.txt                   # Crawler Directives
├── .gitignore                   # Git Ignore Configuration
└── assets/
    ├── css/
    │   ├── main.css             # Design system, layout, typography & mobile rules
    │   ├── components.css       # Cards, forms, modals & sticky pills
    │   └── chatbot.css          # Floating RAG Chatbot & WhatsApp widgets
    ├── js/
    │   ├── main.js              # Sticky header, mobile drawer & scroll animations
    │   ├── chatbot-kb.js        # Approved RAG Knowledge Base data
    │   ├── chatbot.js           # Interactive AI assistant controller
    │   └── contact.js           # Form validation & WhatsApp integration
    └── images/
        ├── logo.svg             # Chemsolv Associates vector SVG logo
        ├── hero-water.svg       # Industrial water/wastewater flow diagram
        └── cat-*.svg            # Vector icons for each product category
```

## Local Development

Open `index.html` in any modern web browser or serve via any static web server:

```bash
# Using Python
python -m http.server 8000

# Using Node / npx
npx serve .
```

## Location & Contact

- **Headquarters**: Ariyalur, Tamil Nadu, India — PIN 621715
- **Business Hours**: Monday – Saturday: 9:00 AM – 6:30 PM (IST)
