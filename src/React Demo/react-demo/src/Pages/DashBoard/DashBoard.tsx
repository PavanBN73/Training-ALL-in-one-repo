import React, { useMemo } from "react";
import "./Dashboard.css";

import Header from "../../Components/Header";
import BalanceCard from "../../Components/BalanceCard";
import Stats from "../../Components/Stats";
import Transactions from "../../Components/Transactions";
import TransactionForm from "../../Components/TransactionForm";
import TransactionProvider, { useTransactions } from "../../contexts/TransactionContext";

function DashboardContent() {
    const { transactions } = useTransactions();

    const balance = useMemo(() => {
        return transactions.reduce((acc, t) => {
            const n = parseFloat(t.amount.replace(/[^\d.-]+/g, "").replace(/,/g, "")) || 0;
            return acc + (t.amount.trim().startsWith("-") ? -Math.abs(n) : Math.abs(n));
        }, 0 as number);
    }, [transactions]);

    return (
        <div className="container">
            <Header />
            <BalanceCard balance={balance} />
            <Stats />
            <TransactionForm />
            <Transactions />
        </div>
    );
}

export default function Dashboard() {
    return (
        <TransactionProvider>
            <DashboardContent />
        </TransactionProvider>
    );
}