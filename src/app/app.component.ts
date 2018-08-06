import { ObjectPropertyService } from 'wwlane-utility';
import { Component, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	title = 'wwlane-utility-app';
	myObj = {
		myProperty: [{
			myPropertyName: 3.2644458
		},
		{
			myPropertyName: 3463.0
		},
		{
			myPropertyName: null
		},
		{
			myPropertyName: 9
		}]
	};
	myPipe: CurrencyPipe;
	myPipeAtts: string[];

	constructor(objectPropertyService: ObjectPropertyService) {
		objectPropertyService.setDefaultUnknownValue('blah');

	}

	ngOnInit(): void {
		this.myPipe = new CurrencyPipe('en-US');
		this.myPipeAtts = ['EUR', 'code', '9.4-4', 'en-US'];
	}
}
