# Asset pipeline

Chaque image, vidéo, audio ou police utilisée dans une production doit être enregistré dans `manifest.json`.

Un asset doit conserver :

- son identifiant ;
- son provider ;
- son URL source ;
- son auteur ;
- sa licence ;
- sa date de récupération ;
- son chemin local ;
- ses conditions d'utilisation ;
- son usage dans la vidéo.

Providers prévus :

- Figma ;
- Unsplash ;
- Pexels ;
- Pixabay ;
- Wikimedia Commons ;
- fichiers locaux ;
- assets générés par IA.

Aucune clé API ne doit être commitée dans le repository.
Aucun asset ne doit être utilisé en production sans source et licence identifiables.
