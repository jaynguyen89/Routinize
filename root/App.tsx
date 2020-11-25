import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import store from '../src/providers/reducerIndex';
//import { StatusBar } from 'react-native';

import Home from "../src/features/home/Home";
import { getAppSettings } from '../src/features/settings/redux/actions';

store.dispatch(getAppSettings());
const Stack = createStackNavigator();

const App: () => React.ReactNode = () => {
  //React.useEffect(() => { StatusBar.setHidden(true); }, []);

  return (
      <Provider store={ store }>
          <NavigationContainer>
              <Stack.Navigator>
                  <Stack.Screen name='Home' component={ Home } options={{  }} />
              </Stack.Navigator>
          </NavigationContainer>
      </Provider>
  );
};

export default App;
