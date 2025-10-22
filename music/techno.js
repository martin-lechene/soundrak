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

        // Pad mélodique doux
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

        // Arpège mélodique
        this.arp = new Tone.MonoSynth({
            oscillator: {
                type: "triangle"
            },
            filter: {
                Q: 2,
                type: "lowpass",
                rolloff: -12
            },
            envelope: {
                attack: 0.01,
                decay: 0.3,
                sustain: 0.4,
                release: 0.5
            }
        });

        // Bell synth pour les mélodies douces
        this.bell = new Tone.MonoSynth({
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
                decay: 0.3,
                sustain: 0.1,
                release: 0.8
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

        // Chorus pour le pad
        this.chorus = new Tone.Chorus({
            frequency: 1.5,
            delayTime: 3.5,
            depth: 0.7,
            type: "sine"
        });

        // Tremolo pour l'arpège
        this.tremolo = new Tone.Tremolo({
            frequency: 4,
            type: "sine",
            depth: 0.3
        });

        // Reverb doux pour les mélodies
        this.melodyReverb = new Tone.Reverb({
            decay: 2,
            preDelay: 0.01
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

        // Pad pattern - accords doux
        this.padLoop = new Tone.Loop((time) => {
            const padChords = [
                ["C3", "E3", "G3", "B3"],
                ["D3", "F#3", "A3", "C4"],
                ["E3", "G3", "B3", "D4"],
                ["F3", "A3", "C4", "E4"]
            ];
            const chord = padChords[Math.floor(time * 4) % padChords.length];
            this.pad.triggerAttackRelease(chord, "2n", time);
        }, "4n");

        // Arpège pattern - mélodie douce
        this.arpLoop = new Tone.Loop((time) => {
            const arpNotes = ["C4", "E4", "G4", "B4", "C5", "B4", "G4", "E4"];
            const note = arpNotes[Math.floor(time * 4) % arpNotes.length];
            this.arp.triggerAttackRelease(note, "8n", time);
        }, "2n");

        // Bell pattern - mélodie cristalline
        this.bellLoop = new Tone.Loop((time) => {
            const bellNotes = ["C5", "D5", "E5", "F5", "G5", "A5", "B5", "C6"];
            const note = bellNotes[Math.floor(time * 8) % bellNotes.length];
            this.bell.triggerAttackRelease(note, "4n", time);
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
        this.hihat.connect(masterGain);
        this.lead.connect(masterGain);
        
        // Pad avec chorus
        this.pad.connect(this.chorus);
        this.chorus.connect(masterGain);
        
        // Arpège avec tremolo
        this.arp.connect(this.tremolo);
        this.tremolo.connect(masterGain);
        
        // Bell avec reverb doux
        this.bell.connect(this.melodyReverb);
        this.melodyReverb.connect(masterGain);
        
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
        this.padLoop.start("2m"); // Pad commence après 2 mesures
        this.arpLoop.start("3m"); // Arpège commence après 3 mesures
        this.bellLoop.start("4m"); // Bell commence après 4 mesures
        
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
        this.padLoop.stop();
        this.arpLoop.stop();
        this.bellLoop.stop();
        
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
        this.pad.volume.value = Tone.gainToDb(level * 0.5); // Pad plus doux
        this.arp.volume.value = Tone.gainToDb(level * 0.6); // Arpège modéré
        this.bell.volume.value = Tone.gainToDb(level * 0.4); // Bell très doux
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
