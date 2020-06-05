import { Application } from 'egg';
import {
  SIGNUP,
  SIGNUP_CHECK,
  SIGNIN,
  VIDEO_UPLOAD,
  VIDEO_DELETE,
  JOURNAL_ADD,
  JOURNAL_GET,
  JOURNAL_GETU
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
  const { controller, router } = app;
  router.post(JOURNAL_ADD, controller.journal.add); // 观看记录添加
  router.get(JOURNAL_GET, controller.journal.get); // 观看记录获取
  router.get(JOURNAL_GETU, controller.journal.getu); // 根据userid获取观看记录
}

export default (app: Application) => {
  signRouter(app);
  videoRouter(app);
  journalRouter(app);
};
