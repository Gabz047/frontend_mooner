export function textfilter(is_music, msg){
    if(is_music && !msg){
        return 'capa da sua música'
    }
    else if(!is_music && !msg){
        return 'sua foto de perfil'
    }
}
export function filterclasses(is_music, msg){
    if(is_music && !msg){
        return 'w-80 h-80 text-white'
    }
    else if(!is_music && !msg){
        return 'w-52 bg-stone-900 text-white h-52 rounded-full border border-white'
    }
}