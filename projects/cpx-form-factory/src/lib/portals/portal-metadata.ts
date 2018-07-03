const $$portalMetadata = Symbol( 'portal metadata' );

export class PortalMetadata {
  handlers = new Map<string, string>();

  static fromClass( cls: object ): PortalMetadata {
    return PortalMetadata.fromConstructor( cls.constructor );
  }

  static fromConstructor( constructor: Function ): PortalMetadata {
    if ( !constructor.hasOwnProperty( $$portalMetadata ) ) {
      Reflect.defineProperty( constructor, $$portalMetadata, { value: new PortalMetadata() } );
    }
    return constructor[ $$portalMetadata ];
  }

  static fromInstance( instance: object ): PortalMetadata {
    return PortalMetadata.fromClass( Object.getPrototypeOf( instance ) );
  }
}
