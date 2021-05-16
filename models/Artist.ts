interface Artist {
    external_urls: ExternalUrls;
    href: string;
    id: string;
    name: string;
    type: Type.artist;
    uri: string;
    genres: [string];
    followers: Followers;
    popularity: number;
    images: [SpotifyImage]
}