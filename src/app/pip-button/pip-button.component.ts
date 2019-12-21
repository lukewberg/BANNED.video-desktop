import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pip-button',
  templateUrl: './pip-button.component.html',
  styleUrls: ['./pip-button.component.css']
})
export class PipButtonComponent implements OnInit {

  @Input() videoRef: any;
  @Input() left: any;
  @Input() right: any;
  @Input() top: any;
  @Input() bottom: any;
  @Input() displayStatus: true;

  constructor() { }

  ngOnInit() {
  }

  startPip() {
    this.videoRef.elem.firstElementChild.requestPictureInPicture();
    console.log(this.videoRef)
  }

}
