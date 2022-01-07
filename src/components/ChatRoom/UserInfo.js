import { Avatar, Button, Typography } from 'antd'
import React, {  useContext } from 'react'
import styled from 'styled-components'
import { auth } from '../../firebase/config'
import { AuthContext } from '../../context/AuthProvider'
const WrapperStyled = styled.div`
   display:flex;
   justify-content:space-between;
   padding:16px 12px;
   border: 1px solid rgba(82,38,83)
`


const UserInfo = () => {
   const { user: { displayName, photoURL } } = useContext(AuthContext)
   return (
      <WrapperStyled>
         <div>
            <Avatar src={photoURL}>
               {photoURL ? '' : displayName?.charAt(0).toUpperCase()}
            </Avatar>
            <Typography.Text style={{ color: "#fff" }}>{displayName}</Typography.Text>
         </div>
         <Button ghost onClick={() => auth.signOut(``)}>Đăng xuất</Button>
      </WrapperStyled>
   )
}
export default UserInfo