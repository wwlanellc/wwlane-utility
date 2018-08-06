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
	myImportantClasses: string[];
	unknownArray: boolean;

	constructor() {
		this.unknownArray = false;
console.log('this.unknownArray: ', this.unknownArray);
		this.myImportantClasses = [];
		this.myImportantClasses.push('smarmy');
		this.myImportantClasses.push('testClass');

		setTimeout (() => {
			this.myImportantClasses = [];
			this.myImportantClasses.push('testClass');
		}, 5000);
	}

	ngOnInit(): void {
		this.myPipe = new CurrencyPipe('en-US');
		this.myPipeAtts = ['EUR', 'code', '9.4-4', 'en-US'];
	}
}
