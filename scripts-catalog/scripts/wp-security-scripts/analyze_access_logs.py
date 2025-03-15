# Script: analyze_access_logs.py
# Description: Analyzes Apache/Nginx access logs for suspicious activity.

log_file = "/var/log/apache2/access.log"

print("Analyzing access logs...")

with open(log_file, "r") as f:
    for line in f:
        if "wp-login.php" in line:
            print(f"Suspicious activity: {line.strip()}")
