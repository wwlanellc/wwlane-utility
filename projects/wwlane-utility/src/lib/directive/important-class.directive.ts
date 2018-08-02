import { Directive, ElementRef, Input, OnInit } from '@angular/core';

import { CssClass } from '../style/css/css-class';
import { CssService } from '../style/css/css.service';


@Directive({
	selector: '[wwlImportantClass]',
})
export class ImportantClassDirective implements OnInit {
	@Input() id?: string;
	@Input() wwlImportantClass: string;
	styleNode: HTMLStyleElement;

	constructor(private element: ElementRef, private cssService: CssService) {
		this.styleNode = null;
	}

	ngOnInit() {
		this.id = this.cssService.ensureElementHasId(this.element, this.id);

		const importantClassNames: string[] = this.cssService.parseCssClassList(this.wwlImportantClass);

		const cssClasses: CssClass[] = this.cssService.findCssClasses(importantClassNames);

		this.cssService.replaceCssClassNamesWithId(cssClasses, importantClassNames, this.id);

		// TODO: Make this useful by re-applying style overrides on DOM changes
		if (this.styleNode !== null) {
			this.cssService.destroyNode(this.styleNode);

			this.styleNode = null;
		}

		this.styleNode = this.cssService.makeCssClassesImportant(cssClasses, this.element);
	}
}
