class AudioVisualizer {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.analyser = null;
        this.dataArray = null;
        this.animationId = null;
        this.isVisualizing = false;
        this.visualizationMode = 1; // Mode par défaut
        this.rotationAngle = 0; // Pour les modes rotatifs
        
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
        
        // Dessiner selon le mode de visualisation
        this.drawVisualization();
        
        // Mettre à jour l'angle de rotation pour les modes rotatifs
        this.rotationAngle += 0.02;
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

    // Méthode principale de visualisation
    drawVisualization() {
        switch(this.visualizationMode) {
            case 1: this.drawClassicVertical(); break;
            case 2: this.drawHorizontalBars(); break;
            case 3: this.drawCircular(); break;
            case 4: this.drawMirrorVertical(); break;
            case 5: this.draw3DPerspective(); break;
            case 6: this.drawParticles(); break;
            case 7: this.drawRadial(); break;
            case 8: this.drawStyledWaveform(); break;
            case 9: this.drawMatrix(); break;
            case 10: this.drawLiquid(); break;
            default: this.drawClassicVertical(); break;
        }
    }

    // Mode 1: Spectrum Classique Vertical
    drawClassicVertical() {
        const width = this.canvas.width;
        const height = this.canvas.height;
        const barCount = Math.min(this.dataArray.length, 64);
        const barWidth = width / barCount;
        
        for (let i = 0; i < barCount; i++) {
            const dataIndex = Math.floor((i / barCount) * this.dataArray.length);
            const barHeight = (this.dataArray[dataIndex] / 255) * height * 0.8;
            
            const gradient = this.ctx.createLinearGradient(0, height, 0, height - barHeight);
            gradient.addColorStop(0, '#4a9eff');
            gradient.addColorStop(1, '#00d4ff');
            
            this.ctx.fillStyle = gradient;
            this.ctx.fillRect(i * barWidth, height - barHeight, barWidth - 1, barHeight);
        }
    }

    // Mode 2: Spectrum Horizontal (comme l'image)
    drawHorizontalBars() {
        const width = this.canvas.width;
        const height = this.canvas.height;
        const barCount = Math.min(this.dataArray.length, 32);
        const barHeight = height / barCount;
        
        for (let i = 0; i < barCount; i++) {
            const dataIndex = Math.floor((i / barCount) * this.dataArray.length);
            const barWidth = (this.dataArray[dataIndex] / 255) * width * 0.8;
            
            const gradient = this.ctx.createLinearGradient(0, 0, barWidth, 0);
            gradient.addColorStop(0, '#4a9eff');
            gradient.addColorStop(1, '#00d4ff');
            
            this.ctx.fillStyle = gradient;
            this.ctx.fillRect(0, i * barHeight, barWidth, barHeight - 1);
            
            // Ajouter des flèches de navigation
            if (i % 4 === 0) {
                this.ctx.fillStyle = '#ffffff';
                this.ctx.fillRect(barWidth + 5, i * barHeight + barHeight/2 - 2, 10, 4);
            }
        }
    }

    // Mode 3: Spectrum Circulaire
    drawCircular() {
        const width = this.canvas.width;
        const height = this.canvas.height;
        const centerX = width / 2;
        const centerY = height / 2;
        const radius = Math.min(width, height) / 3;
        const barCount = 48;
        
        this.ctx.save();
        this.ctx.translate(centerX, centerY);
        this.ctx.rotate(this.rotationAngle);
        
        for (let i = 0; i < barCount; i++) {
            const dataIndex = Math.floor((i / barCount) * this.dataArray.length);
            const barLength = (this.dataArray[dataIndex] / 255) * radius * 0.8;
            const angle = (i / barCount) * Math.PI * 2;
            
            const x1 = Math.cos(angle) * radius;
            const y1 = Math.sin(angle) * radius;
            const x2 = Math.cos(angle) * (radius + barLength);
            const y2 = Math.sin(angle) * (radius + barLength);
            
            const gradient = this.ctx.createLinearGradient(x1, y1, x2, y2);
            gradient.addColorStop(0, '#4a9eff');
            gradient.addColorStop(1, '#00d4ff');
            
            this.ctx.strokeStyle = gradient;
            this.ctx.lineWidth = 3;
            this.ctx.beginPath();
            this.ctx.moveTo(x1, y1);
            this.ctx.lineTo(x2, y2);
            this.ctx.stroke();
        }
        
        this.ctx.restore();
    }

