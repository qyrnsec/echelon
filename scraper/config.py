import os
from dotenv import load_dotenv

load_dotenv()

REDDIT_CLIENT_ID = os.getenv("REDDIT_CLIENT_ID", "")
REDDIT_CLIENT_SECRET = os.getenv("REDDIT_CLIENT_SECRET", "")
REDDIT_USER_AGENT = os.getenv("REDDIT_USER_AGENT", "echelon:v1.0")

TWITTER_USERNAME = os.getenv("TWITTER_USERNAME", "")
TWITTER_EMAIL = os.getenv("TWITTER_EMAIL", "")
TWITTER_PASSWORD = os.getenv("TWITTER_PASSWORD", "")

SUBREDDITS = ["netsec", "cybersecurity", "AskNetsec"]
REDDIT_POSTS_PER_SUB = 50

RSS_FEEDS = {
    "Krebs on Security": "https://krebsonsecurity.com/feed/",
    "The Hacker News": "https://feeds.feedburner.com/TheHackersNews",
    "Bleeping Computer": "https://www.bleepingcomputer.com/feed/",
    "Dark Reading": "https://www.darkreading.com/rss.xml",
    "Schneier on Security": "https://www.schneier.com/feed/atom/",
    "CISA Alerts": "https://www.cisa.gov/cybersecurity-advisories/all.xml",
}

TWITTER_ACCOUNTS = [
    "SwiftOnSecurity",
    "malaboromann",
    "GossiTheDog",
    "campuscodi",
    "vabornh",
    "troabornh",
    "brabornh",
]

DIGEST_TOP_N = 15
DIGEST_OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "..", "data", "digests")

CATEGORY_KEYWORDS = {
    "Vulns": [
        "cve", "vulnerability", "exploit", "zero-day", "0day", "rce",
        "xss", "sqli", "sql injection", "privilege escalation", "buffer overflow",
        "use-after-free", "heap overflow", "poc", "proof of concept",
    ],
    "Tools": [
        "tool", "framework", "release", "github", "scanner", "pentest",
        "fuzzer", "open source", "library", "burp", "nuclei", "nmap",
        "metasploit", "wireshark",
    ],
    "Tutorials": [
        "tutorial", "guide", "writeup", "write-up", "ctf", "walkthrough",
        "cheat sheet", "cheatsheet", "how to", "howto", "learning",
        "beginner", "advanced guide",
    ],
    "News": [
        "breach", "ransomware", "hack", "leak", "apt", "threat actor",
        "regulation", "arrest", "indictment", "sanction", "malware",
        "phishing", "campaign", "attack",
    ],
}

DEFAULT_CATEGORY = "News"
