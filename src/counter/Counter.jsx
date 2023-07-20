import { Component } from 'react'

class Counter extends Component {
  state = { count: 0 }

  changeRes = (props) => { this.setState({ count: props == 0 ? 0 : this.state.count + props }) }

  render() {
    return (
      <div className='container'>
        <div className="row">
          <div className="title">
            <h1>Counter: {this.state.count}</h1>
          </div>
        </div>
        <div className="row">
          <button className="btn btn-success p-1" onClick={() => this.changeRes(1)}>
            + 1
          </button>
          <button className="btn btn-default p-1" onClick={() => this.changeRes(0)}>
            Reset
          </button>
          <button className="btn btn-danger p-1" onClick={() => this.changeRes(-1)}>
            - 1
          </button>
        </div>
      </div>
    )
  }
}

export default Counter