import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Cinema, CinemaDetails, CinemaDetailsResult, SearchResult} from '../../api';
import {Observable} from 'rxjs/Observable';
import {map, take} from 'rxjs/operators';

const endpoint = 'http://www.omdbapi.com/?apikey=ee181d5f&';

@Injectable()
export class CinemasService {

  constructor(private http: HttpClient) {
  }

  getList(search: string): Observable<Cinema[]> {
    return this.search(search);
  }

  search(search: string): Observable<Cinema[]> {
    return this.http.get<SearchResult>(endpoint + 's=' + search)
      .pipe(
        take(1),
        map(result => {

          if (!result.Search) {
            return null;
          }

          return result.Search.map(item => {
            item.Poster = (item.Poster === 'N/A') ? null : item.Poster;
            return item;
          });
        })
      );
  }

  getCinema(id: string): Observable<CinemaDetails> {
    return this.http.get<CinemaDetailsResult>(endpoint + 'i=' + id)
      .pipe(
        map(result => {
          if (result.Response === 'True') {
            for (const key of Object.keys(result)) {
              if (result[key] === 'N/A') {
                result[key] = null;
              }
            }
            return result;
          } else {
            throw new Error(result.Error);
          }
        })
      );
  }

}
