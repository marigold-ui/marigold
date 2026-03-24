import {
  metadataCorsOptionsRequestHandler,
  protectedResourceHandler,
} from 'mcp-handler';

const OIDC_AUTHORITY = process.env.OIDC_AUTHORITY;

const handler = protectedResourceHandler({
  authServerUrls: OIDC_AUTHORITY ? [OIDC_AUTHORITY] : [],
});

const corsHandler = metadataCorsOptionsRequestHandler();

export { handler as GET, corsHandler as OPTIONS };
