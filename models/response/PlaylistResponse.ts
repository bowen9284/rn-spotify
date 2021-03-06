interface PlaylistResponse {
    collaborative: boolean;
    description: string;
    external_urls: ExternalUrls;
    followers: Followers;
    href: string;
    id: string;
    images: [PlaylistImageUrl];
    name: string;
    owner: PublicUserObject;
    public?: boolean;
    snapshot_id: string;
    tracks: PlaylistTracksRefObject;
    type: Type;
    uri: string;
}