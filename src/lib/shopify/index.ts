const domain = process.env.SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

const endpoint = `https://${domain}/api/2024-01/graphql.json`;

type ShopifyFetchParams = {
  query: string;
  variables?: Record<string, any>;
  cache?: RequestCache;
  tags?: string[];
};

export async function shopifyFetch<T>({
  query,
  variables,
  cache = 'force-cache',
  tags
}: ShopifyFetchParams): Promise<{ status: number; body: T } | never> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 3000); // 3s timeout to prevent hanging

  try {
    if (!domain || domain === 'your-store.myshopify.com' || `${domain}`.includes('undefined')) {
      console.log('[Shopify] Domain is missing or invalid. Check Cloudflare environment variables.');
      throw new Error('Invalid Shopify Domain');
    }

    console.log(`[Shopify] Fetching: ${endpoint}`);

    const result = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': storefrontAccessToken!,
      },
      body: JSON.stringify({
        ...(query && { query }),
        ...(variables && { variables })
      }),
      cache,
      ...(tags && { next: { tags } }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);
    const body = await result.json();

    if (body.errors) {
      console.error('[Shopify] API Errors:', JSON.stringify(body.errors));
      throw body.errors[0];
    }

    return {
      status: result.status,
      body
    };
  } catch (e: any) {
    clearTimeout(timeoutId);
    if (e.name === 'AbortError') {
      console.error('[Shopify] Request timed out after 10 seconds');
    }
    console.error('[Shopify] Fetch failed:', e.message || e);
    throw e;
  }
}

// Example query to get products
export async function getProducts() {
  const res = await shopifyFetch<any>({
    query: `
      query getProducts {
        products(first: 10) {
          edges {
            node {
              id
              title
              handle
              description
              images(first: 1) {
                edges {
                  node {
                    url
                    altText
                  }
                }
              }
              priceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
    `
  });

  return res.body.data.products.edges.map((edge: any) => edge.node);
}
