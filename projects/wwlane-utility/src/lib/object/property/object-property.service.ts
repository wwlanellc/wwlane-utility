import { Injectable, PipeTransform, Inject } from '@angular/core';

import { ObjectPropertyService as CoreObjectPropertyService } from 'wwlane-core-utility';
import { DEFAULT_OBJECT_PROPERTY_UNKNOWN_VALUE } from '../../config/config';

/**
 * Service which contains functions to retrieve displayable property information from objects
 *
 * @export
 */
@Injectable({
	providedIn: 'root'
})
export class ObjectPropertyService {
	/**
	 * The value to use if a requested property is not accessible due to null or undefined values.
	 * Can be overridden by global configuration, by calling the setDefaultUknownValue function or
	 * by passing an unknownValue to one of the service's methods.
	 *
	 * @memberof ObjectPropertyService
	 */
	private defaultUnknownValue = 'Unknown';

	/**
	 * Creates an instance of ObjectPropertyService,
	 * sets the default unknown value if it was set in the environment variables,
	 * and instantiates the core object property service.
	 *
	 * @memberof ObjectPropertyService
	 */
	constructor(@Inject(DEFAULT_OBJECT_PROPERTY_UNKNOWN_VALUE) systemDefaultUnknownValue: string, private coreObjectPropertyService: CoreObjectPropertyService) {
			if (systemDefaultUnknownValue !== undefined) {
			this.defaultUnknownValue = systemDefaultUnknownValue;
		}
	}

	/**
	 * Sets the fallback value to use if a requested property is not accessible due to null or undefined values.
	 *
	 * @memberof ObjectPropertyService
	 */
	setDefaultUnknownValue(unknownValue: string) {
		this.defaultUnknownValue = unknownValue;
	}

	/**
	 * Prepares a value for display by replacing nulls and undefineds with the provided unknownValue or
	 * {@link ObjectPropertyService#defaultUnknownValue} if the unknownValue was not provided and then passes
	 * the value through the provided pipe if one was provided.
	 *
	 * @memberof ObjectPropertyService
	 */
	private prepareValueForDisplay(value: Object | string, unknownValue?: string, pipe?: PipeTransform, additionalPipeArguments?: Object[]): Object | string {
		// if (!this.isAccessible(value)) {
		//  	value = value.getDisplayValue();
		// } else
		if (value === null || value === undefined) {
			value = (unknownValue === undefined ? this.defaultUnknownValue : unknownValue);
		} else if (pipe !== undefined) {
			let pipeArguments = null;

			if (additionalPipeArguments !== undefined) {
				pipeArguments = Object.assign([], additionalPipeArguments);

				pipeArguments.unshift(value);
			} else {
				pipeArguments = [value];
			}

			value = pipe.transform.apply(null, pipeArguments);
		}

		return value;
	}

	/**
	 * Prepares a array's values for displaying by utilizing {@link ObjectPropertyService#prepareValueForDisplay} for each element.
	 * If the treatArrayAsUnknown parameter is passed and true then it returns the unknown value instead of an array.
	 *
	 * @memberof ObjectPropertyService
	 */
	private prepareValuesForDisplay(values: Object[] | string[], unknownValue?: string, pipe?: PipeTransform, additionalPipeArguments?: Object[], treatArrayAsUnknown?: boolean): (Object | string)[] | string {
		let response: (Object | string)[] | string;

		if (treatArrayAsUnknown === true) {
			response = (unknownValue === undefined ? this.defaultUnknownValue : unknownValue);
		} else {
			response = [];

			for (const value of values) {
				response.push(this.prepareValueForDisplay(value, unknownValue, pipe, additionalPipeArguments));
			}
		}

		return response;
	}

	/**
	 * Wrapper for the core retrievePropertyByName method. Passes the result off to {@link ObjectPropertyService#prepareValuesForDisplay} or {@link ObjectPropertyService#prepareValueForDisplay}.
	 *
	 * @memberof ObjectPropertyService
	 */
	retrievePropertyByName(object: Object, propertyName: string, unknownValue?: string, pipe?: PipeTransform, additionalPipeArguments?: Object[], treatArrayAsUnknown?: boolean): Object | string {
		const propertyValue = this.coreObjectPropertyService.retrievePropertyByName(object, propertyName);

		let response: Object | Object[] | string[] | string;

		if (Array.isArray(propertyValue)) {
			response = this.prepareValuesForDisplay(propertyValue, unknownValue, pipe, additionalPipeArguments, treatArrayAsUnknown);
		} else {
			response = this.prepareValueForDisplay(propertyValue, unknownValue, pipe, additionalPipeArguments);
		}

		return response;
	}

	// parseFunctionCallUsingObject = function(object: Object, functionCall: FunctionCall, unknownValue?: string, pipe?: PipeTransform, additionalPipeArguments?: Object[]) {
	// 	const functionCallResult = this.coreObjectPropertyService.parseFunctionCallUsingObject(object, functionCall);

	// 	return this.prepareValueForDisplay(functionCallResult, unknownValue, pipe, additionalPipeArguments);
	// };

	// isAccessible(value: Object | string): boolean {
	// 	return !(value instanceof InaccessibleProperty);
	// }
}
