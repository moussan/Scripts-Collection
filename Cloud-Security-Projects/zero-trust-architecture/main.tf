
provider "aws" {
  region = "us-east-1"
}

# Example VPC Endpoint
resource "aws_vpc_endpoint" "example" {
  vpc_id       = var.vpc_id
  service_name = "com.amazonaws.us-east-1.s3"
}
