import { NextRequest, NextResponse } from "next/server";
import { addUserProperty } from "@/lib/mock-properties";
import { Property } from "@/lib/api";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const title = (body.title || "").trim();
    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    const city = body.city || "Pune";
    const listingType = body.listingType === "RENT" ? "RENT" : "SALE";
    const cleanTitle = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const slug = `${cleanTitle}-${randomSuffix}`;
    const id = `prop-custom-${randomSuffix}`;

    const price = Number(body.price) || (listingType === "RENT" ? 45000 : 15000000);
    const bedrooms = Number(body.bedrooms) || 3;
    const bathrooms = Number(body.bathrooms) || 3;
    const areaSqFt = Number(body.areaSqFt) || 1850;
    const address = body.address || `Lane ${Math.floor(Math.random() * 12) + 1}, ${city}`;

    // Curated high-res architectural images fallback
    const defaultImages = [
      { url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85" },
      { url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85" },
      { url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85" },
      { url: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=85" }
    ];

    let images = defaultImages;
    if (Array.isArray(body.images) && body.images.length > 0) {
      images = body.images.map((img: any) => typeof img === "string" ? { url: img } : img);
    }

    const newProperty: Property = {
      id,
      slug,
      title,
      description: body.description || `Exquisite ${bedrooms} BHK luxury residence in ${address}, ${city}. Features Italian marble flooring, panoramic views, smart home automation, 24/7 security, and dedicated covered parking. Zero Brokerage direct listing.`,
      price,
      type: body.type || "RESIDENTIAL",
      listingType,
      status: "VERIFIED",
      address,
      city,
      state: body.state || "Maharashtra",
      zipCode: body.zipCode || "411001",
      latitude: Number(body.latitude) || (city === "Mumbai" ? 18.9986 : 18.5362),
      longitude: Number(body.longitude) || (city === "Mumbai" ? 72.8174 : 73.8924),
      bedrooms,
      bathrooms,
      areaSqFt,
      features: {
        view: "Panoramic Skyline & Green Horizon",
        parking: "2 Dedicated Covered Bays",
        furnishing: "Semi-Furnished Premium",
        maintenance: listingType === "RENT" ? "₹4,500 / month" : "₹12,000 / month",
        amenities: ["Swimming Pool", "Clubhouse", "24/7 Security", "Gymnasium", "Power Backup"]
      },
      agentId: "agent-rajesh-godbole",
      agent: {
        id: "agent-rajesh-godbole",
        name: "Rajesh Godbole",
        email: "rajesh.godbole@luxuryestates.in",
        phone: "+91 98220 41890",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
        _count: { listings: 28 }
      },
      images,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      priceHistory: [
        {
          id: `ph-${randomSuffix}-1`,
          date: new Date().toISOString().split("T")[0],
          price,
          event: "Listed on RentifyAI",
          source: "Direct Owner / Verified Partner"
        }
      ],
      taxHistory: [
        {
          id: `th-${randomSuffix}-1`,
          year: 2025,
          taxPaid: Math.round(price * 0.002),
          assessment: Math.round(price * 0.75)
        }
      ],
      schools: [
        {
          id: `sch-${randomSuffix}-1`,
          name: `${city} International Academy`,
          rating: 10,
          type: "ICSE",
          level: "K-12",
          distance: 1.5
        }
      ]
    };

    // Register into memory store
    addUserProperty(newProperty);

    return NextResponse.json({
      success: true,
      message: "Property published and live across RentifyAI!",
      property: newProperty,
      slug: newProperty.slug,
      url: `/properties/${newProperty.slug}`
    });
  } catch (error: any) {
    console.error("Create property API error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create property" },
      { status: 500 }
    );
  }
}
