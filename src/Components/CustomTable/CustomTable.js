import { Table } from "antd";

const CustomTable = ({ dataSource, columns, footer }) => {
  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      pagination={false}
      footer={footer}
    />
  );
};

export default CustomTable;