    // Mode 4: Spectrum Miroir Vertical
    drawMirrorVertical() {
        const width = this.canvas.width;
        const height = this.canvas.height;
        const centerY = height / 2;
        const barCount = Math.min(this.dataArray.length, 64);
        const barWidth = width / barCount;
        
        for (let i = 0; i < barCount; i++) {
            const dataIndex = Math.floor((i / barCount) * this.dataArray.length);
            const barHeight = (this.dataArray[dataIndex] / 255) * (height / 2) * 0.8;
            
            const gradient = this.ctx.createLinearGradient(0, centerY, 0, centerY - barHeight);
            gradient.addColorStop(0, '#4a9eff');
            gradient.addColorStop(1, '#00d4ff');
            
            this.ctx.fillStyle = gradient;
            // Barre vers le haut
            this.ctx.fillRect(i * barWidth, centerY - barHeight, barWidth - 1, barHeight);
            // Barre vers le bas (miroir)
            this.ctx.fillRect(i * barWidth, centerY, barWidth - 1, barHeight);
        }
    }

    // Mode 5: Spectrum 3D Perspective
    draw3DPerspective() {
        const width = this.canvas.width;
        const height = this.canvas.height;
        const barCount = Math.min(this.dataArray.length, 32);
        const barWidth = width / barCount;
        
        for (let i = 0; i < barCount; i++) {
            const dataIndex = Math.floor((i / barCount) * this.dataArray.length);
            const barHeight = (this.dataArray[dataIndex] / 255) * height * 0.8;
            const perspective = 1 - (i / barCount) * 0.3;
            
            this.ctx.save();
            this.ctx.scale(perspective, 1);
            
            const gradient = this.ctx.createLinearGradient(0, height, 0, height - barHeight);
            gradient.addColorStop(0, '#2a4a6e');
            gradient.addColorStop(1, '#4a9eff');
            
            this.ctx.fillStyle = gradient;
            this.ctx.fillRect(i * barWidth / perspective, height - barHeight, barWidth - 1, barHeight);
            
            // Ombre portée
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
            this.ctx.fillRect(i * barWidth / perspective + 2, height - barHeight + 2, barWidth - 1, barHeight);
            
            this.ctx.restore();
        }
    }

    // Mode 6: Spectrum Particules
    drawParticles() {
        const width = this.canvas.width;
        const height = this.canvas.height;
        const particleCount = Math.min(this.dataArray.length, 100);
        
        for (let i = 0; i < particleCount; i++) {
            const dataIndex = Math.floor((i / particleCount) * this.dataArray.length);
            const intensity = this.dataArray[dataIndex] / 255;
            const x = (i / particleCount) * width;
            const y = height / 2 + (Math.random() - 0.5) * height * intensity;
            const size = intensity * 8 + 2;
            
            const gradient = this.ctx.createRadialGradient(x, y, 0, x, y, size);
            gradient.addColorStop(0, `rgba(74, 158, 255, ${intensity})`);
            gradient.addColorStop(1, 'rgba(0, 212, 255, 0)');
            
            this.ctx.fillStyle = gradient;
            this.ctx.beginPath();
            this.ctx.arc(x, y, size, 0, Math.PI * 2);
            this.ctx.fill();
        }
    }

