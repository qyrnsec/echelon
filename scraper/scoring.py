import time


def score_item(item):
    source_type = item.get("source_type", "")

    if source_type == "reddit":
        age_hours = (time.time() - item.get("created_utc", 0)) / 3600
        if age_hours <= 0:
            age_hours = 1
        return max(0, 200 / age_hours)

    if source_type == "rss":
        age_hours = (time.time() - item.get("created_utc", 0)) / 3600
        if age_hours <= 0:
            age_hours = 1
        return max(0, 1000 / age_hours)

    if source_type == "podcast":
        age_hours = (time.time() - item.get("created_utc", 0)) / 3600
        if age_hours <= 0:
            age_hours = 1
        return max(0, 600 / age_hours)

    if source_type == "youtube":
        age_hours = (time.time() - item.get("created_utc", 0)) / 3600
        if age_hours <= 0:
            age_hours = 1
        return max(0, 500 / age_hours)

    if source_type == "github":
        severity_score = item.get("severity_score", 0)
        return severity_score * 80

    if source_type == "nvd":
        cvss = item.get("cvss", 0)
        return cvss * 100

    return 0


def rank_items(items):
    for item in items:
        item["score"] = score_item(item)
    return sorted(items, key=lambda x: x["score"], reverse=True)
