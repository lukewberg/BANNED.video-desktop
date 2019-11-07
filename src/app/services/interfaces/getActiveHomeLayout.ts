export interface getActiveHomeLayout {
    data: {
        getActiveHomeLayout: {
            featuredVideos: [
                {
                    _id: string,
                    title: string,
                    __typename: string
                }
            ],
            channels: [
                {
                    _id: string,
                    title: string,
                    videos: [
                        {
                            _id: string,
                            __typename: string
                        }
                    ]
                }
            ],
            navigationChannels: [
                {
                    _id: string,
                    title: string,
                    avatar: string,
                    __typename: string
                }
            ]
        }
    };
}