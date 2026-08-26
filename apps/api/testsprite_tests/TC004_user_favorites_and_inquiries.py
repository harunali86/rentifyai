import requests

BASE_URL = "http://localhost:4000/api/v1/"
TIMEOUT = 30

def test_user_favorites_and_inquiries():
    # Step 0: Register and login a test user to get token
    register_url = BASE_URL + "auth/register"
    login_url = BASE_URL + "auth/login"
    headers = {"Content-Type": "application/json"}

    user_data = {
        "email": "testuser_fav_inq@example.com",
        "password": "TestPassword123!"
    }

    try:
        # Register user
        reg_resp = requests.post(register_url, json=user_data, headers=headers, timeout=TIMEOUT)
        assert reg_resp.status_code in (200, 201)

        # Login user
        login_resp = requests.post(login_url, json={
            "email": user_data["email"],
            "password": user_data["password"]
        }, headers=headers, timeout=TIMEOUT)
        assert login_resp.status_code == 200
        token = login_resp.json().get("access_token")
        assert token is not None

        auth_headers = {
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json"
        }

        # Step 1: Create a property to favorite, inquire and book
        create_prop_url = BASE_URL + "properties"
        property_payload = {
            "title": "Test Property for Favorite and Inquiry",
            "description": "A property created for testing user engagement",
            "price": 250000,
            "rent_type": "sale",
            "city": "Testville",
            "address": "123 Testing St",
            "images": [],
            "bedrooms": 3,
            "bathrooms": 2,
            "area": 1200
        }
        create_prop_resp = requests.post(create_prop_url, json=property_payload, headers=auth_headers, timeout=TIMEOUT)
        assert create_prop_resp.status_code in (200, 201)
        property_id = create_prop_resp.json().get("id")
        assert property_id is not None

        try:
            # Step 2: Save favorite for the property
            fav_url = BASE_URL + f"users/favorites"
            fav_payload = {"property_id": property_id}
            fav_resp = requests.post(fav_url, json=fav_payload, headers=auth_headers, timeout=TIMEOUT)
            assert fav_resp.status_code in (200, 201)
            fav_json = fav_resp.json()
            assert "message" in fav_json
            assert "success" in fav_json.get("message").lower()

            # Step 3: Send a lead inquiry for the property
            inquiry_url = BASE_URL + "leads/inquiry"
            inquiry_payload = {
                "property_id": property_id,
                "message": "I am interested in this property. Please provide more details."
            }
            inquiry_resp = requests.post(inquiry_url, json=inquiry_payload, headers=auth_headers, timeout=TIMEOUT)
            assert inquiry_resp.status_code in (200, 201)
            inquiry_json = inquiry_resp.json()
            assert "message" in inquiry_json
            assert "inquiry" in inquiry_json.get("message").lower() or "received" in inquiry_json.get("message").lower()

            # Step 4: Book a viewing with token payment
            booking_url = BASE_URL + "leads/book-viewing"
            booking_payload = {
                "property_id": property_id,
                "viewing_date": "2026-12-01T15:00:00Z",
                "token_payment": 1000  # token amount to pay for booking
            }
            booking_resp = requests.post(booking_url, json=booking_payload, headers=auth_headers, timeout=TIMEOUT)
            assert booking_resp.status_code in (200, 201)
            booking_json = booking_resp.json()
            assert "message" in booking_json
            assert any(keyword in booking_json.get("message").lower() for keyword in ["booked", "confirmed", "success"])

        finally:
            # Cleanup: Delete the created property
            delete_prop_url = BASE_URL + f"properties/{property_id}"
            delete_resp = requests.delete(delete_prop_url, headers=auth_headers, timeout=TIMEOUT)
            assert delete_resp.status_code in (200, 204)

    finally:
        # Cleanup: Delete the test user
        # Assuming API supports user deletion via authenticated request to /users/me
        # Or else this step may be skipped or adapted depending on actual API
        delete_user_url = BASE_URL + "users/me"
        try:
            del_resp = requests.delete(delete_user_url, headers=auth_headers, timeout=TIMEOUT)
            assert del_resp.status_code in (200, 204)
        except Exception:
            # If user deletion is not supported, just pass
            pass

test_user_favorites_and_inquiries()
