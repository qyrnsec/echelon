import time
import feedparser
from scraper.config import PODCAST_FEEDS


def fetch_podcasts():
    items = []

    for name, url in PODCAST_FEEDS.items():
        try:
            feed = feedparser.parse(url)
            count = 0
            for entry in feed.entries:
                published = entry.get("published_parsed") or entry.get("updated_parsed")
                created_utc = time.mktime(published) if published else time.time()

                items.append({
                    "title": entry.get("title", ""),
                    "url": entry.get("link", ""),
                    "source": name,
                    "source_type": "podcast",
                    "upvotes": 0,
                    "comments": 0,
                    "created_utc": created_utc,
                })
                count += 1
            print(f"[Podcast] {name} : {count} épisodes récupérés")
        except Exception as e:
            print(f"[Podcast] Erreur sur {name} : {e}")

    return items
