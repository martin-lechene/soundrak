class TechnoMusic {
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
        // Kick drum - le cœur du techno
        this.kick = new Tone.MembraneSynth({
            pitchDecay: 0.05,
            octaves: 10,
            oscillator: {
                type: "triangle"
            },
            envelope: {
                attack: 0.01,
                decay: 0.3,
                sustain: 0.1,
                release: 0.3
            }
        });

        // Bassline hypnotique
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
                sustain: 0.4,
                release: 0.5
            },
            filterEnvelope: {
                attack: 0.01,
                decay: 0.3,
                sustain: 0.2,
                release: 0.5,
                baseFrequency: 200,
                octaves: 2
            }
        });

        // Hi-hats
        this.hihat = new Tone.NoiseSynth({
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

        // Synth lead acide
        this.lead = new Tone.MonoSynth({
            oscillator: {
                type: "sawtooth"
            },
            filter: {
                Q: 8,
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
                baseFrequency: 1000,
                octaves: 3
            }
        });

        // Analyser pour la visualisation
        this.analyser = new Tone.Analyser("waveform", 1024);
    }

    setupEffects() {
        // Reverb
        this.reverb = new Tone.Reverb({
            decay: 2,
            preDelay: 0.01
        });

        // Delay
        this.delay = new Tone.FeedbackDelay({
            delayTime: "8n",
            feedback: 0.3
        });

        // Distortion
        this.distortion = new Tone.Distortion(0.1);

        // Filter pour les effets
        this.filter = new Tone.Filter({
            frequency: 2000,
            type: "lowpass",
            rolloff: -24
        });
    }

    setupLoops() {
        // Kick pattern - 4/4 techno
        this.kickLoop = new Tone.Loop((time) => {
            this.kick.triggerAttackRelease("C1", "8n", time);
        }, "4n");

        // Bassline pattern
        this.bassLoop = new Tone.Loop((time) => {
            const bassNotes = ["C2", "C2", "C2", "C2", "F2", "F2", "C2", "C2"];
            const note = bassNotes[Math.floor(time * 2) % bassNotes.length];
            this.bass.triggerAttackRelease(note, "8n", time);
        }, "4n");

        // Hi-hat pattern
        this.hihatLoop = new Tone.Loop((time) => {
            this.hihat.triggerAttackRelease("8n", time);
        }, "8n");

        // Lead pattern - plus complexe
        this.leadLoop = new Tone.Loop((time) => {
            const leadNotes = ["C4", "D#4", "F4", "G4", "A#4", "G4", "F4", "D#4"];
            const note = leadNotes[Math.floor(time * 2) % leadNotes.length];
            this.lead.triggerAttackRelease(note, "4n", time);
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
        this.hihat.connect(masterGain);
        this.lead.connect(masterGain);
        
        // Appliquer les effets si activés
        this.updateEffects();
    }

    start() {
        if (this.isPlaying) return;
        
        this.connectToOutput();
        
        // Démarrer les loops
        this.kickLoop.start(0);
        this.bassLoop.start(0);
        this.hihatLoop.start(0);
        this.leadLoop.start("1m"); // Lead commence après 1 mesure
        
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
        this.hihatLoop.stop();
        this.leadLoop.stop();
        
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
        this.hihat.volume.value = Tone.gainToDb(level * 0.6);
        this.lead.volume.value = Tone.gainToDb(level * 0.7);
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
            this.reverb.decay = this.effects.reverb.amount * 3;
        }
    }
}

// Export pour utilisation globale
window.TechnoMusic = TechnoMusic;
