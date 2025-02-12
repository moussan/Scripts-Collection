
output "bucket_name" {
  description = "Name of the S3 bucket created"
  value       = aws_s3_bucket.example.bucket
}

output "ec2_instance_id" {
  description = "ID of the EC2 instance created"
  value       = aws_instance.example.id
}
