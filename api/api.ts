import axios from 'axios'

export const backendUrl = 'https://jsonplaceholder.typicode.com/'

const instance = axios.create({
  baseURL: backendUrl,
})

export const userAPI = {
  getUsers: () => {
    return instance.get('/users')
  },
}

export const postAPI = {
  getPostById: (id: number) => {
    return instance.get(`/posts/${id}`)
  },
}

export const photoAPI = {
  getPhotoById: (id: number) => {
    return instance.get(`/photos/${id}`)
  },
}
