# Outputs for AWS Audit
output "audit_results" {
  description = "Summary of the AWS account audit"
  value = {
    ec2_instances   = data.aws_instances.all.ids
    s3_buckets      = data.aws_s3_buckets.all.buckets
    iam_policies    = data.aws_iam_policies.all.arns
    security_groups = data.aws_security_groups.all.names
  }
}
