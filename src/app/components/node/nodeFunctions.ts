const add = (inputs) => {
    const result = parseFloat(inputs.x.value + inputs.y.value).toFixed(2)
    return {
        result: parseFloat(result)
    }
}

const shader = (inputs) => ({});

const color = (inputs) => {
    return {
        color: inputs.color.value,
        roughness: inputs.roughness.value
    }
}

const nodeFunctions = {add, shader, color};
export default nodeFunctions;