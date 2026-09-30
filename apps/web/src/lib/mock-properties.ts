import { Property, Agent } from './api';

export const MOCK_AGENTS: Agent[] = [
  {
    id: "agent-rajesh-godbole",
    name: "Rajesh Godbole",
    designation: "Principal Broker & Founder",
    agency: "Godbole & Partners Luxury Realty",
    reraId: "MahaRERA: A52100018942",
    specialization: "Koregaon Park & Boat Club Road",
    experienceYears: 16,
    transactedVolume: "₹450+ Cr Transacted",
    phone: "+91 98220 41890",
    email: "rajesh.godbole@godboleluxury.in",
    avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=400&q=80",
    _count: { listings: 28 }
  },
  {
    id: "agent-pooja-deshpande",
    name: "Pooja Deshpande",
    designation: "Senior Director - Residential Advisory",
    agency: "Pune Prime Estates (Baner & KP)",
    reraId: "MahaRERA: A52100024108",
    specialization: "Baner, Balewadi High Street & Aundh",
    experienceYears: 12,
    transactedVolume: "₹290+ Cr Transacted",
    phone: "+91 98505 82410",
    email: "pooja.deshpande@puneprime.in",
    avatar: "https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?auto=format&fit=crop&w=400&q=80",
    _count: { listings: 22 }
  },
  {
    id: "agent-aditya-kulkarni",
    name: "Aditya Kulkarni",
    designation: "Partner - West Maharashtra Corridors",
    agency: "Kulkarni Land & Habitats",
    reraId: "MahaRERA: A52100031975",
    specialization: "Hinjawadi, Kharadi & Kothrud",
    experienceYears: 9,
    transactedVolume: "₹180+ Cr Transacted",
    phone: "+91 98901 23197",
    email: "aditya.k@puneinvestments.in",
    avatar: "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=400&q=80",
    _count: { listings: 19 }
  },
  {
    id: "agent-meera-merchant",
    name: "Meera Merchant",
    designation: "Managing Partner - Coastal Luxury",
    agency: "South Mumbai Sotheby's Associate",
    reraId: "MahaRERA: A51900009841",
    specialization: "Worli Sea Face, Malabar Hill & Bandra",
    experienceYears: 18,
    transactedVolume: "₹820+ Cr Transacted",
    phone: "+91 98200 39841",
    email: "meera.merchant@southmumbairealty.com",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
    _count: { listings: 25 }
  },
  {
    id: "agent-vikramaditya-singhania",
    name: "Vikramaditya Singhania",
    designation: "Executive Director - DLF Corridors",
    agency: "DLF Privé Capital Advisory",
    reraId: "HRERA-PKL-REA-142-2024",
    specialization: "Golf Course Road DLF5 & Magnolias",
    experienceYears: 14,
    transactedVolume: "₹640+ Cr Transacted",
    phone: "+91 98110 54142",
    email: "vikram.singhania@dlfprive.com",
    avatar: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=400&q=80",
    _count: { listings: 18 }
  },
  {
    id: "agent-karthik-venkatesh",
    name: "Karthik Venkatesh",
    designation: "Head of Prime Corridors",
    agency: "Bengaluru Prime Habitats",
    reraId: "PRM/KA/RERA/1251/310/AG/210415",
    specialization: "Indiranagar, Koramangala 3rd Block & UB City",
    experienceYears: 11,
    transactedVolume: "₹310+ Cr Transacted",
    phone: "+91 98450 71025",
    email: "karthik.v@bangaloreprime.in",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80",
    _count: { listings: 15 }
  }
];

