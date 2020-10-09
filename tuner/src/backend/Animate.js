const Animate = (fps, draw) => {

    const start = () => {
        let frameCount = 0
        let animationFrameId

        const startDate = Date.now()
        var lastUpdate = startDate
        this.animationFrameId = startDate

        function render() {
            var now = Date.now()
            var elapsedMils = now - lastUpdate

            if (elapsedMils >= (1000 / fps)) {
                frameCount++;
                if (draw) {
                    draw({
                        elapsed: now - startDate,
                        frameId: frameCount,
                    })
                }
                lastUpdate = now - elapsedMils % (1000 / fps)
            }
            this.animationFrameId = window.requestAnimationFrame(render)
        }
        render()

        return this
    }


    const stop = () => {
        console.log(this.animationFrameId)
        window.cancelAnimationFrame(animationFrameId)
    }

    return this
}

export default Animate
