# Asset providers

Les providers permettent de rechercher des photos, vidéos et autres médias externes.

Providers prévus :

- Unsplash pour les photos ;
- Pexels pour les photos et vidéos ;
- Pixabay pour les photos, vidéos et illustrations ;
- Wikimedia Commons pour les ressources ouvertes ;
- Local pour les assets fournis par l'utilisateur ;
- Figma pour les éléments de marque Eres ;
- AI generated pour les assets produits par un service IA.

Chaque provider doit :

1. recevoir une requête de recherche ;
2. retourner des résultats normalisés ;
3. conserver l'URL source ;
4. conserver l'auteur ;
5. conserver la licence ;
6. enregistrer le chemin local après téléchargement ;
7. ne jamais exposer une clé API dans le code ou les logs.

Les clés API sont stockées uniquement dans les secrets GitHub Actions ou dans un fichier `.env` local non commité.
