type BalanceCardProps = {
  balance: number;
}

export default function BalanceCard({ balance }: BalanceCardProps) {
  return (
    <div className="balance-card">
      <h3>Current Balance</h3>
      <h1>₹ {balance}</h1>
    </div>
  );
}