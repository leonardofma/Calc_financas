const transactionsUl = document.querySelector('#transactions')
const incomeDisplay = document.querySelector('#money-plus')
const expenseDisplay = document.querySelector('#money-minus')
const balanceDisplay = document.querySelector('#balance')
const InputTransactionDate = document.querySelector('#date')
const form = document.querySelector('#form')
const inputTransactionName = document.querySelector('#text')
const inputTransactionAmount =  document.querySelector('#amount')


const localStoragetransactions = JSON
    .parse(localStorage
    .getItem('transactions'))
let transactions = localStorage.getItem('transactions') 
    !== null ? localStoragetransactions : []
const removeTransaction = ID => {
    transactions = transactions.filter(transactions => transactions.id !== ID)
    updateLocalStorage()
    init()
}
const addTransactionsIntDom = ({amount, name, date, id}) => {
    const operator = amount < 0 ? '-' : '+'
    const CSSClass = amount < 0 ? 'minus' : 'plus'
    const amountWithoutOperator = Math.abs(amount)
    const li = document.createElement('li')
    li.classList.add(CSSClass)
    li.innerHTML = `
    ${name}
    <span>${date}
    </span>
    <span>${operator} R$ ${amountWithoutOperator}
    </span>
    <button class="delete-btn" onClick="removeTransaction(${id})">x</button>
    `
    transactionsUl.append(li)
}
const getExpenses = transactionAmounts => Math.abs(transactionAmounts
    .filter(value => value < 0)
    .reduce((accumulator, value) => accumulator + value,0))
    .toFixed(2)
const getIncome = transactionAmounts =>  transactionAmounts
    .filter(value => value > 0)
    .reduce((accumulator, value) => accumulator + value,0)
    .toFixed(2)
const getTotal = transactionAmounts =>transactionAmounts
    .reduce((accumulator, transaction) => accumulator + transaction, 0)
    .toFixed(2)

const updateBalanceValues = () => {
const transactionAmounts = transactions.map(({amount}) => amount)
const total = getTotal(transactionAmounts)
const income = getIncome(transactionAmounts)
const expense = getExpenses(transactionAmounts)
balanceDisplay.textContent = `R$ ${total}`
incomeDisplay.textContent = `R$ ${income}`
expenseDisplay.textContent = `R$ ${expense}`
} 
const init = () => {
    transactionsUl.innerHTML =''
    transactions.forEach(addTransactionsIntDom)
    updateBalanceValues()
}

init()

const updateLocalStorage = () => {
    localStorage.setItem('transactions', JSON.stringify(transactions))
}
const generateID = () => Math.round(Math.random() * 10000)
 
const addToTransactionArray = (TransactionName, TransactionAmount,TransactionDate) => {
    transactions.push({
    id: generateID(), 
    name: TransactionName, 
    date: TransactionDate,
    amount: Number(TransactionAmount)
    
})
}
const clearInput = () => {
    inputTransactionName.value =''
    inputTransactionAmount.value =''
    InputTransactionDate.value =''
}
const handleFormSubmit = event => {
    event.preventDefault()

    const TransactionName = inputTransactionName.value.trim()
    const TransactionAmount =  inputTransactionAmount.value.trim()
    const TransactionDate = InputTransactionDate.value.trim()
    const isSomeInputEmpty = TransactionName === '' || TransactionAmount === '' || TransactionDate === ''
    if (isSomeInputEmpty){
    alert('Por favor preencha tanto o nome quanto o valor da transacao!')
    return    
}

addToTransactionArray(TransactionName, TransactionAmount,TransactionDate)
init()
updateLocalStorage()
clearInput() 

}



form.addEventListener('submit', handleFormSubmit)