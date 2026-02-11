import time
import feedparser
from scraper.config import YOUTUBE_CHANNELS


def fetch_youtube():
    items = []

    for name, channel_id in YOUTUBE_CHANNELS.items():
        try:
            url = f"https://www.youtube.com/feeds/videos.xml?channel_id={channel_id}"
            feed = feedparser.parse(url)
            count = 0
            for entry in feed.entries:
                link = entry.get("link", "")
                if "/shorts/" in link:
                    continue

                published = entry.get("published_parsed")
                created_utc = time.mktime(published) if published else time.time()

                video_id = entry.get("yt_videoid", "")
                if not link:
                    link = f"https://www.youtube.com/watch?v={video_id}"

                views = 0
                stats = entry.get("media_statistics", {})
                if stats:
                    views = int(stats.get("views", 0))

                items.append({
                    "title": entry.get("title", ""),
                    "url": link,
                    "source": name,
                    "source_type": "youtube",
                    "upvotes": 0,
                    "comments": 0,
                    "views": views,
                    "created_utc": created_utc,
                })
                count += 1
            print(f"[YouTube] {name} : {count} vidéos récupérées")
        except Exception as e:
            print(f"[YouTube] Erreur sur {name} : {e}")

    return items
