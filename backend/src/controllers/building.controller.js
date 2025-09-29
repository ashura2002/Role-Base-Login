import { validationResult } from "express-validator"
import ApiError from "../lib/ApiError.js"
import { createBuildingsService, deleteBuildingService, editBuildingService, getAllBuildingsService } from "../services/building.service.js"

export const getAllBuildings = async(req,res,next) =>{
    try {
        const allBuilding = await getAllBuildingsService()
        res.status(200).json(allBuilding)
    } catch (error) {
        console.log(error)
        next(error)
    }
}

export const createBuildings = async(req,res,next) =>{
    const errMsg = validationResult(req)
    if(!errMsg.isEmpty()) return next(new ApiError('Validation Error', 400, errMsg.array()))

    const {buildingName} = req.body
    try {
        const newBuilding = await createBuildingsService(buildingName)
        res.status(201).json(newBuilding)
    } catch (error) {
        console.log(error)
        next(error)
    }
}

export const editBuilding = async(req,res,next) => {
    const {buildingName} = req.body
    const {id} = req.params
    try {
        const modifyBuilding = await editBuildingService(id, buildingName)
        res.status(200).json(modifyBuilding)
    } catch (error) {
        console.log(error)
        next(error)
    }
}

export const deleteBuilding = async(req,res,next) =>{
    const {id} = req.params
    try {
        const removeBuilding = await deleteBuildingService(id)
        res.status(200).json(removeBuilding)
    } catch (error) {
        console.log(error)
        next(error)
    }
}
