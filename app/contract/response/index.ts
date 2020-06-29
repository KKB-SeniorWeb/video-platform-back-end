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
  },
  articleUpdateResponse: {
    code: { type: 'number', example: 1 },
    msg: { type: 'string', example: '更新文章成功' },
    data: {
      type: 'object',
      example: {
        id: '文章id'
      }
    }
  },
  articleDeleteResponse: {
    code: { type: 'number', example: 1 },
    msg: { type: 'string', example: '删除文章成功' }
  },
  articleGetResponse: {
    code: { type: 'number', example: 1 },
    msg: { type: 'string', example: '获取文章成功' },
    data: {
      type: 'object',
      example: {
        id: '文章id',
        title: '文章标题',
        cover: '文章封面',
        describe: '文章描述',
        content: '文章内容',
        author_id: '作者id',
        created_at: '创建时间'
      }
    }
  },
  articleGetListResponse: {
    code: { type: 'number', example: 1 },
    msg: { type: 'string', example: '获取文章成功' },
    data: {
      type: 'object',
      example: [
        {
          id: '文章id',
          title: '文章标题',
          cover: '文章封面',
          describe: '文章描述',
          content: '文章内容',
          author_id: '作者id',
          created_at: '创建时间'
        },
        {
          id: '文章id',
          title: '文章标题',
          cover: '文章封面',
          describe: '文章描述',
          content: '文章内容',
          author_id: '作者id',
          created_at: '创建时间'
        }
      ]
    }
  },
  replyPushResponse: {
    code: { type: 'number', example: 1 },
    msg: { type: 'string', example: '发表评论成功' }
  },
  replyGetResponse: {
    code: { type: 'number', example: 1 },
    msg: { type: 'string', example: '获取评论成功' },
    data: {
      type: 'object',
      example: {
        id: '评论id',
        user: {
          nickname: '评论人昵称',
          avatar: '评论人头像'
        },
        reply: '内容',
        watchId: '评论 (文章|视频) id'
      }
    }
  },
  replyGetListResponse: {
    code: { type: 'number', example: 1 },
    msg: { type: 'string', example: '获取评论列表成功' },
    data: {
      type: 'object',
      example: [
        {
          id: '评论id',
          user: {
            nickname: '评论人昵称',
            avatar: '评论人头像'
          },
          reply: '内容',
          watchId: '评论 (文章|视频) id'
        },
        {
          id: '评论id',
          user: {
            nickname: '评论人昵称',
            avatar: '评论人头像'
          },
          reply: '内容',
          watchId: '评论 (文章|视频) id'
        }
      ]
    }
  },
  teacherAddResponse: {
    code: { type: 'number', example: 1 },
    msg: { type: 'string', example: '添加讲师成功' }
  },
  teacherDeleteResponse: {
    code: { type: 'number', example: 1 },
    msg: { type: 'string', example: '删除讲师成功' }
  },
  teacherUpdateResponse: {
    code: { type: 'number', example: 1 },
    msg: { type: 'string', example: '更新讲师成功' }
  },
  teacherGetResponse: {
    code: { type: 'number', example: 1 },
    msg: { type: 'string', example: '更新讲师成功' },
    data: {
      type: 'object',
      example: [
        {
          id: 'id',
          name: 'name',
          photo: '照片地址',
          describe: '描述',
          age: 'age',
          gender: 'gender'
        },
        {
          id: 'id',
          name: 'name',
          photo: '照片地址',
          describe: '描述',
          age: 'age',
          gender: 'gender'
        }
      ]
    }
  },
  courseFindAllResponse: {
    code: { type: 'number', example: 1 },
    msg: { type: 'string', example: '新建文章成功' },
    data: {
      type: 'object',
      itemType: 'object',
      example: [
        {
          id: '教程id',
          course: '教程名称',
          course_cover: '教程的封面',
          course_describe: '教程描述',
          watch_num: '教程中观看人数',
          course_type_id: '教程分类',
          course_videos: [
            {
              id: '视频id',
              index: '视频在教程中的顺序',
              video_path: '视频地址',
              video_cover: '视频封面',
              watch_num: '视频观看人数',
              reply_list: [
                {
                  id: '评论id',
                  replier: {
                    nickname: '评论人昵称',
                    avatar: '评论人头像'
                  },
                  reply_content: '评论内容：要支持markdown',
                  created_at: '评论时间',
                  reply_id: '回复的哪篇评论的id'
                }
              ]
            }
          ]
        }
      ]
    }
  },
  courseGetByIdResponse: {
    code: { type: 'number', example: 1 },
    msg: { type: 'string', example: '新建文章成功' },
    data: {
      type: 'object',
      example: {
        id: '教程id',
        course: '教程名称',
        course_cover: '教程的封面',
        course_describe: '教程描述',
        watch_num: '教程中观看人数',
        course_type_id: '教程分类',
        course_videos: [
          {
            id: '视频id',
            index: '视频在教程中的顺序',
            video_path: '视频地址',
            video_cover: '视频封面',
            watch_num: '视频观看人数',
            reply_list: [
              {
                id: '评论id',
                replier: {
                  nickname: '评论人昵称',
                  avatar: '评论人头像'
                },
                reply_content: '评论内容：要支持markdown',
                created_at: '评论时间',
                reply_id: '回复的哪篇评论的id'
              }
            ]
          }
        ]
      }
    }
  },
  courseCreateResponse: {
    code: { type: 'number', example: 1 },
    msg: { type: 'string', example: '添加教程成功' }
  }
};
