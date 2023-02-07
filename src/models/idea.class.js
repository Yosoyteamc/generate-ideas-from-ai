export class Idea {
    
    id;
    title;
    type;
    description;
    hashtags;
    position;
    isFavorite;
    isRead;
    dateIn;
    originalLanguage;

    constructor( id, title, type, description, hashtags, position, originalLanguage ){
        this.id = id;
        this.title = title;
        this.type = type;
        this.description = description;
        this.hashtags = hashtags;
        this.position = position;
        this.isFavorite = false;
        this.isRead = false;
        this.dateIn = new Date().getTime();
        this.originalLanguage = originalLanguage;
    }



}