import {useEffect, useState} from "react";
import {useMouse as useOriginalMouse} from '@uidotdev/usehooks'; // Make sure to install and import the hook correctly


export const useMouse = () => {
    const [initialMouseSet, setInitialMouseSet] = useState(false);
    const [originalMouse] = useOriginalMouse();
    const [mouse, setMouse] = useState({x: 0, y: 0});

    useEffect(() => {
        console.log(">>>>> useMouse >> initial  ===>", originalMouse.x, originalMouse.y)
    }, []);

    useEffect(() => {
        if (!initialMouseSet && originalMouse.x === 0 && originalMouse.y === 0) {
            const handleMouseMove = (event: MouseEvent) => {
                console.log(">>>>> useMouse ===>", event.clientX, event.clientY)
                setMouse({x: event.clientX, y: event.clientY})
                setInitialMouseSet(true);
                window.removeEventListener('mousemove', handleMouseMove);
                window.removeEventListener('click', handleMouseMove);
            };

            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('click', handleMouseMove);

            return () => {
                window.removeEventListener('mousemove', handleMouseMove);
                window.removeEventListener('click', handleMouseMove);
            };
        } else {
            setMouse({...originalMouse})
        }
    }, [originalMouse, initialMouseSet]);


    return [mouse];
}