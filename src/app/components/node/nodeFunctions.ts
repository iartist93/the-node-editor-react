const add = (inputs) => ({
    result: (inputs.x.value + inputs.y.value).toFixed(2)
});

const nodeFunctions = {add,};
export default nodeFunctions;