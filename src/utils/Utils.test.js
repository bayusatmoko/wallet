import formatCurrency from './formatCurrency';
import formatDate from './formatDate';

describe('Wallet', () => {
  describe('#formatCurrency', () => {
    it('should return $ 100.00 when input is 1000', () => {
      const expectedResult = '$ 100.00';
      const amount = 100;

      const actualResult = formatCurrency(amount);

      expect(actualResult).toEqual(expectedResult);
    });

    it('should return $ 9,999,999.00 when input is 9999999', () => {
      const expectedResult = '$ 9,999,999.00';
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
