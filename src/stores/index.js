import { useSignUpStore } from "./user/signup";
import { useLoginStore } from "./user/login";
import { useLunnaIAStore } from "./IA/luuna";
import { useSearchStore } from "./search/search";
import { useHistoryStore } from "./history/history";
import { useBeArtistStore } from "./becomeartist/beanartist";
import { useArtistProgress } from "./becomeartist/beartistprogress";
import { useDocumentStore } from "./file/document";
import { useSongsStore } from "./songs/songs";
import { useGenreStore } from "./genre/genre";
import { useImgStore } from "./file/image";
import { usePaymentStore } from "./payments/payment";
import { useAlbumStore } from "./album/album";

export {
    useSignUpStore,
    useLoginStore,
    useLunnaIAStore,
    useSearchStore,
    useHistoryStore,
    useBeArtistStore,
    useArtistProgress,
    useDocumentStore,
    useImgStore,
    useSongsStore,
    useGenreStore,
    usePaymentStore,
    useAlbumStore
}