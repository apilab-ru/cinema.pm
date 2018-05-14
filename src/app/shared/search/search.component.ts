import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {CinemasService} from '../cinemas.service';
import {Cinema} from '../../../api';
import {FormControl} from '@angular/forms';
import {debounceTime, distinctUntilChanged, mergeMap, tap} from 'rxjs/operators';
import {ProfileService} from '../profile.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  stateCtrl: FormControl;

  filteredList: Observable<Cinema[]>;

  isShowLoader: boolean = false;

  private readonly debounceTime = 100;

  constructor(
    private cinemasService: CinemasService,
    private profileService: ProfileService
  ) {
    this.stateCtrl = new FormControl();
  }

  ngOnInit() {
    this.filteredList = this.stateCtrl.valueChanges
      .pipe(
        tap(() => this.isShowLoader = true),
        distinctUntilChanged(),
        debounceTime(this.debounceTime),
        mergeMap(value => this.searchByString(value)),
        tap(() => this.isShowLoader = false)
      );
  }

  searchByString(search: string): Observable<Cinema[]> {
    return this.cinemasService.getList(search);
  }

  checkImage(image: string): boolean {
    return image !== 'N/A';
  }

  selectCinema(cinema): void {
    this.stateCtrl.reset();
    this.profileService.addCinema(cinema);
  }

}
