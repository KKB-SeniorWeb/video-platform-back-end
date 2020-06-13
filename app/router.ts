import { Application } from 'egg';
import {
  SIGNUP,
  SIGNUP_CHECK,
  SIGNIN,
  VIDEO_UPLOAD,
  VIDEO_DELETE,
  JOURNAL_ADD,
  JOURNAL_ID,
  JOURNAL_USER,
  USER,
  ARTICLE_CREATE
} from './const/index';

function signRouter(app) {
  const { controller, router } = app;
  router.post(SIGNUP, controller.signup.index);
  router.post(SIGNUP_CHECK, controller.signup.check);
  router.post(SIGNIN, controller.signin.index);
}

function videoRouter(app) {
  const { controller, router } = app;
  router.post(VIDEO_UPLOAD, controller.video.upload);
  router.post(VIDEO_DELETE, controller.video.delete);
}
function journalRouter(app) {
  const { controller, router, middleware } = app;
  const adminAndMasterRequired = middleware.permissionsValidation(['admin', 'master']);
  router.post(`${JOURNAL_ADD}/:type`, app.jwt, adminAndMasterRequired, controller.journal.add);
  router.get(`${JOURNAL_ID}/:type`, controller.journal.getById);
  router.get(`${JOURNAL_USER}/:type`, controller.journal.getByUser);
}
function articleRouter(app) {
  const { controller, router, middleware } = app;
  const adminAndMasterRequired = middleware.permissionsValidation(['admin', 'master']);
  router.post(ARTICLE_CREATE, app.jwt, adminAndMasterRequired, controller.article.create);
}

function userRouter(app) {
  const { controller, router, middleware } = app;
  const adminAndMasterRequired = middleware.permissionsValidation(['admin', 'master']);

  // 查询单个用户
  router.get(`${USER}/:id`, app.jwt, controller.user.findOne);
  // 查看用户列表
  router.get(USER, app.jwt, adminAndMasterRequired, controller.user.findAll);
  // 删除用户
  router.delete(`${USER}/:id`, app.jwt, adminAndMasterRequired, controller.user.deleteUser);
  // 修改用户信息
  // 密码
  // 头像
  // 开通管理员（修改用户的 role）
  router.patch(`${USER}/:id`, app.jwt, controller.user.update);
}

export default (app: Application) => {
  signRouter(app);
  videoRouter(app);
  journalRouter(app);
  userRouter(app);
  articleRouter(app);
};
