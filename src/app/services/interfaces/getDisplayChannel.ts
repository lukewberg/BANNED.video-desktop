export interface Channel {
  _id: string;
  title: string;
  avatar: string;
  __typename: string;
}

export interface FeaturedVideo {
  _id: string;
  title: string;
  summary: string;
  playCount: number;
  largeImage: string;
  embedUrl: string;
  published: boolean;
  channel: Channel;
  createdAt: Date;
  __typename: string;
}

export interface Channel2 {
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
  channel: Channel2;
  createdAt: Date;
  __typename: string;
}

export interface GetChannel {
  _id: string;
  featuredVideo: FeaturedVideo;
  videos: Video[];
  __typename: string;
}

export interface Data {
  getChannel: GetChannel;
}

export interface getDisplayChannel {
  data: Data;
}
