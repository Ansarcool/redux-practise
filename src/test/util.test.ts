import { expect, it, describe} from "vitest";
import {type Account, deposit, transfer, withdraw} from "./util.ts";

describe('тесты аккаунта', () => {
    it('счет должен пополниться', () => {
        const bob: Account = {balance: 100, owner: 'Robert'};

        deposit(bob, 500);

        expect(bob.balance).toBe(600);
    })

    it('счет не должен пополниться, должно выйти исключение', () => {
        const expectedMsg = 'Нельзя пополнить счет на отрицательную сумму';

        const bob: Account = {balance: 100, owner: 'Robert'};

        expect(() => deposit(bob, -200)).toThrow(new Error(expectedMsg));

        expect(bob.balance).toBe(100);
    })

    // 1. тест, где должна выйти ошибка из-за отрицательной суммы
    // 2. тест, где должна выйти ошибка из-за недостатного средств
    // 3. тест, где из счет должно списаться n-ая сумма
    it('не получитсч снять, сумма не должна быть отрицательной', () => {
        const expectedMsg = "Сумма не должна быть отрицательной";

        const bob: Account = {balance: 100, owner: "Bob"};

        expect(() => withdraw(bob, -500)).toThrow(new Error(expectedMsg));

        expect(bob.balance).toBe(100)
    })
    it('не получиьтся снять денгьи недостаточно средств на балансе', () => {
        const expectedMsg = "недостатного средств на балансе";

        const bob: Account = {balance: 100, owner: "Bob"};

        expect(() => withdraw(bob, 500)).toThrow(new Error(expectedMsg));

        expect(bob.balance).toBe(100)
    })
    it('все получится и деньги снимутся', () => {

        const bob: Account = {balance: 100, owner: "Bob"};


        withdraw(bob, 100)

        expect(bob.balance).toBe(0)
    })
    it('сумма не должна быть отрицательной', () => {
        const expectedMsg = "Сумма не должна быть отрицательной";

        const bob: Account = {balance: 100, owner: "Bob"};
        const alex: Account = {balance: 100, owner: "Alex"};

        expect(() => transfer(bob, alex, -100)).toThrow(new Error(expectedMsg));
        expect(bob.balance).toBe(100);
        expect(alex.balance).toBe(100)
    })
    it('сумма не должна быть отрицательной', () => {
        const expectedMsg = "недостатного средств на балансе";

        const bob: Account = {balance: 100, owner: "Bob"};
        const alex: Account = {balance: 100, owner: "Alex"};

        expect(() => transfer(bob, alex, 500)).toThrow(new Error(expectedMsg));

        expect(bob.balance).toBe(100);
        expect(alex.balance).toBe(100)
    })
    it('трансфер должен быть успешным', () => {

        const bob: Account = {balance: 100, owner: "Bob"};
        const alex: Account = {balance: 100, owner: "Alex"};

        expect(() => transfer(bob, alex, 100));

        expect(bob.balance).toBe(0);
        expect(alex.balance).toBe(200)
    })
})