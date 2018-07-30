import { Component, OnInit, Input } from '@angular/core';

import { ObjectPropertyService } from './object-property.service';

@Component({
	selector: 'wwl-util-object-property',
	templateUrl: './object-property.component.html',
	styleUrls: ['./object-property.component.css']
})
export class ObjectPropertyComponent implements OnInit {
	@Input() wwlObject: Object;
	@Input() wwlPropertyName: string;

	constructor(private objectPropertyService: ObjectPropertyService) { }

	ngOnInit() {
	}

	getValue(): Object {
		return this.objectPropertyService.retrievePropertyByName(this.wwlObject, this.wwlPropertyName);
	}
}
