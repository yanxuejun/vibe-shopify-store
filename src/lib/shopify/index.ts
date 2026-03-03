import { ShopifyProduct } from './types';

export type ShopifyFetchParams = {
  query: string;
  variables?: Record<string, unknown>;
  cache?: RequestCache;
  tags?: string[];
};

export async function shopifyFetch<T>({
  query,
  variables,
  cache = 'no-store',
  tags
}: ShopifyFetchParams): Promise<{ status: number; body: T } | never> {
  // 1. 将环境变量读取移入函数内部，防止全局作用域污染或未定义
  const domain = process.env.SHOPIFY_STORE_DOMAIN;
  const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
  const endpoint = `https://${domain}/api/2024-01/graphql.json`;

  if (!domain || domain.includes('your-store') || domain.includes('undefined')) {
    console.error('[Shopify] Domain environment variable is invalid:', domain);
    throw new Error('Invalid Shopify Domain');
  }

  console.log(`[Shopify] Starting fetch to: ${endpoint}`);

  const fetchPromise = fetch(endpoint, {
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
    // @ts-expect-error - duplex is needed for some edge runners
    duplex: 'half',
    ...(tags && { next: { tags } })
  });

  // 2. 使用 Promise.race 制作一个 5 秒的强制超时，防止无限挂起
  const timeoutPromise = new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Shopify Fetch Timeout')), 5000)
  );

  try {
    const result = (await Promise.race([fetchPromise, timeoutPromise])) as Response;

    console.log(`[Shopify] Received response status: ${result.status}`);

    const body = await result.json();

    if (body.errors) {
      console.error('[Shopify] API errors caught:', JSON.stringify(body.errors));
      throw body.errors[0];
    }

    return {
      status: result.status,
      body
    };
  } catch (e: unknown) {
    const errorMessage = e instanceof Error ? e.message : String(e);
    console.error('[Shopify] Fetch encountered an error or timeout:', errorMessage);
    throw e;
  }
}

export async function getProducts() {
  const res = await shopifyFetch<{ data: { products: { edges: { node: ShopifyProduct }[] } } }>({
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

  return res.body.data.products.edges.map((edge) => edge.node);
}
