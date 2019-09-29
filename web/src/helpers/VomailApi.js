import Axios from 'axios'

const [host, port] = [process.env.REACT_APP_API_HOST, process.env.REACT_APP_API_PORT]

const axiosInstance = Axios.create({
  baseURL: `http://${host}:${port}`,
})

class VomailApi {
  static getMailsByAddress(address) {
    return axiosInstance.get(`/users/${address}`)
  }

  static getMail(id) {
    return axiosInstance.get(`/mails/${id}`)
  }

  static patchMail(id, { read }) {
    return axiosInstance.patch(`/mails/${id}`, {
      read,
    })
  }

  static deleteMail(id) {
    return axiosInstance.delete(`/mails/${id}`)
  }
}

export default VomailApi
