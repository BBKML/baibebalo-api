// server.js - Votre premier serveur API !

const express = require('express');
const app = express();
const PORT = 3000;

// Route de test
app.get('/', (req, res) => {
  res.json({
    message: '🍕 Bienvenue sur BAIBEBALO API - Créé par BAKAYOKO ABOUBACAR',
    status: 'running',
    version: '1.0.0'
  });
});

// Route restaurants (données temporaires)
app.get('/api/restaurants', (req, res) => {
  res.json({
    success: true,
    data: [
      {
        id: 1,
        name: 'Restaurant Chez Marie',
        category: 'Traditionnel',
        rating: 4.5,
        deliveryTime: '30-45 min'
      },
      {
        id: 2,
        name: 'Maquis Le Palmier',
        category: 'Grillades',
        rating: 4.2,
        deliveryTime: '25-35 min'
      },
      {
        id: 3,
        name: 'Fast Food Central',
        category: 'Fast Food',
        rating: 4.7,
        deliveryTime: '20-30 min'
      }
    ]
  });
});

app.get('/api/info', (req, res) => {
  res.json({
    nom: 'BAIBEBALO',
    ville: 'Korhogo',
    pays: 'Côte d\'Ivoire',
    description: 'Plateforme de livraison locale'
  });
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log('🚀 ========================================');
  console.log(`🍕 BAIBEBALO API démarrée !`);
  console.log(`📍 URL : http://localhost:${PORT}`);
  console.log(`✅ Testez : http://localhost:${PORT}/api/restaurants`);
  console.log('🚀 ========================================');
});