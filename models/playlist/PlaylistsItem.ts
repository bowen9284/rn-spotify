interface PlaylistsItem {
    collaborative: boolean;
    description: string;
    external_urls: ExternalUrls;
    href: string;
    id: string;
    images: [SpotifyImage];
    name: string;
    owner: Owner;
    primary_color?: string;
    public: boolean;
    snapshot_id: string;
    tracks: PlaylistTracks;
    type: Type;
    uri: string;
}