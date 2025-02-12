# Azure Terraform Configuration for Auditing
# Discovers resources, networking, and RBAC policies in an Azure subscription.

provider "azurerm" {
  features {}
}

# List all Resource Groups
data "azurerm_resource_groups" "all" {}

output "resource_groups" {
  description = "List of all resource groups"
  value       = data.azurerm_resource_groups.all.names
}

# List all Virtual Machines
data "azurerm_virtual_machines" "all" {}

output "virtual_machines" {
  description = "List of virtual machines in the subscription"
  value       = data.azurerm_virtual_machines.all.names
}

# List all Storage Accounts
data "azurerm_storage_accounts" "all" {}

output "storage_accounts" {
  description = "List of storage accounts in the subscription"
  value       = data.azurerm_storage_accounts.all.names
}

# RBAC Assignments
data "azurerm_role_assignments" "all" {}

output "role_assignments" {
  description = "RBAC role assignments"
  value       = [for assignment in data.azurerm_role_assignments.all : assignment]
}
