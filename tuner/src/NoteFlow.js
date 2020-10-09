import React, { useRef, useEffect } from 'react'

import VexFlow from 'vexflow'
import Animate from './backend/Animate'

const VF = VexFlow.Flow
const { Formatter, Renderer, Stave, StaveNote } = VF


export default props => {
    const containerRef = useRef(null)

    const { ...rest } = props

    useEffect(() => {

        //var renderer = new VF.Renderer(divRef.current, VF.Renderer.Backends.SVG)
        var renderer = new VF.Renderer(containerRef.current, VF.Renderer.Backends.CANVAS)

        renderer.resize(500, 500);
        const context = renderer.getContext();
        context.setFont("Arial", 10, "").setBackgroundFillStyle("#eed");

        const stave = new VF.Stave(10, 40, 400)

        stave.addClef("treble").addTimeSignature("4/4")

        var notes = [
            // A quarter-note C.
            new StaveNote({ clef: "treble", keys: ["c/4"], duration: "q" }),

            // A quarter-note D.
            new StaveNote({ clef: "treble", keys: ["d/4"], duration: "q" }),

            // A quarter-note rest. Note that the key (b/4) specifies the vertical
            // position of the rest.
            new StaveNote({ clef: "treble", keys: ["b/4"], duration: "qr" }),
        ];

        stave.setContext(context).draw()

        Formatter.FormatAndDraw(context, stave, notes, { auto_beam: true, })

        return Animate(60, (time, frameId) => {
            context.translate(-frameId, 0);
        }).start().stop
    })


    return <canvas ref={containerRef} {...rest} />
}