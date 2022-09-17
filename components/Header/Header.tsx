import { DeviceType } from 'expo-device'
import {
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewProps,
} from 'react-native'
import { FullLogo } from '../../assets/images/FullLogo'
import { Logo } from '../../assets/images/Logo'
import { Logout } from '../../assets/images/Logout'
import { handleLogout } from '../../redux/Slices/UserSlice/UserSlice'
import { AppDispatch, useAppSelector } from '../../redux/Store/Store'
import { HeaderProps } from './Header.model'

export const Header: React.FC<HeaderProps> = ({ route }) => {
  const loggedIn = useAppSelector((state) => state.loggedIn)
  const dispatch = AppDispatch()

  const handleLogoutButton = () => {
    dispatch(handleLogout())
  }

  return (
    <View style={styles.container}>
      <>
        {route.name === 'Login' || !DeviceType.PHONE ? <Logo /> : <FullLogo />}
      </>
      {loggedIn && (
        <TouchableOpacity onPress={() => handleLogoutButton()}>
          <Logout color={'#27569C'} />
        </TouchableOpacity>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 118,
    paddingHorizontal: DeviceType.PHONE ? 12 : 37,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#E4B062',
  },
})
