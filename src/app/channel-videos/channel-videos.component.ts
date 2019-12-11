import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-channel-videos',
  templateUrl: './channel-videos.component.html',
  styleUrls: ['./channel-videos.component.css']
})
export class ChannelVideosComponent implements OnInit {
  videos: any;
  offset = 0;

  constructor(private DataService: DataService) { }

  ngOnInit() {
    this.videos = this.DataService.activeChannelVideos;
    this.DataService.watchRoute().subscribe( event => {
      this.videos = this.DataService.activeChannelVideos;
    });
  }

}
