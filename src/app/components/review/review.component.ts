import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  movieDetails: any;
  img: any;
  backgroundImage: any;
  posterImage:any;


  constructor(private route: ActivatedRoute, private api: ApiService) { }

  ngOnInit(): void {
    this.img = this.api.imgURL;
    const para: any = this.route.snapshot.params;
    // console.log(para.id);
    this.api.getMovieDetails(para.id).subscribe((data: any) => {
      console.log(data);
      this.movieDetails = data;
      this.backgroundImage=this.img+this.movieDetails.backdrop_path;
      this.posterImage = this.img+this.movieDetails.poster_path;
    })

  }

}
