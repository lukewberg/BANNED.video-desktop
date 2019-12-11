import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { VideoPageComponent } from './video-page/video-page.component';
import { IntroComponent } from './intro-page/intro.component';
import { ChannelPageComponent } from './channel-page/channel-page.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { LivestreamComponent } from './livestream/livestream.component';
import { ChannelPlaylistsComponent } from './channel-playlists/channel-playlists.component';
import { ChannelVideosComponent } from './channel-videos/channel-videos.component';


const routes: Routes = [
  { path: 'home', component: HomePageComponent },
  {
    path: 'video/:_id/:channel_id',
    component: VideoPageComponent
  },
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'channel/:channel_id',
    component: ChannelPageComponent,
     children: [
       { path: '', component: ChannelVideosComponent },
       { path: 'videos', component: ChannelVideosComponent},
       { path: 'playlists', component: ChannelPlaylistsComponent }
     ]
  },
  {
    path: 'search/:search_query',
    component: SearchPageComponent
  },
  {
    path: 'stream',
    component: LivestreamComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
