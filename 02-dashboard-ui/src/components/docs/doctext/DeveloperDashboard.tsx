import { DocsSection } from "@/components/docs/docs-section";

export function DeveloperDashboard() {
    return (
        <DocsSection id="developer-dashboard" title="Developer Dashboard">
            <p>
                ARIA ships with a full-featured Next.js 16 analyst dashboard for real-time monitoring, threat investigation, and system management.
            </p>

            <div className="space-y-4 my-6">
                <div className="p-4 rounded-lg border border-border bg-background/50">
                    <h4 className="font-bold text-lg">Traffic Analysis</h4>
                    <p className="text-muted-foreground">Real-time QPS charts, request volume over 24 hours, blocked vs. allowed traffic ratios, and geographic attack origin visualization with an interactive 3D globe.</p>
                </div>
                <div className="p-4 rounded-lg border border-border bg-background/50">
                    <h4 className="font-bold text-lg">Human Triage Queue</h4>
                    <p className="text-muted-foreground">Two-panel layout showing all pending AI decisions. Approve or reject blocks/allows with analyst notes. Each alert shows fidelity score, detection sources, AI reasoning, and similar past incidents.</p>
                </div>
                <div className="p-4 rounded-lg border border-border bg-background/50">
                    <h4 className="font-bold text-lg">Incident Feed &amp; Correlation</h4>
                    <p className="text-muted-foreground">Paginated, filterable table of all security events. Related alerts are grouped into incidents with MITRE ATT&CK kill chain stage mapping.</p>
                </div>
                <div className="p-4 rounded-lg border border-border bg-background/50">
                    <h4 className="font-bold text-lg">Attack Chain Visualization</h4>
                    <p className="text-muted-foreground">Interactive React Flow graphs mapping alerts across kill chain stages — from reconnaissance to exfiltration — helping analysts understand multi-stage campaigns.</p>
                </div>
                <div className="p-4 rounded-lg border border-border bg-background/50">
                    <h4 className="font-bold text-lg">Self-Evolution Monitor</h4>
                    <p className="text-muted-foreground">Track every change the AI has made: new regex patterns, updated LLM prompts, threshold adjustments, model fine-tunes, and any rollbacks with validation scores.</p>
                </div>
                <div className="p-4 rounded-lg border border-border bg-background/50">
                    <h4 className="font-bold text-lg">AI Learning Dashboard</h4>
                    <p className="text-muted-foreground">Transparent view of what ARIA has learned: accuracy trends, learned pattern viewer, model version history, and evolution timeline.</p>
                </div>
                <div className="p-4 rounded-lg border border-border bg-background/50">
                    <h4 className="font-bold text-lg">Response Playbooks</h4>
                    <p className="text-muted-foreground">LLM-generated step-by-step incident response procedures following NIST SP 800-61, PCI-DSS, and RBI cybersecurity frameworks.</p>
                </div>
                <div className="p-4 rounded-lg border border-border bg-background/50">
                    <h4 className="font-bold text-lg">Natural Language Query</h4>
                    <p className="text-muted-foreground">Ask questions in plain English — e.g., &quot;Show all SQL injection attempts from the last 24 hours&quot; — and get instant query results with visualizations.</p>
                </div>
            </div>
        </DocsSection>
    );
}
