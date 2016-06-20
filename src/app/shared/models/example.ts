export interface Example {
  uid: string;
  title: string;
  description: string;
  publishDate: string;
  starCount: number;
  imageLinks: {
    thumbnail: string;
    smallThumbnail: string;
  }
}
