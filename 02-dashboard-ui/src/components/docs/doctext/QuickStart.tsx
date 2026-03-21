import { DocsSection } from "@/components/docs/docs-section";
import { CodeBlock } from "@/components/ui/code-block";

export function QuickStart() {
    return (
        <DocsSection id="quick-start" title="Quick Start">
            <h3>Option 1: Full Docker Deployment</h3>
            <p>The fastest way to get ARIA running is with Docker Compose, which starts all services including the dashboard, gateway, MongoDB, Redis, Ollama, and ChromaDB.</p>
            <div className="my-4">
                <CodeBlock code={`# Clone the repository
git clone https://github.com/harir03/aria.git
cd aria

# Start all services
cd infrastructure
docker-compose up -d

# Verify all services are running
docker-compose ps

# Seed the database with demo data
node infrastructure/seed_node.js`} />
            </div>

            <div className="my-6 p-4 border border-blue-500/20 bg-blue-500/10 rounded-lg">
                <p className="text-sm font-medium text-blue-200">
                    <strong>Services Started:</strong> Dashboard (<code>localhost:3000</code>), Gateway (<code>localhost:80</code>), MongoDB (<code>localhost:27017</code>), Redis (<code>localhost:6379</code>), Ollama (<code>localhost:11434</code>), ChromaDB (<code>localhost:8000</code>)
                </p>
            </div>

            <h3>Option 2: Local Development</h3>
            <p>For active development, start only the infrastructure services in Docker and run the dashboard locally with hot-reload.</p>
            <div className="my-4">
                <CodeBlock code={`# 1. Start infrastructure only
cd infrastructure
docker-compose up -d mongo redis aria-ai aria-model-puller chromadb

# 2. Install dashboard dependencies
cd apps/dashboard
npm install

# 3. Run dashboard in dev mode
npm run dev
# → Dashboard at http://localhost:3000`} />
            </div>

            <h3>Environment Variables</h3>
            <p>All services use these environment variables (defaults work for local development):</p>
            <div className="my-4 overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-border">
                            <th className="text-left py-2 pr-4 text-muted-foreground">Variable</th>
                            <th className="text-left py-2 pr-4 text-muted-foreground">Default</th>
                            <th className="text-left py-2 text-muted-foreground">Purpose</th>
                        </tr>
                    </thead>
                    <tbody className="text-muted-foreground">
                        <tr className="border-b border-border/50"><td className="py-2 pr-4"><code>MONGODB_URI</code></td><td className="py-2 pr-4"><code>mongodb://localhost:27017/aria_db</code></td><td className="py-2">Primary database</td></tr>
                        <tr className="border-b border-border/50"><td className="py-2 pr-4"><code>REDIS_URI</code></td><td className="py-2 pr-4"><code>redis://localhost:6379</code></td><td className="py-2">Pub/sub, caching, queues</td></tr>
                        <tr className="border-b border-border/50"><td className="py-2 pr-4"><code>OLLAMA_HOST</code></td><td className="py-2 pr-4"><code>http://localhost:11434</code></td><td className="py-2">Local LLM inference</td></tr>
                        <tr><td className="py-2 pr-4"><code>CHROMADB_HOST</code></td><td className="py-2 pr-4"><code>http://localhost:8000</code></td><td className="py-2">Vector database</td></tr>
                    </tbody>
                </table>
            </div>

            <h3>SDK Installation</h3>
            <p>To protect your own application with ARIA, install the SDK middleware:</p>
            <div className="my-4">
                <CodeBlock code="npm install mafai" />
            </div>
        </DocsSection>
    );
}
