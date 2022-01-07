import React, { Fragment, useContext, useState, useMemo } from 'react'
import { UserAddOutlined } from '@ant-design/icons'
import { Avatar, Button, Tooltip, Form, Input, Alert } from 'antd'
import styled from 'styled-components'
import Message from './Message'
import { AppContext } from '../../context/AppProvider'
import { addDocument } from '../../firebase/services'
import { AuthContext } from '../../context/AuthProvider'
import { useForm } from 'antd/lib/form/Form'
import useFirestore from '../../hooks/useFirestore'



const HeaderStyled = styled.div`
   display:flex;
   justify-content:space-between;
   height:56px;
   padding:0 16px;
   align-items:center;
   border-bottom:1px solid rgb(230,230,230);
   .header{
      &__info{
         display:flex;
         flex-direction:column;
         justify-content:center;
         & unactive{
         }
      }
      &__tilte{
         margin:0;
         font-weight:bold;
      }
      &__description{
         font-size:12px
      }
   }

`
const WrapperStyled = styled.div`
   height:100vh;
`
const ContentStyled = styled.div`
   display:flex;
   flex-direction:column;
   justify-content:flex-end;
   padding:11px;
   height: calc(100% - 56px);
`
const ButtonGroupStyled = styled.div`
   display:flex;
   align-items:center; 
`
const FormStyled = styled(Form)`
   display:flex;
   justify-content:space-between;
   align-items:center;
   padding:2px 2px 2px 0;
   border:1px solid rgb(230,230,230);
   border-radius:2px;
   .ant-form-item{
      flex:1,
      margin-bottom:0
   }
`
const MessagaeListStyled = styled.div`
   max-height:100%;
   overflow-y:auto; 
`
const ChatWindow = () => {
   const { selectedRoom, members, setIsInviteMemberVisible } = useContext(AppContext)
   const { user: { uid, photoURL, displayName } } = useContext(AuthContext)


   const [form] = useForm()
   const [inputValue, setInputValue] = useState('')



   const handleOnChange = (e) => {
      setInputValue(e.target.value)
   }
   const handleOnSubmit = () => {
      addDocument('messages', {
         text: inputValue,
         uid,
         photoURL,
         roomId: selectedRoom.id,
         displayName
      })
      form.resetFields(['message'])
   }

   const messageCondition = useMemo(() => {
      return {
         fieldName: 'roomId',
         operator: '==',
         compareValue: selectedRoom?.id
      }
   }, [selectedRoom?.id])
   const messages = useFirestore('messages', messageCondition)


   return <WrapperStyled>
      {selectedRoom ? <Fragment>
         <HeaderStyled>
            <div className="header__info">
               <p className="header__title"> {selectedRoom.name}</p>
               <span className="header__description">{selectedRoom.description}</span>
            </div>
            <ButtonGroupStyled>
               <Button icon={<UserAddOutlined />} type='text' onClick={() => setIsInviteMemberVisible(true)}>Mời</Button>
               <Avatar.Group size="small" maxCount={2}>
                  {members && members.map(member => <Tooltip key={member.uid} title={member.displayName}> {<Avatar src={member.photoURL}>{
                     member.photoURL ? '' : member.displayName?.charAt(0)?.toUpperCase()
                  }</Avatar>} </Tooltip>)}
               </Avatar.Group>
            </ButtonGroupStyled>
         </HeaderStyled>
         <ContentStyled>
            <MessagaeListStyled>
               {messages.map(mess => <Message key={mess.id}
                  displayName={mess.displayName} text={mess.text}
                  photoURL={mess.photoURL} createdAt={mess.createdAt?.seconds} />)}

            </MessagaeListStyled>
            <FormStyled form={form}>
               <Form.Item name="message">
                  <Input placeholder="Nhập tin nhắn"
                     onChange={handleOnChange}
                     onPressEnter={handleOnSubmit}
                     bordered={false} autoComplete="off" />
               </Form.Item>
               <Button type="primary" onClick={handleOnSubmit}>Gửi </Button>
            </FormStyled>
         </ContentStyled>
      </Fragment> : <Alert message="Hãy chọn 1 phòng" showIcon style={{ margin: "5px" }} />}
   </WrapperStyled>
}

export default ChatWindow