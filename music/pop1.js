class Pop1Music {
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
        // Kick pop
        this.kick = new Tone.MembraneSynth({
            pitchDecay: 0.05,
            octaves: 10,
            oscillator: {
                type: "sine"
            },
            envelope: {
                attack: 0.01,
                decay: 0.3,
                sustain: 0.1,
                release: 0.3
            }
        });

        // Snare pop
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

        // Bassline pop
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

        // Hi-hats pop
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

        // Piano mélodique
        this.piano = new Tone.PolySynth(Tone.Synth, {
            oscillator: {
                type: "sine"
            },
            envelope: {
                attack: 0.01,
                decay: 0.3,
                sustain: 0.4,
                release: 0.5
            }
        });

        // Lead synth lumineux
        this.lead = new Tone.MonoSynth({
            oscillator: {
                type: "sine"
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
                baseFrequency: 1000,
                octaves: 3
            }
        });

        // Pad synth
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
        // Reverb pour l'ambiance
        this.reverb = new Tone.Reverb({
            decay: 2,
            preDelay: 0.01
        });

        // Delay pour les effets
        this.delay = new Tone.FeedbackDelay({
            delayTime: "8n",
            feedback: 0.3
        });

        // Distortion légère
        this.distortion = new Tone.Distortion(0.1);

        // Filter pour les variations
        this.filter = new Tone.Filter({
            frequency: 2000,
            type: "lowpass",
            rolloff: -24
        });

        // Chorus pour le piano
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
        // Kick pattern - 4/4 pop
        this.kickLoop = new Tone.Loop((time) => {
            this.kick.triggerAttackRelease("C1", "4n", time);
        }, "4n");

        // Snare pattern - sur les 2 et 4
        this.snareLoop = new Tone.Loop((time) => {
            this.snare.triggerAttackRelease("4n", time);
        }, "2n");

        // Hi-hat pattern
        this.hihatLoop = new Tone.Loop((time) => {
            this.hihat.triggerAttackRelease("8n", time);
        }, "8n");

        // Bassline pattern
        this.bassLoop = new Tone.Loop((time) => {
            const bassNotes = ["C2", "C2", "C2", "C2", "F2", "F2", "C2", "C2"];
            const note = bassNotes[Math.floor(time * 2) % bassNotes.length];
            this.bass.triggerAttackRelease(note, "8n", time);
        }, "4n");

        // Piano chords pattern
        this.pianoLoop = new Tone.Loop((time) => {
            const chords = [
                ["C3", "E3", "G3"],
                ["C3", "E3", "G3"],
                ["F3", "A3", "C4"],
                ["F3", "A3", "C4"]
            ];
            const chord = chords[Math.floor(time * 2) % chords.length];
            this.piano.triggerAttackRelease(chord, "2n", time);
        }, "4n");

        // Lead pattern
        this.leadLoop = new Tone.Loop((time) => {
            const leadNotes = ["C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5"];
            const note = leadNotes[Math.floor(time * 2) % leadNotes.length];
            this.lead.triggerAttackRelease(note, "4n", time);
        }, "4n");

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
            // Pattern de variation pour les breaks
            const variationTimes = [0, 1, 2, 3];
            const currentTime = time % 4;
            if (variationTimes.includes(Math.round(currentTime))) {
                this.hihat.triggerAttackRelease("16n", time);
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
        this.snare.connect(masterGain);
        this.hihat.connect(masterGain);
        this.lead.connect(masterGain);
        
        // Appliquer les effets si activés
        this.updateEffects();
    }
        if (this.effects.delay.enabled) {
            this.delay.connect(effectsChain);
        }
        if (this.effects.reverb.enabled) {
            this.reverb.connect(effectsChain);
        }
        
        effectsChain.connect(this.analyser);
        this.analyser.toDestination();

        // Connecter les instruments
        this.kick.connect(effectsChain);
        this.bass.connect(effectsChain);
        this.snare.connect(effectsChain);
        this.hihat.connect(effectsChain);
        this.lead.connect(effectsChain);
        
        // Piano avec chorus
        this.piano.connect(this.chorus);
        this.chorus.connect(effectsChain);
        
        // Pad avec tremolo
        this.pad.connect(this.tremolo);
        this.tremolo.connect(effectsChain);
    }

    start() {
        if (this.isPlaying) return;
        
        this.connectToOutput();
        
        // Démarrer les loops
        this.kickLoop.start(0);
        this.snareLoop.start(0);
        this.hihatLoop.start(0);
        this.bassLoop.start(0);
        this.pianoLoop.start("1m"); // Piano commence après 1 mesure
        this.leadLoop.start("2m"); // Lead commence après 2 mesures
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
        this.snareLoop.stop();
        this.hihatLoop.stop();
        this.bassLoop.stop();
        this.pianoLoop.stop();
        this.leadLoop.stop();
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
        this.snare.volume.value = Tone.gainToDb(level * 0.7);
        this.hihat.volume.value = Tone.gainToDb(level * 0.6);
        this.piano.volume.value = Tone.gainToDb(level * 0.7);
        this.lead.volume.value = Tone.gainToDb(level * 0.6);
        this.pad.volume.value = Tone.gainToDb(level * 0.5);
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
window.Pop1Music = Pop1Music;
