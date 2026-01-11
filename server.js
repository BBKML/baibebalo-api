// server.js - BAIBEBALO API v2.0
// Créé par BAKAYOKO ABOUBACAR

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Base de données temporaire (en mémoire)
const restaurants = [
  {
    id: 1,
    name: 'Restaurant Chez Marie',
    slug: 'chez-marie',
    category: 'Traditionnel',
    cuisine: 'Ivoirienne',
    description: 'Restaurant traditionnel spécialisé dans la cuisine locale',
    rating: 4.5,
    totalReviews: 127,
    deliveryTime: '30-45 min',
    deliveryFee: 500,
    minOrder: 2000,
    isOpen: true,
    address: 'Rue des Écoles, Centre-ville, Korhogo',
    phone: '+225 07 XX XX XX XX',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400',
    tags: ['Populaire', 'Cuisine locale', 'Familial']
  },
  {
    id: 2,
    name: 'Maquis Le Palmier',
    slug: 'le-palmier',
    category: 'Grillades',
    cuisine: 'Grillades',
    description: 'Spécialiste des grillades et brochettes',
    rating: 4.2,
    totalReviews: 89,
    deliveryTime: '25-35 min',
    deliveryFee: 500,
    minOrder: 1500,
    isOpen: true,
    address: 'Quartier Koko, Korhogo',
    phone: '+225 05 XX XX XX XX',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400',
    tags: ['Grillades', 'Ambiance', 'Terrasse']
  },
  {
    id: 3,
    name: 'Fast Food Central',
    slug: 'fast-food-central',
    category: 'Fast Food',
    cuisine: 'Internationale',
    description: 'Burgers, pizzas et sandwichs',
    rating: 4.7,
    totalReviews: 203,
    deliveryTime: '20-30 min',
    deliveryFee: 500,
    minOrder: 2500,
    isOpen: true,
    address: 'Centre Commercial, Korhogo',
    phone: '+225 01 XX XX XX XX',
    image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400',
    tags: ['Rapide', 'Nouveau', 'Livraison gratuite']
  },
  {
    id: 4,
    name: 'Pâtisserie Délice',
    slug: 'patisserie-delice',
    category: 'Pâtisserie',
    cuisine: 'Pâtisserie',
    description: 'Gâteaux, viennoiseries et pains',
    rating: 4.6,
    totalReviews: 156,
    deliveryTime: '15-25 min',
    deliveryFee: 500,
    minOrder: 1000,
    isOpen: true,
    address: 'Avenue Félix Houphouët-Boigny, Korhogo',
    phone: '+225 07 XX XX XX XX',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400',
    tags: ['Petit-déjeuner', 'Desserts', 'Qualité']
  }
];

