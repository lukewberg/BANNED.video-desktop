import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  channels: object;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getActiveSideBarChannels().subscribe( data => {
      this.channels = data.data.getActiveHomeLayout.navigationChannels;
    })
  }

}
