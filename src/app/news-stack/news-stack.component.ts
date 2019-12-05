import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-news-stack',
  templateUrl: './news-stack.component.html',
  styleUrls: ['./news-stack.component.css']
})
export class NewsStackComponent implements OnInit {

  news = [];
  zIndex: number;
  staticOffsetRatio: number;
  offsetRatio = -4;
  interval = true;
  headline: string;
  description: string;

  constructor(private dataService: DataService) { }

  pause() {
    this.interval = false;
  }

  play() {
    this.interval = true;
  }

  moveStack() {
    setTimeout( () => {
      if (this.news.length !== 0 && this.interval) {
        this.news.forEach(video => {
          if (video.zIndex+1 === this.news.length) {
            video.zIndex = 0;
            video.offsetRatio = this.staticOffsetRatio-4;
            video.visible = false;
          } else {
            video.zIndex += 1;
            video.offsetRatio -= 4;
            video.frontItem = false;
            if (video.zIndex+1 > this.news.length - 4) {
              video.visible = true;
              video.faded = true;
            }
            if (video.zIndex+1 === this.news.length) {
              this.headline = video.title;
              this.description = video.summary;
              video.faded = false;
              video.frontItem = true;
            }
          }
        });
      }
    }, 2000);
  }

  loop() {
    interval(5000).subscribe( x => {
        this.moveStack();
        });
    }


ngOnInit() {
    this.dataService.getHomeFeaturedVideos().subscribe(
      data => {
        this.staticOffsetRatio = (data.data.getActiveHomeLayout.featuredVideos.length * 4);
        this.zIndex = data.data.getActiveHomeLayout.featuredVideos.length;
        console.log(data.data.getActiveHomeLayout.featuredVideos);
        console.log(data.data.getActiveHomeLayout.featuredVideos.length);
        data.data.getActiveHomeLayout.featuredVideos.forEach(
          video => {
            this.zIndex -= 1;
            this.offsetRatio += 4;
            video['zIndex'] = this.zIndex;
            video['offsetRatio'] = this.offsetRatio;
            video['frontItem'] = false;
            video['visible'] = false;
            video['faded'] = false;
            this.news.push(video);
            this.headline = this.news[0].title;
            this.description = this.news[0].summary;
          }
        );
      }
    );
    this.moveStack();
    this.loop();
  }

}
