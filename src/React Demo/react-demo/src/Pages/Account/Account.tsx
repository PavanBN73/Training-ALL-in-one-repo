import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import { Link } from "react-router-dom";

export default function Account() {
  const transactions = useSelector((s: RootState) => s.transactions);

  return (
    <div className="container">
      <h2>Account Overview</h2>
      <p>Number of transactions: {transactions.length}</p>
      <ul className="transactions-list">
        {transactions.map((t) => (
          <li key={t.id} className={`transaction ${t.type}`}>
            <strong>{t.title}</strong>  {t.amount}
          </li>
        ))}
      </ul>

      <p>
        <Link to="/">Back to Dashboard</Link>
      </p>
    </div>
  );
}
