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
  },
  uploadVideoResponse: {
    code: { type: 'number', example: 1 },
    msg: { type: 'string', example: '' },
    data: {
      type: 'object',
      example: ['http://....mp4']
    }
  },
  deleteVideoResponse: {
    code: { type: 'number', example: 1 },
    msg: { type: 'string', example: '' }
  },
  journalAddResponse: {
    code: { type: 'number', example: 1 },
    msg: { type: 'string', example: '' },
    data: {
      type: 'object',
      example: {
        id: { type: 'string', example: '日志id' },
        start: { type: 'int', example: 193897920389 },
        stop: { type: 'int', example: 98327058943 },
        name: { type: 'string', example: '名称' },
        user_id: { type: 'string', example: '用户id' }
      }
    }
  },
  journalGetByIdResponse: {
    code: { type: 'number', example: 1 },
    msg: { type: 'string', example: '获取观看记录成功' },
    data: {
      type: 'object',
      itemType: 'object',
      example: [
        {
          id: { type: 'string', example: '日志id' },
          user_id: { type: 'string', example: '用户id' },
          username: { type: 'string', example: '用户名' },
          time: { type: 'string', example: '观看开始时间 ～ 观看结束时间' },
          watch: { type: 'string', example: '观看名称' }
        },
        {
          id: { type: 'string', example: '日志id-2' },
          user_id: { type: 'string', example: '用户id' },
          username: { type: 'string', example: '用户名' },
          time: { type: 'string', example: '观看开始时间 ～ 观看结束时间' },
          watch: { type: 'string', example: '观看名称' }
        }
      ]
    }
  },
  journalGetByUserResponse: {
    code: { type: 'number', example: 1 },
    msg: { type: 'string', example: '获取观看记录成功' },
    data: {
      type: 'object',
      itemType: 'object',
      example: [
        {
          id: { type: 'string', example: '日志id' },
          user_id: { type: 'string', example: '用户id' },
          username: { type: 'string', example: '用户名' },
          time: { type: 'string', example: '观看开始时间 ～ 观看结束时间' },
          watch: { type: 'string', example: '观看名称' }
        },
        {
          id: { type: 'string', example: '日志id-2' },
          user_id: { type: 'string', example: '用户id' },
          username: { type: 'string', example: '用户名' },
          time: { type: 'string', example: '观看开始时间 ～ 观看结束时间' },
          watch: { type: 'string', example: '观看名称' }
        }
      ]
    }
  },
  articleCreateResponse: {
    code: { type: 'number', example: 1 },
    msg: { type: 'string', example: '新建文章成功' },
    data: {
      type: 'object',
      example: {
        id: '文章id'
      }
    }
  }
};
