import { ObjectPropertyPipe } from './object-property.pipe';

describe('ObjectPropertyPipe', () => {
	it('create an instance', () => {
		const pipe = new ObjectPropertyPipe();
		expect(pipe).toBeTruthy();
	});
});
