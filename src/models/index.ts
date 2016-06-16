export interface Video {
  VideoId: number;
  Title: string;
  Intro: string;
  VideoArtUrl: string;
  Channel: Channel;
  Series?: Series;
  Episode?: number
}

export interface Channel {
  ChannelId: number;
  Name: string;
  Description: string;
}

export interface Series {
  SeriesId: number;
  Name: string;
}
