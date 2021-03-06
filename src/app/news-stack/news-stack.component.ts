import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { DataService } from '../services/data.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-news-stack',
  templateUrl: './news-stack.component.html',
  styleUrls: ['./news-stack.component.css']
})
export class NewsStackComponent implements OnInit, OnDestroy {

  @Input() news: any;
  zIndex: number;
  staticOffsetRatio: number;
  offsetRatio = -4;
  interval = true;
  headline: string;
  description: string;
  timeOut: any;
  intervalObservable: any;

  constructor(private dataService: DataService) { }

  pause() {
    if (this.interval){
      this.interval = false;
    }
  }

  play() {
    if (this.interval) {
      this.interval = true;
    }
  }

  resume(){
    this.interval = !this.interval;
  }

  backward() {
    if (this.news.length !== 0) {
      this.news.forEach(video => {

        if ((video.zIndex + 1 > this.news.length - 4)) {
          video.visible = true;
          video.faded = true;
        } else {
          video.visible = false;
        }

        if (video.zIndex === 0){
          video.zIndex = this.news.length - 1;
          video.offsetRatio = 0;
          video.visible = true;
          video.frontItem = true;
          video.faded = false;
          this.headline = video.title;
          this.description = video.summary;
        } else {
          video.zIndex -= 1;
          video.offsetRatio += 4;
          video.frontItem = false;
        }

      });
    }
  }

  forward() {
    if (this.news.length !== 0 ) {
      this.news.forEach(video => {
        if (video.zIndex + 1 === this.news.length) {
          video.zIndex = 0;
          video.offsetRatio = this.staticOffsetRatio - 4;
          video.visible = false;
        } else {
          video.zIndex += 1;
          video.offsetRatio -= 4;
          video.frontItem = false;
          if (video.zIndex + 1 > this.news.length - 4) {
            video.visible = true;
            video.faded = true;
          }
          if (video.zIndex + 1 === this.news.length) {
            this.headline = video.title;
            this.description = video.summary;
            video.faded = false;
            video.frontItem = true;
          }
        }
      });
    }
  }

  moveStack() {
     this.timeOut = setTimeout( () => {
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
    });
  }

  loop() {
    this.intervalObservable = interval(5000).subscribe( x => {
        this.moveStack();
        });
    }


ngOnInit() {
        this.staticOffsetRatio = (this.news.length * 4);
        this.zIndex = this.news.length;
        this.news.forEach(
          video => {
            this.zIndex -= 1;
            this.offsetRatio += 4;
            video['zIndex'] = this.zIndex;
            video['offsetRatio'] = this.offsetRatio;
            video['frontItem'] = false;
            video['visible'] = false;
            video['faded'] = false;
            //this.headline = this.news[0].title;
            //this.description = this.news[0].summary;
          })
    this.moveStack();
    this.loop();
  }

  ngOnDestroy() {
    clearInterval(this.timeOut);
    this.intervalObservable.unsubscribe();
  }

}
