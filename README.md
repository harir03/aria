# ARIA — Adaptive Response & Intelligence Agent

> An AI-powered, self-evolving cyber incident response system for banking.

## What is ARIA?

ARIA is a **reverse proxy security gateway** that sits in front of banking applications, intercepts all HTTP traffic, and uses a multi-layered detection pipeline (regex → anomaly detection → behavioral analytics → LLM analysis) to detect threats. What makes it unique:

1. **Both blocks AND allows require human approval** — the AI suggests, humans decide
2. **Self-evolving** — the agent writes its own regex rules, evolves its own prompts, tunes its own thresholds, and finetunes its own model
3. **Learns from every decision** — analyst feedback drives continuous improvement
4. **Full incident lifecycle** — detect → correlate → prioritize → respond → learn

## Architecture Overview

```
                    ┌─────────────────────────────────────────────────┐
                    │              ARIA SYSTEM                        │
                    │                                                 │
  HTTP Traffic ───→ │  Gateway ──→ Detection Pipeline ──→ Decision    │
                    │  (01)        (01,05,06)              Engine     │
                    │                                      (07)       │
                    │                    ↓                    ↓       │
                    │              Alert Correlation    Triage Queue  │
                    │              (08)                 (17)          │
                    │                    ↓                    ↓       │
                    │              Playbook Gen         Analyst       │
                    │              (09)                 Feedback      │
                    │                                      ↓         │
                    │                              Self-Evolving      │
                    │                              Agent (10)         │
                    │                                   ↓             │
                    │                         ┌────────────────────┐  │
                    │                         │ Regex │ Prompts │  │  │
                    │                         │ Model │ Weights │  │  │
                    │                         │ Pipeline│Thresholds│ │
                    │                         └────────────────────┘  │
                    └─────────────────────────────────────────────────┘
                    
  Infrastructure:   MongoDB  │  Redis  │  Ollama/Mistral  │  ChromaDB
```

## Folder Structure

Each folder corresponds to a feature, numbered by priority:

### Tier 0 — Must Ship (Core System)
| Folder | Feature | Status |
|--------|---------|--------|
| `01-reverse-proxy-gateway/` | HTTP reverse proxy + regex + LLM analysis | **EXISTS** — adapt |
| `02-dashboard-ui/` | Next.js dashboard (full app) | **EXISTS** — adapt |
| `17-human-triage-interface/` | Analyst approval queue (blocks + allows) | TO BUILD (refs included) |

### Tier 1 — Core Requirements (Detection & Intelligence)
| Folder | Feature | Status |
|--------|---------|--------|
| `04-log-ingestion/` | Normalized event intake pipeline | TO BUILD |
| `05-anomaly-detection/` | PyOD + tsfresh ML anomaly detection | TO BUILD |
| `06-behavioral-analytics-ueba/` | User behavior baselines + deviation scoring | TO BUILD |
| `07-fidelity-ranking/` | Multi-source score → priority ranking | TO BUILD |
| `08-alert-correlation/` | Group related alerts into incidents | TO BUILD |
| `09-playbook-generation/` | LLM-generated response procedures | TO BUILD (refs included) |

### Tier 2 — Primary WOW Factor (Self-Evolution)
| Folder | Feature | Status |
|--------|---------|--------|
| `10-self-evolving-agent/` | Writes its own regex, prompts, pipeline modules, thresholds | TO BUILD (ref included) |
| `11-model-finetuning/` | Finetune Ollama with confirmed threats | TO BUILD (refs included) |

### Tier 3 — Secondary WOW (Visualization & Intelligence)
| Folder | Feature | Status |
|--------|---------|--------|
| `12-attack-chain-visualization/` | React Flow kill chain graphs | TO BUILD |
| `13-predictive-analysis/` | "What attack is coming next?" forecasting | TO BUILD |
| `14-learning-dashboard/` | What the AI learned over time | TO BUILD (refs included) |
| `15-vector-memory/` | ChromaDB incident similarity search | TO BUILD |
| `16-natural-language-query/` | "Show me all SQLi from last 24h" chat interface | TO BUILD |

### Reference & Infrastructure
| Folder | Purpose |
|--------|---------|
| `03-middleware-sdk-reference/` | mafai npm package patterns (regex, adapters, fail-open) |
| `infrastructure/` | Docker Compose (7 services), environment config |

## Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Gateway | Node.js, http-proxy | Reverse proxy, traffic interception |
| Dashboard | Next.js 16, React 19, Tailwind 4 | Analyst UI |
| Charts | Recharts, Three.js, react-globe.gl | Data visualization |
| Database | MongoDB 6.0, Mongoose 9 | Persistent storage |
| Cache/Queue | Redis 7.0, ioredis | Pub/sub, caching, queues |
| LLM | Ollama, Mistral 7B | Threat analysis, playbooks, evolution |
| Vector DB | ChromaDB | Incident similarity, AI memory |
| ML | PyOD, tsfresh, scikit-learn | Anomaly detection (Python service) |
| AI Orchestration | LangChain, LangGraph | Alert correlation, reasoning |
| Viz | React Flow | Attack chain graphs |

## Quick Start

```bash
# 1. Start infrastructure (MongoDB, Redis, Ollama, ChromaDB)
cd infrastructure
docker-compose up -d mongo redis aria-ai aria-model-puller chromadb

# 2. Run gateway
cd ../01-reverse-proxy-gateway
npm install
node index.js

# 3. Run dashboard (separate terminal)
cd ../02-dashboard-ui
npm install
npm run dev

# 4. Open http://localhost:3000
```

## Build Order

Follow this sequence for development:

1. **Adapt Gateway** (01) — Remove blockchain, add banking patterns, add human queue
2. **Adapt Dashboard** (02) — Change nav, rename pages, update models/schemas
3. **Build Triage UI** (17) — Analyst approval queue with approve/reject
4. **Build Fidelity Ranking** (07) — Weighted score aggregation
5. **Build Playbook Generator** (09) — LLM-generated response steps
6. **Build Self-Evolving Regex** (10/regex) — Agent generates new patterns
7. **Build Self-Evolving Prompts** (10/prompts) — Agent improves its own prompts
8. **Build Model Finetuning** (11) — Prompt-level customization with Modelfile
9. **Build Log Ingestion** (04) — Normalized event pipeline
10. **Build Anomaly Detection** (05) — Python PyOD service
11. **Build UEBA** (06) — Behavioral baselines
12. **Build Correlation** (08) — Rule-based alert grouping
13. **Build Attack Chain Viz** (12) — React Flow graphs
14. **Build Learning Dashboard** (14) — Evolution history + accuracy trends
15. **Build Vector Memory** (15) — ChromaDB integration
16. **Build Predictive Analysis** (13) — Forecast next attack stage
17. **Build NL Query** (16) — Chat interface for database queries

## Source Repos

This project is built on code from three existing repositories:

| Repo | What Was Taken |
|------|---------------|
| `maf-app/` | Complete Next.js dashboard + maf-engine reverse proxy |
| `mafai-app/` | Cleaner ApplicationSelector component + SaaS engine variant |
| `mafai-package/` | Regex patterns, adapter patterns, TypeScript types |

All copied code is **unmodified** — only README files and comments were added.
