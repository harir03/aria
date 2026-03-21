import { DocsSection } from "@/components/docs/docs-section";

export function ArchitectureOverview() {
    return (
        <DocsSection id="architecture-overview" title="Architecture Overview">
            <p>
                ARIA is a monorepo system with four key layers that work together to intercept, analyze, decide, and evolve.
            </p>

            <h3>1. Reverse Proxy Gateway</h3>
            <p className="text-muted-foreground">
                The Gateway sits between the internet and your banking application. Every HTTP request passes through ARIA before reaching the backend. <strong>GET requests</strong> are scanned with fast regex patterns (&lt;1ms). <strong>POST/PUT/PATCH/DELETE requests</strong> go through the full multi-layered AI pipeline.
            </p>

            <h3>2. Multi-Layered Detection Pipeline</h3>
            <div className="space-y-3 my-4">
                <div className="p-3 rounded-lg border border-border bg-background/50">
                    <span className="font-bold text-green-400">Layer 1 — Regex Scan</span>
                    <span className="text-muted-foreground ml-2">Known attack signatures (SQLi, XSS, traversal, command injection). Speed: &lt;1ms.</span>
                </div>
                <div className="p-3 rounded-lg border border-border bg-background/50">
                    <span className="font-bold text-blue-400">Layer 2 — Anomaly Detection (ML)</span>
                    <span className="text-muted-foreground ml-2">PyOD ensemble (Isolation Forest + LOF + ECOD) catches zero-day attacks. Speed: ~50ms.</span>
                </div>
                <div className="p-3 rounded-lg border border-border bg-background/50">
                    <span className="font-bold text-yellow-400">Layer 3 — Behavioral Analytics (UEBA)</span>
                    <span className="text-muted-foreground ml-2">Behavioral baselines per user/IP/session detect impossible travel, privilege escalation, credential stuffing. Speed: ~100ms.</span>
                </div>
                <div className="p-3 rounded-lg border border-border bg-background/50">
                    <span className="font-bold text-purple-400">Layer 4 — LLM Analysis</span>
                    <span className="text-muted-foreground ml-2">Ollama/Mistral provides context-aware threat analysis for complex cases. Speed: ~500ms.</span>
                </div>
            </div>

            <h3>3. Human Triage Queue</h3>
            <p className="text-muted-foreground">
                Every AI decision — both blocks <em>and</em> allows — enters the analyst approval queue. ARIA never has full autonomy. Analyst feedback directly drives the self-evolution engine.
            </p>

            <h3>4. Self-Evolution Engine</h3>
            <p className="text-muted-foreground">
                The core innovation. ARIA writes its own regex detection patterns, rewrites its LLM prompts, tunes fidelity thresholds, and fine-tunes its Ollama model — all automatically based on analyst feedback, with validation and auto-rollback safeguards.
            </p>

            <h3>Infrastructure Services</h3>
            <div className="my-4 overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-border">
                            <th className="text-left py-2 pr-4 text-muted-foreground">Service</th>
                            <th className="text-left py-2 pr-4 text-muted-foreground">Port</th>
                            <th className="text-left py-2 text-muted-foreground">Purpose</th>
                        </tr>
                    </thead>
                    <tbody className="text-muted-foreground">
                        <tr className="border-b border-border/50"><td className="py-2 pr-4">MongoDB 6.0</td><td className="py-2 pr-4"><code>27017</code></td><td className="py-2">Alerts, incidents, feedback, baselines, evolution log</td></tr>
                        <tr className="border-b border-border/50"><td className="py-2 pr-4">Redis 7.0</td><td className="py-2 pr-4"><code>6379</code></td><td className="py-2">Pub/sub config reload, ingestion queues, caching</td></tr>
                        <tr className="border-b border-border/50"><td className="py-2 pr-4">Ollama (Mistral 7B)</td><td className="py-2 pr-4"><code>11434</code></td><td className="py-2">Local LLM inference for threat analysis</td></tr>
                        <tr><td className="py-2 pr-4">ChromaDB</td><td className="py-2 pr-4"><code>8000</code></td><td className="py-2">Vector embeddings for similarity search</td></tr>
                    </tbody>
                </table>
            </div>
            <p className="text-sm text-muted-foreground">
                <em>The gateway is <strong>fail-open</strong>: if any analysis service errors, requests are allowed through to prevent service disruption.</em>
            </p>
        </DocsSection>
    );
}
