import time
from datetime import datetime, timedelta, timezone
import requests
from scraper.config import NVD_API_KEY, NVD_RESULTS_PER_PAGE, NVD_DAYS_BACK


NVD_API_URL = "https://services.nvd.nist.gov/rest/json/cves/2.0"


def fetch_nvd():
    now = datetime.now(timezone.utc)
    start = now - timedelta(days=NVD_DAYS_BACK)

    params = {
        "pubStartDate": start.strftime("%Y-%m-%dT00:00:00.000"),
        "pubEndDate": now.strftime("%Y-%m-%dT23:59:59.999"),
        "resultsPerPage": NVD_RESULTS_PER_PAGE,
    }

    headers = {}
    if NVD_API_KEY:
        headers["apiKey"] = NVD_API_KEY

    try:
        resp = requests.get(NVD_API_URL, params=params, headers=headers, timeout=30)
        resp.raise_for_status()
        data = resp.json()
    except Exception as e:
        print(f"[NVD] Erreur de requête : {e}")
        return []

    items = []
    vulnerabilities = data.get("vulnerabilities", [])

    for vuln in vulnerabilities:
        cve = vuln.get("cve", {})
        cve_id = cve.get("id", "")

        descriptions = cve.get("descriptions", [])
        desc_en = next((d["value"] for d in descriptions if d["lang"] == "en"), cve_id)
        title = f"{cve_id} — {desc_en[:200]}"

        metrics = cve.get("metrics", {})
        base_score = 0
        for metric_key in ["cvssMetricV31", "cvssMetricV30", "cvssMetricV2"]:
            metric_list = metrics.get(metric_key, [])
            if metric_list:
                base_score = metric_list[0].get("cvssData", {}).get("baseScore", 0)
                break

        published = cve.get("published", "")
        try:
            created_utc = datetime.fromisoformat(published.replace("Z", "+00:00")).timestamp()
        except (ValueError, AttributeError):
            created_utc = time.time()

        items.append({
            "title": title,
            "url": f"https://nvd.nist.gov/vuln/detail/{cve_id}",
            "source": "NVD",
            "source_type": "nvd",
            "upvotes": 0,
            "comments": 0,
            "cvss": base_score,
            "created_utc": created_utc,
        })

    print(f"[NVD] {len(items)} CVE récupérées (derniers {NVD_DAYS_BACK} jours)")
    return items
