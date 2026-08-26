import requests

BASE_URL = "http://localhost:4000/api/v1"
TIMEOUT = 30

ADMIN_CREDENTIALS = {
    "email": "admin@example.com",
    "password": "AdminPass123!"
}

def get_admin_token():
    url = f"{BASE_URL}/auth/login"
    resp = requests.post(url, json=ADMIN_CREDENTIALS, timeout=TIMEOUT)
    resp.raise_for_status()
    token = resp.json().get("accessToken") or resp.json().get("token") or resp.json().get("access_token")
    if not token:
        raise ValueError("No access token returned from login")
    return token

def create_test_property(auth_token):
    url = f"{BASE_URL}/properties"
    headers = {"Authorization": f"Bearer {auth_token}"}
    payload = {
        "title": "Test Property for Admin Approval",
        "description": "Property for testing admin approval flow",
        "price": 1000,
        "city": "Testville",
        "address": "123 Test St",
        "rooms": 3,
        "bathrooms": 2,
        "squareFeet": 1200,
        "type": "rent",
        "status": "pending"
    }
    resp = requests.post(url, json=payload, headers=headers, timeout=TIMEOUT)
    resp.raise_for_status()
    return resp.json()["id"]

def approve_listing(auth_token, listing_id, approve=True):
    url = f"{BASE_URL}/admin/listings/{listing_id}/approval"
    headers = {"Authorization": f"Bearer {auth_token}"}
    action = {"approved": True} if approve else {"approved": False}
    resp = requests.put(url, json=action, headers=headers, timeout=TIMEOUT)
    resp.raise_for_status()
    return resp

def delete_test_property(auth_token, listing_id):
    url = f"{BASE_URL}/properties/{listing_id}"
    headers = {"Authorization": f"Bearer {auth_token}"}
    resp = requests.delete(url, headers=headers, timeout=TIMEOUT)
    if resp.status_code not in (200, 204, 404):
        resp.raise_for_status()

def test_admin_panel_statistics_and_listing_management():
    token = get_admin_token()
    headers = {"Authorization": f"Bearer {token}"}

    # Test statistics endpoint
    stats_url = f"{BASE_URL}/admin/statistics"
    resp_stats = requests.get(stats_url, headers=headers, timeout=TIMEOUT)
    assert resp_stats.status_code == 200
    stats_data = resp_stats.json()
    assert "revenue" in stats_data and isinstance(stats_data["revenue"], (int, float))
    assert "activeUsers" in stats_data and isinstance(stats_data["activeUsers"], int)
    assert "properties" in stats_data and isinstance(stats_data["properties"], int)

    # Create a property listing to test approval workflow
    try:
        property_id = create_test_property(token)
        # Verify newly created property is in pending status and appears in admin listings
        listings_url = f"{BASE_URL}/admin/listings"
        resp_listings = requests.get(listings_url, headers=headers, timeout=TIMEOUT)
        assert resp_listings.status_code == 200
        listings = resp_listings.json()
        found_listing = next((l for l in listings if l.get("id") == property_id), None)
        assert found_listing is not None
        assert found_listing.get("status") == "pending"

        # Approve the listing
        resp_approve = approve_listing(token, property_id, approve=True)
        assert resp_approve.status_code == 200
        approval_resp_json = resp_approve.json()
        assert approval_resp_json.get("approved") is True

        # Verify status updated after approval
        resp_listing_detail = requests.get(f"{BASE_URL}/properties/{property_id}", headers=headers, timeout=TIMEOUT)
        assert resp_listing_detail.status_code == 200
        assert resp_listing_detail.json().get("status") == "approved"

        # Approve endpoint and listings endpoint should work correctly with mobile user-agent header
        mobile_headers = headers.copy()
        mobile_headers["User-Agent"] = "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1"
        resp_listings_mobile = requests.get(listings_url, headers=mobile_headers, timeout=TIMEOUT)
        assert resp_listings_mobile.status_code == 200
        resp_approve_mobile = requests.put(f"{BASE_URL}/admin/listings/{property_id}/approval",
                                          json={"approved": False}, headers=mobile_headers, timeout=TIMEOUT)
        assert resp_approve_mobile.status_code == 200
        assert resp_approve_mobile.json().get("approved") is False

    finally:
        # Cleanup: delete the test property listing
        delete_test_property(token, property_id)

test_admin_panel_statistics_and_listing_management()