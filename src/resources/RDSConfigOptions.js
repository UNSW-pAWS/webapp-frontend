export const RDS_OPTIONS = {
	"rules": [
		{
			"ruleName": "RDS_AUTOMATIC_MINOR_VERSION_UPGRADE_ENABLED",
			"selected": false
		},
		{
			"ruleName": "RDS_INSTANCE_PUBLIC_ACCESS_CHECK",
			"selected": false
		},
		{
			"ruleName": "RDS_LOGGING_ENABLED",
			"selected": false
		},
		{
			"ruleName": "RDS_STORAGE_ENCRYPTED",
			"selected": false
		}
	],
	"options": {
		"AWS::RDS::DBInstance": {
			"properties": [
				{
					"propertyId": "Engine",
					"type": "dropdown",
					"value": "postgres",
					"values": [
						"aurora",
						"aurora-mysql",
						"aurora-postgresql",
						"mariadb",
						"mysql",
						"oracle-ee",
						"oracle-se2",
						"oracle-se1",
						"oracle-se",
						"postgres",
						"sqlserver-ee",
						"sqlserver-se",
						"sqlserver-ex",
						"sqlserver-web"
					]
				},
				{
					"propertyId": "DBInstanceClass",
					"type": "dropdown",
					"value": "db.m4.large",
					"values": [
						"db.t3.micro",
						"db.t3.small",
						"db.t3.medium",
						"db.t3.large",
						"db.t3.xlarge",
						"db.t3.2xlarge",
						"db.t2.micro",
						"db.t2.small",
						"db.t2.medium",
						"db.t2.large",
						"db.t2.xlarge",
						"db.t2.2xlarge",
						"db.t3.micro",
						"db.t3.small",
						"db.t3.medium",
						"db.t3.large",
						"db.t3.xlarge",
						"db.t3.2xlarge",
						"db.m6g.large",
						"db.m6g.xlarge",
						"db.m6g.2xlarge",
						"db.m6g.4xlarge",
						"db.m6g.8xlarge",
						"db.m6g.12xlarge",
						"db.m6g.16xlarge",
						"db.m5.large",
						"db.m5.xlarge",
						"db.m5.2xlarge",
						"db.m5.4xlarge",
						"db.m5.8xlarge",
						"db.m5.12xlarge",
						"db.m5.16xlarge",
						"db.m5.24xlarge",
						"db.m5d.large",
						"db.m5d.xlarge",
						"db.m5d.2xlarge",
						"db.m5d.4xlarge",
						"db.m5d.8xlarge",
						"db.m5d.12xlarge",
						"db.m5d.16xlarge",
						"db.m5d.24xlarge",
						"db.m4.large",
						"db.m4.xlarge",
						"db.m4.2xlarge",
						"db.m4.4xlarge",
						"db.m4.10xlarge",
						"db.m4.16xlarge",
						"db.r6g.large",
						"db.r6g.xlarge",
						"db.r6g.2xlarge",
						"db.r6g.4xlarge",
						"db.r6g.8xlarge",
						"db.r6g.12xlarge",
						"db.r6g.16xlarge",
						"db.r5.large",
						"db.r5.xlarge",
						"db.r5.2xlarge",
						"db.r5.4xlarge",
						"db.r5.8xlarge",
						"db.r5.12xlarge",
						"db.r5.16xlarge",
						"db.r5.24xlarge",
						"db.r5.large.tpc1.mem2x",
						"db.r5.xlarge.tpc2.mem2x",
						"db.r5.xlarge.tpc2.mem4x",
						"db.r5.2xlarge.tpc1.mem2x",
						"db.r5.2xlarge.tpc2.mem4x",
						"db.r5.2xlarge.tpc2.mem8x",
						"db.r5.4xlarge.tpc1.mem2x",
						"db.r5.4xlarge.tpc2.mem3x",
						"db.r5.4xlarge.tpc2.mem4x",
						"db.r5,6xlarge.tpc2.mem4x",
						"db.r5.8xlarge.tpc2.mem3x",
						"db.r5,12xlarge.tpc2.mem2x",
						"db.r5b.large",
						"db.r5b.xlarge",
						"db.r5b.2xlarge",
						"db.r5b.4xlarge",
						"db.r5b.8xlarge",
						"db.r5b.12xlarge",
						"db.r5b.16xlarge",
						"db.r5b.24xlarge",
						"db.r5d.large",
						"db.r5d.xlarge",
						"db.r5d.2xlarge",
						"db.r5d.4xlarge",
						"db.r5d.8xlarge",
						"db.r5d.12xlarge",
						"db.r5d.16xlarge",
						"db.r5d.24xlarge",
						"db.r4.large",
						"db.r4.xlarge",
						"db.r4.2xlarge",
						"db.r4.4xlarge",
						"db.r4.8xlarge",
						"db.r4.12xlarge",
						"db.r4.16xlarge",
						"db.x1e.large",
						"db.x1e.xlarge",
						"db.x1e.2xlarge",
						"db.x1e.4xlarge",
						"db.x1e.8xlarge",
						"db.x1e.12xlarge",
						"db.x1e.16xlarge",
						"db.x1e.32xlarge",
						"db.x1.16xlarge",
						"db.x1.32xlarge",
						"db.z1d.large",
						"db.z1d.xlarge",
						"db.z1d.2xlarge",
						"db.z1d.3xlarge",
						"db.z1d.6xlarge",
						"db/z1d.12xlarge"
					]
				},
				{
					"propertyId": "AllocatedStorage",
					"type": "free-text",
					"value": "50",
					"pattern": "^[0-9]+$"
				},
				{
					"propertyId": "AutoMinorVersionUpgrade",
					"type": "boolean",
					"value": true,
					"managedRules": [
						"RDS_AUTOMATIC_MINOR_VERSION_UPGRADE_ENABLED"
					]
				},
				{
					"propertyId": "PubliclyAccessible",
					"type": "boolean",
					"value": false,
					"managedRules": [
						"RDS_INSTANCE_PUBLIC_ACCESS_CHECK"
					]
				},
				{
					"propertyId": "EnableCloudwatchLogsExports",
					"type": "json",
					"value": "[\"postgresql\", \"upgrade\"]",
					"managedRules": [
						"RDS_LOGGING_ENABLED"
					]
				},
				{
					"propertyId": "StorageEncrypted",
					"type": "boolean",
					"value": true,
					"managedRules": [
						"RDS_STORAGE_ENCRYPTED"
					]
				}
			],
			"multiple": false,
			"required": true
		}
	}
};