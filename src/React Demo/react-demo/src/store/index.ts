import { createStore, combineReducers } from "redux";

export type Transaction = {
  id: number;
  title: string;
  amount: string;
  type: "deposite" | "withdraw";
};

type AddTransactionAction = {
  type: "transactions/add";
  payload: Omit<Transaction, "id">;
};

type RemoveTransactionAction = {
  type: "transactions/remove";
  payload: number;
};

type ClearTransactionsAction = {
  type: "transactions/clear";
};

type TransactionAction = AddTransactionAction | RemoveTransactionAction | ClearTransactionsAction;

const initialState: Transaction[] = [];

function transactionsReducer(state = initialState, action: TransactionAction): Transaction[] {
  switch (action.type) {
    case "transactions/add":
      return [...state, { ...action.payload, id: Date.now() }];
    case "transactions/remove":
      return state.filter((t) => t.id !== action.payload);
    case "transactions/clear":
      return [];
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  transactions: transactionsReducer,
});

export const store = createStore(
  rootReducer,
  // enable Redux DevTools extension when available
  (window as any).__REDUX_DEVTOOLS_EXTENSION__?.()
);

export const addTransaction = (payload: Omit<Transaction, "id">): AddTransactionAction => ({
  type: "transactions/add",
  payload,
});

export const removeTransaction = (payload: number): RemoveTransactionAction => ({
  type: "transactions/remove",
  payload,
});

export const clearTransactions = (): ClearTransactionsAction => ({
  type: "transactions/clear" } );

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;
