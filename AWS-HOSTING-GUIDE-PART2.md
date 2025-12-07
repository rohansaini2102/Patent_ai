# AWS Hosting Complete Guide for nexorapatent.in
## Part 2: DNS, SSL, CloudFront CDN & CI/CD

---

# TABLE OF CONTENTS

8. [Phase 5: Route 53 DNS Setup](#8-phase-5-route-53-dns-setup)
9. [Phase 6: SSL Certificate Setup](#9-phase-6-ssl-certificate-setup)
10. [Phase 7: CloudFront CDN Setup](#10-phase-7-cloudfront-cdn-setup)
11. [Phase 8: GitHub Actions CI/CD](#11-phase-8-github-actions-cicd)
12. [Common Mistakes & Warnings (Part 2)](#12-common-mistakes--warnings-part-2)
13. [Monitoring & Maintenance](#13-monitoring--maintenance)
14. [Cost Summary](#14-cost-summary)
15. [Quick Reference Commands](#15-quick-reference-commands)

---

# 8. PHASE 5: ROUTE 53 DNS SETUP

## 8.1 What is DNS and Why Route 53?

```
┌────────────────────────────────────────────────────────────────┐
│ WHAT IS DNS?                                                   │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│ DNS = Domain Name System                                       │
│                                                                │
│ It's like the internet's phone book:                          │
│                                                                │
│ Phone Book:                                                    │
│   "John Smith" → 555-123-4567                                 │
│                                                                │
│ DNS:                                                           │
│   "nexorapatent.in" → 52.66.100.200                          │
│                                                                │
│ Without DNS:                                                   │
│   You'd have to type: http://52.66.100.200                    │
│   Nobody would remember IP addresses!                         │
│                                                                │
│ With DNS:                                                      │
│   You type: https://nexorapatent.in                           │
│   DNS translates it to the IP address automatically           │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

```
┌────────────────────────────────────────────────────────────────┐
│ WHY ROUTE 53?                                                  │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│ Route 53 = Amazon's DNS service                                │
│                                                                │
│ Named after:                                                   │
│ - Route 66 (famous US highway)                                │
│ - Port 53 (DNS uses port 53)                                  │
│                                                                │
│ BENEFITS:                                                      │
│ ✓ 100% SLA uptime guarantee                                   │
│ ✓ Global network of DNS servers                               │
│ ✓ Native integration with AWS services                        │
│ ✓ Alias records (unique to Route 53)                          │
│ ✓ Health checks and failover                                  │
│ ✓ Low latency DNS resolution                                  │
│                                                                │
│ COST: ~$0.50/month per hosted zone                            │
│                                                                │
│ ALTERNATIVES (but Route 53 is better for AWS):                │
│ - Cloudflare DNS (free)                                       │
│ - Google Cloud DNS                                            │
│ - Your domain registrar's DNS                                 │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

## 8.2 DNS Record Types Explained

```
┌────────────────────────────────────────────────────────────────┐
│ DNS RECORD TYPES YOU NEED TO KNOW                              │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│ A RECORD (Address Record)                                      │
│ ─────────────────────────                                      │
│ Maps domain name to IPv4 address                               │
│                                                                │
│ Example:                                                       │
│ nexorapatent.in → 52.66.100.200                               │
│                                                                │
│ ─────────────────────────────────────────────────────────────  │
│                                                                │
│ AAAA RECORD (IPv6 Address Record)                              │
│ ─────────────────────────────────                              │
│ Maps domain name to IPv6 address                               │
│                                                                │
│ Example:                                                       │
│ nexorapatent.in → 2001:0db8:85a3:0000:0000:8a2e:0370:7334    │
│                                                                │
│ ─────────────────────────────────────────────────────────────  │
│                                                                │
│ CNAME RECORD (Canonical Name)                                  │
│ ─────────────────────────────                                  │
│ Maps domain name to another domain name                        │
│                                                                │
│ Example:                                                       │
│ www.nexorapatent.in → nexorapatent.in                         │
│                                                                │
│ LIMITATION: Cannot use CNAME for root domain (@)              │
│                                                                │
│ ─────────────────────────────────────────────────────────────  │
│                                                                │
│ ALIAS RECORD (Route 53 Special)                                │
│ ───────────────────────────────                                │
│ Like CNAME but works for root domain!                         │
│ Only available in Route 53                                     │
│                                                                │
│ Example:                                                       │
│ nexorapatent.in → d123abc.cloudfront.net                      │
│                                                                │
│ WHY USE ALIAS?                                                 │
│ - Works on root domain (CNAME doesn't)                        │
│ - No extra DNS lookup (faster)                                │
│ - Free (CNAME queries cost money)                             │
│                                                                │
│ ─────────────────────────────────────────────────────────────  │
│                                                                │
│ NS RECORD (Name Server)                                        │
│ ───────────────────────                                        │
│ Specifies which DNS servers are authoritative                 │
│                                                                │
│ Example:                                                       │
│ nexorapatent.in → ns-1234.awsdns-12.org                       │
│                                                                │
│ These tell the internet "Ask these servers about this domain" │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

## 8.3 Step-by-Step: Create Hosted Zone

### Step 8.3.1: Navigate to Route 53

```
1. Go to AWS Console: https://console.aws.amazon.com
2. In search bar, type: Route 53
3. Click "Route 53"
4. You'll see the Route 53 Dashboard
```

### Step 8.3.2: Create Hosted Zone

```
┌────────────────────────────────────────────────────────────────┐
│ CREATE HOSTED ZONE                                             │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│ 1. Click "Hosted zones" in left sidebar                       │
│ 2. Click "Create hosted zone"                                  │
│                                                                │
│ Fill in:                                                       │
│ ┌──────────────────────────────────────────────────────────┐  │
│ │ Domain name: nexorapatent.in                             │  │
│ │                                                          │  │
│ │ Description: DNS for Nexora Patent website (optional)    │  │
│ │                                                          │  │
│ │ Type: ● Public hosted zone                               │  │
│ │       ○ Private hosted zone for Amazon VPC               │  │
│ │                                                          │  │
│ │ Tags: (optional)                                         │  │
│ │   Key: Project    Value: NexoraPatent                   │  │
│ │                                                          │  │
│ └──────────────────────────────────────────────────────────┘  │
│                                                                │
│ Click "Create hosted zone"                                     │
│                                                                │
│ ⚠️ IMPORTANT: Choose "Public hosted zone"                      │
│    Private is for internal AWS networks only                  │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

### Step 8.3.3: Note Your Nameservers

```
┌────────────────────────────────────────────────────────────────┐
│ YOUR NAMESERVERS (SAVE THESE!)                                 │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│ After creating hosted zone, you'll see NS record with         │
│ 4 nameservers like:                                           │
│                                                                │
│ ns-1234.awsdns-12.org                                         │
│ ns-567.awsdns-34.net                                          │
│ ns-890.awsdns-56.co.uk                                        │
│ ns-111.awsdns-78.com                                          │
│                                                                │
│ WRITE THESE DOWN! You'll need them in the next step.         │
│                                                                │
│ My Nameservers:                                                │
│ 1. ________________________________________________           │
│ 2. ________________________________________________           │
│ 3. ________________________________________________           │
│ 4. ________________________________________________           │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

## 8.4 Update Domain Registrar Nameservers

```
┌────────────────────────────────────────────────────────────────┐
│ WHAT THIS STEP DOES                                            │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│ Currently:                                                     │
│ nexorapatent.in → Domain Registrar's nameservers              │
│                 → They don't know about AWS                   │
│                                                                │
│ After this step:                                               │
│ nexorapatent.in → Route 53 nameservers                        │
│                 → Route 53 controls the domain                │
│                                                                │
│ This is like saying:                                          │
│ "When anyone asks about nexorapatent.in,                      │
│  ask AWS Route 53 for the answer"                             │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

### Different Registrar Instructions

```
┌────────────────────────────────────────────────────────────────┐
│ GODADDY                                                        │
├────────────────────────────────────────────────────────────────┤
│ 1. Log in to godaddy.com                                      │
│ 2. Click "My Products"                                         │
│ 3. Next to your domain, click "DNS"                           │
│ 4. Scroll down to "Nameservers"                                │
│ 5. Click "Change"                                              │
│ 6. Select "Enter my own nameservers (advanced)"               │
│ 7. Enter all 4 Route 53 nameservers                           │
│ 8. Click "Save"                                                │
└────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────┐
│ NAMECHEAP                                                      │
├────────────────────────────────────────────────────────────────┤
│ 1. Log in to namecheap.com                                    │
│ 2. Go to "Domain List"                                         │
│ 3. Click "Manage" next to your domain                         │
│ 4. In "Nameservers" section, select "Custom DNS"              │
│ 5. Enter all 4 Route 53 nameservers                           │
│ 6. Click green checkmark to save                              │
└────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────┐
│ GOOGLE DOMAINS                                                 │
├────────────────────────────────────────────────────────────────┤
│ 1. Log in to domains.google.com                               │
│ 2. Click your domain                                           │
│ 3. Click "DNS" in left sidebar                                │
│ 4. Select "Custom name servers"                                │
│ 5. Enter all 4 Route 53 nameservers                           │
│ 6. Click "Save"                                                │
└────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────┐
│ HOSTINGER                                                      │
├────────────────────────────────────────────────────────────────┤
│ 1. Log in to hpanel.hostinger.com                             │
│ 2. Go to "Domains"                                             │
│ 3. Click your domain                                           │
│ 4. Click "DNS / Nameservers"                                  │
│ 5. Click "Change nameservers"                                  │
│ 6. Enter all 4 Route 53 nameservers                           │
│ 7. Click "Save"                                                │
└────────────────────────────────────────────────────────────────┘
```

### DNS Propagation Warning

```
┌────────────────────────────────────────────────────────────────┐
│ ⏳ DNS PROPAGATION TIME                                        │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│ After changing nameservers:                                    │
│                                                                │
│ Minimum: 15 minutes                                            │
│ Average: 2-4 hours                                             │
│ Maximum: 48 hours                                              │
│                                                                │
│ During this time:                                              │
│ - Some people see old site                                    │
│ - Some people see new site                                    │
│ - DNS changes spread gradually across the internet            │
│                                                                │
│ CHECK PROPAGATION STATUS:                                      │
│ https://www.whatsmydns.net/#NS/nexorapatent.in               │
│                                                                │
│ When all locations show your Route 53 nameservers,           │
│ propagation is complete!                                      │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

## 8.5 Create DNS Records in Route 53

### Step 8.5.1: Create A Record for Root Domain

```
1. In Route 53, click on your hosted zone (nexorapatent.in)
2. Click "Create record"

┌────────────────────────────────────────────────────────────────┐
│ CREATE RECORD - ROOT DOMAIN                                    │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│ Record name: (leave empty for root @)                         │
│                                                                │
│ Record type: A - Routes traffic to an IPv4 address            │
│                                                                │
│ Alias: OFF (toggle off for now - we'll change later)         │
│                                                                │
│ Value: YOUR_ELASTIC_IP                                        │
│        Example: 52.66.100.200                                 │
│                                                                │
│ TTL (seconds): 300                                            │
│                                                                │
│ Routing policy: Simple routing                                 │
│                                                                │
│ Click "Create records"                                         │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

### Step 8.5.2: Create A Record for WWW Subdomain

```
Click "Create record" again

┌────────────────────────────────────────────────────────────────┐
│ CREATE RECORD - WWW SUBDOMAIN                                  │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│ Record name: www                                               │
│                                                                │
│ Record type: A - Routes traffic to an IPv4 address            │
│                                                                │
│ Alias: OFF                                                     │
│                                                                │
│ Value: YOUR_ELASTIC_IP                                        │
│        Example: 52.66.100.200                                 │
│                                                                │
│ TTL (seconds): 300                                            │
│                                                                │
│ Routing policy: Simple routing                                 │
│                                                                │
│ Click "Create records"                                         │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

### Step 8.5.3: Verify DNS Records

```
Your hosted zone should now have these records:

┌────────────────────────────────────────────────────────────────┐
│ HOSTED ZONE RECORDS                                            │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│ Record name          Type    Value                            │
│ ─────────────────────────────────────────────────────────────  │
│ nexorapatent.in      NS      ns-1234.awsdns-xx.org (auto)    │
│ nexorapatent.in      SOA     (auto-created)                  │
│ nexorapatent.in      A       52.66.100.200 (you created)     │
│ www.nexorapatent.in  A       52.66.100.200 (you created)     │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

## 8.6 Update Nginx Server Name

```bash
# SSH into your EC2

# Edit nginx config
sudo nano /etc/nginx/sites-available/nexora

# Make sure server_name line says:
server_name nexorapatent.in www.nexorapatent.in;

# Test and reload
sudo nginx -t
sudo systemctl reload nginx
```

## 8.7 Test Domain

```
┌────────────────────────────────────────────────────────────────┐
│ TEST YOUR DOMAIN                                               │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│ After DNS propagation (wait at least 15-30 minutes):          │
│                                                                │
│ Open browser and visit:                                        │
│ http://nexorapatent.in                                        │
│ http://www.nexorapatent.in                                    │
│                                                                │
│ ✓ Both should show your website!                              │
│                                                                │
│ ⚠️ Notice: Still HTTP (not HTTPS)                              │
│    We'll fix this in the next phase!                          │
│                                                                │
│ TROUBLESHOOTING:                                               │
│ - "Site can't be reached": DNS not propagated yet, wait more │
│ - "Connection refused": Check EC2 security group for port 80 │
│ - "403 Forbidden": Check file permissions on EC2             │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

---

# 9. PHASE 6: SSL CERTIFICATE SETUP

## 9.1 Why HTTPS?

```
┌────────────────────────────────────────────────────────────────┐
│ HTTP vs HTTPS                                                  │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│ HTTP (HyperText Transfer Protocol):                           │
│ ┌─────────────────────────────────────────────────────────┐   │
│ │ User ──── "Password: secret123" ────► Server            │   │
│ │          (anyone can read this!)                         │   │
│ └─────────────────────────────────────────────────────────┘   │
│                                                                │
│ HTTPS (HTTP Secure):                                           │
│ ┌─────────────────────────────────────────────────────────┐   │
│ │ User ──── "s8d#@kx!2..." ────► Server                   │   │
│ │          (encrypted - nobody can read!)                  │   │
│ └─────────────────────────────────────────────────────────┘   │
│                                                                │
│ WHY YOU NEED HTTPS:                                            │
│ ✓ Google ranks HTTPS sites higher (SEO)                       │
│ ✓ Browsers show "Not Secure" warning for HTTP                 │
│ ✓ Required for many modern features (geolocation, etc.)      │
│ ✓ Builds user trust                                           │
│ ✓ Protects user data                                          │
│                                                                │
│ WITHOUT HTTPS:                                                 │
│ ┌──────────────────────────────────────────────────────────┐  │
│ │ 🔓 Not secure | nexorapatent.in                          │  │
│ └──────────────────────────────────────────────────────────┘  │
│                                                                │
│ WITH HTTPS:                                                    │
│ ┌──────────────────────────────────────────────────────────┐  │
│ │ 🔒 https://nexorapatent.in                               │  │
│ └──────────────────────────────────────────────────────────┘  │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

## 9.2 Two SSL Options

```
┌────────────────────────────────────────────────────────────────┐
│ OPTION 1: CERTBOT (Let's Encrypt)                              │
│ For: EC2 direct access                                         │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│ PROS:                                                          │
│ ✓ 100% Free                                                   │
│ ✓ Auto-renewal                                                │
│ ✓ Widely trusted                                              │
│ ✓ Works without CloudFront                                    │
│                                                                │
│ CONS:                                                          │
│ ✗ Must renew every 90 days (automated)                        │
│ ✗ Certificate on EC2 (more management)                        │
│                                                                │
│ USE WHEN:                                                      │
│ - Not using CloudFront                                        │
│ - Want immediate HTTPS                                        │
│                                                                │
└────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────┐
│ OPTION 2: ACM (AWS Certificate Manager)                        │
│ For: CloudFront / Load Balancers                               │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│ PROS:                                                          │
│ ✓ Free                                                        │
│ ✓ Auto-renewal (truly automatic)                              │
│ ✓ AWS managed                                                 │
│ ✓ Works with CloudFront                                       │
│                                                                │
│ CONS:                                                          │
│ ✗ Cannot download certificate                                 │
│ ✗ Only works with AWS services (not directly on EC2)         │
│ ✗ Must be in us-east-1 for CloudFront                        │
│                                                                │
│ USE WHEN:                                                      │
│ - Using CloudFront (our case!)                                │
│ - Using Application Load Balancer                             │
│                                                                │
└────────────────────────────────────────────────────────────────┘

WE WILL USE BOTH:
1. Certbot on EC2 (for direct EC2 access testing)
2. ACM for CloudFront (for production)
```

## 9.3 Option 1: Certbot on EC2

### Step 9.3.1: Install Certbot

```bash
# SSH into your EC2 server

# Install Certbot and Nginx plugin
sudo apt install certbot python3-certbot-nginx -y
```

```
┌────────────────────────────────────────────────────────────────┐
│ WHAT IS CERTBOT?                                               │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│ Certbot is a tool from EFF (Electronic Frontier Foundation)   │
│ that automatically:                                            │
│                                                                │
│ 1. Requests SSL certificate from Let's Encrypt                │
│ 2. Proves you own the domain                                  │
│ 3. Installs certificate on your server                        │
│ 4. Configures Nginx for HTTPS                                 │
│ 5. Sets up automatic renewal                                  │
│                                                                │
│ Let's Encrypt = Free Certificate Authority                    │
│ (Trusted by all browsers)                                     │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

### Step 9.3.2: Get SSL Certificate

```bash
# Run Certbot for Nginx (replace with your domain)
sudo certbot --nginx -d nexorapatent.in -d www.nexorapatent.in
```

### Step 9.3.3: Follow the Prompts

```
┌────────────────────────────────────────────────────────────────┐
│ CERTBOT INTERACTIVE PROMPTS                                    │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│ Prompt 1: Enter email address                                  │
│ ─────────────────────────────                                  │
│ Enter email address (used for urgent renewal and security     │
│ notices) (Enter 'c' to cancel):                                │
│                                                                │
│ YOUR INPUT: your-email@example.com                            │
│                                                                │
│ WHY: Let's Encrypt will email you if certificate expires      │
│                                                                │
│ ─────────────────────────────────────────────────────────────  │
│                                                                │
│ Prompt 2: Terms of Service                                     │
│ ──────────────────────────                                     │
│ Please read the Terms of Service. You must agree in order     │
│ to register with the ACME server. Do you agree?               │
│                                                                │
│ YOUR INPUT: Y (for Yes)                                        │
│                                                                │
│ ─────────────────────────────────────────────────────────────  │
│                                                                │
│ Prompt 3: Share email with EFF                                 │
│ ──────────────────────────────                                 │
│ Would you be willing to share your email address with EFF?    │
│                                                                │
│ YOUR INPUT: N (optional, doesn't affect certificate)          │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

### Step 9.3.4: Success Output

```
┌────────────────────────────────────────────────────────────────┐
│ SUCCESSFUL CERTBOT OUTPUT                                      │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│ Successfully received certificate.                             │
│ Certificate is saved at:                                       │
│   /etc/letsencrypt/live/nexorapatent.in/fullchain.pem        │
│ Key is saved at:                                               │
│   /etc/letsencrypt/live/nexorapatent.in/privkey.pem          │
│                                                                │
│ Deploying certificate                                          │
│ Successfully deployed certificate for nexorapatent.in         │
│ Successfully deployed certificate for www.nexorapatent.in     │
│                                                                │
│ Congratulations! You have successfully enabled HTTPS          │
│                                                                │
│ IMPORTANT NOTES:                                               │
│  - Your certificate will expire on 2025-03-07                 │
│  - Certbot will automatically renew before expiry             │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

### Step 9.3.5: Verify Auto-Renewal

```bash
# Test automatic renewal process
sudo certbot renew --dry-run

# Expected output:
# Congratulations, all simulated renewals succeeded
```

### Step 9.3.6: Test HTTPS

```
┌────────────────────────────────────────────────────────────────┐
│ TEST HTTPS                                                     │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│ Open browser and visit:                                        │
│ https://nexorapatent.in                                       │
│ https://www.nexorapatent.in                                   │
│                                                                │
│ You should see:                                                │
│ 🔒 https://nexorapatent.in                                    │
│                                                                │
│ Click the padlock to verify certificate:                      │
│ - Issued by: Let's Encrypt                                    │
│ - Valid until: ~90 days from now                              │
│                                                                │
│ HTTP should redirect to HTTPS:                                │
│ http://nexorapatent.in → https://nexorapatent.in             │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

## 9.4 Option 2: ACM Certificate (for CloudFront)

### Step 9.4.1: Switch to us-east-1 Region

```
⚠️ CRITICAL: ACM certificates for CloudFront MUST be in us-east-1!

1. Go to AWS Console
2. Top right corner, click region dropdown
3. Select: US East (N. Virginia) us-east-1

WHY?
CloudFront is a global service managed from us-east-1.
It can only use certificates from us-east-1.
```

### Step 9.4.2: Request Certificate

```
1. Go to ACM (AWS Certificate Manager)
   - Search "Certificate Manager" in AWS console

2. Click "Request a certificate"

3. Select: Request a public certificate
   Click "Next"
```

### Step 9.4.3: Configure Certificate

```
┌────────────────────────────────────────────────────────────────┐
│ REQUEST PUBLIC CERTIFICATE                                     │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│ Domain names:                                                  │
│ ┌──────────────────────────────────────────────────────────┐  │
│ │ nexorapatent.in                                          │  │
│ │                                                          │  │
│ │ [Add another name to this certificate]                   │  │
│ │                                                          │  │
│ │ *.nexorapatent.in                                        │  │
│ └──────────────────────────────────────────────────────────┘  │
│                                                                │
│ WHY TWO DOMAINS?                                               │
│ - nexorapatent.in = root domain                               │
│ - *.nexorapatent.in = wildcard for all subdomains            │
│   (covers www, api, blog, anything.nexorapatent.in)          │
│                                                                │
│ Validation method:                                             │
│ ● DNS validation - recommended (we'll use this)               │
│ ○ Email validation                                            │
│                                                                │
│ Key algorithm: RSA 2048 (default, fine)                       │
│                                                                │
│ Click "Request"                                                │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

### Step 9.4.4: DNS Validation

```
┌────────────────────────────────────────────────────────────────┐
│ DNS VALIDATION                                                 │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│ After requesting, certificate status = "Pending validation"  │
│                                                                │
│ 1. Click on your certificate (click the Certificate ID)       │
│                                                                │
│ 2. In "Domains" section, you'll see:                          │
│    nexorapatent.in    Pending validation                      │
│    *.nexorapatent.in  Pending validation                      │
│                                                                │
│ 3. Click "Create records in Route 53"                         │
│    (This button appears if using Route 53)                    │
│                                                                │
│ 4. Click "Create records" in the popup                        │
│                                                                │
│ WHAT THIS DOES:                                                │
│ - ACM needs to verify you own the domain                      │
│ - It asks you to add a special CNAME record                   │
│ - AWS can auto-add this to Route 53                           │
│ - The record looks like: _abc123.nexorapatent.in              │
│                                                                │
│ Wait 5-30 minutes for validation                              │
│ Status will change to: "Issued" ✓                             │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

### Step 9.4.5: Verify Certificate Issued

```
┌────────────────────────────────────────────────────────────────┐
│ CERTIFICATE STATUS                                             │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│ Refresh the page after 5-30 minutes                           │
│                                                                │
│ Status: Issued ✓                                              │
│                                                                │
│ Domains:                                                       │
│ - nexorapatent.in      Success ✓                             │
│ - *.nexorapatent.in    Success ✓                             │
│                                                                │
│ Type: Amazon Issued                                            │
│ In use? No (not yet attached to CloudFront)                   │
│ Renewal eligibility: Eligible                                 │
│                                                                │
│ This certificate will AUTO-RENEW forever!                     │
│ Unlike Let's Encrypt, no action needed.                       │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

---

# 10. PHASE 7: CLOUDFRONT CDN SETUP

## 10.1 CloudFront Concepts

```
┌────────────────────────────────────────────────────────────────┐
│ CLOUDFRONT TERMINOLOGY                                         │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│ DISTRIBUTION                                                   │
│ ─────────────                                                  │
│ A CloudFront "deployment" - your CDN configuration            │
│ Has a unique domain: d1234abcd.cloudfront.net                 │
│                                                                │
│ ORIGIN                                                         │
│ ──────                                                         │
│ Where CloudFront gets your content from                       │
│ In our case: Your EC2 server IP                               │
│                                                                │
│ EDGE LOCATION                                                  │
│ ─────────────                                                  │
│ CloudFront server near users (400+ worldwide)                 │
│ Mumbai, Delhi, Singapore, London, New York, etc.              │
│                                                                │
│ CACHE BEHAVIOR                                                 │
│ ──────────────                                                 │
│ Rules for how CloudFront handles requests                     │
│ What to cache, how long, etc.                                 │
│                                                                │
│ TTL (Time To Live)                                             │
│ ──────────────────                                             │
│ How long CloudFront keeps cached content                      │
│ Before checking origin for updates                            │
│                                                                │
│ INVALIDATION                                                   │
│ ────────────                                                   │
│ Forcing CloudFront to clear cache                             │
│ Used when you update your website                             │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

```
┌────────────────────────────────────────────────────────────────┐
│ HOW CLOUDFRONT WORKS                                           │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│ FIRST REQUEST (cache miss):                                    │
│                                                                │
│ User in Delhi                                                  │
│      │                                                         │
│      ▼                                                         │
│ Delhi Edge Location                                            │
│ "I don't have this file cached"                               │
│      │                                                         │
│      ▼                                                         │
│ Your EC2 in Mumbai                                            │
│ "Here's the file"                                              │
│      │                                                         │
│      ▼                                                         │
│ Delhi Edge caches file + sends to user                        │
│                                                                │
│ ─────────────────────────────────────────────────────────────  │
│                                                                │
│ SECOND REQUEST (cache hit):                                    │
│                                                                │
│ Another User in Delhi                                          │
│      │                                                         │
│      ▼                                                         │
│ Delhi Edge Location                                            │
│ "I have this cached! Here you go!"                            │
│      │                                                         │
│      ▼                                                         │
│ User gets file (EC2 never contacted!)                         │
│                                                                │
│ RESULT: Faster response, less load on EC2                     │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

## 10.2 Create CloudFront Distribution

### Step 10.2.1: Navigate to CloudFront

```
1. Go to AWS Console (any region - CloudFront is global)
2. Search "CloudFront"
3. Click "CloudFront"
4. Click "Create distribution"
```

### Step 10.2.2: Configure Origin

```
┌────────────────────────────────────────────────────────────────┐
│ ORIGIN SETTINGS                                                │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│ Origin domain:                                                 │
│ ┌──────────────────────────────────────────────────────────┐  │
│ │ 52.66.100.200                                            │  │
│ └──────────────────────────────────────────────────────────┘  │
│                                                                │
│ ⚠️ Enter your Elastic IP, not a dropdown selection!           │
│    (The dropdown shows S3 buckets, not what we want)          │
│                                                                │
│ Protocol: HTTP only                                            │
│                                                                │
│ WHY "HTTP only"?                                               │
│ - CloudFront → EC2 communication is internal                  │
│ - HTTPS between CloudFront and EC2 is optional               │
│ - We have HTTPS from User → CloudFront (that's what matters) │
│ - Simplifies setup                                            │
│                                                                │
│ HTTP port: 80                                                  │
│ HTTPS port: 443                                                │
│                                                                │
│ Origin name: nexora-ec2-origin (auto-fills)                   │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

### Step 10.2.3: Configure Default Cache Behavior

```
┌────────────────────────────────────────────────────────────────┐
│ DEFAULT CACHE BEHAVIOR SETTINGS                                │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│ Viewer protocol policy:                                        │
│ ● Redirect HTTP to HTTPS (RECOMMENDED)                        │
│ ○ HTTPS only                                                  │
│ ○ HTTP and HTTPS                                              │
│                                                                │
│ WHY "Redirect HTTP to HTTPS"?                                  │
│ - If user types http://nexorapatent.in                        │
│ - CloudFront redirects to https://nexorapatent.in             │
│ - User always ends up on secure connection                    │
│                                                                │
│ ─────────────────────────────────────────────────────────────  │
│                                                                │
│ Allowed HTTP methods:                                          │
│ ● GET, HEAD (our site is read-only, this is fine)            │
│ ○ GET, HEAD, OPTIONS                                          │
│ ○ GET, HEAD, OPTIONS, PUT, POST, PATCH, DELETE               │
│                                                                │
│ ─────────────────────────────────────────────────────────────  │
│                                                                │
│ Cache key and origin requests:                                 │
│ ● Cache policy and origin request policy (recommended)        │
│                                                                │
│ Cache policy: CachingOptimized                                │
│                                                                │
│ WHY CachingOptimized?                                          │
│ - AWS-managed policy                                          │
│ - Good defaults for static websites                           │
│ - 24 hour default TTL                                         │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

### Step 10.2.4: Configure Settings

```
┌────────────────────────────────────────────────────────────────┐
│ SETTINGS                                                       │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│ Price class:                                                   │
│ ● Use all edge locations (best performance)                   │
│ ○ Use only North America and Europe                           │
│ ○ Use only North America, Europe, Asia, Middle East, Africa  │
│                                                                │
│ WHY "all edge locations"?                                      │
│ - Users worldwide get fast access                             │
│ - Cost difference is minimal for small sites                  │
│ - India has edge locations in Mumbai, Delhi, Chennai          │
│                                                                │
│ ─────────────────────────────────────────────────────────────  │
│                                                                │
│ Alternate domain name (CNAME):                                 │
│ Click "Add item"                                               │
│ ┌──────────────────────────────────────────────────────────┐  │
│ │ nexorapatent.in                                          │  │
│ │ www.nexorapatent.in                                      │  │
│ └──────────────────────────────────────────────────────────┘  │
│                                                                │
│ IMPORTANT: Add BOTH domains!                                  │
│                                                                │
│ ─────────────────────────────────────────────────────────────  │
│                                                                │
│ Custom SSL certificate:                                        │
│ [dropdown] Select: nexorapatent.in (your ACM certificate)    │
│                                                                │
│ ⚠️ If you don't see your certificate:                         │
│    - Make sure it's in us-east-1 region                       │
│    - Make sure status is "Issued"                             │
│    - Refresh the page                                         │
│                                                                │
│ ─────────────────────────────────────────────────────────────  │
│                                                                │
│ Default root object:                                           │
│ ┌──────────────────────────────────────────────────────────┐  │
│ │ index.html                                               │  │
│ └──────────────────────────────────────────────────────────┘  │
│                                                                │
│ WHAT THIS DOES:                                                │
│ - When user visits nexorapatent.in/                           │
│ - CloudFront serves nexorapatent.in/index.html               │
│                                                                │
│ ─────────────────────────────────────────────────────────────  │
│                                                                │
│ Standard logging: Off (optional, costs money)                  │
│                                                                │
│ Description: Nexora Patent CDN                                │
│                                                                │
│ Click "Create distribution"                                    │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

### Step 10.2.5: Wait for Deployment

```
┌────────────────────────────────────────────────────────────────┐
│ DISTRIBUTION DEPLOYMENT                                        │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│ Status: Deploying...                                           │
│                                                                │
│ This takes 5-15 minutes                                        │
│                                                                │
│ CloudFront is:                                                 │
│ 1. Configuring 400+ edge locations worldwide                  │
│ 2. Propagating your settings                                  │
│ 3. Setting up SSL certificate                                 │
│                                                                │
│ When complete:                                                 │
│ Status: Enabled ✓                                             │
│ Last modified: (current time)                                 │
│                                                                │
│ Note your Distribution domain name:                           │
│ d1234abcdef8.cloudfront.net                                  │
│                                                                │
│ Write this down: ______________________________               │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

## 10.3 Configure Error Pages (Critical for SPA!)

```
┌────────────────────────────────────────────────────────────────┐
│ WHY ERROR PAGES MATTER FOR REACT SPA                           │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│ Without custom error pages:                                    │
│                                                                │
│ User visits: nexorapatent.in/contact                          │
│ CloudFront looks for: /contact file on origin                 │
│ Result: File not found → CloudFront returns 403 or 404 error │
│                                                                │
│ With custom error pages:                                       │
│                                                                │
│ User visits: nexorapatent.in/contact                          │
│ CloudFront looks for: /contact file on origin                 │
│ File not found → Returns index.html instead                   │
│ React Router handles /contact route → Page loads!             │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

### Step 10.3.1: Configure 403 Error Response

```
1. Go to CloudFront → Your distribution
2. Click "Error pages" tab
3. Click "Create custom error response"

┌────────────────────────────────────────────────────────────────┐
│ CUSTOM ERROR RESPONSE - 403                                    │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│ HTTP error code: 403: Forbidden                               │
│                                                                │
│ Customize error response: Yes                                  │
│                                                                │
│ Response page path: /index.html                               │
│                                                                │
│ HTTP response code: 200: OK                                   │
│                                                                │
│ Click "Create custom error response"                          │
│                                                                │
│ WHAT THIS DOES:                                                │
│ - When CloudFront would return 403 error                      │
│ - Instead, return index.html with 200 status                 │
│ - React takes over and handles routing                        │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

### Step 10.3.2: Configure 404 Error Response

```
Click "Create custom error response" again

┌────────────────────────────────────────────────────────────────┐
│ CUSTOM ERROR RESPONSE - 404                                    │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│ HTTP error code: 404: Not Found                               │
│                                                                │
│ Customize error response: Yes                                  │
│                                                                │
│ Response page path: /index.html                               │
│                                                                │
│ HTTP response code: 200: OK                                   │
│                                                                │
│ Click "Create custom error response"                          │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

## 10.4 Update Route 53 to Point to CloudFront

### Step 10.4.1: Edit Root Domain Record

```
1. Go to Route 53 → Hosted zones → nexorapatent.in
2. Select the A record for nexorapatent.in (root)
3. Click "Edit record"

┌────────────────────────────────────────────────────────────────┐
│ EDIT A RECORD - ROOT DOMAIN                                    │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│ Record name: (empty - root domain)                            │
│                                                                │
│ Record type: A                                                 │
│                                                                │
│ Alias: YES (toggle ON!)                                       │
│                                                                │
│ Route traffic to:                                              │
│   Alias to CloudFront distribution                            │
│                                                                │
│ Choose distribution:                                           │
│   d1234abcdef8.cloudfront.net (your distribution)            │
│                                                                │
│ Click "Save"                                                   │
│                                                                │
│ WHAT CHANGED:                                                  │
│ Before: nexorapatent.in → EC2 IP directly                    │
│ After:  nexorapatent.in → CloudFront → EC2                   │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

### Step 10.4.2: Edit WWW Record

```
Same process for www.nexorapatent.in:

1. Select www A record
2. Click "Edit record"
3. Toggle Alias: ON
4. Route traffic to: Alias to CloudFront distribution
5. Select your distribution
6. Click "Save"
```

## 10.5 Test CloudFront

```
┌────────────────────────────────────────────────────────────────┐
│ TEST YOUR CLOUDFRONT SETUP                                     │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│ Wait 5-10 minutes for DNS to update                           │
│                                                                │
│ Then test:                                                     │
│                                                                │
│ 1. Main site:                                                  │
│    https://nexorapatent.in                                    │
│    ✓ Should show your website                                 │
│                                                                │
│ 2. WWW variant:                                                │
│    https://www.nexorapatent.in                                │
│    ✓ Should show your website                                 │
│                                                                │
│ 3. HTTP redirect:                                              │
│    http://nexorapatent.in                                     │
│    ✓ Should redirect to https://                              │
│                                                                │
│ 4. Direct routes (SPA test):                                  │
│    https://nexorapatent.in/contact                            │
│    https://nexorapatent.in/privacy                            │
│    ✓ Should work (not show 404)                               │
│                                                                │
│ 5. CloudFront domain directly:                                │
│    https://d1234abcdef8.cloudfront.net                       │
│    ✓ Should show your website                                 │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

---

# 11. PHASE 8: GITHUB ACTIONS CI/CD

## 11.1 What is CI/CD?

```
┌────────────────────────────────────────────────────────────────┐
│ CI/CD EXPLAINED                                                │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│ CI = Continuous Integration                                    │
│ CD = Continuous Deployment                                     │
│                                                                │
│ WITHOUT CI/CD (Manual Process):                                │
│ ┌─────────────────────────────────────────────────────────┐   │
│ │ 1. Make code changes                                    │   │
│ │ 2. Run npm run build locally                           │   │
│ │ 3. Open PowerShell                                      │   │
│ │ 4. SCP files to EC2                                     │   │
│ │ 5. SSH into EC2                                         │   │
│ │ 6. Check files uploaded correctly                       │   │
│ │ 7. Invalidate CloudFront cache                          │   │
│ │ 8. Test the website                                      │   │
│ │                                                          │   │
│ │ Time: 10-15 minutes per deployment                      │   │
│ │ Error-prone: Easy to forget steps                        │   │
│ └─────────────────────────────────────────────────────────┘   │
│                                                                │
│ WITH CI/CD (Automated):                                        │
│ ┌─────────────────────────────────────────────────────────┐   │
│ │ 1. Make code changes                                    │   │
│ │ 2. git push                                             │   │
│ │                                                          │   │
│ │ ...GitHub Actions does the rest automatically!          │   │
│ │                                                          │   │
│ │ Time: 2-3 minutes (automatic)                           │   │
│ │ Consistent: Same process every time                      │   │
│ └─────────────────────────────────────────────────────────┘   │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

## 11.2 Create IAM User for GitHub

### Step 11.2.1: Create IAM User

```
1. Go to AWS Console → IAM
2. Click "Users" in left sidebar
3. Click "Add users"

┌────────────────────────────────────────────────────────────────┐
│ CREATE IAM USER                                                │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│ Step 1: User details                                           │
│ User name: github-deploy-nexora                               │
│                                                                │
│ Click "Next"                                                   │
│                                                                │
│ Step 2: Set permissions                                        │
│ ● Attach policies directly                                    │
│                                                                │
│ Search and check these policies:                               │
│ ☑ CloudFrontFullAccess                                        │
│                                                                │
│ Click "Next"                                                   │
│                                                                │
│ Step 3: Review                                                 │
│ Click "Create user"                                            │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

### Step 11.2.2: Create Access Key

```
1. Click on the user you just created
2. Go to "Security credentials" tab
3. Scroll to "Access keys"
4. Click "Create access key"

┌────────────────────────────────────────────────────────────────┐
│ CREATE ACCESS KEY                                              │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│ Use case: Application running outside AWS                     │
│                                                                │
│ ☑ I understand the above recommendation...                    │
│                                                                │
│ Click "Next"                                                   │
│                                                                │
│ Description tag: GitHub Actions deployment                    │
│                                                                │
│ Click "Create access key"                                      │
│                                                                │
│ ⚠️⚠️⚠️ CRITICAL: SAVE THESE NOW! ⚠️⚠️⚠️                         │
│                                                                │
│ Access key ID:     AKIA________________                       │
│ Secret access key: ________________________________           │
│                                                                │
│ Click "Download .csv file" as backup                          │
│                                                                │
│ You CANNOT view the secret key again after closing!           │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

## 11.3 Add Secrets to GitHub Repository

```
1. Go to your GitHub repository
2. Click "Settings" tab
3. Left sidebar: "Secrets and variables" → "Actions"
4. Click "New repository secret"

┌────────────────────────────────────────────────────────────────┐
│ GITHUB SECRETS TO ADD                                          │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│ SECRET 1:                                                      │
│ Name:  AWS_ACCESS_KEY_ID                                      │
│ Value: AKIA________________ (your access key ID)              │
│                                                                │
│ SECRET 2:                                                      │
│ Name:  AWS_SECRET_ACCESS_KEY                                  │
│ Value: ________________________________ (your secret key)     │
│                                                                │
│ SECRET 3:                                                      │
│ Name:  EC2_HOST                                               │
│ Value: 52.66.100.200 (your Elastic IP)                        │
│                                                                │
│ SECRET 4:                                                      │
│ Name:  EC2_USERNAME                                           │
│ Value: ubuntu                                                  │
│                                                                │
│ SECRET 5:                                                      │
│ Name:  EC2_SSH_KEY                                            │
│ Value: (entire contents of your nexora-key.pem file)          │
│        Copy everything including:                              │
│        -----BEGIN RSA PRIVATE KEY-----                        │
│        ... key content ...                                    │
│        -----END RSA PRIVATE KEY-----                          │
│                                                                │
│ SECRET 6:                                                      │
│ Name:  CLOUDFRONT_DISTRIBUTION_ID                             │
│ Value: E1234ABCDEF (your distribution ID from CloudFront)    │
│                                                                │
│ FIND DISTRIBUTION ID:                                          │
│ CloudFront → Distributions → Copy ID from first column        │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

## 11.4 Create GitHub Actions Workflow

### Step 11.4.1: Create Workflow File

On your local machine, create this file:

**File:** `.github/workflows/deploy.yml`

```yaml
# GitHub Actions Workflow for Nexora Patent
# Automatically deploys to EC2 and invalidates CloudFront cache

name: Deploy to AWS

# When to run this workflow
on:
  push:
    branches: [main]  # Runs when you push to main branch
  workflow_dispatch:   # Allows manual trigger from GitHub UI

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest  # Use Ubuntu runner

    steps:
      # Step 1: Get the code
      - name: Checkout code
        uses: actions/checkout@v4
        # This downloads your repository code to the runner

      # Step 2: Set up Node.js
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'  # Cache npm dependencies for faster builds
        # Installs Node.js 20.x on the runner

      # Step 3: Install dependencies
      - name: Install dependencies
        run: npm ci
        # 'npm ci' is like 'npm install' but faster and stricter
        # Uses exact versions from package-lock.json

      # Step 4: Build the project
      - name: Build project
        run: npm run build
        # Creates the 'dist' folder with production files

      # Step 5: Deploy to EC2 via SCP
      - name: Deploy to EC2
        uses: appleboy/scp-action@v0.1.7
        with:
          host: ${{ secrets.EC2_HOST }}
          username: ${{ secrets.EC2_USERNAME }}
          key: ${{ secrets.EC2_SSH_KEY }}
          source: "dist/*"
          target: "/var/www/nexora"
          strip_components: 1
          rm: true  # Remove old files before copying
        # Securely copies files to your EC2 server

      # Step 6: Configure AWS credentials
      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: us-east-1
        # Sets up AWS CLI with your credentials

      # Step 7: Invalidate CloudFront cache
      - name: Invalidate CloudFront cache
        run: |
          aws cloudfront create-invalidation \
            --distribution-id ${{ secrets.CLOUDFRONT_DISTRIBUTION_ID }} \
            --paths "/*"
        # Clears CloudFront cache so users get new content
```

### Step 11.4.2: Create the Directory Structure

```powershell
# On your local machine
cd C:\Users\rohan\OneDrive\Desktop\Patent_ai

# Create .github/workflows directory
mkdir -p .github/workflows

# The file should be at:
# C:\Users\rohan\OneDrive\Desktop\Patent_ai\.github\workflows\deploy.yml
```

### Step 11.4.3: Push to GitHub

```powershell
# Add all files
git add .

# Commit
git commit -m "Add GitHub Actions deployment workflow"

# Push to main branch
git push origin main
```

## 11.5 Verify Deployment Works

```
┌────────────────────────────────────────────────────────────────┐
│ VERIFY GITHUB ACTIONS                                          │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│ 1. Go to your GitHub repository                               │
│ 2. Click "Actions" tab                                         │
│ 3. You should see "Deploy to AWS" workflow running            │
│                                                                │
│ Workflow steps:                                                │
│ ✓ Checkout code                                               │
│ ✓ Setup Node.js                                               │
│ ✓ Install dependencies                                        │
│ ✓ Build project                                               │
│ ✓ Deploy to EC2                                               │
│ ✓ Configure AWS credentials                                  │
│ ✓ Invalidate CloudFront cache                                │
│                                                                │
│ All green ✓ = Deployment successful!                          │
│                                                                │
│ COMMON ERRORS:                                                 │
│ ✗ Secret not found: Check secret names match exactly         │
│ ✗ SSH connection failed: Check EC2_SSH_KEY format            │
│ ✗ Permission denied: Check IAM user permissions              │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

## 11.6 Test the Full Flow

```
┌────────────────────────────────────────────────────────────────┐
│ TEST COMPLETE CI/CD PIPELINE                                   │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│ 1. Make a small change to your code:                          │
│    - Edit any text in a component                             │
│    - Add a comment                                            │
│                                                                │
│ 2. Commit and push:                                            │
│    git add .                                                  │
│    git commit -m "Test deployment"                            │
│    git push origin main                                       │
│                                                                │
│ 3. Watch GitHub Actions:                                       │
│    - Go to Actions tab                                        │
│    - Watch the workflow run                                   │
│                                                                │
│ 4. After completion (~2-3 minutes):                           │
│    - Visit https://nexorapatent.in                           │
│    - Verify your change appears                               │
│                                                                │
│ 🎉 CONGRATULATIONS!                                            │
│                                                                │
│ You now have a fully automated deployment pipeline!           │
│ Every push to main = automatic deployment                     │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

---

# 12. COMMON MISTAKES & WARNINGS (PART 2)

## 12.1 Route 53 Mistakes

```
┌────────────────────────────────────────────────────────────────┐
│ ❌ MISTAKE 13: Not Updating Registrar Nameservers              │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│ Created Route 53 hosted zone but domain still uses            │
│ registrar's nameservers                                        │
│                                                                │
│ SYMPTOM: DNS records in Route 53 have no effect              │
│                                                                │
│ FIX: Go to your domain registrar and update nameservers      │
│      to the Route 53 NS values                                │
│                                                                │
└────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────┐
│ ❌ MISTAKE 14: CNAME on Root Domain                            │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│ Trying to create CNAME for nexorapatent.in (root)            │
│                                                                │
│ ERROR: DNS standards don't allow CNAME on root domain        │
│                                                                │
│ FIX: Use Route 53 Alias record instead                       │
│      (Toggle "Alias" ON, select CloudFront)                  │
│                                                                │
└────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────┐
│ ❌ MISTAKE 15: TTL Too Long During Testing                     │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│ Set TTL to 86400 (24 hours) while testing                    │
│ Now changes take hours to propagate!                          │
│                                                                │
│ BEST PRACTICE:                                                 │
│ - During setup: TTL = 300 (5 minutes)                        │
│ - After stable: TTL = 3600-86400 (1-24 hours)                │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

## 12.2 SSL/HTTPS Mistakes

```
┌────────────────────────────────────────────────────────────────┐
│ ❌ MISTAKE 16: ACM Certificate in Wrong Region                 │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│ Created ACM certificate in ap-south-1 (Mumbai)               │
│ CloudFront can't see it!                                      │
│                                                                │
│ RULE: ACM certificates for CloudFront MUST be in us-east-1   │
│                                                                │
│ FIX: Create new certificate in us-east-1                     │
│                                                                │
└────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────┐
│ ❌ MISTAKE 17: Forgetting Wildcard in ACM                      │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│ Only added nexorapatent.in to certificate                    │
│ www.nexorapatent.in shows certificate error!                 │
│                                                                │
│ FIX: Add both:                                                │
│ - nexorapatent.in (root)                                     │
│ - *.nexorapatent.in (wildcard for all subdomains)            │
│                                                                │
└────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────┐
│ ❌ MISTAKE 18: Not Waiting for Certificate Validation          │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│ Trying to use certificate while still "Pending validation"   │
│                                                                │
│ FIX: Wait until status = "Issued"                            │
│      Usually 5-30 minutes after creating DNS validation      │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

## 12.3 CloudFront Mistakes

```
┌────────────────────────────────────────────────────────────────┐
│ ❌ MISTAKE 19: Not Setting Error Pages for SPA                 │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│ Direct URL access shows 404 or 403 error                      │
│ /contact, /privacy, /terms don't work                        │
│                                                                │
│ CAUSE: CloudFront doesn't know about React routing           │
│                                                                │
│ FIX: Create custom error responses:                          │
│ - 403 → /index.html, response 200                            │
│ - 404 → /index.html, response 200                            │
│                                                                │
└────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────┐
│ ❌ MISTAKE 20: Forgetting to Invalidate Cache                  │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│ Updated website but users see old version                     │
│                                                                │
│ CAUSE: CloudFront cached old files at edge locations         │
│                                                                │
│ FIX: Create invalidation:                                     │
│ aws cloudfront create-invalidation \                          │
│   --distribution-id YOUR_ID \                                 │
│   --paths "/*"                                                │
│                                                                │
│ OR: Our GitHub Action does this automatically!               │
│                                                                │
└────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────┐
│ ❌ MISTAKE 21: Wrong Alternate Domain Names                    │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│ Certificate and CloudFront domains don't match               │
│ Shows "The SSL certificate error" in browser                 │
│                                                                │
│ ENSURE THESE MATCH:                                            │
│ ACM Certificate: nexorapatent.in, *.nexorapatent.in          │
│ CloudFront CNAMEs: nexorapatent.in, www.nexorapatent.in      │
│ Route 53 Records: nexorapatent.in, www.nexorapatent.in       │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

## 12.4 GitHub Actions Mistakes

```
┌────────────────────────────────────────────────────────────────┐
│ ❌ MISTAKE 22: SSH Key Format Error                            │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│ Error: "Load key: invalid format"                             │
│                                                                │
│ CAUSE: Secret has extra characters or wrong line breaks       │
│                                                                │
│ FIX:                                                           │
│ - Copy ENTIRE .pem file content                               │
│ - Include -----BEGIN RSA PRIVATE KEY-----                    │
│ - Include -----END RSA PRIVATE KEY-----                      │
│ - No extra spaces or line breaks                              │
│                                                                │
└────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────┐
│ ❌ MISTAKE 23: IAM Permissions Too Restrictive                 │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│ Error: "Access Denied" when invalidating CloudFront           │
│                                                                │
│ FIX: Ensure IAM user has:                                     │
│ - CloudFrontFullAccess policy                                 │
│                                                                │
└────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────┐
│ ❌ MISTAKE 24: EC2 Security Group Blocking SCP                 │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│ GitHub Actions can't connect to EC2                           │
│                                                                │
│ CAUSE: Security group only allows YOUR IP for SSH            │
│ GitHub Actions uses different IPs!                            │
│                                                                │
│ FIX OPTIONS:                                                   │
│ 1. Add GitHub's IP ranges to security group                  │
│ 2. Use 0.0.0.0/0 for SSH (less secure)                       │
│ 3. Use SSM instead of SSH (advanced)                         │
│                                                                │
│ RECOMMENDED: Add GitHub IPs                                   │
│ Get IPs from: https://api.github.com/meta                    │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

---

# 13. MONITORING & MAINTENANCE

## 13.1 Essential Monitoring Commands

```bash
# SSH into EC2 first

# Check Nginx status
sudo systemctl status nginx

# Check Nginx error logs
sudo tail -f /var/log/nginx/nexora-error.log

# Check Nginx access logs
sudo tail -f /var/log/nginx/nexora-access.log

# Check disk space
df -h

# Check memory usage
free -m

# Check running processes
top

# Check if website files exist
ls -la /var/www/nexora/
```

## 13.2 Useful AWS Console Checks

```
┌────────────────────────────────────────────────────────────────┐
│ EC2 MONITORING                                                 │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│ EC2 → Instances → Select instance → Monitoring tab            │
│                                                                │
│ Check:                                                         │
│ - CPU Utilization (should be low for static site)            │
│ - Network In/Out                                               │
│ - Status Checks (should both pass)                            │
│                                                                │
└────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────┐
│ CLOUDFRONT MONITORING                                          │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│ CloudFront → Distributions → Your distribution → Monitoring   │
│                                                                │
│ Check:                                                         │
│ - Requests (total requests)                                   │
│ - Bytes Downloaded                                            │
│ - Error Rate (should be ~0%)                                  │
│ - Cache Hit Ratio (should be high after warming)             │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

## 13.3 Maintenance Tasks

```
┌────────────────────────────────────────────────────────────────┐
│ WEEKLY TASKS                                                   │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│ [ ] Check EC2 is running                                      │
│ [ ] Check website loads correctly                             │
│ [ ] Review any error logs                                     │
│                                                                │
└────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────┐
│ MONTHLY TASKS                                                  │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│ [ ] Update Ubuntu packages:                                   │
│     sudo apt update && sudo apt upgrade -y                   │
│                                                                │
│ [ ] Check AWS billing                                         │
│ [ ] Review security group rules                               │
│ [ ] Check SSL certificate expiry (Certbot auto-renews)       │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

---

# 14. COST SUMMARY

```
┌────────────────────────────────────────────────────────────────┐
│ MONTHLY COST BREAKDOWN                                         │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│ SERVICE               │ FIRST YEAR    │ AFTER FREE TIER       │
│ ──────────────────────┼───────────────┼──────────────────────  │
│ EC2 t2.micro          │ FREE*         │ ~$8.50/month          │
│ Elastic IP            │ FREE**        │ FREE**                │
│ Route 53 Hosted Zone  │ $0.50/month   │ $0.50/month           │
│ Route 53 Queries      │ ~$0.00        │ ~$0.00 (low traffic)  │
│ CloudFront            │ FREE***       │ ~$0.00 (low traffic)  │
│ ACM Certificate       │ FREE          │ FREE                   │
│ Data Transfer         │ ~$0.00        │ ~$0.00 (low traffic)  │
│ ──────────────────────┼───────────────┼──────────────────────  │
│ TOTAL                 │ ~$0.50/month  │ ~$9.00/month          │
│                                                                │
│ * EC2 Free Tier: 750 hours/month of t2.micro for 12 months   │
│ ** Elastic IP free when attached to running instance          │
│ *** CloudFront Free Tier: 1TB transfer/month for 12 months   │
│                                                                │
│ COST SAVING TIPS:                                              │
│ • Don't stop EC2 (or release Elastic IP first)               │
│ • Use Reserved Instances for 40%+ savings after free tier    │
│ • Monitor billing weekly in AWS Cost Explorer                 │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

---

# 15. QUICK REFERENCE COMMANDS

## 15.1 Local Development

```powershell
# Navigate to project
cd C:\Users\rohan\OneDrive\Desktop\Patent_ai

# Start development server
npm run dev

# Build for production
npm run build

# Deploy manually (if not using GitHub Actions)
scp -i C:\Users\rohan\.ssh\nexora-key.pem -r dist/* ubuntu@YOUR_IP:/var/www/nexora/
```

## 15.2 EC2 Server Commands

```bash
# SSH into server
ssh -i C:\Users\rohan\.ssh\nexora-key.pem ubuntu@YOUR_ELASTIC_IP

# Nginx commands
sudo systemctl status nginx
sudo systemctl restart nginx
sudo systemctl reload nginx
sudo nginx -t

# View logs
sudo tail -f /var/log/nginx/nexora-access.log
sudo tail -f /var/log/nginx/nexora-error.log

# Update server
sudo apt update && sudo apt upgrade -y

# Check disk space
df -h

# Check memory
free -m
```

## 15.3 AWS CLI Commands

```bash
# Configure AWS CLI (one-time)
aws configure

# Invalidate CloudFront cache
aws cloudfront create-invalidation \
  --distribution-id YOUR_DISTRIBUTION_ID \
  --paths "/*"

# List CloudFront distributions
aws cloudfront list-distributions

# Check Route 53 hosted zones
aws route53 list-hosted-zones
```

## 15.4 Git Commands

```powershell
# Check status
git status

# Add all changes
git add .

# Commit
git commit -m "Your message"

# Push (triggers deployment!)
git push origin main

# Pull latest
git pull origin main
```

---

# FINAL CHECKLIST

```
┌────────────────────────────────────────────────────────────────┐
│ DEPLOYMENT COMPLETE CHECKLIST                                  │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│ Infrastructure:                                                │
│ ☐ EC2 instance running (t2.micro)                             │
│ ☐ Elastic IP allocated and associated                         │
│ ☐ Security group configured (22, 80, 443)                     │
│ ☐ SSH key saved securely                                      │
│                                                                │
│ Server:                                                        │
│ ☐ Ubuntu updated                                               │
│ ☐ Nginx installed and running                                  │
│ ☐ Website files in /var/www/nexora/                           │
│ ☐ Nginx config for SPA (try_files)                            │
│                                                                │
│ DNS:                                                           │
│ ☐ Route 53 hosted zone created                                │
│ ☐ Nameservers updated at registrar                            │
│ ☐ A records pointing to CloudFront (Alias)                    │
│                                                                │
│ SSL:                                                           │
│ ☐ Certbot SSL on EC2 (optional)                               │
│ ☐ ACM certificate in us-east-1 (required for CloudFront)     │
│ ☐ Certificate status: Issued                                  │
│                                                                │
│ CDN:                                                           │
│ ☐ CloudFront distribution created                              │
│ ☐ Alternate domain names configured                           │
│ ☐ SSL certificate attached                                    │
│ ☐ Error pages for 403 and 404                                 │
│ ☐ Distribution status: Enabled                                │
│                                                                │
│ CI/CD:                                                         │
│ ☐ IAM user created with correct permissions                   │
│ ☐ GitHub secrets configured                                   │
│ ☐ deploy.yml workflow file created                            │
│ ☐ Test deployment successful                                  │
│                                                                │
│ Testing:                                                       │
│ ☐ https://nexorapatent.in loads                              │
│ ☐ https://www.nexorapatent.in loads                          │
│ ☐ http:// redirects to https://                               │
│ ☐ Direct routes work (/contact, /privacy, /terms)            │
│ ☐ Git push triggers deployment                                │
│                                                                │
│ 🎉 ALL DONE! Your site is live on AWS! 🎉                     │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

---

**File:** `AWS-HOSTING-GUIDE-PART2.md`
**Author:** Claude (AI Assistant)
**Domain:** nexorapatent.in
**Last Updated:** December 2024
