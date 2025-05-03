import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { HomeScreen } from './src/presentation/views/home/home';
import { RegisterScreen } from './src/presentation/views/register/register';
import { ProfileInfoScreen } from './src/presentation/views/profile/info/profileInfo';
import { GenerateQRScreen } from './src/presentation/views/QR/GenerateQRScreen';
import { ScanQRScreen } from './src/presentation/views/QR/ScanQRScreen';

export type RootStackParamList = {
  HomeScreen: undefined;
  RegisterScreen: undefined;
  ProfileInfoScreen: undefined;
  GenerateQRScreen: { product: { id: number; name: string; price: number } };
  ScanQRScreen: { products: Array<{ id: number; name: string; price: number }> };
};

const Stack = createNativeStackNavigator <RootStackParamList>
();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
        />

        <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{
          headerShown: true,
          title: 'Registro'
        }}
        />
        <Stack.Screen
          name="GenerateQRScreen"
          component={GenerateQRScreen}
        />
        <Stack.Screen
          name="ScanQRScreen"
          component={ScanQRScreen}
        />
        <Stack.Screen 
          name="ProfileInfoScreen" 
          component={ProfileInfoScreen} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;