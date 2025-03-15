# Script: update_wordpress_plugins.py
# Description: Updates all WordPress plugins via WP-CLI.

import subprocess

# Path to WordPress installation
wordpress_dir = "/var/www/html"

# Run WP-CLI command to update plugins
subprocess.run(["wp", "plugin", "update", "--all", "--path", wordpress_dir])

print("WordPress plugins updated successfully.")
