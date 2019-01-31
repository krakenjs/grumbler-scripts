/* @flow */

export { render } from './component';

export async function foo() : Promise<mixed> {
    const { baz, ...rest } = { baz: 123, x: 1 };
    const berk = { y: 7, ...rest };

    const { x } = await import('./dependency');

    return await window.bar(baz, rest, x, berk);
}

export function fooz<T>(bar : T) : T {
    return bar;
}

export class Foo {
    bar = 1337;

    @fooz
    baz() : number {
        return 5;
    }
}
