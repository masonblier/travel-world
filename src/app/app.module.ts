import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {DndModule} from 'ng2-dnd';

import { AppComponent }  from './app.component';
import { MapComponent }  from './map.component';
import { ListComponent, ListSortableComponent }  from './list.component';

@NgModule({
  imports:      [ BrowserModule, DndModule.forRoot() ],
  declarations: [ AppComponent, MapComponent, ListComponent, ListSortableComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
