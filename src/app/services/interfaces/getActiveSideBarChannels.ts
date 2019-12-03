export interface NavigationChannel {
  _id: string;
  title: string;
  avatar: string;
  __typename: string;
}

export interface GetActiveHomeLayout {
  _id: string;
  navigationChannels: NavigationChannel[];
  pageItemsOrder: string[];
  __typename: string;
}

export interface Data {
  getActiveHomeLayout: GetActiveHomeLayout;
}

export interface CacheControl {
  version: number;
  hints: any[];
}

export interface Extensions {
  cacheControl: CacheControl;
}

export interface GetActiveSideBarChannels {
  data: Data;
  extensions: Extensions;
}