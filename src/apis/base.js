import axios from "axios"

const apiConfig = (config) => {
    config.headers = {
        'Accept' : 'application/json'
    }
    return config
}

const base = axios.create({
    baseURL: 'https://newsapi.org/v2/',
    timeout: 90_000
})

base.interceptors.request.use(apiConfig)

export default base