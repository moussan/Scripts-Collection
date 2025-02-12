
variable "location" {
  description = "Azure region for resource deployment"
  type        = string
  default     = "East US"
}

variable "project_name" {
  description = "Project name used for resource naming"
  type        = string
}

variable "vm_size" {
  description = "Virtual Machine size"
  type        = string
  default     = "Standard_B1s"
}

variable "admin_password" {
  description = "Admin password for the virtual machine"
  type        = string
}
