import { Component, Input, PipeTransform, OnChanges } from '@angular/core';

import { ObjectPropertyService } from './object-property.service';

@Component({
	selector: 'wwl-object-property',
	templateUrl: './object-property.component.html',
	styleUrls: ['./object-property.component.css']
})
export class ObjectPropertyComponent implements OnChanges {
	@Input() wwlObject: Object;
	@Input() wwlPropertyName: string;
	@Input() wwlPipe?: PipeTransform;
	@Input() wwlPipeParameters?: Object[];
	@Input() wwlUnknownValue?: string;

	private currentValue: Object;

	constructor(private objectPropertyService: ObjectPropertyService) { }

	ngOnChanges() {
		this.currentValue = this.objectPropertyService.retrievePropertyByName(this.wwlObject, this.wwlPropertyName, this.wwlUnknownValue, this.wwlPipe, this.wwlPipeParameters);
	}

	getValue(): Object {
		return this.currentValue;
	}

	valueIsArray(): boolean {
		return Array.isArray(this.currentValue);
	}
}
