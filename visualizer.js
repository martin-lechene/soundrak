class AudioVisualizer {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.analyser = null;
        this.dataArray = null;
        this.animationId = null;
        this.isVisualizing = false;
        
        this.setupCanvas();
    }

    setupCanvas() {
        // Ajuster la taille du canvas
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
    }

    connectAnalyser(analyser) {
        this.analyser = analyser;
        // Tone.js utilise une taille fixe pour l'analyseur
        this.dataArray = new Uint8Array(1024);
        this.startVisualization();
    }

    startVisualization() {
        if (this.isVisualizing) return;
        this.isVisualizing = true;
        this.draw();
    }

    stopVisualization() {
        this.isVisualizing = false;
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        this.clearCanvas();
    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    draw() {
        if (!this.isVisualizing || !this.analyser) {
            return;
        }

        this.animationId = requestAnimationFrame(() => this.draw());

        // Tone.js utilise getValue() pour obtenir les données de fréquence
        if (this.analyser && typeof this.analyser.getValue === 'function') {
            const frequencyData = this.analyser.getValue();
            if (frequencyData && frequencyData.length) {
                this.dataArray = new Uint8Array(frequencyData);
            }
        } else {
            // Si pas d'analyser, utiliser des données simulées
            for (let i = 0; i < this.dataArray.length; i++) {
                this.dataArray[i] = Math.random() * 255;
            }
        }
        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Dessiner le waveform
        this.drawWaveform();
        
        // Dessiner les barres de fréquences
        this.drawFrequencyBars();
    }

    drawWaveform() {
        const width = this.canvas.width;
        const height = this.canvas.height;
        const centerY = height / 2;
        
        this.ctx.strokeStyle = '#4a9eff';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        
        const sampleCount = Math.min(this.dataArray.length, 512); // Limiter les échantillons
        const sliceWidth = width / sampleCount;
        let x = 0;
        
        for (let i = 0; i < sampleCount; i++) {
            const dataIndex = Math.floor((i / sampleCount) * this.dataArray.length);
            const v = this.dataArray[dataIndex] / 128.0;
            const y = centerY + (v * centerY * 0.3); // Réduire l'amplitude pour un meilleur rendu
            
            if (i === 0) {
                this.ctx.moveTo(x, y);
            } else {
                this.ctx.lineTo(x, y);
            }
            
            x += sliceWidth;
        }
        
        this.ctx.stroke();
    }

    drawFrequencyBars() {
        const width = this.canvas.width;
        const height = this.canvas.height;
        const barCount = Math.min(this.dataArray.length, 64); // Limiter à 64 barres pour de meilleures performances
        const barWidth = width / barCount;
        
        for (let i = 0; i < barCount; i++) {
            const dataIndex = Math.floor((i / barCount) * this.dataArray.length);
            const barHeight = (this.dataArray[dataIndex] / 255) * height * 0.8;
            
            // Créer un gradient pour les barres
            const gradient = this.ctx.createLinearGradient(0, height, 0, height - barHeight);
            gradient.addColorStop(0, '#4a9eff');
            gradient.addColorStop(1, '#00d4ff');
            
            this.ctx.fillStyle = gradient;
            this.ctx.fillRect(i * barWidth, height - barHeight, barWidth - 1, barHeight);
        }
    }

    resize() {
        this.setupCanvas();
    }
}

// Export pour utilisation globale
window.AudioVisualizer = AudioVisualizer;
