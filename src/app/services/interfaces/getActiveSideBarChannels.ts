export interface NavigationChannel {
  _id: string;
  title: string;
  avatar: string;
  __typename: string;
}

export interface GetActiveConfig {
  _id: string;
  navigationChannels: NavigationChannel[];
  __typename: string;
}

export interface Data {
  getActiveConfig: GetActiveConfig;
}

export interface CacheControl {
  version: number;
  hints: any[];
}

export interface Extensions {
  cacheControl: CacheControl;
}

export interface GetActiveSidebarChannels {
  data: Data;
  extensions: Extensions;
}
