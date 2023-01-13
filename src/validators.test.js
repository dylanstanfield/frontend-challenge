import { isValidName, isValidEmail, isValidPassword } from './validators';

describe('isValidName', () => {
  it('returns false if name is null or undefined', () => {
    expect(isValidName(null)).toBe(false);
    expect(isValidName(undefined)).toBe(false);
  });

  it('returns false if name is 100 characters or more', () => {
    expect(isValidName(Array.from({ length: 101 }, () => 'a').join(''))).toBe(false);
  });

  it('returns true if name is valid', () => {
    expect(isValidName('Dylan')).toBe(true);
  });
});

describe('isValidEmail', () => {
  it('returns false if email is null or undefined', () => {
    expect(isValidEmail(null)).toBe(false);
    expect(isValidEmail(undefined)).toBe(false);
  });

  it('returns false if email is not valid', () => {
    expect(isValidEmail('Dylan')).toBe(false);
  });

  it('returns true if email is valid', () => {
    expect(isValidEmail('dylan@dstanfield.com')).toBe(true);
  });
});

describe('isValidPassword', () => {
  it('returns false if email is null or undefined', () => {
    expect(isValidPassword(null)).toBe(false);
    expect(isValidPassword(undefined)).toBe(false);
  });

  it('returns false password is not valid', () => {
    expect(isValidPassword('a')).toBe(false);
    expect(isValidPassword('abcd1234')).toBe(false);
    expect(isValidPassword('12345678')).toBe(false);
    expect(isValidPassword('!!!!!!!!')).toBe(false);
  });

  it('returns true if password is valid', () => {
    expect(isValidPassword('abc123!!')).toBe(true);
  });
});


