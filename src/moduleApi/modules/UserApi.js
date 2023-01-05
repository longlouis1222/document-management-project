import Api from '../../moduleApi'

export default {
  list(data) {
    return Api().get(!data ? 'users' : `users?${data}`)
  },
  create(data) {
    return Api().post('users', data)
  },
  update(data) {
    return Api().put(`users/${data.id}`, data)
  },
  findById(id) {
    return Api().get(`users/get-by-id?ids=${id}`)
  },
  delete(id) {
    return Api().delete(`users?ids=${id}`)
  },
  inactiveAccount(data) {
    return Api().get(`users/inactive?check=${data.status}&userId=${data.id}`)
  }
}
