interface PlaylistTracksRefObject {
    href: string;
    items: [PlaylistTrackObject];
    limit: number;
    next?: string;
    offset: number;
    previous?: string;
    total: number;
}