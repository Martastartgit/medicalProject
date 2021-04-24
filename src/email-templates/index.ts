import {AdminsActionEnum} from '../constants';

export const htmlTemplates: {[index: string]: {subject: string, templateFileName: string}} = {
  [AdminsActionEnum.ADMIN_REGISTER]: {
    subject: 'Підтвердження',
    templateFileName: 'adminConfirmEmail'
  },

  [AdminsActionEnum.FORGOT_PASSWORD]: {
    subject: 'Відновлення паролю',
    templateFileName: 'forgotPassword'
  }
};
