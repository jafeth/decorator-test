/*
 * Public API Surface of cpx-rootForm-factory
 */
export { CpxFormFactoryModule, ValidatorContainers } from './lib/cpx-form-factory.module';

export { ModelPortal } from './lib/portals/model-portal';
export { FormPortal }  from './lib/portals/form-portal';
export { ModelOutlet } from './lib/outlets/model-outlet/model-outlet';

export * from './lib/models/public_api';
export * from './lib/decorators/public_api';

export { FormComponent }   from './lib/form/form.component';
export { ActionEvent }     from './lib/actions/action-event';
export { ModelCategory }   from './lib/models/model-category.enum';
export { ControlType }     from './lib/control-type.enum';
export { ActionService }   from './lib/actions/action.service';
