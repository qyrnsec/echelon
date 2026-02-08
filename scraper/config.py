import os
from dotenv import load_dotenv

load_dotenv()

TWITTER_USERNAME = os.getenv("TWITTER_USERNAME", "")
TWITTER_EMAIL = os.getenv("TWITTER_EMAIL", "")
TWITTER_PASSWORD = os.getenv("TWITTER_PASSWORD", "")

NVD_API_KEY = os.getenv("NVD_API_KEY", "")

SUBREDDITS = [
    "netsec",
    "cybersecurity",
    "AskNetsec",
    "ReverseEngineering",
    "Malware",
    "bugbounty",
    "hacking",
]

RSS_FEEDS = {
    "Krebs on Security": "https://krebsonsecurity.com/feed/",
    "The Hacker News": "https://feeds.feedburner.com/TheHackersNews",
    "Bleeping Computer": "https://www.bleepingcomputer.com/feed/",
    "Dark Reading": "https://www.darkreading.com/rss.xml",
    "Schneier on Security": "https://www.schneier.com/feed/atom/",
    "CISA Alerts": "https://www.cisa.gov/cybersecurity-advisories/all.xml",
    "SecurityWeek": "https://www.securityweek.com/feed/",
    "The Record": "https://therecord.media/feed",
    "Ars Technica Security": "https://feeds.arstechnica.com/arstechnica/security",
    "Exploit-DB": "https://www.exploit-db.com/rss.xml",
    "Packet Storm": "https://packetstormsecurity.com/feeds/",
    "HackerOne Hacktivity": "https://hackerone.com/hacktivity.json",
}

YOUTUBE_CHANNELS = {
    "John Hammond": "UCVeW9qkBjo3zosnqUbG7CFw",
    "LiveOverflow": "UClcE-kVhqyiHCcjYwcpfj9w",
    "IppSec": "UCa6eh7gCkpPo5XXUDfygQQA",
    "NetworkChuck": "UC9-y-6csu5WGm29I7JiwpnA",
    "The Cyber Mentor": "UC0ArlFuFYMpEewyRBzdLHiw",
    "David Bombal": "UC8butISFwT-Wl7EV0hUK0BQ",
    "STOK": "UCQN2DsjnYH60SFBIA6IkNwg",
    "HackerSploit": "UC0ZTPkdxlAKf-V33tqXwi3Q",
    "InsiderPhD": "UCPiN9NPjIer8Do9gUFxKv7A",
    "Nahamsec": "UCCZDt7MuC3Hzs6IH4xODLBw",
}

NVD_RESULTS_PER_PAGE = 30
NVD_DAYS_BACK = 7

TWITTER_ACCOUNTS = [
    "SwiftOnSecurity",
    "malaboromann",
    "GossiTheDog",
    "campuscodi",
    "vabornh",
    "troabornh",
    "brabornh",
]

DIGEST_TOP_N = 20
DIGEST_OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "..", "data", "digests")

CATEGORY_KEYWORDS = {
    "Vulns": [
        "cve", "vulnerability", "exploit", "zero-day", "0day", "rce",
        "xss", "sqli", "sql injection", "privilege escalation", "buffer overflow",
        "use-after-free", "heap overflow", "poc", "proof of concept",
        "patch", "advisory", "critical vulnerability",
    ],
    "Tools": [
        "tool", "framework", "release", "github", "scanner", "pentest",
        "fuzzer", "open source", "library", "burp", "nuclei", "nmap",
        "metasploit", "wireshark", "new release", "v1.", "v2.", "v3.",
    ],
    "Tutorials": [
        "tutorial", "guide", "writeup", "write-up", "ctf", "walkthrough",
        "cheat sheet", "cheatsheet", "how to", "howto", "learning",
        "beginner", "advanced guide", "explained", "introduction",
    ],
    "Bounty": [
        "bug bounty", "bounty", "hackerone", "bugcrowd", "intigriti",
        "responsible disclosure", "disclosure", "reward", "payout",
        "program", "scope", "triage",
    ],
    "News": [
        "breach", "ransomware", "hack", "leak", "apt", "threat actor",
        "regulation", "arrest", "indictment", "sanction", "malware",
        "phishing", "campaign", "attack", "incident",
    ],
}

DEFAULT_CATEGORY = "News"
