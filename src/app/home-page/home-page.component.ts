import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { ActivatedRoute } from '@angular/router';
import { Channel } from '../services/interfaces/getDisplayChannel';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  featuredVideos: any;
  channels = [];
  navigationChannels: any;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    if (this.dataService.featuredVideos){
      this.featuredVideos = this.dataService.featuredVideos;
      this.channels = this.dataService.channels;
      this.navigationChannels = this.dataService.navigationChannels;
    } else {
      this.dataService.getActiveSideBarChannels().subscribe(data => {
        if (data !== undefined) {
          for (const channel of data.data.getActiveConfig.navigationChannels) {
            if (channel) {
              this.dataService.getDisplayChannel(channel._id).subscribe(data => {
                this.channels.push(data.data.getChannel);
                this.dataService.setChannels(data.data.getChannel);
              });
            }
          }
        }
        this.navigationChannels = data.data.getActiveConfig.navigationChannels;
        this.dataService.setNavigationChannels(data.data.getActiveConfig.navigationChannels);
      });
      this.dataService.getHomeFeaturedVideos().subscribe(data => {
        this.featuredVideos = data.data.getActiveHomeLayout.featuredVideos;
        this.dataService.setFeaturedVideos(data.data.getActiveHomeLayout.featuredVideos);
      });
    }
  }

}
