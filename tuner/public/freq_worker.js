console.log("starting worker");





self.onmessage = async ($event) => {
    if ($event && $event.data && $event.data.msg === 'incApple') {
        const newCounter = incApple($event.data.countApple);
        self.postMessage(newCounter);
    }
    if ($event.data.msg === 'start') {
        console.log("received start");
    }
};

function incApple(countApple) {
    const start = Date.now();
    while (Date.now() < start + 5000) {
    }
    return countApple + 1;
}