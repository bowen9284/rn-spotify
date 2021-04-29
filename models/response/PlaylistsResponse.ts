interface PlaylistsResponse {
    href: string;
    items: [PlaylistsItem];
    limit: number;
    next: string;
    offset: number;
    previous?: string;
    total: number;
}