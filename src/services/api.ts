import type {TBook} from "./slices.ts";

export function getBooks(): Promise<TBook[]> {
    return new Promise<TBook[]>((resolve, reject) => {
        setTimeout(() => {

            // reject('error');
            resolve([
                {id: crypto.randomUUID(), author: 'тест автор 1', title: 'тест книга 1'},
                {id: crypto.randomUUID(), author: 'тест автор 2', title: 'тест книга 2'},
                {id: crypto.randomUUID(), author: 'тест автор 3', title: 'тест книга 3'},
                {id: crypto.randomUUID(), author: 'тест автор 4', title: 'тест книга 4'}
            ]);
        }, 2000);
    })
}