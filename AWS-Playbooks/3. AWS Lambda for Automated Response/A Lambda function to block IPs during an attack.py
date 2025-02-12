import boto3

waf = boto3.client('wafv2')

def lambda_handler(event, context):
    ip_set_id = 'BLOCK_IP_SET_ID'
    scope = 'REGIONAL'
    ip_to_block = '192.168.1.1/32'

    response = waf.update_ip_set(
        Name='BlockIPsSet',
        Scope=scope,
        Id=ip_set_id,
        Addresses=[ip_to_block]
    )

    return {
        'statusCode': 200,
        'body': f"IP {ip_to_block} added to the block list."
    }
