interface FeaturedPlaylistsResponse {
    message: string
    playlists: PlayListItems
}

interface PlayListItems {
    items: [SimplifiedPlaylistObject]
}