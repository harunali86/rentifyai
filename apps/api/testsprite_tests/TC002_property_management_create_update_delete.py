import requests
import json

BASE_URL = "http://localhost:4000/api/v1/"
TIMEOUT = 30

# Sample agent credentials for authentication (replace with valid credentials if needed)
AGENT_CREDENTIALS = {
    "email": "agent@example.com",
    "password": "StrongPassword123!"
}

def authenticate_agent():
    url = BASE_URL + "auth/login"
    headers = {"Content-Type": "application/json"}
    resp = requests.post(url, headers=headers, json=AGENT_CREDENTIALS, timeout=TIMEOUT)
    resp.raise_for_status()
    data = resp.json()
    token = data.get("accessToken") or data.get("token")
    assert token, "Authentication token not returned"
    return token

def test_property_management_create_update_delete():
    token = authenticate_agent()
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }

    property_data_create = {
        "title": "Test Property for Automation",
        "description": "A beautiful 3-bedroom house for testing automation",
        "address": "123 Automation St, Test City",
        "city": "Test City",
        "state": "TS",
        "zipCode": "12345",
        "price": 350000,
        "propertyType": "House",
        "listingType": "Sale",
        "bedrooms": 3,
        "bathrooms": 2,
        "squareFeet": 1800,
        "yearBuilt": 2010,
        "images": [
            "https://example.com/images/property1.jpg",
            "https://example.com/images/property2.jpg"
        ],
        "amenities": ["Garage", "Swimming Pool", "Garden"]
    }

    # Create property listing
    try:
        create_url = BASE_URL + "properties"
        create_resp = requests.post(create_url, headers=headers, json=property_data_create, timeout=TIMEOUT)
        assert create_resp.status_code == 201, f"Expected 201 Created, got {create_resp.status_code}"
        created_property = create_resp.json()
        property_id = created_property.get("id")
        assert property_id, "Created property ID not returned"

        # Validate created property details match sent data
        for key in property_data_create:
            assert key in created_property, f"{key} missing in created property response"
        assert created_property["title"] == property_data_create["title"]

        # Update property listing
        property_data_update = {
            "title": "Updated Test Property Title",
            "price": 360000,
            "bedrooms": 4,
            "images": [
                "https://example.com/images/property1_updated.jpg",
                "https://example.com/images/property3.jpg"
            ]
        }
        update_url = BASE_URL + f"properties/{property_id}"
        update_resp = requests.put(update_url, headers=headers, json=property_data_update, timeout=TIMEOUT)
        assert update_resp.status_code == 200, f"Expected 200 OK on update, got {update_resp.status_code}"
        updated_property = update_resp.json()
        assert updated_property["title"] == property_data_update["title"]
        assert updated_property["price"] == property_data_update["price"]
        assert updated_property["bedrooms"] == property_data_update["bedrooms"]
        assert updated_property["images"] == property_data_update["images"]

    finally:
        # Delete the created property to cleanup
        if 'property_id' in locals():
            delete_url = BASE_URL + f"properties/{property_id}"
            delete_resp = requests.delete(delete_url, headers=headers, timeout=TIMEOUT)
            assert delete_resp.status_code in (200, 204), f"Expected 200 or 204 on delete, got {delete_resp.status_code}"

test_property_management_create_update_delete()