import { Component, Input, Output, EventEmitter, ElementRef, TemplateRef, Renderer, ViewChild } from '@angular/core';

@Component({
  selector: 'list-component',
  template: `<div class="list">
    <h4>Cities</h4>
    <div class="list-search">
      <input type="text" [value]="searchValue"
         [options]="{types: ['(cities)']}"
         (city)= 'setTmpCity($event)'
         (lat)= 'setTmpLat($event)'
         (lng)= 'setTmpLng($event)'
         id="mapsAutocomplete"
         ng2-google-place-autocomplete/>
    </div>
    <list-sortable-component [data]="data" (dataChange)="onDataChange($event)"></list-sortable-component>
  </div>`,
})
export class ListComponent  {
  @Input('data') data: Array<any>;
  @Output() dataChange = new EventEmitter();
  // @ViewChild('someVar') el:ElementRef;
  tmpCity: any = null;
  searchValue: string = "";

  onDataChange(data: any) {
    this.dataChange.emit(data);
  }

  setTmpLat(lat: any) {
    if (!this.tmpCity) this.tmpCity = {};
    this.tmpCity.lat = lat;
    this.tryAddCity();
  }
  setTmpLng(lng: any) {
    if (!this.tmpCity) this.tmpCity = {};
    this.tmpCity.lng = lng;
    this.tryAddCity();
  }
  setTmpCity(city: any) {
    if (!this.tmpCity) this.tmpCity = {};
    this.tmpCity.name = city;
    this.tryAddCity();
  }

  setAddress(value: any) {
    console.log('setAddress', value)
  }
  tryAddCity() {
    if (this.tmpCity.lat && this.tmpCity.lng && this.tmpCity.name) {
      this.addCity(this.tmpCity);
      this.tmpCity = null;
    }
  }
  addCity(city: any) {
    const newData = this.data.concat([{
      name: city.name,
      coordinates: [city.lng, city.lat],
    }]);
    this.dataChange.emit(newData);
    this.searchValue = "";
    document.getElementById('mapsAutocomplete').setAttribute("value", "");
  }
}

@Component({
    selector: 'list-sortable-component',

    template: `
      <ul class="list-group" dnd-sortable-container [sortableData]="listData">
        <li *ngFor="let item of listData; let i = index" class="list-group-item" dnd-sortable [sortableIndex]="i" (onDragSuccess)="onDragSuccess()">
          <div class="list-grip-wrap"><i class='list-grip'></i></div> {{item.name}}
          <i class='list-close' (click)="onRemove(i)">x</i>
        </li>
      </ul>`
})
export class ListSortableComponent {
  @Input('data') listData: Array<string>;
  @Output() dataChange = new EventEmitter();

  onDragSuccess() {
    this.dataChange.emit(this.listData);
  }

  onRemove(idx: number) {
    this.listData = this.listData.filter((v, i) => idx !== i);
    this.dataChange.emit(this.listData);
  }
}
