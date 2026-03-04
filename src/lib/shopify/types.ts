export type Image = {
    url: string;
    altText: string;
    width?: number;
    height?: number;
};

export type Money = {
    amount: string;
    currencyCode: string;
};

export type ProductVariant = {
    id: string;
    title: string;
    price: Money;
    availableForSale: boolean;
    selectedOptions: {
        name: string;
        value: string;
    }[];
    image?: Image;
};

export type ShopifyProduct = {
    id: string;
    title: string;
    handle: string;
    description: string;
    descriptionHtml: string;
    availableForSale: boolean;
    featuredImage: Image;
    images: {
        edges: {
            node: Image;
        }[];
    };
    priceRange: {
        minVariantPrice: Money;
        maxVariantPrice: Money;
    };
    variants: {
        edges: {
            node: ProductVariant;
        }[];
    };
    options: {
        id: string;
        name: string;
        values: string[];
    }[];
};

export type ShopifyCollection = {
    id: string;
    handle: string;
    title: string;
    description: string;
    image?: Image;
    products: {
        edges: {
            node: ShopifyProduct;
        }[];
    };
};

export type CartItem = {
    id: string;
    quantity: number;
    cost: {
        totalAmount: Money;
    };
    merchandise: {
        id: string;
        title: string;
        product: {
            title: string;
            handle: string;
        };
        image?: Image;
        selectedOptions: {
            name: string;
            value: string;
        }[];
    };
};

export type Cart = {
    id: string;
    checkoutUrl: string;
    cost: {
        subtotalAmount: Money;
        totalAmount: Money;
        totalTaxAmount: Money;
    };
    lines: {
        edges: {
            node: CartItem;
        }[];
    };
    totalQuantity: number;
};

export type MenuItem = {
    title: string;
    url: string;
    items?: MenuItem[];
};
