import {body} from 'express-validator'

export const registerValidator = [
  body('firstName').isLength({min: 5}).withMessage('Invalid firstName').notEmpty(),
  body('lastName').isLength({min: 5}).withMessage('Invalid lastName').notEmpty(),
  body('age').isNumeric().withMessage('Invalid age format').notEmpty().custom((value) => {
    if(value < 18){
      throw new Error('Age must be at least 18')
    }
    return true
  }),
  body('email').isEmail().withMessage('Invalid email format'),
  body('password').isLength({min: 5}).withMessage('Invalid password').notEmpty(),
  body('role').isIn(['admin' , 'user', 'hr', 'program_head', 'president']).withMessage('Role must be either admin,user, program_head, president')
  .notEmpty()
]

export const loginValidator = [
body('email').isEmail().withMessage('Invalid email format').notEmpty(),
body('password').isLength({min: 5}).withMessage('Invalid password').notEmpty(),
body('firstName').isLength({min: 5}).withMessage('Invalid firstName').notEmpty(),
]

export const editUserValidator = [
body('firstName').isLength({min: 5}).withMessage('Invalid firstName').notEmpty(),
body('password').isLength({min: 5}).withMessage('Invalid password').notEmpty(),
]

export const formRequestValidator = [
  body('requestType').isIn(['Sick Leave', 'Vacation', 'Personal Leave', 'Other']).withMessage('Invalid request type').notEmpty(),
  body('startDate').isISO8601().withMessage('Invalid Start date').notEmpty(),
  body('endDate').isISO8601().withMessage('Invalid End date').notEmpty().custom((value , {req}) => {
    if(value < req.body.startDate){
      throw new Error('End date must be after start date')
    }
    return true
  }),

  // if ang request Type is Other need to provide reason to submit
  body('reason').custom((value, {req}) => {
    if(req.body.requestType === 'Other' && (!value || value.trim() === '')){
      throw new Error('Reason is required when the request type is Other.')
    }
    return true
  })
]
// gama controller paras buildings, subjects, departments and rooms