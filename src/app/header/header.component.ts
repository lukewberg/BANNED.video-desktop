import { Component, OnInit } from '@angular/core';
import { ElectronService } from 'ngx-electron';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor( private ElectronService: ElectronService ) { }

  ngOnInit() {
  }

  store() {
    this.ElectronService.shell.openExternal('https://www.infowarsstore.com/');
  }

}
