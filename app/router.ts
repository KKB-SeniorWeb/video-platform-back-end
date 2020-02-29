import { Application } from 'egg';
import { SIGNUP, SIGNUP_CHECK } from './const/index';

function signRouter(app) {
  const { controller, router } = app;
  router.post(SIGNUP, controller.signup.index);
  router.post(SIGNUP_CHECK, controller.signup.check);
}

export default (app: Application) => {
  signRouter(app);
};
