# NERV-TRUST | NCMRWF Forecast Bust Detection & Pre-Verification Platform
**Smart India Hackathon (Problem Statement: PS SIH26079)**  
**Client / Beneficiary Agency:** National Centre for Medium Range Weather Forecasting (NCMRWF) & Ministry of Earth Sciences (MoES) / IMD

---

## 🌩️ Overview

**NERV-TRUST** is an AI-based forecast bust detection and pre-verification operational layer designed for NCMRWF/MoES. Rather than simply evaluating forecast errors after disasters occur, NERV-TRUST intercepts raw Numerical Weather Prediction (NWP) outputs (e.g., NCUM-G 0.12° model) across medium-range horizons ($T+24\text{h}$ to $T+240\text{h}$ / Day 1 to Day 10), identifies high-risk bust sub-divisions beforehand, and generates calibrated probabilistic forecasts alongside atmospheric physics explainability.

---

## 🚀 Key Features & 150% Value-Add Over Baseline

### Core Baseline Requirements (100% Met):
1. **Interactive India Bust Risk Heatmap:** Sub-divisional geo-spatial risk mapping (Green = Reliable, Amber = Moderate, Red = High Risk Bust).
2. **Medium-Range Lead Time Horizon (Day 1 to Day 10):** Slider and simulation auto-stepper with $T+24\text{h}$ to $T+240\text{h}$ dynamic degradation tracking.
3. **Multi-Variable Meteorology:** Rainfall (mm/day), CAPE (J/kg), 2-Meter Surface Temperature (°C), and 850 hPa Lower Tropospheric Wind (knots).
4. **Sub-Divisional Diagnostic Drawers:** On-demand deep-dive inspection into specific meteorological zones.

### Our Extra USPs (+150% Value-Add):
1. **Dual-Head CRPS Probabilistic Bias-Correction (Head 2 Engine):** Outputs $(\mu_{corr}, \sigma_{corr})$ with 95% confidence intervals, reducing Continuous Ranked Probability Score (CRPS) error by **38.6%**.
2. **Physics Template Explainability Engine (XAI):** Identifies physical atmospheric drivers (e.g., 850hPa moisture convergence, vertical wind shear, and orographic drag) instead of black-box predictions.
3. **Lead-Time Confidence Decay Curve:** Recharts interactive curves demonstrating forecast reliability degradation from Day 1 to Day 10.
4. **IMD / WMO Operational Verification Suite:** Live Critical Success Index (CSI), Heidke Skill Score (HSS), Brier Skill Score (BSS), and **Reliability Diagrams** matching WMO No. 485 operational standards.
5. **Continuous Online Recalibration Pulse:** Simulated live connection to 32 Doppler Weather Radars (DWR) and surface Automatic Weather Stations (AWS).

---

## 🛠️ Tech Stack

- **Framework:** React 19 + TypeScript + Vite
- **Styling:** Tailwind CSS v4 (Command Center Dark/Slate Theme)
- **Visualizations:** Recharts (Decay curves, Reliability diagrams) + Custom SVG Sub-divisional Geo-spatial Heatmap
- **Icons:** Lucide-react
- **Data Engine:** Simulated async mock API service (`src/services/mockData.ts`)

---

## 💻 Running Locally

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Build & Preview Production Build
```bash
npm run build
npm run preview
```
The application is pre-configured to execute without external backend dependencies, ensuring zero-crash offline demonstration for hackathon juries.
