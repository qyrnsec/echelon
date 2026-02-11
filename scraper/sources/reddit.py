import time
import feedparser
from scraper.config import SUBREDDITS


def fetch_reddit():
    items = []

    for sub_name in SUBREDDITS:
        try:
            url = f"https://www.reddit.com/r/{sub_name}/hot.rss?limit=50"
            feed = feedparser.parse(url)
            count = 0
            for entry in feed.entries:
                title = entry.get("title", "")
                if title.lower() in ("[removed]", "[deleted]", ""):
                    continue

                published = entry.get("published_parsed") or entry.get("updated_parsed")
                created_utc = time.mktime(published) if published else time.time()

                items.append({
                    "title": title,
                    "url": entry.get("link", ""),
                    "source": f"r/{sub_name}",
                    "source_type": "reddit",
                    "upvotes": 0,
                    "comments": 0,
                    "created_utc": created_utc,
                })
                count += 1
            print(f"[Reddit] r/{sub_name} : {count} posts récupérés")
        except Exception as e:
            print(f"[Reddit] Erreur sur r/{sub_name} : {e}")

    return items
