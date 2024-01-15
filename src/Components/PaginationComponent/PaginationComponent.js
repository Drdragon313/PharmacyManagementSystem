import React from "react";
import { Row, Col, Space, Pagination } from "antd";

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
      <Col span={8}>
        <Space style={{ paddingTop: "7px" }} direction="horizontal">
          <p>Show per page</p>
          <select
            className="items-per-page-dropdown"
            value={limit}
            onChange={(e) => handleLimitChange(e.target.value)}
          >
            {[2, 5, 10].map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </Space>
      </Col>

      <Col span={10}>
        <Space direction="horizontal" style={{ marginLeft: "70px" }}>
          Showing
          <p style={{ marginTop: "20px" }}>{page}</p>-
          <p style={{ marginTop: "20px" }}>{Math.ceil(totalItems / limit)}</p>
          <p style={{ marginTop: "20px" }}>of {totalItems}</p>
          <Pagination
            itemRender={itemRender}
            current={page}
            pageSize={limit}
            total={totalItems}
            onChange={handlePageChange}
            size="small"
          />
        </Space>
      </Col>
    </Row>
  );
};

export default PaginationComponent;
