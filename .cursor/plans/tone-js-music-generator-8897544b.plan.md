<!-- 8897544b-7285-4f04-8c81-d59f771baf95 c0289617-dce8-439d-8778-0a3a46e94425 -->
# Plan: 10 Visualisations Audio Spectrum UI/UX

## Vue d'ensemble

Créer 10 styles de visualisation audio spectrum différents inspirés de l'image fournie (barres horizontales avec flèches) et permettre à l'utilisateur de basculer entre ces modes.

## Structure proposée

### 1. Architecture du code

Modifier `visualizer.js` pour :

- Ajouter une propriété `visualizationMode` (valeurs: 1-10)
- Créer 10 méthodes de dessin différentes
- Ajouter une méthode `setVisualizationMode(mode)` pour changer le style
- Garder la compatibilité avec le code existant

### 2. Les 10 Styles de Visualisation

#### Mode 1: Spectrum Classique Vertical

- Barres verticales traditionnelles du bas vers le haut
- Gradient bleu (#4a9eff) vers cyan (#00d4ff)
- 64 barres

#### Mode 2: Spectrum Horizontal (comme l'image)

- Barres horizontales de gauche à droite
- Style épuré avec bordures
- Flèches de navigation gauche/droite
- Gradient horizontal

#### Mode 3: Spectrum Circulaire

- Barres disposées en cercle (360°)
- Centre du canvas comme origine
- Rotation continue des couleurs
- 48 barres autour du cercle

#### Mode 4: Spectrum Miroir Vertical

- Barres verticales partant du centre vers haut et bas
- Effet de symétrie
- Gradient symétrique

#### Mode 5: Spectrum 3D Perspective

- Barres avec effet de profondeur
- Ombre portée et perspective
- Couleurs plus foncées pour l'arrière-plan

#### Mode 6: Spectrum Particules

- Points lumineux animés basés sur les fréquences
- Effet de traînée (ghosting)
- Particules colorées

#### Mode 7: Spectrum Radial

- Barres partant du centre vers l'extérieur en étoile
- 32 rayons
- Couleurs arc-en-ciel

#### Mode 8: Spectrum Waveform Stylisé

- Forme d'onde continue avec remplissage
- Effet de glow/lueur
- Courbes lissées (Bézier)

#### Mode 9: Spectrum Matrix/Grille

- Grille de points lumineux (10x10)
- Intensité basée sur les fréquences
- Style néon vert/bleu

#### Mode 10: Spectrum Liquide/Blob

- Formes organiques qui bougent
- Effet de métaballs
- Animation fluide

### 3. Interface de sélection

Ajouter dans `index.html` une section de contrôle:

```html
<div class="visualization-controls">
  <label>Style de visualisation:</label>
  <select id="vizMode">
    <option value="1">Classique Vertical</option>
    <option value="2">Horizontal (Barres)</option>
    <option value="3">Circulaire</option>
    <option value="4">Miroir Vertical</option>
    <option value="5">3D Perspective</option>
    <option value="6">Particules</option>
    <option value="7">Radial</option>
    <option value="8">Waveform Stylisé</option>
    <option value="9">Matrix/Grille</option>
    <option value="10">Liquide/Blob</option>
  </select>
</div>
```

### 4. Connexion avec app.js

Dans `app.js`, ajouter la gestion du changement de mode:

```javascript
// Dans setupControls()
const vizModeSelect = document.getElementById('vizMode');
vizModeSelect.addEventListener('change', (e) => {
    this.visualizer.setVisualizationMode(parseInt(e.target.value));
});
```

### 5. Styles CSS

Ajouter dans `styles.css`:

```css
.visualization-controls {
    margin: 20px 0;
    display: flex;
    align-items: center;
    gap: 10px;
}

.visualization-controls select {
    padding: 8px 12px;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid #4a9eff;
    border-radius: 5px;
    color: white;
    cursor: pointer;
}
```

## Fichiers à modifier

1. **visualizer.js** - Ajouter les 10 méthodes de visualisation
2. **index.html** - Ajouter le sélecteur de mode
3. **app.js** - Connecter le sélecteur avec le visualizer
4. **styles.css** - Styliser le sélecteur

## Priorité de développement

1. Mode 2 (Horizontal) - Le plus demandé (image fournie)
2. Mode 1 (Classique) - Déjà existant, à garder
3. Mode 3 (Circulaire) - Effet visuel intéressant
4. Mode 8 (Waveform) - Élégant et performant
5. Modes 4-10 - À implémenter ensuite

## Performance

- Utiliser `requestAnimationFrame` pour toutes les animations
- Limiter le nombre d'éléments dessinés selon le mode
- Optimiser les calculs mathématiques (pré-calculer les angles, positions)
- Ajouter une option de qualité (haute/moyenne/basse)

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