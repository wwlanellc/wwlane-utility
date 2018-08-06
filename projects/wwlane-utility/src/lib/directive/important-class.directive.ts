import { Directive, ElementRef, Input, OnInit, OnChanges } from '@angular/core';

import { ElementService } from '../element/element.service';
import { CssService } from '../style/css/css.service';
import { CssClass } from '../style/css/css-class';


@Directive({
	selector: '[wwlImportantClass]',
})
export class ImportantClassDirective implements OnChanges {
	@Input() id?: string;
	@Input() wwlImportantClass: string | string[];
	styleNode: HTMLStyleElement;
	classList: string;

	constructor(private element: ElementRef, private elementService: ElementService, private cssService: CssService) {
		this.styleNode = null;
	}

	ngOnChanges() {
		this.id = this.elementService.ensureElementHasId(this.element, this.id);
		const newClassList = Array.isArray(this.wwlImportantClass) ? this.wwlImportantClass.join(' ') : this.wwlImportantClass;

		if (newClassList !== this.classList) {
			this.classList = newClassList;

			this.refreshStyles();
		}
	}

	refreshStyles(): void {
		const importantClassNames: string[] = this.cssService.parseCssClassList(this.classList);

		const cssClasses: CssClass[] = this.cssService.findCssClasses(importantClassNames);

		this.cssService.replaceCssClassNamesWithId(cssClasses, importantClassNames, this.id);

		if (this.styleNode !== null) {
			this.elementService.destroyElement(new ElementRef(this.styleNode), this.element);

			this.styleNode = null;
		}

		this.styleNode = this.cssService.makeCssClassesImportant(cssClasses, this.element);
	}
}
