import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';


export async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
        console.log('Authorization status:', authStatus);
    }
}

function onMessageReceived(message) {
    notifee.displayNotification(JSON.parse(message.data.notifee));
  }
  

export const notificationListener = () => {

    // Assume a message-notification contains a "type" property in the data payload of the screen to open

    // messaging().onNotificationOpenedApp(remoteMessage => {
        // console.log(
        //     'Notification caused app to open from background state:',
        //     remoteMessage.notification,
        // );
        // navigation.navigate(remoteMessage.data.type);
    // });

    // Check whether an initial notification is available
    messaging()
        .getInitialNotification()
        .then(remoteMessage => {
            if (remoteMessage) {
                console.log(
                    'Notification caused app to open from quit state:',
                    remoteMessage.notification,
                );
            }
        });
}

export const getToken = async () => {
    await messaging().registerDeviceForRemoteMessages();

    const token = await messaging().getToken();
    await AsyncStorage.setItem('tokenDeviceFB', token)
}
