import "./styles.css";
import {ReactNode, useEffect, useRef} from "react";
import {select} from "d3-selection";
import {zoom} from "d3-zoom";
import {useStore} from "@/app/store";
import {hasParentClass} from "@/app/utils";

export default function Editor({children}: { children: ReactNode }) {
    const editorContainer = useRef<HTMLDivElement>(null);
    const canvas = useRef<HTMLDivElement>(null);

    let editorBackgroundSize = 40;

    const setEditorScale = useStore((store) => store.setEditorScale);
    const activeConnection = useStore((store) => store.activeConnection);
    const removeActiveConnection = useStore(
        (store) => store.removeActiveConnection,
    );

    const panZoomInstance = zoom()
        .scaleExtent([0.1, 2])
        .on("zoom", (event) => {
            const {transform} = event;
            // select(editorContainer.current).attr("transform", transform);

            setEditorScale(transform.k);

            editorContainer.current.style.backgroundPosition = `${transform.x}px  ${transform.y}px`;
            editorContainer.current.style.backgroundSize = `${
                editorBackgroundSize * transform.k
            }px ${editorBackgroundSize * transform.k}px`;
            editorContainer.current.style.setProperty("--bg-opacity", transform.k);

            canvas.current.style.transform = `matrix(${transform.k}, 0, 0, ${transform.k}, ${transform.x}, ${transform.y})`;
        })
        .filter((event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (hasParentClass(event, "no-pan") && event.type !== "wheel") {
                return false;
            } else {
                return true;
            }
        });

    useEffect(() => {
        const nodeSelection = select(editorContainer.current);
        nodeSelection.call(panZoomInstance);
    }, [panZoomInstance]);

    const handleEditorClick = (event: any) => {
        if (activeConnection) {
            removeActiveConnection();
        }
    };

    return (
        <div className="flex-1 border-r border-stone-200">

            <div ref={editorContainer} className="editor-container bg-stone-100">
                <div className="bg-gray-100 flex justify-center items-center h-12">
                    <h1 className="font-bold text-blue-950">Editor</h1>
                </div>
                <div
                    ref={canvas}
                    id="canvas"
                    className="absolute top-0 left-0 right-0 bottom-0 origin-top-left"
                    onClick={handleEditorClick}
                >
                    {children}
                </div>
            </div>
        </div>
    );
}
