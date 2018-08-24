import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[appLet]'
})
export class LetDirective {
    context = { appLet: null };

    constructor(viewContainer: ViewContainerRef,
                templateRef: TemplateRef<any>) {
        viewContainer.createEmbeddedView(templateRef, this.context);
    }

    @Input()
    set appLet(value: any) {
        this.context.appLet = value;
    }
}
