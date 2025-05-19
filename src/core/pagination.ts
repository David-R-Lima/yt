export interface IPagination {
    limit?: number;
    page?: number;
}

export interface IPaginationResponse {
    page: number;
    items: number;
    totalItems: number
}