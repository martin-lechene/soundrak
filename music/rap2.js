class Rap2Music {
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
        // Kick trap
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

        // Snare trap
        this.snare = new Tone.NoiseSynth({
            noise: {
                type: "white"
            },
            envelope: {
                attack: 0.001,
                decay: 0.1,
                sustain: 0.1,
                release: 0.1
            }
        });

        // 808 bass
        this.bass808 = new Tone.MonoSynth({
            oscillator: {
                type: "sine"
            },
            filter: {
                Q: 1,
                type: "lowpass",
                rolloff: -12
            },
            envelope: {
                attack: 0.01,
                decay: 0.5,
                sustain: 0.3,
                release: 0.8
            },
            filterEnvelope: {
                attack: 0.01,
                decay: 0.3,
                sustain: 0.2,
                release: 0.5,
                baseFrequency: 60,
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
                decay: 0.02,
                sustain: 0.01,
                release: 0.02
            }
        });

        // Hi-hats rolls
        this.hihatRoll = new Tone.NoiseSynth({
            noise: {
                type: "white"
            },
            envelope: {
                attack: 0.001,
                decay: 0.01,
                sustain: 0.01,
                release: 0.01
            }
        });

        // Lead synth trap
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
        // Reverb pour l'ambiance
        this.reverb = new Tone.Reverb({
            decay: 1,
            preDelay: 0.01
        });

        // Delay pour les effets
        this.delay = new Tone.FeedbackDelay({
            delayTime: "8n",
            feedback: 0.4
        });

        // Distortion pour le punch
        this.distortion = new Tone.Distortion(0.4);

        // Filter pour les variations
        this.filter = new Tone.Filter({
            frequency: 2000,
            type: "lowpass",
            rolloff: -24
        });

        // Compressor pour le punch
        this.compressor = new Tone.Compressor({
            threshold: -20,
            ratio: 10,
            attack: 0.01,
            release: 0.1
        });
    }

    setupLoops() {
        // Kick pattern - trap
        this.kickLoop = new Tone.Loop((time) => {
            this.kick.triggerAttackRelease("C1", "4n", time);
        }, "4n");

        // Snare pattern - sur les 2 et 4
        this.snareLoop = new Tone.Loop((time) => {
            this.snare.triggerAttackRelease("4n", time);
        }, "2n");

        // Hi-hat pattern rapide
        this.hihatLoop = new Tone.Loop((time) => {
            this.hihat.triggerAttackRelease("16n", time);
        }, "16n");

        // Hi-hat rolls pattern
        this.hihatRollLoop = new Tone.Loop((time) => {
            // Rolls occasionnels
            if (Math.random() < 0.2) {
                this.hihatRoll.triggerAttackRelease("32n", time);
            }
        }, "8n");

        // 808 bass pattern
        this.bass808Loop = new Tone.Loop((time) => {
            const bassNotes = ["C1", "C1", "C1", "C1", "F1", "F1", "C1", "C1"];
            const note = bassNotes[Math.floor(time * 2) % bassNotes.length];
            this.bass808.triggerAttackRelease(note, "8n", time);
        }, "4n");

        // Lead pattern
        this.leadLoop = new Tone.Loop((time) => {
            const leadNotes = ["C3", "D#3", "F3", "G3", "A#3", "G3", "F3", "D#3"];
            const note = leadNotes[Math.floor(time * 2) % leadNotes.length];
            this.lead.triggerAttackRelease(note, "4n", time);
        }, "4n");

        // Variation pattern
        this.variationLoop = new Tone.Loop((time) => {
            // Pattern de variation pour les breaks
            const variationTimes = [0, 0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75];
            const currentTime = time % 2;
            if (variationTimes.includes(Math.round(currentTime * 4) / 4)) {
                this.hihat.triggerAttackRelease("32n", time);
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
        this.bass808.connect(masterGain);
        this.snare.connect(masterGain);
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
        this.snareLoop.start(0);
        this.hihatLoop.start(0);
        this.hihatRollLoop.start(0);
        this.bass808Loop.start(0);
        this.leadLoop.start("1m"); // Lead commence après 1 mesure
        this.variationLoop.start("2m"); // Variation commence après 2 mesures
        
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
        this.hihatRollLoop.stop();
        this.bass808Loop.stop();
        this.leadLoop.stop();
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
        this.bass808.volume.value = Tone.gainToDb(level * 0.9);
        this.snare.volume.value = Tone.gainToDb(level * 0.8);
        this.hihat.volume.value = Tone.gainToDb(level * 0.6);
        this.hihatRoll.volume.value = Tone.gainToDb(level * 0.5);
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
            this.reverb.decay = this.effects.reverb.amount * 1.5;
        }
    }
}

// Export pour utilisation globale
window.Rap2Music = Rap2Music;
