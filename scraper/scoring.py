import math
import time


def _age_days(item):
    age = (time.time() - item.get("created_utc", 0)) / 86400
    return max(age, 0)


def score_item(item):
    source_type = item.get("source_type", "")

    if source_type == "github":
        severity_map = {"critical": 100, "high": 80, "medium": 50, "low": 20}
        return severity_map.get(item.get("severity", ""), 0)

    if source_type == "nvd":
        cvss = item.get("cvss", 0)
        return min(cvss * 10, 100)

    if source_type == "youtube":
        views = item.get("views", 0)
        if views == 0:
            base = 30
        else:
            base = min(40 + math.log10(views + 1) * 10, 90)
        age = _age_days(item)
        bonus = 10 if age <= 2 else (5 if age <= 4 else 0)
        return min(base + bonus, 100)

    if source_type == "reddit":
        upvotes = item.get("upvotes", 0)
        comments = item.get("comments", 0)
        engagement = upvotes + (comments * 5)
        if engagement == 0:
            base = 25
        else:
            base = min(35 + math.log10(engagement + 1) * 15, 85)
        age = _age_days(item)
        bonus = 15 if age <= 2 else (8 if age <= 4 else 0)
        return min(base + bonus, 100)

    if source_type == "rss":
        age = _age_days(item)
        if age <= 1:
            return 75
        if age <= 3:
            return 65
        if age <= 5:
            return 55
        return 45

    if source_type == "podcast":
        age = _age_days(item)
        if age <= 2:
            return 60
        return 50

    return 0


def rank_items(items):
    for item in items:
        item["score"] = round(score_item(item), 2)
    return sorted(items, key=lambda x: x["score"], reverse=True)
