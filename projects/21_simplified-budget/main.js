'use strict';

const incomeInput = document.querySelector('#income');
const expenseNameInput = document.querySelector('#expense-name');
const expenseAmountInput = document.querySelector('#expense-amount');
const expenseAddButton = document.querySelector('#expense-add-button');
const expenseList = document.querySelector('.expense-list');
const summary = document.querySelector('.summary-panel');
const summaryContentTemplate = document.querySelector('#summary-content');
const expenseItemTemplate = document.querySelector('#expense-item');

let budget;

class Budget {
    incomeAmount = 0;
    expensesAmount = 0;
    balanceAmount = 0;
    lastExpenseId = null;
    expenses = [];

    addExpense(name, amount) {
        this.lastExpenseId += 1;

        this.expenses.push({id: this.lastExpenseId, name, amount});

        this.calculate();
    }

    deleteExpense(id) {
        this.expenses = this.expenses.filter((expense) => expense.id !== id);

        this.calculate();
    }

    setIncome(amount) {
        this.incomeAmount = amount;

        this.calculate();
    }

    calculate() {
        this.expensesAmount = this.expenses.reduce((accumulator, currentValue) => {
            return accumulator + currentValue.amount;
        }, 0);
        this.balanceAmount = this.incomeAmount - this.expensesAmount;
    }
}

init();

function init() {
    budget = new Budget();

    incomeInput.addEventListener('change', onIncomeInputChange);
    expenseAddButton.addEventListener('click', onExpenseAddButtonClick);
    expenseList.addEventListener('click', onExpenseListClick);

    updateSummaryView();
}

function addIncome(amount) {
    budget.setIncome(amount);
    updateSummaryView();
}

function addExpense(name, amount) {
    budget.addExpense(name, amount);
    renderExpenses();
    updateSummaryView();
}

function deleteExpense(id) {
    budget.deleteExpense(id);
    renderExpenses();
    updateSummaryView();
}

function renderExpenses() {
    const fragment = document.createDocumentFragment();
    const expenses = budget.expenses;

    for (let i = 0; i < expenses.length; i++) {
        fragment.appendChild(createExpense(expenses[i]));
    }

    expenseList.innerHTML = '';
    expenseList.appendChild(fragment);
}

function createExpense(expense) {
    const {id, name, amount} = expense;

    const expenseItemClone = expenseItemTemplate.content.cloneNode(true);
    const expenseItem = expenseItemClone.querySelector('.expense-item');
    const expenseItemName = expenseItem.querySelector('.name');
    const expenseItemAmount = expenseItem.querySelector('.amount');

    expenseItem.dataset.id = id;
    expenseItemName.textContent = name;
    expenseItemAmount.textContent = `$${amount}`;

    return expenseItem;
}

function updateSummaryView() {
    const summaryContent = summaryContentTemplate.content.cloneNode(true);
    const summaryIncomeAmount = summaryContent.querySelector('.summary-item--income .summary-amount');
    const summaryExpensesAmount = summaryContent.querySelector('.summary-item--expenses .summary-amount');
    const summaryBalanceAmount = summaryContent.querySelector('.summary-item--balance .summary-amount');

    summaryIncomeAmount.textContent = `$${budget.incomeAmount}`;
    summaryExpensesAmount.textContent = `$${budget.expensesAmount}`;
    summaryBalanceAmount.textContent = `$${budget.balanceAmount}`;

    if (budget.balanceAmount > 0) {
        summaryBalanceAmount.classList.add('positive');
        summaryBalanceAmount.classList.remove('negative');
    } else if (budget.balanceAmount < 0) {
        summaryBalanceAmount.classList.add('negative');
        summaryBalanceAmount.classList.remove('positive');
    } else {
        summaryBalanceAmount.classList.remove('positive');
        summaryBalanceAmount.classList.remove('negative');
    }

    summary.innerHTML = '';
    summary.appendChild(summaryContent);
}

function onIncomeInputChange(evt) {
    addIncome(evt.target.value);
}

function onExpenseAddButtonClick() {
    addExpense(expenseNameInput.value, Number(expenseAmountInput.value));
}

function onExpenseListClick(evt) {
    const deleteButton = evt.target.closest('button');

    if (!deleteButton) {
        return;
    }

    const expenseId = Number(deleteButton.closest('.expense-item').dataset.id);

    deleteExpense(expenseId);
}
