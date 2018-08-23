import { Pipe, PipeTransform } from '@angular/core';

import { ObjectPropertyService } from './object-property.service';

/**
 * Pipe to retrieve displayable property information from objects
 *
 * @export
 */
@Pipe({
	name: 'wwlObjectProperty'
})
export class ObjectPropertyPipe implements PipeTransform {
	/**
	 * Creates an instance of {@link ObjectPropertyPipe} and retrieves the {@link ObjectPropertyService} instance.
	 *
	 * @memberof ObjectPropertyPipe
	 */
	constructor(private objectPropertyService: ObjectPropertyService) {}

	/**
	 * retrieves the property represented by the propertyName parameter from the object that proceeds the pipe (value parameter).
	 * Returns the unknownValue if a null or undefined is encountered. If unknownValue is not provided it returns
	 * {@link ObjectPropertyService}'s [defaultUnknownValue]{@link ObjectPropertyService#defaultUnknownValue}.
	 *
	 * @memberof ObjectPropertyPipe
	 */
	transform(value: Object, propertyName: string, unknownValue?: string): string | Object {
		return this.objectPropertyService.retrievePropertyByName(value, propertyName, unknownValue, undefined, undefined, true);
	}
}
