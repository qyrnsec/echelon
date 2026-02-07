from scraper.sources.reddit import fetch_reddit
from scraper.sources.rss import fetch_rss
from scraper.sources.twitter import fetch_twitter
from scraper.scoring import rank_items
from scraper.categorizer import categorize_items
from scraper.digest import generate_digest


def run():
    print("=== Echelon - Collecte hebdomadaire ===\n")

    all_items = []

    print("[1/3] Collecte des sources...")
    all_items.extend(fetch_reddit())
    all_items.extend(fetch_rss())
    all_items.extend(fetch_twitter())
    print(f"\nTotal brut : {len(all_items)} éléments\n")

    print("[2/3] Scoring et classement...")
    ranked = rank_items(all_items)

    print("[3/3] Catégorisation et génération du digest...")
    categorized = categorize_items(ranked)
    filepath = generate_digest(categorized)

    print(f"\nTerminé. Digest sauvegardé : {filepath}")


if __name__ == "__main__":
    run()
