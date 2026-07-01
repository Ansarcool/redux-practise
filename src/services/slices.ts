import {createAsyncThunk, createSlice, type PayloadAction} from "@reduxjs/toolkit";

import * as api from './api';

export type TBook = {
    id: string;
    title: string;
    author: string;
};

export type TBooksState = {
    books: TBook[];
    loading: boolean;
    error: string | null;
};

const initialState: TBooksState = {
    books: [],
    loading: false,
    error: null
};

export const getBooks = createAsyncThunk(
    'books/getAll',
    async () => api.getBooks()
);

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
    },
    extraReducers: (builder) => {
        builder
            .addCase(getBooks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getBooks.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.books = action.payload;
            })
            .addCase(getBooks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? 'ошибка';
            })
    },
    selectors: {
        getLoading: (state) => {
            return state.loading
        }
    }
});


export const {addBook, removeBook} = bookSlice.actions;
export const {getLoading} = bookSlice.selectors;
export const reducer = bookSlice.reducer;