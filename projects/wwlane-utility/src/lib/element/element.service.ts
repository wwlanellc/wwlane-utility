import { Injectable, RendererFactory2, Renderer2, Inject, ElementRef } from '@angular/core';

import { ENVIRONMENT_CODE_HANDLE, ENVIRONMENT_CODE_HANDLE_LOCAL } from './../config/config';

/**
 * Service for manipulating DOM Elements
 *
 * @export
 */
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
	 * Combined with [nextId]{@link ElementService#nextId} variable to ensure any new ids assigned to elements are unique
	 *
	 * @constant
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
	 * Creates an instance of {@link ElementService} and instantiates the [renderer]{@link ElementService#renderer}.
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
	 * Seems hackish and very unintuitive to have to provide the current id when the element
	 * is provided but otherwise unsure of how to check the id without accessing the
	 * nativeElement which is strongly advised against.
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
	 * Destroy a DOM node.
	 *
	 * @memberof ElementService
	 */
	destroyElement(element: ElementRef) {
		this.renderer.removeChild(this.renderer.parentNode(element.nativeElement), element.nativeElement);
	}
}
