
const API_URL = 'http://localhost:4000/api/v1';
const ADMIN_EMAIL = 'admin@rentify.in';
const ADMIN_PASSWORD = 'admin-password-123';

async function verifyAdminFeatures() {
    console.log('🚀 Starting Admin Verification Script...');

    // 1. Login as Admin
    console.log('\n🔐 Logging in as Admin...');
    const loginRes = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD }),
    });

    if (!loginRes.ok) {
        console.error('❌ Login Failed:', await loginRes.text());
        process.exit(1);
    }

    // TYPE CASTING FIX:
    const data = (await loginRes.json()) as any;
    const access_token = data.access_token;
    console.log('✅ Login Successful.');

    // 2. Fetch All Properties to pick one for editing
    console.log('\n📋 Fetching Properties...');
    const propsRes = await fetch(`${API_URL}/admin/properties?limit=1`, {
        headers: { Authorization: `Bearer ${access_token}` },
    });

    // TYPE CASTING FIX:
    const propsData = (await propsRes.json()) as any;
    const property = propsData.data[0];

    if (!property) {
        console.error('❌ No properties found to test.');
        process.exit(1);
    }
    console.log(`✅ Properties Fetched. Selected: ${property.title} (${property.id})`);

    // 3. Update Property (Deep CRUD)
    console.log('\n✏️ Testing Deep CRUD Update...');
    const updatePayload = {
        title: property.title + ' (Verified)',
        price: Number(property.price) + 1000,
        features: JSON.stringify({ "TestFeature": true, "VerifiedAt": new Date().toISOString() }), // JSON test
        description: property.description,
        status: property.status,
        type: property.type,
        listingType: property.listingType,
        bedrooms: property.bedrooms,
        bathrooms: property.bathrooms,
        areaSqFt: property.areaSqFt,
        address: property.address,
        city: property.city,
        zipCode: property.zipCode,
        latitude: property.latitude,
        longitude: property.longitude
    };

    const updateRes = await fetch(`${API_URL}/admin/properties/${property.id}/update`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${access_token}`
        },
        body: JSON.stringify(updatePayload)
    });

    if (updateRes.ok) {
        console.log('✅ Property Update Successful.');
    } else {
        console.error('❌ Property Update Failed:', await updateRes.text());
    }

    // 4. Test Image Management
    console.log('\n🖼️ Testing Image Management...');
    const testImageUrl = "https://via.placeholder.com/800x600.png?text=Test+Image";

    // Add Image
    const addImgRes = await fetch(`${API_URL}/admin/properties/${property.id}/images`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${access_token}`
        },
        body: JSON.stringify({ url: testImageUrl })
    });

    let mediaId = '';
    if (addImgRes.ok) {
        // TYPE CASTING FIX:
        const media = (await addImgRes.json()) as any;
        mediaId = media.id;
        console.log(`✅ Image Added (ID: ${mediaId})`);
    } else {
        console.error('❌ Image Add Failed:', await addImgRes.text());
    }

    // Verify Image Presence via Get Detail
    const detailRes = await fetch(`${API_URL}/admin/properties/${property.id}`, {
        headers: { Authorization: `Bearer ${access_token}` },
    });
    // TYPE CASTING FIX:
    const detailData = (await detailRes.json()) as any;
    const imageExists = detailData.images.some((img: any) => img.url === testImageUrl);
    console.log(`✅ Image Verified in Details: ${imageExists}`);

    // Remove Image
    if (mediaId) {
        const delImgRes = await fetch(`${API_URL}/admin/media/${mediaId}/delete`, {
            method: 'POST',
            headers: { Authorization: `Bearer ${access_token}` },
        });
        if (delImgRes.ok) console.log('✅ Image Removed Successfully.');
        else console.error('❌ Image Remove Failed');
    }

    // 5. Test Saved Searches & Leads
    console.log('\n🔍 Testing Leads & Saved Searches...');
    const leadsRes = await fetch(`${API_URL}/admin/leads?limit=1`, { headers: { Authorization: `Bearer ${access_token}` } });
    const searchRes = await fetch(`${API_URL}/admin/saved-searches?limit=1`, { headers: { Authorization: `Bearer ${access_token}` } });

    console.log(`✅ Leads Fetch: ${leadsRes.status}`);
    console.log(`✅ Saved Searches Fetch: ${searchRes.status}`);

    console.log('\n🎉 Verification Complete!');
}

verifyAdminFeatures();
