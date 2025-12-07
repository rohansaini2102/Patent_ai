# AWS Hosting Complete Guide for nexorapatent.in
## Part 1: EC2, SSH, Nginx & Server Setup

---

# TABLE OF CONTENTS

1. [Introduction & Prerequisites](#1-introduction--prerequisites)
2. [Understanding the Architecture](#2-understanding-the-architecture)
3. [Phase 1: Disconnect GitHub Pages](#3-phase-1-disconnect-github-pages)
4. [Phase 2: EC2 Instance Setup](#4-phase-2-ec2-instance-setup)
5. [Phase 3: SSH Connection](#5-phase-3-ssh-connection)
6. [Phase 4: Nginx Installation & Configuration](#6-phase-4-nginx-installation--configuration)
7. [Common Mistakes & Warnings](#7-common-mistakes--warnings-part-1)

---

# 1. INTRODUCTION & PREREQUISITES

## 1.1 What We Are Building

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              INTERNET                                        │
│                         (Users worldwide)                                    │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                         ROUTE 53 (DNS Service)                               │
│                                                                              │
│  WHAT: Amazon's Domain Name System service                                   │
│  WHY:  Translates nexorapatent.in → IP address                              │
│  HOW:  User types nexorapatent.in → Route 53 returns CloudFront address    │
│                                                                              │
│  Records:                                                                    │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ nexorapatent.in      → A Record    → CloudFront Distribution        │   │
│  │ www.nexorapatent.in  → A Record    → CloudFront Distribution        │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                      CLOUDFRONT (CDN - Content Delivery Network)             │
│                                                                              │
│  WHAT: Global network of servers that cache your content                     │
│  WHY:  - Faster load times (content served from nearest location)           │
│        - DDoS protection                                                     │
│        - SSL/HTTPS termination                                               │
│        - Reduces load on your EC2 server                                     │
│  HOW:  400+ edge locations worldwide cache your static files                │
│                                                                              │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐          │
│  │ Mumbai   │ │ Tokyo    │ │ London   │ │ New York │ │ Sydney   │          │
│  │ Edge     │ │ Edge     │ │ Edge     │ │ Edge     │ │ Edge     │          │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘ └──────────┘          │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                         EC2 INSTANCE (Virtual Machine)                       │
│                         Instance Type: t2.micro                              │
│                         OS: Ubuntu 22.04 LTS                                 │
│                         IP: Elastic IP (Static)                              │
│                                                                              │
│  WHAT: A virtual computer running in AWS data center                         │
│  WHY:  - Full control over server configuration                             │
│        - Can install any software (Nginx, Node.js, etc.)                    │
│        - Learning server administration                                      │
│  HOW:  You SSH into it like a remote computer                               │
│                                                                              │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │                           NGINX                                        │  │
│  │                    (Reverse Proxy Server)                              │  │
│  │                                                                        │  │
│  │  WHAT: High-performance web server & reverse proxy                     │  │
│  │  WHY:  - Serves static files efficiently                              │  │
│  │        - Handles SPA routing (try_files directive)                    │  │
│  │        - Gzip compression (smaller file sizes)                        │  │
│  │        - Security headers                                              │  │
│  │        - SSL termination                                               │  │
│  │  HOW:  Listens on port 80/443, serves files from /var/www/nexora      │  │
│  │                                                                        │  │
│  │  Configuration: /etc/nginx/sites-available/nexora                     │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                                    │                                         │
│                                    ▼                                         │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │                      /var/www/nexora/                                  │  │
│  │                    (Your Application Files)                            │  │
│  │                                                                        │  │
│  │   index.html ─────── Main React SPA (all components bundled)          │  │
│  │   robots.txt ─────── Instructions for search engine crawlers          │  │
│  │   sitemap.xml ────── List of all pages for SEO                        │  │
│  │   assets/ ────────── JS, CSS, images (if any)                         │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘
```

## 1.2 Prerequisites Checklist

| Requirement | Status | Where to Get |
|-------------|--------|--------------|
| AWS Account | Required | https://aws.amazon.com |
| Domain: nexorapatent.in | You have it | Currently on GitHub Pages |
| GitHub Repository | You have it | Your existing repo |
| Local Project | You have it | C:\Users\rohan\OneDrive\Desktop\Patent_ai |
| Node.js | Required | https://nodejs.org |
| Git | Required | https://git-scm.com |
| SSH Client | Built into Windows 10/11 | PowerShell or CMD |

## 1.3 Glossary of Terms

| Term | Full Form | What It Is | Why It Matters |
|------|-----------|------------|----------------|
| **EC2** | Elastic Compute Cloud | Virtual server in AWS | Your website runs here |
| **SSH** | Secure Shell | Encrypted remote access protocol | How you connect to EC2 |
| **Nginx** | Engine-X | Web server & reverse proxy | Serves your files to visitors |
| **DNS** | Domain Name System | Internet's phone book | Converts domain to IP |
| **CDN** | Content Delivery Network | Distributed server network | Makes site faster globally |
| **SSL/TLS** | Secure Sockets Layer | Encryption protocol | HTTPS (secure connection) |
| **ACM** | AWS Certificate Manager | Free SSL certificates | Enables HTTPS |
| **Elastic IP** | Static Public IP | Permanent IP address | Doesn't change on restart |
| **Security Group** | Virtual Firewall | Controls traffic in/out | Protects your server |
| **AMI** | Amazon Machine Image | Server template | Pre-configured OS |
| **VPC** | Virtual Private Cloud | Isolated network | Your private AWS network |

---

# 2. UNDERSTANDING THE ARCHITECTURE

## 2.1 Why Each Component?

### EC2 (Virtual Machine)
```
┌────────────────────────────────────────────────────────────────┐
│ WITHOUT EC2 (Static Hosting Only - like GitHub Pages)          │
├────────────────────────────────────────────────────────────────┤
│ ✓ Simple setup                                                 │
│ ✓ Free                                                         │
│ ✗ No server-side control                                       │
│ ✗ Can't install custom software                                │
│ ✗ Limited configuration                                        │
│ ✗ No learning about server management                          │
└────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────┐
│ WITH EC2 (What We're Doing)                                    │
├────────────────────────────────────────────────────────────────┤
│ ✓ Full server control                                          │
│ ✓ Install anything (Nginx, databases, Node.js, Python)         │
│ ✓ Custom security rules                                        │
│ ✓ Scale vertically (bigger instance) or horizontally (more)   │
│ ✓ Learn real-world DevOps skills                               │
│ ✓ Foundation for more complex architectures                    │
│ ✗ More complex setup                                           │
│ ✗ You manage security updates                                  │
└────────────────────────────────────────────────────────────────┘
```

### Nginx (Reverse Proxy)
```
┌────────────────────────────────────────────────────────────────┐
│ WHAT IS A REVERSE PROXY?                                       │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│   Regular Web Server:                                          │
│   User Request → Web Server → Response                         │
│                                                                │
│   Reverse Proxy:                                               │
│   User Request → Reverse Proxy → Backend Server → Response     │
│                       │                                        │
│                       └── Can do:                              │
│                           • Load balancing                     │
│                           • Caching                            │
│                           • SSL termination                    │
│                           • Compression                        │
│                           • Security filtering                 │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

### Why Nginx for SPA (Single Page Application)?
```
┌────────────────────────────────────────────────────────────────┐
│ THE SPA ROUTING PROBLEM                                        │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│ Your React app has routes like:                                │
│   /                    → Home page                             │
│   /contact             → Contact page                          │
│   /privacy             → Privacy page                          │
│   /terms               → Terms page                            │
│                                                                │
│ BUT these aren't real files! They're handled by JavaScript.    │
│                                                                │
│ Without proper config:                                         │
│   User visits nexorapatent.in/contact                         │
│   Server looks for /var/www/nexora/contact/index.html          │
│   File doesn't exist → 404 ERROR!                              │
│                                                                │
│ With Nginx try_files:                                          │
│   User visits nexorapatent.in/contact                         │
│   Server looks for /contact file → Not found                   │
│   Falls back to index.html → React handles routing → WORKS!   │
│                                                                │
└────────────────────────────────────────────────────────────────┘

NGINX CONFIG THAT FIXES THIS:
┌────────────────────────────────────────────────────────────────┐
│ location / {                                                   │
│     try_files $uri $uri/ /index.html;                         │
│ }                                                              │
│                                                                │
│ Translation:                                                   │
│ 1. Try to find the exact file ($uri)                          │
│ 2. Try to find a directory with that name ($uri/)             │
│ 3. If both fail, serve index.html (React takes over)          │
└────────────────────────────────────────────────────────────────┘
```

### CloudFront (CDN)
```
┌────────────────────────────────────────────────────────────────┐
│ WITHOUT CDN                                                    │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│   Your EC2 is in Mumbai (ap-south-1)                          │
│                                                                │
│   User in Mumbai:     50ms latency  ✓ Fast                    │
│   User in New York:   250ms latency ✗ Slow                    │
│   User in London:     200ms latency ✗ Slow                    │
│   User in Sydney:     300ms latency ✗ Very Slow               │
│                                                                │
│   Every request hits your EC2 server                           │
│   High load = slow for everyone                                │
│                                                                │
└────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────┐
│ WITH CLOUDFRONT CDN                                            │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│   Your content is cached at 400+ edge locations                │
│                                                                │
│   User in Mumbai:     10ms  ✓ Served from Mumbai edge         │
│   User in New York:   15ms  ✓ Served from New York edge       │
│   User in London:     12ms  ✓ Served from London edge         │
│   User in Sydney:     14ms  ✓ Served from Sydney edge         │
│                                                                │
│   EC2 only hit when cache expires or content changes           │
│   Built-in DDoS protection                                     │
│   Free SSL certificate via ACM                                 │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

---

# 3. PHASE 1: DISCONNECT GITHUB PAGES

## 3.1 Why Disconnect First?

```
⚠️ CRITICAL: You cannot have two services pointing to the same domain!

Current Setup:
nexorapatent.in → GitHub Pages servers

What We Want:
nexorapatent.in → AWS CloudFront → EC2

If you don't disconnect first:
- DNS conflicts
- SSL certificate issues
- Unpredictable behavior (sometimes GitHub, sometimes AWS)
```

## 3.2 Step-by-Step: Remove GitHub Pages

### Step 3.2.1: Go to GitHub Repository Settings

```
1. Open browser → github.com
2. Go to your repository
3. Click "Settings" tab (top menu, near "Insights")
4. Left sidebar → Click "Pages"
```

### Step 3.2.2: Remove Custom Domain

```
┌────────────────────────────────────────────────────────────────┐
│ GitHub Pages Settings                                          │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│ Custom domain                                                  │
│ ┌────────────────────────────────────────────────────────────┐│
│ │ nexorapatent.in                              [Remove] [Save]││
│ └────────────────────────────────────────────────────────────┘│
│                                                                │
│ 1. Delete the text "nexorapatent.in"                          │
│ 2. Click "Save"                                                │
│ 3. You'll see: "Custom domain removed"                        │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

### Step 3.2.3: Remove DNS Records from Domain Registrar

```
Go to where you bought nexorapatent.in (GoDaddy, Namecheap, Google Domains, etc.)

FIND AND DELETE THESE RECORDS:
┌─────────────────────────────────────────────────────────────────┐
│ Type   │ Name              │ Value                    │ Action │
├─────────────────────────────────────────────────────────────────┤
│ CNAME  │ www               │ username.github.io      │ DELETE │
│ A      │ @                 │ 185.199.108.153         │ DELETE │
│ A      │ @                 │ 185.199.109.153         │ DELETE │
│ A      │ @                 │ 185.199.110.153         │ DELETE │
│ A      │ @                 │ 185.199.111.153         │ DELETE │
└─────────────────────────────────────────────────────────────────┘

WHY: These IPs belong to GitHub. We need to point to AWS instead.
```

### Step 3.2.4: Verify Disconnection

```bash
# Wait 5-10 minutes, then test:
# Open Command Prompt or PowerShell

nslookup nexorapatent.in

# Expected result after DNS propagates:
# "Non-existent domain" or no A records
# This means it's ready for AWS configuration
```

---

# 4. PHASE 2: EC2 INSTANCE SETUP

## 4.1 Understanding EC2 Concepts

### What is an EC2 Instance?

```
┌────────────────────────────────────────────────────────────────┐
│ PHYSICAL SERVER (Traditional)     │  EC2 INSTANCE (Cloud)     │
├───────────────────────────────────┼────────────────────────────┤
│ Buy hardware: $2000+              │ Rent by hour: $0.01/hour  │
│ Wait weeks for delivery           │ Ready in 60 seconds        │
│ Fixed specs forever               │ Change specs anytime       │
│ You maintain hardware             │ AWS maintains hardware     │
│ Physical location matters         │ Choose any AWS region      │
│ If it breaks, you fix it          │ AWS auto-replaces failed  │
└───────────────────────────────────┴────────────────────────────┘
```

### Instance Types Explained

```
┌────────────────────────────────────────────────────────────────┐
│ INSTANCE TYPE: t2.micro                                        │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│ t  = "Burstable" family (good for variable workloads)         │
│ 2  = Generation 2                                              │
│ micro = Size (smallest)                                        │
│                                                                │
│ Specs:                                                         │
│ ┌──────────────────────────────────────────────────────────┐  │
│ │ vCPUs:      1 (virtual CPU core)                         │  │
│ │ Memory:     1 GB RAM                                      │  │
│ │ Storage:    EBS only (we'll add 8GB)                     │  │
│ │ Network:    Low to Moderate                               │  │
│ │ Cost:       FREE TIER (750 hours/month for 12 months)    │  │
│ └──────────────────────────────────────────────────────────┘  │
│                                                                │
│ PERFECT FOR:                                                   │
│ ✓ Learning and development                                    │
│ ✓ Low-traffic websites                                        │
│ ✓ Small applications                                          │
│ ✗ NOT for: High-traffic production sites                      │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

### Regions and Availability Zones

```
┌────────────────────────────────────────────────────────────────┐
│ AWS REGIONS                                                    │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│ Region = Geographic location with multiple data centers        │
│                                                                │
│ RECOMMENDED FOR INDIA: ap-south-1 (Mumbai)                    │
│                                                                │
│ WHY MUMBAI?                                                    │
│ ✓ Closest to your users in India                              │
│ ✓ Lowest latency for Indian visitors                          │
│ ✓ Compliance with data residency (if needed)                  │
│ ✓ Same pricing as other regions                               │
│                                                                │
│ Each region has multiple Availability Zones (AZs):            │
│ ap-south-1a, ap-south-1b, ap-south-1c                        │
│                                                                │
│ AZ = Separate data center (for high availability)             │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

## 4.2 Step-by-Step: Launch EC2 Instance

### Step 4.2.1: Access AWS Console

```
1. Go to: https://console.aws.amazon.com
2. Sign in with your AWS account
3. TOP RIGHT CORNER: Check region is "Asia Pacific (Mumbai) ap-south-1"
   - If not, click the region name and select "Asia Pacific (Mumbai)"

┌────────────────────────────────────────────────────────────────┐
│ ⚠️ WARNING: REGION MATTERS!                                    │
│                                                                │
│ Resources are region-specific. If you create EC2 in Mumbai    │
│ and later look in Singapore, you won't see it!                │
│                                                                │
│ ALWAYS verify you're in: ap-south-1 (Mumbai)                  │
└────────────────────────────────────────────────────────────────┘
```

### Step 4.2.2: Navigate to EC2

```
1. In the search bar at top, type: EC2
2. Click "EC2" from the dropdown
3. You'll see the EC2 Dashboard
4. Click the orange button: "Launch instance"
```

### Step 4.2.3: Configure Instance - Name and Tags

```
┌────────────────────────────────────────────────────────────────┐
│ Name and tags                                                  │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│ Name: nexora-patent-server                                     │
│                                                                │
│ WHY THIS NAME?                                                 │
│ - Descriptive (you'll know what this server is for)           │
│ - Easy to find in AWS console                                  │
│ - Professional naming convention                               │
│                                                                │
│ OPTIONAL: Add more tags                                        │
│ Key: Environment    Value: Production                          │
│ Key: Project        Value: NexoraPatent                        │
│                                                                │
│ WHY TAGS?                                                      │
│ - Organize resources                                           │
│ - Cost allocation (track spending per project)                │
│ - Automation (scripts can find resources by tag)              │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

### Step 4.2.4: Choose AMI (Operating System)

```
┌────────────────────────────────────────────────────────────────┐
│ Application and OS Images (Amazon Machine Image)               │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│ Quick Start → Ubuntu                                           │
│                                                                │
│ SELECT: Ubuntu Server 22.04 LTS (HVM), SSD Volume Type        │
│         64-bit (x86)                                           │
│         Free tier eligible                                     │
│                                                                │
│ ┌──────────────────────────────────────────────────────────┐  │
│ │ WHY UBUNTU 22.04 LTS?                                    │  │
│ │                                                          │  │
│ │ Ubuntu = Most popular Linux distribution                 │  │
│ │ 22.04  = Version released April 2022                    │  │
│ │ LTS    = Long Term Support (updates until 2027)         │  │
│ │                                                          │  │
│ │ BENEFITS:                                                │  │
│ │ ✓ Huge community (easy to find help)                    │  │
│ │ ✓ Excellent documentation                               │  │
│ │ ✓ Regular security updates                              │  │
│ │ ✓ Nginx works perfectly                                 │  │
│ │ ✓ Most tutorials assume Ubuntu                          │  │
│ └──────────────────────────────────────────────────────────┘  │
│                                                                │
│ ⚠️ DO NOT SELECT:                                              │
│ - Amazon Linux (different commands)                            │
│ - Windows Server (requires license, different setup)           │
│ - Ubuntu 20.04 (older, less features)                         │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

### Step 4.2.5: Choose Instance Type

```
┌────────────────────────────────────────────────────────────────┐
│ Instance type                                                  │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│ SELECT: t2.micro                                               │
│         Free tier eligible                                     │
│                                                                │
│ You'll see a table like:                                       │
│ ┌────────────┬────────┬────────┬─────────────────────────────┐│
│ │ Type       │ vCPUs  │ Memory │ Free Tier                   ││
│ ├────────────┼────────┼────────┼─────────────────────────────┤│
│ │ t2.micro  │ 1      │ 1 GiB  │ ✓ Free tier eligible       ││
│ │ t2.small   │ 1      │ 2 GiB  │ ✗ ~$17/month              ││
│ │ t2.medium  │ 2      │ 4 GiB  │ ✗ ~$34/month              ││
│ └────────────┴────────┴────────┴─────────────────────────────┘│
│                                                                │
│ ⚠️ COMMON MISTAKE: Selecting wrong instance type               │
│    - t2.micro = FREE                                           │
│    - t2.small = $17/month                                      │
│    Double-check before launching!                              │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

### Step 4.2.6: Create Key Pair (CRITICAL!)

```
┌────────────────────────────────────────────────────────────────┐
│ Key pair (login)                                               │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│ Click: "Create new key pair"                                   │
│                                                                │
│ A popup appears:                                               │
│ ┌──────────────────────────────────────────────────────────┐  │
│ │ Key pair name: nexora-key                                │  │
│ │                                                          │  │
│ │ Key pair type: ● RSA (RECOMMENDED)                       │  │
│ │                ○ ED25519                                  │  │
│ │                                                          │  │
│ │ Private key file format:                                 │  │
│ │                ● .pem (For OpenSSH - Windows/Mac/Linux) │  │
│ │                ○ .ppk (For PuTTY on Windows)             │  │
│ │                                                          │  │
│ │                              [Create key pair]           │  │
│ └──────────────────────────────────────────────────────────┘  │
│                                                                │
│ ⚠️⚠️⚠️ EXTREMELY IMPORTANT ⚠️⚠️⚠️                                │
│                                                                │
│ 1. File downloads automatically: nexora-key.pem                │
│ 2. SAVE THIS FILE SECURELY!                                   │
│ 3. You CANNOT download it again - ever!                       │
│ 4. If you lose it, you lose access to your server!            │
│                                                                │
│ RECOMMENDED SAVE LOCATION:                                     │
│ C:\Users\rohan\.ssh\nexora-key.pem                            │
│                                                                │
│ CREATE THE .ssh FOLDER IF IT DOESN'T EXIST:                   │
│ mkdir C:\Users\rohan\.ssh                                     │
│ move C:\Users\rohan\Downloads\nexora-key.pem C:\Users\rohan\.ssh\ │
│                                                                │
└────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────┐
│ 🔐 WHAT IS A KEY PAIR?                                         │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│ It's like a high-security lock system:                         │
│                                                                │
│ PUBLIC KEY (stored on EC2)     PRIVATE KEY (your .pem file)   │
│         🔒                              🔑                     │
│         │                               │                      │
│         │   Must match to gain access   │                      │
│         └───────────────────────────────┘                      │
│                                                                │
│ - Anyone can see the public key (it's on the server)          │
│ - Only YOU have the private key (the .pem file)               │
│ - Without matching private key, nobody can access server      │
│ - NEVER share your .pem file with anyone!                     │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

### Step 4.2.7: Network Settings (Security Group)

```
┌────────────────────────────────────────────────────────────────┐
│ Network settings                                               │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│ Click "Edit" to expand settings                                │
│                                                                │
│ VPC: (leave default - vpc-xxxxxxxx)                           │
│ Subnet: No preference                                          │
│ Auto-assign public IP: ENABLE ✓                               │
│                                                                │
│ ⚠️ CRITICAL: Auto-assign public IP must be ENABLED!            │
│    Without this, you can't connect to your server!            │
│                                                                │
│ Firewall (security groups):                                    │
│ ● Create security group                                        │
│                                                                │
│ Security group name: nexora-sg                                 │
│ Description: Security group for Nexora Patent web server       │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

### Step 4.2.8: Configure Security Group Rules

```
┌────────────────────────────────────────────────────────────────┐
│ Inbound Security Group Rules                                   │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│ RULE 1: SSH Access                                             │
│ ┌──────────────────────────────────────────────────────────┐  │
│ │ Type:        SSH                                         │  │
│ │ Protocol:    TCP                                         │  │
│ │ Port range:  22                                          │  │
│ │ Source type: My IP                                       │  │
│ │ Source:      (auto-fills your IP, e.g., 203.0.113.42/32)│  │
│ │ Description: SSH access from my IP                       │  │
│ └──────────────────────────────────────────────────────────┘  │
│                                                                │
│ WHY "My IP"?                                                   │
│ - Only YOUR computer can SSH into the server                  │
│ - Hackers can't try to brute-force your SSH                   │
│ - If your IP changes, you'll need to update this rule         │
│                                                                │
│ ⚠️ WARNING: If you select "Anywhere" for SSH:                  │
│    Anyone in the world can try to hack your server!           │
│    Thousands of bots constantly scan for open SSH ports.      │
│                                                                │
│ Click: "Add security group rule"                               │
│                                                                │
│ RULE 2: HTTP Traffic                                           │
│ ┌──────────────────────────────────────────────────────────┐  │
│ │ Type:        HTTP                                        │  │
│ │ Protocol:    TCP                                         │  │
│ │ Port range:  80                                          │  │
│ │ Source type: Anywhere                                    │  │
│ │ Source:      0.0.0.0/0                                   │  │
│ │ Description: HTTP web traffic                            │  │
│ └──────────────────────────────────────────────────────────┘  │
│                                                                │
│ WHY "Anywhere" for HTTP?                                       │
│ - Anyone should be able to visit your website                 │
│ - 0.0.0.0/0 means "all IP addresses"                         │
│                                                                │
│ Click: "Add security group rule"                               │
│                                                                │
│ RULE 3: HTTPS Traffic                                          │
│ ┌──────────────────────────────────────────────────────────┐  │
│ │ Type:        HTTPS                                       │  │
│ │ Protocol:    TCP                                         │  │
│ │ Port range:  443                                         │  │
│ │ Source type: Anywhere                                    │  │
│ │ Source:      0.0.0.0/0                                   │  │
│ │ Description: HTTPS secure web traffic                    │  │
│ └──────────────────────────────────────────────────────────┘  │
│                                                                │
└────────────────────────────────────────────────────────────────┘

FINAL SECURITY GROUP SUMMARY:
┌────────┬──────────┬──────┬─────────────────┬────────────────────┐
│ Type   │ Protocol │ Port │ Source          │ Purpose            │
├────────┼──────────┼──────┼─────────────────┼────────────────────┤
│ SSH    │ TCP      │ 22   │ Your IP only    │ Remote access      │
│ HTTP   │ TCP      │ 80   │ 0.0.0.0/0       │ Web traffic        │
│ HTTPS  │ TCP      │ 443  │ 0.0.0.0/0       │ Secure web traffic │
└────────┴──────────┴──────┴─────────────────┴────────────────────┘
```

### Step 4.2.9: Configure Storage

```
┌────────────────────────────────────────────────────────────────┐
│ Configure storage                                              │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│ 1x  [ 8 ] GiB  gp3  Root volume                               │
│                                                                │
│ Keep defaults:                                                 │
│ - Size: 8 GiB (plenty for our website)                        │
│ - Volume type: gp3 (latest generation, good performance)      │
│ - Delete on termination: ✓ Yes (clean up when instance gone) │
│                                                                │
│ FREE TIER: Up to 30 GB of storage included                    │
│                                                                │
│ WHY 8 GB IS ENOUGH:                                            │
│ - Ubuntu OS: ~2 GB                                             │
│ - Nginx: ~5 MB                                                 │
│ - Your website files: ~50 MB                                   │
│ - Room for logs and updates: ~5 GB                            │
│ - Total needed: ~3 GB (8 GB gives plenty of buffer)           │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

### Step 4.2.10: Review and Launch

```
┌────────────────────────────────────────────────────────────────┐
│ Summary (Right side panel)                                     │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│ VERIFY THESE SETTINGS:                                         │
│                                                                │
│ ✓ Instance type: t2.micro (Free tier eligible)                │
│ ✓ AMI: Ubuntu Server 22.04 LTS                                │
│ ✓ Key pair: nexora-key                                        │
│ ✓ Security group: nexora-sg (SSH + HTTP + HTTPS)              │
│ ✓ Storage: 8 GiB gp3                                          │
│                                                                │
│ Number of instances: 1                                         │
│                                                                │
│ FREE TIER ELIGIBLE MESSAGE SHOULD APPEAR                      │
│                                                                │
│                    [Launch instance]                           │
│                                                                │
└────────────────────────────────────────────────────────────────┘

CLICK: "Launch instance"

SUCCESS MESSAGE:
┌────────────────────────────────────────────────────────────────┐
│ ✓ Successfully initiated launch of instance                    │
│                                                                │
│ Instance ID: i-0abc123def456789                                │
│                                                                │
│ Click "View all instances" to see your server                  │
└────────────────────────────────────────────────────────────────┘
```

## 4.3 Allocate Elastic IP (Static IP Address)

### Why Elastic IP?

```
┌────────────────────────────────────────────────────────────────┐
│ THE PROBLEM: Dynamic IP Addresses                              │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│ Without Elastic IP:                                            │
│                                                                │
│ Day 1: Your EC2 IP = 13.232.123.45                            │
│        DNS points to: 13.232.123.45 ✓ Works!                  │
│                                                                │
│ Day 2: You stop/start EC2 (maintenance, resize, etc.)         │
│        New IP assigned = 13.232.67.89                         │
│        DNS still points to: 13.232.123.45 ✗ BROKEN!           │
│                                                                │
│ With Elastic IP:                                               │
│                                                                │
│ Day 1: Elastic IP = 52.66.100.200 (NEVER CHANGES)             │
│        DNS points to: 52.66.100.200 ✓ Works!                  │
│                                                                │
│ Day 2: You stop/start EC2                                      │
│        Elastic IP still = 52.66.100.200                        │
│        DNS still points to: 52.66.100.200 ✓ STILL WORKS!      │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

### Step 4.3.1: Allocate Elastic IP

```
1. In EC2 Dashboard, left sidebar, scroll down
2. Under "Network & Security", click "Elastic IPs"
3. Click "Allocate Elastic IP address"
4. Keep defaults:
   - Network Border Group: ap-south-1 (Mumbai)
5. Click "Allocate"

SUCCESS: You'll see a new IP address, e.g., 52.66.xxx.xxx
```

### Step 4.3.2: Associate Elastic IP with EC2

```
┌────────────────────────────────────────────────────────────────┐
│ Associate Elastic IP address                                   │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│ 1. Select your new Elastic IP (checkbox)                       │
│ 2. Actions → Associate Elastic IP address                      │
│                                                                │
│ In the popup:                                                  │
│ ┌──────────────────────────────────────────────────────────┐  │
│ │ Resource type: ● Instance                                │  │
│ │                                                          │  │
│ │ Instance: [dropdown]                                     │  │
│ │           Select: i-xxxxx (nexora-patent-server)        │  │
│ │                                                          │  │
│ │ Private IP address: (leave default)                      │  │
│ │                                                          │  │
│ │ ☑ Allow this Elastic IP to be reassociated              │  │
│ │                                                          │  │
│ │                              [Associate]                 │  │
│ └──────────────────────────────────────────────────────────┘  │
│                                                                │
│ Click "Associate"                                              │
│                                                                │
│ ✓ SUCCESS: Elastic IP is now attached to your EC2            │
│                                                                │
└────────────────────────────────────────────────────────────────┘

⚠️ IMPORTANT: Write down your Elastic IP!

MY ELASTIC IP: ___.___.___.___

You'll need this for:
- SSH connection
- DNS configuration
- CloudFront origin
```

### Elastic IP Cost Warning

```
┌────────────────────────────────────────────────────────────────┐
│ ⚠️ ELASTIC IP COST WARNING                                     │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│ Elastic IP is FREE only when:                                  │
│ ✓ Associated with a RUNNING EC2 instance                      │
│                                                                │
│ You get CHARGED when:                                          │
│ ✗ Elastic IP is NOT associated with any instance              │
│ ✗ Associated instance is STOPPED                               │
│                                                                │
│ Cost: ~$0.005/hour (~$3.60/month) for unused Elastic IP       │
│                                                                │
│ BEST PRACTICE:                                                 │
│ - Keep your EC2 running, or                                    │
│ - Release (delete) Elastic IP if not using                    │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

---

# 5. PHASE 3: SSH CONNECTION

## 5.1 What is SSH?

```
┌────────────────────────────────────────────────────────────────┐
│ SSH (Secure Shell) Explained                                   │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│ SSH is like a secure, encrypted phone line to your server.    │
│                                                                │
│ Your Computer                        EC2 Server               │
│ ┌───────────┐                       ┌───────────┐             │
│ │           │  Encrypted Tunnel     │           │             │
│ │  You      │ ===================== │  Ubuntu   │             │
│ │  (SSH     │  Port 22              │  Server   │             │
│ │  Client)  │                       │           │             │
│ └───────────┘                       └───────────┘             │
│      │                                    │                    │
│      │ Your commands                     │                    │
│      │ (ls, cd, nano, etc.)             │                    │
│      └──────────────────────────────────►│                    │
│                                          │ Server response    │
│      ◄──────────────────────────────────┘                    │
│                                                                │
│ Everything is encrypted - no one can see what you're doing    │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

## 5.2 Windows SSH Setup

### Step 5.2.1: Open PowerShell

```
Method 1: Search
- Press Windows key
- Type: PowerShell
- Click "Windows PowerShell"

Method 2: Right-click Start
- Right-click Windows Start button
- Click "Windows PowerShell" or "Terminal"
```

### Step 5.2.2: Navigate to Key Location

```powershell
# Check if .ssh folder exists
cd C:\Users\rohan

# If .ssh doesn't exist, create it
mkdir .ssh

# Move your key file to .ssh folder
move C:\Users\rohan\Downloads\nexora-key.pem C:\Users\rohan\.ssh\

# Navigate to .ssh folder
cd .ssh

# Verify key file is there
dir

# You should see: nexora-key.pem
```

### Step 5.2.3: Set Key File Permissions (CRITICAL!)

```powershell
# This command restricts access to only your user account
icacls .\nexora-key.pem /inheritance:r /grant:r "$($env:USERNAME):(R)"
```

```
┌────────────────────────────────────────────────────────────────┐
│ WHY SET PERMISSIONS?                                           │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│ SSH requires that your private key file:                       │
│ - Is readable only by you                                      │
│ - Is NOT accessible by other users on your computer           │
│                                                                │
│ If permissions are too open, SSH will refuse to connect:       │
│                                                                │
│ ERROR MESSAGE:                                                 │
│ @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@    │
│ @         WARNING: UNPROTECTED PRIVATE KEY FILE!          @    │
│ @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@    │
│ Permissions for 'nexora-key.pem' are too open.                │
│ It is required that your private key files are NOT             │
│ accessible by others.                                          │
│                                                                │
│ The icacls command fixes this on Windows.                     │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

### Step 5.2.4: Connect to EC2

```powershell
# Replace YOUR_ELASTIC_IP with your actual Elastic IP
ssh -i C:\Users\rohan\.ssh\nexora-key.pem ubuntu@YOUR_ELASTIC_IP

# Example with real IP:
ssh -i C:\Users\rohan\.ssh\nexora-key.pem ubuntu@52.66.100.200
```

### Step 5.2.5: First Connection - Fingerprint Verification

```
┌────────────────────────────────────────────────────────────────┐
│ FIRST CONNECTION MESSAGE                                       │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│ The authenticity of host '52.66.100.200' can't be established.│
│ ECDSA key fingerprint is SHA256:xxxxxxxxxxxxxxxxxxxxxxxxxxx.  │
│ Are you sure you want to continue connecting (yes/no/[finger  │
│ print])?                                                       │
│                                                                │
│ TYPE: yes                                                      │
│ PRESS: Enter                                                   │
│                                                                │
│ WHAT THIS MEANS:                                               │
│ Your computer hasn't connected to this server before.          │
│ It's asking you to verify this is the right server.           │
│ On first connection, type "yes" to accept.                    │
│ Your computer will remember this server's fingerprint.        │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

### Step 5.2.6: Successful Connection

```
┌────────────────────────────────────────────────────────────────┐
│ SUCCESS! You should see:                                       │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│ Welcome to Ubuntu 22.04.3 LTS (GNU/Linux 5.15.0-xxx-aws)      │
│                                                                │
│  * Documentation:  https://help.ubuntu.com                    │
│  * Management:     https://landscape.canonical.com            │
│  * Support:        https://ubuntu.com/advantage               │
│                                                                │
│   System information as of Sat Dec  7 12:00:00 UTC 2024       │
│                                                                │
│   System load:  0.0               Processes:             100  │
│   Usage of /:   15.2% of 7.57GB  Users logged in:        0   │
│   Memory usage: 20%              IPv4 address for eth0:  ...  │
│   Swap usage:   0%                                            │
│                                                                │
│ ubuntu@ip-172-31-xx-xx:~$                                     │
│                                                                │
│ YOU ARE NOW INSIDE YOUR EC2 SERVER!                           │
│                                                                │
│ The prompt shows:                                              │
│ ubuntu     = username                                          │
│ ip-172-... = internal hostname                                │
│ ~          = home directory (/home/ubuntu)                    │
│ $          = ready for your command                           │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

## 5.3 Common SSH Errors and Solutions

```
┌────────────────────────────────────────────────────────────────┐
│ ERROR 1: Connection timed out                                  │
├────────────────────────────────────────────────────────────────┤
│ ssh: connect to host 52.66.100.200 port 22: Connection timed  │
│ out                                                            │
│                                                                │
│ CAUSES:                                                        │
│ 1. Security group doesn't allow SSH (port 22)                 │
│ 2. Your IP changed (ISP gave you new IP)                      │
│ 3. EC2 instance not running                                    │
│                                                                │
│ SOLUTIONS:                                                     │
│ 1. Check Security Group:                                       │
│    EC2 → Security Groups → nexora-sg → Inbound rules          │
│    Ensure SSH rule exists with your current IP                 │
│                                                                │
│ 2. Find your current IP: https://whatismyip.com               │
│    Update Security Group if IP changed                         │
│                                                                │
│ 3. Check EC2 instance state (should be "Running")             │
│                                                                │
└────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────┐
│ ERROR 2: Permission denied (publickey)                         │
├────────────────────────────────────────────────────────────────┤
│ Permission denied (publickey).                                 │
│                                                                │
│ CAUSES:                                                        │
│ 1. Wrong username (must be "ubuntu" for Ubuntu)               │
│ 2. Wrong key file                                              │
│ 3. Key file permissions too open                               │
│                                                                │
│ SOLUTIONS:                                                     │
│ 1. Username must be: ubuntu (not root, not ec2-user)          │
│                                                                │
│ 2. Verify key file matches the one used during EC2 creation   │
│                                                                │
│ 3. Run the icacls command again to fix permissions            │
│                                                                │
└────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────┐
│ ERROR 3: WARNING: UNPROTECTED PRIVATE KEY FILE!                │
├────────────────────────────────────────────────────────────────┤
│ @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@    │
│ @         WARNING: UNPROTECTED PRIVATE KEY FILE!          @    │
│ @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@    │
│                                                                │
│ CAUSE: Key file is accessible by other users                  │
│                                                                │
│ SOLUTION: Run this command in PowerShell:                     │
│ icacls .\nexora-key.pem /inheritance:r /grant:r "$($env:USERNAME):(R)"
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

---

# 6. PHASE 4: NGINX INSTALLATION & CONFIGURATION

## 6.1 Update System First (Always!)

```bash
# On your EC2 server (after SSH connection)

# Update package list (like refreshing the app store)
sudo apt update
```

```
┌────────────────────────────────────────────────────────────────┐
│ WHAT DOES 'sudo apt update' DO?                                │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│ sudo = "Super User DO" - run as administrator                  │
│ apt  = Advanced Package Tool (Ubuntu's package manager)       │
│ update = refresh the list of available packages               │
│                                                                │
│ This command:                                                  │
│ 1. Contacts Ubuntu's servers                                   │
│ 2. Downloads latest list of available software                │
│ 3. Knows what versions are available for installation         │
│                                                                │
│ Does NOT install anything - just updates the catalog           │
│                                                                │
│ ALWAYS run this before installing new software!               │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

```bash
# Upgrade existing packages (install security updates)
sudo apt upgrade -y
```

```
┌────────────────────────────────────────────────────────────────┐
│ WHAT DOES 'sudo apt upgrade -y' DO?                            │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│ upgrade = install newer versions of installed packages        │
│ -y = answer "yes" to all prompts automatically                │
│                                                                │
│ This command:                                                  │
│ 1. Checks which installed packages have updates               │
│ 2. Downloads and installs the updates                         │
│ 3. -y flag means don't ask for confirmation                   │
│                                                                │
│ WHY IMPORTANT?                                                 │
│ - Security patches fix vulnerabilities                        │
│ - Bug fixes improve stability                                  │
│ - Always update before installing new software                │
│                                                                │
│ This may take 1-2 minutes. Be patient!                        │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

## 6.2 Install Nginx

```bash
# Install Nginx web server
sudo apt install nginx -y
```

```
┌────────────────────────────────────────────────────────────────┐
│ WHAT HAPPENS DURING NGINX INSTALLATION?                        │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│ apt install nginx:                                             │
│                                                                │
│ 1. Downloads nginx package from Ubuntu servers                │
│ 2. Downloads dependencies (other required packages)           │
│ 3. Extracts and installs files to system directories          │
│ 4. Creates default configuration                               │
│ 5. Sets up nginx as a system service                          │
│ 6. Starts nginx automatically                                  │
│                                                                │
│ Files created:                                                 │
│ /etc/nginx/           → Configuration directory               │
│ /etc/nginx/nginx.conf → Main configuration                    │
│ /etc/nginx/sites-available/ → Site configs                    │
│ /etc/nginx/sites-enabled/   → Active site configs (symlinks) │
│ /var/www/html/        → Default web root                      │
│ /var/log/nginx/       → Log files                             │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

## 6.3 Verify Nginx is Running

```bash
# Check Nginx status
sudo systemctl status nginx
```

```
┌────────────────────────────────────────────────────────────────┐
│ EXPECTED OUTPUT                                                │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│ ● nginx.service - A high performance web server               │
│      Loaded: loaded (/lib/systemd/system/nginx.service)       │
│      Active: active (running) since Sat 2024-12-07 12:00:00   │
│        Docs: man:nginx(8)                                      │
│    Main PID: 1234 (nginx)                                      │
│       Tasks: 2 (limit: 1137)                                   │
│      Memory: 4.5M                                              │
│      CGroup: /system.slice/nginx.service                       │
│              ├─1234 nginx: master process                      │
│              └─1235 nginx: worker process                      │
│                                                                │
│ Press 'q' to exit this view                                    │
│                                                                │
│ IMPORTANT PARTS:                                               │
│ Active: active (running) ← This means it's working!           │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

## 6.4 Test Nginx in Browser

```
┌────────────────────────────────────────────────────────────────┐
│ TEST YOUR NGINX SERVER                                         │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│ 1. Open your web browser                                       │
│ 2. Go to: http://YOUR_ELASTIC_IP                              │
│    Example: http://52.66.100.200                              │
│                                                                │
│ 3. You should see:                                             │
│ ┌──────────────────────────────────────────────────────────┐  │
│ │                                                          │  │
│ │         Welcome to nginx!                                │  │
│ │                                                          │  │
│ │ If you see this page, the nginx web server is           │  │
│ │ successfully installed and working.                      │  │
│ │                                                          │  │
│ └──────────────────────────────────────────────────────────┘  │
│                                                                │
│ ✓ If you see this, Nginx is working!                          │
│ ✗ If you get "Connection refused", check security group      │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

## 6.5 Create Directory for Your Website

```bash
# Create directory for nexora website
sudo mkdir -p /var/www/nexora

# Set ownership to ubuntu user (so you can write files)
sudo chown -R ubuntu:ubuntu /var/www/nexora

# Set proper permissions
sudo chmod -R 755 /var/www/nexora
```

```
┌────────────────────────────────────────────────────────────────┐
│ EXPLAINING THESE COMMANDS                                      │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│ mkdir -p /var/www/nexora                                      │
│ ├── mkdir = make directory                                    │
│ ├── -p = create parent directories if needed                  │
│ └── /var/www/nexora = path to create                         │
│                                                                │
│ chown -R ubuntu:ubuntu /var/www/nexora                        │
│ ├── chown = change owner                                      │
│ ├── -R = recursive (apply to all files inside)               │
│ ├── ubuntu:ubuntu = user:group                               │
│ └── Now 'ubuntu' user owns this folder                       │
│                                                                │
│ chmod -R 755 /var/www/nexora                                  │
│ ├── chmod = change mode (permissions)                         │
│ ├── -R = recursive                                            │
│ ├── 755 = permission number                                   │
│ │   ├── 7 = owner can read+write+execute                     │
│ │   ├── 5 = group can read+execute                           │
│ │   └── 5 = others can read+execute                          │
│ └── Nginx needs read+execute to serve files                  │
│                                                                │
│ WHY THESE PERMISSIONS?                                         │
│ - Owner (ubuntu): Full control to upload/modify files        │
│ - Group & Others: Can read files (necessary for web server)  │
│ - Execute on directories means "can enter directory"          │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

## 6.6 Upload Your Website Files

### Option A: Upload from Local Machine (SCP)m

```
┌────────────────────────────────────────────────────────────────┐
│ UPLOADING FILES WITH SCP                                       │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│ SCP = Secure Copy Protocol (like FTP but encrypted)           │
│                                                                │
│ RUN THESE COMMANDS ON YOUR LOCAL MACHINE (NOT on EC2):        │
│ Open a NEW PowerShell window (don't close your SSH session)   │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

```powershell
# On your LOCAL machine (Windows PowerShell)

# Step 1: Navigate to your project
cd C:\Users\rohan\OneDrive\Desktop\Patent_ai

# Step 2: Build the project
npm run build

# This creates/updates the 'dist' folder with production files
# You should see output like:
# vite v6.x.x building for production...
# ✓ 50 modules transformed.
# dist/index.html    16.xx kB
# dist/assets/...

# Step 3: Upload dist folder contents to EC2
scp -i C:\Users\rohan\.ssh\nexora-key.pem -r dist/* ubuntu@YOUR_ELASTIC_IP:/var/www/nexora/

# Example with real IP:
scp -i C:\Users\rohan\.ssh\nexora-key.pem -r dist/* ubuntu@52.66.100.200:/var/www/nexora/
```

```
┌────────────────────────────────────────────────────────────────┐
│ SCP COMMAND EXPLAINED                                          │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│ scp -i key.pem -r dist/* ubuntu@IP:/var/www/nexora/           │
│ │   │          │  │      │         │                          │
│ │   │          │  │      │         └── Destination folder     │
│ │   │          │  │      └── User@ServerIP                    │
│ │   │          │  └── Source (all files in dist folder)       │
│ │   │          └── Recursive (include subdirectories)         │
│ │   └── Identity file (your private key)                      │
│ └── Secure Copy command                                        │
│                                                                │
│ This copies:                                                   │
│ dist/index.html    → /var/www/nexora/index.html               │
│ dist/robots.txt    → /var/www/nexora/robots.txt               │
│ dist/sitemap.xml   → /var/www/nexora/sitemap.xml              │
│ dist/assets/*      → /var/www/nexora/assets/*                 │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

### Verify Files Uploaded (Back on EC2)

```bash
# On EC2 (in your SSH session)

# List files in the nexora directory
ls -la /var/www/nexora/

# Expected output:
# total 24
# drwxr-xr-x 2 ubuntu ubuntu 4096 Dec  7 12:00 .
# drwxr-xr-x 3 root   root   4096 Dec  7 12:00 ..
# -rw-r--r-- 1 ubuntu ubuntu 16384 Dec  7 12:00 index.html
# -rw-r--r-- 1 ubuntu ubuntu   735 Dec  7 12:00 robots.txt
# -rw-r--r-- 1 ubuntu ubuntu  1300 Dec  7 12:00 sitemap.xml
```

## 6.7 Configure Nginx for nexorapatent.in

### Step 6.7.1: Create Nginx Configuration File

```bash
# Create new nginx config for nexora
sudo nano /etc/nginx/sites-available/nexora
```

```
┌────────────────────────────────────────────────────────────────┐
│ WHAT IS NANO?                                                  │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│ nano = Simple text editor for terminal                         │
│                                                                │
│ Controls:                                                      │
│ - Type normally to add text                                   │
│ - Arrow keys to move cursor                                   │
│ - Ctrl+O = Save (Write Out)                                   │
│ - Ctrl+X = Exit                                                │
│ - Ctrl+K = Cut line                                           │
│ - Ctrl+U = Paste line                                         │
│                                                                │
│ Bottom of screen shows available commands                      │
│ ^ means Ctrl key                                               │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

### Step 6.7.2: Paste This Configuration

```nginx
# Nginx configuration for nexorapatent.in
# Path: /etc/nginx/sites-available/nexora

server {
    # Listen on port 80 (HTTP)
    listen 80;
    listen [::]:80;

    # Domain names this server responds to
    server_name nexorapatent.in www.nexorapatent.in;

    # Root directory where website files are located
    root /var/www/nexora;

    # Default file to serve
    index index.html;

    # ============================================
    # GZIP COMPRESSION
    # ============================================
    # WHY: Compresses files before sending to browser
    # RESULT: Faster page loads, less bandwidth used
    #
    # Example: 100KB file → 25KB compressed
    # ============================================
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied expired no-cache no-store private auth;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml application/javascript application/json;
    gzip_disable "MSIE [1-6]\.";

    # ============================================
    # SECURITY HEADERS
    # ============================================
    # WHY: Protect against common web attacks
    # ============================================

    # Prevent clickjacking attacks
    add_header X-Frame-Options "SAMEORIGIN" always;

    # Enable XSS filter in browsers
    add_header X-XSS-Protection "1; mode=block" always;

    # Prevent MIME type sniffing
    add_header X-Content-Type-Options "nosniff" always;

    # Control referrer information
    add_header Referrer-Policy "no-referrer-when-downgrade" always;

    # ============================================
    # MAIN LOCATION BLOCK
    # ============================================
    # WHY: Handle all requests to your website
    # ============================================
    location / {
        # try_files is CRITICAL for Single Page Applications (SPA)
        #
        # How it works:
        # 1. User requests /contact
        # 2. Nginx looks for /var/www/nexora/contact (file) - Not found
        # 3. Nginx looks for /var/www/nexora/contact/ (directory) - Not found
        # 4. Nginx serves /var/www/nexora/index.html - React handles routing!
        #
        # Without this: Every route except / would show 404 error
        try_files $uri $uri/ /index.html;
    }

    # ============================================
    # STATIC ASSET CACHING
    # ============================================
    # WHY: Tell browsers to cache static files
    # RESULT: Repeat visitors load pages faster
    # ============================================
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    # ============================================
    # SECURITY: Block hidden files
    # ============================================
    # WHY: Prevent access to .git, .env, etc.
    # ============================================
    location ~ /\. {
        deny all;
        access_log off;
        log_not_found off;
    }

    # ============================================
    # LOGGING
    # ============================================
    access_log /var/log/nginx/nexora-access.log;
    error_log /var/log/nginx/nexora-error.log;
}
```

### Step 6.7.3: Save and Exit Nano

```
1. Press Ctrl+O (Write Out/Save)
2. Press Enter to confirm filename
3. Press Ctrl+X (Exit)
```

### Step 6.7.4: Enable the Site

```bash
# Remove default nginx site
sudo rm /etc/nginx/sites-enabled/default

# Create symbolic link to enable nexora site
sudo ln -s /etc/nginx/sites-available/nexora /etc/nginx/sites-enabled/

# What this does:
# sites-available/ = all configs you've written
# sites-enabled/   = configs that are actually active
# ln -s = create a shortcut (symbolic link)
#
# This pattern allows you to enable/disable sites easily
# without deleting the config files
```

### Step 6.7.5: Test Nginx Configuration

```bash
# Test for syntax errors
sudo nginx -t
```

```
┌────────────────────────────────────────────────────────────────┐
│ EXPECTED OUTPUT                                                │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│ nginx: the configuration file /etc/nginx/nginx.conf syntax is │
│ ok                                                             │
│ nginx: configuration file /etc/nginx/nginx.conf test is       │
│ successful                                                     │
│                                                                │
│ ✓ If you see this, your config is correct!                    │
│                                                                │
│ ✗ If you see errors, check:                                   │
│   - Missing semicolons at end of lines                        │
│   - Mismatched braces { }                                     │
│   - Typos in directives                                       │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

### Step 6.7.6: Reload Nginx

```bash
# Reload Nginx to apply new configuration
sudo systemctl reload nginx

# 'reload' vs 'restart':
# - reload = Apply config changes without dropping connections
# - restart = Stop and start (brief downtime)
#
# Always use reload for config changes
```

## 6.8 Test Your Website

```
┌────────────────────────────────────────────────────────────────┐
│ TEST YOUR WEBSITE                                              │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│ 1. Open browser                                                │
│ 2. Go to: http://YOUR_ELASTIC_IP                              │
│                                                                │
│ ✓ You should see your Nexora Patent website!                  │
│                                                                │
│ At this point:                                                 │
│ - http://52.66.xxx.xxx → Works (your site loads)             │
│ - http://nexorapatent.in → NOT working yet (DNS not set up)  │
│                                                                │
│ Next steps (Part 2):                                           │
│ - Route 53 DNS configuration                                   │
│ - SSL certificate                                              │
│ - CloudFront CDN                                               │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

---

# 7. COMMON MISTAKES & WARNINGS (PART 1)

## 7.1 EC2 Mistakes

```
┌────────────────────────────────────────────────────────────────┐
│ ❌ MISTAKE 1: Wrong Instance Type                              │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│ WRONG: t2.small, t2.medium, t3.micro, etc.                    │
│ RIGHT: t2.micro (Free Tier)                                   │
│                                                                │
│ COST IMPACT:                                                   │
│ t2.micro  = FREE (750 hours/month)                            │
│ t2.small  = ~$17/month                                        │
│ t2.medium = ~$34/month                                        │
│                                                                │
│ FIX: Terminate wrong instance, launch new t2.micro            │
│                                                                │
└────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────┐
│ ❌ MISTAKE 2: Wrong Region                                     │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│ You created EC2 in us-east-1, but looking in ap-south-1      │
│ "Where did my server go?!"                                    │
│                                                                │
│ PREVENTION:                                                    │
│ ALWAYS check region (top right) before any action            │
│ Stick to ap-south-1 (Mumbai) for everything                  │
│                                                                │
└────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────┐
│ ❌ MISTAKE 3: Lost Key Pair (.pem file)                        │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│ "I can't find my nexora-key.pem file!"                        │
│                                                                │
│ CONSEQUENCES:                                                  │
│ - Cannot SSH into server                                      │
│ - Cannot recover the key                                      │
│ - Must create new instance from scratch                       │
│                                                                │
│ PREVENTION:                                                    │
│ - Save .pem immediately to C:\Users\rohan\.ssh\              │
│ - Backup to secure cloud storage (encrypted)                  │
│ - Never share or commit to git                                │
│                                                                │
│ RECOVERY (if lost):                                           │
│ 1. Create AMI (image) of current instance                     │
│ 2. Launch new instance from AMI with new key pair            │
│ 3. Terminate old instance                                     │
│                                                                │
└────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────┐
│ ❌ MISTAKE 4: SSH "Anywhere" Source                            │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│ Security Group SSH rule with Source: 0.0.0.0/0                │
│                                                                │
│ DANGER:                                                        │
│ - Anyone in the world can try to SSH into your server        │
│ - Bots constantly scan for open SSH ports                    │
│ - Brute force attacks will start immediately                 │
│                                                                │
│ CORRECT:                                                       │
│ - Source: My IP (restricts to your IP only)                   │
│ - Update when your IP changes                                 │
│                                                                │
└────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────┐
│ ❌ MISTAKE 5: Forgetting to Enable Auto-assign Public IP       │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│ Instance has no public IP = Cannot connect from internet      │
│                                                                │
│ SYMPTOMS:                                                      │
│ - EC2 console shows empty "Public IPv4 address"               │
│ - SSH times out                                                │
│                                                                │
│ FIX:                                                           │
│ - Must terminate and recreate instance with public IP enabled │
│ - Or assign Elastic IP (which we do anyway)                   │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

## 7.2 SSH Mistakes

```
┌────────────────────────────────────────────────────────────────┐
│ ❌ MISTAKE 6: Wrong Username                                   │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│ WRONG:                                                         │
│ ssh -i key.pem root@IP          (Permission denied)           │
│ ssh -i key.pem ec2-user@IP      (Permission denied)           │
│ ssh -i key.pem admin@IP         (Permission denied)           │
│                                                                │
│ RIGHT:                                                         │
│ ssh -i key.pem ubuntu@IP        (Works!)                      │
│                                                                │
│ NOTE: Username depends on AMI:                                │
│ - Ubuntu AMI: ubuntu                                          │
│ - Amazon Linux: ec2-user                                      │
│ - Debian: admin                                                │
│                                                                │
│ We use Ubuntu, so username is: ubuntu                         │
│                                                                │
└────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────┐
│ ❌ MISTAKE 7: Key File Permission Error (Windows)              │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│ ERROR: "UNPROTECTED PRIVATE KEY FILE"                         │
│                                                                │
│ CAUSE: Key file is readable by other Windows users            │
│                                                                │
│ FIX: Run this PowerShell command:                             │
│ icacls .\nexora-key.pem /inheritance:r /grant:r "$($env:USERNAME):(R)"
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

## 7.3 Nginx Mistakes

```
┌────────────────────────────────────────────────────────────────┐
│ ❌ MISTAKE 8: Missing Semicolons                               │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│ WRONG:                                                         │
│ root /var/www/nexora     ← Missing semicolon                  │
│                                                                │
│ RIGHT:                                                         │
│ root /var/www/nexora;    ← Has semicolon                      │
│                                                                │
│ Every directive in nginx must end with semicolon!             │
│ nginx -t will catch this error                                │
│                                                                │
└────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────┐
│ ❌ MISTAKE 9: Not Using try_files for SPA                      │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│ WITHOUT try_files:                                             │
│ /contact → 404 Not Found                                      │
│ /privacy → 404 Not Found                                      │
│ /terms → 404 Not Found                                        │
│                                                                │
│ WITH try_files $uri $uri/ /index.html:                        │
│ /contact → index.html → React routes to Contact ✓            │
│ /privacy → index.html → React routes to Privacy ✓            │
│                                                                │
│ MUST HAVE for React/Vue/Angular SPAs!                         │
│                                                                │
└────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────┐
│ ❌ MISTAKE 10: Wrong File Permissions                          │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│ ERROR: 403 Forbidden                                          │
│                                                                │
│ CAUSE: Nginx can't read your files                            │
│                                                                │
│ FIX:                                                           │
│ sudo chown -R ubuntu:ubuntu /var/www/nexora                   │
│ sudo chmod -R 755 /var/www/nexora                             │
│                                                                │
│ Files need:                                                    │
│ - 644 for files (rw-r--r--)                                   │
│ - 755 for directories (rwxr-xr-x)                             │
│                                                                │
└────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────┐
│ ❌ MISTAKE 11: Not Enabling the Site                           │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│ Created config in sites-available but didn't link to          │
│ sites-enabled                                                  │
│                                                                │
│ FIX:                                                           │
│ sudo ln -s /etc/nginx/sites-available/nexora /etc/nginx/sites-enabled/
│                                                                │
│ Also remove default:                                          │
│ sudo rm /etc/nginx/sites-enabled/default                      │
│                                                                │
└────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────┐
│ ❌ MISTAKE 12: Not Reloading Nginx                             │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│ Made config changes but site not updated                      │
│                                                                │
│ FIX:                                                           │
│ sudo nginx -t                    ← Test first!                │
│ sudo systemctl reload nginx      ← Apply changes              │
│                                                                │
│ ALWAYS test before reload to avoid downtime!                  │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

---

# CONTINUE IN PART 2

Part 2 covers:
- Route 53 DNS Setup
- SSL Certificate (Certbot & ACM)
- CloudFront CDN Configuration
- GitHub Actions CI/CD
- Advanced troubleshooting

---

**File:** `AWS-HOSTING-GUIDE-PART1.md`
**Author:** Claude (AI Assistant)
**Domain:** nexorapatent.in
**Last Updated:** December 2024
