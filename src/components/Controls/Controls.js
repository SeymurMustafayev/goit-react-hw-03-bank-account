import React, { Component } from 'react';
import PropTypes from 'prop-types';

import s from '../css.module.css';

export default class Controls extends Component {
  static propTypes = {
    onDeposit: PropTypes.func.isRequired,
    onWithdraw: PropTypes.func.isRequired,
  };

  state = {
    amount: '',
  };

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  onDeposit = () => {
    const { onDeposit } = this.props;
    onDeposit(Number(this.state.amount));
    this.setState({ amount: '' });
  };

  onWithdraw = () => {
    const { onWithdraw } = this.props;
    onWithdraw(Number(this.state.amount));
    this.setState({ amount: '' });
  };

  render() {
    const { amount } = this.state;
    return (
      <div>
        <section className={s.Controls}>
          <input
            className={s.input}
            onChange={this.handleInputChange}
            type="number"
            name="amount"
            value={amount}
          />
          <button className={s.button} onClick={this.onDeposit} type="button">
            Deposit
          </button>
          <button className={s.button} onClick={this.onWithdraw} type="button">
            Withdraw
          </button>
        </section>
      </div>
    );
  }
}
