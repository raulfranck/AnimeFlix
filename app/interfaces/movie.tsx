export interface MovieData {
    id: string;
    attributes: {
      titles: {
        en_jp: string;
      };
      posterImage: {
        medium: string;
      };
      synopsis: string;
      youtubeVideoId: string;
      ageRatingGuide: string;
      endDate: string;
      averageRating: string;
    };
  }
  
export interface Movie {
    data: MovieData;
}