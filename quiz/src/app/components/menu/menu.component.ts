import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  selected: number = 0;
  @Output() selection = new EventEmitter<number>();

  onSelection(index: number) {
    this.selected = index
    this.selection.emit(index)
  }
}
