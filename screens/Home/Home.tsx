import { DeviceType } from 'expo-device'
import { useEffect, useState } from 'react'
import {
  Dimensions,
  FlatList,
  ListRenderItem,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { photoAPI, postAPI, userAPI } from '../../api/api'
import { UserInfo } from '../../components/UserInfo/UserInfo'
import { HomeProps, usersType } from './Home.model'

const { height } = Dimensions.get('window')

const Home: React.FC<HomeProps> = ({ navigation }) => {
  const [allPosts, setAllPosts] = useState<usersType[]>([])

  const getUserPosts = async () => {
    const getUsers = await userAPI.getUsers().then((res) => res.data)
    const userPosts: usersType[] = await Promise.all(
      getUsers.map(
        async (user: usersType) =>
          await postAPI
            .getPostById(user.id)
            .then((res) => ({ ...user, post: res.data }))
      )
    )
    const userPostsWithImages: usersType[] = await Promise.all(
      userPosts.map(
        async (user) =>
          await photoAPI
            .getPhotoById(user.id)
            .then((res) => ({ ...user, image: res.data }))
      )
    )
    setAllPosts(userPostsWithImages)
  }
  useEffect(() => {
    getUserPosts()
  }, [])

  useEffect(() => {
    console.log(allPosts)
  }, [allPosts])

  const renderItem: ListRenderItem<usersType> = ({ item }) => {
    return (
      <UserInfo
        imageUrl={item?.image?.thumbnailUrl}
        author={item.name}
        body={item.post?.body}
        title={item.post?.title}
        company={item.company?.name}
        key={`userNumber ${item.id}`}
      />
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.userInfos}
        refreshing={true}
        onRefresh={getUserPosts}
        data={allPosts}
        renderItem={renderItem}
        numColumns={!DeviceType.PHONE ? 1 : 2}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  userInfos: {},
})

export default Home
