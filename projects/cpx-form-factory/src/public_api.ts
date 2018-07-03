/*
 * Public API Surface of cpx-rootForm-factory
 */
export { CpxFormFactoryModule } from './lib/cpx-form-factory.module';

// The interface to implement when creating the components for an item
export { ModelPortal }    from './lib/portals/model-portal';
export { TemplatePortal } from './lib/portals/template-portal';
export { ModelOutlet }    from './lib/outlets/model-outlet/model-outlet';

export * from './lib/models/public_api';
export * from './lib/decorators/public_api';

export { FormComponent } from './lib/form/form.component';
export { FormEvent }     from './lib/form/form-event';
export { ModelCategory } from './lib/models/model-category.enum';
export { ControlType }   from './lib/control-type.enum';
