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
      intervalsBtnState: false,
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
      time: minute + ":" + second + "." + millsecond,
      minute: minute,
      second: second,
      millsecond: millsecond,
    })

    this.setState({
      intervalsStorage: intervalsStorage
    })

    console.log(intervalsStorage);
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
              const prevItem = index - 1;

              if(prevItem < 0) {
                return (
                  <>
                  <div className="intervalRes" key={index}>
                    <div className="order opacity-1"><i className='bi bi-flag-fill'></i>{index + 1}</div>
                    <div className="difference opacity-1">+ {intervalsStorage[0].time}</div>
                    <div className="int-time">{intervalsStorage[0].time}</div>
                  </div>
                  {
                    intervalsStorage.length === index + 1 ? null : <div className="line"></div>
                  }
                  </>
                )
              }
              return (
                <>
                <div className="intervalRes" key={index}>
                  <div className="order opacity-1"><i className='bi bi-flag-fill'></i>{index + 1}</div>
                  <div className="difference opacity-1">+ {`
                    ${item?.minute - intervalsStorage[prevItem].minute}:${item?.second - intervalsStorage[prevItem].second}.${Math.abs(item?.millsecond - intervalsStorage[prevItem].millsecond)}`
                  }</div>
                  <div className="int-time">{item?.time}</div>
                </div>
                {
                  intervalsStorage.length === index + 1 ? null : <div className="line"></div>
                }
                </>
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