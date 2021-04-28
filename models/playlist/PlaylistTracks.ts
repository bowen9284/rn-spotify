interface PlaylistTracks {
    href: string;
    items: [PlaylistItem];
    limit: number;
    next?: string;
    offset: number;
    previous?: string;
    total: number;
}