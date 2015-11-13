/**
 * Created by bogdan on 8/25/15.
 */

module.exports.earningTypeEnum = {
  'Interest': 'Interest',
  'Dividend': 'Dividend',
  'Profit Sharing': 'Profit Sharing',
  'Appreciation': 'Appreciation',
  'Principal': 'Principal'
};

module.exports.investmentStatusEnum = {
  'Funding': 10,
  'Delayed': 15,
  'Failed': 20,
  'Funded': 30,
  'Active': 40,
  'Grace': 43,
  'Overdue': 45,
  'Late': 48,
  'Default': 50,
  'Charge-off': 53,
  'Payoff pending': 56,
  'Completed': 60,
  'Sold': 63,
  'Cancelled': 70,
  'Repurchased': 71
};

module.exports.investmentAssetClassEnum = {
  'Real Estate': 1,
  'Consumer Loan': 2
};

/**
 * The status of a specific platform (on off etc)
 * @type {{Real Estate: number, Consumer Loan: number}}
 */
module.exports.platformStatusEnum = {
  'on': 'on',
  'off': 'off',
  'syncing': 'syncing',
  'down': 'down'
};