import {Component, OnInit} from '@angular/core';
import {ProfileService} from '../profile.service';
import {Cinema} from '../../../api';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {

  constructor(iconRegistry: MatIconRegistry,
              sanitizer: DomSanitizer,
              private profileService: ProfileService) {
    iconRegistry.addSvgIcon(
      'delete',
      sanitizer.bypassSecurityTrustResourceUrl('assets/delete.svg'));
  }

  get list(): Cinema[] {
    return this.profileService.cinemas;
  }

  getPlaceholder(cinema: Cinema): string {
    return cinema.Title.substr(0, 1);
  }

  deleteItem(item: Cinema): void {
    this.profileService.deleteCinema(item.imdbID);
  }

}
