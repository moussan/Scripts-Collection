# Script: backup_wordpress.py
# Description: Creates a zip backup of WordPress files and database.

import os
import subprocess
from zipfile import ZipFile

# Directories and database details
wordpress_dir = "/var/www/html"
backup_dir = "/backups"
database_name = "wordpress_db"
database_user = "root"
database_password = "password"

# Create a backup directory if not exists
os.makedirs(backup_dir, exist_ok=True)

# Backup database
db_backup_file = os.path.join(backup_dir, "db_backup.sql")
subprocess.run(
    ["mysqldump", "-u", database_user, f"-p{database_password}", database_name, "-r", db_backup_file]
)

# Zip files
backup_zip = os.path.join(backup_dir, "wordpress_backup.zip")
with ZipFile(backup_zip, "w") as zipf:
    for root, _, files in os.walk(wordpress_dir):
        for file in files:
            zipf.write(os.path.join(root, file))
    zipf.write(db_backup_file)

print(f"Backup complete: {backup_zip}")
