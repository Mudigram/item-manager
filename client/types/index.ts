export interface User {
    id: number;
    username: string;
    email: string;
}

export interface Item {
    id: number;
    name: string;
    description: string;
    user_id: number;
    username: string;
    created_at: string;
}

export interface AuthResponse {
    token: string;
    user: User;
}

export interface ApiError {
    message: string;
    errors?: { msg: string; path: string }[];
}