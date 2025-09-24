import express from 'express'
import { createBuildings, deleteBuilding, editBuilding, getAllBuildings } from '../controllers/building.controller.js'
import { checkIfAdmin, verifyToken } from '../middleware/authmiddleware.js'
import { createBuildingValidator } from '../lib/InputValidator.js'
const buildingRoute = express.Router()

buildingRoute.get('/buildings',verifyToken, checkIfAdmin, getAllBuildings)
buildingRoute.post('/buildings',verifyToken,createBuildingValidator,checkIfAdmin,createBuildings)
buildingRoute.put('/buildings/:id',verifyToken,createBuildingValidator,checkIfAdmin,editBuilding)
buildingRoute.delete('/buildings/:id',verifyToken,checkIfAdmin,deleteBuilding)


export default buildingRoute
