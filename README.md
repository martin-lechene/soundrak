# 🎵 Soundrak - Tone.js Music Generator

Une application web interactive qui génère 10 compositions musicales différentes en utilisant Tone.js, avec interface utilisateur moderne et visualisation audio.

## 🎶 Compositions Disponibles

### Électronique
- **Techno** - Kicks répétitifs, bassline hypnotique, hi-hats (128 BPM)
- **Hardcore** - Tempo rapide, kicks distordus, breaks (180 BPM)
- **Tekno** - Sons industriels, rythmes tribaux, minimal (140 BPM)
- **House** - Groove 4/4, bassline funky, piano chords (124 BPM)

### Hip-Hop
- **RAP Boom Bap** - Drums samplés, bassline lourde, scratches (90 BPM)
- **RAP Trap** - Hi-hats rapides, 808 bass, snaps (140 BPM)

### Pop
- **Pop Mélodique** - Synths lumineux, progression d'accords (115 BPM)
- **Dance Pop** - Énergique, hooks synth, builds/drops (128 BPM)

### Expérimental
- **Experimental 1** - Mix créatif de styles (110 BPM)
- **Experimental 2** - Exploration sonore avancée (135 BPM)

## 🚀 Fonctionnalités

### Interface Utilisateur
- **Design moderne** - Interface dark theme avec animations
- **Sélection de musique** - Cartes interactives pour chaque composition
- **Contrôles de lecture** - Play/Pause/Stop pour chaque musique

### Contrôles Avancés
- **Volume Master** - Contrôle du volume global
- **Tempo/BPM** - Ajustement du tempo en temps réel
- **Effets Audio** :
  - Reverb (avec contrôle d'intensité)
  - Delay (avec contrôle de feedback)
  - Distortion (avec contrôle d'intensité)

### Visualisation Audio
- **Analyseur de fréquences** - Barres de fréquences en temps réel
- **Waveform** - Visualisation de la forme d'onde
- **Canvas interactif** - Rendu fluide et responsive

## 🛠️ Technologies Utilisées

- **Tone.js** - Framework audio Web pour la synthèse et la composition
- **HTML5 Canvas** - Visualisation audio
- **Vanilla JavaScript** - Logique de l'application
- **CSS3** - Animations et design responsive
- **Web Audio API** - Traitement audio en temps réel

## 📦 Installation

1. **Cloner le projet**
   ```bash
   git clone <repository-url>
   cd soundrak
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Démarrer le serveur de développement**
   ```bash
   npm start
   ```

4. **Ouvrir dans le navigateur**
   ```
   http://localhost:3000
   ```

## 🎵 Architecture Musicale

### Structure des Compositions
Chaque composition musicale est une classe JavaScript qui implémente :

- `start()` - Démarre la composition
- `stop()` - Arrête la composition
- `pause()` - Met en pause
- `resume()` - Reprend la lecture
- `setVolume(level)` - Ajuste le volume
- `setTempo(bpm)` - Ajuste le tempo
- `toggleEffect(effect, enabled)` - Active/désactive les effets
- `setEffectAmount(effect, amount)` - Ajuste l'intensité des effets

### Instruments Utilisés
- **Synthétiseurs** - MonoSynth, PolySynth, MembraneSynth
- **Percussions** - NoiseSynth pour les drums
- **Effets** - Reverb, Delay, Distortion, Filter, Chorus, Tremolo
- **Modulation** - Envelope, FilterEnvelope, LFO

### Patterns Rythmiques
- **Loops** - Utilisation de Tone.Loop pour les patterns répétitifs
- **Transport** - Synchronisation avec Tone.Transport
- **Scheduling** - Programmation précise des événements audio

## 🎛️ Contrôles Disponibles

### Volume Master
- Slider de 0 à 100%
- Application en temps réel à tous les instruments

### Tempo
- Slider de 60 à 200 BPM
- Synchronisation avec Tone.Transport

### Effets
- **Reverb** - Ambiance et espace
- **Delay** - Échos et répétitions
- **Distortion** - Saturation et punch

## 🎨 Design

### Interface
- **Dark Theme** - Palette de couleurs sombre et moderne
- **Gradients** - Dégradés bleus pour les accents
- **Animations** - Transitions fluides et effets hover
- **Responsive** - Adaptation mobile et desktop

### Visualisation
- **Couleurs** - Palette bleue cohérente avec l'interface
- **Rendu** - Canvas HTML5 optimisé
- **Performance** - 60 FPS pour la visualisation

## 🔧 Développement

### Structure du Projet
```
soundrak/
├── index.html          # Page principale
├── styles.css          # Styles CSS
├── app.js             # Logique de l'application
├── visualizer.js     # Visualisation audio
├── music/            # Compositions musicales
│   ├── techno.js
│   ├── hardcore.js
│   ├── tekno.js
│   ├── house.js
│   ├── rap1.js
│   ├── rap2.js
│   ├── pop1.js
│   ├── pop2.js
│   ├── experimental1.js
│   └── experimental2.js
├── package.json      # Dépendances
└── README.md        # Documentation
```

### Scripts Disponibles
- `npm start` - Démarre le serveur de développement
- `npm run dev` - Démarre avec ouverture automatique du navigateur

## 🎯 Utilisation

1. **Sélectionner une musique** - Cliquer sur une carte de composition
2. **Contrôler la lecture** - Utiliser les boutons Play/Pause/Stop
3. **Ajuster les paramètres** - Modifier volume, tempo et effets
4. **Visualiser l'audio** - Observer l'analyseur de fréquences

## 🎵 Styles Musicaux

### Techno
- Kicks 4/4 répétitifs
- Bassline hypnotique
- Hi-hats et synths acides
- Tempo : 120-130 BPM

### Hardcore
- Tempo rapide (160-200 BPM)
- Kicks distordus et agressifs
- Breaks complexes
- Hoover synths

### House
- Groove 4/4 caractéristique
- Claps sur les 2 et 4
- Bassline funky
- Piano/organ chords

### RAP
- **Boom Bap** : Drums samplés, snare claps, bassline lourde
- **Trap** : Hi-hats rapides, 808 bass, rolls

### Pop
- **Mélodique** : Synths lumineux, progression d'accords
- **Dance** : Hooks accrocheurs, builds/drops

### Expérimental
- Combinaisons créatives
- Sons industriels et numériques
- Patterns complexes et variations

## 📱 Compatibilité

- **Navigateurs** : Chrome, Firefox, Safari, Edge
- **Mobile** : Responsive design
- **Audio** : Web Audio API supporté

## 🎉 Crédits

- **Tone.js** - Framework audio Web
- **Web Audio API** - API audio du navigateur
- **Soundrak** - Application développée avec ❤️

---

*Powered by Tone.js | Soundrak 2024*
