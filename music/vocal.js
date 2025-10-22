class VocalMusic {
    constructor() {
        this.isPlaying = false;
        this.isPaused = false;
        this.volume = 0.7;
        this.tempo = 100; // Tempo plus lent pour le chant
        
        this.setupInstruments();
        this.setupEffects();
        this.setupLoops();
        
        // Analyser pour la visualisation
        this.analyser = new Tone.Analyser("waveform", 1024);
    }

    setupInstruments() {
        // Synthé vocal principal (français)
        this.vocalFrench = new Tone.PolySynth(Tone.Synth, {
            oscillator: {
                type: "sine"
            },
            envelope: {
                attack: 0.1,
                decay: 0.3,
                sustain: 0.7,
                release: 0.8
            }
        });

        // Synthé vocal secondaire (anglais)
        this.vocalEnglish = new Tone.PolySynth(Tone.Synth, {
            oscillator: {
                type: "triangle"
            },
            envelope: {
                attack: 0.1,
                decay: 0.3,
                sustain: 0.7,
                release: 0.8
            }
        });

        // Pad harmonique pour l'accompagnement
        this.pad = new Tone.PolySynth(Tone.Synth, {
            oscillator: {
                type: "sine"
            },
            envelope: {
                attack: 0.5,
                decay: 0.3,
                sustain: 0.8,
                release: 1.5
            }
        });

        // Arpège doux
        this.arp = new Tone.MonoSynth({
            oscillator: {
                type: "triangle"
            },
            envelope: {
                attack: 0.01,
                decay: 0.3,
                sustain: 0.4,
                release: 0.6
            }
        });

        // Bell cristalline pour les mélodies
        this.bell = new Tone.MonoSynth({
            oscillator: {
                type: "sine"
            },
            envelope: {
                attack: 0.01,
                decay: 0.3,
                sustain: 0.1,
                release: 1
            }
        });

        // Bass douce
        this.bass = new Tone.MonoSynth({
            oscillator: {
                type: "sine"
            },
            envelope: {
                attack: 0.1,
                decay: 0.3,
                sustain: 0.6,
                release: 0.5
            }
        });

        // Hi-hats doux
        this.hihat = new Tone.NoiseSynth({
            noise: {
                type: "pink"
            },
            envelope: {
                attack: 0.01,
                decay: 0.1,
                sustain: 0.1,
                release: 0.1
            }
        });
    }

    setupEffects() {
        // Reverb doux pour les voix
        this.vocalReverb = new Tone.Reverb({
            decay: 3,
            preDelay: 0.01
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

        // Delay pour les voix
        this.delay = new Tone.FeedbackDelay({
            delayTime: "8n",
            feedback: 0.3
        });

        // Filter pour les effets
        this.filter = new Tone.Filter({
            frequency: 2000,
            type: "lowpass",
            rolloff: -12
        });
    }

    setupLoops() {
        // Mélodie française - progression douce
        this.frenchLoop = new Tone.Loop((time) => {
            const frenchMelody = [
                ["C4", "E4", "G4"], // "Je"
                ["D4", "F4", "A4"], // "suis"
                ["E4", "G4", "B4"], // "ici"
                ["F4", "A4", "C5"], // "avec"
                ["G4", "B4", "D5"], // "toi"
                ["A4", "C5", "E5"], // "mon"
                ["B4", "D5", "F5"], // "amour"
                ["C5", "E5", "G5"]  // "éternel"
            ];
            const chord = frenchMelody[Math.floor(time * 2) % frenchMelody.length];
            this.vocalFrench.triggerAttackRelease(chord, "2n", time);
        }, "4n");

        // Mélodie anglaise - progression harmonieuse
        this.englishLoop = new Tone.Loop((time) => {
            const englishMelody = [
                ["D4", "F#4", "A4"], // "I"
                ["E4", "G4", "B4"],  // "am"
                ["F#4", "A4", "C#5"], // "here"
                ["G4", "B4", "D5"],  // "with"
                ["A4", "C#5", "E5"], // "you"
                ["B4", "D5", "F#5"], // "my"
                ["C#5", "E5", "G5"], // "love"
                ["D5", "F#5", "A5"]  // "forever"
            ];
            const chord = englishMelody[Math.floor(time * 2) % englishMelody.length];
            this.vocalEnglish.triggerAttackRelease(chord, "2n", time);
        }, "4n");

        // Pad harmonique - accords doux
        this.padLoop = new Tone.Loop((time) => {
            const padChords = [
                ["C3", "E3", "G3", "B3"],
                ["D3", "F#3", "A3", "C4"],
                ["E3", "G3", "B3", "D4"],
                ["F3", "A3", "C4", "E4"]
            ];
            const chord = padChords[Math.floor(time * 4) % padChords.length];
            this.pad.triggerAttackRelease(chord, "4n", time);
        }, "4n");

        // Arpège mélodique
        this.arpLoop = new Tone.Loop((time) => {
            const arpNotes = ["C4", "E4", "G4", "B4", "C5", "B4", "G4", "E4"];
            const note = arpNotes[Math.floor(time * 4) % arpNotes.length];
            this.arp.triggerAttackRelease(note, "8n", time);
        }, "2n");

        // Bell cristalline
        this.bellLoop = new Tone.Loop((time) => {
            const bellNotes = ["C5", "D5", "E5", "F5", "G5", "A5", "B5", "C6"];
            const note = bellNotes[Math.floor(time * 8) % bellNotes.length];
            this.bell.triggerAttackRelease(note, "4n", time);
        }, "4n");

        // Bass douce
        this.bassLoop = new Tone.Loop((time) => {
            const bassNotes = ["C2", "G2", "C3", "G2"];
            const note = bassNotes[Math.floor(time * 4) % bassNotes.length];
            this.bass.triggerAttackRelease(note, "2n", time);
        }, "4n");

        // Hi-hats doux
        this.hihatLoop = new Tone.Loop((time) => {
            this.hihat.triggerAttackRelease("16n", time);
        }, "8n");
    }

    connectToOutput() {
        // Créer une chaîne d'effets simplifiée
        const masterGain = new Tone.Gain(1);
        
        // Connecter l'analyser
        masterGain.connect(this.analyser);
        this.analyser.toDestination();

        // Voix française avec reverb et delay
        this.vocalFrench.connect(this.vocalReverb);
        this.vocalReverb.connect(this.delay);
        this.delay.connect(masterGain);

        // Voix anglaise avec reverb
        this.vocalEnglish.connect(this.vocalReverb);
        this.vocalReverb.connect(masterGain);

        // Pad avec chorus
        this.pad.connect(this.chorus);
        this.chorus.connect(masterGain);

        // Arpège avec tremolo
        this.arp.connect(this.tremolo);
        this.tremolo.connect(masterGain);

        // Bell avec reverb
        this.bell.connect(this.vocalReverb);
        this.vocalReverb.connect(masterGain);

        // Bass et hi-hats directement
        this.bass.connect(masterGain);
        this.hihat.connect(masterGain);
        
        // Appliquer les effets si activés
        this.updateEffects();
    }

    start() {
        if (this.isPlaying) return;
        
        this.connectToOutput();
        
        // Démarrer les loops avec progression
        this.bassLoop.start(0);
        this.hihatLoop.start(0);
        this.padLoop.start("1m");
        this.arpLoop.start("2m");
        this.bellLoop.start("3m");
        this.frenchLoop.start("4m");
        this.englishLoop.start("6m");
        
        // Démarrer le transport
        Tone.getTransport().start();
        
        this.isPlaying = true;
    }

    stop() {
        if (!this.isPlaying) return;
        
        // Arrêter les loops
        this.bassLoop.stop();
        this.hihatLoop.stop();
        this.padLoop.stop();
        this.arpLoop.stop();
        this.bellLoop.stop();
        this.frenchLoop.stop();
        this.englishLoop.stop();
        
        // Arrêter le transport
        Tone.getTransport().stop();
        
        this.isPlaying = false;
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
        this.vocalFrench.volume.value = Tone.gainToDb(level * 0.8); // Voix française
        this.vocalEnglish.volume.value = Tone.gainToDb(level * 0.8); // Voix anglaise
        this.pad.volume.value = Tone.gainToDb(level * 0.6); // Pad doux
        this.arp.volume.value = Tone.gainToDb(level * 0.5); // Arpège subtil
        this.bell.volume.value = Tone.gainToDb(level * 0.4); // Bell très doux
        this.bass.volume.value = Tone.gainToDb(level * 0.7); // Bass modéré
        this.hihat.volume.value = Tone.gainToDb(level * 0.3); // Hi-hats très doux
    }

    setTempo(bpm) {
        Tone.getTransport().bpm.value = bpm;
    }

    toggleEffect(effect, enabled) {
        if (this.effects && this.effects[effect]) {
            this.effects[effect].enabled = enabled;
            this.updateEffects();
        }
    }

    setEffectAmount(effect, amount) {
        if (this.effects && this.effects[effect]) {
            this.effects[effect].amount = amount;
            this.updateEffects();
        }
    }

    updateEffects() {
        // Mettre à jour les paramètres des effets
        if (this.effects && this.effects.reverb) {
            this.vocalReverb.decay = this.effects.reverb.amount * 3;
        }
        if (this.effects && this.effects.delay) {
            this.delay.feedback.value = this.effects.delay.amount;
        }
        if (this.effects && this.effects.distortion) {
            // Pas de distortion pour les voix douces
        }
    }
}
