export const customErrors = {
  // 400
  BAD_REQUEST_USER_REGISTERED: {
    message: 'User is already registered',
    code: 4001
  },
  BAD_REQUEST_ALREADY_ACTIVATED: {
    message: 'Already activated',
    code: 4002
  },

  BAD_REQUEST_NO_ROLE_TYPE : {
    message: 'Wrong role type',
    code: 4003
  },

  BAD_REQUEST_EMAIL_EXIST : {
    message: 'Email exist',
    code: 4004
  },

  BAD_REQUEST_NO_TOKEN: {
    message: 'Token is not present'
  },

  BAD_REQUEST_NOT_VALID_FILE: {
    message: 'Not valid file',
    code:0
  },

  BAD_REQUEST_NOT_VALID_ID: {
    message: 'Not valid id'
  },

  BAD_REQUEST_REQUIRED_ONE_PHOTO: {
    message: 'Required only one photo',
    code: 0
  },

  BAD_REQUEST_FILE_MAX_SIZE: {
    message: 'Max size of file',
    code: 0
  },

  //401
  UNAUTHORIZED_BAD_TOKEN: {
    message: 'Something wrong with token',
    code: 4059
  },

  //403
  FORBIDDEN_NOT_CONFIRMED: {
    message: 'Is not confirmed',
    code: 4031
  },

  // 404
  NOT_FOUND: {
    message: 'Record not found'

  },

  // 500
  TEMPLATE_NOT_FOUND: {
    message: 'Template not found',
    code: 4044
  },

  WRONG_ACTION: {
    message: 'Wrong action type',
    code: 4045
  }

};
