import { Table } from "antd";

const CustomTable = ({ dataSource, columns, footer, expandable, bordered }) => {
  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      pagination={false}
      footer={footer}
      expandable={expandable}
      bordered={bordered}
    />
  );
};

export default CustomTable;
