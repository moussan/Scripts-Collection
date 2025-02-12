# Cloud Audit Playbooks

A collection of Terraform configurations for auditing AWS, Azure, and GCP tenants. These playbooks query resources, networking, IAM setups, and security configurations, providing a comprehensive overview of your cloud environments.

## 📋 Features

- **AWS Audit**: Discovers EC2 instances, S3 buckets, IAM policies, and security groups.
- **Azure Audit**: Lists resource groups, virtual machines, storage accounts, and RBAC policies.
- **GCP Audit**: Queries Compute Engine instances, GCS buckets, and IAM roles.

## 🚀 Getting Started

1. **Install Terraform**:
   Download Terraform from the [official website](https://www.terraform.io/downloads).

2. **Clone the Repository**:
   ```bash
   git clone https://github.com/moussan/cloud-audit-playbooks.git
   cd cloud-audit-playbooks

3. **Set Up Environment Variables:**

   For AWS: Set up AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY.
   For Azure: Set up ARM_SUBSCRIPTION_ID, ARM_CLIENT_ID, ARM_CLIENT_SECRET, and ARM_TENANT_ID.
   For GCP: Set up GOOGLE_APPLICATION_CREDENTIALS with your service account key.

4. **Run Terraform:**
   ```bash
   terraform init
   terraform plan
   terraform apply

5. **📜 Outputs**
   Each playbook generates outputs summarizing the discovered resources in your cloud account.

6. 🛠 Customization
   Modify the variables.tf file in each playbook to specify:
   - Regions
   - Subscription/Project IDs
   - Specific resources of interest

7. **🛡 Security Considerations**
   Ensure the least-privileged permissions for Terraform's access to your cloud accounts. Audit results may contain sensitive information—handle them carefully.
