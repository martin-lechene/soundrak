<!-- 8897544b-7285-4f04-8c81-d59f771baf95 ad26ccb2-30d0-4490-823e-07c9f1e07fc2 -->
# Application Musicale Tone.js avec 10 Compositions

## Structure du Projet

Créer une application web vanilla (HTML/CSS/JS) avec:

- `index.html` - Page principale avec interface utilisateur
- `styles.css` - Styling moderne et responsive
- `app.js` - Gestion de l'interface et initialisation
- `music/` - Dossier contenant les 10 compositions musicales
- `techno.js` - Musique Techno (kicks répétitifs, basslines, hi-hats)
- `hardcore.js` - Hardcore (tempo rapide ~180 BPM, kicks distordus)
- `tekno.js` - Tekno (sons industriels, rythmes tribaux)
- `house.js` - House (groove 4/4, bassline funky, piano chords)
- `rap1.js` - RAP style 1 (boom bap, samples, drums lourds)
- `rap2.js` - RAP style 2 (trap, hi-hats rapides, 808 bass)
- `pop1.js` - Pop style 1 (mélodique, synths lumineux)
- `pop2.js` - Pop style 2 (dance-pop, hooks accrocheurs)
- `experimental1.js` - Mix expérimental 1
- `experimental2.js` - Mix expérimental 2
- `visualizer.js` - Visualisation audio (waveform/frequency analyzer)
- `package.json` - Dépendances du projet

## Fonctionnalités de l'Interface

- **Liste des musiques** avec sélection visuelle
- **Contrôles de lecture**: Play/Pause/Stop pour chaque musique
- **Contrôles avancés**:
- Volume master (slider)
- Tempo/BPM (slider avec display)
- Effets (reverb, delay, distortion) avec toggles et paramètres
- **Visualisation audio**: Canvas avec analyzer de fréquences et waveform
- **Design moderne**: Interface dark theme, animations, responsive

## Architecture des Musiques

Chaque fichier musique exportera une classe avec:

- `start()` - Démarre la composition
- `stop()` - Arrête la composition
- `setTempo(bpm)` - Ajuste le tempo
- `setVolume(level)` - Ajuste le volume
- `toggleEffect(effect, enabled)` - Active/désactive effets
- Utilisation de `Tone.Transport`, `Tone.Loop`, `Tone.Pattern`
- Instruments appropriés au style (synths, samplers, drums)
- Effets adaptés (distortion, reverb, delay, filters)

## Caractéristiques par Style

**Techno**: Kicks 4/4 répétitifs, bassline hypnotique, hi-hats, synths acides (120-130 BPM)

**Hardcore**: Tempo rapide (160-200 BPM), kicks distordus, breaks, hoover synths

**Tekno**: Sons industriels, rythmes tribaux, minimal, acid (135-150 BPM)

**House**: Groove 4/4, claps, bassline funky, piano/organ chords (120-128 BPM)

**RAP (Boom Bap)**: Drums samplés, snare claps, bassline lourde, scratches (85-95 BPM)

**RAP (Trap)**: Hi-hats rapides (rolls), 808 bass slides, snaps (140 BPM)

**Pop 1**: Synths mélodiques, drums électroniques, progression d'accords (110-120 BPM)

**Pop 2**: Dance-pop énergique, hooks synth, builds/drops (125-130 BPM)

**Experimental**: Combinaisons créatives des éléments ci-dessus

## Technologies

- **Tone.js** (via CDN unpkg.com) pour la synthèse audio
- **HTML5 Canvas** pour la visualisation
- **Vanilla JavaScript** (ES6+)
- **CSS3** avec animations et transitions

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