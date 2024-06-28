import {useEffect, useState} from "react";
import {useMouse} from "@/app/hooks/useMouse";

import {ConnectionData} from "@/app/components/node/utils";

export function ConnectionTEMP() {
    const [mouse] = useMouse();

    console.log(">>> Outside");

    const updatePositions = () => {
        console.log(">>>> updatePositions");
    };

    useEffect(() => {
        console.log(">> useEffect");
        updatePositions();
    }, [mouse]);

    return (
        <section className="absolute top-0 left-0 bg-orange-300 text-3xl text-blue-950 p-10">
            <h1>x = {mouse.x}</h1>
            <h1>y = {mouse.y}</h1>
        </section>
    );
}
