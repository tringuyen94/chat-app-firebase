import React from 'react'
import { Row, Col, Typography, Button } from 'antd'
import firebase, { auth } from '../../firebase/config'
import { addDocument, generateKeywords } from '../../firebase/services'

const fbProvider = new firebase.auth.FacebookAuthProvider()
const { Title } = Typography


const Login = () => {
   const handleFbLogin = async () => {
      const { additionalUserInfo, user } = await auth.signInWithPopup(fbProvider)
      if (additionalUserInfo?.isNewUser) {
         addDocument('users', {
            displayName: user.displayName,  
            uid: user.uid,
            photoURL: user.photoURL,
            email: user.email,
            providerId: additionalUserInfo.providerId,
            keywords:generateKeywords(user.displayName)
         })
      }
   }

   return (
      <div>
         <Row justify='center'>
            <Col span={8}>
               <Title style={{ textAlign: "center" }} >Mikey The Chat</Title>
               <Button style={{ width: "100%", marginBottom: 5 }} onClick={handleFbLogin}>Login with Facebook</Button>
               <Button style={{ width: "100%" }}>Login with Google</Button>
            </Col>
         </Row>

      </div>
   )
}

export default Login