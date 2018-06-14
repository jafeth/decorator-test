import { Component, OnInit } from '@angular/core';
import { ItemManagerService } from './dynamic-forms/item-manager.service';
import { ItemModel } from './dynamic-forms/items/item.model';

@Component( {
  selector   : 'app-root',
  templateUrl: './app.component.html',
  styleUrls  : [ './app.component.css' ]
} )
export class AppComponent implements OnInit {
  title = 'app';
  item: ItemModel;

  constructor( private itemManager: ItemManagerService) {

  }

  public ngOnInit(): void {
    this.item = this.itemManager.fromConfig({
      type : 'woei',
      key  : 'bla',
      order: 1
    });
  }

}
