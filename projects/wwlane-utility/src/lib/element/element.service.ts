import { Injectable, RendererFactory2, Renderer2, Inject, ElementRef } from '@angular/core';

import { ENVIRONMENT_CODE_HANDLE, ENVIRONMENT_CODE_HANDLE_LOCAL } from './../config/config';

@Injectable({
	providedIn: 'root'
})
export class ElementService {
	/**
	 * A counter to ensure any new ids assigned to elements are unique
	 *
	 * @memberof ElementService
	 */
	private nextId: number;

	/**
	 * Combined with nextId variable to ensure any new ids assigned to elements are unique
	 *
	 * @memberof ElementService
	 */
	private ID_PREFIX = 'wwlElement_';

	/**
	 * The renderer used to make DOM changes
	 *
	 * @memberof ElementService
	 */
	private renderer: Renderer2;

	/**
	 * Creates an instance of ElementService and instantiates the renderer.
	 *
	 * @memberof ElementService
	 */
	constructor(@Inject(ENVIRONMENT_CODE_HANDLE) environmentCodeHandle: string, rendererFactory: RendererFactory2) {
		// Set next id to a random number for local testing so multiple app modules don't use the same ids
		if (environmentCodeHandle === ENVIRONMENT_CODE_HANDLE_LOCAL) {
			this.nextId = Math.floor(Math.random() * 10000000);
		} else {
			this.nextId = 0;
		}

		this.renderer = rendererFactory.createRenderer(null, null);
	}

	/**
	 * Gives the provided element an id if it doesn't currently have one.
	 * Seems hackish and very unintuitive to have to provide the current id when the element is provided
	 * but otherwise unsure of how to check the id without accessing the nativeElement which is not platform independent.
	 *
	 * @memberof ElementService
	 */
	ensureElementHasId(element: ElementRef, currentId: string): string {
		if (currentId === undefined) {
			currentId = this.ID_PREFIX + this.nextId++;
			this.renderer.setAttribute(element.nativeElement, 'id', currentId);
		}

		return currentId;
	}

	/**
	 * Destroy a DOM node. Could use element.nativeElement.parent for parent but accessing
	 * nativeElement properties is strongly advised against.
	 *
	 * @memberof ElementService
	 */
	destroyElement(element: ElementRef, parentElement: ElementRef) {
		this.renderer.removeChild(parentElement.nativeElement, element.nativeElement);
	}

}