const menuItems = {
  1: [ // Restaurant Chez Marie
    {
      id: 101,
      restaurantId: 1,
      name: 'Poulet Bicyclette Braisé',
      category: 'Plats principaux',
      description: 'Poulet fermier mariné aux épices locales, grillé au feu de bois',
      price: 3000,
      image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=300',
      isAvailable: true,
      preparationTime: 25,
      tags: ['Populaire', 'Épicé']
    },
    {
      id: 102,
      restaurantId: 1,
      name: 'Riz Sauce Graine',
      category: 'Plats principaux',
      description: 'Riz blanc avec sauce graine traditionnelle',
      price: 2500,
      image: 'https://images.unsplash.com/photo-1516684732162-798a0062be99?w=300',
      isAvailable: true,
      preparationTime: 20,
      tags: ['Traditionnel', 'Végétarien']
    },
    {
      id: 103,
      restaurantId: 1,
      name: 'Attiéké Poisson',
      category: 'Plats principaux',
      description: 'Attiéké frais avec poisson braisé et sauce tomate',
      price: 2000,
      image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=300',
      isAvailable: true,
      preparationTime: 20,
      tags: ['Léger', 'Poisson']
    },
    {
      id: 104,
      restaurantId: 1,
      name: 'Alloco + Viande',
      category: 'Accompagnements',
      description: 'Bananes plantain frites avec viande hachée',
      price: 1500,
      image: 'https://images.unsplash.com/photo-1587334206515-e0c5c0c24bca?w=300',
      isAvailable: true,
      preparationTime: 15,
      tags: ['Street food', 'Rapide']
    },
    {
      id: 105,
      restaurantId: 1,
      name: 'Jus de Bissap',
      category: 'Boissons',
      description: 'Jus d\'hibiscus naturel fait maison',
      price: 500,
      image: 'https://images.unsplash.com/photo-1546173159-315724a31696?w=300',
      isAvailable: true,
      preparationTime: 5,
      tags: ['Naturel', 'Rafraîchissant']
    }
  ],
  2: [ // Maquis Le Palmier
    {
      id: 201,
      restaurantId: 2,
      name: 'Brochettes de Bœuf',
      category: 'Grillades',
      description: '6 brochettes de bœuf mariné grillé au charbon',
      price: 2500,
      image: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=300',
      isAvailable: true,
      preparationTime: 20,
      tags: ['Grillé', 'Viande']
    },
    {
      id: 202,
      restaurantId: 2,
      name: 'Poulet Grillé Complet',
      category: 'Grillades',
      description: 'Poulet entier grillé avec frites et salade',
      price: 4500,
      image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=300',
      isAvailable: true,
      preparationTime: 30,
      tags: ['Familial', 'Grillé']
    }
  ],
  3: [ // Fast Food Central
    {
      id: 301,
      restaurantId: 3,
      name: 'Burger Classique',
      category: 'Burgers',
      description: 'Steak de bœuf, salade, tomate, oignon, sauce',
      price: 2000,
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300',
      isAvailable: true,
      preparationTime: 15,
      tags: ['Classique', 'Rapide']
    },
    {
      id: 302,
      restaurantId: 3,
      name: 'Pizza Margherita',
      category: 'Pizzas',
      description: 'Sauce tomate, mozzarella, basilic',
      price: 3500,
      image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=300',
      isAvailable: true,
      preparationTime: 25,
      tags: ['Italien', 'Fromage']
    }
  ]
};

// ==========================================
// ROUTES API
// ==========================================

// Page d'accueil de l'API
app.get('/', (req, res) => {
  res.json({
    message: '🍕 Bienvenue sur BAIBEBALO API - Créé par BAKAYAKO ABOUBACAR',
    status: 'running',
    version: '2.0.0',
    endpoints: {
      info: '/api/info',
      restaurants: '/api/restaurants',
      restaurantById: '/api/restaurants/:id',
      menu: '/api/restaurants/:id/menu',
      search: '/api/restaurants/search?q=terme',
      categories: '/api/categories'
    },
    documentation: 'https://github.com/BBKML/baibebalo-api'
  });
});

// Informations sur l'application
app.get('/api/info', (req, res) => {
  res.json({
    nom: 'BAIBEBALO',
    ville: 'Korhogo',
    pays: "Côte d'Ivoire",
    description: 'Plateforme de livraison locale',
    version: '2.0.0',
    developer: 'BAKAYOKO ABOUBACAR',
    github: 'https://github.com/BBKML/baibebalo-api',
    features: [
      'Livraison de repas',
      'Plusieurs restaurants',
      'Paiement cash',
      'Suivi en temps réel'
    ],
    stats: {
      restaurants: restaurants.length,
      platsDisponibles: Object.values(menuItems).flat().length
    }
  });
});

