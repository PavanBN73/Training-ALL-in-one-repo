
import { useState, useRef, useLayoutEffect, useTransition, useId } from "react";
import { useDispatch } from "react-redux";
import { addTransaction } from "../store";

export default function TransactionForm() {
    const dispatch = useDispatch();
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState<number | string>("");
    const [type, setType] = useState<"deposite" | "withdraw">("deposite");

    const inputRef = useRef<HTMLInputElement | null>(null);
    useLayoutEffect(() => {
        inputRef.current?.focus();
    }, []);

    const [isPending, startTransition] = useTransition();
    const titleId = useId();
    const amountId = useId();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const numericAmount = typeof amount === "string" ? Number(amount) : amount;
        if (!title.trim()) {
            alert("Enter Title");
            return;
        }
        if (!numericAmount || numericAmount <= 0) {
            alert("Invalid Amount");
            return;
        }

        const formattedAmount = type === "deposite" ? `+ ${numericAmount}` : `- ${numericAmount}`;

        startTransition(() => {
            dispatch(addTransaction({ title, amount: formattedAmount, type }));
            return undefined;
        });

        setTitle("");
        setAmount("");
        setType("deposite");
    };

    return (
        <form className="transaction-form" onSubmit={handleSubmit} aria-busy={isPending}>
            <label htmlFor={titleId}>Title</label>
            <input
                id={titleId}
                ref={inputRef}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="amount-filed"
                placeholder="Enter Transaction Title"
            />

            <label htmlFor={amountId}>Amount</label>
            <input
                id={amountId}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="amount-filed"
                placeholder="Enter Amount"
            />

            <div className="transaction-type-div">
                <label>Transaction Type:</label>
                <label>
                    <input
                        type="radio"
                        name="transactionType"
                        value="deposite"
                        checked={type === "deposite"}
                        onChange={() => setType("deposite")}
                    />
                    Deposit
                </label>

                <label>
                    <input
                        type="radio"
                        name="transactionType"
                        value="withdraw"
                        checked={type === "withdraw"}
                        onChange={() => setType("withdraw")}
                    />
                    Withdraw
                </label>
            </div>

            <button className="submit-btn" type="submit">
                {isPending ? "Adding..." : "Submit"}
            </button>
        </form>
    );
}