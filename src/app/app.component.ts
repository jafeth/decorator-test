import { Component, OnInit } from '@angular/core';

import { ItemModel, ModelCategory, ModelManagerService } from 'cpx-form-factory';
import { interval }                                      from 'rxjs';
import { take }                                          from 'rxjs/operators';

@Component( {
  selector   : 'app-root',
  templateUrl: './app.component.html',
  styleUrls  : [ './app.component.css' ]
} )
export class AppComponent implements OnInit {
  title = 'app';
  item: ItemModel;

  private interval = interval( 1500 )
    .pipe( take( 5 ) );

  constructor( private modelManager: ModelManagerService ) {

  }

  public ngOnInit(): void {
    this.interval.subscribe( i => {
      this.item = this.modelManager.parseConfig( ModelCategory.Element, {
        type : 'woei',
        key  : 'bla',
        order: i
      } ) as ItemModel;

      console.log( this.item );
    } );
  }

}
