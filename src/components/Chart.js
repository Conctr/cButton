// This is the device chart graph using Chart.js
import React from 'react';
import Chart from 'chart.js';
import moment from 'moment';

class ChartComponent extends React.Component {
  componentDidMount() {
    this.createChart(this.props.dataset);
  }

  createChart = (dataset) => {
    const node = this.node;

    new Chart(node, {
      type: 'bar',
      data: {
        labels: this.generateLabels(dataset),
        datasets: [
          {
            label: '# Actions',
            data: dataset,
            backgroundColor: this.generateBarColors(dataset)
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }

  generateBarColors = (dataset) => {
    let barColors = new Array(dataset.length).fill('');

    return barColors.map((el, index) => {
      if (index % 2 === 0) {
        return '#676aB0';
      } else {
        return '#f7c55c';
      }
    });
  }

  generateLabels = (dataset) => {
    let labels = new Array(dataset.length).fill('');

    for (let i = 0; i < dataset.length; i++) {
      labels[i] = moment().subtract(i, 'days').format('DD/MM');
    }
    return labels.reverse();
  }

  render() {
    return (
      <div className="chart-container" style={{ position: 'relative', height: 250, width: '100%' }} >
        <canvas id="chart" ref={node => (this.node = node)} ></canvas>
      </div>
    );
  };
}

export default ChartComponent;