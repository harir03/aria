import { DocsSection } from "@/components/docs/docs-section";
import { CodeBlock } from "@/components/ui/code-block";

export function IntegrationOverview() {
    return (
        <DocsSection id="integration-overview" title="Integration Overview">
            <p>
                ARIA provides first-party middleware for common Node.js frameworks via the <code>mafai</code> SDK package. The middleware intercepts requests and forwards metadata to the ARIA Engine for real-time threat analysis.
            </p>

            <h3>Express Integration</h3>
            <div className="my-4">
                <CodeBlock code={`const express = require('express');
const { ariaExpress } = require('mafai');

const app = express();
app.use(express.json());

// Add ARIA middleware — all requests are analyzed
app.use(ariaExpress({
    apiKey: "YOUR_ARIA_APP_KEY",
    engineUrl: "http://localhost:80/evaluate",
    mode: "defense",        // "defense" | "audited" | "monitor"
    failOpen: true,         // Allow requests if ARIA is unreachable
    excludePaths: ["/health", "/metrics"],
    timeout: 2000           // Max wait time for analysis (ms)
}));

app.post('/api/transfer', (req, res) => {
    // ARIA has already validated this request
    res.json({ success: true });
});`} />
            </div>

            <h3>Fastify Integration</h3>
            <div className="my-4">
                <CodeBlock code={`const fastify = require('fastify')();
const { ariaFastify } = require('mafai');

fastify.register(ariaFastify, {
    apiKey: "YOUR_ARIA_APP_KEY",
    engineUrl: "http://localhost:80/evaluate",
    mode: "defense"
});`} />
            </div>

            <h3>Reverse Proxy Mode (No SDK Required)</h3>
            <p>
                Alternatively, route all traffic through ARIA&apos;s built-in reverse proxy gateway — no code changes needed. Configure your application as an upstream in ARIA&apos;s dashboard.
            </p>
            <div className="my-4">
                <CodeBlock code={`# In the ARIA dashboard, add a Protected Service:
# Domain: your-app.bank.local
# Upstream: http://10.0.0.51:3000
# Defense Mode: Defense
# All traffic to your-app.bank.local now flows through ARIA`} />
            </div>

            <h3>Recommended Rollout Strategy</h3>
            <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                <li><strong>Day 1:</strong> Deploy in <em>Audited</em> mode. No user impact — all requests pass through, but threats are logged.</li>
                <li><strong>Day 2–3:</strong> Review the dashboard. Tune fidelity thresholds to reduce false positives.</li>
                <li><strong>Day 4:</strong> Switch to <em>Defense</em> mode for high-confidence attack categories (SQLi, command injection).</li>
                <li><strong>Ongoing:</strong> Let the self-evolution engine continuously improve detection accuracy from analyst feedback.</li>
            </ul>
        </DocsSection>
    );
}
