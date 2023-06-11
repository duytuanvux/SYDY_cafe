import { Button, Form, Image, Input, InputNumber, Modal, Table, Space} from "antd";
import type { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ItemType } from "../Interfaces/ItemInterface";
import { editItem, removeItem, addItem } from "../Redux/Reducers/ItemReducer";
import { AppDispatch, RootState } from "../Redux/store";

const Management = () => {
  const dispatch = useDispatch<AppDispatch>();

  const listItem: ItemType[] = useSelector(
    (state: RootState) => state.item.items
  );
  

  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const [modalData, setModalData] = useState<ItemType>();

  const [dataSource, setDataSource] = useState<ItemType[]>();

  useEffect(() => setDataSource(listItem), [listItem]);

  const showModal = (item?: ItemType) => {
    setModalData(item);
    setModalOpen(true);
  };
  const handleCancel = () => {
    setModalOpen(false);
  };

  const handleFinish = (item: ItemType) => {
    if (item._id) {
      dispatch(editItem(item));
    } else {
      dispatch(addItem(item));
    }
    setModalOpen(false);
  };
  const handleRemoveItem = (item: ItemType) => {
    dispatch(removeItem(item));
  };

  const handleSearch = (e: any) => {
    const currentVal = e.target.value;
    const filterData = listItem.filter((entry) =>
      entry.name.toLowerCase().trim().includes(currentVal.toLowerCase().trim())
    );
    if (filterData) {
      setDataSource(filterData);
    } else {
      setDataSource(listItem);
    }
  };
  const columns: ColumnsType<ItemType> = [
    {
      title: "Id",
      dataIndex: "_id",
      key: "_id",
      align: "center",
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "Hình ảnh",
      dataIndex: "img",
      key: "img",
      align: "center",
      render: (item) => <Image width={200} src={item} alt="" />,
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      align: "center",
    },
    {
      title: "Hành động",
      key: "action",
      align: "center",
      render: (item) => (
        <div className="flex gap-3 items-center justify-center">
          <Button onClick={() => showModal(item)}>Sửa</Button>
          <Button
            type="primary"
            onClick={() => {
              handleRemoveItem(item);
            }}
            danger
          >
            Xóa
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col items-center">
      <div className="text-center uppercase m-5 text-4xl">Quản lý sản phẩm</div>
      <div className="flex justify-center w-1/2 p-5 gap-5">
        <Button onClick={() => showModal()}>Thêm sản phẩm</Button>
        <Input placeholder="Tìm kiếm" onChange={handleSearch} />
      </div>
      <Table
        columns={columns}
        dataSource={dataSource}
        bordered={true}
        size="middle"
        sticky
        rowKey="_id"
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
          onFinish={handleFinish}
          initialValues={{ name: modalData?.name, price: modalData?.price }}
        >
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-center">
              <img className="item-img" src={modalData?.img} alt="" />
                <Space direction="vertical">
                <Form.Item label="ID" name="_id" initialValue={modalData?._id}>
                  <InputNumber style={{width : "100%"}} disabled />
                </Form.Item>
                <Form.Item
                  label="Name"
                  name="name"
                  rules={[
                    { required: true, message: "Please fill this field." },
                  ]}
                >
                  <Input style={{width : "100%"}} />
                </Form.Item>
                <Form.Item
                  label="Price"
                  name="price"
                  rules={[
                    { required: true, message: "Please fill this field." },
                  ]}
                >
                  <InputNumber style={{width : "100%"}} controls={false} />
                </Form.Item>
                </Space>
              
            </div>
            <Button htmlType="submit">
              {modalData ? "Cập nhật sản phẩm" : "Thêm sản phẩm"}
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default Management;
