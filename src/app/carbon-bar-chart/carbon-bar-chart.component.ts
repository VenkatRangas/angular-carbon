import { Component, OnInit, ElementRef, AfterContentInit } from '@angular/core';
import * as d3 from "d3";

@Component({
  selector: 'app-carbonbar',
  templateUrl: './carbon-bar-chart.component.html',
  styleUrls: ['./carbon-bar-chart.component.css']
})
export class CarbonBarChartComponent implements OnInit,AfterContentInit {

  constructor(private chartContainer:ElementRef) {
     console.log("Dom reference for current component",chartContainer);
     console.log('testoing for git');
   }
   private data:any;
   private margin={ top: 30, right: 20, bottom: 60, left: 65 };
   private width = 600 - (this.margin.left + this.margin.right);
   private height = 300 - (this.margin.top + this.margin.bottom);
   private labelOffset = 50;
   private axisOffset = 16;

  ngOnInit() {
    function createData(num) {
      let data = [];
      for (var i = 0; i < num; i++) {
          const randomNum = Math.floor(Math.random() * 1000 + 1);
          let d = new Date();
          d.setDate(d.getDate() - (i * 30));
          data.push({
              date: d,
              amount: randomNum
          });
      }

      return data;
    }

    // Create + Format data
    this.data = createData(12).sort(function(a, b) { return a.date - b.date; });


  }

  ngAfterContentInit(){
    const element=this.chartContainer.nativeElement;

    // const svg1 = d3.select(element).append('svg');
    // what are these and are they things that someone should edit



    // Set Time Format (JAN, FEB, etc..)
    const timeFormat = d3.timeFormat('%b');

    // Set the scales
    const x = d3.scaleBand()
      .rangeRound([0, this.width])
      .domain(this.data.map((d) => d.date))
      .padding(0.5);

    const y = d3.scaleLinear()
      .range([this.height, 0])
      .domain([0, d3.max(this.data, (d) => d.amount)]);

    // // Set the axes
    const xAxis =d3.axisBottom()
      .scale(x)
      .tickSize(0)
      .tickFormat(timeFormat)

    const yAxis = d3.axisLeft()
      .ticks(4) 
      .tickSize(-this.width)
      .scale(y.nice());

    // // Set up SVG with initial transform to avoid repeat positioning
    const svg = d3.select(element.children[1].children[0])
          .attr('class', 'graph')
          .attr('width', this.width + (this.margin.left + this.margin.right))
          .attr('height', this.height + (this.margin.top + this.margin.bottom))
          .append('g')
          .attr('class', 'group-container')
          .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`)
          .attr('font-family', 'ibm-plex-sans');

    // // Add Y axis
    svg.append('g')
      .attr('class', 'axis y')
      .attr('stroke-dasharray', '4')
      .call(yAxis)
      .selectAll('text')
      .attr("x", -this.axisOffset)
      .attr('font-family', 'ibm-plex-sans');

    // // Add Y axis label
    const yLabel = svg.select('.y')
      .append('text')
      .text('USAGE ($)')
      .attr('class', 'label')
      .attr('transform', `translate(${-this.labelOffset}, ${this.height / 2}) rotate(-90)`)
      .attr('font-family', 'ibm-plex-sans');

    // // Add X axis
    svg.append('g')
      .attr('class', 'axis x')
      .attr('transform', `translate(0, ${this.height})`)
      .call(xAxis)
      .selectAll('text')
      .attr("y", this.axisOffset)
      .attr('font-family', 'ibm-plex-sans')

    // // Add X axis label
    const xLabel = svg.select('.x')
      .append('text')
      .text('MONTH')
      .attr('class', 'label')
      .attr('transform', `translate(${this.width / 2}, ${this.labelOffset})`)
      .attr('font-family', 'ibm-plex-sans');

    svg.append('g')
      .attr('class', 'bar-container')
      .selectAll('rect')
      .data(this.data)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', (d) => x(d.date))
      .attr('y', (d) => this.height)
      .attr('height', 0)
      .attr('width', x.bandwidth())
      .attr('fill', '#00A78F')
      .transition()
      .duration(500)
      .delay((d, i) => i * 50)
      .attr('height', (d) => this.height - y(d.amount))
      .attr('y', (d) => y(d.amount));

    // Select Tooltip
    const tooltip = d3.select(element.children[1].children[1]);

    const bars = svg.selectAll('.bar')
      .on('mouseover', function(d) { 

          let color = d3.color('#00A78F').darker()
          d3.select(this)
              .attr('fill', color)
          tooltip
              .style('display', 'none')
              .text(`$${d.amount}`)
              .style('top', `${y(d.amount) - this.axisOffset}px`);

          let bandwidth = x.bandwidth();
          let tooltipWidth = tooltip.nodes()[0].getBoundingClientRect().width;
          let offset = (tooltipWidth - bandwidth) / 2;

          tooltip
              .style('left', `${x(d.date) +30- offset}px`);
      })
      .on('mouseout', function(d) {
          d3.select(this)
              .transition()
              .duration(250)
              .attr('fill', '#00A78F')
          tooltip
              .style('display', 'none')
      })

  }

}
 