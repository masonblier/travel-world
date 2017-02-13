import { Component, ChangeDetectorRef } from '@angular/core';

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
  // moduleId: module.id,
  selector: 'my-app',
  templateUrl: './app.component.html',
})
export class AppComponent  {
  name = 'Angular';
  data: Array<any> = citiesList;

  constructor(private cdref: ChangeDetectorRef) { }

  onDataChange(nextData: any) {
    this.data = nextData.map((q: any) => q);
    this.cdref.detectChanges();
  }
}
