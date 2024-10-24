const date = new Date() 
export const history = [
    {
        id: 1,
        date: `${date.getFullYear()} - ${date.getMonth()} - ${date.getDate()}`,
        songs: [
            {
               id: 1,
               img: 'https://images.genius.com/1c207656d6c9830fa0d37e60b311f1da.1000x1000x1.jpg',
               tittle: 'blinding lights',
               artist: 'The weekend'
            },
            {
                id: 2,
                img: 'https://images.genius.com/1c207656d6c9830fa0d37e60b311f1da.1000x1000x1.jpg',
                tittle: 'blinding lights',
                artist: 'The weekend'
             },
             {
                id: 3,
                img: 'https://images.genius.com/1c207656d6c9830fa0d37e60b311f1da.1000x1000x1.jpg',
                tittle: 'blinding lights',
                artist: 'The weekend'
             }
        ]
    },
    {
        id: 2,
        date: `${date.getFullYear()-1} - ${date.getMonth()} - ${date.getDate()}`,
        songs: [
            {
               id: 1,
               img: 'https://images.genius.com/1c207656d6c9830fa0d37e60b311f1da.1000x1000x1.jpg',
               tittle: 'blinding lights',
               artist: 'The weekend'
            },
            {
                id: 2,
                img: 'https://images.genius.com/1c207656d6c9830fa0d37e60b311f1da.1000x1000x1.jpg',
                tittle: 'blinding lights',
                artist: 'The weekend'
             },
             {
                id: 3,
                img: 'https://images.genius.com/1c207656d6c9830fa0d37e60b311f1da.1000x1000x1.jpg',
                tittle: 'blinding lights',
                artist: 'The weekend'
             }
        ]
    }

]