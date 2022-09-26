// 引入axios
import request from '@/utils/request'

export const getLogin = (data) => {
  return request({
    url: '/api/user-service/user/login',
    method: 'POST',
    data
  })
}

