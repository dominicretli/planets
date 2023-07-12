import { DecimalSpacePipe } from './decimal-space.pipe';
import {DecimalPipe} from '@angular/common';

describe('DecimalSpacePipe', () => {
  const pipe = new DecimalSpacePipe(new DecimalPipe('en-US'));

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should not add space for number less than 1000', () => {
    const input = '999';
    const result = pipe.transform(input);

    expect(result).toEqual('999');
  });

  it('should add space for 1000', () => {
    const input = '1000';
    const result = pipe.transform(input);

    expect(result).toEqual('1 000');
  });

  it('should add spaces every 3 digits for numbers 100,000 and up', () => {
    const input = '100000';
    const result = pipe.transform(input);

    expect(result).toEqual('100 000');
  });

  it('should add spaces every 3 digits for numbers in the millions', () => {
    const input = '123456789';
    const result = pipe.transform(input);

    expect(result).toEqual('123 456 789');
  });

  it('should add spaces for negative numbers', () => {
    const input = '-123456789';
    const result = pipe.transform(input);

    expect(result).toEqual('-123 456 789');
  });

  it('should not add spaces numbers padded with zeros', () => {
    const input = '00001';
    const result = pipe.transform(input);

    expect(result).toEqual('1');
  });

  it('should not remove decimals', () => {
    const input = '1.25';
    const result = pipe.transform(input);

    expect(result).toEqual('1.25');
  });

  it('should add space and not remove decimals', () => {
    const input = '1001.25';
    const result = pipe.transform(input);

    expect(result).toEqual('1 001.25');
  });

  it('should not transform if input is not a number', () => {
    const input = 'fdsa';
    const result = pipe.transform(input);

    expect(result).toEqual('fdsa');
  });

  it('should not transform if input is not a number D100', () => {
    const input = 'D100';
    const result = pipe.transform(input);

    expect(result).toEqual('D100');
  });

  it('should not transform if input is not a number 100D', () => {
    const input = '100D';
    const result = pipe.transform(input);

    expect(result).toEqual('100D');
  });

  it('should not transform if input is empty string', () => {
    const input = '';
    const result = pipe.transform(input);

    expect(result).toEqual('');
  });

});
