# GCP Terraform Configuration for Auditing
# Queries GCP resources, IAM roles, and networking configurations.

provider "google" {
  project = var.project_id
}

# Compute Instances
data "google_compute_instances" "all" {}

output "compute_instances" {
  description = "List of all Compute Engine instances"
  value       = data.google_compute_instances.all.instances
}

# Storage Buckets
data "google_storage_buckets" "all" {}

output "storage_buckets" {
  description = "List of all GCS buckets"
  value       = data.google_storage_buckets.all.names
}

# IAM Roles
data "google_project_iam_roles" "all" {}

output "iam_roles" {
  description = "IAM roles defined in the project"
  value       = data.google_project_iam_roles.all.roles
}
