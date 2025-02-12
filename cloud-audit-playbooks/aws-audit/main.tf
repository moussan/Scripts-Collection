# AWS Terraform Configuration for Auditing
# Queries resources, networking, and IAM policies for comprehensive analysis.

provider "aws" {
  region = var.region
}

# EC2 Instances
data "aws_instances" "all" {}

output "ec2_instances" {
  description = "List of EC2 instances in the account"
  value       = data.aws_instances.all.ids
}

# S3 Buckets
data "aws_s3_buckets" "all" {}

output "s3_buckets" {
  description = "List of all S3 buckets in the account"
  value       = data.aws_s3_buckets.all.buckets
}

# IAM Policies
data "aws_iam_policies" "all" {
  scope = "Local"
}

output "iam_policies" {
  description = "IAM policies defined in the account"
  value       = [for policy in data.aws_iam_policies.all.arns : policy]
}

# Security Groups
data "aws_security_groups" "all" {}

output "security_groups" {
  description = "Security groups in the AWS account"
  value       = data.aws_security_groups.all.names
}
