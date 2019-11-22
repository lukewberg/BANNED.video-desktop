export interface ShowInfo {
  times: string;
  phone: string;
  __typename: string;
}

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
  directUrl: string;
  __typename: string;
}

export interface Channel2 {
  _id: string;
  title: string;
  avatar: string;
  __typename: string;
}

export interface LiveStreamVideo {
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
  streamUrl: string;
}

export interface Video {
  _id: string;
  __typename: string;
  title: string;
  largeImage: string;
}

export interface Video2 {
  _id: string;
  __typename: string;
}

export interface Playlist {
  _id: string;
  title: string;
  videos: Video2[];
  __typename: string;
}

export interface GetChannel {
  _id: string;
  title: string;
  summary: string;
  avatar: string;
  coverImage: string;
  showInfo: ShowInfo;
  featuredVideo: FeaturedVideo;
  liveStreamVideo: LiveStreamVideo;
  videos: Video[];
  playlists: Playlist[];
  __typename: string;
}

export interface Data {
  getChannel: GetChannel;
}

export interface GetChannelRootObject {
  data: Data;
}
