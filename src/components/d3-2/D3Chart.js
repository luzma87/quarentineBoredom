import * as d3 from "d3";

const MARGIN = { TOP: 10, BOTTOM: 80, LEFT: 70, RIGHT: 10 };

const WIDTH = 500 - MARGIN.LEFT - MARGIN.LEFT;
const HEIGHT = 300 - MARGIN.TOP - MARGIN.BOTTOM;

export default class D3Chart {
  constructor(element, data) {
    this.data = data;
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

    this.update();
  }

  update() {
    this.x.domain([0, d3.max(this.data, d => Number(d.age))]);
    this.y.domain([0, d3.max(this.data, d => Number(d.height))]);

    const xAxisCall = d3.axisBottom(this.x);
    const yAxisCall = d3.axisLeft(this.y);

    this.xAxisGroup.call(xAxisCall);
    this.yAxisGroup.call(yAxisCall);

    // data join
    const circles = this.svg.selectAll("circle").data(this.data, d => d.name);

    // exit
    circles.exit().remove();

    // update
    circles.attr("cx", d => this.x(d.age)).attr("cy", d => this.y(d.height));

    // enter
    circles
      .enter()
      .append("circle")
      .attr("cx", d => this.x(d.age))
      .attr("cy", d => this.y(d.height))
      .attr("r", 5)
      .attr("fill", "grey");
  }
}
