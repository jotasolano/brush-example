import React, { Component } from "react";
import ReactDOM from "react-dom";

import Chart from "./Chart";
import { dataArray1 } from "./Data/Data";

import "./styles.css";

const dataArray2 = [50, 55, 45, 35, 20, 25, 25, 11, 50, 64];
const gData = { set1: dataArray1, set2: dataArray2 };

class App extends Component {
  state = { data: dataArray1, setIndex: "set1", activeCirlce: null };

  clickElement(circle) {
    this.setState({ activeCirlce: circle });
  }

  changeDataSet() {
    const { setIndex } = this.state;
    const i = setIndex === "set1" ? "set2" : "set1";
    this.setState({ data: gData[setIndex], setIndex: i });
  }

  render() {
    const { data, activeCirlce } = this.state;
    return (
      <div className="App">
        <button onClick={this.changeDataSet.bind(this)}>Change data</button>
        <Chart data={data} onClickCircle={this.clickElement.bind(this)} />
        <div>{activeCirlce}</div>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
