
# Cybersecurity Projects

This repository contains a collection of projects designed to showcase advanced skills in cybersecurity, cloud security, and zero-trust architecture implementation. These projects emphasize automation, security audits, and modern network security practices suitable for enterprise environments.

## Projects Overview

### 1. Automated Penetration Testing
- **Project Name**: `automated-pen-testing`
- **Description**: A collection of Python scripts automating penetration testing tasks with tools like Nmap, Metasploit, and OpenVAS.
- **Key Features**:
  - Scans networks for vulnerabilities.
  - Generates detailed reports.
  - Sends alerts to Slack or Teams for immediate notifications.
- **Technologies**: Python, Nmap, Metasploit, Slack/Teams integration.

### 2. Cloud Security Audit Framework
- **Project Name**: `cloud-security-audit`
- **Description**: Terraform playbooks to audit and enhance security settings across AWS, Azure, and GCP.
- **Key Features**:
  - Sets up AWS GuardDuty for threat detection.
  - Configures Azure Security Center for centralized monitoring.
  - Uses GCP Security Command Center for asset security management.
- **Technologies**: Terraform, AWS, Azure, GCP.

### 3. Zero Trust Network Architecture
- **Project Name**: `zero-trust-architecture`
- **Description**: Terraform configurations to implement a Zero Trust model in AWS.
- **Key Features**:
  - Configures VPC endpoints and AWS PrivateLink for secure internal communication.
  - Enforces least privilege access with tailored IAM policies.
  - Secures API Gateway integrations and enables real-time logging with AWS CloudTrail.
- **Technologies**: AWS, Terraform, Zero Trust principles.

---

## Prerequisites
1. **General**:
   - Ensure Python 3.8+ and Terraform are installed.
   - Set up the necessary credentials for AWS, Azure, and GCP.

2. **Automated Penetration Testing**:
   - Install dependencies using `pip install -r requirements.txt`.
   - Configure Slack or Teams webhook URLs.

3. **Cloud Security Audit & Zero Trust**:
   - Edit the `variables.tf` files in each project with your environment-specific settings.

---

## How to Use

### Automated Penetration Testing
1. Navigate to the `automated-pen-testing` folder.
2. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Run the script:
   ```bash
   python automate_pentest.py
   ```

### Cloud Security Audit
1. Navigate to the desired cloud folder (`aws`, `azure`, or `gcp`).
2. Initialize Terraform:
   ```bash
   terraform init
   ```
3. Preview the changes:
   ```bash
   terraform plan
   ```
4. Apply the configuration:
   ```bash
   terraform apply
   ```

### Zero Trust Network
1. Navigate to the `zero-trust-architecture` folder.
2. Update the `variables.tf` file with your VPC ID and other required details.
3. Initialize Terraform and apply the configuration:
   ```bash
   terraform init
   terraform apply
   ```

---

## License
This repository is licensed under the MIT License. See the `LICENSE` file for details.

---

## Contributing
Contributions are welcome! Feel free to open issues or submit pull requests to improve the scripts and configurations.

---

## Contact
For inquiries or support, reach out to:
- **Author**: Moussa El Najmi
- **Email**: moussan@gmail.com
- **GitHub**: [moussan](https://github.com/moussan)
