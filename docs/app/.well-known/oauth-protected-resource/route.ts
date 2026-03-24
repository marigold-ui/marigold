import {
  generateProtectedResourceMetadata,
  getPublicUrl,
  metadataCorsOptionsRequestHandler,
} from 'mcp-handler';

const OIDC_AUTHORITY = process.env.OIDC_AUTHORITY;

function handler(req: Request): Response {
  const resourceUrl = getPublicUrl(req).origin;
  const metadata = generateProtectedResourceMetadata({
    authServerUrls: OIDC_AUTHORITY ? [OIDC_AUTHORITY] : [],
    resourceUrl,
    additionalMetadata: {
      // Restrict scopes to prevent VS Code from requesting all Keycloak scopes,
      // which would cause "Invalid scopes" errors on clients with limited scope assignments.
      scopes_supported: ['openid'],
    },
  });
  return new Response(JSON.stringify(metadata), {
    headers: { 'Content-Type': 'application/json' },
  });
}

const corsHandler = metadataCorsOptionsRequestHandler();

export { handler as GET, corsHandler as OPTIONS };
