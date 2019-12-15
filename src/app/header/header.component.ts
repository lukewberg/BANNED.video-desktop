import { Component, OnInit } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  updateStatus = 'white';
  query: string;
  win: any;
  winMax = true;
  maxRestoreSymbol = `\uEADE`

  constructor( private Router: Router, private ElectronService: ElectronService) { }

  maxMin() {
    if (this.winMax === false) {
      this.win.maximize();
      this.maxRestoreSymbol = `\uEAE2`;
    } else {
      this.win.unmaximize();
      this.maxRestoreSymbol = `\uEADE`;
    }
  }

  ngOnInit() {
    this.win = this.ElectronService.remote.getCurrentWindow();
    this.ElectronService.ipcRenderer.on('update-available', () => {
      this.updateStatus = 'yellow';
      console.log('app update available!');
    });

    this.ElectronService.ipcRenderer.on('update-downloaded', () => {
      this.updateStatus = 'greenyellow';
      console.log('update downloaded!');
    });

    this.ElectronService.ipcRenderer.on('download-progress', (event, info) => {
      console.log(info);
    });
  }

  update() {
    if (this.updateStatus === 'greenyellow') {
      this.ElectronService.ipcRenderer.send('quit-and-install');
    }
  }

  store() {
    this.ElectronService.shell.openExternal('https://www.infowarsstore.com/');
  }

  Search(){
    this.Router.navigateByUrl('/search/' + this.query);
  }

}
