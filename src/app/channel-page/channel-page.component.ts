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
  videos = [];

  constructor(private route: ActivatedRoute, private dataService: DataService) { }

  ngOnInit() {
    this.route.paramMap.subscribe( data => {
      this.dataService.getChannel(data.get('channel_id')).subscribe(
        data => {
          this.channelData = data.data.getChannel;
        }
      );
      this.dataService.getChannelVideos(data.get('channel_id'), this.offset).subscribe(
        data => {
          this.videos = [];
          this.videos.push({
            videos: data.data.getChannel.videos
          });
        }
      );
    });
  }

  onScroll() {
    if (this.channelData !== undefined) {
      this.offset += 10;
      this.dataService.getChannelVideos(this.channelData._id, this.offset).subscribe(
        data => {
          this.videos.push({
            videos: data.data.getChannel.videos
          });
        }
      );
    }
  }

  onMetadata(event, video) {
    console.log(video.duration);
  }

  onTimeUpdate(value) {
    //value.target.currentTime
  }

}
