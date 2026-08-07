import React, { useDeferredValue, useEffect, useMemo } from "react";
import { useTransactions } from "../contexts/TransactionContext";

const DepositTransaction = ({ title, amount }: { title: string; amount: string }) => (
    <div className="transaction deposit">
        <span>{title}</span>
        <span>{amount}</span>
    </div>
);

const WithdrawTransaction = ({ title, amount }: { title: string; amount: string }) => (
    <div className="transaction withdraw">
        <span>{title}</span>
        <span>{amount}</span>
    </div>
);

export default function Transactions() {
    const { transactions } = useTransactions();

    // Update document title when transaction count changes
    useEffect(() => {
        document.title = `Transactions: ${transactions.length}`;
    }, [transactions.length]);

    // Defer rendering of the list to keep UI responsive on large lists
    const deferred = useDeferredValue(transactions);

    const items = useMemo(
        () =>
            deferred.map((item) =>
                item.type === "deposite" ? (
                    <DepositTransaction key={item.id} title={item.title} amount={item.amount} />
                ) : (
                    <WithdrawTransaction key={item.id} title={item.title} amount={item.amount} />
                )
            ),
        [deferred]
    );

    return (
        <div className="transactions">
            <h2>Recent Transactions</h2>
            {items}
        </div>
    );
}