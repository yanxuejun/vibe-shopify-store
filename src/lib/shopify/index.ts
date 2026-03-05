import {
  ShopifyProduct,
  ShopifyCollection,
  Cart,
  MenuItem
} from './types';

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
  const domain = process.env.SHOPIFY_STORE_DOMAIN;
  const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
  const endpoint = `https://${domain}/api/2024-01/graphql.json`;

  if (!domain || domain.includes('your-store') || domain.includes('undefined')) {
    console.error('[Shopify] Domain environment variable is invalid:', domain);
    throw new Error('Invalid Shopify Domain');
  }

  const res = await fetch(endpoint, {
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

  const body = await res.json();

  if (body.errors) {
    throw body.errors[0];
  }

  return {
    status: res.status,
    body
  };
}

const PRODUCT_FRAGMENT = `
  fragment product on Product {
    id
    handle
    availableForSale
    title
    description
    descriptionHtml
    options {
      id
      name
      values
    }
    priceRange {
      maxVariantPrice {
        amount
        currencyCode
      }
      minVariantPrice {
        amount
        currencyCode
      }
    }
    variants(first: 250) {
      edges {
        node {
          id
          title
          availableForSale
          selectedOptions {
            name
            value
          }
          price {
            amount
            currencyCode
          }
          image {
            url
            altText
            width
            height
          }
        }
      }
    }
    featuredImage {
      url
      altText
      width
      height
    }
    images(first: 20) {
      edges {
        node {
          url
          altText
          width
          height
        }
      }
    }
  }
`;

export async function getProducts(query?: string) {
  const res = await shopifyFetch<{ data: { products: { edges: { node: ShopifyProduct }[] } } }>({
    query: `
      query getProducts($query: String) {
        products(first: 20, query: $query) {
          edges {
            node {
              ...product
            }
          }
        }
      }
      ${PRODUCT_FRAGMENT}
    `,
    variables: { query }
  });

  return res.body.data.products.edges.map((edge) => edge.node);
}

export async function getProduct(handle: string) {
  const res = await shopifyFetch<{ data: { product: ShopifyProduct } }>({
    query: `
      query getProduct($handle: String!) {
        product(handle: $handle) {
          ...product
        }
      }
      ${PRODUCT_FRAGMENT}
    `,
    variables: { handle }
  });

  return res.body.data.product;
}

export async function getCollections() {
  const res = await shopifyFetch<{ data: { collections: { edges: { node: ShopifyCollection }[] } } }>({
    query: `
      query getCollections {
        collections(first: 100) {
          edges {
            node {
              id
              handle
              title
              description
              image {
                url
                altText
                width
                height
              }
            }
          }
        }
      }
    `
  });

  return res.body.data.collections.edges.map((edge) => edge.node);
}

export async function getCollection(handle: string) {
  const res = await shopifyFetch<{ data: { collection: ShopifyCollection } }>({
    query: `
      query getCollection($handle: String!) {
        collection(handle: $handle) {
          id
          handle
          title
          description
          products(first: 50) {
            edges {
              node {
                ...product
              }
            }
          }
        }
      }
      ${PRODUCT_FRAGMENT}
    `,
    variables: { handle }
  });

  return res.body.data.collection;
}

export async function getMenu(handle: string = 'main-menu'): Promise<MenuItem[]> {
  const res = await shopifyFetch<{ data: { menu: { items: MenuItem[] } } }>({
    query: `
      query getMenu($handle: String!) {
        menu(handle: $handle) {
          items {
            title
            url
            items {
              title
              url
            }
          }
        }
      }
    `,
    variables: { handle }
  });

  return res.body.data.menu?.items || [];
}

const CART_FRAGMENT = `
  fragment cart on Cart {
    id
    checkoutUrl
    totalQuantity
    cost {
      subtotalAmount {
        amount
        currencyCode
      }
      totalAmount {
        amount
        currencyCode
      }
      totalTaxAmount {
        amount
        currencyCode
      }
    }
    lines(first: 100) {
      edges {
        node {
          id
          quantity
          cost {
            totalAmount {
              amount
              currencyCode
            }
          }
          merchandise {
            ... on ProductVariant {
              id
              title
              selectedOptions {
                name
                value
              }
              product {
                title
                handle
              }
              image {
                url
                altText
                width
                height
              }
            }
          }
        }
      }
    }
  }
`;

export async function createCart(): Promise<Cart> {
  const res = await shopifyFetch<{ data: { cartCreate: { cart: Cart } } }>({
    query: `
      mutation cartCreate {
        cartCreate {
          cart {
            ...cart
          }
        }
      }
      ${CART_FRAGMENT}
    `
  });

  return res.body.data.cartCreate.cart;
}

export async function getCart(cartId: string): Promise<Cart | undefined> {
  const res = await shopifyFetch<{ data: { cart: Cart } }>({
    query: `
      query getCart($cartId: ID!) {
        cart(id: $cartId) {
          ...cart
        }
      }
      ${CART_FRAGMENT}
    `,
    variables: { cartId }
  });

  return res.body.data.cart;
}

export async function addToCart(cartId: string, lines: { merchandiseId: string; quantity: number }[]): Promise<Cart> {
  const res = await shopifyFetch<{ data: { cartLinesAdd: { cart: Cart } } }>({
    query: `
      mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
        cartLinesAdd(cartId: $cartId, lines: $lines) {
          cart {
            ...cart
          }
        }
      }
      ${CART_FRAGMENT}
    `,
    variables: { cartId, lines }
  });

  return res.body.data.cartLinesAdd.cart;
}

export async function removeFromCart(cartId: string, lineIds: string[]): Promise<Cart> {
  const res = await shopifyFetch<{ data: { cartLinesRemove: { cart: Cart } } }>({
    query: `
      mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
        cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
          cart {
            ...cart
          }
        }
      }
      ${CART_FRAGMENT}
    `,
    variables: { cartId, lineIds }
  });

  return res.body.data.cartLinesRemove.cart;
}

export async function updateCart(cartId: string, lines: { id: string; quantity: number }[]): Promise<Cart> {
  const res = await shopifyFetch<{ data: { cartLinesUpdate: { cart: Cart } } }>({
    query: `
      mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
        cartLinesUpdate(cartId: $cartId, lines: $lines) {
          cart {
            ...cart
          }
        }
      }
      ${CART_FRAGMENT}
    `,
    variables: { cartId, lines }
  });

  return res.body.data.cartLinesUpdate.cart;
}
