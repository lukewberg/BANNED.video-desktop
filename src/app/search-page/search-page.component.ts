import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {

  videos = [];
  offset = 0;
  query: string;

  constructor(private DataService: DataService, private ActivatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.ActivatedRoute.paramMap.subscribe( data => {
      this.query = data.get('search_query');
      this.DataService.Search(data.get('search_query'), 0).subscribe(data => {
        this.videos = [];
        data.data.search.videos.forEach( video => {
          this.videos.push(video);
        })
      });
    });
  }

  onScroll() {
    console.log('loading more')
    if (this.videos !== undefined) {
      this.offset += 10;
      this.DataService.Search(this.query, this.offset).subscribe(
        data => {
          data.data.search.videos.forEach(video => {
            this.videos.push(video);
          })
        }
      );
    }
  }

}
