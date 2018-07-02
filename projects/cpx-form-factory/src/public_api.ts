/*
 * Public API Surface of cpx-form-factory
 */
export { CpxFormFactoryModule } from './lib/cpx-form-factory.module';

// The base classes to extend to create an item
export { ItemModel }      from './lib/models/item.model';
export { ModelBase }      from './lib/models/model-base';

// The interface to implement when creating the components for an item
export { ItemPortal }  from './lib/portals/item.portal';
export { ModelOutlet } from './lib/outlets/model-outlet';

export { ManageModelAs }                         from './lib/decorators/manage-model-as.decorator';
export { FormKey }                               from './lib/decorators/form-key.decorator';
export { ManageValidator, ValidatorContainers }  from './lib/decorators/manage-validator.decorator';
export { PresentationPortalFor }                 from './lib/decorators/presentation-portal-for.decorator';
export { ValidatorCollection }                   from './lib/decorators/validator-collection.decorator';
export { ModelCollection }                       from './lib/decorators/model-collection.decorator';
export { ModelManagerService }                   from './lib/models/model-manager.service';
export { ModelCategory }                         from './lib/models/model-category.enum';
export { ValidatorManagerService }               from './lib/controls/validator-manager.service';
export { ControlManagerService }                 from './lib/controls/control-manager.service';
export { ControlType }                           from './lib/controls/control-type.enum';
