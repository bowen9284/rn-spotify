interface PlaylistResponse {
    collaborative: boolean;
    description: string;
    external_urls: ExternalUrls;
    followers: Followers;
    href: string;
    id: string;
    images: [PlaylistImageUrl];
    name: string;
    owner: PublicUser;
    public?: boolean;
    snapshot_id: string;
    tracks: PlaylistTracks;
    type: Type;
    uri: string;
}