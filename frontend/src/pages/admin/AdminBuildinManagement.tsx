import React, { useEffect, useState } from 'react'
import axiosInstance from '../../utils/AxiosInstance'
import LayoutWrapper from '../../components/LayoutWrapper';
import { PlusCircleIcon } from 'lucide-react';
import BuildingCard from '../../components/BuildingCard';
import DeleteConfirmation from '../../components/DeleteConfirmation';
import Swal from 'sweetalert2';
import AddBuildingModal from '../../components/AddBuildingModal';
import axios from 'axios';
import ModifyBuilding from '../../components/ModifyBuilding';

export interface Building {
    buildingName: string;
    _id?: string;
}

const AdminBuildinManagement: React.FC = () => {
    const [buildings, setBuildings] = useState<Building[]>([])
    const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] = useState<boolean>(false)
    const [showAddBuildingModal, setAddBuildingModal] = useState<boolean>(false)
    const [showEditBuildingModal, setShowEditModal] = useState<boolean>(false)
    const [selectedBuildingToRemove, setSelectedBuildingToRemove] = useState<string | null>(null)
    const [selectedBuildingToEdit, setSelectedBuildingToEdit] = useState<string | null>(null)
    const [msg, setMsg] = useState<string>('')

    useEffect(() => {
        const getAllBuildings = async () => {
            try {
                const res = await axiosInstance.get('/api/buildings')
                setBuildings(res.data.buildings)
                setMsg(res.data.message)
            } catch (error) {
                console.error(error)
            }
        }
        getAllBuildings()
    }, [])

    const showABModal = () => {
        setAddBuildingModal(true)
    }

    const addBuildings = async (data: { buildingName: string }) => {
        try {
            const res = await axiosInstance.post(`/api/buildings`, data)
            setBuildings(prev => [...prev, res.data.buildings])
            Swal.fire({
                title: 'Success',
                text: 'Added Successfully',
                timer: 1000
            })
        } catch (error: string | unknown) {
            if (axios.isAxiosError(error)) {
                Swal.fire({
                    title: 'Error',
                    text: error.response?.data.errorMessage[0].msg
                })
            } else {
                Swal.fire({
                    title: 'Error',
                    text: 'Something went wrong'
                })
            }
        }
        setAddBuildingModal(false)
    }

    const showDCModal = (id: string) => {
        setShowDeleteConfirmationModal(true)
        const buildingToRemove = buildings.find((b) => b._id === id)
        setSelectedBuildingToRemove(buildingToRemove?._id ?? null)
        console.log(buildingToRemove?._id)
    }

    const showEBModal = (id: string) => {
        setShowEditModal(true)
        const buildingToModify = buildings.find((b) => b._id === id)
        setSelectedBuildingToEdit(buildingToModify?._id ?? null)
    }

    const modifyBuildingName = async (data: { buildingName: string }) => {
        try {
            const res = await axiosInstance.put(`/api/buildings/${selectedBuildingToEdit}`, data)
            Swal.fire({
                title: 'Success',
                text: res.data.message,
                timer: 1000
            })
            setShowEditModal(false)
            setBuildings(prev => prev.map((b) => b._id === selectedBuildingToEdit ?
                { ...b, buildingName: data.buildingName.toUpperCase() } : b))
        } catch (error) {
            console.error(error)
        }
    }

    const removeBuilding = async () => {
        try {
            await axiosInstance.delete(`/api/buildings/${selectedBuildingToRemove}`)
            Swal.fire({
                title: 'Success',
                text: 'Building remove successfully',
                timer: 1000
            })
            setShowDeleteConfirmationModal(false)
            setBuildings((prev) => prev.filter((b) => b._id !== selectedBuildingToRemove))
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: 'Failed to delete, Something went wrong!',
                timer: 2000
            })
        }
    }


    return (
        <div className='flex flex-col gap-5 items-center justify-center'>
            <div>
                <h1 className='text-2xl font-medium'>{msg}</h1>
            </div>

            <div className='w-full px-10 flex items-center justify-end'>
                <button className='flex items-center justify-center gap-3'
                    onClick={showABModal}>
                    <PlusCircleIcon />
                    Add Building
                </button>
            </div>

            {buildings.length !== 0 ? (
                <div className='p-5'>
                    <LayoutWrapper>
                        {buildings.map((b) => (
                            <BuildingCard
                                onShowEditModal={() => showEBModal(b._id ?? '')}
                                onShow={() => showDCModal(b._id ?? '')}
                                key={b._id} buildingName={b.buildingName} />
                        ))}
                    </LayoutWrapper>
                </div>
            ) : (
                <div className="flex items-center justify-center flex-col gap-6">
                    <div className="w-[400px]">
                        <img src="/images/nodata.png" alt="" />
                    </div>
                </div>)}



            {showDeleteConfirmationModal && (
                <DeleteConfirmation
                    onConfirm={removeBuilding}
                    show={showDeleteConfirmationModal} onCancel={() => setShowDeleteConfirmationModal(false)}
                    title='Delete' message='Are you sure you want to delete this building? This action can not be undone.' />
            )}

            {showAddBuildingModal && (
                <AddBuildingModal show={showAddBuildingModal}
                    onAdd={addBuildings}
                    onClose={() => setAddBuildingModal(false)} />
            )}

            {showEditBuildingModal && (
                <ModifyBuilding
                    onEdit={modifyBuildingName} onShow={showEditBuildingModal} onClose={() => setShowEditModal(false)} />
            )}

        </div>
    )
}

export default AdminBuildinManagement