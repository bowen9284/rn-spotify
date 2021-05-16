interface PlaylistTrackObject {
    added_at: Date;
    added_by?: PublicUserObject;
    is_local: boolean;
    track: TrackObject | EpisodeObject
}