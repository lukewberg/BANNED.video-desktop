export interface Channel {
  _id: string;
  title: string;
  avatar: string;
  __typename: string;
}

export interface FeaturedVideo {
  _id: string;
  title: string;
  __typename: string;
  largeImage: string;
  channel: Channel;
}

export interface GetActiveConfig {
  _id: string;
  featuredVideos: FeaturedVideo[];
  __typename: string;
}

export interface Data {
  getActiveConfig: GetActiveConfig;
}

export interface Resolver {
  path: any[];
  parentType: string;
  fieldName: string;
  returnType: string;
  startOffset: number;
  duration: number;
}

export interface Execution {
  resolvers: Resolver[];
}

export interface Tracing {
  version: number;
  startTime: Date;
  endTime: Date;
  duration: number;
  execution: Execution;
}

export interface Hint {
  path: any[];
  maxAge: number;
}

export interface CacheControl {
  version: number;
  hints: Hint[];
}

export interface Extensions {
  tracing: Tracing;
  cacheControl: CacheControl;
}

export interface GetActiveConfig {
  data: Data;
  extensions: Extensions;
}
