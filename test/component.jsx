/* @flow */
/** @jsx jsxTest */

function jsxTest(name : string) : HTMLElement {
    return document.createElement(name);
}

export function render() : HTMLElement {
    return (
        <div />
    );
}