// Liste tous les restaurants
app.get('/api/restaurants', (req, res) => {
  // Filtres optionnels
  const { category, minRating, maxDeliveryFee, isOpen } = req.query;
  
  let filteredRestaurants = [...restaurants];
  
  // Filtrer par catégorie
  if (category) {
    filteredRestaurants = filteredRestaurants.filter(
      r => r.category.toLowerCase() === category.toLowerCase()
    );
  }
  
  // Filtrer par note minimale
  if (minRating) {
    filteredRestaurants = filteredRestaurants.filter(
      r => r.rating >= parseFloat(minRating)
    );
  }
  
  // Filtrer par frais de livraison max
  if (maxDeliveryFee) {
    filteredRestaurants = filteredRestaurants.filter(
      r => r.deliveryFee <= parseInt(maxDeliveryFee)
    );
  }
  
  // Filtrer par statut ouvert
  if (isOpen === 'true') {
    filteredRestaurants = filteredRestaurants.filter(r => r.isOpen);
  }
  
  res.json({
    success: true,
    count: filteredRestaurants.length,
    data: filteredRestaurants
  });
});

// Détails d'un restaurant par ID
app.get('/api/restaurants/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const restaurant = restaurants.find(r => r.id === id);
  
  if (!restaurant) {
    return res.status(404).json({
      success: false,
      message: `Restaurant avec l'ID ${id} non trouvé`
    });
  }
  
  res.json({
    success: true,
    data: restaurant
  });
});

// Menu d'un restaurant
app.get('/api/restaurants/:id/menu', (req, res) => {
  const id = parseInt(req.params.id);
  const restaurant = restaurants.find(r => r.id === id);
  
  if (!restaurant) {
    return res.status(404).json({
      success: false,
      message: `Restaurant avec l'ID ${id} non trouvé`
    });
  }
  
  const menu = menuItems[id] || [];
  
  res.json({
    success: true,
    restaurant: {
      id: restaurant.id,
      name: restaurant.name
    },
    count: menu.length,
    data: menu
  });
});

// Recherche de restaurants
app.get('/api/restaurants/search', (req, res) => {
  const searchTerm = req.query.q;
  
  if (!searchTerm) {
    return res.status(400).json({
      success: false,
      message: 'Paramètre de recherche "q" requis'
    });
  }
  
  const results = restaurants.filter(r => 
    r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  res.json({
    success: true,
    searchTerm: searchTerm,
    count: results.length,
    data: results
  });
});

// Liste des catégories disponibles
app.get('/api/categories', (req, res) => {
  const categories = [...new Set(restaurants.map(r => r.category))];
  
  const categoriesWithCount = categories.map(cat => ({
    name: cat,
    count: restaurants.filter(r => r.category === cat).length,
    restaurants: restaurants.filter(r => r.category === cat).map(r => ({
      id: r.id,
      name: r.name,
      rating: r.rating
    }))
  }));
  
  res.json({
    success: true,
    count: categories.length,
    data: categoriesWithCount
  });
});

// Route 404 pour les routes non trouvées
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route non trouvée',
    path: req.path,
    suggestion: 'Consultez / pour voir toutes les routes disponibles'
  });
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log('\n🚀 ========================================');
  console.log('🍕 BAIBEBALO API v2.0');
  console.log('👨‍💻 Développeur: BAKAYOKO ABOUBACAR');
  console.log('🚀 ========================================');
  console.log(`📍 API URL: http://localhost:${PORT}`);
  console.log(`📚 Documentation: http://localhost:${PORT}/`);
  console.log('🚀 ========================================');
  console.log('\n✅ ROUTES DISPONIBLES:');
  console.log(`   GET  /api/info`);
  console.log(`   GET  /api/restaurants`);
  console.log(`   GET  /api/restaurants/:id`);
  console.log(`   GET  /api/restaurants/:id/menu`);
  console.log(`   GET  /api/restaurants/search?q=terme`);
  console.log(`   GET  /api/categories`);
  console.log('\n🎯 EXEMPLES:');
  console.log(`   http://localhost:${PORT}/api/restaurants`);
  console.log(`   http://localhost:${PORT}/api/restaurants/1`);
  console.log(`   http://localhost:${PORT}/api/restaurants/1/menu`);
  console.log(`   http://localhost:${PORT}/api/restaurants/search?q=poulet`);
  console.log(`   http://localhost:${PORT}/api/categories`);
  console.log('\n🚀 ========================================\n');
});