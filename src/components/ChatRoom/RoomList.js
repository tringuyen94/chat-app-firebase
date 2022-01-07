import React, { useContext } from 'react'
import { Button, Collapse, Typography } from 'antd'
import styled from 'styled-components'
import { PlusSquareOutlined } from '@ant-design/icons'

import { AppContext } from '../../context/AppProvider'
import AddRoom from '../AddRoom'

const { Panel } = Collapse

const PanelStyled = styled(Panel)`
   &&&{
      .ant-collapse-header, p{
         color :#fff
      }
      .ant-collapse-content-box{
         padding:0 40px;
      }
      .add-room-btn{
         color:#fff;
      }
   
   }
`
const LinkStyled = styled(Typography.Link)`
   display:block;
   margin-bottom:5px;
   color:#fff
`
const RoomList = () => {
   const { setIsAddRoomVisible, setSelectedRoomId } = useContext(AppContext)

   const { rooms } = useContext(AppContext)

   return (
      <Collapse ghost defaultActiveKey={['1']}>
         <PanelStyled header="Danh sách các phòng" key='1' >
            {rooms && rooms.map((room) => <LinkStyled
               key={room.id} onClick={() => setSelectedRoomId(room.id)}>{room.name}</LinkStyled>)}
            <Button type="text" icon={<PlusSquareOutlined />}
               className="add-room-btn" onClick={() => setIsAddRoomVisible(true)}>Thêm phòng</Button>
            <AddRoom />
         </PanelStyled>
      </Collapse>
   )
}
export default RoomList