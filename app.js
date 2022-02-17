class State {
    constructor(startTimeStamp, diff, suspended) {
        this.startTimeStamp = startTimeStamp
        this.diff = diff
        this.suspended = suspended
    }

    static ready() {
        return new State(null, 0, 0)
    }
}

class StopWatch {
    constructor(state) {
        this.state = state
        this.requestAnimationId = null
        
        this.handleClickStart = this.handleClickStart.bind(this)
        document
            .getElementById("start-button")
            .addEventListener("click", this.handleClickStart)

        this.handleClickStop = this.handleClickStop.bind(this)
        document
            .getElementById("stop-button")
            .addEventListener("click", this.handleClickStop)

        this.handleClickReset = this.handleClickReset.bind(this)
        document
            .getElementById("reset-button")
            .addEventListener("click", this.handleClickReset)
        
        this.tick = this.tick.bind(this)
        this.render()
    }

    static ready() {
        return new StopWatch(State.ready())
    }

    setState(newState) {
        this.state = {
            ...this.state,
            ...newState
        }
        this.render()
    }

    tick() {
        this.setState({
            diff: new Date(new Date() - this.state.startTimeStamp)
        })
        this.requestAnimationId = requestAnimationFrame(this.tick)
    }

    handleClickStart() {
        if (this.state.startTimeStamp) {
            // başlama tuşuna çok kez basmayı önlemek için
            return;
        }
        this.setState({
            startTimeStamp: new Date() - this.state.suspended,
            suspended: 0
        })
        this.requestAnimationId = requestAnimationFrame(this.tick)
    }

    handleClickStop() {
        cancelAnimationFrame(this.requestAnimationId)
        this.setState({
            startTimeStamp:null,
            suspended:this.state.diff
        })
    }

    handleClickReset() {
        cancelAnimationFrame(this.requestAnimationId)
        this.setState(State.ready())
    }

    render() {
        const {diff} = this.state
//        const hundredths = (
//                diff ? Math.floor(diff.getMilliseconds() / 10) : 0
//            ).toString().padStart(2, "0")
        
        const seconds = (
                diff ? Math.floor(diff.getUTCSeconds()) : 0
            ).toString().padStart(2, "0")
        const minutes = (
                diff ? Math.floor(diff.getUTCMinutes()) : 0
            ).toString().padStart(2, "0")
        
        const hours = (
                diff ? Math.floor(diff.getUTCHours()) : 0
            ).toString().padStart(2, "0")
        
        document.getElementById("hours").textContent = hours
        document.getElementById("minutes").textContent = minutes
        document.getElementById("seconds").textContent = seconds
//        document.getElementById("hundredths").textContent = hundredths
        console.log(hours)
    }

}


const STOPWATCH = StopWatch.ready()






