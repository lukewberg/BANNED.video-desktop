import { Component, OnInit, Input } from '@angular/core';
import { GetChannel } from '../../services/interfaces/getChannel';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-channel-section',
  templateUrl: './channel-section.component.html',
  styleUrls: ['./channel-section.component.css']
})
export class ChannelSectionComponent implements OnInit {

  @Input() channel: GetChannel;
  firstVideo: any;
  secondVideo: any;
  status = true;

  constructor() { }

  ngOnInit() {
    if (this.firstVideo && this.secondVideo){
    } else {
      this.firstVideo = this.channel.videos.slice(0, 5);
      this.secondVideo = this.channel.videos.slice(5, 10);
    }
  }

}
