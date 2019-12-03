import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-progressglider',
  templateUrl: './progressglider.component.html',
  styleUrls: ['./progressglider.component.css']
})
export class ProgressgliderComponent implements OnInit {

  topOffset: number;

  constructor() { }

  ngOnInit() {
    window.addEventListener('scroll', this.scroll, true);
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.scroll, true);
  }

  scroll = (event: any): void => {
    // Here scroll is a variable holding the anonymous function 
    // this allows scroll to be assigned to the event during onInit
    // and removed onDestroy
    // To see what changed:
    console.log(event);
    if (event.target.scrollTop) {
      this.topOffset = Math.trunc(100 - ((event.target.scrollTop / event.target.scrollHeight + .08) * 100));
      console.log(event.target.scrollTop / event.target.scrollHeight);
    } else if (event.target.scrollingElement !== undefined) {
      this.topOffset = Math.trunc(100 - ((event.target.scrollingElement.scrollTop / event.target.scrollingElement.scrollHeight) * 100));
    }
  }


}
