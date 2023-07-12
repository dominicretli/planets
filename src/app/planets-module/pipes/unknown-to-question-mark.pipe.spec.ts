import { UnknownToQuestionMarkPipe } from './unknown-to-question-mark.pipe';

describe('UnknownToQuestionMarkPipe', () => {
  const pipe = new UnknownToQuestionMarkPipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform unknown to question mark', () => {
    const input = 'unknown';
    const result = pipe.transform(input);

    expect(result).toEqual('?');
  });

  it('should not do any transformations if the input is not unknown', () => {
    const input = 'someValue';
    const result = pipe.transform(input);

    expect(result).toEqual('someValue');
  });


  it('should not do any transformations if the input is an empty string', () => {
    let input = '';
    const result = pipe.transform(input);

    expect(result).toEqual('');
  });
});
