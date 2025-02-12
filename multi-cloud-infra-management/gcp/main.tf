
provider "google" {
  project = var.project_id
  region  = var.region
}

# Compute Instance
resource "google_compute_instance" "example" {
  name         = "${var.project_name}-vm"
  machine_type = var.machine_type
  zone         = var.zone

  boot_disk {
    initialize_params {
      image = "debian-cloud/debian-11"
    }
  }

  network_interface {
    network = "default"
    access_config {
      # Ephemeral public IP
    }
  }

  tags = ["web", "dev"]
}
