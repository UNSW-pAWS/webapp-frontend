export const VPC_OPTIONS = {
	"rules": [
		{
			"ruleName": "VPC_DEFAULT_SECURITY_GROUP_CLOSED",
			"selected": false
		},
		{
			"ruleName": "VPC_FLOW_LOGS_ENABLED",
			"selected": false
		},
		{
			"ruleName": "VPC_SG_OPEN_ONLY_TO_AUTHORIZED_PORTS",
			"selected": false
		}
	],
	"options": {
		"AWS::EC2::VPC": {
			"properties": [
				{
					"propertyId": "CidrBlock",
					"type": "free-text",
					"value": "10.0.0.0/16",
					"pattern": "^[0-9.\/]+$"
				}
			],
			"multiple": false,
			"required": true
		},
		"AWS::EC2::SecurityGroupIngress": {
			"properties": [
				{
					"propertyId": "CidrIp",
					"type": "free-text",
					"value": "127.0.0.1/32",
					"pattern": "^[0-9.\/]$",
					"managedRules": [
						"VPC_DEFAULT_SECURITY_GROUP_CLOSED"
					]
				},
				{
					"propertyId": "IpProtocol",
					"type": "dropdown",
					"value": "-1",
					"values": [
						"-1",
						"tcp",
						"udp",
						"icmp",
						"icmpv6"
					],
					"managedRules": [
						"VPC_DEFAULT_SECURITY_GROUP_CLOSED"
					]
				}
			],
			"multiple": false,
			"required": false
		},
		"AWS::EC2::SecurityGroupEgress": {
			"properties": [
				{
					"propertyId": "CidrIp",
					"type": "free-text",
					"value": "127.0.0.1/32",
					"pattern": "^[0-9.\/]$",
					"managedRules": [
						"VPC_DEFAULT_SECURITY_GROUP_CLOSED"
					]
				},
				{
					"propertyId": "IpProtocol",
					"type": "dropdown",
					"value": "-1",
					"values": [
						"-1",
						"tcp",
						"udp",
						"icmp",
						"icmpv6"
					],
					"managedRules": [
						"VPC_DEFAULT_SECURITY_GROUP_CLOSED"
					]
				}
			],
			"multiple": false,
			"required": false
		},
		"AWS::EC2::FlogLog": {
			"properties": [
				{
					"propertyId": "TrafficType",
					"type": "dropdown",
					"value": "ALL",
					"values": [
						"ACCEPT",
						"ALL",
						"REJECT"
					],
					"managedRules": [
						"VPC_FLOW_LOGS_ENABLED"
					]
				}
			],
			"multiple": false,
			"required": false
		}
	}
};