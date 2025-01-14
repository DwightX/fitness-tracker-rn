import {View, Text, Button} from 'react-native'
import auth from '@react-native-firebase/auth'

const Page = () => {
     return(
        <View>
            <Text>Hello World</Text>
            <Button title='Sign Out' onPress={() => auth().signOut()}></Button>
        </View>
     )
}

export default Page