export const MOCK_PROPERTIES: Property[] = [
  {
    "id": "prop-koregaon-park-lane-1-heritage--1",
    "slug": "koregaon-park-lane-1-heritage-colonial-villa",
    "title": "Koregaon Park Lane 1 Heritage Colonial Villa",
    "description": "Experience premier luxury living in Lane 1, North Main Road, Koregaon Park. Featuring grand open architectural layouts, imported Italian marble and warm oak flooring, bespoke Poliform modular kitchen, smart automated climate control, dedicated private parking, and 24/7 concierge security.",
    "price": 145000000,
    "type": "RESIDENTIAL",
    "listingType": "SALE",
    "status": "VERIFIED",
    "address": "Lane 1, North Main Road, Koregaon Park",
    "city": "Pune",
    "state": "Maharashtra",
    "zipCode": "411001",
    "latitude": 18.5362,
    "longitude": 73.8924,
    "bedrooms": 5,
    "bathrooms": 5,
    "areaSqFt": 5200,
    "features": {
      "view": "Panoramic Greenery & City Horizon",
      "parking": "4 Dedicated Covered Bays",
      "furnishing": "Semi-Furnished Premium Italian Marble",
      "maintenance": "₹27,500 / month",
      "amenities": [
        "Temperature Controlled Pool",
        "Clubhouse & Spa",
        "Private Elevators",
        "24/7 Concierge",
        "Fitness Studio",
        "EV Charging Bays"
      ]
    },
    "agentId": "agent-sneha-kulkarni",
    "agent": {
      "id": "agent-sneha-kulkarni",
      "name": "Sneha Kulkarni",
      "email": "sneha@koregaonparkestates.com",
      "avatar": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
      "_count": {
        "listings": 22
      }
    },
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=85"
      }
    ],
    "createdAt": "2026-02-15T10:00:00.000Z",
    "updatedAt": "2026-03-29T10:00:00.000Z",
    "priceHistory": [
      {
        "id": "ph-0-1",
        "date": "2026-02-15",
        "price": 145000000,
        "event": "Listed For Sale",
        "source": "Verified Broker Network"
      }
    ],
    "taxHistory": [
      {
        "id": "th-0-1",
        "year": 2025,
        "taxPaid": 290000,
        "assessment": 108750000
      }
    ],
    "schools": [
      {
        "id": "sch-0-1",
        "name": "The Bishop's School, Pune",
        "rating": 10,
        "type": "ICSE",
        "level": "K-12",
        "distance": 1.4
      },
      {
        "id": "sch-0-2",
        "name": "Symbiosis International School",
        "rating": 9,
        "type": "IB / Cambridge",
        "level": "PreK-12",
        "distance": 2.1
      }
    ]
  },
  {
    "id": "prop-trump-towers-private-sky-villa-2",
    "slug": "trump-towers-private-sky-villa-kalyani-nagar-kp",
    "title": "Trump Towers Private Sky Villa | Kalyani Nagar - KP",
    "description": "Experience premier luxury living in Near Jogger's Park, Kalyani Nagar / KP. Featuring grand open architectural layouts, imported Italian marble and warm oak flooring, bespoke Poliform modular kitchen, smart automated climate control, dedicated private parking, and 24/7 concierge security.",
    "price": 175000000,
    "type": "RESIDENTIAL",
    "listingType": "SALE",
    "status": "VERIFIED",
    "address": "Near Jogger's Park, Kalyani Nagar / KP",
    "city": "Pune",
    "state": "Maharashtra",
    "zipCode": "411001",
    "latitude": 18.5445,
    "longitude": 73.8995,
    "bedrooms": 4,
    "bathrooms": 5,
    "areaSqFt": 6100,
    "features": {
      "view": "Panoramic Greenery & City Horizon",
      "parking": "3 Dedicated Covered Bays",
      "furnishing": "Semi-Furnished Premium Italian Marble",
      "maintenance": "₹22,000 / month",
      "amenities": [
        "Temperature Controlled Pool",
        "Clubhouse & Spa",
        "Private Elevators",
        "24/7 Concierge",
        "Fitness Studio",
        "EV Charging Bays"
      ]
    },
    "agentId": "agent-sneha-kulkarni",
    "agent": {
      "id": "agent-sneha-kulkarni",
      "name": "Sneha Kulkarni",
      "email": "sneha@koregaonparkestates.com",
      "avatar": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
      "_count": {
        "listings": 22
      }
    },
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1600&q=85"
      }
    ],
    "createdAt": "2026-02-15T10:00:00.000Z",
    "updatedAt": "2026-03-29T10:00:00.000Z",
    "priceHistory": [
      {
        "id": "ph-1-1",
        "date": "2026-02-15",
        "price": 175000000,
        "event": "Listed For Sale",
        "source": "Verified Broker Network"
      }
    ],
    "taxHistory": [
      {
        "id": "th-1-1",
        "year": 2025,
        "taxPaid": 350000,
        "assessment": 131250000
      }
    ],
    "schools": [
      {
        "id": "sch-1-1",
        "name": "The Bishop's School, Pune",
        "rating": 10,
        "type": "ICSE",
        "level": "K-12",
        "distance": 1.4
      },
      {
        "id": "sch-1-2",
        "name": "Symbiosis International School",
        "rating": 9,
        "type": "IB / Cambridge",
        "level": "PreK-12",
        "distance": 2.1
      }
    ]
  },
  {
    "id": "prop-the-glass-house-loft-lane-5-so-3",
    "slug": "the-glass-house-loft-lane-5-south-main-road",
    "title": "The Glass House Loft | Lane 5 South Main Road",
    "description": "Experience premier luxury living in Lane 5, South Main Road, Koregaon Park. Featuring grand open architectural layouts, imported Italian marble and warm oak flooring, bespoke Poliform modular kitchen, smart automated climate control, dedicated private parking, and 24/7 concierge security.",
    "price": 135000,
    "type": "RESIDENTIAL",
    "listingType": "RENT",
    "status": "VERIFIED",
    "address": "Lane 5, South Main Road, Koregaon Park",
    "city": "Pune",
    "state": "Maharashtra",
    "zipCode": "411001",
    "latitude": 18.5412,
    "longitude": 73.9015,
    "bedrooms": 3,
    "bathrooms": 3,
    "areaSqFt": 2400,
    "features": {
      "view": "Lush Garden & Skyline Vista",
      "parking": "2 Dedicated Covered Bays",
      "furnishing": "Fully Furnished Designer Decor",
      "maintenance": "₹16,500 / month",
      "amenities": [
        "Temperature Controlled Pool",
        "Clubhouse & Spa",
        "Private Elevators",
        "24/7 Concierge",
        "Fitness Studio",
        "EV Charging Bays"
      ]
    },
    "agentId": "agent-sneha-kulkarni",
    "agent": {
      "id": "agent-sneha-kulkarni",
      "name": "Sneha Kulkarni",
      "email": "sneha@koregaonparkestates.com",
      "avatar": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
      "_count": {
        "listings": 22
      }
    },
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85"
      }
    ],
    "createdAt": "2026-02-15T10:00:00.000Z",
    "updatedAt": "2026-03-29T10:00:00.000Z",
    "priceHistory": [
      {
        "id": "ph-2-1",
        "date": "2026-02-15",
        "price": 135000,
        "event": "Listed For Rent",
        "source": "Verified Broker Network"
      }
    ],
    "taxHistory": [
      {
        "id": "th-2-1",
        "year": 2025,
        "taxPaid": 270,
        "assessment": 101250
      }
    ],
    "schools": [
      {
        "id": "sch-2-1",
        "name": "The Bishop's School, Pune",
        "rating": 10,
        "type": "ICSE",
        "level": "K-12",
        "distance": 1.4
      },
      {
        "id": "sch-2-2",
        "name": "Symbiosis International School",
        "rating": 9,
        "type": "IB / Cambridge",
        "level": "PreK-12",
        "distance": 2.1
      }
    ]
  },
  {
    "id": "prop-osho-zen-promenade-designer-du-4",
    "slug": "osho-zen-promenade-designer-duplex",
    "title": "Osho Zen Promenade Designer Duplex",
    "description": "Experience premier luxury living in Lane 2, Koregaon Park, Pune. Featuring grand open architectural layouts, imported Italian marble and warm oak flooring, bespoke Poliform modular kitchen, smart automated climate control, dedicated private parking, and 24/7 concierge security.",
    "price": 92000000,
    "type": "RESIDENTIAL",
    "listingType": "SALE",
    "status": "VERIFIED",
    "address": "Lane 2, Koregaon Park, Pune",
    "city": "Pune",
    "state": "Maharashtra",
    "zipCode": "411001",
    "latitude": 18.5385,
    "longitude": 73.895,
    "bedrooms": 4,
    "bathrooms": 4,
    "areaSqFt": 3800,
    "features": {
      "view": "Panoramic Greenery & City Horizon",
      "parking": "3 Dedicated Covered Bays",
      "furnishing": "Semi-Furnished Premium Italian Marble",
      "maintenance": "₹22,000 / month",
      "amenities": [
        "Temperature Controlled Pool",
        "Clubhouse & Spa",
        "Private Elevators",
        "24/7 Concierge",
        "Fitness Studio",
        "EV Charging Bays"
      ]
    },
    "agentId": "agent-sneha-kulkarni",
    "agent": {
      "id": "agent-sneha-kulkarni",
      "name": "Sneha Kulkarni",
      "email": "sneha@koregaonparkestates.com",
      "avatar": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
      "_count": {
        "listings": 22
      }
    },
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1600&q=85"
      }
    ],
    "createdAt": "2026-02-15T10:00:00.000Z",
    "updatedAt": "2026-03-29T10:00:00.000Z",
    "priceHistory": [
      {
        "id": "ph-3-1",
        "date": "2026-02-15",
        "price": 92000000,
        "event": "Listed For Sale",
        "source": "Verified Broker Network"
      }
    ],
    "taxHistory": [
      {
        "id": "th-3-1",
        "year": 2025,
        "taxPaid": 184000,
        "assessment": 69000000
      }
    ],
    "schools": [
      {
        "id": "sch-3-1",
        "name": "The Bishop's School, Pune",
        "rating": 10,
        "type": "ICSE",
        "level": "K-12",
        "distance": 1.4
      },
      {
        "id": "sch-3-2",
        "name": "Symbiosis International School",
        "rating": 9,
        "type": "IB / Cambridge",
        "level": "PreK-12",
        "distance": 2.1
      }
    ]
  },
  {
    "id": "prop-lane-7-royal-terrace-penthouse-5",
    "slug": "lane-7-royal-terrace-penthouse",
    "title": "Lane 7 Royal Terrace Penthouse",
    "description": "Experience premier luxury living in Lane 7, Koregaon Park, Pune. Featuring grand open architectural layouts, imported Italian marble and warm oak flooring, bespoke Poliform modular kitchen, smart automated climate control, dedicated private parking, and 24/7 concierge security.",
    "price": 115000000,
    "type": "RESIDENTIAL",
    "listingType": "SALE",
    "status": "VERIFIED",
    "address": "Lane 7, Koregaon Park, Pune",
    "city": "Pune",
    "state": "Maharashtra",
    "zipCode": "411001",
    "latitude": 18.543,
    "longitude": 73.9042,
    "bedrooms": 4,
    "bathrooms": 5,
    "areaSqFt": 4500,
    "features": {
      "view": "Panoramic Greenery & City Horizon",
      "parking": "3 Dedicated Covered Bays",
      "furnishing": "Semi-Furnished Premium Italian Marble",
      "maintenance": "₹22,000 / month",
      "amenities": [
        "Temperature Controlled Pool",
        "Clubhouse & Spa",
        "Private Elevators",
        "24/7 Concierge",
        "Fitness Studio",
        "EV Charging Bays"
      ]
    },
    "agentId": "agent-sneha-kulkarni",
    "agent": {
      "id": "agent-sneha-kulkarni",
      "name": "Sneha Kulkarni",
      "email": "sneha@koregaonparkestates.com",
      "avatar": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
      "_count": {
        "listings": 22
      }
    },
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1600&q=85"
      }
    ],
    "createdAt": "2026-02-15T10:00:00.000Z",
    "updatedAt": "2026-03-29T10:00:00.000Z",
    "priceHistory": [
      {
        "id": "ph-4-1",
        "date": "2026-02-15",
        "price": 115000000,
        "event": "Listed For Sale",
        "source": "Verified Broker Network"
      }
    ],
    "taxHistory": [
      {
        "id": "th-4-1",
        "year": 2025,
        "taxPaid": 230000,
        "assessment": 86250000
      }
    ],
    "schools": [
      {
        "id": "sch-4-1",
        "name": "The Bishop's School, Pune",
        "rating": 10,
        "type": "ICSE",
        "level": "K-12",
        "distance": 1.4
      },
      {
        "id": "sch-4-2",
        "name": "Symbiosis International School",
        "rating": 9,
        "type": "IB / Cambridge",
        "level": "PreK-12",
        "distance": 2.1
      }
    ]
  },
  {
    "id": "prop-north-main-road-executive-sea--6",
    "slug": "north-main-road-executive-sea-of-green-suite",
    "title": "North Main Road Executive Sea-of-Green Suite",
    "description": "Experience premier luxury living in North Main Road, Opp Westin, Koregaon Park. Featuring grand open architectural layouts, imported Italian marble and warm oak flooring, bespoke Poliform modular kitchen, smart automated climate control, dedicated private parking, and 24/7 concierge security.",
    "price": 180000,
    "type": "RESIDENTIAL",
    "listingType": "RENT",
    "status": "VERIFIED",
    "address": "North Main Road, Opp Westin, Koregaon Park",
    "city": "Pune",
    "state": "Maharashtra",
    "zipCode": "411001",
    "latitude": 18.5398,
    "longitude": 73.903,
    "bedrooms": 3,
    "bathrooms": 3,
    "areaSqFt": 2800,
    "features": {
      "view": "Lush Garden & Skyline Vista",
      "parking": "2 Dedicated Covered Bays",
      "furnishing": "Fully Furnished Designer Decor",
      "maintenance": "₹16,500 / month",
      "amenities": [
        "Temperature Controlled Pool",
        "Clubhouse & Spa",
        "Private Elevators",
        "24/7 Concierge",
        "Fitness Studio",
        "EV Charging Bays"
      ]
    },
    "agentId": "agent-sneha-kulkarni",
    "agent": {
      "id": "agent-sneha-kulkarni",
      "name": "Sneha Kulkarni",
      "email": "sneha@koregaonparkestates.com",
      "avatar": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
      "_count": {
        "listings": 22
      }
    },
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85"
      }
    ],
    "createdAt": "2026-02-15T10:00:00.000Z",
    "updatedAt": "2026-03-29T10:00:00.000Z",
    "priceHistory": [
      {
        "id": "ph-5-1",
        "date": "2026-02-15",
        "price": 180000,
        "event": "Listed For Rent",
        "source": "Verified Broker Network"
      }
    ],
    "taxHistory": [
      {
        "id": "th-5-1",
        "year": 2025,
        "taxPaid": 360,
        "assessment": 135000
      }
    ],
    "schools": [
      {
        "id": "sch-5-1",
        "name": "The Bishop's School, Pune",
        "rating": 10,
        "type": "ICSE",
        "level": "K-12",
        "distance": 1.4
      },
      {
        "id": "sch-5-2",
        "name": "Symbiosis International School",
        "rating": 9,
        "type": "IB / Cambridge",
        "level": "PreK-12",
        "distance": 2.1
      }
    ]
  },
  {
    "id": "prop-sopan-baug-hillside-sanctuary--7",
    "slug": "sopan-baug-hillside-sanctuary-near-kp",
    "title": "Sopan Baug Hillside Sanctuary | Near KP",
    "description": "Experience premier luxury living in Sopan Baug Road, Ghorpadi, Pune. Featuring grand open architectural layouts, imported Italian marble and warm oak flooring, bespoke Poliform modular kitchen, smart automated climate control, dedicated private parking, and 24/7 concierge security.",
    "price": 82000000,
    "type": "RESIDENTIAL",
    "listingType": "SALE",
    "status": "VERIFIED",
    "address": "Sopan Baug Road, Ghorpadi, Pune",
    "city": "Pune",
    "state": "Maharashtra",
    "zipCode": "411001",
    "latitude": 18.5255,
    "longitude": 73.8988,
    "bedrooms": 4,
    "bathrooms": 4,
    "areaSqFt": 3600,
    "features": {
      "view": "Panoramic Greenery & City Horizon",
      "parking": "3 Dedicated Covered Bays",
      "furnishing": "Semi-Furnished Premium Italian Marble",
      "maintenance": "₹22,000 / month",
      "amenities": [
        "Temperature Controlled Pool",
        "Clubhouse & Spa",
        "Private Elevators",
        "24/7 Concierge",
        "Fitness Studio",
        "EV Charging Bays"
      ]
    },
    "agentId": "agent-sneha-kulkarni",
    "agent": {
      "id": "agent-sneha-kulkarni",
      "name": "Sneha Kulkarni",
      "email": "sneha@koregaonparkestates.com",
      "avatar": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
      "_count": {
        "listings": 22
      }
    },
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85"
      }
    ],
    "createdAt": "2026-02-15T10:00:00.000Z",
    "updatedAt": "2026-03-29T10:00:00.000Z",
    "priceHistory": [
      {
        "id": "ph-6-1",
        "date": "2026-02-15",
        "price": 82000000,
        "event": "Listed For Sale",
        "source": "Verified Broker Network"
      }
    ],
    "taxHistory": [
      {
        "id": "th-6-1",
        "year": 2025,
        "taxPaid": 164000,
        "assessment": 61500000
      }
    ],
    "schools": [
      {
        "id": "sch-6-1",
        "name": "The Bishop's School, Pune",
        "rating": 10,
        "type": "ICSE",
        "level": "K-12",
        "distance": 1.4
      },
      {
        "id": "sch-6-2",
        "name": "Symbiosis International School",
        "rating": 9,
        "type": "IB / Cambridge",
        "level": "PreK-12",
        "distance": 2.1
      }
    ]
  },
  {
    "id": "prop-boat-club-road-ultra-exclusive-8",
    "slug": "boat-club-road-ultra-exclusive-waterfront-manor",
    "title": "Boat Club Road Ultra-Exclusive Waterfront Manor",
    "description": "Experience premier luxury living in Boat Club Road, Sangamvadi, Pune. Featuring grand open architectural layouts, imported Italian marble and warm oak flooring, bespoke Poliform modular kitchen, smart automated climate control, dedicated private parking, and 24/7 concierge security.",
    "price": 160000000,
    "type": "RESIDENTIAL",
    "listingType": "SALE",
    "status": "VERIFIED",
    "address": "Boat Club Road, Sangamvadi, Pune",
    "city": "Pune",
    "state": "Maharashtra",
    "zipCode": "411001",
    "latitude": 18.5325,
    "longitude": 73.8821,
    "bedrooms": 5,
    "bathrooms": 6,
    "areaSqFt": 5800,
    "features": {
      "view": "Panoramic Greenery & City Horizon",
      "parking": "4 Dedicated Covered Bays",
      "furnishing": "Semi-Furnished Premium Italian Marble",
      "maintenance": "₹27,500 / month",
      "amenities": [
        "Temperature Controlled Pool",
        "Clubhouse & Spa",
        "Private Elevators",
        "24/7 Concierge",
        "Fitness Studio",
        "EV Charging Bays"
      ]
    },
    "agentId": "agent-rohan-deshmukh",
    "agent": {
      "id": "agent-rohan-deshmukh",
      "name": "Rohan Deshmukh",
      "email": "rohan.deshmukh@puneluxury.in",
      "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
      "_count": {
        "listings": 28
      }
    },
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85"
      }
    ],
    "createdAt": "2026-02-15T10:00:00.000Z",
    "updatedAt": "2026-03-29T10:00:00.000Z",
    "priceHistory": [
      {
        "id": "ph-7-1",
        "date": "2026-02-15",
        "price": 160000000,
        "event": "Listed For Sale",
        "source": "Verified Broker Network"
      }
    ],
    "taxHistory": [
      {
        "id": "th-7-1",
        "year": 2025,
        "taxPaid": 320000,
        "assessment": 120000000
      }
    ],
    "schools": [
      {
        "id": "sch-7-1",
        "name": "The Bishop's School, Pune",
        "rating": 10,
        "type": "ICSE",
        "level": "K-12",
        "distance": 1.4
      },
      {
        "id": "sch-7-2",
        "name": "Symbiosis International School",
        "rating": 9,
        "type": "IB / Cambridge",
        "level": "PreK-12",
        "distance": 2.1
      }
    ]
  },
  {
    "id": "prop-mula-mutha-riverfront-panorama-9",
    "slug": "mula-mutha-riverfront-panorama-penthouse",
    "title": "Mula-Mutha Riverfront Panorama Penthouse",
    "description": "Experience premier luxury living in Bund Garden Road, Boat Club Area, Pune. Featuring grand open architectural layouts, imported Italian marble and warm oak flooring, bespoke Poliform modular kitchen, smart automated climate control, dedicated private parking, and 24/7 concierge security.",
    "price": 125000000,
    "type": "RESIDENTIAL",
    "listingType": "SALE",
    "status": "VERIFIED",
    "address": "Bund Garden Road, Boat Club Area, Pune",
    "city": "Pune",
    "state": "Maharashtra",
    "zipCode": "411001",
    "latitude": 18.535,
    "longitude": 73.886,
    "bedrooms": 4,
    "bathrooms": 4,
    "areaSqFt": 4200,
    "features": {
      "view": "Panoramic Greenery & City Horizon",
      "parking": "3 Dedicated Covered Bays",
      "furnishing": "Semi-Furnished Premium Italian Marble",
      "maintenance": "₹22,000 / month",
      "amenities": [
        "Temperature Controlled Pool",
        "Clubhouse & Spa",
        "Private Elevators",
        "24/7 Concierge",
        "Fitness Studio",
        "EV Charging Bays"
      ]
    },
    "agentId": "agent-rohan-deshmukh",
    "agent": {
      "id": "agent-rohan-deshmukh",
      "name": "Rohan Deshmukh",
      "email": "rohan.deshmukh@puneluxury.in",
      "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
      "_count": {
        "listings": 28
      }
    },
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=85"
      }
    ],
    "createdAt": "2026-02-15T10:00:00.000Z",
    "updatedAt": "2026-03-29T10:00:00.000Z",
    "priceHistory": [
      {
        "id": "ph-8-1",
        "date": "2026-02-15",
        "price": 125000000,
        "event": "Listed For Sale",
        "source": "Verified Broker Network"
      }
    ],
    "taxHistory": [
      {
        "id": "th-8-1",
        "year": 2025,
        "taxPaid": 250000,
        "assessment": 93750000
      }
    ],
    "schools": [
      {
        "id": "sch-8-1",
        "name": "The Bishop's School, Pune",
        "rating": 10,
        "type": "ICSE",
        "level": "K-12",
        "distance": 1.4
      },
      {
        "id": "sch-8-2",
        "name": "Symbiosis International School",
        "rating": 9,
        "type": "IB / Cambridge",
        "level": "PreK-12",
        "distance": 2.1
      }
    ]
  },
  {
    "id": "prop-the-royal-club-suite-boat-club-10",
    "slug": "the-royal-club-suite-boat-club-road",
    "title": "The Royal Club Suite | Boat Club Road",
    "description": "Experience premier luxury living in Off Dhole Patil Road, Boat Club, Pune. Featuring grand open architectural layouts, imported Italian marble and warm oak flooring, bespoke Poliform modular kitchen, smart automated climate control, dedicated private parking, and 24/7 concierge security.",
    "price": 220000,
    "type": "RESIDENTIAL",
    "listingType": "RENT",
    "status": "VERIFIED",
    "address": "Off Dhole Patil Road, Boat Club, Pune",
    "city": "Pune",
    "state": "Maharashtra",
    "zipCode": "411001",
    "latitude": 18.5305,
    "longitude": 73.88,
    "bedrooms": 3,
    "bathrooms": 3,
    "areaSqFt": 3100,
    "features": {
      "view": "Lush Garden & Skyline Vista",
      "parking": "2 Dedicated Covered Bays",
      "furnishing": "Fully Furnished Designer Decor",
      "maintenance": "₹16,500 / month",
      "amenities": [
        "Temperature Controlled Pool",
        "Clubhouse & Spa",
        "Private Elevators",
        "24/7 Concierge",
        "Fitness Studio",
        "EV Charging Bays"
      ]
    },
    "agentId": "agent-rohan-deshmukh",
    "agent": {
      "id": "agent-rohan-deshmukh",
      "name": "Rohan Deshmukh",
      "email": "rohan.deshmukh@puneluxury.in",
      "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
      "_count": {
        "listings": 28
      }
    },
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=85"
      }
    ],
    "createdAt": "2026-02-15T10:00:00.000Z",
    "updatedAt": "2026-03-29T10:00:00.000Z",
    "priceHistory": [
      {
        "id": "ph-9-1",
        "date": "2026-02-15",
        "price": 220000,
        "event": "Listed For Rent",
        "source": "Verified Broker Network"
      }
    ],
    "taxHistory": [
      {
        "id": "th-9-1",
        "year": 2025,
        "taxPaid": 440,
        "assessment": 165000
      }
    ],
    "schools": [
      {
        "id": "sch-9-1",
        "name": "The Bishop's School, Pune",
        "rating": 10,
        "type": "ICSE",
        "level": "K-12",
        "distance": 1.4
      },
      {
        "id": "sch-9-2",
        "name": "Symbiosis International School",
        "rating": 9,
        "type": "IB / Cambridge",
        "level": "PreK-12",
        "distance": 2.1
      }
    ]
  },
  {
    "id": "prop-sangamvadi-prestige-high-rise--11",
    "slug": "sangamvadi-prestige-high-rise-residence",
    "title": "Sangamvadi Prestige High-Rise Residence",
    "description": "Experience premier luxury living in Near Sangam Bridge, Bund Garden, Pune. Featuring grand open architectural layouts, imported Italian marble and warm oak flooring, bespoke Poliform modular kitchen, smart automated climate control, dedicated private parking, and 24/7 concierge security.",
    "price": 74000000,
    "type": "RESIDENTIAL",
    "listingType": "SALE",
    "status": "VERIFIED",
    "address": "Near Sangam Bridge, Bund Garden, Pune",
    "city": "Pune",
    "state": "Maharashtra",
    "zipCode": "411001",
    "latitude": 18.529,
    "longitude": 73.875,
    "bedrooms": 3,
    "bathrooms": 3,
    "areaSqFt": 2600,
    "features": {
      "view": "Panoramic Greenery & City Horizon",
      "parking": "2 Dedicated Covered Bays",
      "furnishing": "Semi-Furnished Premium Italian Marble",
      "maintenance": "₹16,500 / month",
      "amenities": [
        "Temperature Controlled Pool",
        "Clubhouse & Spa",
        "Private Elevators",
        "24/7 Concierge",
        "Fitness Studio",
        "EV Charging Bays"
      ]
    },
    "agentId": "agent-rohan-deshmukh",
    "agent": {
      "id": "agent-rohan-deshmukh",
      "name": "Rohan Deshmukh",
      "email": "rohan.deshmukh@puneluxury.in",
      "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
      "_count": {
        "listings": 28
      }
    },
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85"
      }
    ],
    "createdAt": "2026-02-15T10:00:00.000Z",
    "updatedAt": "2026-03-29T10:00:00.000Z",
    "priceHistory": [
      {
        "id": "ph-10-1",
        "date": "2026-02-15",
        "price": 74000000,
        "event": "Listed For Sale",
        "source": "Verified Broker Network"
      }
    ],
    "taxHistory": [
      {
        "id": "th-10-1",
        "year": 2025,
        "taxPaid": 148000,
        "assessment": 55500000
      }
    ],
    "schools": [
      {
        "id": "sch-10-1",
        "name": "The Bishop's School, Pune",
        "rating": 10,
        "type": "ICSE",
        "level": "K-12",
        "distance": 1.4
      },
      {
        "id": "sch-10-2",
        "name": "Symbiosis International School",
        "rating": 9,
        "type": "IB / Cambridge",
        "level": "PreK-12",
        "distance": 2.1
      }
    ]
  },
  {
    "id": "prop-kalyani-nagar-waterfront-sky-m-12",
    "slug": "kalyani-nagar-waterfront-sky-mansion",
    "title": "Kalyani Nagar Waterfront Sky Mansion",
    "description": "Experience premier luxury living in Central Avenue, Kalyani Nagar, Pune. Featuring grand open architectural layouts, imported Italian marble and warm oak flooring, bespoke Poliform modular kitchen, smart automated climate control, dedicated private parking, and 24/7 concierge security.",
    "price": 98000000,
    "type": "RESIDENTIAL",
    "listingType": "SALE",
    "status": "VERIFIED",
    "address": "Central Avenue, Kalyani Nagar, Pune",
    "city": "Pune",
    "state": "Maharashtra",
    "zipCode": "411001",
    "latitude": 18.5482,
    "longitude": 73.9055,
    "bedrooms": 4,
    "bathrooms": 4,
    "areaSqFt": 3900,
    "features": {
      "view": "Panoramic Greenery & City Horizon",
      "parking": "3 Dedicated Covered Bays",
      "furnishing": "Semi-Furnished Premium Italian Marble",
      "maintenance": "₹22,000 / month",
      "amenities": [
        "Temperature Controlled Pool",
        "Clubhouse & Spa",
        "Private Elevators",
        "24/7 Concierge",
        "Fitness Studio",
        "EV Charging Bays"
      ]
    },
    "agentId": "agent-sneha-kulkarni",
    "agent": {
      "id": "agent-sneha-kulkarni",
      "name": "Sneha Kulkarni",
      "email": "sneha@koregaonparkestates.com",
      "avatar": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
      "_count": {
        "listings": 22
      }
    },
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1600&q=85"
      }
    ],
    "createdAt": "2026-02-15T10:00:00.000Z",
    "updatedAt": "2026-03-29T10:00:00.000Z",
    "priceHistory": [
      {
        "id": "ph-11-1",
        "date": "2026-02-15",
        "price": 98000000,
        "event": "Listed For Sale",
        "source": "Verified Broker Network"
      }
    ],
    "taxHistory": [
      {
        "id": "th-11-1",
        "year": 2025,
        "taxPaid": 196000,
        "assessment": 73500000
      }
    ],
    "schools": [
      {
        "id": "sch-11-1",
        "name": "The Bishop's School, Pune",
        "rating": 10,
        "type": "ICSE",
        "level": "K-12",
        "distance": 1.4
      },
      {
        "id": "sch-11-2",
        "name": "Symbiosis International School",
        "rating": 9,
        "type": "IB / Cambridge",
        "level": "PreK-12",
        "distance": 2.1
      }
    ]
  },
  {
    "id": "prop-joggers-park-serenade-apartmen-13",
    "slug": "joggers-park-serenade-apartment-kalyani-nagar",
    "title": "Jogger's Park Serenade Apartment | Kalyani Nagar",
    "description": "Experience premier luxury living in Near Jogger's Park, Kalyani Nagar, Pune. Featuring grand open architectural layouts, imported Italian marble and warm oak flooring, bespoke Poliform modular kitchen, smart automated climate control, dedicated private parking, and 24/7 concierge security.",
    "price": 110000,
    "type": "RESIDENTIAL",
    "listingType": "RENT",
    "status": "VERIFIED",
    "address": "Near Jogger's Park, Kalyani Nagar, Pune",
    "city": "Pune",
    "state": "Maharashtra",
    "zipCode": "411001",
    "latitude": 18.551,
    "longitude": 73.902,
    "bedrooms": 3,
    "bathrooms": 3,
    "areaSqFt": 2150,
    "features": {
      "view": "Lush Garden & Skyline Vista",
      "parking": "2 Dedicated Covered Bays",
      "furnishing": "Fully Furnished Designer Decor",
      "maintenance": "₹16,500 / month",
      "amenities": [
        "Temperature Controlled Pool",
        "Clubhouse & Spa",
        "Private Elevators",
        "24/7 Concierge",
        "Fitness Studio",
        "EV Charging Bays"
      ]
    },
    "agentId": "agent-sneha-kulkarni",
    "agent": {
      "id": "agent-sneha-kulkarni",
      "name": "Sneha Kulkarni",
      "email": "sneha@koregaonparkestates.com",
      "avatar": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
      "_count": {
        "listings": 22
      }
    },
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1600&q=85"
      }
    ],
    "createdAt": "2026-02-15T10:00:00.000Z",
    "updatedAt": "2026-03-29T10:00:00.000Z",
    "priceHistory": [
      {
        "id": "ph-12-1",
        "date": "2026-02-15",
        "price": 110000,
        "event": "Listed For Rent",
        "source": "Verified Broker Network"
      }
    ],
    "taxHistory": [
      {
        "id": "th-12-1",
        "year": 2025,
        "taxPaid": 220,
        "assessment": 82500
      }
    ],
    "schools": [
      {
        "id": "sch-12-1",
        "name": "The Bishop's School, Pune",
        "rating": 10,
        "type": "ICSE",
        "level": "K-12",
        "distance": 1.4
      },
      {
        "id": "sch-12-2",
        "name": "Symbiosis International School",
        "rating": 9,
        "type": "IB / Cambridge",
        "level": "PreK-12",
        "distance": 2.1
      }
    ]
  },
  {
    "id": "prop-east-avenue-contemporary-haven-14",
    "slug": "east-avenue-contemporary-haven",
    "title": "East Avenue Contemporary Haven",
    "description": "Experience premier luxury living in East Avenue, Kalyani Nagar, Pune. Featuring grand open architectural layouts, imported Italian marble and warm oak flooring, bespoke Poliform modular kitchen, smart automated climate control, dedicated private parking, and 24/7 concierge security.",
    "price": 68000000,
    "type": "RESIDENTIAL",
    "listingType": "SALE",
    "status": "VERIFIED",
    "address": "East Avenue, Kalyani Nagar, Pune",
    "city": "Pune",
    "state": "Maharashtra",
    "zipCode": "411001",
    "latitude": 18.546,
    "longitude": 73.908,
    "bedrooms": 3,
    "bathrooms": 3,
    "areaSqFt": 2450,
    "features": {
      "view": "Panoramic Greenery & City Horizon",
      "parking": "2 Dedicated Covered Bays",
      "furnishing": "Semi-Furnished Premium Italian Marble",
      "maintenance": "₹16,500 / month",
      "amenities": [
        "Temperature Controlled Pool",
        "Clubhouse & Spa",
        "Private Elevators",
        "24/7 Concierge",
        "Fitness Studio",
        "EV Charging Bays"
      ]
    },
    "agentId": "agent-sneha-kulkarni",
    "agent": {
      "id": "agent-sneha-kulkarni",
      "name": "Sneha Kulkarni",
      "email": "sneha@koregaonparkestates.com",
      "avatar": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
      "_count": {
        "listings": 22
      }
    },
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=85"
      }
    ],
    "createdAt": "2026-02-15T10:00:00.000Z",
    "updatedAt": "2026-03-29T10:00:00.000Z",
    "priceHistory": [
      {
        "id": "ph-13-1",
        "date": "2026-02-15",
        "price": 68000000,
        "event": "Listed For Sale",
        "source": "Verified Broker Network"
      }
    ],
    "taxHistory": [
      {
        "id": "th-13-1",
        "year": 2025,
        "taxPaid": 136000,
        "assessment": 51000000
      }
    ],
    "schools": [
      {
        "id": "sch-13-1",
        "name": "The Bishop's School, Pune",
        "rating": 10,
        "type": "ICSE",
        "level": "K-12",
        "distance": 1.4
      },
      {
        "id": "sch-13-2",
        "name": "Symbiosis International School",
        "rating": 9,
        "type": "IB / Cambridge",
        "level": "PreK-12",
        "distance": 2.1
      }
    ]
  },
  {
    "id": "prop-clover-park-luxury-penthouse-v-15",
    "slug": "clover-park-luxury-penthouse-viman-nagar",
    "title": "Clover Park Luxury Penthouse | Viman Nagar",
    "description": "Experience premier luxury living in Clover Park, Viman Nagar, Pune. Featuring grand open architectural layouts, imported Italian marble and warm oak flooring, bespoke Poliform modular kitchen, smart automated climate control, dedicated private parking, and 24/7 concierge security.",
    "price": 85000000,
    "type": "RESIDENTIAL",
    "listingType": "SALE",
    "status": "VERIFIED",
    "address": "Clover Park, Viman Nagar, Pune",
    "city": "Pune",
    "state": "Maharashtra",
    "zipCode": "411001",
    "latitude": 18.5675,
    "longitude": 73.9145,
    "bedrooms": 4,
    "bathrooms": 4,
    "areaSqFt": 3300,
    "features": {
      "view": "Panoramic Greenery & City Horizon",
      "parking": "3 Dedicated Covered Bays",
      "furnishing": "Semi-Furnished Premium Italian Marble",
      "maintenance": "₹22,000 / month",
      "amenities": [
        "Temperature Controlled Pool",
        "Clubhouse & Spa",
        "Private Elevators",
        "24/7 Concierge",
        "Fitness Studio",
        "EV Charging Bays"
      ]
    },
    "agentId": "agent-sneha-kulkarni",
    "agent": {
      "id": "agent-sneha-kulkarni",
      "name": "Sneha Kulkarni",
      "email": "sneha@koregaonparkestates.com",
      "avatar": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
      "_count": {
        "listings": 22
      }
    },
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=85"
      }
    ],
    "createdAt": "2026-02-15T10:00:00.000Z",
    "updatedAt": "2026-03-29T10:00:00.000Z",
    "priceHistory": [
      {
        "id": "ph-14-1",
        "date": "2026-02-15",
        "price": 85000000,
        "event": "Listed For Sale",
        "source": "Verified Broker Network"
      }
    ],
    "taxHistory": [
      {
        "id": "th-14-1",
        "year": 2025,
        "taxPaid": 170000,
        "assessment": 63750000
      }
    ],
    "schools": [
      {
        "id": "sch-14-1",
        "name": "The Bishop's School, Pune",
        "rating": 10,
        "type": "ICSE",
        "level": "K-12",
        "distance": 1.4
      },
      {
        "id": "sch-14-2",
        "name": "Symbiosis International School",
        "rating": 9,
        "type": "IB / Cambridge",
        "level": "PreK-12",
        "distance": 2.1
      }
    ]
  },
  {
    "id": "prop-symbiosis-green-vista-executiv-16",
    "slug": "symbiosis-green-vista-executive-suite",
    "title": "Symbiosis Green Vista Executive Suite",
    "description": "Experience premier luxury living in Symbiosis Road, Viman Nagar, Pune. Featuring grand open architectural layouts, imported Italian marble and warm oak flooring, bespoke Poliform modular kitchen, smart automated climate control, dedicated private parking, and 24/7 concierge security.",
    "price": 85000,
    "type": "RESIDENTIAL",
    "listingType": "RENT",
    "status": "VERIFIED",
    "address": "Symbiosis Road, Viman Nagar, Pune",
    "city": "Pune",
    "state": "Maharashtra",
    "zipCode": "411001",
    "latitude": 18.563,
    "longitude": 73.919,
    "bedrooms": 3,
    "bathrooms": 3,
    "areaSqFt": 1950,
    "features": {
      "view": "Lush Garden & Skyline Vista",
      "parking": "2 Dedicated Covered Bays",
      "furnishing": "Fully Furnished Designer Decor",
      "maintenance": "₹16,500 / month",
      "amenities": [
        "Temperature Controlled Pool",
        "Clubhouse & Spa",
        "Private Elevators",
        "24/7 Concierge",
        "Fitness Studio",
        "EV Charging Bays"
      ]
    },
    "agentId": "agent-sneha-kulkarni",
    "agent": {
      "id": "agent-sneha-kulkarni",
      "name": "Sneha Kulkarni",
      "email": "sneha@koregaonparkestates.com",
      "avatar": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
      "_count": {
        "listings": 22
      }
    },
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85"
      }
    ],
    "createdAt": "2026-02-15T10:00:00.000Z",
    "updatedAt": "2026-03-29T10:00:00.000Z",
    "priceHistory": [
      {
        "id": "ph-15-1",
        "date": "2026-02-15",
        "price": 85000,
        "event": "Listed For Rent",
        "source": "Verified Broker Network"
      }
    ],
    "taxHistory": [
      {
        "id": "th-15-1",
        "year": 2025,
        "taxPaid": 170,
        "assessment": 63750
      }
    ],
    "schools": [
      {
        "id": "sch-15-1",
        "name": "The Bishop's School, Pune",
        "rating": 10,
        "type": "ICSE",
        "level": "K-12",
        "distance": 1.4
      },
      {
        "id": "sch-15-2",
        "name": "Symbiosis International School",
        "rating": 9,
        "type": "IB / Cambridge",
        "level": "PreK-12",
        "distance": 2.1
      }
    ]
  },
  {
    "id": "prop-viman-nagar-central-boulevard--17",
    "slug": "viman-nagar-central-boulevard-residence",
    "title": "Viman Nagar Central Boulevard Residence",
    "description": "Experience premier luxury living in Viman Nagar Road, Near Phoenix Marketcity, Pune. Featuring grand open architectural layouts, imported Italian marble and warm oak flooring, bespoke Poliform modular kitchen, smart automated climate control, dedicated private parking, and 24/7 concierge security.",
    "price": 54000000,
    "type": "RESIDENTIAL",
    "listingType": "SALE",
    "status": "VERIFIED",
    "address": "Viman Nagar Road, Near Phoenix Marketcity, Pune",
    "city": "Pune",
    "state": "Maharashtra",
    "zipCode": "411001",
    "latitude": 18.559,
    "longitude": 73.922,
    "bedrooms": 3,
    "bathrooms": 2,
    "areaSqFt": 1750,
    "features": {
      "view": "Panoramic Greenery & City Horizon",
      "parking": "2 Dedicated Covered Bays",
      "furnishing": "Semi-Furnished Premium Italian Marble",
      "maintenance": "₹16,500 / month",
      "amenities": [
        "Temperature Controlled Pool",
        "Clubhouse & Spa",
        "Private Elevators",
        "24/7 Concierge",
        "Fitness Studio",
        "EV Charging Bays"
      ]
    },
    "agentId": "agent-sneha-kulkarni",
    "agent": {
      "id": "agent-sneha-kulkarni",
      "name": "Sneha Kulkarni",
      "email": "sneha@koregaonparkestates.com",
      "avatar": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
      "_count": {
        "listings": 22
      }
    },
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=85"
      }
    ],
    "createdAt": "2026-02-15T10:00:00.000Z",
    "updatedAt": "2026-03-29T10:00:00.000Z",
    "priceHistory": [
      {
        "id": "ph-16-1",
        "date": "2026-02-15",
        "price": 54000000,
        "event": "Listed For Sale",
        "source": "Verified Broker Network"
      }
    ],
    "taxHistory": [
      {
        "id": "th-16-1",
        "year": 2025,
        "taxPaid": 108000,
        "assessment": 40500000
      }
    ],
    "schools": [
      {
        "id": "sch-16-1",
        "name": "The Bishop's School, Pune",
        "rating": 10,
        "type": "ICSE",
        "level": "K-12",
        "distance": 1.4
      },
      {
        "id": "sch-16-2",
        "name": "Symbiosis International School",
        "rating": 9,
        "type": "IB / Cambridge",
        "level": "PreK-12",
        "distance": 2.1
      }
    ]
  },
  {
    "id": "prop-balewadi-high-street-designer--18",
    "slug": "balewadi-high-street-designer-sky-villa",
    "title": "Balewadi High Street Designer Sky Villa",
    "description": "Experience premier luxury living in High Street Boulevard, Balewadi, Pune. Featuring grand open architectural layouts, imported Italian marble and warm oak flooring, bespoke Poliform modular kitchen, smart automated climate control, dedicated private parking, and 24/7 concierge security.",
    "price": 78000000,
    "type": "RESIDENTIAL",
    "listingType": "SALE",
    "status": "VERIFIED",
    "address": "High Street Boulevard, Balewadi, Pune",
    "city": "Pune",
    "state": "Maharashtra",
    "zipCode": "411001",
    "latitude": 18.5742,
    "longitude": 73.7715,
    "bedrooms": 4,
    "bathrooms": 4,
    "areaSqFt": 3600,
    "features": {
      "view": "Panoramic Greenery & City Horizon",
      "parking": "3 Dedicated Covered Bays",
      "furnishing": "Semi-Furnished Premium Italian Marble",
      "maintenance": "₹22,000 / month",
      "amenities": [
        "Temperature Controlled Pool",
        "Clubhouse & Spa",
        "Private Elevators",
        "24/7 Concierge",
        "Fitness Studio",
        "EV Charging Bays"
      ]
    },
    "agentId": "agent-aditya-joshi",
    "agent": {
      "id": "agent-aditya-joshi",
      "name": "Aditya Joshi",
      "email": "aditya@banerprime.in",
      "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
      "_count": {
        "listings": 19
      }
    },
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1600&q=85"
      }
    ],
    "createdAt": "2026-02-15T10:00:00.000Z",
    "updatedAt": "2026-03-29T10:00:00.000Z",
    "priceHistory": [
      {
        "id": "ph-17-1",
        "date": "2026-02-15",
        "price": 78000000,
        "event": "Listed For Sale",
        "source": "Verified Broker Network"
      }
    ],
    "taxHistory": [
      {
        "id": "th-17-1",
        "year": 2025,
        "taxPaid": 156000,
        "assessment": 58500000
      }
    ],
    "schools": [
      {
        "id": "sch-17-1",
        "name": "The Bishop's School, Pune",
        "rating": 10,
        "type": "ICSE",
        "level": "K-12",
        "distance": 1.4
      },
      {
        "id": "sch-17-2",
        "name": "Symbiosis International School",
        "rating": 9,
        "type": "IB / Cambridge",
        "level": "PreK-12",
        "distance": 2.1
      }
    ]
  },
  {
    "id": "prop-baner-pashan-bio-reserve-luxur-19",
    "slug": "baner-pashan-bio-reserve-luxury-view-villa",
    "title": "Baner-Pashan Bio-Reserve Luxury View Villa",
    "description": "Experience premier luxury living in Baner-Pashan Link Road, Baner, Pune. Featuring grand open architectural layouts, imported Italian marble and warm oak flooring, bespoke Poliform modular kitchen, smart automated climate control, dedicated private parking, and 24/7 concierge security.",
    "price": 89000000,
    "type": "RESIDENTIAL",
    "listingType": "SALE",
    "status": "VERIFIED",
    "address": "Baner-Pashan Link Road, Baner, Pune",
    "city": "Pune",
    "state": "Maharashtra",
    "zipCode": "411001",
    "latitude": 18.5615,
    "longitude": 73.7858,
    "bedrooms": 4,
    "bathrooms": 5,
    "areaSqFt": 4100,
    "features": {
      "view": "Panoramic Greenery & City Horizon",
      "parking": "3 Dedicated Covered Bays",
      "furnishing": "Semi-Furnished Premium Italian Marble",
      "maintenance": "₹22,000 / month",
      "amenities": [
        "Temperature Controlled Pool",
        "Clubhouse & Spa",
        "Private Elevators",
        "24/7 Concierge",
        "Fitness Studio",
        "EV Charging Bays"
      ]
    },
    "agentId": "agent-aditya-joshi",
    "agent": {
      "id": "agent-aditya-joshi",
      "name": "Aditya Joshi",
      "email": "aditya@banerprime.in",
      "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
      "_count": {
        "listings": 19
      }
    },
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85"
      }
    ],
    "createdAt": "2026-02-15T10:00:00.000Z",
    "updatedAt": "2026-03-29T10:00:00.000Z",
    "priceHistory": [
      {
        "id": "ph-18-1",
        "date": "2026-02-15",
        "price": 89000000,
        "event": "Listed For Sale",
        "source": "Verified Broker Network"
      }
    ],
    "taxHistory": [
      {
        "id": "th-18-1",
        "year": 2025,
        "taxPaid": 178000,
        "assessment": 66750000
      }
    ],
    "schools": [
      {
        "id": "sch-18-1",
        "name": "The Bishop's School, Pune",
        "rating": 10,
        "type": "ICSE",
        "level": "K-12",
        "distance": 1.4
      },
      {
        "id": "sch-18-2",
        "name": "Symbiosis International School",
        "rating": 9,
        "type": "IB / Cambridge",
        "level": "PreK-12",
        "distance": 2.1
      }
    ]
  },
  {
    "id": "prop-baner-hilltop-panorama-penthou-20",
    "slug": "baner-hilltop-panorama-penthouse",
    "title": "Baner Hilltop Panorama Penthouse",
    "description": "Experience premier luxury living in Pan Card Club Road, Baner Hills, Pune. Featuring grand open architectural layouts, imported Italian marble and warm oak flooring, bespoke Poliform modular kitchen, smart automated climate control, dedicated private parking, and 24/7 concierge security.",
    "price": 120000,
    "type": "RESIDENTIAL",
    "listingType": "RENT",
    "status": "VERIFIED",
    "address": "Pan Card Club Road, Baner Hills, Pune",
    "city": "Pune",
    "state": "Maharashtra",
    "zipCode": "411001",
    "latitude": 18.558,
    "longitude": 73.791,
    "bedrooms": 3,
    "bathrooms": 3,
    "areaSqFt": 2350,
    "features": {
      "view": "Lush Garden & Skyline Vista",
      "parking": "2 Dedicated Covered Bays",
      "furnishing": "Fully Furnished Designer Decor",
      "maintenance": "₹16,500 / month",
      "amenities": [
        "Temperature Controlled Pool",
        "Clubhouse & Spa",
        "Private Elevators",
        "24/7 Concierge",
        "Fitness Studio",
        "EV Charging Bays"
      ]
    },
    "agentId": "agent-aditya-joshi",
    "agent": {
      "id": "agent-aditya-joshi",
      "name": "Aditya Joshi",
      "email": "aditya@banerprime.in",
      "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
      "_count": {
        "listings": 19
      }
    },
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1600&q=85"
      }
    ],
    "createdAt": "2026-02-15T10:00:00.000Z",
    "updatedAt": "2026-03-29T10:00:00.000Z",
    "priceHistory": [
      {
        "id": "ph-19-1",
        "date": "2026-02-15",
        "price": 120000,
        "event": "Listed For Rent",
        "source": "Verified Broker Network"
      }
    ],
    "taxHistory": [
      {
        "id": "th-19-1",
        "year": 2025,
        "taxPaid": 240,
        "assessment": 90000
      }
    ],
    "schools": [
      {
        "id": "sch-19-1",
        "name": "The Bishop's School, Pune",
        "rating": 10,
        "type": "ICSE",
        "level": "K-12",
        "distance": 1.4
      },
      {
        "id": "sch-19-2",
        "name": "Symbiosis International School",
        "rating": 9,
        "type": "IB / Cambridge",
        "level": "PreK-12",
        "distance": 2.1
      }
    ]
  },
  {
    "id": "prop-sindh-society-grand-bungalow-a-21",
    "slug": "sindh-society-grand-bungalow-aundh",
    "title": "Sindh Society Grand Bungalow | Aundh",
    "description": "Experience premier luxury living in Sindh Housing Society, Aundh, Pune. Featuring grand open architectural layouts, imported Italian marble and warm oak flooring, bespoke Poliform modular kitchen, smart automated climate control, dedicated private parking, and 24/7 concierge security.",
    "price": 185000000,
    "type": "RESIDENTIAL",
    "listingType": "SALE",
    "status": "VERIFIED",
    "address": "Sindh Housing Society, Aundh, Pune",
    "city": "Pune",
    "state": "Maharashtra",
    "zipCode": "411001",
    "latitude": 18.5582,
    "longitude": 73.8065,
    "bedrooms": 5,
    "bathrooms": 6,
    "areaSqFt": 6400,
    "features": {
      "view": "Panoramic Greenery & City Horizon",
      "parking": "4 Dedicated Covered Bays",
      "furnishing": "Semi-Furnished Premium Italian Marble",
      "maintenance": "₹27,500 / month",
      "amenities": [
        "Temperature Controlled Pool",
        "Clubhouse & Spa",
        "Private Elevators",
        "24/7 Concierge",
        "Fitness Studio",
        "EV Charging Bays"
      ]
    },
    "agentId": "agent-aditya-joshi",
    "agent": {
      "id": "agent-aditya-joshi",
      "name": "Aditya Joshi",
      "email": "aditya@banerprime.in",
      "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
      "_count": {
        "listings": 19
      }
    },
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1600&q=85"
      }
    ],
    "createdAt": "2026-02-15T10:00:00.000Z",
    "updatedAt": "2026-03-29T10:00:00.000Z",
    "priceHistory": [
      {
        "id": "ph-20-1",
        "date": "2026-02-15",
        "price": 185000000,
        "event": "Listed For Sale",
        "source": "Verified Broker Network"
      }
    ],
    "taxHistory": [
      {
        "id": "th-20-1",
        "year": 2025,
        "taxPaid": 370000,
        "assessment": 138750000
      }
    ],
    "schools": [
      {
        "id": "sch-20-1",
        "name": "The Bishop's School, Pune",
        "rating": 10,
        "type": "ICSE",
        "level": "K-12",
        "distance": 1.4
      },
      {
        "id": "sch-20-2",
        "name": "Symbiosis International School",
        "rating": 9,
        "type": "IB / Cambridge",
        "level": "PreK-12",
        "distance": 2.1
      }
    ]
  },
  {
    "id": "prop-aundh-dp-road-contemporary-res-22",
    "slug": "aundh-dp-road-contemporary-residence",
    "title": "Aundh DP Road Contemporary Residence",
    "description": "Experience premier luxury living in DP Road, Harmony Society, Aundh, Pune. Featuring grand open architectural layouts, imported Italian marble and warm oak flooring, bespoke Poliform modular kitchen, smart automated climate control, dedicated private parking, and 24/7 concierge security.",
    "price": 62000000,
    "type": "RESIDENTIAL",
    "listingType": "SALE",
    "status": "VERIFIED",
    "address": "DP Road, Harmony Society, Aundh, Pune",
    "city": "Pune",
    "state": "Maharashtra",
    "zipCode": "411001",
    "latitude": 18.564,
    "longitude": 73.801,
    "bedrooms": 3,
    "bathrooms": 3,
    "areaSqFt": 2200,
    "features": {
      "view": "Panoramic Greenery & City Horizon",
      "parking": "2 Dedicated Covered Bays",
      "furnishing": "Semi-Furnished Premium Italian Marble",
      "maintenance": "₹16,500 / month",
      "amenities": [
        "Temperature Controlled Pool",
        "Clubhouse & Spa",
        "Private Elevators",
        "24/7 Concierge",
        "Fitness Studio",
        "EV Charging Bays"
      ]
    },
    "agentId": "agent-aditya-joshi",
    "agent": {
      "id": "agent-aditya-joshi",
      "name": "Aditya Joshi",
      "email": "aditya@banerprime.in",
      "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
      "_count": {
        "listings": 19
      }
    },
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85"
      }
    ],
    "createdAt": "2026-02-15T10:00:00.000Z",
    "updatedAt": "2026-03-29T10:00:00.000Z",
    "priceHistory": [
      {
        "id": "ph-21-1",
        "date": "2026-02-15",
        "price": 62000000,
        "event": "Listed For Sale",
        "source": "Verified Broker Network"
      }
    ],
    "taxHistory": [
      {
        "id": "th-21-1",
        "year": 2025,
        "taxPaid": 124000,
        "assessment": 46500000
      }
    ],
    "schools": [
      {
        "id": "sch-21-1",
        "name": "The Bishop's School, Pune",
        "rating": 10,
        "type": "ICSE",
        "level": "K-12",
        "distance": 1.4
      },
      {
        "id": "sch-21-2",
        "name": "Symbiosis International School",
        "rating": 9,
        "type": "IB / Cambridge",
        "level": "PreK-12",
        "distance": 2.1
      }
    ]
  },
  {
    "id": "prop-balewadi-stadium-view-luxury-a-23",
    "slug": "balewadi-stadium-view-luxury-apartment",
    "title": "Balewadi Stadium View Luxury Apartment",
    "description": "Experience premier luxury living in Balewadi Stadium Road, Pune. Featuring grand open architectural layouts, imported Italian marble and warm oak flooring, bespoke Poliform modular kitchen, smart automated climate control, dedicated private parking, and 24/7 concierge security.",
    "price": 65000,
    "type": "RESIDENTIAL",
    "listingType": "RENT",
    "status": "VERIFIED",
    "address": "Balewadi Stadium Road, Pune",
    "city": "Pune",
    "state": "Maharashtra",
    "zipCode": "411001",
    "latitude": 18.578,
    "longitude": 73.765,
    "bedrooms": 2,
    "bathrooms": 2,
    "areaSqFt": 1400,
    "features": {
      "view": "Lush Garden & Skyline Vista",
      "parking": "2 Dedicated Covered Bays",
      "furnishing": "Fully Furnished Designer Decor",
      "maintenance": "₹11,000 / month",
      "amenities": [
        "Temperature Controlled Pool",
        "Clubhouse & Spa",
        "Private Elevators",
        "24/7 Concierge",
        "Fitness Studio",
        "EV Charging Bays"
      ]
    },
    "agentId": "agent-aditya-joshi",
    "agent": {
      "id": "agent-aditya-joshi",
      "name": "Aditya Joshi",
      "email": "aditya@banerprime.in",
      "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
      "_count": {
        "listings": 19
      }
    },
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85"
      }
    ],
    "createdAt": "2026-02-15T10:00:00.000Z",
    "updatedAt": "2026-03-29T10:00:00.000Z",
    "priceHistory": [
      {
        "id": "ph-22-1",
        "date": "2026-02-15",
        "price": 65000,
        "event": "Listed For Rent",
        "source": "Verified Broker Network"
      }
    ],
    "taxHistory": [
      {
        "id": "th-22-1",
        "year": 2025,
        "taxPaid": 130,
        "assessment": 48750
      }
    ],
    "schools": [
      {
        "id": "sch-22-1",
        "name": "The Bishop's School, Pune",
        "rating": 10,
        "type": "ICSE",
        "level": "K-12",
        "distance": 1.4
      },
      {
        "id": "sch-22-2",
        "name": "Symbiosis International School",
        "rating": 9,
        "type": "IB / Cambridge",
        "level": "PreK-12",
        "distance": 2.1
      }
    ]
  },
  {
    "id": "prop-baner-modern-high-rise-loft-24",
    "slug": "baner-modern-high-rise-loft",
    "title": "Baner Modern High-Rise Loft",
    "description": "Experience premier luxury living in Veerbhadra Nagar, Baner, Pune. Featuring grand open architectural layouts, imported Italian marble and warm oak flooring, bespoke Poliform modular kitchen, smart automated climate control, dedicated private parking, and 24/7 concierge security.",
    "price": 46000000,
    "type": "RESIDENTIAL",
    "listingType": "SALE",
    "status": "VERIFIED",
    "address": "Veerbhadra Nagar, Baner, Pune",
    "city": "Pune",
    "state": "Maharashtra",
    "zipCode": "411001",
    "latitude": 18.569,
    "longitude": 73.782,
    "bedrooms": 3,
    "bathrooms": 2,
    "areaSqFt": 1800,
    "features": {
      "view": "Panoramic Greenery & City Horizon",
      "parking": "2 Dedicated Covered Bays",
      "furnishing": "Semi-Furnished Premium Italian Marble",
      "maintenance": "₹16,500 / month",
      "amenities": [
        "Temperature Controlled Pool",
        "Clubhouse & Spa",
        "Private Elevators",
        "24/7 Concierge",
        "Fitness Studio",
        "EV Charging Bays"
      ]
    },
    "agentId": "agent-aditya-joshi",
    "agent": {
      "id": "agent-aditya-joshi",
      "name": "Aditya Joshi",
      "email": "aditya@banerprime.in",
      "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
      "_count": {
        "listings": 19
      }
    },
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85"
      }
    ],
    "createdAt": "2026-02-15T10:00:00.000Z",
    "updatedAt": "2026-03-29T10:00:00.000Z",
    "priceHistory": [
      {
        "id": "ph-23-1",
        "date": "2026-02-15",
        "price": 46000000,
        "event": "Listed For Sale",
        "source": "Verified Broker Network"
      }
    ],
    "taxHistory": [
      {
        "id": "th-23-1",
        "year": 2025,
        "taxPaid": 92000,
        "assessment": 34500000
      }
    ],
    "schools": [
      {
        "id": "sch-23-1",
        "name": "The Bishop's School, Pune",
        "rating": 10,
        "type": "ICSE",
        "level": "K-12",
        "distance": 1.4
      },
      {
        "id": "sch-23-2",
        "name": "Symbiosis International School",
        "rating": 9,
        "type": "IB / Cambridge",
        "level": "PreK-12",
        "distance": 2.1
      }
    ]
  },
  {
    "id": "prop-model-colony-royal-orchid-resi-25",
    "slug": "model-colony-royal-orchid-residence",
    "title": "Model Colony Royal Orchid Residence",
    "description": "Experience premier luxury living in Model Colony, Shivaji Nagar, Pune. Featuring grand open architectural layouts, imported Italian marble and warm oak flooring, bespoke Poliform modular kitchen, smart automated climate control, dedicated private parking, and 24/7 concierge security.",
    "price": 95000000,
    "type": "RESIDENTIAL",
    "listingType": "SALE",
    "status": "VERIFIED",
    "address": "Model Colony, Shivaji Nagar, Pune",
    "city": "Pune",
    "state": "Maharashtra",
    "zipCode": "411001",
    "latitude": 18.5315,
    "longitude": 73.8375,
    "bedrooms": 4,
    "bathrooms": 4,
    "areaSqFt": 3500,
    "features": {
      "view": "Panoramic Greenery & City Horizon",
      "parking": "3 Dedicated Covered Bays",
      "furnishing": "Semi-Furnished Premium Italian Marble",
      "maintenance": "₹22,000 / month",
      "amenities": [
        "Temperature Controlled Pool",
        "Clubhouse & Spa",
        "Private Elevators",
        "24/7 Concierge",
        "Fitness Studio",
        "EV Charging Bays"
      ]
    },
    "agentId": "agent-rohan-deshmukh",
    "agent": {
      "id": "agent-rohan-deshmukh",
      "name": "Rohan Deshmukh",
      "email": "rohan.deshmukh@puneluxury.in",
      "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
      "_count": {
        "listings": 28
      }
    },
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=85"
      }
    ],
    "createdAt": "2026-02-15T10:00:00.000Z",
    "updatedAt": "2026-03-29T10:00:00.000Z",
    "priceHistory": [
      {
        "id": "ph-24-1",
        "date": "2026-02-15",
        "price": 95000000,
        "event": "Listed For Sale",
        "source": "Verified Broker Network"
      }
    ],
    "taxHistory": [
      {
        "id": "th-24-1",
        "year": 2025,
        "taxPaid": 190000,
        "assessment": 71250000
      }
    ],
    "schools": [
      {
        "id": "sch-24-1",
        "name": "The Bishop's School, Pune",
        "rating": 10,
        "type": "ICSE",
        "level": "K-12",
        "distance": 1.4
      },
      {
        "id": "sch-24-2",
        "name": "Symbiosis International School",
        "rating": 9,
        "type": "IB / Cambridge",
        "level": "PreK-12",
        "distance": 2.1
      }
    ]
  },
  {
    "id": "prop-senapati-bapat-road-skyline-pe-26",
    "slug": "senapati-bapat-road-skyline-penthouse",
    "title": "Senapati Bapat Road Skyline Penthouse",
    "description": "Experience premier luxury living in Near JW Marriott, SB Road, Pune. Featuring grand open architectural layouts, imported Italian marble and warm oak flooring, bespoke Poliform modular kitchen, smart automated climate control, dedicated private parking, and 24/7 concierge security.",
    "price": 110000000,
    "type": "RESIDENTIAL",
    "listingType": "SALE",
    "status": "VERIFIED",
    "address": "Near JW Marriott, SB Road, Pune",
    "city": "Pune",
    "state": "Maharashtra",
    "zipCode": "411001",
    "latitude": 18.5355,
    "longitude": 73.829,
    "bedrooms": 4,
    "bathrooms": 5,
    "areaSqFt": 4200,
    "features": {
      "view": "Panoramic Greenery & City Horizon",
      "parking": "3 Dedicated Covered Bays",
      "furnishing": "Semi-Furnished Premium Italian Marble",
      "maintenance": "₹22,000 / month",
      "amenities": [
        "Temperature Controlled Pool",
        "Clubhouse & Spa",
        "Private Elevators",
        "24/7 Concierge",
        "Fitness Studio",
        "EV Charging Bays"
      ]
    },
    "agentId": "agent-rohan-deshmukh",
    "agent": {
      "id": "agent-rohan-deshmukh",
      "name": "Rohan Deshmukh",
      "email": "rohan.deshmukh@puneluxury.in",
      "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
      "_count": {
        "listings": 28
      }
    },
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=85"
      }
    ],
    "createdAt": "2026-02-15T10:00:00.000Z",
    "updatedAt": "2026-03-29T10:00:00.000Z",
    "priceHistory": [
      {
        "id": "ph-25-1",
        "date": "2026-02-15",
        "price": 110000000,
        "event": "Listed For Sale",
        "source": "Verified Broker Network"
      }
    ],
    "taxHistory": [
      {
        "id": "th-25-1",
        "year": 2025,
        "taxPaid": 220000,
        "assessment": 82500000
      }
    ],
    "schools": [
      {
        "id": "sch-25-1",
        "name": "The Bishop's School, Pune",
        "rating": 10,
        "type": "ICSE",
        "level": "K-12",
        "distance": 1.4
      },
      {
        "id": "sch-25-2",
        "name": "Symbiosis International School",
        "rating": 9,
        "type": "IB / Cambridge",
        "level": "PreK-12",
        "distance": 2.1
      }
    ]
  },
  {
    "id": "prop-prabhat-road-traditional-herit-27",
    "slug": "prabhat-road-traditional-heritage-bungalow",
    "title": "Prabhat Road Traditional Heritage Bungalow",
    "description": "Experience premier luxury living in Lane 9, Prabhat Road, Erandwane, Pune. Featuring grand open architectural layouts, imported Italian marble and warm oak flooring, bespoke Poliform modular kitchen, smart automated climate control, dedicated private parking, and 24/7 concierge security.",
    "price": 140000000,
    "type": "RESIDENTIAL",
    "listingType": "SALE",
    "status": "VERIFIED",
    "address": "Lane 9, Prabhat Road, Erandwane, Pune",
    "city": "Pune",
    "state": "Maharashtra",
    "zipCode": "411001",
    "latitude": 18.5135,
    "longitude": 73.834,
    "bedrooms": 5,
    "bathrooms": 5,
    "areaSqFt": 5100,
    "features": {
      "view": "Panoramic Greenery & City Horizon",
      "parking": "4 Dedicated Covered Bays",
      "furnishing": "Semi-Furnished Premium Italian Marble",
      "maintenance": "₹27,500 / month",
      "amenities": [
        "Temperature Controlled Pool",
        "Clubhouse & Spa",
        "Private Elevators",
        "24/7 Concierge",
        "Fitness Studio",
        "EV Charging Bays"
      ]
    },
    "agentId": "agent-rohan-deshmukh",
    "agent": {
      "id": "agent-rohan-deshmukh",
      "name": "Rohan Deshmukh",
      "email": "rohan.deshmukh@puneluxury.in",
      "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
      "_count": {
        "listings": 28
      }
    },
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85"
      }
    ],
    "createdAt": "2026-02-15T10:00:00.000Z",
    "updatedAt": "2026-03-29T10:00:00.000Z",
    "priceHistory": [
      {
        "id": "ph-26-1",
        "date": "2026-02-15",
        "price": 140000000,
        "event": "Listed For Sale",
        "source": "Verified Broker Network"
      }
    ],
    "taxHistory": [
      {
        "id": "th-26-1",
        "year": 2025,
        "taxPaid": 280000,
        "assessment": 105000000
      }
    ],
    "schools": [
      {
        "id": "sch-26-1",
        "name": "The Bishop's School, Pune",
        "rating": 10,
        "type": "ICSE",
        "level": "K-12",
        "distance": 1.4
      },
      {
        "id": "sch-26-2",
        "name": "Symbiosis International School",
        "rating": 9,
        "type": "IB / Cambridge",
        "level": "PreK-12",
        "distance": 2.1
      }
    ]
  },
  {
    "id": "prop-law-college-road-serenity-suit-28",
    "slug": "law-college-road-serenity-suite",
    "title": "Law College Road Serenity Suite",
    "description": "Experience premier luxury living in Off Law College Road, Deccan, Pune. Featuring grand open architectural layouts, imported Italian marble and warm oak flooring, bespoke Poliform modular kitchen, smart automated climate control, dedicated private parking, and 24/7 concierge security.",
    "price": 95000,
    "type": "RESIDENTIAL",
    "listingType": "RENT",
    "status": "VERIFIED",
    "address": "Off Law College Road, Deccan, Pune",
    "city": "Pune",
    "state": "Maharashtra",
    "zipCode": "411001",
    "latitude": 18.517,
    "longitude": 73.831,
    "bedrooms": 3,
    "bathrooms": 3,
    "areaSqFt": 2100,
    "features": {
      "view": "Lush Garden & Skyline Vista",
      "parking": "2 Dedicated Covered Bays",
      "furnishing": "Fully Furnished Designer Decor",
      "maintenance": "₹16,500 / month",
      "amenities": [
        "Temperature Controlled Pool",
        "Clubhouse & Spa",
        "Private Elevators",
        "24/7 Concierge",
        "Fitness Studio",
        "EV Charging Bays"
      ]
    },
    "agentId": "agent-rohan-deshmukh",
    "agent": {
      "id": "agent-rohan-deshmukh",
      "name": "Rohan Deshmukh",
      "email": "rohan.deshmukh@puneluxury.in",
      "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
      "_count": {
        "listings": 28
      }
    },
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1600&q=85"
      }
    ],
    "createdAt": "2026-02-15T10:00:00.000Z",
    "updatedAt": "2026-03-29T10:00:00.000Z",
    "priceHistory": [
      {
        "id": "ph-27-1",
        "date": "2026-02-15",
        "price": 95000,
        "event": "Listed For Rent",
        "source": "Verified Broker Network"
      }
    ],
    "taxHistory": [
      {
        "id": "th-27-1",
        "year": 2025,
        "taxPaid": 190,
        "assessment": 71250
      }
    ],
    "schools": [
      {
        "id": "sch-27-1",
        "name": "The Bishop's School, Pune",
        "rating": 10,
        "type": "ICSE",
        "level": "K-12",
        "distance": 1.4
      },
      {
        "id": "sch-27-2",
        "name": "Symbiosis International School",
        "rating": 9,
        "type": "IB / Cambridge",
        "level": "PreK-12",
        "distance": 2.1
      }
    ]
  },
  {
    "id": "prop-fc-road-university-corridor-lo-29",
    "slug": "fc-road-university-corridor-loft",
    "title": "FC Road University Corridor Loft",
    "description": "Experience premier luxury living in Fergusson College Road, Shivajinagar, Pune. Featuring grand open architectural layouts, imported Italian marble and warm oak flooring, bespoke Poliform modular kitchen, smart automated climate control, dedicated private parking, and 24/7 concierge security.",
    "price": 58000000,
    "type": "RESIDENTIAL",
    "listingType": "SALE",
    "status": "VERIFIED",
    "address": "Fergusson College Road, Shivajinagar, Pune",
    "city": "Pune",
    "state": "Maharashtra",
    "zipCode": "411001",
    "latitude": 18.526,
    "longitude": 73.842,
    "bedrooms": 3,
    "bathrooms": 3,
    "areaSqFt": 1900,
    "features": {
      "view": "Panoramic Greenery & City Horizon",
      "parking": "2 Dedicated Covered Bays",
      "furnishing": "Semi-Furnished Premium Italian Marble",
      "maintenance": "₹16,500 / month",
      "amenities": [
        "Temperature Controlled Pool",
        "Clubhouse & Spa",
        "Private Elevators",
        "24/7 Concierge",
        "Fitness Studio",
        "EV Charging Bays"
      ]
    },
    "agentId": "agent-rohan-deshmukh",
    "agent": {
      "id": "agent-rohan-deshmukh",
      "name": "Rohan Deshmukh",
      "email": "rohan.deshmukh@puneluxury.in",
      "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
      "_count": {
        "listings": 28
      }
    },
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1600&q=85"
      }
    ],
    "createdAt": "2026-02-15T10:00:00.000Z",
    "updatedAt": "2026-03-29T10:00:00.000Z",
    "priceHistory": [
      {
        "id": "ph-28-1",
        "date": "2026-02-15",
        "price": 58000000,
        "event": "Listed For Sale",
        "source": "Verified Broker Network"
      }
    ],
    "taxHistory": [
      {
        "id": "th-28-1",
        "year": 2025,
        "taxPaid": 116000,
        "assessment": 43500000
      }
    ],
    "schools": [
      {
        "id": "sch-28-1",
        "name": "The Bishop's School, Pune",
        "rating": 10,
        "type": "ICSE",
        "level": "K-12",
        "distance": 1.4
      },
      {
        "id": "sch-28-2",
        "name": "Symbiosis International School",
        "rating": 9,
        "type": "IB / Cambridge",
        "level": "PreK-12",
        "distance": 2.1
      }
    ]
  },
  {
    "id": "prop-eon-riverside-sky-villa-kharad-30",
    "slug": "eon-riverside-sky-villa-kharadi",
    "title": "EON Riverside Sky Villa | Kharadi",
    "description": "Experience premier luxury living in Near EON IT Park, Riverfront, Kharadi, Pune. Featuring grand open architectural layouts, imported Italian marble and warm oak flooring, bespoke Poliform modular kitchen, smart automated climate control, dedicated private parking, and 24/7 concierge security.",
    "price": 68000000,
    "type": "RESIDENTIAL",
    "listingType": "SALE",
    "status": "VERIFIED",
    "address": "Near EON IT Park, Riverfront, Kharadi, Pune",
    "city": "Pune",
    "state": "Maharashtra",
    "zipCode": "411001",
    "latitude": 18.5525,
    "longitude": 73.952,
    "bedrooms": 4,
    "bathrooms": 4,
    "areaSqFt": 2900,
    "features": {
      "view": "Panoramic Greenery & City Horizon",
      "parking": "3 Dedicated Covered Bays",
      "furnishing": "Semi-Furnished Premium Italian Marble",
      "maintenance": "₹22,000 / month",
      "amenities": [
        "Temperature Controlled Pool",
        "Clubhouse & Spa",
        "Private Elevators",
        "24/7 Concierge",
        "Fitness Studio",
        "EV Charging Bays"
      ]
    },
    "agentId": "agent-rohan-deshmukh",
    "agent": {
      "id": "agent-rohan-deshmukh",
      "name": "Rohan Deshmukh",
      "email": "rohan.deshmukh@puneluxury.in",
      "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
      "_count": {
        "listings": 28
      }
    },
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=85"
      }
    ],
    "createdAt": "2026-02-15T10:00:00.000Z",
    "updatedAt": "2026-03-29T10:00:00.000Z",
    "priceHistory": [
      {
        "id": "ph-29-1",
        "date": "2026-02-15",
        "price": 68000000,
        "event": "Listed For Sale",
        "source": "Verified Broker Network"
      }
    ],
    "taxHistory": [
      {
        "id": "th-29-1",
        "year": 2025,
        "taxPaid": 136000,
        "assessment": 51000000
      }
    ],
    "schools": [
      {
        "id": "sch-29-1",
        "name": "The Bishop's School, Pune",
        "rating": 10,
        "type": "ICSE",
        "level": "K-12",
        "distance": 1.4
      },
      {
        "id": "sch-29-2",
        "name": "Symbiosis International School",
        "rating": 9,
        "type": "IB / Cambridge",
        "level": "PreK-12",
        "distance": 2.1
      }
    ]
  },
  {
    "id": "prop-world-trade-center-corridor-su-31",
    "slug": "world-trade-center-corridor-suite-kharadi",
    "title": "World Trade Center Corridor Suite | Kharadi",
    "description": "Experience premier luxury living in Grant Road, Kharadi, Pune. Featuring grand open architectural layouts, imported Italian marble and warm oak flooring, bespoke Poliform modular kitchen, smart automated climate control, dedicated private parking, and 24/7 concierge security.",
    "price": 75000,
    "type": "RESIDENTIAL",
    "listingType": "RENT",
    "status": "VERIFIED",
    "address": "Grant Road, Kharadi, Pune",
    "city": "Pune",
    "state": "Maharashtra",
    "zipCode": "411001",
    "latitude": 18.549,
    "longitude": 73.945,
    "bedrooms": 3,
    "bathrooms": 2,
    "areaSqFt": 1850,
    "features": {
      "view": "Lush Garden & Skyline Vista",
      "parking": "2 Dedicated Covered Bays",
      "furnishing": "Fully Furnished Designer Decor",
      "maintenance": "₹16,500 / month",
      "amenities": [
        "Temperature Controlled Pool",
        "Clubhouse & Spa",
        "Private Elevators",
        "24/7 Concierge",
        "Fitness Studio",
        "EV Charging Bays"
      ]
    },
    "agentId": "agent-rohan-deshmukh",
    "agent": {
      "id": "agent-rohan-deshmukh",
      "name": "Rohan Deshmukh",
      "email": "rohan.deshmukh@puneluxury.in",
      "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
      "_count": {
        "listings": 28
      }
    },
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=85"
      }
    ],
    "createdAt": "2026-02-15T10:00:00.000Z",
    "updatedAt": "2026-03-29T10:00:00.000Z",
    "priceHistory": [
      {
        "id": "ph-30-1",
        "date": "2026-02-15",
        "price": 75000,
        "event": "Listed For Rent",
        "source": "Verified Broker Network"
      }
    ],
    "taxHistory": [
      {
        "id": "th-30-1",
        "year": 2025,
        "taxPaid": 150,
        "assessment": 56250
      }
    ],
    "schools": [
      {
        "id": "sch-30-1",
        "name": "The Bishop's School, Pune",
        "rating": 10,
        "type": "ICSE",
        "level": "K-12",
        "distance": 1.4
      },
      {
        "id": "sch-30-2",
        "name": "Symbiosis International School",
        "rating": 9,
        "type": "IB / Cambridge",
        "level": "PreK-12",
        "distance": 2.1
      }
    ]
  },
  {
    "id": "prop-magarpatta-city-laburnum-park--32",
    "slug": "magarpatta-city-laburnum-park-villa",
    "title": "Magarpatta City Laburnum Park Villa",
    "description": "Experience premier luxury living in Laburnum Park, Magarpatta City, Hadapsar, Pune. Featuring grand open architectural layouts, imported Italian marble and warm oak flooring, bespoke Poliform modular kitchen, smart automated climate control, dedicated private parking, and 24/7 concierge security.",
    "price": 82000000,
    "type": "RESIDENTIAL",
    "listingType": "SALE",
    "status": "VERIFIED",
    "address": "Laburnum Park, Magarpatta City, Hadapsar, Pune",
    "city": "Pune",
    "state": "Maharashtra",
    "zipCode": "411001",
    "latitude": 18.5165,
    "longitude": 73.9285,
    "bedrooms": 4,
    "bathrooms": 4,
    "areaSqFt": 3600,
    "features": {
      "view": "Panoramic Greenery & City Horizon",
      "parking": "3 Dedicated Covered Bays",
      "furnishing": "Semi-Furnished Premium Italian Marble",
      "maintenance": "₹22,000 / month",
      "amenities": [
        "Temperature Controlled Pool",
        "Clubhouse & Spa",
        "Private Elevators",
        "24/7 Concierge",
        "Fitness Studio",
        "EV Charging Bays"
      ]
    },
    "agentId": "agent-rohan-deshmukh",
    "agent": {
      "id": "agent-rohan-deshmukh",
      "name": "Rohan Deshmukh",
      "email": "rohan.deshmukh@puneluxury.in",
      "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
      "_count": {
        "listings": 28
      }
    },
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85"
      }
    ],
    "createdAt": "2026-02-15T10:00:00.000Z",
    "updatedAt": "2026-03-29T10:00:00.000Z",
    "priceHistory": [
      {
        "id": "ph-31-1",
        "date": "2026-02-15",
        "price": 82000000,
        "event": "Listed For Sale",
        "source": "Verified Broker Network"
      }
    ],
    "taxHistory": [
      {
        "id": "th-31-1",
        "year": 2025,
        "taxPaid": 164000,
        "assessment": 61500000
      }
    ],
    "schools": [
      {
        "id": "sch-31-1",
        "name": "The Bishop's School, Pune",
        "rating": 10,
        "type": "ICSE",
        "level": "K-12",
        "distance": 1.4
      },
      {
        "id": "sch-31-2",
        "name": "Symbiosis International School",
        "rating": 9,
        "type": "IB / Cambridge",
        "level": "PreK-12",
        "distance": 2.1
      }
    ]
  },
  {
    "id": "prop-amanora-gateway-towers-iconic--33",
    "slug": "amanora-gateway-towers-iconic-penthouse",
    "title": "Amanora Gateway Towers Iconic Penthouse",
    "description": "Experience premier luxury living in Amanora Park Town, Hadapsar, Pune. Featuring grand open architectural layouts, imported Italian marble and warm oak flooring, bespoke Poliform modular kitchen, smart automated climate control, dedicated private parking, and 24/7 concierge security.",
    "price": 115000000,
    "type": "RESIDENTIAL",
    "listingType": "SALE",
    "status": "VERIFIED",
    "address": "Amanora Park Town, Hadapsar, Pune",
    "city": "Pune",
    "state": "Maharashtra",
    "zipCode": "411001",
    "latitude": 18.5195,
    "longitude": 73.9355,
    "bedrooms": 4,
    "bathrooms": 5,
    "areaSqFt": 4800,
    "features": {
      "view": "Panoramic Greenery & City Horizon",
      "parking": "3 Dedicated Covered Bays",
      "furnishing": "Semi-Furnished Premium Italian Marble",
      "maintenance": "₹22,000 / month",
      "amenities": [
        "Temperature Controlled Pool",
        "Clubhouse & Spa",
        "Private Elevators",
        "24/7 Concierge",
        "Fitness Studio",
        "EV Charging Bays"
      ]
    },
    "agentId": "agent-rohan-deshmukh",
    "agent": {
      "id": "agent-rohan-deshmukh",
      "name": "Rohan Deshmukh",
      "email": "rohan.deshmukh@puneluxury.in",
      "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
      "_count": {
        "listings": 28
      }
    },
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=85"
      }
    ],
    "createdAt": "2026-02-15T10:00:00.000Z",
    "updatedAt": "2026-03-29T10:00:00.000Z",
    "priceHistory": [
      {
        "id": "ph-32-1",
        "date": "2026-02-15",
        "price": 115000000,
        "event": "Listed For Sale",
        "source": "Verified Broker Network"
      }
    ],
    "taxHistory": [
      {
        "id": "th-32-1",
        "year": 2025,
        "taxPaid": 230000,
        "assessment": 86250000
      }
    ],
    "schools": [
      {
        "id": "sch-32-1",
        "name": "The Bishop's School, Pune",
        "rating": 10,
        "type": "ICSE",
        "level": "K-12",
        "distance": 1.4
      },
      {
        "id": "sch-32-2",
        "name": "Symbiosis International School",
        "rating": 9,
        "type": "IB / Cambridge",
        "level": "PreK-12",
        "distance": 2.1
      }
    ]
  },
  {
    "id": "prop-amanora-sweet-water-villas-gar-34",
    "slug": "amanora-sweet-water-villas-garden-home",
    "title": "Amanora Sweet Water Villas Garden Home",
    "description": "Experience premier luxury living in Sweet Water Villas, Amanora, Pune. Featuring grand open architectural layouts, imported Italian marble and warm oak flooring, bespoke Poliform modular kitchen, smart automated climate control, dedicated private parking, and 24/7 concierge security.",
    "price": 150000,
    "type": "RESIDENTIAL",
    "listingType": "RENT",
    "status": "VERIFIED",
    "address": "Sweet Water Villas, Amanora, Pune",
    "city": "Pune",
    "state": "Maharashtra",
    "zipCode": "411001",
    "latitude": 18.514,
    "longitude": 73.939,
    "bedrooms": 4,
    "bathrooms": 4,
    "areaSqFt": 3400,
    "features": {
      "view": "Lush Garden & Skyline Vista",
      "parking": "3 Dedicated Covered Bays",
      "furnishing": "Fully Furnished Designer Decor",
      "maintenance": "₹22,000 / month",
      "amenities": [
        "Temperature Controlled Pool",
        "Clubhouse & Spa",
        "Private Elevators",
        "24/7 Concierge",
        "Fitness Studio",
        "EV Charging Bays"
      ]
    },
    "agentId": "agent-rohan-deshmukh",
    "agent": {
      "id": "agent-rohan-deshmukh",
      "name": "Rohan Deshmukh",
      "email": "rohan.deshmukh@puneluxury.in",
      "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
      "_count": {
        "listings": 28
      }
    },
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1600&q=85"
      }
    ],
    "createdAt": "2026-02-15T10:00:00.000Z",
    "updatedAt": "2026-03-29T10:00:00.000Z",
    "priceHistory": [
      {
        "id": "ph-33-1",
        "date": "2026-02-15",
        "price": 150000,
        "event": "Listed For Rent",
        "source": "Verified Broker Network"
      }
    ],
    "taxHistory": [
      {
        "id": "th-33-1",
        "year": 2025,
        "taxPaid": 300,
        "assessment": 112500
      }
    ],
    "schools": [
      {
        "id": "sch-33-1",
        "name": "The Bishop's School, Pune",
        "rating": 10,
        "type": "ICSE",
        "level": "K-12",
        "distance": 1.4
      },
      {
        "id": "sch-33-2",
        "name": "Symbiosis International School",
        "rating": 9,
        "type": "IB / Cambridge",
        "level": "PreK-12",
        "distance": 2.1
      }
    ]
  },
  {
    "id": "prop-blue-ridge-golf-course-sky-sui-35",
    "slug": "blue-ridge-golf-course-sky-suite-hinjawadi",
    "title": "Blue Ridge Golf Course Sky Suite | Hinjawadi",
    "description": "Experience premier luxury living in Blue Ridge Town, Hinjawadi Phase 1, Pune. Featuring grand open architectural layouts, imported Italian marble and warm oak flooring, bespoke Poliform modular kitchen, smart automated climate control, dedicated private parking, and 24/7 concierge security.",
    "price": 42000000,
    "type": "RESIDENTIAL",
    "listingType": "SALE",
    "status": "VERIFIED",
    "address": "Blue Ridge Town, Hinjawadi Phase 1, Pune",
    "city": "Pune",
    "state": "Maharashtra",
    "zipCode": "411001",
    "latitude": 18.5875,
    "longitude": 73.7385,
    "bedrooms": 3,
    "bathrooms": 3,
    "areaSqFt": 1950,
    "features": {
      "view": "Panoramic Greenery & City Horizon",
      "parking": "2 Dedicated Covered Bays",
      "furnishing": "Semi-Furnished Premium Italian Marble",
      "maintenance": "₹16,500 / month",
      "amenities": [
        "Temperature Controlled Pool",
        "Clubhouse & Spa",
        "Private Elevators",
        "24/7 Concierge",
        "Fitness Studio",
        "EV Charging Bays"
      ]
    },
    "agentId": "agent-aditya-joshi",
    "agent": {
      "id": "agent-aditya-joshi",
      "name": "Aditya Joshi",
      "email": "aditya@banerprime.in",
      "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
      "_count": {
        "listings": 19
      }
    },
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85"
      }
    ],
    "createdAt": "2026-02-15T10:00:00.000Z",
    "updatedAt": "2026-03-29T10:00:00.000Z",
    "priceHistory": [
      {
        "id": "ph-34-1",
        "date": "2026-02-15",
        "price": 42000000,
        "event": "Listed For Sale",
        "source": "Verified Broker Network"
      }
    ],
    "taxHistory": [
      {
        "id": "th-34-1",
        "year": 2025,
        "taxPaid": 84000,
        "assessment": 31500000
      }
    ],
    "schools": [
      {
        "id": "sch-34-1",
        "name": "The Bishop's School, Pune",
        "rating": 10,
        "type": "ICSE",
        "level": "K-12",
        "distance": 1.4
      },
      {
        "id": "sch-34-2",
        "name": "Symbiosis International School",
        "rating": 9,
        "type": "IB / Cambridge",
        "level": "PreK-12",
        "distance": 2.1
      }
    ]
  },
  {
    "id": "prop-life-republic-forest-edge-vill-36",
    "slug": "life-republic-forest-edge-villa-hinjawadi",
    "title": "Life Republic Forest Edge Villa | Hinjawadi",
    "description": "Experience premier luxury living in Life Republic, Kolte Patil, Hinjawadi, Pune. Featuring grand open architectural layouts, imported Italian marble and warm oak flooring, bespoke Poliform modular kitchen, smart automated climate control, dedicated private parking, and 24/7 concierge security.",
    "price": 58000000,
    "type": "RESIDENTIAL",
    "listingType": "SALE",
    "status": "VERIFIED",
    "address": "Life Republic, Kolte Patil, Hinjawadi, Pune",
    "city": "Pune",
    "state": "Maharashtra",
    "zipCode": "411001",
    "latitude": 18.602,
    "longitude": 73.715,
    "bedrooms": 4,
    "bathrooms": 4,
    "areaSqFt": 2800,
    "features": {
      "view": "Panoramic Greenery & City Horizon",
      "parking": "3 Dedicated Covered Bays",
      "furnishing": "Semi-Furnished Premium Italian Marble",
      "maintenance": "₹22,000 / month",
      "amenities": [
        "Temperature Controlled Pool",
        "Clubhouse & Spa",
        "Private Elevators",
        "24/7 Concierge",
        "Fitness Studio",
        "EV Charging Bays"
      ]
    },
    "agentId": "agent-aditya-joshi",
    "agent": {
      "id": "agent-aditya-joshi",
      "name": "Aditya Joshi",
      "email": "aditya@banerprime.in",
      "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
      "_count": {
        "listings": 19
      }
    },
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1600&q=85"
      }
    ],
    "createdAt": "2026-02-15T10:00:00.000Z",
    "updatedAt": "2026-03-29T10:00:00.000Z",
    "priceHistory": [
      {
        "id": "ph-35-1",
        "date": "2026-02-15",
        "price": 58000000,
        "event": "Listed For Sale",
        "source": "Verified Broker Network"
      }
    ],
    "taxHistory": [
      {
        "id": "th-35-1",
        "year": 2025,
        "taxPaid": 116000,
        "assessment": 43500000
      }
    ],
    "schools": [
      {
        "id": "sch-35-1",
        "name": "The Bishop's School, Pune",
        "rating": 10,
        "type": "ICSE",
        "level": "K-12",
        "distance": 1.4
      },
      {
        "id": "sch-35-2",
        "name": "Symbiosis International School",
        "rating": 9,
        "type": "IB / Cambridge",
        "level": "PreK-12",
        "distance": 2.1
      }
    ]
  },
  {
    "id": "prop-mayur-colony-hillview-apartmen-37",
    "slug": "mayur-colony-hillview-apartment-kothrud",
    "title": "Mayur Colony Hillview Apartment | Kothrud",
    "description": "Experience premier luxury living in Mayur Colony, Paud Road, Kothrud, Pune. Featuring grand open architectural layouts, imported Italian marble and warm oak flooring, bespoke Poliform modular kitchen, smart automated climate control, dedicated private parking, and 24/7 concierge security.",
    "price": 52000000,
    "type": "RESIDENTIAL",
    "listingType": "SALE",
    "status": "VERIFIED",
    "address": "Mayur Colony, Paud Road, Kothrud, Pune",
    "city": "Pune",
    "state": "Maharashtra",
    "zipCode": "411001",
    "latitude": 18.5075,
    "longitude": 73.8062,
    "bedrooms": 3,
    "bathrooms": 3,
    "areaSqFt": 1800,
    "features": {
      "view": "Panoramic Greenery & City Horizon",
      "parking": "2 Dedicated Covered Bays",
      "furnishing": "Semi-Furnished Premium Italian Marble",
      "maintenance": "₹16,500 / month",
      "amenities": [
        "Temperature Controlled Pool",
        "Clubhouse & Spa",
        "Private Elevators",
        "24/7 Concierge",
        "Fitness Studio",
        "EV Charging Bays"
      ]
    },
    "agentId": "agent-rohan-deshmukh",
    "agent": {
      "id": "agent-rohan-deshmukh",
      "name": "Rohan Deshmukh",
      "email": "rohan.deshmukh@puneluxury.in",
      "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
      "_count": {
        "listings": 28
      }
    },
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1600&q=85"
      }
    ],
    "createdAt": "2026-02-15T10:00:00.000Z",
    "updatedAt": "2026-03-29T10:00:00.000Z",
    "priceHistory": [
      {
        "id": "ph-36-1",
        "date": "2026-02-15",
        "price": 52000000,
        "event": "Listed For Sale",
        "source": "Verified Broker Network"
      }
    ],
    "taxHistory": [
      {
        "id": "th-36-1",
        "year": 2025,
        "taxPaid": 104000,
        "assessment": 39000000
      }
    ],
    "schools": [
      {
        "id": "sch-36-1",
        "name": "The Bishop's School, Pune",
        "rating": 10,
        "type": "ICSE",
        "level": "K-12",
        "distance": 1.4
      },
      {
        "id": "sch-36-2",
        "name": "Symbiosis International School",
        "rating": 9,
        "type": "IB / Cambridge",
        "level": "PreK-12",
        "distance": 2.1
      }
    ]
  },
  {
    "id": "prop-bavdhan-valley-wind-haven-38",
    "slug": "bavdhan-valley-wind-haven",
    "title": "Bavdhan Valley Wind Haven",
    "description": "Experience premier luxury living in Bavdhan Khurd, Near Chandani Chowk, Pune. Featuring grand open architectural layouts, imported Italian marble and warm oak flooring, bespoke Poliform modular kitchen, smart automated climate control, dedicated private parking, and 24/7 concierge security.",
    "price": 48000000,
    "type": "RESIDENTIAL",
    "listingType": "SALE",
    "status": "VERIFIED",
    "address": "Bavdhan Khurd, Near Chandani Chowk, Pune",
    "city": "Pune",
    "state": "Maharashtra",
    "zipCode": "411001",
    "latitude": 18.5155,
    "longitude": 73.7685,
    "bedrooms": 3,
    "bathrooms": 3,
    "areaSqFt": 2050,
    "features": {
      "view": "Panoramic Greenery & City Horizon",
      "parking": "2 Dedicated Covered Bays",
      "furnishing": "Semi-Furnished Premium Italian Marble",
      "maintenance": "₹16,500 / month",
      "amenities": [
        "Temperature Controlled Pool",
        "Clubhouse & Spa",
        "Private Elevators",
        "24/7 Concierge",
        "Fitness Studio",
        "EV Charging Bays"
      ]
    },
    "agentId": "agent-aditya-joshi",
    "agent": {
      "id": "agent-aditya-joshi",
      "name": "Aditya Joshi",
      "email": "aditya@banerprime.in",
      "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
      "_count": {
        "listings": 19
      }
    },
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85"
      }
    ],
    "createdAt": "2026-02-15T10:00:00.000Z",
    "updatedAt": "2026-03-29T10:00:00.000Z",
    "priceHistory": [
      {
        "id": "ph-37-1",
        "date": "2026-02-15",
        "price": 48000000,
        "event": "Listed For Sale",
        "source": "Verified Broker Network"
      }
    ],
    "taxHistory": [
      {
        "id": "th-37-1",
        "year": 2025,
        "taxPaid": 96000,
        "assessment": 36000000
      }
    ],
    "schools": [
      {
        "id": "sch-37-1",
        "name": "The Bishop's School, Pune",
        "rating": 10,
        "type": "ICSE",
        "level": "K-12",
        "distance": 1.4
      },
      {
        "id": "sch-37-2",
        "name": "Symbiosis International School",
        "rating": 9,
        "type": "IB / Cambridge",
        "level": "PreK-12",
        "distance": 2.1
      }
    ]
  },
  {
    "id": "prop-bavdhan-hillside-gated-sanctua-39",
    "slug": "bavdhan-hillside-gated-sanctuary",
    "title": "Bavdhan Hillside Gated Sanctuary",
    "description": "Experience premier luxury living in Pashan-Bavdhan Road, Pune. Featuring grand open architectural layouts, imported Italian marble and warm oak flooring, bespoke Poliform modular kitchen, smart automated climate control, dedicated private parking, and 24/7 concierge security.",
    "price": 65000,
    "type": "RESIDENTIAL",
    "listingType": "RENT",
    "status": "VERIFIED",
    "address": "Pashan-Bavdhan Road, Pune",
    "city": "Pune",
    "state": "Maharashtra",
    "zipCode": "411001",
    "latitude": 18.524,
    "longitude": 73.774,
    "bedrooms": 2,
    "bathrooms": 2,
    "areaSqFt": 1350,
    "features": {
      "view": "Lush Garden & Skyline Vista",
      "parking": "2 Dedicated Covered Bays",
      "furnishing": "Fully Furnished Designer Decor",
      "maintenance": "₹11,000 / month",
      "amenities": [
        "Temperature Controlled Pool",
        "Clubhouse & Spa",
        "Private Elevators",
        "24/7 Concierge",
        "Fitness Studio",
        "EV Charging Bays"
      ]
    },
    "agentId": "agent-aditya-joshi",
    "agent": {
      "id": "agent-aditya-joshi",
      "name": "Aditya Joshi",
      "email": "aditya@banerprime.in",
      "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
      "_count": {
        "listings": 19
      }
    },
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85"
      }
    ],
    "createdAt": "2026-02-15T10:00:00.000Z",
    "updatedAt": "2026-03-29T10:00:00.000Z",
    "priceHistory": [
      {
        "id": "ph-38-1",
        "date": "2026-02-15",
        "price": 65000,
        "event": "Listed For Rent",
        "source": "Verified Broker Network"
      }
    ],
    "taxHistory": [
      {
        "id": "th-38-1",
        "year": 2025,
        "taxPaid": 130,
        "assessment": 48750
      }
    ],
    "schools": [
      {
        "id": "sch-38-1",
        "name": "The Bishop's School, Pune",
        "rating": 10,
        "type": "ICSE",
        "level": "K-12",
        "distance": 1.4
      },
      {
        "id": "sch-38-2",
        "name": "Symbiosis International School",
        "rating": 9,
        "type": "IB / Cambridge",
        "level": "PreK-12",
        "distance": 2.1
      }
    ]
  },
  {
    "id": "prop-the-coastal-sanctuary-worli-se-40",
    "slug": "the-coastal-sanctuary-worli-sea-face",
    "title": "The Coastal Sanctuary | Worli Sea Face",
    "description": "Experience premier luxury living in Sea Face Enclave, Worli. Featuring grand open architectural layouts, imported Italian marble and warm oak flooring, bespoke Poliform modular kitchen, smart automated climate control, dedicated private parking, and 24/7 concierge security.",
    "price": 185000000,
    "type": "RESIDENTIAL",
    "listingType": "SALE",
    "status": "VERIFIED",
    "address": "Sea Face Enclave, Worli",
    "city": "Mumbai",
    "state": "Maharashtra",
    "zipCode": "400018",
    "latitude": 19.0144,
    "longitude": 72.8155,
    "bedrooms": 4,
    "bathrooms": 5,
    "areaSqFt": 3850,
    "features": {
      "view": "Panoramic Greenery & City Horizon",
      "parking": "3 Dedicated Covered Bays",
      "furnishing": "Semi-Furnished Premium Italian Marble",
      "maintenance": "₹22,000 / month",
      "amenities": [
        "Temperature Controlled Pool",
        "Clubhouse & Spa",
        "Private Elevators",
        "24/7 Concierge",
        "Fitness Studio",
        "EV Charging Bays"
      ]
    },
    "agentId": "agent-kavita-sharma",
    "agent": {
      "id": "agent-kavita-sharma",
      "name": "Kavita Sharma",
      "email": "kavita.sharma@luxuryestates.in",
      "avatar": "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
      "_count": {
        "listings": 25
      }
    },
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85"
      }
    ],
    "createdAt": "2026-02-15T10:00:00.000Z",
    "updatedAt": "2026-03-29T10:00:00.000Z",
    "priceHistory": [
      {
        "id": "ph-39-1",
        "date": "2026-02-15",
        "price": 185000000,
        "event": "Listed For Sale",
        "source": "Verified Broker Network"
      }
    ],
    "taxHistory": [
      {
        "id": "th-39-1",
        "year": 2025,
        "taxPaid": 370000,
        "assessment": 138750000
      }
    ],
    "schools": [
      {
        "id": "sch-39-1",
        "name": "Mumbai International Academy",
        "rating": 10,
        "type": "ICSE",
        "level": "K-12",
        "distance": 1.4
      },
      {
        "id": "sch-39-2",
        "name": "Heritage Academy",
        "rating": 9,
        "type": "IB / Cambridge",
        "level": "PreK-12",
        "distance": 2.1
      }
    ]
  },
  {
    "id": "prop-the-sky-penthouse-nargis-dutt--41",
    "slug": "the-sky-penthouse-nargis-dutt-road-pali-hill",
    "title": "The Sky Penthouse | Nargis Dutt Road, Pali Hill",
    "description": "Experience premier luxury living in Nargis Dutt Road, Pali Hill, Bandra West. Featuring grand open architectural layouts, imported Italian marble and warm oak flooring, bespoke Poliform modular kitchen, smart automated climate control, dedicated private parking, and 24/7 concierge security.",
    "price": 240000000,
    "type": "RESIDENTIAL",
    "listingType": "SALE",
    "status": "VERIFIED",
    "address": "Nargis Dutt Road, Pali Hill, Bandra West",
    "city": "Mumbai",
    "state": "Maharashtra",
    "zipCode": "400050",
    "latitude": 19.062,
    "longitude": 72.8277,
    "bedrooms": 5,
    "bathrooms": 6,
    "areaSqFt": 5200,
    "features": {
      "view": "Panoramic Greenery & City Horizon",
      "parking": "4 Dedicated Covered Bays",
      "furnishing": "Semi-Furnished Premium Italian Marble",
      "maintenance": "₹27,500 / month",
      "amenities": [
        "Temperature Controlled Pool",
        "Clubhouse & Spa",
        "Private Elevators",
        "24/7 Concierge",
        "Fitness Studio",
        "EV Charging Bays"
      ]
    },
    "agentId": "agent-kavita-sharma",
    "agent": {
      "id": "agent-kavita-sharma",
      "name": "Kavita Sharma",
      "email": "kavita.sharma@luxuryestates.in",
      "avatar": "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
      "_count": {
        "listings": 25
      }
    },
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=85"
      }
    ],
    "createdAt": "2026-02-15T10:00:00.000Z",
    "updatedAt": "2026-03-29T10:00:00.000Z",
    "priceHistory": [
      {
        "id": "ph-40-1",
        "date": "2026-02-15",
        "price": 240000000,
        "event": "Listed For Sale",
        "source": "Verified Broker Network"
      }
    ],
    "taxHistory": [
      {
        "id": "th-40-1",
        "year": 2025,
        "taxPaid": 480000,
        "assessment": 180000000
      }
    ],
    "schools": [
      {
        "id": "sch-40-1",
        "name": "Mumbai International Academy",
        "rating": 10,
        "type": "ICSE",
        "level": "K-12",
        "distance": 1.4
      },
      {
        "id": "sch-40-2",
        "name": "Heritage Academy",
        "rating": 9,
        "type": "IB / Cambridge",
        "level": "PreK-12",
        "distance": 2.1
      }
    ]
  },
  {
    "id": "prop-villa-maritima-juhu-beachfront-42",
    "slug": "villa-maritima-juhu-beachfront",
    "title": "Villa Maritima | Juhu Beachfront",
    "description": "Experience premier luxury living in Juhu Tara Road, Juhu. Featuring grand open architectural layouts, imported Italian marble and warm oak flooring, bespoke Poliform modular kitchen, smart automated climate control, dedicated private parking, and 24/7 concierge security.",
    "price": 380000000,
    "type": "RESIDENTIAL",
    "listingType": "SALE",
    "status": "VERIFIED",
    "address": "Juhu Tara Road, Juhu",
    "city": "Mumbai",
    "state": "Maharashtra",
    "zipCode": "400049",
    "latitude": 19.1025,
    "longitude": 72.8262,
    "bedrooms": 6,
    "bathrooms": 7,
    "areaSqFt": 7800,
    "features": {
      "view": "Panoramic Greenery & City Horizon",
      "parking": "5 Dedicated Covered Bays",
      "furnishing": "Semi-Furnished Premium Italian Marble",
      "maintenance": "₹33,000 / month",
      "amenities": [
        "Temperature Controlled Pool",
        "Clubhouse & Spa",
        "Private Elevators",
        "24/7 Concierge",
        "Fitness Studio",
        "EV Charging Bays"
      ]
    },
    "agentId": "agent-kavita-sharma",
    "agent": {
      "id": "agent-kavita-sharma",
      "name": "Kavita Sharma",
      "email": "kavita.sharma@luxuryestates.in",
      "avatar": "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
      "_count": {
        "listings": 25
      }
    },
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=85"
      }
    ],
    "createdAt": "2026-02-15T10:00:00.000Z",
    "updatedAt": "2026-03-29T10:00:00.000Z",
    "priceHistory": [
      {
        "id": "ph-41-1",
        "date": "2026-02-15",
        "price": 380000000,
        "event": "Listed For Sale",
        "source": "Verified Broker Network"
      }
    ],
    "taxHistory": [
      {
        "id": "th-41-1",
        "year": 2025,
        "taxPaid": 760000,
        "assessment": 285000000
      }
    ],
    "schools": [
      {
        "id": "sch-41-1",
        "name": "Mumbai International Academy",
        "rating": 10,
        "type": "ICSE",
        "level": "K-12",
        "distance": 1.4
      },
      {
        "id": "sch-41-2",
        "name": "Heritage Academy",
        "rating": 9,
        "type": "IB / Cambridge",
        "level": "PreK-12",
        "distance": 2.1
      }
    ]
  },
  {
    "id": "prop-designer-sea-facing-haven-cart-43",
    "slug": "designer-sea-facing-haven-carter-road-promenade",
    "title": "Designer Sea-Facing Haven | Carter Road Promenade",
    "description": "Experience premier luxury living in Carter Road Promenade, Bandra West. Featuring grand open architectural layouts, imported Italian marble and warm oak flooring, bespoke Poliform modular kitchen, smart automated climate control, dedicated private parking, and 24/7 concierge security.",
    "price": 325000,
    "type": "RESIDENTIAL",
    "listingType": "RENT",
    "status": "VERIFIED",
    "address": "Carter Road Promenade, Bandra West",
    "city": "Mumbai",
    "state": "Maharashtra",
    "zipCode": "400050",
    "latitude": 19.0682,
    "longitude": 72.8228,
    "bedrooms": 3,
    "bathrooms": 3,
    "areaSqFt": 2100,
    "features": {
      "view": "Lush Garden & Skyline Vista",
      "parking": "2 Dedicated Covered Bays",
      "furnishing": "Fully Furnished Designer Decor",
      "maintenance": "₹16,500 / month",
      "amenities": [
        "Temperature Controlled Pool",
        "Clubhouse & Spa",
        "Private Elevators",
        "24/7 Concierge",
        "Fitness Studio",
        "EV Charging Bays"
      ]
    },
    "agentId": "agent-kavita-sharma",
    "agent": {
      "id": "agent-kavita-sharma",
      "name": "Kavita Sharma",
      "email": "kavita.sharma@luxuryestates.in",
      "avatar": "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
      "_count": {
        "listings": 25
      }
    },
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85"
      }
    ],
    "createdAt": "2026-02-15T10:00:00.000Z",
    "updatedAt": "2026-03-29T10:00:00.000Z",
    "priceHistory": [
      {
        "id": "ph-42-1",
        "date": "2026-02-15",
        "price": 325000,
        "event": "Listed For Rent",
        "source": "Verified Broker Network"
      }
    ],
    "taxHistory": [
      {
        "id": "th-42-1",
        "year": 2025,
        "taxPaid": 650,
        "assessment": 243750
      }
    ],
    "schools": [
      {
        "id": "sch-42-1",
        "name": "Mumbai International Academy",
        "rating": 10,
        "type": "ICSE",
        "level": "K-12",
        "distance": 1.4
      },
      {
        "id": "sch-42-2",
        "name": "Heritage Academy",
        "rating": 9,
        "type": "IB / Cambridge",
        "level": "PreK-12",
        "distance": 2.1
      }
    ]
  },
  {
    "id": "prop-heritage-vista-lakeview-hirana-44",
    "slug": "heritage-vista-lakeview-hiranandani-gardens",
    "title": "Heritage Vista Lakeview | Hiranandani Gardens",
    "description": "Experience premier luxury living in Central Avenue, Hiranandani Gardens, Powai. Featuring grand open architectural layouts, imported Italian marble and warm oak flooring, bespoke Poliform modular kitchen, smart automated climate control, dedicated private parking, and 24/7 concierge security.",
    "price": 59000000,
    "type": "RESIDENTIAL",
    "listingType": "SALE",
    "status": "VERIFIED",
    "address": "Central Avenue, Hiranandani Gardens, Powai",
    "city": "Mumbai",
    "state": "Maharashtra",
    "zipCode": "400076",
    "latitude": 19.1197,
    "longitude": 72.9056,
    "bedrooms": 3,
    "bathrooms": 3,
    "areaSqFt": 1850,
    "features": {
      "view": "Panoramic Greenery & City Horizon",
      "parking": "2 Dedicated Covered Bays",
      "furnishing": "Semi-Furnished Premium Italian Marble",
      "maintenance": "₹16,500 / month",
      "amenities": [
        "Temperature Controlled Pool",
        "Clubhouse & Spa",
        "Private Elevators",
        "24/7 Concierge",
        "Fitness Studio",
        "EV Charging Bays"
      ]
    },
    "agentId": "agent-kavita-sharma",
    "agent": {
      "id": "agent-kavita-sharma",
      "name": "Kavita Sharma",
      "email": "kavita.sharma@luxuryestates.in",
      "avatar": "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
      "_count": {
        "listings": 25
      }
    },
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1600&q=85"
      }
    ],
    "createdAt": "2026-02-15T10:00:00.000Z",
    "updatedAt": "2026-03-29T10:00:00.000Z",
    "priceHistory": [
      {
        "id": "ph-43-1",
        "date": "2026-02-15",
        "price": 59000000,
        "event": "Listed For Sale",
        "source": "Verified Broker Network"
      }
    ],
    "taxHistory": [
      {
        "id": "th-43-1",
        "year": 2025,
        "taxPaid": 118000,
        "assessment": 44250000
      }
    ],
    "schools": [
      {
        "id": "sch-43-1",
        "name": "Mumbai International Academy",
        "rating": 10,
        "type": "ICSE",
        "level": "K-12",
        "distance": 1.4
      },
      {
        "id": "sch-43-2",
        "name": "Heritage Academy",
        "rating": 9,
        "type": "IB / Cambridge",
        "level": "PreK-12",
        "distance": 2.1
      }
    ]
  },
  {
    "id": "prop-dlf-the-camellias-ultra-luxury-45",
    "slug": "dlf-the-camellias-ultra-luxury-penthouse",
    "title": "DLF The Camellias Ultra-Luxury Penthouse",
    "description": "Experience premier luxury living in Golf Course Road, Sector 42, Gurgaon. Featuring grand open architectural layouts, imported Italian marble and warm oak flooring, bespoke Poliform modular kitchen, smart automated climate control, dedicated private parking, and 24/7 concierge security.",
    "price": 215000000,
    "type": "RESIDENTIAL",
    "listingType": "SALE",
    "status": "VERIFIED",
    "address": "Golf Course Road, Sector 42, Gurgaon",
    "city": "Gurgaon",
    "state": "Haryana",
    "zipCode": "122002",
    "latitude": 28.4619,
    "longitude": 77.0984,
    "bedrooms": 4,
    "bathrooms": 5,
    "areaSqFt": 7400,
    "features": {
      "view": "Panoramic Greenery & City Horizon",
      "parking": "3 Dedicated Covered Bays",
      "furnishing": "Semi-Furnished Premium Italian Marble",
      "maintenance": "₹22,000 / month",
      "amenities": [
        "Temperature Controlled Pool",
        "Clubhouse & Spa",
        "Private Elevators",
        "24/7 Concierge",
        "Fitness Studio",
        "EV Charging Bays"
      ]
    },
    "agentId": "agent-kavita-sharma",
    "agent": {
      "id": "agent-kavita-sharma",
      "name": "Kavita Sharma",
      "email": "kavita.sharma@luxuryestates.in",
      "avatar": "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
      "_count": {
        "listings": 25
      }
    },
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1600&q=85"
      }
    ],
    "createdAt": "2026-02-15T10:00:00.000Z",
    "updatedAt": "2026-03-29T10:00:00.000Z",
    "priceHistory": [
      {
        "id": "ph-44-1",
        "date": "2026-02-15",
        "price": 215000000,
        "event": "Listed For Sale",
        "source": "Verified Broker Network"
      }
    ],
    "taxHistory": [
      {
        "id": "th-44-1",
        "year": 2025,
        "taxPaid": 430000,
        "assessment": 161250000
      }
    ],
    "schools": [
      {
        "id": "sch-44-1",
        "name": "Gurgaon International Academy",
        "rating": 10,
        "type": "ICSE",
        "level": "K-12",
        "distance": 1.4
      },
      {
        "id": "sch-44-2",
        "name": "Heritage Academy",
        "rating": 9,
        "type": "IB / Cambridge",
        "level": "PreK-12",
        "distance": 2.1
      }
    ]
  },
  {
    "id": "prop-vasant-vihar-diplomatic-mansio-46",
    "slug": "vasant-vihar-diplomatic-mansion",
    "title": "Vasant Vihar Diplomatic Mansion",
    "description": "Experience premier luxury living in Pashchimi Marg, Vasant Vihar, New Delhi. Featuring grand open architectural layouts, imported Italian marble and warm oak flooring, bespoke Poliform modular kitchen, smart automated climate control, dedicated private parking, and 24/7 concierge security.",
    "price": 320000000,
    "type": "RESIDENTIAL",
    "listingType": "SALE",
    "status": "VERIFIED",
    "address": "Pashchimi Marg, Vasant Vihar, New Delhi",
    "city": "New Delhi",
    "state": "Delhi",
    "zipCode": "110057",
    "latitude": 28.56,
    "longitude": 77.16,
    "bedrooms": 6,
    "bathrooms": 6,
    "areaSqFt": 8200,
    "features": {
      "view": "Panoramic Greenery & City Horizon",
      "parking": "5 Dedicated Covered Bays",
      "furnishing": "Semi-Furnished Premium Italian Marble",
      "maintenance": "₹33,000 / month",
      "amenities": [
        "Temperature Controlled Pool",
        "Clubhouse & Spa",
        "Private Elevators",
        "24/7 Concierge",
        "Fitness Studio",
        "EV Charging Bays"
      ]
    },
    "agentId": "agent-kavita-sharma",
    "agent": {
      "id": "agent-kavita-sharma",
      "name": "Kavita Sharma",
      "email": "kavita.sharma@luxuryestates.in",
      "avatar": "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
      "_count": {
        "listings": 25
      }
    },
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=85"
      }
    ],
    "createdAt": "2026-02-15T10:00:00.000Z",
    "updatedAt": "2026-03-29T10:00:00.000Z",
    "priceHistory": [
      {
        "id": "ph-45-1",
        "date": "2026-02-15",
        "price": 320000000,
        "event": "Listed For Sale",
        "source": "Verified Broker Network"
      }
    ],
    "taxHistory": [
      {
        "id": "th-45-1",
        "year": 2025,
        "taxPaid": 640000,
        "assessment": 240000000
      }
    ],
    "schools": [
      {
        "id": "sch-45-1",
        "name": "New Delhi International Academy",
        "rating": 10,
        "type": "ICSE",
        "level": "K-12",
        "distance": 1.4
      },
      {
        "id": "sch-45-2",
        "name": "Heritage Academy",
        "rating": 9,
        "type": "IB / Cambridge",
        "level": "PreK-12",
        "distance": 2.1
      }
    ]
  },
  {
    "id": "prop-indiranagar-defence-colony-con-47",
    "slug": "indiranagar-defence-colony-contemporary-villa",
    "title": "Indiranagar Defence Colony Contemporary Villa",
    "description": "Experience premier luxury living in Defence Colony, 100ft Road, Indiranagar. Featuring grand open architectural layouts, imported Italian marble and warm oak flooring, bespoke Poliform modular kitchen, smart automated climate control, dedicated private parking, and 24/7 concierge security.",
    "price": 142000000,
    "type": "RESIDENTIAL",
    "listingType": "SALE",
    "status": "VERIFIED",
    "address": "Defence Colony, 100ft Road, Indiranagar",
    "city": "Bengaluru",
    "state": "Karnataka",
    "zipCode": "560038",
    "latitude": 12.9719,
    "longitude": 77.6412,
    "bedrooms": 4,
    "bathrooms": 5,
    "areaSqFt": 4600,
    "features": {
      "view": "Panoramic Greenery & City Horizon",
      "parking": "3 Dedicated Covered Bays",
      "furnishing": "Semi-Furnished Premium Italian Marble",
      "maintenance": "₹22,000 / month",
      "amenities": [
        "Temperature Controlled Pool",
        "Clubhouse & Spa",
        "Private Elevators",
        "24/7 Concierge",
        "Fitness Studio",
        "EV Charging Bays"
      ]
    },
    "agentId": "agent-kavita-sharma",
    "agent": {
      "id": "agent-kavita-sharma",
      "name": "Kavita Sharma",
      "email": "kavita.sharma@luxuryestates.in",
      "avatar": "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
      "_count": {
        "listings": 25
      }
    },
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=85"
      }
    ],
    "createdAt": "2026-02-15T10:00:00.000Z",
    "updatedAt": "2026-03-29T10:00:00.000Z",
    "priceHistory": [
      {
        "id": "ph-46-1",
        "date": "2026-02-15",
        "price": 142000000,
        "event": "Listed For Sale",
        "source": "Verified Broker Network"
      }
    ],
    "taxHistory": [
      {
        "id": "th-46-1",
        "year": 2025,
        "taxPaid": 284000,
        "assessment": 106500000
      }
    ],
    "schools": [
      {
        "id": "sch-46-1",
        "name": "Bengaluru International Academy",
        "rating": 10,
        "type": "ICSE",
        "level": "K-12",
        "distance": 1.4
      },
      {
        "id": "sch-46-2",
        "name": "Heritage Academy",
        "rating": 9,
        "type": "IB / Cambridge",
        "level": "PreK-12",
        "distance": 2.1
      }
    ]
  },
  {
    "id": "prop-koramangala-3rd-block-billiona-48",
    "slug": "koramangala-3rd-block-billionaire-street-villa",
    "title": "Koramangala 3rd Block Billionaire Street Villa",
    "description": "Experience premier luxury living in 3rd Block, Koramangala, Bengaluru. Featuring grand open architectural layouts, imported Italian marble and warm oak flooring, bespoke Poliform modular kitchen, smart automated climate control, dedicated private parking, and 24/7 concierge security.",
    "price": 220000000,
    "type": "RESIDENTIAL",
    "listingType": "SALE",
    "status": "VERIFIED",
    "address": "3rd Block, Koramangala, Bengaluru",
    "city": "Bengaluru",
    "state": "Karnataka",
    "zipCode": "560034",
    "latitude": 12.934,
    "longitude": 77.625,
    "bedrooms": 5,
    "bathrooms": 6,
    "areaSqFt": 6800,
    "features": {
      "view": "Panoramic Greenery & City Horizon",
      "parking": "4 Dedicated Covered Bays",
      "furnishing": "Semi-Furnished Premium Italian Marble",
      "maintenance": "₹27,500 / month",
      "amenities": [
        "Temperature Controlled Pool",
        "Clubhouse & Spa",
        "Private Elevators",
        "24/7 Concierge",
        "Fitness Studio",
        "EV Charging Bays"
      ]
    },
    "agentId": "agent-kavita-sharma",
    "agent": {
      "id": "agent-kavita-sharma",
      "name": "Kavita Sharma",
      "email": "kavita.sharma@luxuryestates.in",
      "avatar": "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
      "_count": {
        "listings": 25
      }
    },
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85"
      }
    ],
    "createdAt": "2026-02-15T10:00:00.000Z",
    "updatedAt": "2026-03-29T10:00:00.000Z",
    "priceHistory": [
      {
        "id": "ph-47-1",
        "date": "2026-02-15",
        "price": 220000000,
        "event": "Listed For Sale",
        "source": "Verified Broker Network"
      }
    ],
    "taxHistory": [
      {
        "id": "th-47-1",
        "year": 2025,
        "taxPaid": 440000,
        "assessment": 165000000
      }
    ],
    "schools": [
      {
        "id": "sch-47-1",
        "name": "Bengaluru International Academy",
        "rating": 10,
        "type": "ICSE",
        "level": "K-12",
        "distance": 1.4
      },
      {
        "id": "sch-47-2",
        "name": "Heritage Academy",
        "rating": 9,
        "type": "IB / Cambridge",
        "level": "PreK-12",
        "distance": 2.1
      }
    ]
  },
  {
    "id": "prop-casa-del-sol-portuguese-beachf-49",
    "slug": "casa-del-sol-portuguese-beachfront-villa-candolim",
    "title": "Casa Del Sol Portuguese Beachfront Villa | Candolim",
    "description": "Experience premier luxury living in Fort Aguada Road, Candolim Beach. Featuring grand open architectural layouts, imported Italian marble and warm oak flooring, bespoke Poliform modular kitchen, smart automated climate control, dedicated private parking, and 24/7 concierge security.",
    "price": 118000000,
    "type": "RESIDENTIAL",
    "listingType": "SALE",
    "status": "VERIFIED",
    "address": "Fort Aguada Road, Candolim Beach",
    "city": "Goa",
    "state": "Goa",
    "zipCode": "403515",
    "latitude": 15.5186,
    "longitude": 73.7681,
    "bedrooms": 4,
    "bathrooms": 5,
    "areaSqFt": 4200,
    "features": {
      "view": "Panoramic Greenery & City Horizon",
      "parking": "3 Dedicated Covered Bays",
      "furnishing": "Semi-Furnished Premium Italian Marble",
      "maintenance": "₹22,000 / month",
      "amenities": [
        "Temperature Controlled Pool",
        "Clubhouse & Spa",
        "Private Elevators",
        "24/7 Concierge",
        "Fitness Studio",
        "EV Charging Bays"
      ]
    },
    "agentId": "agent-kavita-sharma",
    "agent": {
      "id": "agent-kavita-sharma",
      "name": "Kavita Sharma",
      "email": "kavita.sharma@luxuryestates.in",
      "avatar": "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
      "_count": {
        "listings": 25
      }
    },
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85"
      },
      {
        "url": "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=85"
      }
    ],
    "createdAt": "2026-02-15T10:00:00.000Z",
    "updatedAt": "2026-03-29T10:00:00.000Z",
    "priceHistory": [
      {
        "id": "ph-48-1",
        "date": "2026-02-15",
        "price": 118000000,
        "event": "Listed For Sale",
        "source": "Verified Broker Network"
      }
    ],
    "taxHistory": [
      {
        "id": "th-48-1",
        "year": 2025,
        "taxPaid": 236000,
        "assessment": 88500000
      }
    ],
    "schools": [
      {
        "id": "sch-48-1",
        "name": "Goa International Academy",
        "rating": 10,
        "type": "ICSE",
        "level": "K-12",
        "distance": 1.4
      },
      {
        "id": "sch-48-2",
        "name": "Heritage Academy",
        "rating": 9,
        "type": "IB / Cambridge",
        "level": "PreK-12",
        "distance": 2.1
      }
    ]
  }
];

