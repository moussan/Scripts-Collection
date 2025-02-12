
provider "google" {
  project = "your_project_id"
}

resource "google_security_center_settings" "example" {
  name = "organizations/your_org_id/settings"
}
