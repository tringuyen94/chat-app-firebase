import React from 'react'
import { Fragment } from 'react'
import ChatWindow from './ChatWindow'
import Sidebar from './Sidebar'
import { Row,Col } from 'antd'
const ChatRoom = () => {
   return (
      <Fragment>
         <Row>
            <Col span={6}>
               <Sidebar/>
            </Col>
            <Col span={18}>
               <ChatWindow/>
            </Col>
         </Row>

      </Fragment>
   )
}

export default ChatRoom