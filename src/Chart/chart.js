import * as d3 from "d3";

const parseDate = d3.timeParse("%b %Y");

const margin = { top: 20, right: 20, bottom: 110, left: 40 };
const margin2 = { top: 430, right: 20, bottom: 30, left: 40 };

const width = 860 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;
const height2 = 500 - margin2.top - margin2.bottom;

const x = d3.scaleTime().range([0, width]);
const x2 = d3.scaleTime().range([0, width]);
const y = d3.scaleLinear().range([height, 0]);
const y2 = d3.scaleLinear().range([height2, 0]);

const xAxis = d3.axisBottom(x);
const xAxis2 = d3.axisBottom(x2);
const yAxis = d3.axisLeft(y);

const zoom = d3
  .zoom()
  .scaleExtent([1, Infinity])
  .translateExtent([[0, 0], [width, height]])
  .extent([[0, 0], [width, height]]);
// .on("zoom", zoomed);

const brush = d3.brushX().extent([[0, 0], [width, height2]]);
// .on("brush end", brushed);

const area = d3
  .area()
  .curve(d3.curveMonotoneX)
  .x(d => x(parseDate(d.date)))
  .y0(height)
  .y1(d => y(+d.price));

const area2 = d3
  .area()
  .curve(d3.curveMonotoneX)
  .x(d => x(parseDate(d.date)))
  .y0(height2)
  .y1(d => y2(+d.price));

class Chart {
  nodesUpdate = null;
  nodesEnter = null;
  data = null;
  brushed = null;

  //   this.brush = d3.brushX().extent([[0, 0], [width, height2]])
  // .on("brush end", brushed);

  // TODO
  // BRUSHED IS OUT OF SCOPE. I SUCK AT JS CLASSES
  brushed() {
    if (d3.event.sourceEvent && d3.event.sourceEvent.type === "zoom") return; // ignore brush-by-zoom
    var s = d3.event.selection || x2.range();
    x.domain(s.map(x2.invert, x2));
    this.focus.select(".area").attr("d", area);
    this.focus.select(".axis--x").call(xAxis);
    // this.svg.select(".zoom").call(zoom.transform, d3.zoomIdentity
    //     .scale(width / (s[1] - s[0]))
    //     .translate(-s[0], 0));
  }

  init() {
    // Chart.brushed;
    this.svg = d3
      .select(".chart")
      .append("svg")
      .attr("width", 660)
      .attr("height", 500);

    this.svg
      .append("defs")
      .append("clipPath")
      .attr("id", "clip")
      .append("rect")
      .attr("width", width)
      .attr("height", height);

    this.focus = this.svg
      .append("g")
      .attr("class", "focus")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    this.context = this.svg
      .append("g")
      .attr("class", "context")
      .attr("transform", `translate(${margin2.left}, ${margin2.top})`);

    this.chartCont = this.svg.append("g");
  }

  render({ data, onClickCircle }) {
    x.domain(d3.extent(data, d => parseDate(d.date)));
    y.domain([0, d3.max(data, d => +d.price)]);
    x2.domain(x.domain());
    y2.domain(y.domain());

    this.focus
      .append("path")
      .datum(data)
      .attr("class", "area")
      .attr("d", area);

    this.focus
      .append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

    this.focus
      .append("g")
      .attr("class", "axis axis--y")
      .call(yAxis);

    //CONTEXT
    this.context
      .append("path")
      .datum(data)
      .attr("class", "area")
      .attr("d", area2);

    this.context
      .append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height2 + ")")
      .call(xAxis2);

    this.context.append("g").attr("class", "brush");
    // .call(brush)
    // .call(brush.move, x.range());

    // this.chartCont
    //   .selectAll("circle")
    //   .data(data)
    //   .join(
    //     enter =>
    //       enter
    //         .append("circle")
    //         .attr("cx", function(d, i) {
    //           var spacing = lineLength / data.length;
    //           return xBuffer + i * spacing;
    //         })
    //         .attr("cy", yBuffer)
    //         .attr("r", 0)
    //         .call(enter =>
    //           enter.transition(500).attr("r", d => {
    //             return d;
    //           })
    //         ),
    //     update =>
    //       update.call(update =>
    //         update
    //           .transition(500)
    //           .attr("cx", function(d, i) {
    //             var spacing = lineLength / data.length;
    //             return xBuffer + i * spacing;
    //           })
    //           .attr("cy", yBuffer)
    //           .attr("r", d => {
    //             return d;
    //           })
    //       ),
    //     exit =>
    //       exit.call(exit =>
    //         exit
    //           .transition(300)
    //           .attr("r", 0)
    //           .remove()
    //       )
    //   )
    //   .on("click", (d, i) => {
    //     onClickCircle(d);
    //   });
  }
}

export default Chart;
