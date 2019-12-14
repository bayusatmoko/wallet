import formatCurrency from './formatCurrency';
import formatDate from './formatDate';

describe('Wallet', () => {
  describe('#formatCurrency', () => {
    it('should return IDR100 when input is 100', () => {
      const expectedResult = 'IDR100';
      const amount = 100;

      const actualResult = formatCurrency(amount);

      expect(actualResult).toEqual(expectedResult);
    });

    it('should return IDR9,999,999 when input is 9999999', () => {
      const expectedResult = 'IDR9,999,999';
      const amount = 9999999;

      const actualResult = formatCurrency(amount);

      expect(actualResult).toEqual(expectedResult);
    });
  });

  describe('#formatDate', () => {
    it('should return 1 January 2020 when input is 01-01-2020', () => {
      const expectedResult = '1 January 2020';
      const date = '01-01-2020';

      const actualResult = formatDate(date);

      expect(actualResult).toEqual(expectedResult);
    });

    it('should return 10 November 2000 when input is 2000-11-10', () => {
      const expectedResult = '10 November 2000';
      const date = '2000-11-10';

      const actualResult = formatDate(date);

      expect(actualResult).toEqual(expectedResult);
    });
  });
});
