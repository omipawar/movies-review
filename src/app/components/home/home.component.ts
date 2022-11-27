import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  allmovies: any;
  img: any;
  searchData: any;
  page: number = 1;
  itemsPerPage: number = 20;
  totalResults: number = 0;
  isShowAll: boolean = false;
  isLatest: boolean = false;
  isTopRated: boolean = false;
  isTrending: boolean = false;
  isSearch: boolean = false;
  searchdata: any;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.img = this.api.imgURL;
    this.showall();

    this.searchData = new FormGroup({
      searchDetails: new FormControl("", Validators.required)
    });
  }

  showall() {
    this.api.getAllMovies(this.page).subscribe((res: any) => {
      this.allmovies = res.results;
      this.totalResults = res.total_results;

      this.isShowAll = true;
      this.isLatest = false;
      this.isTopRated = false;
      this.isTrending = false;
      this.isSearch = false;
    })
  }

  search(data: any) {
    console.log(data);

    this.api.getSearchedMovies(data, this.page).subscribe((res: any) => {
      // console.log("Searched movies :- ", res);
      this.allmovies = res.results;
      this.totalResults = res.total_results;

      this.isShowAll = false;
      this.isLatest = false;
      this.isTopRated = false;
      this.isSearch = true;
      this.isTrending = false;
    });
  }

  getLatestMovies() {
    this.api.getLatest(this.page).subscribe((res: any) => {
      // console.log(res);
      this.allmovies = res.results;
      this.totalResults = res.total_results;

      this.isShowAll = false;
      this.isLatest = true;
      this.isTopRated = false;
      this.isSearch = false;
      this.isTrending = false;
    })
  }
  topRated() {
    this.api.getTopRated(this.page).subscribe((res: any) => {
      this.allmovies = res.results;
      this.totalResults = res.total_results;

      this.isShowAll = false;
      this.isLatest = false;
      this.isTopRated = true;
      this.isSearch = false;
      this.isTrending = false;
    })
  }
  trending() {
    this.api.getTrendingMovies(this.page).subscribe((res: any) => {
      this.allmovies = res.results;
      this.totalResults = res.total_results;

      this.isShowAll = false;
      this.isLatest = false;
      this.isTopRated = false;
      this.isSearch = false;
      this.isTrending = true;
    })
  }

  getColor(vote: number) {
    if (vote < 4) {
      return 'red'
    }
    else if (vote > 4 && vote < 7) {
      return 'orange'
    }
    else {
      return 'green'
    }
  }

  getPage(page: any) {
    this.page = page;
    if (this.isLatest) {
      this.getLatestMovies()
    }
    else if (this.isTopRated) {
      this.topRated();
    }
    else if (this.isTrending) {
      this.trending();
    }
    else if (this.isSearch) {
      let data = { searchDetails: this.searchdata }
      this.search(data);
    }
    else {
      this.showall()
    }
  }

}


