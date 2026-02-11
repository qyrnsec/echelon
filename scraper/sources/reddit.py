import time
import requests
from scraper.config import SUBREDDITS


def fetch_reddit():
    items = []
    headers = {"User-Agent": "Echelon/1.0 (cybersec digest bot)"}

    for sub_name in SUBREDDITS:
        try:
            url = f"https://www.reddit.com/r/{sub_name}/hot.json?limit=50&raw_json=1"
            resp = requests.get(url, headers=headers, timeout=15)
            resp.raise_for_status()
            data = resp.json()

            count = 0
            for child in data.get("data", {}).get("children", []):
                post = child.get("data", {})
                title = post.get("title", "")
                if title.lower() in ("[removed]", "[deleted]", ""):
                    continue
                selftext = post.get("selftext", "")
                if selftext.lower() in ("[removed]", "[deleted]"):
                    continue

                items.append({
                    "title": title,
                    "url": f"https://www.reddit.com{post.get('permalink', '')}",
                    "source": f"r/{sub_name}",
                    "source_type": "reddit",
                    "upvotes": post.get("ups", 0),
                    "comments": post.get("num_comments", 0),
                    "created_utc": post.get("created_utc", time.time()),
                })
                count += 1
            print(f"[Reddit] r/{sub_name} : {count} posts récupérés")
        except Exception as e:
            print(f"[Reddit] Erreur sur r/{sub_name} : {e}")

    return items
