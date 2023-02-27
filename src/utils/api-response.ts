export interface ApiResponse<T = unknown>{
    apiResponse: T;
    errors: ErrorItem[];
}

interface TokenResponse {
    token: string;
}

export interface Contact {
    id: number;
    nome: string;
    telefone: number;
    email: string;
    data_alteracao: string | null;
}

export interface DeletedContact {
    id: string;
    userId: number;
    isActive: boolean;
}

export type ApideletedContact = ApiResponse<DeletedContact>
export type ApiContactResponse = ApiResponse<Contact>
export type ApiContactsResponse = ApiResponse<Contact[]>;
export type ApiTokenResponse = ApiResponse<TokenResponse>;

export interface ErrorItem {
    message: string;
}
