import { Component, OnInit, Input, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import { getDisplayChannel } from '../services/interfaces/getDisplayChannel';
import { slideInOutAnimation } from '../animations/Animations';

@Component({
  selector: 'app-video-page',
  templateUrl: './video-page.component.html',
  styleUrls: ['./video-page.component.css'],
  //animations: [slideInOutAnimation],
})

export class VideoPageComponent implements OnInit {
  data: any;
  channel: getDisplayChannel;
  channelId: any;
  videoId: any;
  displayStatus: boolean = true;

  constructor(private route: ActivatedRoute, private DataService: DataService) {}
ngOnInit() {
  this.route.paramMap.subscribe(params => {
    this.channelId = params.get('channel_id');
    this.videoId = params.get('video_id');
    this.DataService.getDisplayChannel(params.get('channel_id')).subscribe(data => {
      this.channel = data;
      this.DataService.getVideo(params.get('_id')).subscribe(data => {
        this.data = data;
      });
    });

  })
}
}
