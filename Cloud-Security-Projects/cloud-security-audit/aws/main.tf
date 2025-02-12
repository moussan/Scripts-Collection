
provider "aws" {
  region = "us-east-1"
}

# Enable GuardDuty
resource "aws_guardduty_detector" "example" {
  enable = true
}
