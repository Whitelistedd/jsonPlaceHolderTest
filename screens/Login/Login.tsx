import {
  Dimensions,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { AppDispatch, useAppSelector } from '../../redux/Store/Store'
import { handleLogin } from '../../redux/Slices/UserSlice/UserSlice'
import { colors } from '../../assets/colors'
import { useEffect, useState } from 'react'
import { LoginProps } from './Login.model'
import React from 'react'

const { width, height } = Dimensions.get('window')

const Login: React.FC<LoginProps> = ({ navigation }) => {
  const [form, setForm] = useState({})
  const isloggedIn = useAppSelector((state) => state.loggedIn)
  const error = useAppSelector((state) => state.error)
  const dispatch = AppDispatch()

  const handleLoginButton = () => {
    dispatch(handleLogin(form))
  }

  const handleFormInputChange = (text: string, name: string) => {
    setForm((data) => ({ ...data, [name]: text }))
  }

  useEffect(() => {
    if (isloggedIn) {
      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'Home',
          },
        ],
      })
    }
  }, [isloggedIn])

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={{
          height: height,
          display: 'flex',
          justifyContent: 'center',
        }}
        behavior="padding"
      >
        <View style={styles.form}>
          <Text style={styles.title}>Authorization</Text>
          <View style={styles.inputWrap}>
            <Text style={styles.label}>login</Text>
            <TextInput
              onChangeText={(text) => handleFormInputChange(text, 'login')}
              style={styles.input}
            />
          </View>
          <View style={styles.inputWrap}>
            <Text style={styles.label}>password</Text>
            <TextInput
              onChangeText={(text) => handleFormInputChange(text, 'password')}
              style={styles.input}
              textContentType="password"
              secureTextEntry={true}
            />
          </View>
          {error && (
            <Text style={styles.errorText}>
              Please check your password and login and try again.
            </Text>
          )}
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => handleLoginButton()}
          >
            <Text style={styles.loginText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: height,
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
    padding: 15,
  },
  title: {
    fontSize: 24,
    padding: 10,
    fontWeight: 'bold',
    color: colors.blueWater,
    marginBottom: 'auto',
    marginTop: 'auto',
    fontFamily: 'inherit',
  },
  form: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: colors.blueWater,
    borderWidth: 5,
    borderRadius: 6,
    padding: 20,
    MaxWidth: 480,
    fontFamily: 'InterStrong',
    minHeight: 330,
  },
  inputWrap: {
    display: 'flex',
    flexDirection: width > 492 ? 'row' : 'column',
    alignItems: width > 492 ? 'center' : 'flex-start',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 17,
  },
  input: {
    width: 275,
    height: 45,
    padding: 10,
    borderColor: colors.blueWater,
    borderWidth: 5,
    borderRadius: 10,
    backgroundColor: '#D9D9D9',
  },
  label: {
    fontWeight: '900',
    fontSize: 24,
    marginBottom: 17,
    textAlign: 'left',
    fontFamily: 'inherit',
    paddingRight: 20,
  },
  loginButton: {
    backgroundColor: colors.cream,
    paddingVertical: 12,
    paddingHorizontal: 65,
    borderRadius: 10,
  },
  loginText: {
    fontWeight: '800',
    fontSize: 24,
    fontFamily: 'inherit',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
})

export default Login
