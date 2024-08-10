import {Color} from "three";

const float = (inputs) => {
    console.log("float")
    return {
        result: parseFloat(inputs.float.value)
    }
}

const add = (inputs) => {
    console.log("add")
    const result = parseFloat(inputs.x.value + inputs.y.value).toFixed(2)
    return {
        result: parseFloat(result)
    }
}

const shader = (inputs) => {
    console.log("shader")
    return {}
}

const color = (inputs) => {
    console.log("color")
    return {
        color: inputs.color.value,
        roughness: inputs.roughness.value
    }
}

const mix = (inputs) => {
    console.log("mix")
    let color1 = inputs.color1.value;
    let color2 = inputs.color2.value;

    if (color1 && typeof color1 === 'string') {
        color1 = new Color(color1);
    }

    if (color2 && typeof color2 === 'string') {
        color2 = new Color(color2);
    }

    const fraction = inputs.fraction.value;
    const result = color1.clone().lerp(color2, fraction);
    return {
        result: result
    }
}

const nodeFunctions = {add, shader, color, mix, float};
export default nodeFunctions;