import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  API_key = "dbf6edab967cb9926edec0d9e0e2d46a";
  baseURL = "https://api.themoviedb.org/3/";
  imgURL = "https://image.tmdb.org/t/p/w500/";

  constructor(private http: HttpClient) { }

  getAllMovies(pageNo:number): Observable<any> {
    return this.http.get(`https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=dbf6edab967cb9926edec0d9e0e2d46a&page=${pageNo}`);
  }

  getSearchedMovies(data: any, pageNo:number): Observable<any> {
    return this.http.get(`https://api.themoviedb.org/3/search/movie?api_key=dbf6edab967cb9926edec0d9e0e2d46a&query=${data.searchDetails}&page=${pageNo}`);
  }
  getLatest(pageNo:any): Observable<any> {
    return this.http.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=dbf6edab967cb9926edec0d9e0e2d46a&page=${pageNo}`);
  }
  getTopRated(pageNo:any): Observable<any> {
    return this.http.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=dbf6edab967cb9926edec0d9e0e2d46a&page=${pageNo}`);
  }
  getTrendingMovies(pageNo:any): Observable<any> {
    return this.http.get(`https://api.themoviedb.org/3/trending/movie/week?api_key=dbf6edab967cb9926edec0d9e0e2d46a&page=${pageNo}`);
  }
  getMovieDetails(movieId: number):Observable<any> {
    return this.http.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=dbf6edab967cb9926edec0d9e0e2d46a`)
  }

}
