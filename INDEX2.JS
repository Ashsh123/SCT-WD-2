class Stopwatch {
    constructor() {
      this.startTime = 0;
      this.elapsedTime = 0;
      this.timerInterval = null;
      this.isRunning = false;
      this.laps = [];
    }
  
    start() {
      if (!this.isRunning) {
        this.startTime = Date.now() - this.elapsedTime;
        this.timerInterval = setInterval(this.update.bind(this), 10);
        this.isRunning = true;
      }
    }
  
    pause() {
      if (this.isRunning) {
        clearInterval(this.timerInterval);
        this.elapsedTime = Date.now() - this.startTime;
        this.isRunning = false;
      }
    }
  
    reset() {
      clearInterval(this.timerInterval);
      this.startTime = 0;
      this.elapsedTime = 0;
      this.isRunning = false;
      this.laps = [];
      this.updateDisplay('00:00:00.00');
      this.updateLapList();
    }
  
    recordLap() {
      if (this.isRunning) {
        const lapTime = this.formatTime(this.elapsedTime);
        this.laps.push(lapTime);
        this.updateLapList();
      }
    }
  
    update() {
      this.elapsedTime = Date.now() - this.startTime;
      this.updateDisplay(this.formatTime(this.elapsedTime));
    }
  
    formatTime(milliseconds) {
      const date = new Date(milliseconds);
      return date.toISOString().substr(11, 12);
    }
  
    updateDisplay(timeString) {
      document.getElementById('display').textContent = timeString;
    }
  
    updateLapList() {
      const lapList = document.getElementById('lapList');
      lapList.innerHTML = this.laps.map((lap, index) => 
       `<div>Lap ${index + 1}: ${lap}</div>`
      ).join('');
    }
  }
  
  // Event Listeners
  const stopwatch = new Stopwatch();
  document.getElementById('startBtn').addEventListener('click', () => stopwatch.start());
  document.getElementById('pauseBtn').addEventListener('click', () => stopwatch.pause());
  document.getElementById('resetBtn').addEventListener('click', () => stopwatch.reset());
  document.getElementById('lapBtn').addEventListener('click', () => stopwatch.recordLap());