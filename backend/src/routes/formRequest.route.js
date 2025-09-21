import express from 'express'
import { createRequest, getAllRequestAdmin,getAllUsersRequest,deleteRequest, approveARequest } from '../controllers/requestForm.controller.js'
import { checkIfAdmin, checkIfEmployeeToRequestForm, verifyToken } from '../middleware/authmiddleware.js'
import { formRequestValidator } from '../lib/InputValidator.js'
const formRoute = express.Router()



// admin only
// http://localhost:8000/requests/requests/form/admin
formRoute.get('/form/admin',verifyToken, checkIfAdmin, getAllRequestAdmin)

// http://localhost:800/requests/form/68c08c01cd7857bf9fd6bb42/approve
formRoute.put('/form/:id/approve', verifyToken, checkIfAdmin, approveARequest)

// http://localhost:8000/requests/requests/form/users
formRoute.get('/form/users',verifyToken, checkIfEmployeeToRequestForm, getAllUsersRequest) // employee own request

//http://localhost:8000/requests/form
formRoute.post('/form',formRequestValidator ,verifyToken, checkIfEmployeeToRequestForm, createRequest) // users only

//http://localhost:8000/requests/form/users/68c08c01cd7857bf9fd6bb42
formRoute.delete('/form/users/:id', verifyToken, deleteRequest) // user can only delete there own req

export default formRoute
// tun ang tulo ka files nadisplay sa vs code ayha mo proceed