import { Component, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
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
	myImportantClasses: string[];
	unknownArray: boolean;
	myBoolean: boolean;
	myObservable: Observable<any>;
	blah: Promise<void>[];

	constructor() {
		this.unknownArray = false;
		this.myBoolean = true;

		this.myImportantClasses = [];
		this.myImportantClasses.push('smarmy');
		this.myImportantClasses.push('testClass');

		this.myObservable = new Observable(function (observer) {
			// synchronously deliver 1, 2, and 3, then complete
			observer.next(1);
			setTimeout (() => {
				observer.next(2);
				observer.next(3);
					observer.complete();
			}, 8000);

			// unsubscribe function doesn't need to do anything in this
			// because values are delivered synchronously
			return {unsubscribe() {}};
		});

		setTimeout (() => {
			this.myBoolean = false;
		}, 2000);
	}

	ngOnInit(): void {
		this.myPipe = new CurrencyPipe('en-US');
		this.myPipeAtts = ['EUR', 'code', '9.4-4', 'en-US'];

		this.blah = [];
		this.blah.push(new Promise<void>((resolve) => {
			setTimeout(() => {
				resolve();
			}, 3000); }
		));
		this.blah.push(new Promise<void>((resolve) => {
			setTimeout(() => {
				resolve();
			}, 1000); }
		));
		this.blah.push(new Promise<void>((resolve) => {
			setTimeout(() => {
				resolve();
			}, 4000); }
		));
		this.blah.push(new Promise<void>((resolve) => {
			setTimeout(() => {
				resolve();
			}, 5000); }
		));

		setTimeout (() => {
			this.blah.push(new Promise<void>((resolve) => {
				setTimeout(() => {
					resolve();
				}, 5000); }
			))
		}, 10000);

	}

	myFunc(): boolean {
		return this.myBoolean;
	}

	returnFalse(): boolean {
		return false;
	}
}
