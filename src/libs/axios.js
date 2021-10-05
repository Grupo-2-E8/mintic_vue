import axios from 'axios'
import app from '../config/app.config'

axios.defaults.baseURL = `${app.api}/api`

export default axios