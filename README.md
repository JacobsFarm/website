# CowCatcherAI — Website

**Free, open-source AI heat detection (oestrus) and calving alarm for dairy cattle, using standard IP cameras. Runs locally on your own hardware — no subscription, no collars, no transponders, and your footage never leaves the farm.**

This repository contains the source code for the official CowCatcherAI website: the installation guide, hardware recommendations and configuration reference for the whole project suite.

[![License: GPL-3.0](https://img.shields.io/badge/license-GPL--3.0-386938)](https://www.gnu.org/licenses/gpl-3.0.html)
[![Price: free](https://img.shields.io/badge/price-free-386938)](#what-it-costs)
[![Built with SvelteKit](https://img.shields.io/badge/built%20with-SvelteKit-FF3E00?logo=svelte&logoColor=white)](https://kit.svelte.dev)
[![Languages: 10](https://img.shields.io/badge/languages-10-1d6f6f)](#languages)

> Looking to **use** the software rather than work on the website?
> Start at the [CowCatcherAI project repository](https://github.com/CowCatcherAI/CowCatcherAI).

---

## What CowCatcherAI does

Dairy farmers lose money on missed heats and unattended calvings. The commercial answer is collars, transponders or boluses — hardware per cow, plus a subscription. CowCatcherAI takes a different route: point a camera at the barn and let a computer-vision model watch it for you.

| Tool | What it detects | Why it matters |
|---|---|---|
| **CowCatcher** | Mounting behaviour — the primary visual sign of a cow in heat (oestrus) | Catch heats you would otherwise miss, without hardware on the animal |
| **CalvingCatcher** | Calving stages: water bag, legs, head, newborn calf | Be there for the calvings that need you |
| **AI Detector** | The local application that runs the models | One config file, alerts to Telegram or your own webhook |

All three are developed in the open by a community of dairy farmers, and are free to download and run.

---

## Who it's for

- **Dairy farmers** who already have (or are willing to install) IP cameras in the barn
- **Farmers who want to keep their own data** — nothing is uploaded, everything is processed on your machine
- **Anyone priced out of commercial heat-detection systems** — no per-cow hardware, no monthly fee
- **Developers and researchers** working on livestock computer vision

---

## How it works

```
IP camera  ──►  AI Detector  ──►  YOLO vision model  ──►  Alert
(RTSP feed)     (your PC)         (heat / calving)        (Telegram, webhook, disk)
```

1. The AI Detector pulls frames from your existing camera over the network
2. A YOLO model scores each frame for mounting behaviour or calving stages
3. When enough consecutive frames pass your confidence threshold, you get an alert — with image, crop and short video clip if you want them

Everything runs on your own machine. There is no cloud step, no account, and no upload.

---

## What you need

| | Minimum | Recommended |
|---|---|---|
| **Computer** | Any recent desktop or refurbished PC | NVIDIA GPU desktop, Mac mini (M-series), or Jetson Orin Nano |
| **Camera** | One PoE IP camera with an RTSP stream, pointed at the group | One per pen you want covered |
| **Network** | PoE switch and Cat6 cabling to the barn | — |
| **OS** | Windows, macOS, or Linux/Docker | — |

Full details, product photos and buying links: **[Hardware guide](https://jacobsfarm.github.io/website/installation/hardware/)**

---

## What it costs

Nothing. There is no paid tier, no trial, no per-cow licence and no subscription.

The software is released under the **GNU GPL v3.0**: you may use it, study it, modify it and share it. What you download today stays yours and keeps working, regardless of what happens to the project.

---

## Your data

- Video is processed **on your own machine**
- No frames, clips or detections are sent to us or to any third party
- Alerts go only where you configure them (your Telegram chat, your webhook, your disk)
- There is no telemetry and no account system

---

## Languages

The site ships in ten languages, fully translated — including the technical installation guides.

| | | | | |
|---|---|---|---|---|
| 🇬🇧 English `en` | 🇳🇱 Nederlands `nl` | 🇩🇪 Deutsch `de` | 🇫🇷 Français `fr` | 🇪🇸 Español `es` |
| 🇮🇹 Italiano `it` | 🇵🇹 Português `pt` | 🇵🇱 Polski `pl` | 🇷🇴 Română `ro` | 🇩🇰 Dansk `da` |

Translations live in `messages/<locale>/`. Correcting a phrase means editing one JSON file — no build tooling required. See [README.dev.md](README.dev.md) for the workflow.

---

## What's on the site

| Page | Contents |
|---|---|
| [Home](https://jacobsfarm.github.io/website/) | Overview of the three tools, live demos, field validation |
| [Installation](https://jacobsfarm.github.io/website/installation/) | Step-by-step route from hardware to running system |
| [Hardware](https://jacobsfarm.github.io/website/installation/hardware/) | Computers, cameras, PoE switches, cabling, DIY enclosures |
| [Download](https://jacobsfarm.github.io/website/installation/download/) | Windows, macOS and Docker/Jetson install guides |
| [Configuration](https://jacobsfarm.github.io/website/installation/options/) | Reference for every setting in the AI Detector config |
| [Projects](https://jacobsfarm.github.io/website/projects/cowcatcher/) | Background on CowCatcher, CalvingCatcher and the AI Detector |
| [About us](https://jacobsfarm.github.io/website/about-us/) | Who builds this and why |

---

## Try it without installing

Both vision models run as interactive demos on Hugging Face — upload a barn image and see what the model sees:

- [CowCatcherAI on Hugging Face](https://huggingface.co/spaces/CowcatcherAI/CowCatcherAI)

---

## In the press

Independent coverage of the project:

| Outlet | Article |
|---|---|
| Veeteelt | [Gratis AI-software informeert boeren over afkalvingen](https://veeteelt.nl/gezondheid/gratis-ai-software-informeert-boeren-over-afkalvingen) |
| Boerderij | [Jan Jaap Verweij ontwikkelt gratis tool voor detecteren tochtige koeien](https://www.boerderij.nl/video-jan-jaap-verweij-ontwikkelt-gratis-tool-voor-detecteren-tochtige-koeien) |
| Nieuwe Oogst | [Melkveehouder ontwikkelt CowCatcher, gratis programma voor tochtdetectie](https://www.nieuweoogst.nl/nieuws/2025/09/30/melkveehouder-ontwikkelt-cowcatcher-gratis-programma-voor-tochtdetectie) |
| Veehouderij Techniek | [Koe volgen met camera: zo werkt CowCatcher](https://www.mechaman.nl/veehouderij-techniek/artikel/20260720/koe-volgen-met-camera-zo-werkt-cowcatcher/) |
| Veehouderij Techniek | [Cowcatcher komt met afkalfdetectie](https://www.mechaman.nl/veehouderij-techniek/artikel/20260310/cowcatcher-komt-met-afkalfdetectie/)|
| VILT | [Groep boeren ontwikkelt AI-tool voor tocht- en afkalfdetectie melkvee](https://vilt.be/nl/nieuws/groep-boeren-ontwikkelt-ai-tool-voor-tocht-en-afkalfdectie-melkvee) |
| Omrop Fryslân | [Hoe AI de Friese boer kan steunen in het dagelijks werk](https://www.omropfryslan.nl/nl/nieuws/18353769/hoe-ai-de-friese-boer-kan-steunen-in-het-dagelijks-werk) |
| NOS Journaal Regio | [Broadcast item](https://npo.nl/start/afspelen/nos-journaal-regio_1359) |
| Sterke Erven | [AI-systeem helpt bij detectie van tochtige koeien](https://sterke-erven.nl/artikel/631761-ai-systeem-helpt-bij-detectie-van-tochtige-koeien) |
| Agrarisch Ondernemer | [Jong Agrarisch Talent — nominees 2026](https://agrarischondernemer.nl/jong-agrarisch-talent-genomineerden/) |

---

## Community and support

- 💬 [Facebook group](https://www.facebook.com/groups/1765616710830233)
- 📨 [Telegram channel](https://web.telegram.org/a/#-1003640103247)
- 🗣️ [Prikkebord forum thread](https://www.prikkebord.nl/topic/362840/)
- 📧 cowcatcherai@gmail.com
- 🐛 Website problems → [open an issue](https://github.com/JacobsFarm/website/issues)

---

## Related repositories

| Repository | Purpose |
|---|---|
| [CowCatcherAI/CowCatcherAI](https://github.com/CowCatcherAI/CowCatcherAI) | Main project: vision models and documentation |
| [ESchouten/ai-detector](https://github.com/ESchouten/ai-detector) | The AI Detector application |
| [JacobsFarm/website](https://github.com/JacobsFarm/website) | This website |

---

## Working on this website

Built with **SvelteKit 5** (static adapter), **Paraglide** for i18n, and plain CSS with design tokens. Deployed to GitHub Pages on every push to `main`.

```bash
git clone https://github.com/JacobsFarm/website.git
cd website
npm install
npm run dev
```

Setup details, project structure, the translation workflow and contribution guidelines are in **[README.dev.md](README.dev.md)**.

---

## Licence

[GNU General Public License v3.0](https://www.gnu.org/licenses/gpl-3.0.html) — same as the rest of the CowCatcherAI project.

---

**CowCatcherAI — your barn, your data, our vision.**
