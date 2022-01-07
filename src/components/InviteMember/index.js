import React, { useContext, useEffect, useMemo, useState } from 'react'
import { Modal, Form, Select, Spin, Avatar } from 'antd'
import { AppContext } from '../../context/AppProvider'
import { debounce } from 'lodash'
import { db } from '../../firebase/config'


function DebounceSelect({ fetchOptions, debounceTimeout = 500, curMembers, ...props }) {
   const [isFetching, setIsFetching] = useState(false)
   const [options, setOptions] = useState([])
   const debounceFetching = useMemo(() => {
      const loadOptions = (value) => {
         setOptions([])
         setIsFetching(true)

         fetchOptions(value, curMembers).then(newOption => {
            setOptions(newOption)
            setIsFetching(false)
         })
      }
      return debounce(loadOptions, debounceTimeout)

   }, [fetchOptions, debounceTimeout])


   useEffect(() => {
      return () => {
         setOptions([])
      }
   }, [])

   return (
      <Select
         labelInValue
         filterOption={false}
         onSearch={debounceFetching}
         notFoundContent={isFetching ? (<Spin size="large" />) : null}
         {...props}
      >
         {options.map(opt => (<Select.Option key={opt.value} value={opt.value} title={opt.label}>
            <Avatar size="small" src={opt.photoURL}>
               {opt.photoURL ? '' : opt.label?.charAt(0)?.toUpperCase()}
            </Avatar>
            {`${opt.label}`}
         </Select.Option>))}
      </Select>
   )
}
async function fetchUserList(search, curMembers) {
   return db.collection('users')
      .where('keywords', 'array-contains', search)
      .orderBy('displayName')
      .limit(10)
      .get()
      .then(snapshot => {
         return snapshot.docs.map(doc => ({
            label: doc.data().displayName,
            photoURL: doc.data().photoURL,
            value: doc.data().uid
         })).filter(opt => !curMembers.includes(opt.value))
      })
}

const InviteMember = () => {
   const [value, setValue] = useState()
   const { isInviteMemberVisible,
      setIsInviteMemberVisible,
      selectedRoomId,
      selectedRoom } = useContext(AppContext)

   const [form] = Form.useForm()

   const handleOk = () => {
      form.resetFields()


      const roomRef = db.collection('rooms').doc(selectedRoomId)
      roomRef.update({
         members: [...selectedRoom.members, ...value.map(val => val.value)]
      })





      setIsInviteMemberVisible(false)
   }
   const handleCancel = () => {
      form.resetFields()
      setIsInviteMemberVisible(false)
   }
   return (
      <Modal
         title="Thêm bạn bè vào phòng chat"
         visible={isInviteMemberVisible}
         onOk={handleOk}
         onCancel={handleCancel}
      >
         <Form form={form} layout="vertical">
            <DebounceSelect
               mode="multiple"
               label="Tên các thành viên"
               placeholder="Nhập tên các thành viên"
               value={value}
               fetchOptions={fetchUserList}
               onChange={newValue => setValue(newValue)}
               style={{ width: "100%" }}
               curMembers={selectedRoom?.members}
            />
         </Form>
      </Modal >
   )
}
export default InviteMember