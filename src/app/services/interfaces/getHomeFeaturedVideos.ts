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

export interface GetActiveHomeLayout {
    _id: string;
    featuredVideos: FeaturedVideo[];
    __typename: string;
}

export interface Data {
    getActiveHomeLayout: GetActiveHomeLayout;
}

export interface getHomeFeaturedVideos {
    data: Data;
}