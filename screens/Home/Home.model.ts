import { NavigationProp, ParamListBase } from '@react-navigation/native'

export interface HomeProps {
  navigation: NavigationProp<ParamListBase>
}

export type usersType = {
  company: {
    name: string
  }
  id: number
  image: {
    thumbnailUrl: string
  }
  name: string
  post: {
    title: string
    body: string
  }
}
