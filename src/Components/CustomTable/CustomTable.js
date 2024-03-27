import { Table } from "antd";

const CustomTable = ({ dataSource, columns, footer, expandable }) => {
  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      pagination={false}
      footer={footer}
      expandable={expandable}
    />
  );
};

export default CustomTable;
