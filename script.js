const body = d3.select("body");

const width = 500;
const height = 300;
const margin = {top: 20, right: 30, bottom: 40, left: 40 };

const svg = body.append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", 'translate(${margin.left, ${margin.top}');

const data = [
    { name: "A", value: 30 },
    { name: "B", value: 80 },
    { name: "C", value: 45 },
    { name: "D", value: 60 },
    { name: "E", value: 20 },
    { name: "F", value: 90 },
    { name: "G", value: 55 },
];

const x = d3.scaleBand()
    .domain(data.map(d => d.name))
    .range([0, width])
    .padding(0.1);

const y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.value)])
    .nice()
    .range([height, 0]);

svg.selectAll(".bar")
.data(data)
.enter().append("rect")
.attr("class", "bar")
.attr("x", d => x(d.name))
.attr("y", d => y(d.value))
.attr("width", x.bandwidth())
.attr("height", d => height - y(d.value))
.attr("fill", "steelblue");

svg.append("g")
.attr("transform", 'translate(0,${height}')
.call(d3.axisBottom(x));

svg.append("g")
.call(d3.axisLeft(y));

function initialize() {
    const chart = d3.select("#chart");

    chart.selectAll(".bar")
    .data(data)
    .enter()
    .append("div")
    .style("height", d => '${d.value}px')
    .on("mouseover", function() {
        d3.select(this).style("background-color", "orange");
    });
}

document.addEventListener("DOMContentLoaded", initialize);
