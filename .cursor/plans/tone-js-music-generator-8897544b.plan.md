<!-- 8897544b-7285-4f04-8c81-d59f771baf95 e7cf9928-ec7e-4e07-b7ff-899add70724b -->
# Plan de Correction des Erreurs Musicales

## Problèmes Identifiés

1. **RAP Trap (rap2.js)**: Erreur "Cannot read properties of undefined (reading 'connect')" à la ligne 219

   - Problème: La variable `this.bass` n'existe pas, mais le code utilise `this.bass808`

2. **Experimental 1 (experimental1.js)**: Erreur "Cannot read properties of undefined (reading 'connect')" à la ligne 235

   - Problème: La variable `this.snare` n'existe pas, mais le code utilise `this.percussion`

3. **Experimental 2 (experimental2.js)**: Erreur similaire à Experimental 1

   - Problème: Mêmes variables manquantes

4. **Vocal Bilingue**: Erreur "Classe de musique non trouvée: VocalMusic"

   - Problème: La classe n'est pas disponible globalement

## Actions à Effectuer

### 1. Corriger rap2.js (ligne 219)

Remplacer:

```javascript
this.bass.connect(masterGain);
```

Par:

```javascript
this.bass808.connect(masterGain);
```

### 2. Corriger experimental1.js (ligne 235)

Remplacer:

```javascript
this.snare.connect(masterGain);
```

Par:

```javascript
this.percussion.connect(masterGain);
```

### 3. Corriger experimental2.js (ligne 268)

Remplacer:

```javascript
this.snare.connect(masterGain);
```

Par:

```javascript
this.percussion.connect(masterGain);
```

### 4. Vérifier les autres instruments dans ces fichiers

- S'assurer que tous les instruments utilisés dans `connectToOutput()` correspondent aux instruments créés dans `setupInstruments()`

### 5. Tester toutes les musiques

- Vérifier que chaque bouton Play fonctionne sans erreur
- Confirmer que l'audio se joue correctement

## Fichiers à Modifier

- `music/rap2.js` (ligne 219)
- `music/experimental1.js` (ligne 235)
- `music/experimental2.js` (ligne 268)

## Note sur VocalMusic

La classe VocalMusic existe dans le fichier `music/vocal.js` et est chargée dans `index.html`. Le problème vient probablement du fait que la classe n'est pas disponible au moment de l'initialisation. Vérifier que le script est bien chargé et que la classe est disponible globalement.

### To-dos

- [ ] Créer la structure de base (HTML, CSS, package.json) et intégrer Tone.js
- [ ] Développer l'interface utilisateur avec tous les contrôles
- [ ] Implémenter la visualisation audio avec Canvas et Tone.js analyzer
- [ ] Créer les compositions Techno et Hardcore
- [ ] Créer les compositions Tekno et House
- [ ] Créer les deux compositions RAP (Boom Bap et Trap)
- [ ] Créer les deux compositions Pop
- [ ] Créer les deux compositions expérimentales
- [ ] Intégrer toutes les musiques avec l'interface et les contrôles
- [ ] Tester toutes les musiques et fonctionnalités, ajuster le design et les performances