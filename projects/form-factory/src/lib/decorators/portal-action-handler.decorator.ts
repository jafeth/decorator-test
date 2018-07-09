import { PortalMetadata } from '../portals/portal-metadata';

export function PortalActionHandler( action?: string ): MethodDecorator {
  return function ( proto: object, propertyKey: string, descriptor: PropertyDescriptor ) {
    const { handlers } = PortalMetadata.fromClass( proto );
    const actionName = action || propertyKey;
    if ( !/^[\w]+$/.test( actionName ) ) {
      throw new TypeError( `${actionName} contains invalid characters` );
    }
    if ( handlers.has( actionName ) ) {
      throw new Error( `Action: ${actionName} is already declared` );
    }
    handlers.set( actionName, propertyKey );
  };
}
