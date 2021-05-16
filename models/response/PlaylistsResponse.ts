interface PlaylistsResponse {
    href: string;
    items: [SimplifiedPlaylistObject];
    limit: number;
    next: string;
    offset: number;
    previous?: string;
    total: number;
}