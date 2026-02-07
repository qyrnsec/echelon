Je veux créer Echelon, un agrégateur automatisé de veille 
cybersécurité qui scrape hebdomadairement:

Sources:
- Twitter: comptes cyber sécu pertinents (@threat_intel, etc.)
- Reddit: r/netsec, r/cybersecurity, r/AskNetsec
- RSS feeds: blogs cyber populaires

Features MVP:
- Scraper Python qui tourne chaque dimanche
- Filtre/score le contenu par pertinence (upvotes, engagement)
- Génère un digest HTML simple avec top 10-15 items
- Catégorise: Vulns, Tools, Tutorials, News

Stack suggéré:
- Backend: Python (requests, BeautifulSoup, praw pour Reddit)
- Simple frontend pour afficher le digest
- Cron job ou GitHub Actions pour automation

Commence par le scraper Reddit, c'est le plus simple (API propre).