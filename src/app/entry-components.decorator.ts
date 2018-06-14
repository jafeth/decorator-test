export function EntryComponents(): ClassDecorator {
  return function ( cls: any ) {
    console.log( 'call EntryComponents ' );
    if (cls.hasOwnProperty('__annotations__')) {
      console.log(cls.__annotations__);
    }

  };
}
