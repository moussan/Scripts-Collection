# Script: enforce_https.py
# Description: Checks if HTTPS is enforced and redirects are set.

import requests

# Define the site URL
site_url = "http://example.com"

response = requests.get(site_url, allow_redirects=False)

if response.status_code == 301 or response.status_code == 302:
    print("HTTPS redirect is enforced.")
else:
    print("WARNING: HTTPS is not enforced.")
