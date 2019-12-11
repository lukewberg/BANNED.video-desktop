import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { ActivatedRoute } from '@angular/router';
import { GetChannel } from '../services/interfaces/getChannel';

@Component({
  selector: 'app-channel-page',
  templateUrl: './channel-page.component.html',
  styleUrls: ['./channel-page.component.css']
})
export class ChannelPageComponent implements OnInit {

  channelData: GetChannel;
  offset = 0;
  videos: any;

  constructor(private route: ActivatedRoute, private dataService: DataService) { }

  ngOnInit() {
    this.route.paramMap.subscribe( data => {
      this.dataService.clearActiveChannelVideos();
      this.dataService.clearActiveChannelPlaylists();
      this.offset = 0;
      this.dataService.getChannel(data.get('channel_id')).subscribe(
        data => {
          this.dataService.getChannelVideos(this.offset);
          this.channelData = data.data.getChannel;
          this.dataService.activeChannelPlaylists = data.data.getChannel.playlists;
        }
      );
      this.videos = this.dataService.activeChannelVideos;
    });
  }

  onScroll() {
    if (this.channelData !== undefined) {
      this.offset += 10;
      this.dataService.getChannelVideos(this.offset);
    }
  }

  onMetadata(event, video) {
    console.log(video.duration);
  }

  onTimeUpdate(value) {
    //value.target.currentTime
  }

}
