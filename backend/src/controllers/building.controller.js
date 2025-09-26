import { validationResult } from "express-validator"
import ApiError, { BadRequest, NotFound } from "../lib/ApiError.js"
import Building from "../model/building.model.js"
import mongoose from "mongoose"

export const getAllBuildings = async(req,res,next) =>{
    try {
        const buildings = await Building.find()
        res.status(200).json({message: buildings.length === 0? 'No building added': 'List of all buildings', data: buildings})
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
        const buildingExist = await Building.findOne({buildingName: buildingName})
        if(buildingExist) return next(new BadRequest('Building already exist!'))
        
        const newBuilding = new Building({
            buildingName: buildingName
        })

        await newBuilding.save()
        
        res.status(200).json({message: 'Created successfully', data: newBuilding})
    } catch (error) {
        console.log(error)
        next(error)
    }
}

export const editBuilding = async(req,res,next) => {
    const {buildingName} = req.body
    const {id} = req.params
    try {
        if(!mongoose.Types.ObjectId.isValid(id)) return next(new BadRequest('Invalid Id'))
        const findBuilding = await Building.findOneAndUpdate({_id: id}, {buildingName: buildingName}, {new:true})
        if(!findBuilding) return next(new NotFound('Building not found!'))
        res.status(200).json({message: 'Modify successfully', data: findBuilding})
    } catch (error) {
        console.log(error)
        next(error)
    }
}

export const deleteBuilding = async(req,res,next) =>{
    const {id} = req.params
    try {
        if(!mongoose.Types.ObjectId.isValid(id)) return next(new BadRequest('Invalid Id'))
        const removeBuilding = await Building.findOneAndDelete({_id: id})
        if(!removeBuilding) return next(new NotFound('Building not found'))
            res.status(200).json({message: 'Deleted successfully', data: removeBuilding})
    } catch (error) {
        console.log(error)
        next(error)
    }
}
// tuon sag cors policy 
// populate and room sa kada building 