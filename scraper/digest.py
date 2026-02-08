import json
import os
from datetime import datetime, timezone
from scraper.config import DIGEST_TOP_N, DIGEST_OUTPUT_DIR

MAX_PER_SOURCE_TYPE = 6


def generate_digest(items):
    selected = []
    counts = {}

    for item in items:
        st = item.get("source_type", "")
        counts.setdefault(st, 0)
        if counts[st] >= MAX_PER_SOURCE_TYPE:
            continue
        selected.append(item)
        counts[st] += 1
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
