import { Component, Input, Output, EventEmitter, ElementRef, TemplateRef, Renderer, ViewChild } from '@angular/core';

@Component({
  selector: 'list-component',
  template: `<div class="list">
    <h4>Cities</h4>
    <list-sortable-component [data]="data" (dataChange)="onDataChange($event)"></list-sortable-component>
  </div>`,
})
export class ListComponent  {
  @Input('data') data: Array<string>;
  @Output() dataChange = new EventEmitter();
  // @ViewChild('someVar') el:ElementRef;

  onDataChange(data: any) {
    this.dataChange.emit(data);
  }
}

@Component({
    selector: 'list-sortable-component',

    template: `
      <ul class="list-group" dnd-sortable-container [sortableData]="listData">
        <li *ngFor="let item of listData; let i = index" class="list-group-item" dnd-sortable [sortableIndex]="i" (onDragSuccess)="onDragSuccess()">
          {{item.name}}
        </li>
      </ul>`
})
export class ListSortableComponent {
  @Input('data') listData: Array<string>;
  @Output() dataChange = new EventEmitter();

  onDragSuccess() {
    this.dataChange.emit(this.listData);
  }
}
