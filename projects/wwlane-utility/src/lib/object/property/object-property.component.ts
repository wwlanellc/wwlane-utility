import { Component, Input, PipeTransform } from '@angular/core';

import { ObjectPropertyService } from './object-property.service';

@Component({
	selector: 'wwl-object-property',
	templateUrl: './object-property.component.html',
	styleUrls: ['./object-property.component.css']
})
export class ObjectPropertyComponent {
	@Input() wwlObject: Object;
	@Input() wwlPropertyName: string;
	@Input() wwlPipe?: PipeTransform;
	@Input() wwlPipeParameters?: Object[];
	@Input() wwlUnknownValue?: string;

	constructor(private objectPropertyService: ObjectPropertyService) { }

	getValue(): Object {
		return this.objectPropertyService.retrievePropertyByName(this.wwlObject, this.wwlPropertyName, this.wwlUnknownValue, this.wwlPipe, this.wwlPipeParameters);
	}

	valueIsArray(): boolean {
		// TODO: Don't recall getValue
		return Array.isArray(this.getValue());
	}
}
