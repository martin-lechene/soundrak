class HardcoreMusic {
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
        // Kick distordu et agressif
        this.kick = new Tone.MembraneSynth({
            pitchDecay: 0.01,
            octaves: 12,
            oscillator: {
                type: "sine"
            },
            envelope: {
                attack: 0.001,
                decay: 0.1,
                sustain: 0.1,
                release: 0.1
            }
        });

        // Bassline lourde et distordue
        this.bass = new Tone.MonoSynth({
            oscillator: {
                type: "sawtooth"
            },
            filter: {
                Q: 1,
                type: "lowpass",
                rolloff: -12
            },
            envelope: {
                attack: 0.01,
                decay: 0.2,
                sustain: 0.8,
                release: 0.3
            },
            filterEnvelope: {
                attack: 0.01,
                decay: 0.1,
                sustain: 0.1,
                release: 0.1,
                baseFrequency: 80,
                octaves: 4
            }
        });

        // Snare claquante
        this.snare = new Tone.NoiseSynth({
            noise: {
                type: "white"
            },
            envelope: {
                attack: 0.01,
                decay: 0.1,
                sustain: 0.1,
                release: 0.1
            }
        });

        // Hoover synth - signature du hardcore
        this.hoover = new Tone.MonoSynth({
            oscillator: {
                type: "sawtooth"
            },
            filter: {
                Q: 10,
                type: "lowpass",
                rolloff: -24
            },
            envelope: {
                attack: 0.01,
                decay: 0.3,
                sustain: 0.1,
                release: 0.5
            },
            filterEnvelope: {
                attack: 0.01,
                decay: 0.3,
                sustain: 0.1,
                release: 0.5,
                baseFrequency: 200,
                octaves: 4
            }
        });

        // Hi-hats rapides
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
        // Distortion agressive
        this.distortion = new Tone.Distortion(0.8);
        
        // Reverb pour l'ambiance
        this.reverb = new Tone.Reverb({
            decay: 1,
            preDelay: 0.01
        });

        // Delay pour les effets
        this.delay = new Tone.FeedbackDelay({
            delayTime: "16n",
            feedback: 0.4
        });

        // Filter pour les breaks
        this.filter = new Tone.Filter({
            frequency: 2000,
            type: "lowpass",
            rolloff: -24
        });

        // Compressor pour le punch
        this.compressor = new Tone.Compressor({
            threshold: -20,
            ratio: 12,
            attack: 0.01,
            release: 0.1
        });
    }

    setupLoops() {
        // Kick pattern - 4/4 hardcore
        this.kickLoop = new Tone.Loop((time) => {
            this.kick.triggerAttackRelease("C1", "16n", time);
        }, "4n");

        // Snare pattern - sur les 2 et 4
        this.snareLoop = new Tone.Loop((time) => {
            this.snare.triggerAttackRelease("16n", time);
        }, "2n");

        // Hi-hat pattern rapide
        this.hihatLoop = new Tone.Loop((time) => {
            this.hihat.triggerAttackRelease("32n", time);
        }, "16n");

        // Bassline pattern
        this.bassLoop = new Tone.Loop((time) => {
            const bassNotes = ["C2", "C2", "C2", "C2", "F2", "F2", "C2", "C2"];
            const note = bassNotes[Math.floor(time * 4) % bassNotes.length];
            this.bass.triggerAttackRelease(note, "8n", time);
        }, "2n");

        // Hoover pattern - plus complexe
        this.hooverLoop = new Tone.Loop((time) => {
            const hooverNotes = ["C3", "D#3", "F3", "G3", "A#3", "G3", "F3", "D#3"];
            const note = hooverNotes[Math.floor(time * 2) % hooverNotes.length];
            this.hoover.triggerAttackRelease(note, "4n", time);
        }, "4n");

        // Break pattern - variation rythmique
        this.breakLoop = new Tone.Loop((time) => {
            // Pattern de break complexe
            const breakTimes = [0, 0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75];
            const currentTime = time % 2;
            if (breakTimes.includes(Math.round(currentTime * 4) / 4)) {
                this.kick.triggerAttackRelease("C1", "16n", time);
            }
        }, "2n");
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
        this.snare.connect(masterGain);
        this.hoover.connect(masterGain);
        this.hihat.connect(masterGain);
        
        // Appliquer les effets si activés
        this.updateEffects();
    }

    start() {
        if (this.isPlaying) return;
        
        this.connectToOutput();
        
        // Démarrer les loops
        this.kickLoop.start(0);
        this.snareLoop.start(0);
        this.hihatLoop.start(0);
        this.bassLoop.start(0);
        this.hooverLoop.start("2m"); // Hoover commence après 2 mesures
        this.breakLoop.start("4m"); // Break commence après 4 mesures
        
        // Démarrer le transport
        Tone.getTransport().start();
        
        this.isPlaying = true;
        this.isPaused = false;
    }

    stop() {
        if (!this.isPlaying) return;
        
        // Arrêter les loops
        this.kickLoop.stop();
        this.snareLoop.stop();
        this.hihatLoop.stop();
        this.bassLoop.stop();
        this.hooverLoop.stop();
        this.breakLoop.stop();
        
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
        this.bass.volume.value = Tone.gainToDb(level * 0.9);
        this.snare.volume.value = Tone.gainToDb(level * 0.8);
        this.hoover.volume.value = Tone.gainToDb(level * 0.7);
        this.hihat.volume.value = Tone.gainToDb(level * 0.6);
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
            this.reverb.decay = this.effects.reverb.amount * 2;
        }
    }
}

// Export pour utilisation globale
window.HardcoreMusic = HardcoreMusic;
