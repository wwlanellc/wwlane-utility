import { Directive, Input, TemplateRef, ViewContainerRef, ComponentRef, IterableDiffer, IterableDiffers, DoCheck, Type, ComponentFactoryResolver, ComponentFactory } from '@angular/core';
import { Observable, Observer, forkJoin } from 'rxjs';

import { ArrayService } from 'wwlane-core-utility';
import { LoadingDefaultComponent } from '../element/loading-default/loading-default.component';
import { CssService } from '../style/css/css.service';

@Directive({
	selector: '[wwlLoadingIf]'
})
export class LoadingIfDirective implements DoCheck {
	private loadingIf: boolean | Observable<any> | Observable<any>[] | Promise<any> | Promise<any>[];
	private loadingIfDirty: boolean;
	private componentFactory: ComponentFactory<any>;
	private iterableDiffer: IterableDiffer<any>;
	private observer: Observer<any>;
	private centerLoadingElement: boolean;

	@Input() set wwlLoadingIf(loadingIf: boolean | Observable<any> | Observable<any>[] | Promise<any> | Promise<any>[]) {
		this.loadingIf = loadingIf;
		this.loadingIfDirty = true;
	}

	@Input() set wwlLoadingIfCenter(center: boolean) {
		this.centerLoadingElement = center;
	}

	constructor(private templateRef: TemplateRef<any>, private viewContainerRef: ViewContainerRef, private componentFactoryResolver: ComponentFactoryResolver, private iterableDiffers: IterableDiffers, private arrayService: ArrayService, private cssService: CssService) {
		this.loadingIfDirty = true;
		this.centerLoadingElement = true;

		this.componentFactory = componentFactoryResolver.resolveComponentFactory(LoadingDefaultComponent);

		this.observer = {
			next: function(x) {},
			error: err => console.error('wwlLoadingIf observer got an error: ' + err),
			complete: () => this.disableLoading(),
		};

	}

	ngDoCheck() {
		if (this.loadingIfDirty) {
			this.loadingIfDirty = false;

			// React on wwlLoadingIf changes only once all inputs have been initialized
			const value = this.loadingIf;

			if (Array.isArray(value)) {
				if (!this.iterableDiffer) {
					try {
						this.iterableDiffer = this.iterableDiffers.find(value).create(null);
					} catch (e) {
						throw new Error(`Cannot find a differ supporting object '${value}'.`);
					}
				}
			} else {
				this.handleLoadingIf();
			}
		}

		if (this.iterableDiffer && Array.isArray(this.loadingIf)) {
			const changes = this.iterableDiffer.diff(this.loadingIf);
			if (changes) {
				this.handleLoadingIf();
			}
		}
	}

	handleLoadingIf() {
		if (this.loadingIf !== false) {
			if (this.loadingIf instanceof Observable) {
				this.loadingIf.subscribe(this.observer);
			} else if (this.loadingIf instanceof Promise) {
				this.loadingIf.then(result => this.disableLoading());
			} else if (this.loadingIf instanceof Array && this.arrayService.instancesOf(this.loadingIf, Observable)) {
				forkJoin(this.loadingIf).subscribe(this.observer);
			} else if (this.loadingIf instanceof Array && this.arrayService.instancesOf(this.loadingIf, Promise)) {
				Promise.all(this.loadingIf).then(result => this.disableLoading());
			}

			this.enableLoading();
		} else {
			this.disableLoading();
		}

		console.log('this.centerLoadingElement: ', this.centerLoadingElement);
	}

	enableLoading(): void {
		this.viewContainerRef.clear();

		const componentRef: ComponentRef<any> = this.viewContainerRef.createComponent(this.componentFactory);

		if (this.centerLoadingElement) {
			this.cssService.addCssClasses(componentRef.location, ['wwlLoadingIfCenter']);
		}
	}

	disableLoading(): void {
		this.viewContainerRef.clear();

		this.viewContainerRef.createEmbeddedView(this.templateRef);
	}
}
