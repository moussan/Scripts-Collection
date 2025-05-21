# Scripts-Collection
 Collection of scripts to automate certain tasks in Security, Cloud Computing, and Active Directory.

 ## Script Categories and Index

 This repository contains scripts categorized by their primary function or target environment. Below is an index of the available categories and a brief description of the scripts within each.

 ### AWS Playbooks

 This category includes playbooks and scripts for automating tasks and implementing security configurations within AWS.

 *   `1. AWS WAF Rule to Block Malicious IPs/Create a WAF rule to block traffic from specific IP addresses.json`: Defines a WAF rule to block specific IP addresses.
 *   `1. AWS WAF Rule to Block Malicious IPs/IP Set Creation.json`: Creates an IP set for use with AWS WAF.
 *   `2. AWS Auto Scaling for EC2 Instances/Automatically scale EC2 instances based on traffic.yaml`: Configures AWS Auto Scaling for EC2 instances.
 *   `3. AWS Lambda for Automated Response/A Lambda function to block IPs during an attack.py`: Python script for a Lambda function to block IPs automatically during an attack.
 *   `3. AWS Lambda for Automated Response/IAM Role for Lambda.json`: Defines an IAM role for the Lambda function.
 *   `4. CloudFront Configuration for Traffic Diversion/Divert traffic using Amazon CloudFront.yaml`: Configures CloudFront for traffic diversion.
 *   `5. Shield Advanced Configuration/Enable Shield Advanced for enhanced protection.json`: Enables AWS Shield Advanced.
 *   `6. CloudWatch Alarm for Anomaly Detection/Trigger alarms during unusual traffic spikes.yaml`: Configures CloudWatch alarms for anomaly detection.

 ### Active Directory Maintenance Scripts

 PowerShell scripts for performing common maintenance tasks in Active Directory.

 *   `Scripts/Add-ADUser.ps1`: Adds a new Active Directory user.
 *   `Scripts/Backup-GPOs.ps1`: Backs up Group Policy Objects.
 *   `Scripts/Check-ADDomainControllersHealth.ps1`: Checks the health of Active Directory Domain Controllers.
 *   `Scripts/Create-OrganizationalUnit.ps1`: Creates a new Organizational Unit.
 *   `Scripts/Find-DuplicateLogins.ps1`: Finds duplicate user logins.
 *   `Scripts/Get-GroupMembershipReport.ps1`: Generates a report on group memberships.
 *   `Scripts/Monitor-ADReplication.ps1`: Monitors Active Directory replication.
 *   `Scripts/Remove-InactiveADUser.ps1`: Removes inactive Active Directory users.
 *   `Scripts/Unlock-LockedAccounts.ps1`: Unlocks locked Active Directory accounts.
 *   `Scripts/Update-ADUserProperties.ps1`: Updates properties of an Active Directory user.

 ### Cloud Security Projects

 Projects and scripts related to cloud security practices.

 *   `automated-pen-testing/automate_pentest.py`: Python script for automating penetration testing tasks.
 *   `automated-pen-testing/requirements.txt`: Specifies Python dependencies for the automated pen testing script.
 *   `cloud-security-audit/aws/main.tf`: Terraform code for auditing AWS security configurations.
 *   `cloud-security-audit/azure/main.tf`: Terraform code for auditing Azure security configurations.
 *   `cloud-security-audit/gcp/main.tf`: Terraform code for auditing GCP security configurations.
 *   `zero-trust-architecture/main.tf`: Terraform code for implementing a zero-trust architecture.
 *   `zero-trust-architecture/variables.tf`: Defines variables for the zero-trust architecture Terraform code.

 ### WP Security Scripts

 Scripts focused on enhancing the security of WordPress websites.

 *   `Scripts/analyze_access_logs.py`: Analyzes WordPress access logs for suspicious activity.
 *   `Scripts/backup_wordpress.py`: Backs up a WordPress website.
 *   `Scripts/block_bad_ips.py`: Blocks malicious IP addresses from accessing WordPress.
 *   `Scripts/detect_malware.py`: Detects malware in WordPress files.
 *   `Scripts/enforce_https.py`: Enforces HTTPS for a WordPress website.
 *   `Scripts/monitor_file_integrity.py`: Monitors the integrity of WordPress files.
 *   `Scripts/monitor_login_attempts.py`: Monitors and mitigates brute-force login attempts.
 *   `Scripts/reset_admin_password.py`: Resets the WordPress admin password.
 *   `Scripts/scan_vulnerabilities.py`: Scans a WordPress website for vulnerabilities.
 *   `Scripts/update_wordpress_plugins.py`: Updates WordPress plugins.

 ### Cloud Audit Playbooks

 Terraform playbooks for auditing cloud provider configurations.

 *   `aws-audit/main.tf`: Terraform code for auditing AWS resources.
 *   `aws-audit/outputs.tf`: Defines outputs for the AWS audit playbook.
 *   `aws-audit/variables.tf`: Defines variables for the AWS audit playbook.
 *   `azure-audit/main.tf`: Terraform code for auditing Azure resources.
 *   `azure-audit/outputs.tf`: Defines outputs for the Azure audit playbook.
 *   `azure-audit/variables.tf`: Defines variables for the Azure audit playbook.
 *   `gcp-audit/main.tf`: Terraform code for auditing GCP resources.
 *   `gcp-audit/outputs.tf`: Defines outputs for the GCP audit playbook.
 *   `gcp-audit/variables.tf`: Defines variables for the GCP audit playbook.

 ### Multi-Cloud Infra Management

 Terraform code for managing infrastructure across multiple cloud providers.

 *   `aws/main.tf`: Terraform code for managing AWS infrastructure.
 *   `aws/outputs.tf`: Defines outputs for the AWS infrastructure management.
 *   `aws/variables.tf`: Defines variables for the AWS infrastructure management.
 *   `azure/main.tf`: Terraform code for managing Azure infrastructure.
 *   `azure/variables.tf`: Defines variables for the Azure infrastructure management.
 *   `gcp/main.tf`: Terraform code for managing GCP infrastructure.
 *   `gcp/variables.tf`: Defines variables for the GCP infrastructure management.

 ### Microsoft Activation Scripts

 Scripts for activating Microsoft Windows and Office products.

 *   `MAS/All-In-One-Version-KL/MAS_AIO.cmd`: All-in-One script for Microsoft product activation.
 *   `MAS/Separate-Files-Version/Change_Office_Edition.cmd`: Changes the edition of Microsoft Office.
 *   `MAS/Separate-Files-Version/Change_Windows_Edition.cmd`: Changes the edition of Microsoft Windows.
 *   `MAS/Separate-Files-Version/Check_Activation_Status.cmd`: Checks the activation status of Microsoft products.
 *   `MAS/Separate-Files-Version/Extract_OEM_Folder.cmd`: Extracts the OEM folder.
 *   `MAS/Separate-Files-Version/Troubleshoot.cmd`: Provides troubleshooting steps for activation issues.
 *   `MAS/Separate-Files-Version/_ReadMe.html`: HTML ReadMe file for the separate files version.
 *   `MAS/Separate-Files-Version/Activators/HWID_Activation.cmd`: Script for Hardware ID activation.
 *   `MAS/Separate-Files-Version/Activators/KMS38_Activation.cmd`: Script for KMS38 activation.
 *   `MAS/Separate-Files-Version/Activators/Ohook_Activation_AIO.cmd`: All-in-One script for Ohook activation.
 *   `MAS/Separate-Files-Version/Activators/Online_KMS_Activation.cmd`: Script for online KMS activation.
 *   `MAS/Separate-Files-Version/Activators/ReadMe.txt`: Text ReadMe file for the activators.