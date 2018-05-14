import {Component, OnInit} from '@angular/core';
import {CinemasService} from '../cinemas.service';
import {ActivatedRoute} from '@angular/router';
import {take} from 'rxjs/operators';
import {CinemaDetails} from '../../../api';

@Component({
  selector: 'app-cinema',
  templateUrl: './cinema.component.html',
  styleUrls: ['./cinema.component.scss']
})
export class CinemaComponent implements OnInit {

  cinema: CinemaDetails;

  readonly schema = [
    {
      name: 'Продолжительность',
      key: 'Runtime'
    },
    {
      name: 'Жанр',
      key: 'Genre'
    },
    {
      name: 'Директор',
      key: 'Director'
    },
    {
      name: 'Режисер',
      key: 'Writer'
    },
    {
      name: 'В ролях',
      key: 'Actors'
    },
    {
      name: 'Анотация',
      key: 'Plot'
    },
    {
      name: 'Язык',
      key: 'Language'
    },
    {
      name: 'Страна',
      key: 'Country'
    },
    {
      name: 'Награды',
      key: 'Awards'
    },
    {
      name: 'Очки',
      key: 'Metascore'
    },
    {
      name: 'imdbRating',
      key: 'imdbRating'
    },
    {
      name: 'Голосов',
      key: 'imdbVotes'
    },
    {
      name: 'Тип',
      key: 'Type'
    },
    {
      name: 'Релиз DVD',
      key: 'DVD'
    },
    {
      name: 'Собрано в прокате',
      key: 'BoxOffice'
    },
    {
      name: 'Компания',
      key: 'Production'
    },
    {
      name: 'Сайт',
      key: 'Website'
    }
  ];

  isShowSpinner: boolean = false;

  constructor(private cinemasService: CinemasService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.isShowSpinner = true;

    this.cinemasService
      .getCinema(id)
      .pipe(
        take(1)
      )
      .subscribe(cinema => this.cinema = cinema, error => {
        alert('Ошибка');
      })
      .add(() => this.isShowSpinner = false);
  }

}
