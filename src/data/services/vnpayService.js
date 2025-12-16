import { banks, cardsATM } from '../api/vnpay';

export const getBanks = () => {
    return banks;
};

export const getBankById = (bankId) => {
    const bank = banks.find((b) => b.id === bankId);
    return bank;
};

export const getBankByName = (name) => {
    return banks.find((b) => b.name === name);
};

export const getCardsATM = () => {
    return cardsATM;
};

export const getCardByInfo = ({ bankId, cardNumber, cardHolder, issueDate }) => {
    return cardsATM.find(
        (c) =>
            c.bankId === bankId &&
            c.number === cardNumber &&
            c.holder === cardHolder.toUpperCase() &&
            c.issueDate === issueDate
    );
};

export const getCardById = (cardId) => {
    const card = cardsATM.find((c) => c.id === cardId);
    return card;
};

export const getCardByNumber = (cardNumber) => {
    return cardsATM.find((c) => c.number === cardNumber);
};
