export function textfilter(is_music, msg){
    if(is_music && !msg){
        return 'capa da sua música '
    }
    else if(!is_music && !msg){
        return 'capa do seu album'
    }
}
export function filterclasses(is_music, msg){
    if(is_music && !msg){
        return 'w-80 h-80 text-white flex flex-col gap-2 justify-center items-center '
    }
    else if(!is_music && !msg){
        return 'w-80 h-80 text-white flex flex-col gap-2 justify-center items-center '
    }
}