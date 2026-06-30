export type Account = {
    balance: number;
    owner: string;
}

export function deposit(account: Account, amount: number) {
    if (amount <= 0) {
        throw new Error('Нельзя пополнить счет на отрицательную сумму');
    }

    if (amount > 500_000) {
        throw new Error('Нельзя пополнить счет больше 500 тыс за один день');
    }

    account.balance += amount;
}

export function withdraw(account: Account, amount: number) {
    // TODO:
    //  - сумма должна должна быть положительной
    //  - сумма должна должна быть не больше чем есть на балансе
    if (amount <= 0) {
        throw new Error("Сумма не должна быть отрицательной");
    }
    if (amount > account.balance) {
        throw new Error("недостатного средств на балансе");
    }
    account.balance -= amount
}

export function transfer(sender: Account, recipent: Account, amount: number) {
    // TODO:
    //  - сумма должна должна быть положительной
    //  - сумма должна быть не больше чем есть на балансе
    //  .
    //  1. тест, где должна выйти ошибка из-за отрицательной суммы
    //  2. тест, где должна выйти ошибка из-за недостатного средств
    //  3. тест, где из счет А должна списаться сумма и счету Б должна прибваиться сумма
    if (amount <= 0) {
        throw new Error("Сумма не должна быть отрицательной");
    }
    if (amount > sender.balance) {
        throw new Error("недостатного средств на балансе");
    }
    sender.balance -= amount;
    recipent.balance += amount;
}
