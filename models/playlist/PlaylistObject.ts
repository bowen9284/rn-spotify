interface PlaylistObject {
    collaborative: boolean;
    description: string;
    external_urls: ExternalUrls;
    followers: Followers;
    href: string;
    id: string;
    images: [SpotifyImage];
    name: string;
    owner: PublicUserObject;
    public: boolean;
    snapshot_id: string;
    tracks: PlaylistTracksRefObject;
    type: Type.playlist
    uri: string;
}