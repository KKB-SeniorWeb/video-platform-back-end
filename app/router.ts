import { Application } from 'egg';
import { SIGNUP, SIGNUP_CHECK, SIGNIN, VIDEO_UPLOAD, VIDEO_DELETE, USER } from './const/index';

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

function userRouter(app) {
  const { controller, router, middleware } = app;
  const adminAndMasterRequired = middleware.permissionsValidation(['admin', 'master']);

  // 查询单个用户
  router.get(`${USER}/:id`, app.jwt, controller.user.findOne);
  // 查看用户列表
  router.get(USER, app.jwt, adminAndMasterRequired, controller.user.findAll);
  // 删除用户
  router.delete(`${USER}/:id`, app.jwt, adminAndMasterRequired, controller.user.deleteUser);
}

export default (app: Application) => {
  signRouter(app);
  videoRouter(app);
  userRouter(app);
};
