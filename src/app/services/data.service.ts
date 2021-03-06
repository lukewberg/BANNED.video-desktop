import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { getActiveHomeLayout } from './interfaces/getActiveHomeLayout';
import { getHomeFeaturedVideos } from './interfaces/getHomeFeaturedVideos';
import { getDisplayChannel } from './interfaces/getDisplayChannel';
import { GetChannelRootObject } from './interfaces/getChannel';
import { GetActiveSidebarChannels } from './interfaces/getActiveSideBarChannels';
import { SearchRootObject } from './interfaces/Search';
import { GetActiveConfig } from './interfaces/getActiveConfig';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})

export class DataService {

  private readonly APIUrl = 'https://vod-api.infowars.com/graphql';

  public featuredVideos: any;
  public channels = [];
  public navigationChannels: any;
  public activeChannelId: string;
  public activeChannelVideos = [];
  public activeChannelPlaylists: any;

  constructor(private httpClient: HttpClient, private router: Router) {}

  private routerObservable = new Subject();

  getActiveConfig(){
    return this.httpClient.post<GetActiveConfig>(this.APIUrl, JSON.stringify({
      operationName: 'GetActiveConfig',
      query: 'query GetActiveConfig {  getActiveConfig {    _id    featuredVideos {      _id      title      __typename    largeImage    summary    channel {_id    title    avatar    __typename}}    __typename  }}',
      variables: {}
    }), {
      headers: {
        'content-type': 'application/json'
      }
    })
  }

  Search(query: string, offset: number){
    return this.httpClient.post<SearchRootObject>(this.APIUrl, JSON.stringify({
      operationName: 'Search',
      query: 'query Search($query: String!, $category: String!, $limit: Float, $offset: Float) {  search(query: $query, category: $category, limit: $limit, offset: $offset) {    videos {      ...DisplayVideoFields      __typename    }    __typename  }}fragment DisplayVideoFields on Video {  _id  title  summary  playCount  largeImage  embedUrl  published  videoDuration  channel {    _id    title    avatar    __typename  }  createdAt  __typename}',
      variables: {
        category: 'VIDEO',
        limit: 20,
        offset: offset,
        query: query
      }
    }), {
      headers: {
        'content-type': 'application/json'
      }
    })
  }

  getActiveHomeLayout() {
    return this.httpClient.post<getActiveHomeLayout>(this.APIUrl, JSON.stringify({
      operationName: 'GetActiveHomeLayout',
      query: 'query GetActiveHomeLayout {  getActiveHomeLayout {    _id    featuredVideos {      _id      title      __typename    }    __typename  }}',
      variables: {}
    }), {
      headers: {
        'content-type': 'application/json'
      }
    });
  }

  getActiveSideBarChannels() {
    return this.httpClient.post<GetActiveSidebarChannels>(this.APIUrl, JSON.stringify({
      operationName: 'GetActiveSideBarChannels',
      query: 'query GetActiveSideBarChannels {  getActiveConfig {    _id    navigationChannels {      _id      title      avatar      __typename    }    __typename  }}',
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

  getChannel(id) {
    this.activeChannelId = id;
    this.routerObservable.next(id);
    return this.httpClient.post<GetChannelRootObject>(this.APIUrl, JSON.stringify({
      operationName: 'GetChannel',
      query: 'query GetChannel($id: String!) {  getChannel(id: $id) {    _id    title    summary    avatar    coverImage    showInfo {      times      phone      __typename    }    featuredVideo {      ...DisplayVideoFields      __typename      directUrl    }    liveStreamVideo {      ...DisplayVideoFields      streamUrl      __typename    }    videos {      _id      __typename      title      largeImage      channel {    _id    title    __typename  }}    playlists {      _id      title      videos {        channel {    _id    title    __typename  }        largeImage        title        _id        __typename      }      __typename    }    __typename  }}fragment DisplayVideoFields on Video {  _id  title  summary  playCount  largeImage  embedUrl  published  channel {    _id    title    avatar    __typename  }  createdAt  __typename}',
      variables: {
        'id': id
      }
    }), {
      headers: {
        'content-type': 'application/json'
      }
    })
  }

  getChannelVideos(offset) {
    return this.httpClient.post<GetChannelRootObject>(this.APIUrl, JSON.stringify({
      operationName: 'GetChannelVideos',
      query: 'query GetChannelVideos($id: String!, $offset: Float) {  getChannel(id: $id) {    _id    videos(offset: $offset) {      ...DisplayVideoFields      __typename    }    __typename  }}fragment DisplayVideoFields on Video {  _id  title  summary  playCount  largeImage  embedUrl  published  channel {    _id    title    avatar    __typename  }  createdAt  __typename}',
      variables: {
        'id': this.activeChannelId,
        'offset': offset
      }
    }), {
      headers: {
        'content-type': 'application/json'
      }
    }).subscribe( data => {
      this.activeChannelVideos.push({
        videos: data.data.getChannel.videos
      });
      return data;
    })
  }

  watchRoute(): Observable<any> {
    return this.routerObservable.asObservable();
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

  clearActiveChannelVideos() {
    this.activeChannelVideos = [];
    console.log(this.activeChannelVideos);
  }

  clearActiveChannelPlaylists() {
    this.activeChannelPlaylists = undefined;
  }

}
