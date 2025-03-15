# Script: reset_admin_password.py
# Description: Resets the WordPress admin password via WP-CLI.

import subprocess

# Admin details
admin_user = "admin"
new_password = "NewP@ssw0rd"

# Path to WordPress installation
wordpress_dir = "/var/www/html"

subprocess.run(
    ["wp", "user", "update", admin_user, f"--user_pass={new_password}", "--path", wordpress_dir]
)

print(f"Admin password reset for user '{admin_user}'.")
