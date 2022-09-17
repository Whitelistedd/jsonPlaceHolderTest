import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useAppSelector } from '../redux/Store/Store'

import NotFoundScreen from '../screens/NotFoundScreen/NotFoundScreen'
import Login from '../screens/Login/Login'
import Home from '../screens/Home/Home'
import { Header } from '../components/Header/Header'
import React from 'react'
import { SafeAreaView } from 'react-native'

const Stack = createNativeStackNavigator()

export default function Navigation() {
  const loggedIn = useAppSelector((state) => state.loggedIn)

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          header: ({ route }) => (
            <SafeAreaView style={{ backgroundColor: '#E4B062' }}>
              <Header route={route} />
            </SafeAreaView>
          ),
        }}
        initialRouteName={loggedIn ? 'Home' : 'Login'}
      >
        {loggedIn ? (
          <Stack.Screen
            name="Home"
            options={{
              title: 'Home',
              headerBackVisible: false,
            }}
            component={Home}
          />
        ) : (
          <Stack.Screen name="Login" component={Login} />
        )}
        <Stack.Screen
          name="NotFound"
          component={NotFoundScreen}
          options={{ title: 'Oops!' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
