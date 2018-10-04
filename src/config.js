const OAUTH_GOOGLE_CLIENT_ID = 'YOUR GOOGLE CLIENT ID'; // Enter your Google client ID here

const CONCTR_APP_ID = 'YOUR CONCTR APP ID'; // Enter your Conctr app ID here (staging.conctr.com)

const RECAPTCHA_SITE_KEY = 'YOUR RECAPTCHA SITE KEY'; // Enter your Recaptcha key here

const ACTION_TRIGGER_API_KEY = 'YOUR CONCTR API KEY'; // Enter your Conctr API key here. For security this should only provide permissions to configure actions and rules (ACTION_FULL_ACCESS, RULE_FULL_ACCESS)

const SES_ARN = 'YOUR SES ARN'; // Enter your AWS SES ARN here

const SES_SOURCE = 'YOUR SES SOURCE EMAIL ADDRESS'; // Enter the email address to send from here (this must be verified in AWS first)

const DEVICE_CLAIM_AWS_LAMBDA_API_GATEWAY = 'YOUR API URL'; // Enter your API Gateway URL here


export {
  OAUTH_GOOGLE_CLIENT_ID,
  CONCTR_APP_ID,
  RECAPTCHA_SITE_KEY,
  ACTION_TRIGGER_API_KEY,
  DEVICE_CLAIM_AWS_LAMBDA_API_GATEWAY,
  SES_ARN,
  SES_SOURCE
};

