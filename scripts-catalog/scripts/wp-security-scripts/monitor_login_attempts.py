# Script: monitor_login_attempts.py
# Description: Monitors login attempts from WordPress logs.

import re

# Path to log file
log_file = "/var/log/auth.log"

print("Monitoring login attempts...")

with open(log_file, "r") as f:
    for line in f:
        if "wp-login.php" in line:
            print(line.strip())
