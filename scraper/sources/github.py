import time
from datetime import datetime, timezone
import requests


GHSA_API_URL = "https://api.github.com/advisories"


def fetch_github():
    params = {
        "type": "reviewed",
        "per_page": 30,
    }

    headers = {
        "Accept": "application/vnd.github+json",
    }

    try:
        resp = requests.get(GHSA_API_URL, params=params, headers=headers, timeout=30)
        resp.raise_for_status()
        advisories = resp.json()
    except Exception as e:
        print(f"[GitHub] Erreur de requête : {e}")
        return []

    items = []
    for adv in advisories:
        ghsa_id = adv.get("ghsa_id", "")
        cve_id = adv.get("cve_id", "")
        summary = adv.get("summary", "")
        severity = adv.get("severity", "")

        label = cve_id or ghsa_id
        title = f"[{severity.upper()}] {label} — {summary[:200]}"

        severity_scores = {"critical": 10, "high": 8, "medium": 5, "low": 2}
        severity_score = severity_scores.get(severity, 0)

        published = adv.get("published_at", "")
        try:
            created_utc = datetime.fromisoformat(published.replace("Z", "+00:00")).timestamp()
        except (ValueError, AttributeError):
            created_utc = time.time()

        items.append({
            "title": title,
            "url": adv.get("html_url", f"https://github.com/advisories/{ghsa_id}"),
            "source": "GitHub Advisory",
            "source_type": "github",
            "upvotes": 0,
            "comments": 0,
            "severity": severity,
            "severity_score": severity_score,
            "created_utc": created_utc,
        })

    print(f"[GitHub] {len(items)} advisories récupérées")
    return items
