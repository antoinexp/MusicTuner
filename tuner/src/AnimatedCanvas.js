import React, { useRef, useEffect } from 'react'

export default props => {

    const { draw, fps, ...rest } = props
    const canvasRef = useRef(null)

    function resizeCanvasToDisplaySize(canvas) {
        const { width, height } = canvas.getBoundingClientRect()
        if (canvas.width !== width || canvas.height !== height) {
            canvas.width = width
            canvas.height = height
            return true
        }
        return false
    }

    useEffect(() => {

        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        let frameCount = 0
        let animationFrameId

        resizeCanvasToDisplaySize(canvas)

        var lastUpdate = Date.now()

        function render() {
            var now = Date.now()
            var elapsedMils = now - lastUpdate

            if (elapsedMils >= (1000 / fps)) {
                frameCount++;
                if (draw) {
                    draw(context, frameCount)
                }
                lastUpdate = now - elapsedMils % (1000 / fps)
            }
            animationFrameId = window.requestAnimationFrame(render)
        }
        render()

        return () => {
            window.cancelAnimationFrame(animationFrameId)
        }
    }, [draw])

    return <canvas ref={canvasRef} {...rest} />
}

