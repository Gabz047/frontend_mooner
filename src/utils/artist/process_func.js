export function filterClasses(i, active){
    if(i === 5 && active){
        return 'bg-purple-800 rounded-full w-7 h-2'
    }
    else if(i === 5 && !active){
        return 'bg-zinc-800 rounded-full w-7 h-2'
    }
    else if(i !== 5 && active){
        return 'bg-purple-800 rounded-full w-2 h-2'
    }
    else{
        return 'bg-zinc-800 rounded-full w-2 h-2'
    }
}