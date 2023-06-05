import { Table, Image, Button, Modal, Input, Form, InputNumber } from "antd";
import type { ColumnsType } from "antd/es/table";
import { ItemType } from "../Interfaces/ItemInterface";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/store";
import { editItem, getItems } from "../Redux/APIRequest";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { removeItem } from "../Redux/APIRequest";

const Management = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    getItems(dispatch);
  }, []);
  const listItem: ItemType[] = useSelector(
    (state: RootState) => state.item.items
  );
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const [modalData, setModalData] = useState<ItemType>();

  const showModal = (item: ItemType) => {
    setModalData(item);
    setModalOpen(true);
  };
  const handleCancel = () => {
    setModalOpen(false);
  };

  const handleEdit = (item: ItemType) => {
    editItem(item);
    setModalOpen(false);
  };
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
          <Button onClick={() => showModal(item)}>Sửa</Button>
          <Button type="primary" onClick={() => removeItem(item.id)} danger>
            Xóa
          </Button>
        </div>
      ),
    },
  ];

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
      <Modal
        open={modalOpen}
        onCancel={handleCancel}
        destroyOnClose={true}
        footer={null}
        centered
      >
        <Form
          name={modalData?.name}
          onFinish={handleEdit}
          initialValues={{ name: modalData?.name, price: modalData?.price }}
        >
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-center">
              <img className="item-img" src={modalData?.img} alt="" />
              <div className="flex flex-col items-start gap-1">
                <Form.Item label="ID" name="id" initialValue={modalData?.id}>
                  <InputNumber disabled />
                </Form.Item>
                <Form.Item
                  label="Name"
                  name="name"
                  rules={[
                    { required: true, message: "Please fill this field." },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Price"
                  name="price"
                  rules={[
                    { required: true, message: "Please fill this field." },
                  ]}
                >
                  <InputNumber controls={false} />
                </Form.Item>
              </div>
            </div>
            <Button htmlType="submit">Update</Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default Management;
