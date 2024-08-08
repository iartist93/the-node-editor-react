const add = (inputs) => {
    const result = parseFloat(inputs.x.value + inputs.y.value).toFixed(2)
    return {
        result: parseFloat(result)
    }
}

const shader = (inputs) => ({});

const nodeFunctions = {add, shader};
export default nodeFunctions;