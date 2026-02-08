import time


def score_item(item):
    source_type = item.get("source_type", "")

    if source_type in ("reddit", "rss"):
        age_hours = (time.time() - item.get("created_utc", 0)) / 3600
        if age_hours <= 0:
            age_hours = 1
        return max(0, 1000 / age_hours)

    if source_type == "twitter":
        return item.get("upvotes", 0) + item.get("retweets", 0) * 3

    if source_type == "youtube":
        age_hours = (time.time() - item.get("created_utc", 0)) / 3600
        if age_hours <= 0:
            age_hours = 1
        return max(0, 800 / age_hours)

    if source_type == "nvd":
        cvss = item.get("cvss", 0)
        return cvss * 100

    return 0


def rank_items(items):
    for item in items:
        item["score"] = score_item(item)
    return sorted(items, key=lambda x: x["score"], reverse=True)
