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

export interface PutAddProduct {
    id?: number;
    title: string;
    price: number;
}
