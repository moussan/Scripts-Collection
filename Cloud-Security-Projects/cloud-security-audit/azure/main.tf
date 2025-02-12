
provider "azurerm" {
  features {}
}

resource "azurerm_security_center_contact" "example" {
  email               = "security@example.com"
  phone               = "123456789"
  notifications_by_role = {
    owner = true
  }
}
