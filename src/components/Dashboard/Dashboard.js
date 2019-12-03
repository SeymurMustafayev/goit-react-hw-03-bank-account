import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import uuid from 'uuid/v1';
import Controls from '../Controls/Controls';
import Balance from '../Balance/Balance';
import TransactionHistory from '../TransactionHistory/TransactionHistory';
import s from '../css.module.css';

export default class Dashboard extends Component {
  state = {
    transactions: [],
    balance: 0,
    showModal: false,
  };

  componentDidMount() {
    try {
      const balanceChange = localStorage.getItem('transactions');
      const ourBalance = localStorage.getItem('balance');
      if (balanceChange) {
        this.setState({ transactions: JSON.parse(balanceChange) });
      }
      if (ourBalance) {
        this.setState({ balance: JSON.parse(ourBalance) });
      }
    } catch (error) {
      console.log(error);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { transactions, balance } = this.state;
    if (prevState.transactions !== transactions) {
      localStorage.setItem('transactions', JSON.stringify(transactions));
      localStorage.setItem('balance', JSON.stringify(balance));
    }
  }

  onDeposit = moneyTransaction => {
    if (moneyTransaction === 0) {
      return toast.warn('Введите сумму для проведения операции!', {
        position: toast.POSITION.TOP_CENTER,
      });
    }
    const newOnDeposit = {
      id: uuid(),
      type: 'deposit',
      amount: moneyTransaction,
      date: new Date().toLocaleString(),
    };
    this.setState(state => ({
      transactions: [newOnDeposit, ...state.transactions],
      balance: state.balance + moneyTransaction,
    }));
    // return '';
  };

  onWithdraw = moneyTransaction => {
    if (moneyTransaction === 0) {
      return toast.warn('Введите сумму для проведения операции!', {
        position: toast.POSITION.TOP_CENTER,
      });
    }
    if (moneyTransaction > this.state.balance) {
      return toast.error(
        'На счету недостаточно средств для проведения операции!',
        {
          position: toast.POSITION.TOP_CENTER,
        },
      );
    }
    const newWithdraw = {
      id: uuid(),
      type: 'withdraw',
      amount: moneyTransaction,
      date: new Date().toLocaleString(),
    };
    this.setState(state => ({
      transactions: [newWithdraw, ...state.transactions],
      balance: state.balance - moneyTransaction,
    }));
  };

  showModal = () => {
    this.setState(state => ({ showModal: !state.showModal }));
  };

  render() {
    const { transactions, balance, showModal } = this.state;

    const income = transactions.reduce(
      (acc, item) => (item.type === 'deposit' ? acc + item.amount : acc),
      0,
    );

    const expenses = transactions.reduce(
      (acc, item) => (item.type === 'withdraw' ? acc + item.amount : acc),
      0,
    );

    return (
      <>
        <div className={s.dashboardContainer}>
          <div className={s.blueBox}>
            <Controls onDeposit={this.onDeposit} onWithdraw={this.onWithdraw} />
          </div>
          <Balance balance={balance} income={income} expenses={expenses} />
          <div className={s.transactionHistoryBox}>
            <TransactionHistory items={transactions} />
          </div>

          <ToastContainer />
          <button onClick={this.showModal}>show</button>
          {/* {showModal && <div className={s.modal}>Modal</div>} */}
          <div className={`${s.modal} ${showModal ? s.show__modal : ''}`}>
            Modal
          </div>
        </div>
      </>
    );
  }
}
