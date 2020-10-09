import React, { useRef, useEffect } from 'react'
import AnimatedCanvas from "./AnimatedCanvas"

export default props => {

    const drawBackground = ctx => {

    }

    const draw = (ctx, frameCount) => {
        drawBackground(ctx)
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        ctx.fillStyle = '#000000'
        ctx.beginPath()
        ctx.arc(50, 100, 20 * Math.sin(frameCount * 0.05) ** 2, 0, 2 * Math.PI)
        ctx.fill()
    }

    return <AnimatedCanvas draw={draw} fps={60} />
}