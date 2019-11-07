import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { getActiveHomeLayout } from './interfaces/getActiveHomeLayout';
import { getHomeFeaturedVideos } from './interfaces/getHomeFeaturedVideos';
import { getDisplayChannel, Channel } from './interfaces/getDisplayChannel';


@Injectable({
  providedIn: 'root'
})

export class DataService {

  private readonly APIUrl = 'https://vod-api.infowars.com/graphql';

  public  featuredVideos: any;
  public  channels = [];
  public  navigationChannels: any;

  constructor(private httpClient: HttpClient) {}

  getActiveHomeLayout() {
    return this.httpClient.post<getActiveHomeLayout>(this.APIUrl, JSON.stringify({
      operationName: 'GetActiveHomeLayout',
      query: 'query GetActiveHomeLayout {  getActiveHomeLayout {    _id    featuredVideos {      _id      title      __typename    }    channels {      _id      title      videos {        _id        __typename      }      __typename    }    playlists {      _id      title      channel {        _id        __typename      }      videos {        _id        __typename      }      __typename    }    navigationChannels {      _id      title      avatar      __typename    }    pageItemsOrder    __typename  }}',
      variables: {}
    }), {
      headers: {
        'content-type': 'application/json'
      }
    });
  }

  getHomeFeaturedVideos() {
    return this.httpClient.post<getHomeFeaturedVideos>(this.APIUrl, JSON.stringify({
      operationName: 'GetHomeFeaturedVideos',
      query: 'query GetHomeFeaturedVideos { getActiveHomeLayout { _id featuredVideos { ...DisplayVideoFields __typename } __typename } } fragment DisplayVideoFields on Video { _id title summary playCount largeImage embedUrl published channel { _id title avatar __typename } createdAt __typename }',
      variables: {}
    }), {
      headers: {
        'content-type': 'application/json'

      }
    });
  }

  getDisplayChannel(id) {

    return this.httpClient.post<getDisplayChannel>(this.APIUrl, JSON.stringify({
      operationName: 'GetDisplayChannel',
      query: 'query GetDisplayChannel($id: String!) {\n  getChannel(id: $id) {\n    _id\n    featuredVideo {\n      ...DisplayVideoFields\n      __typename\n    }\n    videos {\n      ...DisplayVideoFields\n      __typename\n    }\n    __typename\n  }\n}\n\nfragment DisplayVideoFields on Video {\n  _id\n  title\n  summary\n  playCount\n  largeImage\n  embedUrl\n  published\n  channel {\n    _id\n    title\n    avatar\n    __typename\n  }\n  createdAt\n  __typename\n}\n',
      variables: {
        'id': id.toString()
      }
    }), {
      headers: {
        'content-type': 'application/json'
      }
    });
  }

  getVideo(id) {
    return this.httpClient.post<getDisplayChannel>(this.APIUrl, JSON.stringify({
      operationName: 'GetVideo',
      query: 'query GetVideo($id: String!) {  getVideo(id: $id) {    ...DisplayVideoFields    streamUrl    directUrl    sale {      _id      text      __typename    }    __typename  }}fragment DisplayVideoFields on Video {  _id  title  summary  playCount  largeImage  embedUrl  published  channel {    _id    title    avatar    __typename  }  createdAt  __typename}',
      variables: {
        'id': id
      }
    }), {
      headers: {
        'content-type': 'application/json'
      }
    });
  }

  setChannels(object: object) {
    this.channels.push(object);
  }

  setFeaturedVideos(object: object) {
    this.featuredVideos = object;
  }

  setNavigationChannels(object: object) {
    this.navigationChannels = object;
  }
}
