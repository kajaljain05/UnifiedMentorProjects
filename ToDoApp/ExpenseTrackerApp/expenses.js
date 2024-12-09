document.addEventListener('DOMContentLoaded', function() {
    const expenseForm = document.getElementById('expenseForm');
    const expenseList = document.getElementById('expenseList');
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    
    function renderExpenses() {
        expenseList.innerHTML = '';
        expenses.forEach(function(expense, index) {
            const li = document.createElement('li');
            li.innerHTML = `${expense.name}: $${expense.amount} 
                            <button onclick="editExpense(${index})">Edit</button>
                            <button onclick="deleteExpense(${index})" class="delete-btn">Delete</button>`;
            expenseList.appendChild(li);
        });
        localStorage.setItem('expenses', JSON.stringify(expenses));
    }

    function addExpense(name, amount) {
        expenses.push({ name, amount });
        renderExpenses();
    }

    
    window.deleteExpense = function(index) {
        expenses.splice(index, 1);
        renderExpenses();
    }

    
    window.editExpense = function(index) {
        const newName = prompt('Enter new expense name:');
        const newAmount = parseFloat(prompt('Enter new expense amount:'));
        if (newName && !isNaN(newAmount)) {
            expenses[index].name = newName;
            expenses[index].amount = newAmount;
            renderExpenses();
        }
    }

    
    expenseForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const expenseName = document.getElementById('expenseName').value;
        const expenseAmount = parseFloat(document.getElementById('expenseAmount').value);
        if (expenseName && !isNaN(expenseAmount)) {
            addExpense(expenseName, expenseAmount);
            expenseForm.reset();
        } else {
            alert('Please enter valid expense name and amount.');
        }
    });

    
    renderExpenses();
});
