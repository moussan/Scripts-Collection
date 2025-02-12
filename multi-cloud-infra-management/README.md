
# Multi-Cloud Infrastructure Management

This repository contains Terraform scripts to deploy and manage infrastructure across AWS, Azure, and GCP. It showcases a cloud architect's ability to work with multi-cloud environments, emphasizing scalability, security, and modular design.

## Features
- **AWS**: S3 bucket, EC2 instance, and data source for AMI.
- **Azure**: Resource group, virtual network, VM, and NIC.
- **GCP**: Compute Engine instance with tags and ephemeral IP.

## Prerequisites
1. Install Terraform: [Terraform Downloads](https://www.terraform.io/downloads).
2. Configure your cloud provider credentials:
   - AWS: Set `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`.
   - Azure: Set `ARM_SUBSCRIPTION_ID`, `ARM_CLIENT_ID`, `ARM_CLIENT_SECRET`, and `ARM_TENANT_ID`.
   - GCP: Set `GOOGLE_APPLICATION_CREDENTIALS`.

## Usage
1. Navigate to the desired cloud folder (`aws`, `azure`, or `gcp`).
2. Initialize Terraform:
   ```bash
   terraform init
   ```
3. Preview changes:
   ```bash
   terraform plan
   ```
4. Apply the configuration:
   ```bash
   terraform apply
   ```

## License
This project is licensed under the MIT License.
