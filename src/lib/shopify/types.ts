export type ShopifyProduct = {
    id: string;
    title: string;
    handle: string;
    description: string;
    images: {
        edges: {
            node: {
                url: string;
                altText: string;
            };
        }[];
    };
    priceRange: {
        minVariantPrice: {
            amount: string;
            currencyCode: string;
        };
    };
};

export type ShopifyCollection = {
    id: string;
    handle: string;
    title: string;
    description: string;
    image?: {
        url: string;
        altText: string;
    };
};
