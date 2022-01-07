import React, { useContext } from "react";

import { Input, Modal, Form } from "antd";
import { AppContext } from "../../context/AppProvider";
import { AuthContext } from "../../context/AuthProvider";
import { addDocument } from "../../firebase/services";


const AddRoom = ({ }) => {
   const { isAddRoomVisible, setIsAddRoomVisible } = useContext(AppContext)
   const { user: { uid } } = useContext(AuthContext)
   const [form] = Form.useForm()
   const handleOk = () => {
      addDocument('rooms', { ...form.getFieldValue(), members: [uid] })
      setIsAddRoomVisible(false)
      form.resetFields()
   }
   const handleCancel = () => {
      form.resetFields()
      setIsAddRoomVisible(false)
   }
   return (
      <Modal
         title="Tạo phòng mới"
         visible={isAddRoomVisible}
         onOk={handleOk}
         onCancel={handleCancel}
      >
         <Form form={form}>
            <Form.Item name='name'>
               <Input placeholder="Nhập tên phòng" />
            </Form.Item>
            <Form.Item name="description">
               <Input.TextArea placeholder="Nhập mô tả" />
            </Form.Item>
         </Form>
      </Modal>
   )
}

export default AddRoom