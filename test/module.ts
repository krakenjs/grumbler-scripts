export { render } from './component';

export async function foo() : Promise<unknown> {
    async function bar(...args : Array<unknown>) : Promise<number> {
        args.push(1);
        return await new Promise<number>((resolve) => {
            resolve(10);
        });
    }

    const {
        baz,
        ...rest
    } = {
        baz: 123,
        x:   1
    };
    const berk = {
        y: 7,
        ...rest
    };
    const {
        x
    } = await import('./dependency');
    return await bar(baz, rest, x, berk);
}
export function fooz(bar : boolean) {
    return function decorateFooz (target : unknown, propertyKey : string, descriptor : PropertyDescriptor) : void {
        descriptor.enumerable = bar;
    };
}
export class Foo {
    bar = 1337;

    @fooz(false)
    baz() : number {
        return 5;
    }

}
