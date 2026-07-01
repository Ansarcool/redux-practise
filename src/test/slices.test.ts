import {describe, expect, it} from "vitest";
import { configureStore } from "@reduxjs/toolkit";
import {reducer, addBook, type TBooksState, type TBook, removeBook , getBooks} from '../services/slices.ts';
import * as api from "../services/api.ts"
import { vi } from "vitest";

const initialState: TBooksState = {
    books: [],
    loading: false,
    error: null
};
const book1: TBook = {
    id: '1',
    title: 'наименование',
    author: 'автор',
}

const book2: TBook = {
    id: '1',
    title: 'наименование',
    author: 'автор',
}
describe('синхронные экшены', () => {
    it('addBook - должен добавить книгу', () => {
        const book: TBook = {
            id: '1',
            title: 'наименование',
            author: 'автор',
        }

        const state = reducer(initialState, addBook(book));
        expect(state.books).toHaveLength(1);
        expect(state.books[0]).toEqual(book);
    })

    it('addBook - должен добавить несколько книг', () => {

        let state = reducer(initialState, addBook(book1));
        state = reducer(state, addBook(book2));
        expect(state.books).toHaveLength(2);
    })
    it('removeBook-должен удалять книги', () => {
        const book: TBook = {
            id: '1',
            title: 'Книга',
            author: 'Автор'
        }
        let state = reducer(initialState, addBook(book));
        state = reducer(state, removeBook(book.id));
        expect(state.books).toHaveLength(0);
    })
})

describe('Асинхронные экшены', () => {
    it('getBooks.pending – должен установить loading: true', () => {
        const state = reducer(initialState, {type: getBooks.pending.type});
        expect(state.loading).toEqual(true);
    })

    it('getBooks.fulfilled – должен установить loading: false и записать книги', () => {
        const books = [book1, book2];
        const state = reducer(
            {...initialState, loading: true},
            {type: getBooks.fulfilled.type, payload: books}
        );
        expect(state.loading).toEqual(false);
        expect(state.books).toEqual(books);
    });

    it('getBooks.rejected – должен установить loading: false и записать ошибку', () => {
        const message = 'Bad Request';
        const state = reducer(
            {...initialState, loading: true},
            {type: getBooks.rejected.type, error: {message}}
        );

        expect(state.loading).toEqual(false);
        expect(state.error).toEqual(message);
    });
})
describe('getBooks thunk', () => {
    it('должен загрузить книги и записать их в стор', async () => {
        const mockBooks = [book1, book2];
        vi.spyOn(api, 'getBooks').mockResolvedValue(mockBooks);

        const store = configureStore({reducer});
        await store.dispatch(getBooks());

        const state = store.getState();
        expect(state.loading).toEqual(false);
        expect(state.books).toEqual(mockBooks);
        expect(state.error).toBeNull();
    });

    it('должен установить loading: true во время загрузки', () => {
        vi.spyOn(api, 'getBooks').mockReturnValue(new Promise(() => {}));

        const store = configureStore({reducer});
        store.dispatch(getBooks());

        const state = store.getState();
        expect(state.loading).toEqual(true);
    });

    it('должен записать ошибку при rejected', async () => {
        vi.spyOn(api, 'getBooks').mockRejectedValue(new Error('Network Error'));

        const store = configureStore({reducer});
        await store.dispatch(getBooks());

        const state = store.getState();
        expect(state.error).toEqual('Network Error');
        expect(state.loading).toEqual(false);
        expect(state.books).toHaveLength(0);
    });
})