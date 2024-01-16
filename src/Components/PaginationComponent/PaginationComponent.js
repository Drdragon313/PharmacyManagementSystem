import React from "react";
import { Row, Col, Space, Pagination } from "antd";
import "./PaginationComponent.css";
const PaginationComponent = ({
  limit,
  handleLimitChange,
  page,
  totalItems,
  handlePageChange,
  itemRender,
}) => {
  return (
    <Row className="pharm-table-footer" gutter={4}>
      <Col span={6}>
        <Space style={{ paddingTop: "7px" }} direction="horizontal">
          <p>Show per page</p>
          <select
            className="items-per-page-dropdown"
            value={limit}
            onChange={(e) => handleLimitChange(e.target.value)}
          >
            {[5, 10, 15].map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </Space>
      </Col>

      <Col span={6}>
        <Space direction="horizontal">
          Showing
          <p style={{ marginTop: "20px" }}>{page}</p>-
          <p style={{ marginTop: "20px" }}>{Math.ceil(totalItems / limit)}</p>
          <p style={{ marginTop: "20px" }}> of {totalItems}</p>
          <Pagination
            itemRender={itemRender}
            current={page}
            pageSize={limit}
            total={totalItems}
            onChange={handlePageChange}
            size="small"
            showLessItems
          />
        </Space>
      </Col>
    </Row>
  );
};

export default PaginationComponent;
