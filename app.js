class MusicApp {
    constructor() {
        this.currentMusic = null;
        this.visualizer = null;
        this.masterVolume = 0.7;
        this.tempo = 120;
        this.effects = {
            reverb: { enabled: false, amount: 0.3 },
            delay: { enabled: false, amount: 0.2 },
            distortion: { enabled: false, amount: 0.1 }
        };
        
        this.musicCompositions = [
            { id: 'techno', name: 'Techno', description: 'Kicks répétitifs, bassline hypnotique', bpm: 128, class: 'TechnoMusic' },
            { id: 'hardcore', name: 'Hardcore', description: 'Tempo rapide, kicks distordus', bpm: 180, class: 'HardcoreMusic' },
            { id: 'tekno', name: 'Tekno', description: 'Sons industriels, rythmes tribaux', bpm: 140, class: 'TeknoMusic' },
            { id: 'house', name: 'House', description: 'Groove 4/4, bassline funky', bpm: 124, class: 'HouseMusic' },
            { id: 'rap1', name: 'RAP Boom Bap', description: 'Drums samplés, bassline lourde', bpm: 90, class: 'Rap1Music' },
            { id: 'rap2', name: 'RAP Trap', description: 'Hi-hats rapides, 808 bass', bpm: 140, class: 'Rap2Music' },
            { id: 'pop1', name: 'Pop Mélodique', description: 'Synths lumineux, progression d\'accords', bpm: 115, class: 'Pop1Music' },
            { id: 'pop2', name: 'Dance Pop', description: 'Énergique, hooks synth', bpm: 128, class: 'Pop2Music' },
            { id: 'experimental1', name: 'Experimental 1', description: 'Mix créatif de styles', bpm: 110, class: 'Experimental1Music' },
            { id: 'experimental2', name: 'Experimental 2', description: 'Exploration sonore avancée', bpm: 135, class: 'Experimental2Music' }
        ];
        
        this.init();
    }

    async init() {
        try {
            // Vérifier que Tone.js est chargé
            if (typeof Tone === 'undefined') {
                console.error('Tone.js n\'est pas chargé');
                return;
            }
            
            // Initialiser Tone.js
            await Tone.start();
            console.log('Tone.js initialisé');
            
            // Créer le visualiseur
            this.visualizer = new AudioVisualizer('visualizer');
            
            // Créer l'interface
            this.createMusicInterface();
            this.setupControls();
            this.setupEventListeners();
            
            console.log('Application initialisée');
        } catch (error) {
            console.error('Erreur lors de l\'initialisation:', error);
        }
    }

    createMusicInterface() {
        console.log('🎵 Création de l\'interface musicale...');
        const musicGrid = document.getElementById('musicGrid');
        
        if (!musicGrid) {
            console.error('❌ Élément musicGrid non trouvé');
            return;
        }
        
        musicGrid.innerHTML = '';
        console.log(`📝 Création de ${this.musicCompositions.length} cartes musicales`);

        this.musicCompositions.forEach((music, index) => {
            const card = document.createElement('div');
            card.className = 'music-card';
            card.id = `music-${music.id}`;
            card.innerHTML = `
                <h3>${music.name}</h3>
                <p>${music.description}</p>
                <p><strong>BPM:</strong> ${music.bpm}</p>
                <div class="music-controls">
                    <button class="btn btn-primary" onclick="app.playMusic('${music.id}')">
                        ▶️ Play
                    </button>
                    <button class="btn btn-secondary" onclick="app.stopMusic()" disabled>
                        ⏹️ Stop
                    </button>
                </div>
            `;
            musicGrid.appendChild(card);
            console.log(`✅ Carte créée: ${music.name}`);
        });
        
        console.log('🎉 Interface musicale créée avec succès');
        
        // Masquer le message de chargement
        if (typeof window.hideLoadingMessage === 'function') {
            window.hideLoadingMessage();
        }
    }

    setupControls() {
        // Volume master
        const volumeSlider = document.getElementById('masterVolume');
        const volumeDisplay = document.getElementById('volumeDisplay');
        
        volumeSlider.addEventListener('input', (e) => {
            this.masterVolume = parseFloat(e.target.value);
            volumeDisplay.textContent = Math.round(this.masterVolume * 100) + '%';
            if (this.currentMusic) {
                this.currentMusic.setVolume(this.masterVolume);
            }
        });

        // Tempo
        const tempoSlider = document.getElementById('tempo');
        const tempoDisplay = document.getElementById('tempoDisplay');
        
        tempoSlider.addEventListener('input', (e) => {
            this.tempo = parseInt(e.target.value);
            tempoDisplay.textContent = this.tempo + ' BPM';
            Tone.getTransport().bpm.value = this.tempo;
        });

        // Effets
        this.setupEffectControls();
    }

    setupEffectControls() {
        // Reverb
        const reverbToggle = document.getElementById('reverbToggle');
        const reverbAmount = document.getElementById('reverbAmount');
        
        reverbToggle.addEventListener('change', (e) => {
            this.effects.reverb.enabled = e.target.checked;
            reverbAmount.disabled = !e.target.checked;
            if (this.currentMusic) {
                this.currentMusic.toggleEffect('reverb', this.effects.reverb.enabled);
            }
        });
        
        reverbAmount.addEventListener('input', (e) => {
            this.effects.reverb.amount = parseFloat(e.target.value);
            if (this.currentMusic && this.effects.reverb.enabled) {
                this.currentMusic.setEffectAmount('reverb', this.effects.reverb.amount);
            }
        });

        // Delay
        const delayToggle = document.getElementById('delayToggle');
        const delayAmount = document.getElementById('delayAmount');
        
        delayToggle.addEventListener('change', (e) => {
            this.effects.delay.enabled = e.target.checked;
            delayAmount.disabled = !e.target.checked;
            if (this.currentMusic) {
                this.currentMusic.toggleEffect('delay', this.effects.delay.enabled);
            }
        });
        
        delayAmount.addEventListener('input', (e) => {
            this.effects.delay.amount = parseFloat(e.target.value);
            if (this.currentMusic && this.effects.delay.enabled) {
                this.currentMusic.setEffectAmount('delay', this.effects.delay.amount);
            }
        });

        // Distortion
        const distortionToggle = document.getElementById('distortionToggle');
        const distortionAmount = document.getElementById('distortionAmount');
        
        distortionToggle.addEventListener('change', (e) => {
            this.effects.distortion.enabled = e.target.checked;
            distortionAmount.disabled = !e.target.checked;
            if (this.currentMusic) {
                this.currentMusic.toggleEffect('distortion', this.effects.distortion.enabled);
            }
        });
        
        distortionAmount.addEventListener('input', (e) => {
            this.effects.distortion.amount = parseFloat(e.target.value);
            if (this.currentMusic && this.effects.distortion.enabled) {
                this.currentMusic.setEffectAmount('distortion', this.effects.distortion.amount);
            }
        });
    }

    setupEventListeners() {
        // Redimensionnement du canvas
        window.addEventListener('resize', () => {
            this.visualizer.resize();
        });
    }

    async playMusic(musicId) {
        try {
            // Arrêter la musique actuelle
            if (this.currentMusic) {
                this.currentMusic.stop();
            }

            // Trouver la composition
            const musicInfo = this.musicCompositions.find(m => m.id === musicId);
            if (!musicInfo) {
                console.error('Musique non trouvée:', musicId);
                return;
            }

            // Créer l'instance de musique
            const MusicClass = window[musicInfo.class];
            if (!MusicClass) {
                console.error('Classe de musique non trouvée:', musicInfo.class);
                return;
            }

            this.currentMusic = new MusicClass();
            
            // Configurer les effets
            this.currentMusic.toggleEffect('reverb', this.effects.reverb.enabled);
            this.currentMusic.toggleEffect('delay', this.effects.delay.enabled);
            this.currentMusic.toggleEffect('distortion', this.effects.distortion.enabled);
            
            if (this.effects.reverb.enabled) {
                this.currentMusic.setEffectAmount('reverb', this.effects.reverb.amount);
            }
            if (this.effects.delay.enabled) {
                this.currentMusic.setEffectAmount('delay', this.effects.delay.amount);
            }
            if (this.effects.distortion.enabled) {
                this.currentMusic.setEffectAmount('distortion', this.effects.distortion.amount);
            }

            // Configurer le volume et tempo
            this.currentMusic.setVolume(this.masterVolume);
            Tone.getTransport().bpm.value = musicInfo.bpm;
            
            // Connecter au visualiseur
            if (this.currentMusic.analyser) {
                this.visualizer.connectAnalyser(this.currentMusic.analyser);
            }

            // Démarrer la musique
            this.currentMusic.start();
            
            // Mettre à jour l'interface
            this.updateMusicInterface(musicId);
            
            console.log(`Musique ${musicInfo.name} démarrée`);
        } catch (error) {
            console.error('Erreur lors de la lecture:', error);
        }
    }

    stopMusic() {
        if (this.currentMusic) {
            this.currentMusic.stop();
            this.currentMusic = null;
            this.visualizer.stopVisualization();
            this.updateMusicInterface(null);
            console.log('Musique arrêtée');
        }
    }

    updateMusicInterface(activeMusicId) {
        // Mettre à jour les cartes de musique
        this.musicCompositions.forEach(music => {
            const card = document.getElementById(`music-${music.id}`);
            const playBtn = card.querySelector('.btn-primary');
            const stopBtn = card.querySelector('.btn-secondary');
            
            if (music.id === activeMusicId) {
                card.classList.add('active', 'playing');
                playBtn.textContent = '⏸️ Pause';
                playBtn.onclick = () => this.pauseMusic();
                stopBtn.disabled = false;
            } else {
                card.classList.remove('active', 'playing');
                playBtn.textContent = '▶️ Play';
                playBtn.onclick = () => this.playMusic(music.id);
                stopBtn.disabled = true;
            }
        });
    }

    pauseMusic() {
        if (this.currentMusic) {
            if (this.currentMusic.isPaused) {
                this.currentMusic.resume();
                this.updateMusicInterface(this.getCurrentMusicId());
            } else {
                this.currentMusic.pause();
                this.updateMusicInterface(null);
            }
        }
    }
    
    getCurrentMusicId() {
        if (!this.currentMusic) return null;
        return this.musicCompositions.find(m => 
            window[m.class] === this.currentMusic.constructor
        )?.id || null;
    }
}

// L'application sera initialisée depuis index.html après le chargement de Tone.js
