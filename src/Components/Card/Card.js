import React from 'react';
import { Card } from 'antd';
import PropTypes from 'prop-types';

const CustomCard = ({ title, bordered, width, children }) => (
  <Card
    title={title}
    bordered={bordered}
    style={{
      width: width,
      margin:"10px"
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
