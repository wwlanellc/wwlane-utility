import { Injectable, ElementRef, Renderer2, RendererFactory2 } from '@angular/core';

import { CssClass } from './css-class';

/**
 * Service which contains functions related to Cascading Style Sheets
 *
 * @export
 * @class CssService
 */
@Injectable()
export class CssService {
	/**
	 * A counter to ensure any new ids assigned to elements are unique
	 *
	 * @private
	 * @type {number}
	 * @memberof CssService
	 */
	private nextId: number = Math.floor(Math.random() * 10000000);

	/**
	 * Combined with nextId variable
	 *
	 * @private
	 * @type {string}
	 * @memberof CssService
	 */
	private ID_PREFIX = 'wwlUtilCss_';

	/**
	 * Replacement string used to do replacements in Regular Expressions. Used instead of loading an sprintf or similar library
	 *
	 * @private
	 * @type {string}
	 * @memberof CssService
	 */
	private CSS_CLASS_MATCH_REPLACEABLE = '--1--';

	/**
	 * Regular expression to find css selectors that match an inserted pattern.
	 * Inserted pattern is usually a list of class names separated by vertical bars (OR'd together)
	 *
	 * @private
	 * @type {string}
	 * @memberof CssService
	 */
	private CSS_CLASS_MATCH: string = '[^,]*\\.(?:' + this.CSS_CLASS_MATCH_REPLACEABLE + ')(?:$|,|(?:\\s|\\.|>|\\[)[^,]*(?:$|,))';

	/**
	 * Regular expression to match the class name part of a css selector.
	 * Contains the character after the class name as the first match group.
	 *
	 * @private
	 * @type {string}
	 * @memberof CssService
	 */
	private CSS_SELECTOR_CLASS_REPLACEMENT: string = '\.(?:' + this.CSS_CLASS_MATCH_REPLACEABLE + ')($|\\s|[.>]|\\[[^\\]]*\\])';

	/**
	 *	Regular expression to match whitespace and commas at the beginning and end of a string
	 *
	 * @private
	 * @type {RegExp}
	 * @memberof CssService
	 */
	private OUTER_COMMAS_AND_WHITESPACE: RegExp = /^[,\s\r\n]|[,\s\r\n]$/g;

	/**
	 * The renderer used to make DOM changes
	 *
	 * @private
	 * @type {Renderer2}
	 * @memberof CssService
	 */
	private renderer: Renderer2;

	/**
	 * Creates an instance of CssService and instantiates the renderer.
	 *
	 * @param {RendererFactory2} rendererFactory
	 * @memberof CssService
	 */
	constructor(rendererFactory: RendererFactory2) {
		this.renderer = rendererFactory.createRenderer(null, null);
	}

	/**
	 * Gives the provided element an id if it doesn't currently have one.
	 * Seems hackish and very unintuitive to have to provide the current id when the element is provided
	 * but otherwise unsure how to check the id without accessing the nativeElement which is frowned upon
	 *
	 * @param {ElementRef} element
	 * @param {string} currentId
	 * @returns {string}
	 * @memberof CssService
	 */
	ensureElementHasId(element: ElementRef, currentId: string): string {
		if (currentId === undefined) {
			currentId = this.ID_PREFIX + this.nextId++;
			this.renderer.setAttribute(element.nativeElement, 'id', currentId);
		}

		return currentId;
	}

	/**
	 * Add CSS classes to an element
	 *
	 * @param {ElementRef} element
	 * @param {string[]} cssClassNames
	 * @memberof CssService
	 */
	addCssClasses(element: ElementRef, cssClassNames: string[]): void {
		cssClassNames.map(className => this.renderer.addClass(element.nativeElement, className));
	}

	/**
	 * Turn a list of class names into an array of class names
	 *
	 * @param {string} cssClassNameList
	 * @returns {string[]}
	 * @memberof CssService
	 */
	parseCssClassList(cssClassNameList: string): string[] {
		return cssClassNameList.split(' ');
	}

	/**
	 * Turn a text version of a css class into an object
	 *
	 * @param {string} cssClassText
	 * @returns {Object}
	 * @memberof CssService
	 */
	parseCssClassProperties(cssClassText: string): Object {
		const response: Object = {};

		cssClassText.substring(cssClassText.indexOf('{') + 1, cssClassText.lastIndexOf('}'))
			.split(';').forEach(property => {
				if (property.trim() !== '') {
					const propertyParts = property.split(':');

					if (propertyParts.length !== 2) {
						console.error('bad property: ' + property + ' in ' + cssClassText);
					} else {
						response[propertyParts[0].trim()] = propertyParts[1].trim();
					}
				}
			})
		;

		return response;
	}

	/**
	 * Convert a CSSStyleRule object into a CssClass object
	 *
	 * @param {CSSStyleRule} cssStyleRule
	 * @param {string[]} cssClassNames
	 * @returns {CssClass}
	 * @memberof CssService
	 */
	parseCssStyleRule(cssStyleRule: CSSStyleRule, cssClassNames: string[]): CssClass {
		let response: CssClass = null;

		const selectors =
			cssStyleRule.selectorText.match(
				this.CSS_CLASS_MATCH.replace(
					this.CSS_CLASS_MATCH_REPLACEABLE,
					cssClassNames.join('|')
				)
			)
		;

		if (selectors !== null) {
			const selectorsLength: number = selectors.length;

			for (let y = 0; y < selectorsLength; y++) {
				// Remove whitespace and commas from front and back
				selectors[y] = selectors[y].replace(this.OUTER_COMMAS_AND_WHITESPACE, '');
			}

			let cssClass: string;

			if (cssStyleRule.cssText) {
				cssClass = cssStyleRule.cssText;
			} else {
				cssClass = cssStyleRule.style.cssText;
			}

			response = new CssClass(selectors, this.parseCssClassProperties(cssClass));
		}

		return response;
	}

