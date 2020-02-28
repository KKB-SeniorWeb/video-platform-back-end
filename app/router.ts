import { Application } from 'egg';

function signRouter(app) {
  const { controller, router } = app;
  router.post('/signup', controller.signup.index);
}

export default (app: Application) => {
  signRouter(app);
};
