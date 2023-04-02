export const environment = {
    identity: true,
    production: true,
    qas: false,
    dev: false,
    apiDeveloper: 'http://localhost:8080/',
    apiWebHook:  'http://localhost:8081/',
    gatewayUrlPrd: 'https://api-terminal.btp.com.br/',
    gatewayUrlQas: 'https://api-terminal-qas.btp.com.br/',
    docs: {
      portalDevelopers: 'https://strgbtpapim.blob.core.windows.net/btp-docs/developer-portal/',
      storageOperationImages: 'https://strgbtpapim.blob.core.windows.net/operations-images/'
    },
    
    oidcSettings: {
      authority: 'https://localhost:44300/',
      client_id: 'btp_portal_desenvolvedor',
      redirect_uri: 'http://localhost:4200/pages/authentication/sign-in/oidc',
      scope: 'openid profile webhooks_api developer_api',
      response_type: 'id_token token',
      post_logout_redirect_uri: 'http://localhost:4200/',
      automaticSilentRenew: true,
      silent_redirect_uri: 'https://localhost:44306/#/sessions/redirect-silentrenew#',
      subscription_key: '0942b642ef19403c897f23f9c495ee79'
    }
}