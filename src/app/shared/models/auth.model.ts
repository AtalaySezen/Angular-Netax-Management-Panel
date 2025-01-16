export enum Roles {
    ADMIN = 'ADMİN',
    STAFF = 'moderator',
    USER = 'USER'
}

export interface AuthData {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    gender: string;
    image: string;
}


export interface Auth<T> {
    id: number;
    data: AuthData;
    accessToken: string;
    refreshToken: string;
}

