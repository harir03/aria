import { DocsSection } from "@/components/docs/docs-section";
import { FeatureCard } from "./FeatureCard";

export function CoreFeatures() {
    return (
        <DocsSection id="core-features" title="Core Features">
            <div className="grid md:grid-cols-2 gap-6 not-prose">
                <FeatureCard
                    title="Multi-Layer Detection Pipeline"
                    description="Four detection layers in series — regex scan, ML anomaly detection (PyOD), UEBA behavioral analytics, and LLM analysis — each catching what the others miss."
                />
                <FeatureCard
                    title="Fidelity Scoring Engine"
                    description="Aggregates scores from all detection sources into a single 0–100 fidelity score with context multipliers for financial transactions, admin endpoints, and after-hours access."
                />
                <FeatureCard
                    title="Self-Evolution Engine"
                    description="Autonomously writes new regex patterns, rewrites LLM prompts, tunes thresholds, and fine-tunes the Ollama model — all validated before deployment with automatic rollback."
                />
                <FeatureCard
                    title="Human-in-the-Loop Triage"
                    description="Every AI decision enters an analyst queue. Approve/reject decisions feed directly into the learning loop, making the system smarter with each human interaction."
                />
                <FeatureCard
                    title="Alert Correlation & Kill Chains"
                    description="Groups related alerts into incidents using 5 correlation rules. Maps attack sequences to MITRE ATT&CK kill chain stages for comprehensive threat analysis."
                />
                <FeatureCard
                    title="Auto-Generated Playbooks"
                    description="LLM generates step-by-step incident response procedures following NIST, PCI-DSS, and RBI frameworks — complete with assignees, verification steps, and regulatory references."
                />
                <FeatureCard
                    title="Predictive Analysis"
                    description="Uses vector similarity search (ChromaDB) against past incidents combined with LLM reasoning to forecast what attack stage is coming next."
                />
                <FeatureCard
                    title="Natural Language Query"
                    description="Ask questions in plain English — 'Show all SQL injection attempts from last 24 hours' — translated into database queries with instant results and visualizations."
                />
            </div>
            <div className="mt-6">
                <h3>Real-time Enforcement</h3>
                <p>
                    Decisions are made in real-time with a fail-open design. Detection runs in under 1ms for regex, ~50ms for ML, and ~500ms for LLM. All decisions are logged, replayable, and explainable via the dashboard with full AI reasoning.
                </p>
            </div>
        </DocsSection>
    );
}
