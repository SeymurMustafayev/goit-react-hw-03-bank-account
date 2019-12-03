import React from 'react';
import PropTypes from 'prop-types';
import s from '../css.module.css';

const Balance = ({ balance, income, expenses }) => (
  <section className={s.balance}>
    <span>
      <span className={s.income}>&#8593;</span>
      {income}$
    </span>
    <span>
      <span className={s.expenses}>&#8595;</span>
      {expenses}$
    </span>
    <span>Balance: {balance}$</span>
  </section>
);

Balance.propTypes = {
  balance: PropTypes.number.isRequired,
  income: PropTypes.number.isRequired,
  expenses: PropTypes.number.isRequired,
};

export default Balance;
