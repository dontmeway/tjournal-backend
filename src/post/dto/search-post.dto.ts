export class SearchPostDto {
    title?: string;
    body?: string;
    tag?: string;
    views?: "ASC" | "DESC";
    take?: number;
    limit?: number
}