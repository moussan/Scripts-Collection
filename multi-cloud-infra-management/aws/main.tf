
provider "aws" {
  region = var.region
}

# S3 Bucket
resource "aws_s3_bucket" "example" {
  bucket = "${var.project_name}-bucket"
  acl    = "private"
}

# EC2 Instance
resource "aws_instance" "example" {
  ami           = data.aws_ami.latest.id
  instance_type = var.instance_type

  tags = {
    Name = "${var.project_name}-ec2"
  }
}

# Data source for latest AMI
data "aws_ami" "latest" {
  most_recent = true
  owners      = ["amazon"]
  filter {
    name   = "name"
    values = ["amzn2-ami-hvm-*"]
  }
}
