import time


def _age_hours(item):
    age = (time.time() - item.get("created_utc", 0)) / 3600
    return max(age, 1)


def score_item(item):
    source_type = item.get("source_type", "")

    if source_type == "reddit":
        return max(0, 200 / _age_hours(item))

    if source_type == "rss":
        return max(0, 1000 / _age_hours(item))

    if source_type == "podcast":
        return max(0, 600 / _age_hours(item))

    if source_type == "youtube":
        return max(0, 500 / _age_hours(item))

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
