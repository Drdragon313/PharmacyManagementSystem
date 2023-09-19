import React from 'react';
import { Card } from 'antd';
import PropTypes from 'prop-types';

const CustomCard = ({ title, bordered, width, children }) => (
  <Card
    title={title}
    bordered={bordered}
    style={{
      width: width,
      height : "33vmin",
      margin:"10px",
      border:"1px solid",
      borderColor:"#707477"
    }}
  >
    {children}
  </Card>
);

CustomCard.propTypes = {
  title: PropTypes.string,
  bordered: PropTypes.bool,
  width: PropTypes.number,
  children: PropTypes.node,
};


export default CustomCard;
