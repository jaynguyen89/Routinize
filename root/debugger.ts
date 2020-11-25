import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import { AsyncStorage } from 'react-native';

const appDebugger = Reactotron
    .setAsyncStorageHandler!(AsyncStorage)
    .configure({
        name : "ReactNative Debugger"
    })
    .useReactNative()
    .use(reactotronRedux())
    .connect();

export default appDebugger;
