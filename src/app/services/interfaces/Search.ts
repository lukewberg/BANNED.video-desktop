export interface Channel {
  _id: string;
  title: string;
  avatar: string;
  __typename: string;
}

export interface Video {
  _id: string;
  title: string;
  summary: string;
  playCount: number;
  largeImage: string;
  embedUrl: string;
  published: boolean;
  videoDuration ? : any;
  channel: Channel;
  createdAt: Date;
  __typename: string;
}

export interface Search {
  videos: Video[];
  __typename: string;
}

export interface Data {
  search: Search;
}

export interface SearchRootObject {
  data: Data;
}
