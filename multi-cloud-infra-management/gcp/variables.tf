
variable "project_id" {
  description = "GCP project ID"
  type        = string
}

variable "region" {
  description = "GCP region for resource deployment"
  type        = string
  default     = "us-central1"
}

variable "zone" {
  description = "GCP zone for resource deployment"
  type        = string
  default     = "us-central1-a"
}

variable "project_name" {
  description = "Project name used for resource naming"
  type        = string
}

variable "machine_type" {
  description = "Machine type for the Compute Engine instance"
  type        = string
  default     = "e2-micro"
}
