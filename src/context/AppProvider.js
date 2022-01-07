import React, { createContext, useMemo, useContext, useState } from 'react'
import useFirestore from '../hooks/useFirestore'
import { AuthContext } from './AuthProvider'


export const AppContext = createContext()

const AppProvider = ({ children }) => {
   const { user: { uid } } = useContext(AuthContext)


   const [isAddRoomVisible, setIsAddRoomVisible] = useState(false)
   const [isInviteMemberVisible, setIsInviteMemberVisible] = useState(false)
   const [selectedRoomId, setSelectedRoomId] = useState('')


   const roomsCondition = useMemo(() => {
      return {
         fieldName: 'members',
         operator: 'array-contains',
         compareValue: uid
      }
   }, [uid])

   const rooms = useFirestore('rooms', roomsCondition)


   const selectedRoom = useMemo(() => {
      if (rooms) return rooms.find(room => room.id === selectedRoomId)
   }, [rooms, selectedRoomId])


   const membersOfSelectedRoom = useMemo(() => {
      if (selectedRoom) return selectedRoom.members
   }, [selectedRoom])


   const usersCondition = useMemo(() => {
      if (selectedRoom) return {
         fieldName: 'uid',
         operator: 'in',
         compareValue: membersOfSelectedRoom,
      };
   }, [membersOfSelectedRoom, selectedRoom]);

   const members = useFirestore('users', usersCondition);


   const clearState = () => {
      setSelectedRoomId('');
      setIsAddRoomVisible(false);
      setIsInviteMemberVisible(false);
   };
   return (
      <AppContext.Provider value={{
         rooms,
         selectedRoom,
         selectedRoomId,
         members,
         isAddRoomVisible,
         isInviteMemberVisible,
         setIsAddRoomVisible,
         setSelectedRoomId,
         setIsInviteMemberVisible,
         clearState
      }} >
         {children}
      </AppContext.Provider>
   )
}
export default AppProvider