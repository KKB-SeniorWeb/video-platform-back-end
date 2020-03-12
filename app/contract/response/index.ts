module.exports = {
  baseResponseFail: {
    code: { type: 'number', example: 0 },
    msg: { type: 'string', example: 'fail' },
    data: { type: 'object', example: {} }
  },

  baseResponseSuccess: {
    code: { type: 'number', example: 1 },
    msg: { type: 'string', example: 'success' },
    data: { type: 'object', example: {} }
  },
  signinResponse: {
    code: { type: 'number', example: 1 },
    msg: { type: 'string', example: '' },
    data: {
      type: 'object',
      example: {
        id: { type: 'string', example: '123124124' },
        username: { type: 'string', example: 'xiaoming' },
        nickname: { type: 'string', example: 'kekeaiai' },
        avatar: { type: 'string', example: 'url' },
        token: { type: 'string', example: 'dsalfkjdsalfjdslfadsjflkwejoifjsdlakfjsdlfj' }
      }
    }
  }
};
