import json
import os
from datetime import datetime, timezone
from scraper.config import DIGEST_TOP_N, DIGEST_OUTPUT_DIR

MAX_PER_SOURCE_TYPE = {
    "rss": 12,
    "github": 4,
    "nvd": 4,
    "youtube": 3,
    "podcast": 3,
    "reddit": 3,
}
DEFAULT_MAX = 3
MAX_PER_SOURCE = 2


def generate_digest(items):
    selected = []
    type_counts = {}
    source_counts = {}

    for item in items:
        st = item.get("source_type", "")
        src = item.get("source", "")

        type_limit = MAX_PER_SOURCE_TYPE.get(st, DEFAULT_MAX)
        type_counts.setdefault(st, 0)
        source_counts.setdefault(src, 0)

        if type_counts[st] >= type_limit:
            continue
        if source_counts[src] >= MAX_PER_SOURCE:
            continue

        selected.append(item)
        type_counts[st] += 1
        source_counts[src] += 1

        if len(selected) >= DIGEST_TOP_N:
            break

    now = datetime.now(timezone.utc)
    date_str = now.strftime("%Y-%m-%d")

    digest = {
        "date": date_str,
        "generated_at": now.isoformat(),
        "count": len(selected),
        "items": selected,
    }

    os.makedirs(DIGEST_OUTPUT_DIR, exist_ok=True)
    filepath = os.path.join(DIGEST_OUTPUT_DIR, f"{date_str}.json")

    with open(filepath, "w", encoding="utf-8") as f:
        json.dump(digest, f, indent=2, ensure_ascii=False)

    print(f"[Digest] {len(selected)} éléments écrits dans {filepath}")
    return filepath
