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
    intervalsDownState: false,
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
      intervalsDownState: false,
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
      intervalsStorage: intervalsStorage,
      intervalsDownState: true,
    })
  }

  convertObjectToText = () => {
    const text = JSON.stringify(this.state.intervalsStorage)
    return text
  }

  intervalsDownload = (text, filename) => {
    const element = document.createElement("a");
    const file = new Blob([text], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
  }

  render() {
    const { hour, second, minute, millsecond, playBtnState, pauseBtnState, clearBtnState, intervalsBtnState, intervalsStorage, intervalsDownState } = this.state;
    
    return (
      <div className='container'>
        <div className="row">
          <div className="time">{hour >= 1 ? hour + ":" : ""}{minute < 10 ? "0" + minute : minute}:{second < 10 ? "0" + second : second}.{millsecond < 10 ? "0" + millsecond : millsecond}</div>
        </div>
        <div className="timer-container">
          {
            !intervalsStorage[0] ? <p className='not-available'>Please add intervals to start the stopwatch</p> : intervalsStorage.map((item, index) => {
              const prevItem = index - 1;

              return (
                <div key={index} className="intervalRes">
                  <div className="order opacity-1"><i className='bi bi-flag-fill'></i>{index + 1}</div>
                  {
                    prevItem < 0 ? 
                      // first interval
                      <><div className="difference opacity-1">+ {intervalsStorage[0].time}</div><div className="int-time">{intervalsStorage[0].time}</div></> 
                      : 
                      // next intervals
                      <>
                        <div className="difference opacity-1">+ {`
                          ${item?.minute - intervalsStorage[prevItem].minute}:${item?.second - intervalsStorage[prevItem].second}.${Math.abs(item?.millsecond - intervalsStorage[prevItem].millsecond)}`
                        }</div>
                        <div className="int-time">{item?.time}</div>
                      </>
                  }
                  {
                    intervalsStorage.length === index + 1 ? null : <div key={index + "line"} className="line"></div>
                  }
                </div>)
            })
          }
        </div>
        <div className="row control-btns">
          <button title="Clear" className={`control-btn ${clearBtnState ? "active" : "disable"}`} onClick={this.clear}>
            <i className="bi bi-stop-fill"></i>
          </button>
          <button title="Add interval" className={`control-btn ${intervalsBtnState ? "active" : "disable"}`} onClick={this.intervalClicked}>
            <i className="bi bi-flag-fill"></i>
          </button>
          <button title="Start" className={`control-btn ${playBtnState ? "active" : "disable"}`} onClick={this.play}>
            <i className="bi bi-play-fill"></i>
          </button>
          <button title="Pause" className={`control-btn ${pauseBtnState ? "active" : "disable"}`} onClick={this.pause}>
            <i className="bi bi-pause-fill"></i>
          </button>
          <button title="Download to .txt file" className={`control-btn ${intervalsDownState ? "active" : "disable"}`} onClick={() => {
            const text = this.convertObjectToText();
            this.intervalsDownload(text, 'data.txt');
          }}>
            <i className="bi bi-file-arrow-down-fill"></i>
          </button>
        </div>
      </div>
    )
  }
}

export default App