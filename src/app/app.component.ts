import { Component, OnInit } from '@angular/core';

@Component( {
  selector   : 'app-root',
  templateUrl: './app.component.html',
  styleUrls  : [ './app.component.css' ]
} )
export class AppComponent implements OnInit {
  title = 'app';
  config: object;

  btnAction = 'next';

  constructor() {
    this.config = {
      type : 'woei',
      key  : 'group',
      order: 0,
      items: [
        {
          type        : 'bla',
          order       : 2,
          label       : 'First Element',
          myValidators: [ { validator: 'required' }, { validator: 'min', parameters: { min: 1 } } ],
          key         : 'first'
        },
        {
          type : 'bla',
          order: 1,
          label: 'Second Element',
          key  : 'second'
        },
        {
          type        : 'bla',
          order       : 0,
          label       : 'Third Element',
          myValidators: [ { validator: 'required' } ],
          key         : 'third'
        }

      ]
    };
  }

  public ngOnInit(): void {
  }

  public onReaction( event: any ): void {
    console.log( 'OnReaction in the appComponent' );
    console.log( event );
  }

  public onNext( event: any ) {
    switch ( this.btnAction ) {
      case 'next':
        this.btnAction = 'previous';
        break;
      case 'previous':
        this.btnAction = 'next';
        break;
    }

    console.log( 'OnNext clicked' );
    console.log( event );
  }

}
