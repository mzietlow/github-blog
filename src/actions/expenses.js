import { get, push, ref } from "firebase/database";
import database from "../firebase/firebase";
// Expenses Reducer Methods
export const addExpense = (expense) => ({ type: "ADD_EXPENSE", expense });

export const startAddExpense = (expenseData = {}) => {
  return (dispatch) => {
    const {
      description = "",
      note = "",
      amount = 0,
      createdAt = 0,
    } = expenseData;
    const expense = { description, note, amount, createdAt };

    return push(ref(database, "expenses"), expense).then((ref) =>
      dispatch(addExpense({ id: ref.key, ...expense }))
    );
  };
};

export const removeExpense = ({ id } = {}) => ({
  type: "REMOVE_EXPENSE",
  id,
});

export const editExpense = (id, expenseUpdate = {}) => ({
  type: "EDIT_EXPENSE",
  id,
  expenseUpdate,
});

export const setExpenses = (expenses) => ({
  type: "SET_EXPENSES",
  expenses,
});

export const startSetExpenses = () => {
  return (dispatch) => {
    return get(ref(database, "expenses")).then((snapshot) => {
      const expenses = [];
      snapshot.forEach((childSnapshot) => {
        expenses.push({
          id: childSnapshot.key,
          ...childSnapshot.val(),
        });
      });

      dispatch(setExpenses(expenses));
    });
  };
};
