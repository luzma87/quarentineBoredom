import * as d3 from "d3";

const MARGIN = { TOP: 10, BOTTOM: 80, LEFT: 70, RIGHT: 10 };

const WIDTH = 500 - MARGIN.LEFT - MARGIN.LEFT;
const HEIGHT = 300 - MARGIN.TOP - MARGIN.BOTTOM;

export default class D3Chart {
  constructor(element, data, onUpdateName) {
    this.onUpdateName = onUpdateName;
    this.svg = d3
      .select(element)
      .append("svg")
      .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
      .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
      .append("g")
      .attr("transform", `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`);

    this.x = d3.scaleLinear().range([0, WIDTH]);
    this.y = d3.scaleLinear().range([HEIGHT, 0]);

    this.xAxisGroup = this.svg
      .append("g")
      .attr("transform", `translate(${0}, ${HEIGHT})`);
    this.yAxisGroup = this.svg.append("g");

    this.svg
      .append("text")
      .attr("x", WIDTH / 2)
      .attr("y", HEIGHT + 40)
      .attr("font-size", 20)
      .attr("text-anchor", "middle")
      .text("Age");

    this.svg
      .append("text")
      .attr("x", -HEIGHT / 2)
      .attr("y", -30)
      .attr("transform", "rotate(-90)")
      .attr("font-size", 20)
      .attr("text-anchor", "middle")
      .text("Height (cm)");

    this.update(data);
  }

  update(data, activeName) {
    this.data = data;
    this.x.domain([0, d3.max(this.data, (d) => Number(d.age))]);
    this.y.domain([0, d3.max(this.data, (d) => Number(d.height))]);

    const xAxisCall = d3.axisBottom(this.x);
    const yAxisCall = d3.axisLeft(this.y);
    const activeColor = "lightgray";
    const inactiveColor = "#A1CEA1";
    const activeBorderColor = "darkgray";
    const inactiveBorderColor = "#56a556";

    this.xAxisGroup.transition(1000).call(xAxisCall);
    this.yAxisGroup.transition(1000).call(yAxisCall);

    // data join
    const circles = this.svg.selectAll("circle").data(this.data, (d) => d.name);

    // exit
    circles.exit().transition(1000).attr("cy", this.y(0)).remove();

    // update
    circles
      .transition(1000)
      .attr("fill", (d) =>
        d.name === activeName ? activeColor : inactiveColor
      )
      .attr("stroke", (d) =>
        d.name === activeName ? activeBorderColor : inactiveBorderColor
      )
      .attr("cx", (d) => this.x(d.age))
      .attr("cy", (d) => this.y(d.height));

    // enter
    circles
      .enter()
      .append("circle")
      .attr("cy", this.y(0))
      .attr("cx", (d) => this.x(d.age))
      .attr("r", 5)
      .attr("stroke", (d) =>
        d.name === activeName ? activeBorderColor : inactiveBorderColor
      )
      .attr("fill", (d) =>
        d.name === activeName ? activeColor : inactiveColor
      )
      .on("click", (d) => this.onUpdateName(d.name))
      .transition(1000)
      .attr("cy", (d) => this.y(d.height));
  }
}
