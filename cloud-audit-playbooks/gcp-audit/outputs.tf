# Outputs for GCP Audit
output "audit_results" {
  description = "Summary of the GCP project audit"
  value = {
    compute_instances = data.google_compute_instances.all.instances
    storage_buckets   = data.google_storage_buckets.all.names
    iam_roles         = data.google_project_iam_roles.all.roles
  }
}
