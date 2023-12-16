import axios from 'axios'

const request = axios.create({
    baseURL: import.meta.env.VITE_BASE_API as string,
})

export default request