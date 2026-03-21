import { DocsSection } from "@/components/docs/docs-section";

export function SecurityPrivacy() {
    return (
        <DocsSection id="security-privacy" title="Security & Privacy">
            <div className="flex flex-col gap-4">
                <div className="p-4 border border-green-500/20 bg-green-500/10 rounded-lg">
                    <h4 className="font-bold text-green-400 mb-2">Local LLM Inference</h4>
                    <p className="text-sm">ARIA uses Ollama with Mistral 7B running entirely on your infrastructure. No request data is ever sent to external AI providers. All threat analysis happens on-premises.</p>
                </div>
                <div className="p-4 border border-blue-500/20 bg-blue-500/10 rounded-lg">
                    <h4 className="font-bold text-blue-400 mb-2">Fail-Open Design</h4>
                    <p className="text-sm">If any ARIA service encounters an error, requests are <strong>allowed through</strong> — never blocked by a system failure. This ensures ARIA never becomes a single point of failure for your application.</p>
                </div>
                <div className="p-4 border border-purple-500/20 bg-purple-500/10 rounded-lg">
                    <h4 className="font-bold text-purple-400 mb-2">Data Isolation</h4>
                    <p className="text-sm">Each protected service has its own isolated detection context. ARIA stores request metadata for analysis but does not store raw request/response bodies beyond what is needed for threat investigation.</p>
                </div>
                <div>
                    <h4 className="font-bold mb-2">Self-Hosted &amp; Air-Gapped Deployment</h4>
                    <p className="text-muted-foreground">
                        ARIA is designed for full on-premises deployment via Docker Compose. All services (MongoDB, Redis, Ollama, ChromaDB) run within your infrastructure. No external network dependencies after initial setup.
                    </p>
                </div>
                <div>
                    <h4 className="font-bold mb-2">Compliance Readiness</h4>
                    <p className="text-muted-foreground">
                        Auto-generated playbooks reference <strong>NIST SP 800-61</strong>, <strong>PCI-DSS</strong>, <strong>RBI CSCRF</strong>, and <strong>ISO 27001</strong> requirements. Evolution audit trails provide complete traceability for every AI decision and rule change.
                    </p>
                </div>
            </div>
        </DocsSection>
    );
}
