import json
import os
from datetime import datetime, timezone
from scraper.config import DIGEST_TOP_N, DIGEST_OUTPUT_DIR


def generate_digest(items):
    top_items = items[:DIGEST_TOP_N]

    now = datetime.now(timezone.utc)
    date_str = now.strftime("%Y-%m-%d")

    digest = {
        "date": date_str,
        "generated_at": now.isoformat(),
        "count": len(top_items),
        "items": top_items,
    }

    os.makedirs(DIGEST_OUTPUT_DIR, exist_ok=True)
    filepath = os.path.join(DIGEST_OUTPUT_DIR, f"{date_str}.json")

    with open(filepath, "w", encoding="utf-8") as f:
        json.dump(digest, f, indent=2, ensure_ascii=False)

    print(f"[Digest] {len(top_items)} éléments écrits dans {filepath}")
    return filepath
