// Script de diagnostic pour Soundrak
console.log('🔍 Diagnostic Soundrak');

// Vérifier les dépendances
console.log('📦 Vérification des dépendances:');
console.log('- Tone.js:', typeof Tone !== 'undefined' ? '✅ Chargé' : '❌ Non chargé');
console.log('- AudioVisualizer:', typeof AudioVisualizer !== 'undefined' ? '✅ Chargé' : '❌ Non chargé');

// Vérifier les classes de musique
const musicClasses = [
    'TechnoMusic', 'HardcoreMusic', 'TeknoMusic', 'HouseMusic',
    'Rap1Music', 'Rap2Music', 'Pop1Music', 'Pop2Music',
    'Experimental1Music', 'Experimental2Music'
];

console.log('🎵 Vérification des classes de musique:');
musicClasses.forEach(className => {
    const isLoaded = typeof window[className] !== 'undefined';
    console.log(`- ${className}:`, isLoaded ? '✅ Chargé' : '❌ Non chargé');
});

// Vérifier les éléments DOM
console.log('🎛️ Vérification des éléments DOM:');
const domElements = [
    'musicGrid', 'masterVolume', 'tempo', 'reverbToggle',
    'delayToggle', 'distortionToggle', 'visualizer'
];

domElements.forEach(elementId => {
    const element = document.getElementById(elementId);
    console.log(`- ${elementId}:`, element ? '✅ Trouvé' : '❌ Non trouvé');
});

// Test de création d'instance
if (typeof Tone !== 'undefined') {
    try {
        const testSynth = new Tone.Synth();
        console.log('✅ Création de synth Tone.js réussie');
    } catch (error) {
        console.error('❌ Erreur création synth:', error);
    }
}

// Test de l'application
if (typeof window.app !== 'undefined') {
    console.log('✅ Application initialisée');
} else {
    console.log('❌ Application non initialisée');
}

console.log('🏁 Diagnostic terminé');
