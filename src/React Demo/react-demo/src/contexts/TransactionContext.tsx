import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useDebugValue,
  useInsertionEffect,
} from "react";

export type Transaction = {
  id: number;
  title: string;
  amount: string;
  type: "deposite" | "withdraw";
};

type State = Transaction[];

type Action =
  | { type: "add"; payload: Omit<Transaction, "id"> }
  | { type: "remove"; payload: { id: number } };

const initialState: State = [];

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "add":
      return [...state, { ...action.payload, id: Date.now() }];
    case "remove":
      return state.filter((t) => t.id !== action.payload.id);
    default:
      return state;
  }
}

const TransactionContext = createContext<{
  transactions: State;
  addTransaction: (t: Omit<Transaction, "id">) => void;
  removeTransaction: (id: number) => void;
} | null>(null);

export function TransactionProvider({ children }: { children: React.ReactNode }) {
  const [transactions, dispatch] = useReducer(reducer, initialState);

  // Example of injection before DOM updates — libraries use this to insert styles.
  useInsertionEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      .transaction.deposit { color: #0b8457; }
      .transaction.withdraw { color: #c62828; }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const addTransaction = useCallback((t: Omit<Transaction, "id">) => {
    dispatch({ type: "add", payload: t });
  }, []);

  const removeTransaction = useCallback((id: number) => {
    dispatch({ type: "remove", payload: { id } });
  }, []);

  // Helpful debug label in React DevTools for custom hooks
  useDebugValue(transactions.length ? `${transactions.length} txs` : "no txs");

  const value = { transactions, addTransaction, removeTransaction };

  return <TransactionContext.Provider value={value}>{children}</TransactionContext.Provider>;
}

export function useTransactions() {
  const ctx = useContext(TransactionContext);
  if (!ctx) throw new Error("useTransactions must be used within a TransactionProvider");
  return ctx;
}

export default TransactionProvider;
