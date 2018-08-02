import { Injectable, PipeTransform, Inject } from '@angular/core';

import { ObjectPropertyService as CoreObjectPropertyService } from 'wwlane-core-utility';
import { DEFAULT_OBJECT_PROPERTY_UNKNOWN_VALUE } from '../../config/config';

@Injectable()
export class ObjectPropertyService {
	private defaultUnknownValue = 'Unknown';

	constructor(@Inject(DEFAULT_OBJECT_PROPERTY_UNKNOWN_VALUE) systemDefaultUknownValue: string, private coreObjectPropertyService: CoreObjectPropertyService) {
			if (systemDefaultUknownValue !== undefined) {
			this.defaultUnknownValue = systemDefaultUknownValue;
		}
	}

	setDefaultUnknownValue(unknownValue: string) {
		this.defaultUnknownValue = unknownValue;
	}

	private modifyValueForDisplay(value: Object | string, unknownValue?: string, pipe?: PipeTransform, additionalPipeArguments?: Object[]): Object | string {
		if (!this.isAccessible(value)) {
		// 	value = value.getDisplayValue();
		} else if (value === null) {
			value = (unknownValue === undefined) ? this.defaultUnknownValue : unknownValue;
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

	private modifyValuesForDisplay(values: Object[] | string[], unknownValue?: string, pipe?: PipeTransform, additionalPipeArguments?: Object[]): (Object | string)[] {
		const response: (Object | string)[] = [];
		for (const value of values) {
			response.push(this.modifyValueForDisplay(value, unknownValue, pipe, additionalPipeArguments));
		}

		return response;
	}

	retrievePropertyByName(object: Object, propertyName: string, unknownValue?: string, pipe?: PipeTransform, additionalPipeArguments?: Object[]): Object | string {
		const propertyValue = this.coreObjectPropertyService.retrievePropertyByName(object, propertyName);

		let response: Object | Object[] | string[] | string;

		if (Array.isArray(propertyValue)) {
			response = this.modifyValuesForDisplay(propertyValue, unknownValue, pipe, additionalPipeArguments);
		} else {
			response = this.modifyValueForDisplay(propertyValue, unknownValue, pipe, additionalPipeArguments);
		}

		return response;
	}

	// parseFunctionCallUsingObject = function(object: Object, functionCall: FunctionCall, unknownValue?: string, pipe?: PipeTransform, additionalPipeArguments?: Object[]) {
	// 	const functionCallResult = this.coreObjectPropertyService.parseFunctionCallUsingObject(object, functionCall);

	// 	return this.modifyValueForDisplay(functionCallResult, unknownValue, pipe, additionalPipeArguments);
	// };

	isAccessible(value: Object | string): boolean {
		return true; // !(value instanceof InaccessibleProperty);
	}
}
