interface TrackObject {
    album: Album;
    artists: [Artist];
    available_markets: [string];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_ids: ExternalIds;
    external_urls: ExternalUrls;
    href: string;
    id: string;
    is_local: boolean;
    is_playable: boolean;
    name: string;
    popularity: number;
    preview_url: string;
    track_number: number;
    type: Type.track;
    uri: string;
    restrictions: {};
}