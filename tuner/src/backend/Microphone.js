var Microphone = () => {

    var bitRate;
    var data;

    navigator.mediaDevices.getUserMedia({ audio: true }).then(
        stream => {

            const fftSize = 4096 * 4;
            const frameRate = 6; // fps

            var audioContext = new AudioContext();
            bitRate = audioContext.sampleRate;

            var inputPoint = audioContext.createMediaStreamSource(stream);

            var analyserNode = audioContext.createAnalyser();
            analyserNode.fftSize = fftSize;
            inputPoint.connect(analyserNode);

            function updateAnalyser(time) {
                const frequencyData = new Uint8Array(analyserNode.frequencyBinCount);
                analyserNode.getByteFrequencyData(frequencyData);
                data = frequencyData.slice();
            }

            setInterval(updateAnalyser, 1000 / frameRate);
        });

}

export default Microphone();
