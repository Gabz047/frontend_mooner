import { useSignUpStore } from "./user/signup";
import { useLoginStore } from "./user/login";
import { useLunnaIAStore } from "./IA/luuna";
import { useSearchStore } from "./search/search";
import { useHistoryStore } from "./history/history";
import { useNavigationStore } from "./navigation/navigation";
import { useSongStore } from "./mooner/song";
import { usePlaylistStore } from "./mooner/playlists";
import { useUserStore } from "./user/user";
import { useArtistStore } from "./user/artist";
import { useFollowingStore } from "./user/following";
import { useAlbumStore } from "./mooner/albuns";
import { useCommunityStore } from "./mooner/community";
import { useLikedSongStore } from "./mooner/likedSong";

export {
    useSignUpStore,
    useLoginStore,
    useLunnaIAStore,
    useSearchStore,
    useHistoryStore,
    useNavigationStore,
    useSongStore,
    usePlaylistStore,
    useUserStore,
    useArtistStore,
    useFollowingStore,
    useAlbumStore,
    useCommunityStore,
    useLikedSongStore
}