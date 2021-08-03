export const LAMBDA_OPTIONS = {
	"rules": [
		{
			"ruleName": "LAMBDA_FUNCTION_PUBLIC_ACCESS_PROHIBITED",
			"selected": false
		}
	],
	"options": {
		"AWS::Lambda::Function": {
			"properties": [
				{
					"propertyId": "Timeout",
					"type": "integer",
					"value": 300
				},
				{
					"propertyId": "FunctionName",
					"type": "free-text",
					"value": "MyFunction",
					"pattern": "\\S"
				},
				{
					"propertyId": "Runtime",
					"type": "dropdown",
					"value": "nodejs14.x",
					"values": [
						"dotnetcore1.0",
						"dotnetcore2.0",
						"dotnetcore2.1",
						"dotnetcore3.1",
						"go1.x",
						"java11",
						"java8",
						"java8.al2",
						"nodejs10.x",
						"nodejs10.x",
						"nodejs12.x",
						"nodejs14.x",
						"nodejs4.3",
						"nodejs4.3-edge",
						"nodejs6.10",
						"nodejs8.10",
						"provided",
						"provided.al2",
						"python2.7",
						"python3.6",
						"python3.7",
						"python3.8",
						"ruby2.5",
						"ruby2.7"
					]
				}
			],
			"multiple": false,
			"required": true
		},
		"AWS::Lambda::Permission": {
			"properties": [
				{
					"propertyId": "Action",
					"type": "free-text",
					"value": "lambda:InvokeFunction",
					"pattern": "(lambda:[*]|lambda:[a-zA-Z]+|[*])"
				},
				{
					"propertyId": "Principal",
					"type": "free-text",
					"value": "",
					"pattern": "[^\\s]+",
					"managedRules": [
						"LAMBDA_FUNCTION_PUBLIC_ACCESS_PROHIBITED"
					]
				}
			],
			"multiple": true,
			"required": false
		}
	}
};