from scraper.config import CATEGORY_KEYWORDS, DEFAULT_CATEGORY


def categorize(item):
    title = item.get("title", "").lower()
    url = item.get("url", "").lower()
    text = f"{title} {url}"

    scores = {}
    for category, keywords in CATEGORY_KEYWORDS.items():
        scores[category] = sum(1 for kw in keywords if kw in text)

    best = max(scores, key=scores.get)
    if scores[best] == 0:
        return DEFAULT_CATEGORY
    return best


def categorize_items(items):
    for item in items:
        item["category"] = categorize(item)
    return items
