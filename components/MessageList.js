import { ScrollView } from 'react-native'
import MessageItem from "./MessageItem"

const MessageList = ({messages, currentUser, scrollViewRef}) => {
  return (
    <ScrollView 
      showsVerticalScrollIndicator = {false}
      contentContainerStyle = {{paddingTop: 10}}
      ref={scrollViewRef}
    >
      {
        messages.map((message, index) => {
          return (
            <MessageItem message={message} key={index} currentUser={currentUser}/>
          )
        })
      }
    </ScrollView>
  )
}

export default MessageList