import mongoose from "mongoose"
import { BadRequest, NotFound } from "../lib/ApiError.js"
import Building from "../model/building.model.js"

export const getAllBuildingsService = async() =>{
    const building = await Building.find()
    return {message: building.length === 0? 'No building added yet': 'List of All buildings', buildings: building}
}

export const createBuildingsService = async (buildingName) =>{
    const existingBuilding = await Building.findOne({buildingName: buildingName})
    if(existingBuilding) throw new BadRequest('Building already exist try another one!')
    const building = new Building({
        buildingName: buildingName.toUpperCase()
    })
    await building.save()
    return{message:'Created successfully', buildings: building}
}

export const editBuildingService = async (id, buildingName) => {
    if(!mongoose.Types.ObjectId.isValid(id)) throw new BadRequest('Invalid Id');
    const existingBuilding = await Building.findOne({buildingName: buildingName})
    if(existingBuilding) throw new BadRequest('Building already exist try another name')
    const building = await Building.findOneAndUpdate({_id: id}, {buildingName: buildingName.toUpperCase()}, {new: true})
    return {message: 'Edited successfully', buildings: building}
}

export const deleteBuildingService = async(id) => {
    if(!mongoose.Types.ObjectId.isValid(id)) throw new BadRequest('Invalid id')
    const building = await Building.findOneAndDelete({_id: id})
    if(!building) throw new NotFound('Building not found')
    return {message: 'Deleted successfully', buildings: building}
}