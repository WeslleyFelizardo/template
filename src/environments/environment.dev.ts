export const environment = {
  identity: true,
  production: false,
  qas: false,
  dev: true,
  apiDeveloper: 'https://api-terminal-dev.btp.com.br/developer/',
  apiWebHook:   'https://api-webhooks-dev.btp.com.br/',
  gatewayUrlPrd: 'https://api-terminal.btp.com.br/',
  gatewayUrlQas: 'https://api-terminal-qas.btp.com.br/',
  docs: {
    portalDevelopers: 'https://strgbtpapim.blob.core.windows.net/btp-docs/developer-portal/',
    storageOperationImages: 'https://strgbtpapim.blob.core.windows.net/operations-images/'  
  },
  oidcSettings: {
    authority: 'https://idp-dev.btp.com.br:44301/',
    client_id: 'btp_portal_desenvolvedor',  
    redirect_uri: 'https://developer-dev.btp.com.br/#/sessions/signin#', 
    scope: 'openid profile webhooks_api developer_api',
    response_type: 'id_token token',
    post_logout_redirect_uri: 'https://developer-dev.btp.com.br/#/',
    automaticSilentRenew: true,    
    silent_redirect_uri: 'https://developer-dev.btp.com.br/#/sessions/redirect-silentrenew#',
    subscription_key: '0942b642ef19403c897f23f9c495ee79'
  }
};
