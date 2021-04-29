interface Album {
    album_type: AlbumType;
    artists?: [Artist];
    available_markets: [string];
    external_urls: ExternalUrls;
    href: string;
    id: string;
    images: [SpotifyImage];
    name: string;
    release_date: Date;
    total_trakcs: number;
    type: Type
    uri: string;
}