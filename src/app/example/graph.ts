export const nodeFunctions = {
    add: (a: number, b: number) => ({
        result: a + b
    }),
    subtract: (a: number, b: number) => ({
        result: a - b
    }),
    multiply: (a: number, b: number) => ({
        result: a * b
    }),
    divide: (a: number, b: number) => ({
        result: a / b
    }),
    color: (color: string) => ({
        color: color
    }),
};
