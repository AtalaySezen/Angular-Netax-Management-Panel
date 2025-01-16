export interface QueryPageSize {
    skip?: number;
    limit?: number;
}

export interface Product {
    id: string;
    title: string;
    price: number;
}

export interface ProductResponse {
    products: Product[];
    skip: number;
    limit: number;
    total: number;
}