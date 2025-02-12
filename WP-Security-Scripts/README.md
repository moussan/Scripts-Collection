# WordPress Security Scripts

A collection of Python scripts for enhancing the security of WordPress hosting servers. These scripts help automate security tasks such as scanning vulnerabilities, monitoring file integrity, detecting malware, and more.

## 📋 Scripts Overview

| Script Name                | Description                                        |
|----------------------------|----------------------------------------------------|
| `scan_vulnerabilities.py`  | Scans for common WordPress vulnerabilities.       |
| `monitor_file_integrity.py`| Monitors integrity of WordPress core files.       |
| `backup_wordpress.py`      | Backs up WordPress files and database.            |
| `detect_malware.py`        | Detects malware in PHP files.                     |
| `update_wordpress_plugins.py` | Updates all plugins using WP-CLI.             |
| `monitor_login_attempts.py`| Monitors login attempts via logs.                 |
| `enforce_https.py`         | Checks if HTTPS is enforced.                      |
| `block_bad_ips.py`         | Blocks malicious IPs using UFW.                   |
| `analyze_access_logs.py`   | Analyzes access logs for suspicious activity.     |
| `reset_admin_password.py`  | Resets the WordPress admin password.              |

## 🛠 Prerequisites

- Python 3.x
- Required modules: `requests`
- Access to the WordPress server and its logs.

## 🔧 How to Use

1. Clone this repository:
    ```bash
    git clone https://github.com/yourusername/WP-Security-Scripts.git
    cd WP-Security-Scripts
    ```

2. Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```

3. Execute a script:
    ```bash
    python3 Scripts/scan_vulnerabilities.py
    ```

4. Adjust variables and paths as needed.

## 📜 License

This project is licensed under the MIT License.
