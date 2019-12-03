import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DataService } from './services/data.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ChannelSectionComponent } from './home-page/channel-section/channel-section.component';
import { TruncatePipe } from './truncate.pipe';
import { VideoPageComponent } from './video-page/video-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { VgCoreModule } from '../../node_modules/videogular2/compiled/core';
import { VgControlsModule } from '../../node_modules/videogular2/compiled/controls';
import { VgOverlayPlayModule } from '../../node_modules/videogular2/compiled/overlay-play';
import { VgBufferingModule } from '../../node_modules/videogular2/compiled/buffering';
import { VgStreamingModule } from '../../node_modules/videogular2/compiled/streaming';
import { IntroComponent } from './intro-page/intro.component';
import { HeaderComponent } from './header/header.component';
import { ChannelPageComponent } from './channel-page/channel-page.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NewsStackComponent } from './news-stack/news-stack.component';
import { ProgressgliderComponent } from './progressglider/progressglider.component';
import { MatIconModule } from '@angular/material/icon';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NgxElectronModule } from 'ngx-electron';

@NgModule({
  declarations: [
    AppComponent,
    ChannelSectionComponent,
    TruncatePipe,
    VideoPageComponent,
    HomePageComponent,
    IntroComponent,
    HeaderComponent,
    ChannelPageComponent,
    NewsStackComponent,
    ProgressgliderComponent,
    SidebarComponent,

  ],
  imports: [
    NgxElectronModule,
    MatIconModule,
    InfiniteScrollModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SlickCarouselModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    VgStreamingModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
