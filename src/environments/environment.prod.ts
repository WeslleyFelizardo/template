export const environment = {
  identity: true,
  production: true,
  qas: false,
  dev: false,
  apiDeveloper: 'https://api-terminal.btp.com.br/developer/',
  apiWebHook:   'https://api-webhooks.btp.com.br/',  
  gatewayUrlPrd: 'https://api-terminal.btp.com.br/',
  gatewayUrlQas: 'https://api-terminal-qas.btp.com.br/',
  docs: {
    portalDevelopers: 'https://strgbtpapim.blob.core.windows.net/btp-docs/developer-portal/',
    storageOperationImages: 'https://strgbtpapim.blob.core.windows.net/operations-images/'  
  },
  oidcSettings: {
    authority: 'https://idp.btp.com.br/',
    client_id: 'btp_portal_desenvolvedor',    
    redirect_uri: 'https://developer.btp.com.br/#/sessions/signin#', 
    scope: 'openid profile webhooks_api developer_api',
    response_type: 'id_token token',
    post_logout_redirect_uri: 'https://developer.btp.com.br/#/',
    automaticSilentRenew: true,    
    silent_redirect_uri: 'https://developer.btp.com.br/#/sessions/redirect-silentrenew#',
    subscription_key: '0942b642ef19403c897f23f9c495ee79'
  }
};
