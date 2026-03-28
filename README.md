<div align="center">

# 🛡️ ARIA — Adaptive Response & Intelligence Agent

### AI-Powered, Self-Evolving Cyber Incident Response System for Banking

[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Python](https://img.shields.io/badge/Python-3.11-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://python.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.0-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com/)
[![Redis](https://img.shields.io/badge/Redis-7.0-DC382D?style=for-the-badge&logo=redis&logoColor=white)](https://redis.io/)
[![Ollama](https://img.shields.io/badge/Ollama-Mistral_7B-blue?style=for-the-badge)](https://ollama.com/)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://docker.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

<br/>

**ARIA** is a next-generation security platform that doesn't just detect threats — it **evolves to outsmart them**. Built for banking environments, it intercepts HTTP traffic through a reverse proxy, analyzes it with a multi-layered AI pipeline, and continuously improves itself through analyst feedback.

<br/>

[Features](#-key-features) · [Architecture](#-system-architecture) · [Tech Stack](#-tech-stack) · [Getting Started](#-getting-started) · [Project Structure](#-project-structure) · [Dashboard](#-dashboard--website) · [How It Works](#-how-it-works)

</div>

<br/>

---

<br/>

## 🌟 What Makes ARIA Different?

Most security tools are **static** — they only detect what they were programmed to find. ARIA is **alive**:

| Traditional Security Tools | ARIA |
|:---|:---|
| Static rule sets that need manual updates | **Self-writes** new regex rules from attack data |
| Generic AI models | **Self-finetunes** its own LLM on your environment |
| Fixed detection thresholds | **Self-tunes** weights based on analyst feedback |
| Auto-blocks or auto-allows | **Human-in-the-loop** — AI suggests, humans decide |
| Detects known attacks only | **Predicts** what attack is coming next |
| Alerts without context | Generates **step-by-step response playbooks** |
| No learning from mistakes | Every analyst decision **makes the system smarter** |

<br/>

## 🎯 Key Features

### Core Detection Pipeline
- **🔍 Reverse Proxy Gateway** — Intercepts all HTTP traffic before it reaches the banking app. GET requests get fast regex scanning; POST/PUT/PATCH/DELETE requests go through full AI analysis.
- **📊 Anomaly Detection (ML)** — Uses PyOD ensemble (Isolation Forest + LOF + ECOD) and tsfresh time-series analysis to catch zero-day attacks that no rule can match.
- **👤 Behavioral Analytics (UEBA)** — Builds behavioral baselines per user/IP/session and flags deviations: impossible travel, privilege escalation, after-hours access, credential stuffing.
- **⚖️ Fidelity Ranking** — Aggregates scores from regex, anomaly, UEBA, and LLM into a single 0–100 fidelity score. Eliminates alert fatigue by surfacing what actually matters.

### Intelligence & Response
- **🔗 Alert Correlation** — Groups related alerts into incidents using 5 correlation rules (same IP, same attack type, endpoint targeting, kill chain detection, distributed attacks).
- **📋 Playbook Generation** — LLM-generated step-by-step response procedures following NIST SP 800-61, PCI-DSS, and RBI cybersecurity frameworks.
- **🔮 Predictive Analysis** — "What attack is coming next?" — uses vector similarity against past incidents + LLM reasoning to forecast the next attack stage.
- **💬 Natural Language Query** — Ask questions in plain English: *"Show me all SQL injection attempts from the last 24 hours"* — translated into database queries automatically.

### Self-Evolution Engine (The WOW Factor)
- **🧬 Self-Evolving Regex** — The AI generates new detection patterns from confirmed attacks, tests them against known good/bad samples, and hot-deploys them to the gateway.
- **🧠 Self-Evolving Prompts** — Analyzes false positives/negatives, rewrites its own LLM analysis prompts, and validates improvement.
- **⚙️ Self-Tuning Thresholds** — Automatically adjusts fidelity weights when analysts consistently correct certain detection sources.
- **🎓 Model Fine-Tuning** — Periodically finetunes the Ollama/Mistral model with analyst-confirmed decisions, creating a specialized banking security model (`aria-policeman`).
- **✅ Validation & Rollback** — Every self-evolution change is tested before deployment. If accuracy drops, the change is automatically rolled back.

### Human-in-the-Loop
- **🧑‍💼 Human Triage Interface** — Every AI decision (both blocks AND allows) enters an analyst approval queue. Approve, reject, or escalate — every decision feeds the learning loop.
- **📈 Learning Dashboard** — Transparent view of what the AI has learned: new patterns, evolved prompts, model versions, accuracy trends over time.

### Visualization
- **🌐 3D Attack Globe** — Real-time Three.js globe showing attack origins worldwide.
- **⛓️ Attack Chain Visualization** — React Flow graphs mapping alerts to MITRE ATT&CK kill chain stages.
- **📊 Rich Analytics** — Area charts, donut charts, bar charts, and KPI cards powered by Recharts.
- **🗺️ Geo-Location Mapping** — 2D world maps with attack source markers.

<br/>

---

<br/>

## 🏗️ System Architecture

```
                                    ARIA — System Architecture
    
    ┌──────────────────────────────────────────────────────────────────────────────────┐
    │                                                                                  │
    │   INTERNET / BANKING APP TRAFFIC                                                 │
    │   ══════════════════════════════                                                  │
    │           │                                                                      │
    │           ▼                                                                      │
    │   ┌───────────────┐     ┌────────────────────────────────────────────────────┐   │
    │   │   REVERSE      │     │          MULTI-LAYERED DETECTION PIPELINE          │   │
    │   │   PROXY         │     │                                                    │   │
    │   │   GATEWAY       │────▶│  ① Regex Scan ──▶ ② Anomaly Detection (ML)       │   │
    │   │                 │     │                       │                             │   │
    │   │   Port 80/443   │     │                       ▼                             │   │
    │   │   (Node.js)     │     │              ③ UEBA (Behavioral Analytics)         │   │
    │   │                 │     │                       │                             │   │
    │   └───────────────┘     │                       ▼                             │   │
    │                          │              ④ LLM Analysis (Ollama/Mistral)        │   │
    │                          │                       │                             │   │
    │                          │                       ▼                             │   │
    │                          │              ⑤ Fidelity Ranking (0-100 Score)       │   │
    │                          └───────────────────────┬────────────────────────────┘   │
    │                                                   │                                │
    │                          ┌────────────────────────┼────────────────────────┐      │
    │                          │                        │                        │      │
    │                          ▼                        ▼                        ▼      │
    │                  ┌──────────────┐     ┌───────────────────┐    ┌──────────────┐  │
    │                  │    ALERT      │     │   HUMAN TRIAGE     │    │  PLAYBOOK     │  │
    │                  │  CORRELATION  │     │     INTERFACE       │    │  GENERATION   │  │
    │                  │              │     │                     │    │              │  │
    │                  │  Groups into  │     │  Approve / Reject   │    │ NIST, PCI-DSS│  │
    │                  │  Incidents    │     │  + Analyst Notes    │    │ RBI Framework│  │
    │                  └──────┬───────┘     └────────┬──────────┘    └──────────────┘  │
    │                         │                       │                                  │
    │                         │              ┌────────▼──────────┐                      │
    │                         │              │   FEEDBACK LOOP    │                      │
    │                         │              │                    │                      │
    │                         │              │  Every decision    │                      │
    │                         │              │  trains the AI     │                      │
    │                         │              └────────┬──────────┘                      │
    │                         │                       │                                  │
    │                         │              ┌────────▼──────────┐                      │
    │                         │              │  SELF-EVOLVING     │                      │
    │                         │              │     AGENT          │                      │
    │                         │              │                    │                      │
    │                         │              │ ✦ Regex Evolution  │                      │
    │                         │              │ ✦ Prompt Evolution │                      │
    │                         │              │ ✦ Threshold Tuning │                      │
    │                         │              │ ✦ Model Finetuning │                      │
    │                         │              │ ✦ Pipeline Modules │                      │
    │                         │              │ ✦ Auto-Validation  │                      │
    │                         │              └───────────────────┘                      │
    │                                                                                    │
    │   ┌────────────────────────────────────────────────────────────────────────────┐  │
    │   │                           INFRASTRUCTURE                                    │  │
    │   │                                                                              │  │
    │   │   MongoDB 6.0      Redis 7.0       Ollama (Mistral 7B)      ChromaDB        │  │
    │   │   ───────────      ─────────       ──────────────────       ────────        │  │
    │   │   Alerts           Pub/Sub         LLM Threat Analysis      Vector Memory   │  │
    │   │   Incidents        Queues          Playbook Generation      Similarity      │  │
    │   │   Feedback         Caching         Prompt/Regex Evolution   Search          │  │
    │   │   Baselines        Sessions        Model Fine-Tuning        Embeddings      │  │
    │   │   Evolution Log    Real-time       NL Query Translation     Predictions     │  │
    │   │                                                                              │  │
    │   └────────────────────────────────────────────────────────────────────────────┘  │
    └──────────────────────────────────────────────────────────────────────────────────┘
```

### Data Flow Summary

```
HTTP Request ──▶ Gateway ──▶ Regex + ML + UEBA + LLM ──▶ Fidelity Score
                                                              │
                                                   ┌──────────┴──────────┐
                                                   ▼                     ▼
                                          Alert Correlation      Triage Queue
                                                   │                     │
                                                   ▼                     ▼
                                           Incident Created     Analyst Decision
                                                                        │
                                                              ┌─────────┴─────────┐
                                                              ▼                   ▼
                                                        Correct?             Wrong?
                                                              │                   │
                                                              ▼                   ▼
                                                      Reinforce Model    Self-Evolving Agent
                                                                          Writes New Rules
                                                                          Tunes Thresholds
                                                                          Evolves Prompts
                                                                          Finetunes Model
```

<br/>

---

<br/>

## 🖥️ Dashboard & Website

ARIA ships with a full-featured **Next.js 16** analyst dashboard and marketing website.

### Dashboard Pages

| Page | Purpose |
|:-----|:--------|
| **`/` — Incident Overview** | Live KPI cards, traffic area charts, threat distribution donuts, 3D attack globe, recent event feed |
| **`/triage` — Human Triage Queue** | Two-panel layout: alert list (left) + detail view (right). Approve/reject AI decisions with notes. Displays fidelity score, detection sources, AI reasoning, and similar past incidents |
| **`/attacks` — Incident Feed** | Paginated, filterable table of all security events with severity, source IP, category, status, and detailed modal view |
| **`/incidents` — Correlated Incidents** | Grouped view of related alerts organized into incidents with kill chain stage mapping |
| **`/attack-chains` — Kill Chain Visualization** | Interactive React Flow graph mapping alerts to MITRE ATT&CK stages — from reconnaissance to exfiltration |
| **`/statistics` — Analytics** | Deep-dive charts: traffic over time, attack type distribution, geographic analysis, endpoint targeting |
| **`/playbooks` — Response Playbooks** | Auto-generated incident response procedures following NIST/PCI-DSS/RBI frameworks |
| **`/learning` — AI Learning Dashboard** | Evolution timeline, accuracy trend charts, learned patterns viewer, model version history |
| **`/evolution` — Self-Evolution Monitor** | Track what the agent has modified: new regex, updated prompts, threshold changes, rollbacks |
| **`/query` — Natural Language Query** | Chat interface: ask questions in English, get instant query results and visualizations |
| **`/policy` — Model Management** | Configure Ollama models, system prompts, and defense modes |

### Website Pages

| Page | Purpose |
|:-----|:--------|
| **`/` — Landing Page** | Product overview with animated hero, feature showcases, and 3D globe |
| **`/pricing`** | Plan comparison |
| **`/developers`** | API documentation |
| **`/docs`** | Technical documentation |
| **`/login`** | Auth0-powered authentication |

### Dashboard Components

| Component | Description |
|:----------|:------------|
| `StatCard` | Animated KPI card with icon, value, label, and trend indicator |
| `DonutChartCard` | Recharts donut chart with center text overlay |
| `ProgressBarCard` | Ranked list with animated progress bars |
| `TrafficChart` | Area/line time-series chart for traffic monitoring |
| `MAFGlobe` | 3D interactive globe showing real-time attack origins (Three.js + react-globe.gl) |
| `WorldMap2D` | 2D world map with geo-located attack markers |
| `SecurityTable` | Paginated, sortable event table with detail modals |
| `SecurityFilters` | Multi-criteria filter bar (severity, category, fidelity, source) |
| `RecentEvents` | Live-scrolling event feed with auto-refresh |
| `DetailsModal` | Full-screen detail view for any alert or incident |

<br/>

---

<br/>

## 🔧 Tech Stack

### Frontend

| Technology | Version | Purpose |
|:-----------|:--------|:--------|
| **Next.js** | 16 | React framework with App Router, server components, API routes |
| **React** | 19 | UI component library |
| **Tailwind CSS** | 4 | Utility-first styling with `@theme` custom properties |
| **Recharts** | 3.7 | Charts — area, line, bar, donut, composed |
| **Three.js** | 0.172 | 3D attack globe visualization |
| **react-globe.gl** | 2.37 | Globe component with attack origin arcs |
| **React Flow** | — | Interactive node-edge graphs for attack chains |
| **Framer Motion** | 12 | Page transitions and component animations |
| **GSAP** | 3.14 | Advanced scroll and timeline animations |
| **Lucide React** | 0.563 | Icon library |
| **Radix UI** | — | Accessible primitives (accordion, tabs, avatar, etc.) |
| **Auth0** | 4.15 | Authentication and session management |

### Backend

| Technology | Version | Purpose |
|:-----------|:--------|:--------|
| **Node.js** | 18+ | Gateway runtime, API server, worker processes |
| **http-proxy** | 1.18 | Core reverse proxy for traffic interception |
| **Mongoose** | 8–9 | MongoDB ODM for all data models |
| **ioredis** | 5.9 | Redis client for pub/sub, caching, queues |
| **Pino** | 8.19 | Structured JSON logging |

### AI / ML

| Technology | Purpose |
|:-----------|:--------|
| **Ollama** | Local LLM inference server |
| **Mistral 7B** | Base model for threat analysis, playbooks, regex generation, NL query |
| **PyOD** | Anomaly detection ensemble (Isolation Forest, LOF, ECOD) |
| **tsfresh** | Automated time-series feature extraction |
| **scikit-learn** | Preprocessing, scaling, clustering for UEBA baselines |
| **ChromaDB** | Vector database for incident embeddings and similarity search |
| **LangChain / LangGraph** | AI orchestration for alert correlation and reasoning chains |

### Infrastructure

| Technology | Version | Purpose |
|:-----------|:--------|:--------|
| **MongoDB** | 6.0 | Primary database — alerts, incidents, feedback, baselines, evolution log |
| **Redis** | 7.0 | Pub/sub (config reload, real-time alerts), queues (ingestion), caching |
| **Docker Compose** | — | Orchestrates 7+ services in a single deployment |
| **ChromaDB** | — | Persistent vector store for AI memory |

<br/>

---

<br/>

## 🚀 Getting Started

### Prerequisites

| Requirement | Minimum |
|:------------|:--------|
| **Node.js** | v18+ |
| **Python** | 3.11+ |
| **Docker & Docker Compose** | Latest |
| **NVIDIA GPU** | Recommended for Ollama (CPU mode works but is slower) |

### Option 1: Full Docker Deployment

```bash
# Clone the repository
git clone https://github.com/harir03/aria.git
cd aria

# Start all services (dashboard, gateway, MongoDB, Redis, Ollama, ChromaDB)
cd infrastructure
docker-compose up -d

# Verify all services are running
docker-compose ps
```

| Service | URL | Purpose |
|:--------|:----|:--------|
| Dashboard | `http://localhost:3000` | Analyst UI & Website |
| Gateway | `http://localhost:80` | Reverse proxy (traffic goes through here) |
| MongoDB | `localhost:27017` | Database |
| Redis | `localhost:6379` | Cache & message queue |
| Ollama | `http://localhost:11434` | LLM inference |
| ChromaDB | `http://localhost:8000` | Vector database |

### Option 2: Local Development (Recommended for Development)

```bash
# 1. Start infrastructure services in Docker
cd infrastructure
docker-compose up -d mongo redis aria-ai aria-model-puller chromadb

# 2. Run the dashboard locally (in a new terminal)
cd 02-dashboard-ui
npm install
npm run dev
# → Dashboard available at http://localhost:3000

# 3. Run the gateway locally (in a new terminal)
cd 01-reverse-proxy-gateway
npm install
node index.js
# → Gateway starts listening on configured ports

# 4. Run the Python ML services (in a new terminal)
cd 05-anomaly-detection
pip install -r requirements.txt
python anomaly_detector.py

# 5. Run the UEBA engine (in a new terminal)
cd 06-behavioral-analytics-ueba
pip install -r requirements.txt
python ueba_engine.py
```

### Environment Variables

| Variable | Default | Used By |
|:---------|:--------|:--------|
| `MONGODB_URI` | `mongodb://localhost:27017/aria_db` | All services |
| `REDIS_URI` | `redis://localhost:6379` | All services |
| `OLLAMA_HOST` | `http://localhost:11434` | Gateway, Dashboard, Workers |
| `CHROMADB_HOST` | `http://localhost:8000` | Vector memory, Predictions |
| `NODE_ENV` | `development` | Dashboard, Gateway |

<br/>

---

<br/>

## 📁 Project Structure

The project is organized into **numbered feature modules**, each responsible for a specific capability:

```
aria/
│
├── 📂 01-reverse-proxy-gateway/    ← Core traffic interception layer
│   ├── index.js                     # HTTP proxy + regex scan + Ollama LLM analysis
│   ├── Dockerfile                   # Container build
│   └── package.json                 # Node.js dependencies
│
├── 📂 02-dashboard-ui/             ← Full Next.js 16 web application
│   ├── src/
│   │   ├── app/                     # App Router pages (triage, incidents, learning, etc.)
│   │   ├── components/              # Reusable UI components (charts, tables, globe, etc.)
│   │   ├── lib/                     # Database models, Redis, Ollama, utilities
│   │   └── hooks/                   # Custom React hooks
│   ├── public/                      # Static assets
│   └── smart-contracts/             # Solidity contracts (reference)
│
├── 📂 03-middleware-sdk-reference/  ← Pattern library (not deployed)
│   ├── core/                        # Regex patterns, hybrid analysis, fail-open design
│   └── adapters/                    # Express, Fastify, Next.js middleware adapters
│
├── 📂 04-log-ingestion/            ← Normalized event intake pipeline
│   ├── index.js                     # Redis queue consumer + MongoDB writer
│   └── normalizers/                 # Format-specific parsers (banking, syslog, JSON)
│
├── 📂 05-anomaly-detection/        ← ML-based threat detection
│   ├── anomaly_detector.py          # PyOD ensemble + tsfresh features
│   └── requirements.txt             # Python dependencies
│
├── 📂 06-behavioral-analytics-ueba/ ← User behavior baselines
│   ├── ueba_engine.py               # Session tracking, deviation scoring, banking rules
│   └── requirements.txt             # Python dependencies
│
├── 📂 07-fidelity-ranking/         ← Multi-source score aggregation
│   └── index.js                     # Weighted score combination + context multipliers
│
├── 📂 08-alert-correlation/        ← Groups alerts into incidents
│   └── index.js                     # 5 correlation rules, 60-second cycles, kill chain mapping
│
├── 📂 09-playbook-generation/      ← LLM response procedures
│   ├── index.js                     # Ollama-powered playbook generator
│   ├── actions.ts                   # Ollama model creation patterns (reference)
│   └── page.tsx                     # Playbook management UI (reference)
│
├── 📂 10-self-evolving-agent/      ← Core innovation — AI writes its own code
│   ├── regex-evolution/             # Generates new detection patterns from attack data
│   ├── prompt-evolution/            # Rewrites its own LLM analysis prompts
│   ├── pipeline-evolution/          # Adds new detection modules dynamically
│   ├── threshold-tuning/            # Auto-adjusts fidelity weights from feedback
│   └── validation-rollback/         # Tests changes, auto-rolls back if accuracy drops
│
├── 📂 11-model-finetuning/         ← Periodic Ollama model retraining
│   └── index.js                     # Collects feedback → formats training data → finetunes model
│
├── 📂 12-attack-chain-visualization/ ← Interactive kill chain graphs
│   └── README.md                    # React Flow + MITRE ATT&CK mapping spec
│
├── 📂 13-predictive-analysis/      ← "What attack is coming next?"
│   ├── predictor.py                 # Vector similarity + LLM forecasting
│   └── requirements.txt             # Python dependencies
│
├── 📂 14-learning-dashboard/       ← AI transparency dashboard
│   ├── StatCard.tsx                 # KPI card component (reference)
│   ├── DonutChartCard.tsx           # Chart component (reference)
│   └── ProgressBarCard.tsx          # Progress bar component (reference)
│
├── 📂 15-vector-memory/            ← ChromaDB long-term AI memory
│   ├── vector_store.py              # Embedding generation + similarity search
│   └── requirements.txt             # Python dependencies
│
├── 📂 16-natural-language-query/   ← English → MongoDB query translator
│   └── README.md                    # LLM query translation spec
│
├── 📂 17-human-triage-interface/   ← Analyst approval queue
│   ├── SecurityTable.tsx            # Paginated event table (reference)
│   ├── SecurityFilters.tsx          # Filter component (reference)
│   └── attacks-page-reference.tsx   # Page layout pattern (reference)
│
└── 📂 infrastructure/              ← Docker Compose orchestration
    └── docker-compose.yml           # 7 services: Dashboard, Gateway, MongoDB, Redis,
                                     #   Ollama, Model Puller, ChromaDB
```

<br/>

---

<br/>

## ⚙️ How It Works

### 1. Traffic Interception
The **reverse proxy gateway** sits between the internet and the banking application. Every HTTP request passes through ARIA before reaching the real service.

- **GET requests** → Fast regex scan for SQL injection, XSS, path traversal, command injection
- **POST/PUT/PATCH/DELETE** → Full pipeline: regex + anomaly detection + UEBA + LLM analysis

### 2. Multi-Layered Detection

| Layer | Method | What It Catches | Speed |
|:------|:-------|:----------------|:------|
| **Layer 1** | Regex patterns | Known attack signatures (SQLi, XSS, etc.) | < 1ms |
| **Layer 2** | PyOD ML ensemble | Statistical outliers, zero-day attacks | ~50ms |
| **Layer 3** | UEBA behavioral | Credential stuffing, impossible travel, privilege escalation | ~100ms |
| **Layer 4** | Ollama/Mistral LLM | Complex context-aware analysis | ~500ms |

### 3. Fidelity Scoring
All detection scores are combined into a single **fidelity score (0–100)**:

```
                          ┌─── Regex Score ────────── (weight: 0.15)
                          │
Fidelity Score (0-100) ◄──┼─── Anomaly Score ──────── (weight: 0.25)
                          │
                          ├─── UEBA Score ─────────── (weight: 0.25)
                          │
                          ├─── LLM Score ──────────── (weight: 0.25)
                          │
                          └─── Time-Series Score ──── (weight: 0.10)
                          
                          × Context Multipliers:
                            Financial transaction → ×1.3
                            Admin endpoint        → ×1.5
                            After hours           → ×1.2
                            Multiple detections   → ×1.4
```

**Priority mapping:** `90-100` Critical → `70-89` High → `40-69` Medium → `10-39` Low → `0-9` Info

### 4. Alert Correlation
Related alerts are grouped into **incidents** using pattern-based rules:

| Rule | Logic |
|:-----|:------|
| Same Source IP | 3+ alerts from one IP within 15 minutes |
| Same Attack Type | 5+ same-category alerts within 30 minutes |
| Endpoint Targeting | 3+ alerts on same URI within 20 minutes |
| Kill Chain Detection | Sequential recon → exploit → escalation from one IP within 60 minutes |
| Distributed Attack | 5+ IPs with same attack type on same endpoint within 10 minutes |

### 5. Human Triage
**Every decision — both blocks AND allows — enters the analyst queue.** The AI never has full autonomy.

```
AI says BLOCK  +  Analyst approves  =  ✅ Confirmed threat (reinforces model)
AI says BLOCK  +  Analyst rejects   =  ❌ False positive (triggers self-evolution)
AI says ALLOW  +  Analyst approves  =  ✅ Confirmed safe (low priority)
AI says ALLOW  +  Analyst rejects   =  🚨 False negative (critical learning!)
```

### 6. Self-Evolution Loop
Analyst feedback drives continuous improvement across **five dimensions**:

| Evolution Type | What Happens |
|:---------------|:-------------|
| **Regex Evolution** | LLM analyzes confirmed attacks → generates new regex → tests against good/bad samples → deploys via Redis hot-reload |
| **Prompt Evolution** | Gathers false positives/negatives → rewrites the threat analysis prompt → validates accuracy improvement |
| **Threshold Tuning** | Calculates per-module accuracy → adjusts fidelity weights → modules with more false positives get lower weights |
| **Model Fine-Tuning** | Collects 20+ confirmed decisions → formats training data → creates `aria-policeman` model → validates ≥80% accuracy → deploys |
| **Pipeline Evolution** | Discovers attack types missed by all modules → generates new detector code → registers in pipeline |

Every self-evolution change is **validated before deployment** and **automatically rolled back** if accuracy decreases.

<br/>

---

<br/>

## 🐳 Docker Services

| Service | Image | Port | Description |
|:--------|:------|:-----|:------------|
| `aria-dashboard` | Next.js 16 (custom build) | `3000` | Analyst dashboard + marketing website |
| `aria-gateway` | Node.js (custom build) | `80`, `443`, `8000-8100` | Reverse proxy + detection pipeline |
| `aria-mongo` | `mongo:6.0` | `27017` | Primary database |
| `aria-redis` | `redis:7.0-alpine` | `6379` | Pub/sub, queues, caching |
| `aria-ai` | `ollama/ollama` | `11434` | Local LLM inference (GPU recommended) |
| `aria-model-puller` | `ollama/ollama` | — | Init container that pulls Mistral model |
| `aria-chromadb` | `chromadb/chroma` | `8000` | Vector database for AI memory |

<br/>

---

<br/>

## 🗄️ Database Schema Overview

### MongoDB Collections

| Collection | Purpose |
|:-----------|:--------|
| `alerts` | Individual detection events with fidelity scores and detection source metadata |
| `incidents` | Correlated alert groups with severity, kill chain stage, and status |
| `feedbacks` | Analyst approve/reject decisions with notes (drives learning loop) |
| `evolutionchanges` | Audit trail of every self-evolution action (regex, prompt, threshold, model) |
| `playbooks` | Auto-generated response procedures linked to incidents |
| `baselines` | UEBA behavioral profiles per user/IP/session |

### ChromaDB Collections

| Collection | Purpose |
|:-----------|:--------|
| `incidents` | Incident embeddings for similarity search and predictive analysis |
| `alert_patterns` | Individual alert patterns for pattern recognition |
| `attack_payloads` | Known malicious payloads for detection |
| `learned_rules` | Rules generated by the self-evolution engine |
| `playbooks` | Generated playbooks for similar incident lookup |

<br/>

---

<br/>

## 🤝 Contributing

1. Each numbered folder is an independent module — work on modules in parallel
2. Read the `README.md` inside each module folder for detailed specs
3. Reference files (marked with `*-reference.*`) show coding patterns from the existing codebase
4. All services communicate through **MongoDB** (persistence) and **Redis** (real-time)
5. Run `docker-compose up -d` from `infrastructure/` to start all dependencies

<br/>

## 📄 License

This project is part of an academic/hackathon initiative.

<br/>

---

<div align="center">

**Built with 🛡️ by the ARIA Team**

*Adaptive Response & Intelligence Agent — Because security should evolve faster than threats.*

</div>

https://mafxi.vercel.app/

