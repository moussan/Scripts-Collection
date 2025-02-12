# Outputs for Azure Audit
output "audit_results" {
  description = "Summary of the Azure subscription audit"
  value = {
    resource_groups = data.azurerm_resource_groups.all.names
    virtual_machines = data.azurerm_virtual_machines.all.names
    storage_accounts = data.azurerm_storage_accounts.all.names
    role_assignments = data.azurerm_role_assignments.all
  }
}
