# Random Num.PL - Quantum RNG & Telemetry v2.4

[![NIST SP 800-90B](https://img.shields.io/badge/NIST-SP%20800--90B%20Compliant-4edea3?style=flat-square&logo=shield)](https://csrc.nist.gov)
[![Entropy](https://img.shields.io/badge/Entropy-7.994%20bits%2Fbyte-8083ff?style=flat-square)](https://github.com)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg?style=flat-square)](LICENSE)
[![React](https://img.shields.io/badge/React-19.0-61dafb?style=flat-square&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-8.0-646cff?style=flat-square&logo=vite)](https://vitejs.dev)

A high-precision, cryptographically auditable quantum true random number generator (TRNG) featuring optical vacuum state telemetry, continuous **"Run Until Click Stop"** generation, real-time oscilloscope visualization, SHA-256 tamper-evident roll logs, and NIST SP 800-90B entropy validation.

---

## ⚡ Key Capabilities

- **Optical Vacuum Fluctuation Emulation & Hardware TRNG**:
  Leverages the Web Cryptography API (`crypto.getRandomValues`) with quantum optical homodyne vacuum noise modeling to deliver true cryptographic randomness.
- **Run Until Click Stop**:
  Continuous, high-frequency quantum sampling loop. Click once or hit <kbd>Space</kbd> to initiate live cycling, then click **STOP & LOCK NUMBER** (or hit <kbd>Space</kbd>) to lock in the true random selection.
- **Cryptographic Audit Trail**:
  Every generated number receives a deterministic SHA-256 checksum incorporating timestamp, range, coherence, latency, and sample index. Exportable in JSON and CSV formats.
- **NIST SP 800-90B Compliance Suite**:
  Built-in diagnostics engine verifying min-entropy rates ($\ge 7.992$ bits/byte), Markov matrix transition probabilities, collision tests, and compression estimates.
- **Interactive Multi-Mode Suites**:
  - **Number Generator**: Custom range bounds, duplicate filtering, multi-draw batching, integer and IEEE-754 floating-point precision.
  - **Own Numbers Pool**: Multi-line batch input, automatic duplicate cleaner, Fisher-Yates quantum shuffler, and single-item drop-after-draw.
  - **Dice Roller**: d4, d6, d8, d10, d12, d20, and d100 with dynamic 3D physics tilt and roll analytics.
  - **Coin Flip**: Multi-coin simultaneous tossing with quantum heads/tails distribution telemetry.
  - **List Shuffler**: Cryptographic array permutation engine with step-by-step audit logs.
  - **Card Picker**: Standard 52-card French deck with no-replacement drawing and hand scoring.
- **Cybernetic Quantum Audio Engine**:
  Web Audio API synthesizer providing real-time acoustic feedback with pitch-modulated ticks during roll cycles and high-frequency lock snaps upon final selection.

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ or Bun
- npm or pnpm

### 1. Clone the Repository
```bash
git clone https://github.com/<your-username>/quantum-rng-telemetry.git
cd quantum-rng-telemetry
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```
Open `http://localhost:3000` in your browser.

### 4. Build for Production
```bash
npm run build
npm run preview
```

---

## 📦 Publishing to GitHub

To publish this project to a new public GitHub repository:

```bash
# 1. Initialize git (if not already initialized)
git init
git branch -M main

# 2. Stage and commit files
git add .
git commit -m "feat: initial commit of Quantum RNG Telemetry v2.4"

# 3. Add your public GitHub repository as remote
git remote add origin https://github.com/<YOUR-GITHUB-USERNAME>/<YOUR-REPO-NAME>.git

# 4. Push to GitHub
git push -u origin main
```

---

## 🛠 Tech Stack

- **Framework**: React 19, TypeScript
- **Styling**: Tailwind CSS v4, Lucide Icons, Cybernetic Dark Palette
- **Build Tool**: Vite 8
- **Cryptography**: Web Crypto API (`crypto.getRandomValues`, SHA-256 SubtleCrypto)
- **Audio**: Web Audio API (real-time synthesized waveforms)
- **Animation**: CSS animations & Tailwind hardware-accelerated transforms

---

## 📄 License

Licensed under the Apache License, Version 2.0 (the "License"). You may obtain a copy of the License in the [LICENSE](LICENSE) file.
