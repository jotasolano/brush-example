import React, { Component, createRef } from "react";
import Chart from "./chart";

class Container extends Component {
  constructor(props) {
    super(props);
    this.chartRef = createRef();
    this.state = {
      width: 1000,
      height: 400
    };
    this.chart = new Chart(this.state);
  }

  componentDidMount() {
    const { data, onClickCircle } = this.props;
    this.chart.init();
    this.chart.render({ data, onClickCircle });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.data !== this.props.data) {
      const { data, onClickCircle } = this.props;
      this.chart.render({ data, onClickCircle });
    }
  }

  render() {
    return <div className="chart" />;
  }
}

Container.defaultProps = {
  data: []
};

export default Container;
