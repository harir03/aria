import { DocsSection } from "@/components/docs/docs-section";

export function EnforcementModes() {
    return (
        <DocsSection id="enforcement-modes" title="Enforcement Modes">
            <p>ARIA operates in one of three modes, configurable per protected service via the dashboard.</p>
            <div className="space-y-4">
                <div className="p-4 rounded-lg border border-green-500/20 bg-green-500/10">
                    <h4 className="font-bold text-lg text-green-400">1. Defense Mode</h4>
                    <p className="text-muted-foreground">Active protection. Requests exceeding the fidelity threshold are blocked immediately with a <code>403 Forbidden</code> response. All decisions still enter the human triage queue for feedback and learning.</p>
                </div>
                <div className="p-4 rounded-lg border border-yellow-500/20 bg-yellow-500/10">
                    <h4 className="font-bold text-lg text-yellow-400">2. Audited Mode</h4>
                    <p className="text-muted-foreground">Monitor-only. All requests are allowed through, but every request is logged and analyzed. Threats are flagged in the dashboard without blocking. Ideal for initial deployment and tuning.</p>
                </div>
                <div className="p-4 rounded-lg border border-blue-500/20 bg-blue-500/10">
                    <h4 className="font-bold text-lg text-blue-400">3. Human-in-the-Loop Mode</h4>
                    <p className="text-muted-foreground">The AI suggests block/allow decisions but holds high-risk requests for analyst approval before enforcement. Provides maximum control at the cost of latency for flagged requests.</p>
                </div>
            </div>

            <h3 className="mt-6">Fidelity-Based Decision Making</h3>
            <p className="text-muted-foreground">
                All enforcement decisions are based on the <strong>fidelity score (0–100)</strong>, which aggregates confidence scores from all detection layers:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-muted-foreground mt-2">
                <li><strong>90–100:</strong> Critical — auto-blocked in Defense mode</li>
                <li><strong>70–89:</strong> High — blocked in Defense, flagged in Audited</li>
                <li><strong>40–69:</strong> Medium — escalated for human review</li>
                <li><strong>10–39:</strong> Low — logged but allowed</li>
                <li><strong>0–9:</strong> Info — normal traffic</li>
            </ul>
            <p className="mt-4 text-sm text-muted-foreground">
                <em>Thresholds are configurable per service and auto-tuned by the self-evolution engine based on analyst feedback patterns.</em>
            </p>
        </DocsSection>
    );
}
