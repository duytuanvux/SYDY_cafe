import { Table, Image, Button, Modal } from "antd";
import type { ColumnsType } from "antd/es/table";
import { ItemType } from "../Interfaces/ItemInterface";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/store";
import { getItems } from "../Redux/APIRequest";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { removeItem } from "../Redux/APIRequest";

const Management = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    getItems(dispatch);
  }, []);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const showModal = () => {
    setModalOpen(true)
  }
  const handleCancel = () => {
    setModalOpen(false)
  }
  const handleOk = () => {
    setModalOpen(false)
  }
  const columns: ColumnsType<ItemType> = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      align: "center",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "Image",
      dataIndex: "img",
      key: "img",
      align: "center",
      render: (item) => <Image width={200} src={item} alt="" />,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      align: "center",
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (item) => (
        <div className="flex gap-3 items-center justify-center">
          <Button onClick={showModal}>Sửa</Button>
          <Button type="primary" onClick={() => removeItem(item.id)} danger>
            Xóa
          </Button>
        </div>
      ),
    },
  ];

  const listItem = useSelector((state: RootState) => state.item.items);
  return (
    <div>
      <div className="text-center uppercase m-5 text-4xl">Quản lý sản phẩm</div>
      <Table
        columns={columns}
        dataSource={listItem}
        bordered={true}
        size="middle"
        sticky
        rowKey="id"
      />
      <Modal open={modalOpen} onOk={handleOk} onCancel={handleCancel} centered>
        <p>sth here</p>
      </Modal>
    </div>
  );
};

export default Management;
