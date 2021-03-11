import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LocalizationService } from 'src/app/services/localization.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})

export class SearchBarComponent {
  @Output() filterLocalizationEvent = new EventEmitter<any>();
  localizationControl = new FormControl();
  filteredLocalizations: any[] = [];

  constructor(private localizationService: LocalizationService) { }

  handleSearch(): void {
    this.localizationService.getLocalizations(this.localizationControl.value).subscribe(response => {
      this.filteredLocalizations = response;
    })
  }

  getSelected(loc: any): void {
    this.filterLocalizationEvent.emit(loc);
  }

  displayFn(loc: any): string {
    if (loc)
      return loc.display_name;
    else
      return '';
  }
}
