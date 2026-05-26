import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

export type TBook = {
    id: string;
    title: string;
    author: string;
};

type TBooksState = {
    books: TBook[];
};

const initialState: TBooksState = {
    books: []
};

const bookSlice = createSlice({
    name: 'book',
    initialState,
    reducers: {
        addBook: (state: TBooksState, action: PayloadAction<TBook>) => {
            state.books.push(action.payload);
        },
        removeBook: (state: TBooksState, action: PayloadAction<string>) => {
            state.books = state.books.filter(b => b.id !== action.payload);
        }
    }
});

export const { addBook, removeBook } = bookSlice.actions;
export const reducer = bookSlice.reducer;

export class Tbook {
}