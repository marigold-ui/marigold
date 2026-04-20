import {
  generateProtectedResourceMetadata,
  getPublicUrl,
  metadataCorsOptionsRequestHandler,
} from 'mcp-handler';
import { NextResponse } from 'next/server';

const OIDC_AUTHORITY = process.env.OIDC_AUTHORITY;

export function GET(req: Request) {
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
  return NextResponse.json(metadata, {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  });
}

export const OPTIONS = metadataCorsOptionsRequestHandler();