    // Mode 7: Spectrum Radial
    drawRadial() {
        const width = this.canvas.width;
        const height = this.canvas.height;
        const centerX = width / 2;
        const centerY = height / 2;
        const maxRadius = Math.min(width, height) / 2;
        const rayCount = 32;
        
        for (let i = 0; i < rayCount; i++) {
            const dataIndex = Math.floor((i / rayCount) * this.dataArray.length);
            const rayLength = (this.dataArray[dataIndex] / 255) * maxRadius * 0.8;
            const angle = (i / rayCount) * Math.PI * 2;
            
            const x = centerX + Math.cos(angle) * rayLength;
            const y = centerY + Math.sin(angle) * rayLength;
            
            const hue = (i / rayCount) * 360;
            this.ctx.strokeStyle = `hsl(${hue}, 70%, 60%)`;
            this.ctx.lineWidth = 3;
            this.ctx.beginPath();
            this.ctx.moveTo(centerX, centerY);
            this.ctx.lineTo(x, y);
            this.ctx.stroke();
        }
    }

    // Mode 8: Spectrum Waveform Stylisé
    drawStyledWaveform() {
        const width = this.canvas.width;
        const height = this.canvas.height;
        const centerY = height / 2;
        const sampleCount = Math.min(this.dataArray.length, 512);
        const sliceWidth = width / sampleCount;
        
        // Effet de glow
        this.ctx.shadowColor = '#4a9eff';
        this.ctx.shadowBlur = 10;
        
        this.ctx.strokeStyle = '#4a9eff';
        this.ctx.lineWidth = 3;
        this.ctx.beginPath();
        
        for (let i = 0; i < sampleCount; i++) {
            const dataIndex = Math.floor((i / sampleCount) * this.dataArray.length);
            const v = this.dataArray[dataIndex] / 128.0;
            const y = centerY + (v * centerY * 0.4);
            const x = i * sliceWidth;
            
            if (i === 0) {
                this.ctx.moveTo(x, y);
            } else {
                this.ctx.lineTo(x, y);
            }
        }
        
        this.ctx.stroke();
        this.ctx.shadowBlur = 0;
    }

    // Mode 9: Spectrum Matrix/Grille
    drawMatrix() {
        const width = this.canvas.width;
        const height = this.canvas.height;
        const gridSize = 10;
        const cellWidth = width / gridSize;
        const cellHeight = height / gridSize;
        
        for (let x = 0; x < gridSize; x++) {
            for (let y = 0; y < gridSize; y++) {
                const dataIndex = Math.floor(((x + y * gridSize) / (gridSize * gridSize)) * this.dataArray.length);
                const intensity = this.dataArray[dataIndex] / 255;
                
                if (intensity > 0.1) {
                    this.ctx.fillStyle = `rgba(0, 255, 100, ${intensity})`;
                    this.ctx.fillRect(x * cellWidth, y * cellHeight, cellWidth - 1, cellHeight - 1);
                }
            }
        }
    }

    // Mode 10: Spectrum Liquide/Blob
    drawLiquid() {
        const width = this.canvas.width;
        const height = this.canvas.height;
        const centerX = width / 2;
        const centerY = height / 2;
        const blobCount = 8;
        
        for (let i = 0; i < blobCount; i++) {
            const dataIndex = Math.floor((i / blobCount) * this.dataArray.length);
            const intensity = this.dataArray[dataIndex] / 255;
            const radius = intensity * 50 + 20;
            const x = centerX + Math.cos(this.rotationAngle + i) * 100;
            const y = centerY + Math.sin(this.rotationAngle + i) * 100;
            
            const gradient = this.ctx.createRadialGradient(x, y, 0, x, y, radius);
            gradient.addColorStop(0, `rgba(74, 158, 255, ${intensity * 0.8})`);
            gradient.addColorStop(1, `rgba(0, 212, 255, 0)`);
            
            this.ctx.fillStyle = gradient;
            this.ctx.beginPath();
            this.ctx.arc(x, y, radius, 0, Math.PI * 2);
            this.ctx.fill();
        }
    }

    // Méthode pour changer le mode de visualisation
    setVisualizationMode(mode) {
        this.visualizationMode = mode;
    }

    resize() {
        this.setupCanvas();
    }
}

// Export pour utilisation globale
window.AudioVisualizer = AudioVisualizer;
