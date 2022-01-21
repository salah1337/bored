import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Home from '../screens/home'
import Chat from '../screens/chat'
import Video from '../screens/video'

const screens = {

    Home: {
        screen: Home
    },
    Chat: {
        screen: Chat
    },
    Video: {
        screen: Video
    }
}

const HomeStack = createStackNavigator(screens, {
        defaultNavigationOptions: {
            headerShown: false
        }
    });

export default createAppContainer(HomeStack);