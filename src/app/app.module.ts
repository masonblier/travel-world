import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import {DndModule} from 'ng2-dnd';
import {GooglePlaceModule} from 'ng2-google-place-autocomplete';

import { AppComponent }  from './app.component';
import { MapComponent }  from './map.component';
import { CitySearchComponent }  from './city-search.component';
import { ListComponent, ListSortableComponent }  from './list.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule, DndModule.forRoot(), GooglePlaceModule ],
  declarations: [ AppComponent, MapComponent, ListComponent, ListSortableComponent, CitySearchComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
