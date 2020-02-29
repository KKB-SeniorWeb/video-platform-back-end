import { Application } from 'egg';

function signRouter(app) {
  const { controller, router } = app;
  router.post('/signup', controller.signup.index);

  router.post('/signup_check', controller.signup.check);
}

export default (app: Application) => {
  signRouter(app);
};
