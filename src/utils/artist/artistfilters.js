export function textfilter(is_music, isAlbum, isCommunity, msg){
    if(is_music && !msg){
        return 'capa da sua música '
    }
    else if(isAlbum && !msg){
        return 'capa do seu album'
    }
    else if(isCommunity){
        return 'imagem da comunidade'
    }
}
export function filterclasses(is_music, isalbum, isCommunity, msg){
    if((is_music || isalbum) && !msg){
        return 'w-80 h-80 text-white flex flex-col gap-2 justify-center items-center '
    }
    else if(isCommunity){
        return 'w-64 h-64 text-white flex flex-col gap-2 justify-center items-center '
    }
    
}