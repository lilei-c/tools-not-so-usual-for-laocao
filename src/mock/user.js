export default [
  {
    url: '/api/user/login',
    method: 'post',
    timeout: 500,
    response: {
      code: 0,
      data: {
        username: 'admin',
        token: 'token_123',
      },
    },
  },
  {
    url: '/api/user/logout',
    method: 'post',
    timeout: 500,
    response: {
      code: 0,
      data: 'ok',
    },
  },
]
