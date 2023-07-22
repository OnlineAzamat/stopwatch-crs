import { Component } from 'react'
import './App.css'

class App extends Component {
  state = {
    millsecond: 0, 
    second: 0, 
    minute: 0, 
    hour: 0, 
    interval: "", 
    millSecTimer: "", 
    playBtnState: true, 
    pauseBtnState: false, 
    clearBtnState: false,
    intervalsBtnState: false,
    intervalsStorage: [],
  }

  play = () => {
    let timer = setInterval(() => {
      const { second, minute, hour } = this.state;

      if(second === 59) {
        if(minute === 59) {
          this.setState({
            second: 0,
            minute: 0,
            hour: hour + 1,
          })
        } else {
          this.setState({
            second: 0,
            minute: minute + 1
          })
        }
      } else {
        this.setState({
          second: second + 1
        })
      }
    }, 1000)

    let millSecTimer = setInterval(()=> {
      if(this.state.millsecond === 99) {
        this.setState({
          millsecond: 0
        })
      } else {
        this.setState({
          millsecond: this.state.millsecond + 1
        })
      }
    }, 10)

    this.setState({
      interval: timer,
      millSecTimer: millSecTimer,
      playBtnState: false, 
      pauseBtnState: true, 
      clearBtnState: false,
      intervalsBtnState: true,
    })

  }

  pause = () => {
    clearInterval(this.state.interval)
    clearInterval(this.state.millSecTimer)
    this.setState({
      playBtnState: true, 
      pauseBtnState: false, 
      clearBtnState: true,
    })
  }

  clear = () => {
    this.setState({
      playBtnState: true, 
      pauseBtnState: false, 
      clearBtnState: false,
      millsecond: 0,
      second: 0,
      minute: 0,
      hour: 0,
      intervalsStorage: []
    })
  }

  intervalClicked = () => {
    const { intervalsStorage, second, minute, millsecond, } = this.state;

    intervalsStorage.push({
      waqit: minute + ":" + second + "." + millsecond,
      minute: minute,
      second: second,
      millsecond: millsecond,
    })

    this.setState({
      intervalsStorage: intervalsStorage
    })
  }

  render() {
    const { hour, second, minute, millsecond, playBtnState, pauseBtnState, clearBtnState, intervalsBtnState, intervalsStorage } = this.state;

    return (
      <div className='container'>
        <div className="row">
          <div className="time">{hour >= 1 ? hour + ":" : ""}{minute < 10 ? "0" + minute : minute}:{second < 10 ? "0" + second : second}.{millsecond < 10 ? "0" + millsecond : millsecond}</div>
        </div>
        <div className="timer-container">
          {
            intervalsStorage.map((item, index) => {
              if (index === 0) {
                return null
              }
              return (
                <div className="intervalRes" key={index}>
                  <div className="order opacity-1"><i className='bi bi-flag-fill'></i>{index + 1}</div>
                  {/* difference */}
                  <div className="difference opacity-1">+ {
                  item?.minute - intervalsStorage[index - 1]?.minute + ":" + 
                  item?.second - intervalsStorage[index - 1]?.second + "." +
                  item?.millsecond - intervalsStorage[index - 1]?.millsecond
                  }</div>
                  <div className="int-time">{item?.waqit}</div>
                </div>
              )
            })
          }
        </div>
        <div className="row control-btns">
          <button className={clearBtnState ? "control-btn active" : "control-btn disable"} onClick={this.clear}>
            <i className="bi bi-stop-fill"></i>
          </button>
          <button className={intervalsBtnState ? "control-btn active" : "control-btn disable"} onClick={this.intervalClicked}>
            <i className="bi bi-flag-fill"></i>
          </button>
          <button className={playBtnState ? "control-btn active" : "control-btn disable"} onClick={this.play}>
            <i className="bi bi-play-fill"></i>
          </button>
          <button className={pauseBtnState ? "control-btn active" : "control-btn disable"} onClick={this.pause}>
            <i className="bi bi-pause-fill"></i>
          </button>
        </div>
      </div>
    )
  }
}

export default App