import { Component, Input, Output, EventEmitter, ElementRef, TemplateRef, Renderer, ViewChild } from '@angular/core';

@Component({
  selector: 'city-search',
  template: `<input #searchInput type="text"/>`,
})
export class CitySearchComponent  {
  @Output() onChange = new EventEmitter();
  @ViewChild('searchInput') searchInput:ElementRef;

  onDataChange(data: any) {
    this.onChange.emit(data);
  }

  addCity(city: any) {
    console.log('city', city)
  }
}
