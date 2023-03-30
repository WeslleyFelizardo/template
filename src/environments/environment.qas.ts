export const environment = {
  identity: true,
  production: false,
  qas: true,
  dev: false,  
  apiDeveloper: 'https://api-terminal-qas.btp.com.br/developer/',
  apiWebHook:   'https://api-webhooks-qas.btp.com.br/',
  gatewayUrlPrd: 'https://api-terminal.btp.com.br/',
  gatewayUrlQas: 'https://api-terminal-qas.btp.com.br/',
  docs: {
    portalDevelopers: 'https://strgbtpapim.blob.core.windows.net/btp-docs/developer-portal/',
    storageOperationImages: 'https://strgbtpapim.blob.core.windows.net/operations-images/' 
  },
  oidcSettings: {
    authority: 'https://idp-qas.btp.com.br:44301/',
    client_id: 'btp_portal_desenvolvedor',
    redirect_uri: 'https://developer-qas.btp.com.br/#/sessions/signin#', 
    scope: 'openid profile webhooks_api developer_api',
    response_type: 'id_token token',
    post_logout_redirect_uri: 'https://developer-qas.btp.com.br/#/',
    automaticSilentRenew: true,
    silent_redirect_uri: 'https://developer-qas.btp.com.br/#/sessions/redirect-silentrenew#',
    subscription_key: '3c9c611bc8c44442962a434c271e95e9'
  }
};
