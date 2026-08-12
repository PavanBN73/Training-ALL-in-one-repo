import { useMemo } from "react";
import "./Dashboard.css";

import Header from "../../Components/Header";
import BalanceCard from "../../Components/BalanceCard";
import Stats from "../../Components/Stats";
import Transactions from "../../Components/Transactions";
import TransactionForm from "../../Components/TransactionForm";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";

function DashboardContent() {
    const transactions = useSelector((s: RootState) => s.transactions);

    const balance = useMemo(() => {
        return transactions.reduce((acc, t) => {
            const n = parseFloat(String(t.amount).replace(/[^\d.-]+/g, "").replace(/,/g, "")) || 0;
            return acc + (String(t.amount).trim().startsWith("-") ? -Math.abs(n) : Math.abs(n));
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
    return <DashboardContent />;
}