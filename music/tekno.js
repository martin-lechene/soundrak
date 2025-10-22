class TeknoMusic {
    constructor() {
        this.isPlaying = false;
        this.isPaused = false;
        this.volume = 0.7;
        this.effects = {
            reverb: { enabled: false, amount: 0.3 },
            delay: { enabled: false, amount: 0.2 },
            distortion: { enabled: false, amount: 0.1 }
        };
        
        this.setupInstruments();
        this.setupEffects();
        this.setupLoops();
    }

    setupInstruments() {
        // Kick industriel
        this.kick = new Tone.MembraneSynth({
            pitchDecay: 0.02,
            octaves: 8,
            oscillator: {
                type: "triangle"
            },
            envelope: {
                attack: 0.001,
                decay: 0.2,
                sustain: 0.1,
                release: 0.2
            }
        });

        // Bassline industrielle
        this.bass = new Tone.MonoSynth({
            oscillator: {
                type: "sawtooth"
            },
            filter: {
                Q: 2,
                type: "lowpass",
                rolloff: -24
            },
            envelope: {
                attack: 0.01,
                decay: 0.3,
                sustain: 0.6,
                release: 0.4
            },
            filterEnvelope: {
                attack: 0.01,
                decay: 0.2,
                sustain: 0.3,
                release: 0.4,
                baseFrequency: 100,
                octaves: 3
            }
        });

        // Percussions tribales
        this.tribal = new Tone.NoiseSynth({
            noise: {
                type: "brown"
            },
            envelope: {
                attack: 0.001,
                decay: 0.1,
                sustain: 0.1,
                release: 0.1
            }
        });

        // Synth acide
        this.acid = new Tone.MonoSynth({
            oscillator: {
                type: "sawtooth"
            },
            filter: {
                Q: 12,
                type: "lowpass",
                rolloff: -24
            },
            envelope: {
                attack: 0.01,
                decay: 0.3,
                sustain: 0.1,
                release: 0.3
            },
            filterEnvelope: {
                attack: 0.01,
                decay: 0.3,
                sustain: 0.1,
                release: 0.3,
                baseFrequency: 800,
                octaves: 4
            }
        });

        // Hi-hats métalliques
        this.hihat = new Tone.NoiseSynth({
            noise: {
                type: "white"
            },
            envelope: {
                attack: 0.001,
                decay: 0.05,
                sustain: 0.01,
                release: 0.05
            }
        });

        // Analyser pour la visualisation
        this.analyser = new Tone.Analyser("waveform", 1024);
    }

    setupEffects() {
        // Distortion industrielle
        this.distortion = new Tone.Distortion(0.6);
        
        // Reverb pour l'espace
        this.reverb = new Tone.Reverb({
            decay: 1.5,
            preDelay: 0.01
        });

        // Delay pour les effets
        this.delay = new Tone.FeedbackDelay({
            delayTime: "8n",
            feedback: 0.3
        });

        // Filter pour les variations
        this.filter = new Tone.Filter({
            frequency: 1500,
            type: "lowpass",
            rolloff: -24
        });

        // Bitcrusher pour l'effet numérique
        this.bitcrusher = new Tone.BitCrusher({
            bits: 8,
            frequency: 0.5
        });
    }

    setupLoops() {
        // Kick pattern - 4/4 tekno
        this.kickLoop = new Tone.Loop((time) => {
            this.kick.triggerAttackRelease("C1", "8n", time);
        }, "4n");

        // Bassline pattern
        this.bassLoop = new Tone.Loop((time) => {
            const bassNotes = ["C2", "C2", "C2", "C2", "F2", "F2", "C2", "C2"];
            const note = bassNotes[Math.floor(time * 2) % bassNotes.length];
            this.bass.triggerAttackRelease(note, "8n", time);
        }, "4n");

        // Tribal pattern
        this.tribalLoop = new Tone.Loop((time) => {
            this.tribal.triggerAttackRelease("8n", time);
        }, "2n");

        // Acid pattern
        this.acidLoop = new Tone.Loop((time) => {
            const acidNotes = ["C3", "D#3", "F3", "G3", "A#3", "G3", "F3", "D#3"];
            const note = acidNotes[Math.floor(time * 2) % acidNotes.length];
            this.acid.triggerAttackRelease(note, "4n", time);
        }, "2n");

        // Hi-hat pattern
        this.hihatLoop = new Tone.Loop((time) => {
            this.hihat.triggerAttackRelease("16n", time);
        }, "8n");

        // Variation pattern
        this.variationLoop = new Tone.Loop((time) => {
            // Pattern de variation complexe
            const variationTimes = [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5];
            const currentTime = time % 4;
            if (variationTimes.includes(Math.round(currentTime * 2) / 2)) {
                this.tribal.triggerAttackRelease("4n", time);
            }
        }, "4n");
    }

    connectToOutput() {
        // Créer une chaîne d'effets simplifiée
        const masterGain = new Tone.Gain(1);
        
        // Connecter l'analyser
        masterGain.connect(this.analyser);
        this.analyser.toDestination();

        // Connecter les instruments directement au master
        this.kick.connect(masterGain);
        this.bass.connect(masterGain);
        this.tribal.connect(masterGain);
        this.acid.connect(masterGain);
        this.hihat.connect(masterGain);
        
        // Appliquer les effets si activés
        this.updateEffects();
    }

    start() {
        if (this.isPlaying) return;
        
        this.connectToOutput();
        
        // Démarrer les loops
        this.kickLoop.start(0);
        this.bassLoop.start(0);
        this.tribalLoop.start(0);
        this.acidLoop.start("1m"); // Acid commence après 1 mesure
        this.hihatLoop.start("2m"); // Hi-hat commence après 2 mesures
        this.variationLoop.start("4m"); // Variation commence après 4 mesures
        
        // Démarrer le transport
        Tone.getTransport().start();
        
        this.isPlaying = true;
        this.isPaused = false;
    }

    stop() {
        if (!this.isPlaying) return;
        
        // Arrêter les loops
        this.kickLoop.stop();
        this.bassLoop.stop();
        this.tribalLoop.stop();
        this.acidLoop.stop();
        this.hihatLoop.stop();
        this.variationLoop.stop();
        
        // Arrêter le transport
        Tone.getTransport().stop();
        
        this.isPlaying = false;
        this.isPaused = false;
    }

    pause() {
        if (this.isPlaying && !this.isPaused) {
            Tone.getTransport().pause();
            this.isPaused = true;
        }
    }

    resume() {
        if (this.isPlaying && this.isPaused) {
            Tone.getTransport().start();
            this.isPaused = false;
        }
    }

    setVolume(level) {
        this.volume = level;
        // Appliquer le volume à tous les instruments
        this.kick.volume.value = Tone.gainToDb(level);
        this.bass.volume.value = Tone.gainToDb(level * 0.8);
        this.tribal.volume.value = Tone.gainToDb(level * 0.7);
        this.acid.volume.value = Tone.gainToDb(level * 0.6);
        this.hihat.volume.value = Tone.gainToDb(level * 0.5);
    }

    setTempo(bpm) {
        Tone.getTransport().bpm.value = bpm;
    }

    toggleEffect(effect, enabled) {
        this.effects[effect].enabled = enabled;
        this.updateEffects();
    }

    setEffectAmount(effect, amount) {
        this.effects[effect].amount = amount;
        this.updateEffects();
    }

    updateEffects() {
        // Mettre à jour les paramètres des effets
        if (this.effects.distortion.enabled) {
            this.distortion.distortion = this.effects.distortion.amount;
        }
        if (this.effects.delay.enabled) {
            this.delay.feedback.value = this.effects.delay.amount;
        }
        if (this.effects.reverb.enabled) {
            this.reverb.decay = this.effects.reverb.amount * 2.5;
        }
    }
}

// Export pour utilisation globale
window.TeknoMusic = TeknoMusic;