export function getMockProperties(params: any = {}): Property[] {
  let list = [...MOCK_PROPERTIES];

  if (params.search) {
    const q = String(params.search).toLowerCase();
    list = list.filter(p => 
      p.title.toLowerCase().includes(q) || 
      p.city.toLowerCase().includes(q) || 
      p.address.toLowerCase().includes(q) ||
      p.state.toLowerCase().includes(q)
    );
  }

  if (params.listingType) {
    list = list.filter(p => p.listingType.toUpperCase() === String(params.listingType).toUpperCase());
  }

  if (params.type) {
    list = list.filter(p => p.type.toUpperCase() === String(params.type).toUpperCase());
  }

  if (params.minPrice) {
    list = list.filter(p => Number(p.price) >= Number(params.minPrice));
  }

  if (params.maxPrice) {
    list = list.filter(p => Number(p.price) <= Number(params.maxPrice));
  }

  if (params.minBeds) {
    list = list.filter(p => (p.bedrooms || 0) >= Number(params.minBeds));
  }

  if (params.minBaths) {
    list = list.filter(p => (p.bathrooms || 0) >= Number(params.minBaths));
  }

  if (params.ne_lat && params.sw_lat && params.ne_lng && params.sw_lng) {
    const neLat = Number(params.ne_lat);
    const swLat = Number(params.sw_lat);
    const neLng = Number(params.ne_lng);
    const swLng = Number(params.sw_lng);
    const inBounds = list.filter(p => 
      p.latitude >= swLat && p.latitude <= neLat &&
      p.longitude >= swLng && p.longitude <= neLng
    );
    if (inBounds.length > 0) {
      list = inBounds;
    }
  }

  return list;
}

export const USER_PROPERTIES: Property[] = [];

export function addUserProperty(property: Property): Property {
  // Prepend to top of live inventory
  const exists = USER_PROPERTIES.some(p => p.id === property.id || p.slug === property.slug);
  if (!exists) {
    USER_PROPERTIES.unshift(property);
    MOCK_PROPERTIES.unshift(property);
  }
  return property;
}

export function getMockPropertyBySlug(slug: string): Property | null {
  return USER_PROPERTIES.find(p => p.slug === slug || p.id === slug) || MOCK_PROPERTIES.find(p => p.slug === slug || p.id === slug) || MOCK_PROPERTIES[0];
}
