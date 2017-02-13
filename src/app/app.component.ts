import { Component } from '@angular/core';

var citiesList = [
  {
    name: 'New York',
    coordinates: [-74.0059, 40.7128],
  },
  {
    name: 'London',
    coordinates: [-0.1278, 51.5074],
  },
  {
    name: 'Rome',
    coordinates: [12.4964, 41.9028],
  },
  {
    name: 'Hong Kong',
    coordinates: [114.1095, 22.3964],
  },
  {
    name: 'Tokyo',
    coordinates: [139.6917, 35.6895],
  },
]

@Component({
  selector: 'my-app',
  template: `<div>
    <map-component [data]="data"></map-component>
    <list-component [data]="data" (dataChange)="onDataChange($event)"></list-component>
  </div>`,
})
export class AppComponent  {
  name = 'Angular';
  data: Array<any> = citiesList;

  onDataChange(nextData: any) {
    this.data = nextData.map((q: any) => q);
  }
}
