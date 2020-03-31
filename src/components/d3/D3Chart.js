import * as d3 from "d3";

const menUrl = "https://udemy-react-d3.firebaseio.com/tallest_men.json";
const womenUrl = "https://udemy-react-d3.firebaseio.com/tallest_women.json";

const MARGIN = { TOP: 10, BOTTOM: 50, LEFT: 70, RIGHT: 10 };

const WIDTH = 800 - MARGIN.LEFT - MARGIN.LEFT;
const HEIGHT = 500 - MARGIN.TOP - MARGIN.BOTTOM;

const transitionDuration = 500;

const round5 = x => {
  return Math.ceil(parseFloat(x) / 5) * 5;
};

export default class D3Chart {
  constructor(element) {
    this.svg = d3
      .select(element)
      .append("svg")
      .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
      .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
      .append("g")
      .attr("transform", `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`);

    this.svg
      .append("text")
      .attr("x", WIDTH / 2)
      .attr("y", HEIGHT + 50)
      .attr("text-anchor", "middle")
      .text("The world's tallest men");

    this.svg
      .append("text")
      .attr("x", -HEIGHT / 2)
      .attr("y", -50)
      .attr("text-anchor", "middle")
      .text("Height in cm")
      .attr("transform", "rotate(-90)");

    this.xAxisGroup = this.svg
      .append("g")
      .attr("transform", `translate(0, ${HEIGHT})`);

    this.yAxisGroup = this.svg.append("g");

    Promise.all([d3.json(menUrl), d3.json(womenUrl)]).then(([men, women]) => {
      let flag = true;
      this.data = women;
      this.update();

      d3.interval(() => {
        this.data = flag ? men : women;
        flag = !flag;
        this.update();
      }, 1000);
    });
  }

  update() {
    const y = d3
      .scaleLinear()
      .domain([
        d3.min(this.data, d => d.height * 0.95),
        round5(d3.max(this.data, d => d.height))
      ])
      .range([HEIGHT, 0]);

    const x = d3
      .scaleBand()
      .domain(this.data.map(d => d.name))
      .range([0, WIDTH])
      .padding(0.4);

    const xAxisCall = d3.axisBottom(x);
    this.xAxisGroup.transition().duration(transitionDuration).call(xAxisCall);

    const yAxisCall = d3.axisLeft(y);
    this.yAxisGroup.transition().duration(transitionDuration).call(yAxisCall);

    // data join
    const rects = this.svg.selectAll("rect").data(this.data);

    // exit
    rects
      .exit()
      .transition()
      .duration(transitionDuration)
      .attr("y", HEIGHT)
      .attr("height", 0)
      .remove();

    // update
    rects
      .transition()
      .duration(transitionDuration)
      .attr("x", d => x(d.name))
      .attr("y", d => y(d.height))
      .attr("width", x.bandwidth)
      .attr("height", d => HEIGHT - y(d.height));

    // enter
    rects
      .enter()
      .append("rect")
      .attr("x", d => x(d.name))
      .attr("width", x.bandwidth)
      .attr("fill", "grey")
      .attr("y", HEIGHT)
      .transition()
      .duration(transitionDuration)
      .attr("y", d => y(d.height))
      .attr("height", d => HEIGHT - y(d.height));
  }
}
