import { Component, OnInit } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { Router } from '@angular/router';
import * as moment from 'moment-timezone';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  updateStatus = 'white';
  query: string;

  constructor( private Router: Router, private ElectronService: ElectronService) { }

  ngOnInit() {
    console.log(moment().tz('America/Chicago').format('hh z'));
    this.ElectronService.ipcRenderer.on('update-available', () => {
      this.updateStatus = 'yellow';
      console.log('app update available!!');
    });

    this.ElectronService.ipcRenderer.on('update-downloaded', () => {
      this.updateStatus = 'greenyellow';
      console.log('update downloaded!');
    });

    this.ElectronService.ipcRenderer.on('download-progress', (event, info) => {
      console.log(info);
    })
  }

  store() {
    this.ElectronService.shell.openExternal('https://www.infowarsstore.com/');
  }

  Search(){
    this.Router.navigateByUrl('/search/' + this.query);
  }

}
