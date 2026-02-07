import praw
from scraper.config import (
    REDDIT_CLIENT_ID,
    REDDIT_CLIENT_SECRET,
    REDDIT_USER_AGENT,
    SUBREDDITS,
    REDDIT_POSTS_PER_SUB,
)


def fetch_reddit():
    if not REDDIT_CLIENT_ID or not REDDIT_CLIENT_SECRET:
        print("[Reddit] Identifiants manquants, source ignorée.")
        return []

    reddit = praw.Reddit(
        client_id=REDDIT_CLIENT_ID,
        client_secret=REDDIT_CLIENT_SECRET,
        user_agent=REDDIT_USER_AGENT,
    )

    items = []
    for sub_name in SUBREDDITS:
        try:
            subreddit = reddit.subreddit(sub_name)
            for post in subreddit.hot(limit=REDDIT_POSTS_PER_SUB):
                if post.stickied:
                    continue
                items.append({
                    "title": post.title,
                    "url": post.url,
                    "source": f"r/{sub_name}",
                    "source_type": "reddit",
                    "upvotes": post.score,
                    "comments": post.num_comments,
                    "created_utc": post.created_utc,
                })
            print(f"[Reddit] r/{sub_name} : {len([i for i in items if i['source'] == f'r/{sub_name}'])} posts récupérés")
        except Exception as e:
            print(f"[Reddit] Erreur sur r/{sub_name} : {e}")

    return items
