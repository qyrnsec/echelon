from scraper.sources.reddit import fetch_reddit
from scraper.sources.rss import fetch_rss
from scraper.sources.twitter import fetch_twitter
from scraper.sources.youtube import fetch_youtube
from scraper.sources.nvd import fetch_nvd
from scraper.scoring import rank_items
from scraper.categorizer import categorize_items
from scraper.digest import generate_digest


def run():
    print("=== Echelon - Collecte hebdomadaire ===\n")

    all_items = []

    print("[1/5] Reddit...")
    all_items.extend(fetch_reddit())

    print("[2/5] RSS...")
    all_items.extend(fetch_rss())

    print("[3/5] Twitter...")
    all_items.extend(fetch_twitter())

    print("[4/5] YouTube...")
    all_items.extend(fetch_youtube())

    print("[5/5] NVD...")
    all_items.extend(fetch_nvd())

    print(f"\nTotal brut : {len(all_items)} éléments\n")

    print("Scoring et classement...")
    ranked = rank_items(all_items)

    print("Catégorisation et génération du digest...")
    categorized = categorize_items(ranked)
    filepath = generate_digest(categorized)

    print(f"\nTerminé. Digest sauvegardé : {filepath}")


if __name__ == "__main__":
    run()
