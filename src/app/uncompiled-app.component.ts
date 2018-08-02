import { Component, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Component({
	selector: 'app-root-uncompiled',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class UncompiledAppComponent implements OnInit {
	title = 'wwlane-utility-uncompiled-app';
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

	constructor() { }

	ngOnInit(): void {
		this.myPipe = new CurrencyPipe('en-US');
		this.myPipeAtts = ['EUR', 'code', '9.4-4', 'en-US'];
	}
}