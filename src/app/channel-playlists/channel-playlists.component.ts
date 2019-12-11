import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-channel-playlists',
  templateUrl: './channel-playlists.component.html',
  styleUrls: ['./channel-playlists.component.css']
})
export class ChannelPlaylistsComponent implements OnInit {

  playlists: any;

  constructor(private DataService: DataService) { }

  ngOnInit() {
    this.playlists = this.DataService.activeChannelPlaylists;
    this.DataService.watchRoute().subscribe(event => {
      this.playlists = this.DataService.activeChannelPlaylists;
    });

  }

}
