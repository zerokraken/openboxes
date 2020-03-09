import PropTypes from 'prop-types';
import React from 'react';
import { Line, Bar, Doughnut, HorizontalBar } from 'react-chartjs-2';
import { SortableElement, sortableHandle } from 'react-sortable-hoc';
import LoadingCard from './LoadingCard';

import { loadColors } from '../../../assets/dataFormat/dataLoading';

const Numbers = ({ data }) => (
  <div className="gyrIndicator">
    <div className="numberIndicator">
      <div className="value">
        <div className="circle green" /> {data.green.value}
      </div>
      <div className="subtitle">{data.green.subtitle}</div>
    </div>
    <div className="numberIndicator">
      <div className="value">
        <div className="circle yellow" /> {data.yellow.value}
      </div>
      <div className="subtitle">{data.yellow.subtitle}</div>
    </div>
    <div className="numberIndicator">
      <div className="value">
        <div className="circle red" /> {data.red.value}
      </div>
      <div className="subtitle">{data.red.subtitle}</div>
    </div>
  </div>
);

const DragHandle = sortableHandle(() => (
  <span className="dragHandler">::</span>
));

let graphClass = 'graphCard';
const GraphCard = SortableElement(({ cardId, cardTitle, cardType, cardLink, data, reloadIndicator }) => {
  let graph;
  const stackedBar = {
    scales: {
      xAxes: [{
        stacked: true
      }],
      yAxes: [{
        stacked: true
      }]
    }
  }
  if (cardType === 'line') {
    data.datasets = loadColors(data, cardId);
    graph = <Line data={data} />;
    graphClass = 'graphCard';
  } else if (cardType === 'bar') {
    data.datasets = loadColors(data, cardId);
    graph = <Bar data={data} options={cardId === 1 ? null : stackedBar} />;
    graphClass = 'graphCard';
  } else if (cardType === 'doughnut') {
    data.datasets = loadColors(data, cardId);
    graph = <Doughnut data={data} />;
    graphClass = 'graphCard';
  } else if (cardType === 'horizontalBar') {
    data.datasets = loadColors(data, cardId);
    graph = <HorizontalBar data={data} />;
    graphClass = 'graphCard';
  } else if (cardType === 'numbers') {
    graph = <Numbers data={data} />;
    graphClass = 'graphCard';
  } else if (cardType === 'loading') {
    graph = <LoadingCard />;
    graphClass = 'graphCard';
  } else if (cardType === 'error') {
    graph = <i className="fa fa-repeat" />;
    graphClass = 'graphCard errorCard';
  }

  return (
    <div className={graphClass}>
      <div className="headerCard">
        {cardLink ?
          <a href={cardLink} className="titleLink"> {cardTitle} </a>
          :
          <span className="titleLink"> {cardTitle} </span>
        }
        <DragHandle />
      </div>
      <div className="contentCard">
        <div className="dataFilter">
          <select
            className="customSelect"
            onChange={e => reloadIndicator(cardId, "querySize=" + e.target.value)}
          >
            <option value="6">Last 6 Months</option>
            <option value="12">Last Year</option>
            <option value="24">Last 2 Years</option>
          </select>
        </div>
        {graph}
      </div>
    </div>
  );
});

export default GraphCard;

GraphCard.propTypes = {
  cardTitle: PropTypes.string.isRequired,
  cardType: PropTypes.string.isRequired,
  data: PropTypes.any.isRequired,
};