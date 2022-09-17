import {
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
import { DeviceType } from 'expo-device'

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
      <View style={styles.separator} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.blueWater,
    marginBottom: 'auto',
    marginTop: 'auto',
    fontFamily: 'inherit',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  form: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: `5px solid ${colors.blueWater}`,
    borderRadius: 6,
    minWidth: DeviceType.PHONE ? 290 : 480,
    fontFamily: 'InterStrong',
    height: 330,
  },
  inputWrap: {
    display: 'flex',
    flexDirection: DeviceType.PHONE ? 'column' : 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: DeviceType.PHONE ? 'left' : 'center',
    paddingHorizontal: 19,
    marginBottom: 25,
  },
  input: {
    minWidth: 295,
    height: 45,
    padding: 10,
    border: `5px solid ${colors.blueWater}`,
    borderRadius: 10,
    backgroundColor: '#D9D9D9',
    flex: 1,
  },
  label: {
    flex: 1,
    fontWeight: '900',
    fontSize: 24,
    textAlign: 'left',
    fontFamily: 'inherit',
  },
  loginButton: {
    marginBottom: 'auto',
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
