/**
 * Object for representing a Cascading Style Sheet class
 *
 * @export
 */
export class CssClass {
	public selectors: string[];
	public properties: Object;
	public mediaQueryCondition: string;
/**
 * Creates an instance of {@link CssClass}.
 *
 * @memberof CssClass
 */
constructor(selectors?: string[], properties?: Object, mediaQueryCondition?: string) {
		if (selectors === undefined) {
			this.selectors = [];
		} else {
			this.selectors = selectors;
		}

		if (properties === undefined) {
			this.properties = {};
		} else {
			this.properties = properties;
		}

		if (mediaQueryCondition === undefined) {
			this.mediaQueryCondition = null;
		} else {
			this.mediaQueryCondition = mediaQueryCondition;
		}
	}
}