	/**
	 * Find all style definitions currently in the document for the provided class names
	 * excluding style elements that were created by this service.
	 *
	 * @param {string[]} cssClassNames
	 * @returns {CssClass[]}
	 * @memberof CssService
	 */
	findCssClasses(cssClassNames: string[]): CssClass[] {
		const response: CssClass[] = [];

		// TODO: remove window.document reference as I don't believe it works on all platforms
		const styleSheets = window.document.styleSheets;
		const styleSheetsLength: number = styleSheets.length;

		for (let i = 0; i < styleSheetsLength; i++) {
			const cssStyleSheet = styleSheets[i];

			// TODO: is accessing a stylesheet id platform independent? Looks like maybe it's deprecated?
			if (!(cssStyleSheet instanceof CSSStyleSheet) || (cssStyleSheet.id !== undefined && cssStyleSheet.id.indexOf(this.ID_PREFIX) !== -1)) {
				continue;
			}

			const classes = cssStyleSheet.rules || cssStyleSheet.cssRules;

			if (!classes) {
				continue;
			}

			const classesLength: number = classes.length;

			for (let x = 0; x < classesLength; x++) {
				const cssRule = classes[x];

				if (cssRule instanceof CSSStyleRule) {
					const cssClass = this.parseCssStyleRule(cssRule, cssClassNames);

					if (cssClass !== null) {
						response.push(cssClass);
					}
				} else if (cssRule instanceof CSSMediaRule) {
					const cssRulesLength: number = cssRule.cssRules.length;

					for (let y = 0; y < cssRulesLength; y++) {
						const cssMediaRule = cssRule.cssRules[y];

						if (cssMediaRule instanceof CSSStyleRule) {
							const cssClass = this.parseCssStyleRule(cssMediaRule, cssClassNames);

							if (cssClass !== null) {
								cssClass.mediaQueryCondition = cssRule.conditionText.trim();

								response.push(cssClass);
							}
						}

					}
				}
			}
		}

		return response;
	}

	/**
	 * Swap class names with an element's id for higher priority styles
	 * This also allows for calling the makeCssClassesImportant and only impacting the element with the provided id.
	 *
	 * @param {CssClass[]} cssClasses
	 * @param {string[]} cssClassNames
	 * @param {string} id
	 * @memberof CssService
	 */
	replaceCssClassNamesWithId(cssClasses: CssClass[], cssClassNames: string[], id: string) {
		if (!id.startsWith('#')) {
			id = '#' + id;
		}

		const cssClassesLength: number = cssClasses.length;

		for (let x = 0; x < cssClassesLength; x++) {
			const selectorsLength: number = cssClasses[x].selectors.length;

			for (let y = 0; y < selectorsLength; y++) {
				cssClasses[x].selectors[y] =
					cssClasses[x].selectors[y].replace(
						new RegExp(
							this.CSS_SELECTOR_CLASS_REPLACEMENT.replace(
								this.CSS_CLASS_MATCH_REPLACEABLE,
								cssClassNames.join('|')
							),
							'g'
						),
						function(match, p1) { return id + p1; }
					)
				;
			}
		}
	}

	/**
	 * Make a new style element with the provided classes and make all properties of those classes have the !important tag.
	 * Append the new style element to the provided element and return it.
	 *
	 * @param {CssClass[]} cssClasses
	 * @param {ElementRef} appendToElement
	 * @returns {HTMLStyleElement}
	 * @memberof CssService
	 */
	makeCssClassesImportant(cssClasses: CssClass[], appendToElement: ElementRef): HTMLStyleElement {
		let styleText = '\n';

		cssClasses.forEach(cssClass => {
			let indent = '';

			if (cssClass.mediaQueryCondition !== null) {
				styleText += indent + '@media ' + cssClass.mediaQueryCondition + ' {\n';

				indent += '\t';
			}

			styleText += indent + cssClass.selectors.join(',\n' + indent) + ' {\n';

			indent += '\t';

			Object.keys(cssClass.properties).forEach(key =>
				styleText += indent + key + ': ' + cssClass.properties[key]
					+ (cssClass.properties[key].indexOf('!important') === -1 ? ' !important' : '') + ';\n'
			);

			indent = indent.substring(1);

			styleText += indent + '}\n';

			if (cssClass.mediaQueryCondition !== null) {
				indent = indent.substring(1);

				styleText += indent + '}\n';
			}
		});

		const styleNode: HTMLStyleElement = this.renderer.createElement('style');

		this.renderer.setAttribute(styleNode, 'id', this.ID_PREFIX + this.nextId++);

		this.renderer.setAttribute(styleNode, 'type', 'text/css');

		this.renderer.appendChild(styleNode, this.renderer.createText(styleText));

		this.renderer.appendChild(appendToElement.nativeElement, styleNode);

		return styleNode;
	}

	/**
	 * Destroy a DOM node
	 * TODO: move this function somewhere else, it doesn't belong in this service
	 *
	 * @param {*} node
	 * @memberof CssService
	 */
	destroyNode(node: any) {
		this.renderer.destroyNode(node);
	}
}
