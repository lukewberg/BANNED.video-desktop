import { Component, OnInit } from '@angular/core';
import * as moment from 'moment-timezone';
import { GetChannel } from '../services/interfaces/getChannel';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-livestream',
  templateUrl: './livestream.component.html',
  styleUrls: ['./livestream.component.css']
})
export class LivestreamComponent implements OnInit {
  channel: GetChannel;
  displayStatus = true;
  showInfo = [
    {
      startTime: 8,
      endTime: 11,
      _id: '5b92d71e03deea35a4c6cdef'
    },
    {
      startTime: 11,
      endTime: 15,
      _id: '5b885d33e6646a0015a6fa2d'
    },
    {
      startTime: 15,
      endTime: 18,
      _id: '5b9301172abf762e22bc22fd'
    },
    {
      startTime: 19,
      endTime: 21,
      _id: '5d72c972f230520013554291'
    }
  ]

  constructor( public DataService: DataService) { }

  waitForNextShow(timeout: number){
    setTimeout( () => {
      console.log(timeout)
      for (let show of this.showInfo) {
        var texasTime = this.calcTime(-6).getHours()
        if ((texasTime >= show.startTime) && (texasTime < show.endTime)) {
          console.log(show + 'sleep function');
          this.DataService.getChannel(show._id).subscribe(data => {
            this.channel = data.data.getChannel;
          })
        } else if (show.startTime > texasTime) {
          this.waitForNextShow(this.secondsToShow(show.startTime));
          break;
        }
      }
    }, timeout);
  }

  calcTime(offset: number) {
    var d = new Date();

    var utc = d.getTime() + (d.getTimezoneOffset() * 60000);

    var nd = new Date(utc + (3600000 * offset));

    return nd;
  }


  secondsToShow(startTime: number) {
      var d = this.calcTime(-6);
      return ((((-d + d.setHours(startTime, 0, 0, 0)) / 6e4) * 60) *60) *1000;
    }

    getDay() {
      return this.calcTime(-6).getDay();
    }

  ngOnInit() {
    for (let show of this.showInfo){
      var texasTime = this.calcTime(-6).getHours();
      if ((texasTime >= show.startTime) && (texasTime < show.endTime) && (this.getDay() !== 0)) {
        console.log(show);
        console.log('Normal weekday; normal show scheduling.')
        this.DataService.getChannel(show._id).subscribe(data => {
          this.channel = data.data.getChannel;
        });
      } else if (show.startTime > texasTime && (this.getDay() !== 0)) {
        console.log('Normal weekday; normal show scheduling.')
        this.waitForNextShow(this.secondsToShow(show.startTime));
        console.log('Next show starts in: ' + this.secondsToShow(show.startTime)/60/60/1000 + ' minutes');
        break;
      }
      if (this.getDay() === 0 && (texasTime >= 16) && (texasTime < 18)) {
        console.log('Today is sunday, and the alex jones show is playing');
        this.DataService.getChannel(this.showInfo[1]._id).subscribe(data => {
          this.channel = data.data.getChannel;
        });
        break
      } else if (texasTime < 16 && this.getDay() === 0) {
        console.log('Today is sunday, and the alex jones show is playing');
        this.waitForNextShow(this.secondsToShow(16));
        console.log('Next show starts in: ' + this.secondsToShow(show.startTime) / 60 / 60 / 1000 + ' minutes');
        break;
      }
    }
  }

}
