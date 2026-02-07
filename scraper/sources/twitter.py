import asyncio
from twikit import Client
from scraper.config import (
    TWITTER_USERNAME,
    TWITTER_EMAIL,
    TWITTER_PASSWORD,
    TWITTER_ACCOUNTS,
)


async def _fetch_twitter_async():
    if not TWITTER_USERNAME or not TWITTER_EMAIL or not TWITTER_PASSWORD:
        print("[Twitter] Identifiants manquants, source ignorée.")
        return []

    client = Client("en-US")

    try:
        await client.login(
            auth_info_1=TWITTER_USERNAME,
            auth_info_2=TWITTER_EMAIL,
            password=TWITTER_PASSWORD,
        )
    except Exception as e:
        print(f"[Twitter] Échec de connexion : {e}")
        return []

    items = []
    for account in TWITTER_ACCOUNTS:
        try:
            user = await client.get_user_by_screen_name(account)
            tweets = await user.get_tweets("Tweets", count=20)
            count = 0
            for tweet in tweets:
                items.append({
                    "title": tweet.text[:280],
                    "url": f"https://x.com/{account}/status/{tweet.id}",
                    "source": f"@{account}",
                    "source_type": "twitter",
                    "upvotes": tweet.favorite_count or 0,
                    "comments": tweet.reply_count or 0,
                    "retweets": tweet.retweet_count or 0,
                    "created_utc": tweet.created_at_datetime.timestamp() if tweet.created_at_datetime else 0,
                })
                count += 1
            print(f"[Twitter] @{account} : {count} tweets récupérés")
        except Exception as e:
            print(f"[Twitter] Erreur sur @{account} : {e}")

    return items


def fetch_twitter():
    try:
        loop = asyncio.get_event_loop()
        if loop.is_running():
            return loop.run_until_complete(_fetch_twitter_async())
    except RuntimeError:
        pass
    return asyncio.run(_fetch_twitter_async())
