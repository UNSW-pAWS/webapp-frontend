export const S3_OPTIONS = {    
	"rules": [
		{
			"ruleName": "S3_BUCKET_LEVEL_PUBLIC_ACCESS_PROHIBITED",
			"selected": false
		},
		{
			"ruleName": "S3_BUCKET_PUBLIC_READ_PROHIBITED",
			"selected": false
		},
		{
			"ruleName": "S3_BUCKET_PUBLIC_WRITE_PROHIBITED",
			"selected": false
		},
		{
			"ruleName": "S3_ACCOUNT_LEVEL_PUBLIC_ACCESS_BLOCKS_PERIODIC",
			"selected": false
		},
		{
			"ruleName": "S3_BUCKET_LOGGING_ENABLED",
			"selected": false
		},
		{
			"ruleName": "S3_BUCKET_SERVER_SIDE_ENCRYPTION_ENABLED",
			"selected": false
		},
		{
			"ruleName": "S3_DEFAULT_ENCRYPTION_KMS",
			"selected": false
		}
	],
	"options": {
		"AWS::S3::Bucket": {
			"properties": [
				{
					"propertyId": "AccessControl",
					"type": "dropdown",
					"value": "Private",
					"values": [
						"Private",
						"PublicRead",
						"PublicReadWrite",
						"AuthenticatedRead",
						"LogDeliveryWrite",
						"BucketOwnerRead",
						"BucketOwnerFullControl",
						"AwsExecRead"
					],
					"managedRules": [
						"S3_BUCKET_LEVEL_PUBLIC_ACCESS_PROHIBITED",
						"S3_BUCKET_PUBLIC_READ_PROHIBITED",
						"S3_BUCKET_PUBLIC_WRITE_PROHIBITED"
					]
				},
				{
					"propertyId": "PublicAccessBlockConfiguration",
					"type": "json",
					"value": "{ \"BlockPublicAcls\": true, \"BlockPublicPolicy\": true, \"IgnorePublicAcls\": true, \"RestrictPublicBuckets\": true }",
					"managedRules": [
						"S3_ACCOUNT_LEVEL_PUBLIC_ACCESS_BLOCKS_PERIODIC",
						"S3_BUCKET_PUBLIC_READ_PROHIBITED",
						"S3_BUCKET_PUBLIC_WRITE_PROHIBITED"
					]
				},
				{
					"propertyId": "LoggingConfiguration",
					"type": "json",
					"value": "{ \"DestinationBucketName\": { \"Ref\": \"LogBucket\" }, \"LogFilePrefix\": \"/logs/\" }",
					"managedRules": [
						"S3_BUCKET_LOGGING_ENABLED"
					]
				},
				{
					"propertyId": "BucketEncryption",
					"type": "json",
					"value": "\"ServerSideEncryptionConfiguration\": [{\"ServerSideEncryptionByDefault\": {\"SSEAlgorithm\": \"aws:kms\"}}]",
					"managedRules": [
						"S3_BUCKET_SERVER_SIDE_ENCRYPTION_ENABLED",
						"S3_DEFAULT_ENCRYPTION_KMS"
					]
				}
			],
			"multiple": false,
			"required": true
		},
		"AWS::S3::BucketPolicy": {
			"properties": [
				{
					"propertyId": "PolicyDocument",
					"type": "json",
					"value": "\"Statement\": [{\"Sid\": \"AllowSSLRequestsOnly\",\"Action\": \"s3:*\",\"Effect\": \"Deny\",\"Resource\": [{ \"Fn::Join\": [ \"\", [\"arn:aws:s3:::\", { \"Ref\": \"S3Bucket\" }]]}, { \"Fn::Join\": [ \"\", [\"arn:aws:s3:::\", { \"Ref\": \"S3Bucket\" }, \"/*\"]]}], \"Condition\": {\"Bool\": {\"aws:SecureTransport\":\"false\"}}, \"Principal\": \"*\"}]",
					"managedRules": [
						"S3_BUCKET_SSL_REQUESTS_ONLY"
					]
				}
			],
			"multiple": true,
			"required": false
		}
	}
};