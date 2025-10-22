class Experimental1Music {
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
        // Kick expérimental
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

        // Bassline expérimentale
        this.bass = new Tone.MonoSynth({
            oscillator: {
                type: "sawtooth"
            },
            filter: {
                Q: 4,
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

        // Percussions expérimentales
        this.percussion = new Tone.NoiseSynth({
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

        // Synth lead expérimental
        this.lead = new Tone.MonoSynth({
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

        // Hi-hats expérimentaux
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

        // Pad synth expérimental
        this.pad = new Tone.PolySynth(Tone.Synth, {
            oscillator: {
                type: "sine"
            },
            envelope: {
                attack: 0.5,
                decay: 0.3,
                sustain: 0.7,
                release: 1
            }
        });

        // Analyser pour la visualisation
        this.analyser = new Tone.Analyser("waveform", 1024);
    }

    setupEffects() {
        // Distortion expérimentale
        this.distortion = new Tone.Distortion(0.6);
        
        // Reverb pour l'espace
        this.reverb = new Tone.Reverb({
            decay: 2,
            preDelay: 0.01
        });

        // Delay pour les effets
        this.delay = new Tone.FeedbackDelay({
            delayTime: "8n",
            feedback: 0.4
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

        // Chorus pour le lead
        this.chorus = new Tone.Chorus({
            frequency: 1.5,
            delayTime: 3.5,
            depth: 0.7,
            type: "sine"
        });

        // Tremolo pour le pad
        this.tremolo = new Tone.Tremolo({
            frequency: 4,
            type: "sine",
            depth: 0.3
        });
    }

    setupLoops() {
        // Kick pattern - expérimental
        this.kickLoop = new Tone.Loop((time) => {
            this.kick.triggerAttackRelease("C1", "8n", time);
        }, "4n");

        // Bassline pattern
        this.bassLoop = new Tone.Loop((time) => {
            const bassNotes = ["C2", "C2", "C2", "C2", "F2", "F2", "C2", "C2"];
            const note = bassNotes[Math.floor(time * 2) % bassNotes.length];
            this.bass.triggerAttackRelease(note, "8n", time);
        }, "4n");

        // Percussion pattern
        this.percussionLoop = new Tone.Loop((time) => {
            this.percussion.triggerAttackRelease("8n", time);
        }, "2n");

        // Lead pattern
        this.leadLoop = new Tone.Loop((time) => {
            const leadNotes = ["C3", "D#3", "F3", "G3", "A#3", "G3", "F3", "D#3"];
            const note = leadNotes[Math.floor(time * 2) % leadNotes.length];
            this.lead.triggerAttackRelease(note, "4n", time);
        }, "2n");

        // Hi-hat pattern
        this.hihatLoop = new Tone.Loop((time) => {
            this.hihat.triggerAttackRelease("16n", time);
        }, "8n");

        // Pad pattern
        this.padLoop = new Tone.Loop((time) => {
            const padChords = [
                ["C3", "E3", "G3", "B3"],
                ["F3", "A3", "C4", "E4"]
            ];
            const chord = padChords[Math.floor(time * 4) % padChords.length];
            this.pad.triggerAttackRelease(chord, "4n", time);
        }, "8n");

        // Variation pattern
        this.variationLoop = new Tone.Loop((time) => {
            // Pattern de variation complexe
            const variationTimes = [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5];
            const currentTime = time % 4;
            if (variationTimes.includes(Math.round(currentTime * 2) / 2)) {
                this.percussion.triggerAttackRelease("4n", time);
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
        this.percussion.connect(masterGain);
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
        this.percussionLoop.start(0);
        this.leadLoop.start("1m"); // Lead commence après 1 mesure
        this.hihatLoop.start("2m"); // Hi-hat commence après 2 mesures
        this.padLoop.start("4m"); // Pad commence après 4 mesures
        this.variationLoop.start("8m"); // Variation commence après 8 mesures
        
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
        this.percussionLoop.stop();
        this.leadLoop.stop();
        this.hihatLoop.stop();
        this.padLoop.stop();
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
        this.percussion.volume.value = Tone.gainToDb(level * 0.7);
        this.lead.volume.value = Tone.gainToDb(level * 0.6);
        this.hihat.volume.value = Tone.gainToDb(level * 0.5);
        this.pad.volume.value = Tone.gainToDb(level * 0.4);
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
window.Experimental1Music = Experimental1Music;
