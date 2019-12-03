import { Component, OnInit } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  query: string;

  constructor( private Router: Router, private ElectronService: ElectronService) { }

  ngOnInit() {
  }

  store() {
    this.ElectronService.shell.openExternal('https://www.infowarsstore.com/');
  }

  Search(){
    this.Router.navigateByUrl('/search/' + this.query);
  }

}
