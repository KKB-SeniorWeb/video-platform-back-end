import { Application } from 'egg';
import { SIGNUP, SIGNUP_CHECK, SIGNIN } from './const/index';

function signRouter(app) {
  const { controller, router } = app;
  router.post(SIGNUP, controller.signup.index);
  router.post(SIGNUP_CHECK, controller.signup.check);

  router.post(SIGNIN, controller.signin.index);
}

export default (app: Application) => {
  signRouter(app);
};
