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
    <Row className="pharm-table-footer" gutter={2}>
      <Col span={8}>
        <Space style={{ paddingTop: "7px" }} direction="horizontal">
          <p>Show per page</p>
          <select
            className="items-per-page-dropdown"
            value={limit}
            onChange={(e) => handleLimitChange(e.target.value)}
          >
            {[10, 15, 20].map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </Space>
      </Col>

      <Col className="pagination-col-right-txt" span={14}>
        <div className="pagination-col-right">
          <p className="pagination-txt">
            Showing {page} - {Math.ceil(totalItems / limit)} of {totalItems}
          </p>

          <Pagination
            itemRender={itemRender}
            current={page}
            pageSize={limit}
            total={totalItems}
            onChange={handlePageChange}
            size="small"
            showLessItems
          />
        </div>
      </Col>
    </Row>
  );
};

export default PaginationComponent;
