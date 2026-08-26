import requests

BASE_URL = "http://localhost:4000/api/v1"
TIMEOUT = 30
HEADERS = {"Content-Type": "application/json"}

def test_user_authentication_registration_and_login():
    # Test data for each role
    roles = {
        "user": {
            "email": "user@test.com",
            "password": "UserPass123!",
            "role": "User",
            "name": "Test User"
        },
        "agent": {
            "email": "agent@test.com",
            "password": "AgentPass123!",
            "role": "Agent",
            "name": "Test Agent"
        },
        "admin": {
            "email": "admin@test.com",
            "password": "AdminPass123!",
            "role": "Admin",
            "name": "Test Admin"
        }
    }

    registered_user_ids = {}

    try:
        # Register users for each role
        for key, user_data in roles.items():
            register_payload = {
                "email": user_data["email"],
                "password": user_data["password"],
                "role": user_data["role"],
                "name": user_data["name"]
            }
            reg_response = requests.post(
                f"{BASE_URL}/auth/register",
                json=register_payload,
                headers=HEADERS,
                timeout=TIMEOUT,
            )
            assert reg_response.status_code == 201, f"Registration failed for {key} role"
            reg_json = reg_response.json()

            # Expect a user object with an id returned
            assert "user" in reg_json, f"Registration response missing user object for {key}"

            user_id = reg_json.get("user", {}).get("id")
            assert user_id is not None, f"No user id returned after registration for {key}"

            registered_user_ids[key] = user_id

        # Login users for each role
        for key, user_data in roles.items():
            login_payload = {
                "email": user_data["email"],
                "password": user_data["password"],
            }
            login_response = requests.post(
                f"{BASE_URL}/auth/login",
                json=login_payload,
                headers=HEADERS,
                timeout=TIMEOUT,
            )
            assert login_response.status_code == 200, f"Login failed for {key} role"
            login_json = login_response.json()

            # Expect JWT token and user role in response
            assert "access_token" in login_json or "token" in login_json, f"Login response missing token for {key}"
            token = login_json.get("access_token") or login_json.get("token")
            assert isinstance(token, str) and len(token) > 0, f"Invalid token for {key}"

            # Optionally check user role returned matches expected role
            user_info = login_json.get("user") or {}
            returned_role = user_info.get("role") or login_json.get("role")
            if returned_role:
                assert returned_role.lower() == user_data["role"].lower(), f"Returned role does not match for {key}"

    finally:
        # Cleanup: delete created users if API supports user deletion endpoint
        for key, user_id in registered_user_ids.items():
            try:
                del_response = requests.delete(
                    f"{BASE_URL}/users/{user_id}",
                    headers=HEADERS,
                    timeout=TIMEOUT,
                )
                assert del_response.status_code in [200, 204, 404], f"Failed to delete {key} user during cleanup"
            except Exception:
                pass

test_user_authentication_registration_and_login()
