// import { ItemType } from 'cpx-form-factory';
// import { ItemModel } from './dynamic-forms/items/item.model';
// import { InputItemModel } from './dynamic-forms/items/input-item.model';
// import { displayPortal } from './dynamic-forms/decorators/display-portal-for.decorator';
//
// export function Test<T extends ItemModel>( decorator: { type: string } ) {
//   return <TFunction extends ItemType<any>>( cls: TFunction ) => {
//     console.log( 'call Test Decorator' );
//     console.log( cls.prototype instanceof InputItemModel );
//
//     // Using an IIF to prevent setting the name property of the newly returned class.
//     const extendedCls = function () {
//       return class extends cls {
//         constructor( ...args: any[] ) {
//           super( args );
//           this.type = decorator.type;
//           console.log( 'called from overwritten constructor' );
//         }
//       };
//     }();
//     extendedCls[ displayPortal ] = 'test';
//     console.log( extendedCls );
//     return extendedCls;
//   };
// }

