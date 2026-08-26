import requests

BASE_URL = "http://localhost:4000/api/v1"
TIMEOUT = 30

def test_property_search_with_filters():
    search_endpoint = f"{BASE_URL}/properties/search"
    headers = {
        "Content-Type": "application/json"
    }
    payload = {
        "city": "San Francisco",
        "price_min": 1000,
        "price_max": 5000,
        "rent_or_sale": "rent"
    }
    try:
        response = requests.post(search_endpoint, json=payload, headers=headers, timeout=TIMEOUT)
        assert response.status_code == 200, f"Expected status code 200 but got {response.status_code}"
        
        data = response.json()
        assert isinstance(data, dict), "Response is not a JSON object"
        assert "properties" in data, "Response JSON does not contain 'properties' key"
        properties = data["properties"]
        assert isinstance(properties, list), "'properties' should be a list"
        
        for prop in properties:
            # check mandatory fields existence and types
            assert "city" in prop, "Property missing 'city' field"
            assert prop["city"].lower() == payload["city"].lower(), f"Property city {prop['city']} does not match filter {payload['city']}"
            assert "price" in prop, "Property missing 'price' field"
            assert isinstance(prop["price"], (int, float)), "'price' should be numeric"
            assert payload["price_min"] <= prop["price"] <= payload["price_max"], f"Property price {prop['price']} out of specified range"
            assert "rent_or_sale" in prop, "Property missing 'rent_or_sale' field"
            assert prop["rent_or_sale"].lower() == payload["rent_or_sale"], f"Property rent_or_sale {prop['rent_or_sale']} does not match filter {payload['rent_or_sale']}"

    except requests.exceptions.Timeout:
        assert False, "Request timed out"
    except requests.exceptions.RequestException as e:
        assert False, f"Request failed: {str(e)}"

test_property_search_with_filters()