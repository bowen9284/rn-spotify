interface SimplifiedPlaylistObject {
    collaborative: boolean;
    description: string;
    external_urls: ExternalUrls;
    href: string;
    id: string;
    images: [SpotifyImage];
    name: string;
    owner: Owner;
    public: boolean;
    snapshot_id: string;
    tracks: PlaylistTracksRefObject;
    type: Type.playlist
    uri: string;
}