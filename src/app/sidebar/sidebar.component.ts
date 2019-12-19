import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { fadeInOut } from '../animations/Animations';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  animations: [ fadeInOut() ]
})
export class SidebarComponent implements OnInit {

  channels: object;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getActiveSideBarChannels().subscribe( data => {
      this.channels = data.data.getActiveConfig.navigationChannels;
    })
  }

}
