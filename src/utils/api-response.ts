import { Contact } from "src/models/contactModel";
export interface ApiResponse<T = unknown>{
    apiResponse: T;
    errors: ErrorItem[];
}

interface TokenResponse {
    token: string;
}

export interface DeletedContact {
    id: string;
    userId: number;
    isActive: boolean;
}

export type ApiDeletedContact = ApiResponse<DeletedContact>
export type ApiContactResponse = ApiResponse<Contact>
export type ApiContactsResponse = ApiResponse<Contact[]>;
export type ApiTokenResponse = ApiResponse<TokenResponse>;

export interface ErrorItem {
    message: string;
}
