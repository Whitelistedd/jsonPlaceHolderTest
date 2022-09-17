import { DeviceType } from 'expo-device'
import React from 'react'
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import { colors } from '../../assets/colors'
import { UserInfoProps } from './UserInfo.model'

const { width } = Dimensions.get('window')

export const UserInfo: React.FC<UserInfoProps> = ({
  imageUrl,
  author,
  company,
  title,
  body,
}) => {
  return (
    <View style={styles.container}>
      {width > 679 && <Image style={styles.image} source={{ uri: imageUrl }} />}
      <Text style={styles.textInfo}>Author: {author}</Text>
      <Text style={styles.textInfo}>Company: {company}</Text>
      <Text style={styles.textInfo}>Title: {title}</Text>
      {width > 679 && (
        <Text style={styles.textInfo}>{`${body.substring(0, 152)}...`}</Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: DeviceType.PHONE ? 12 : 25,
    minWidth: 300,
    borderRadius: 6,
    overflow: 'hidden',
    flex: 1,
    margin: 20,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    border: `5px solid ${colors.blueWater}`,
  },
  textInfo: {
    fontWeight: '800',
    flex: 1,
    paddingVertical: 8,
  },
  image: {
    width: 150,
    height: 150,
  },
})
