import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { VideoPageComponent } from './video-page/video-page.component';
import { IntroComponent } from './intro-page/intro.component';


const routes: Routes = [
  { path: 'home', component: HomePageComponent },
  {
    path: 'video/:_id/:channel_id',
    component: VideoPageComponent
  },
  {
    path: '',
    component: IntroComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
