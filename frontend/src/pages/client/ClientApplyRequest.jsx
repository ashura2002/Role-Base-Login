import React, { useContext, useState } from 'react'
import userContext from '../../context/UserContext';
import axiosInstance from '../../utils/AxiosInstance';
import toast from 'react-hot-toast';

const ClientApplyRequest = () => {
  const { names, userEmail, setRequest, loading, setLoading } = useContext(userContext)
  const [formData, setFormData] = useState({
    name: names || '',
    email: userEmail || '',
    requestType: "",
    startDate: "",
    endDate: "",
    reason: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true)
    try {
      const res = await axiosInstance.post(`/requests/form`,
        {
          requestType: formData.requestType,
          startDate: formData.startDate,
          endDate: formData.endDate,
          reason: formData.reason
        }
      )
      console.log(res)
      setRequest(prevData => ([...prevData, res.data.request]))
      toast.success(res.data.message)
      setFormData({
        name: names || '',
        email: userEmail || '',
        requestType: '',
        startDate: '',
        endDate: '',
        reason: ''
      })
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.errorMessage[0].msg || error.message)
    } finally {
      setLoading(false)
    }
  };

  return (
    <div className='h-screen text-center flex items-center justify-center'>
      <div className="min-w-[500px] p-4 border border-gray-500 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Request Form</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          {/* Name */}
          <div className="flex flex-col text-left">
            <label htmlFor="name" className="mb-1 font-medium">Name</label>
            <input
              readOnly
              id="name"
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="p-2 border border-gray-500 rounded-full outline-0"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col text-left">
            <label htmlFor="email" className="mb-1 font-medium">Email</label>
            <input
              readOnly
              id="email"
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="p-2 border border-gray-500 rounded-full outline-0"
            />
          </div>

          {/* Request Type */}
          <div className="flex flex-col text-left">
            <label htmlFor="requestType" className="mb-1 font-medium">Request Type</label>
            <select
              id="requestType"
              name="requestType"
              value={formData.requestType}
              onChange={handleChange}
              required
              className="p-2 border border-gray-500 rounded-full outline-0"
            >
              <option value="" className="bg-zinc-800">Select Type</option>
              <option value="Sick Leave" className="bg-zinc-800">Sick Leave</option>
              <option value="Vacation" className="bg-zinc-800">Vacation</option>
              <option value="Personal Leave" className="bg-zinc-800">Personal Leave</option>
              <option value="Other" className="bg-zinc-800">Other</option>
            </select>
          </div>

          {/* Start Date */}
          <div className="flex flex-col text-left">
            <label htmlFor="startDate" className="mb-1 font-medium">Start Date</label>
            <input
              id="startDate"
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
              className="p-2 border border-gray-500 rounded-full outline-0"
            />
          </div>

          {/* End Date */}
          <div className="flex flex-col text-left">
            <label htmlFor="endDate" className="mb-1 font-medium">End Date</label>
            <input
              id="endDate"
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              required
              className="p-2 border border-gray-500 rounded-full outline-0"
            />
          </div>

          {/* Reason / Notes */}
          <div className="flex flex-col text-left">
            <label htmlFor="reason" className="mb-1 font-medium">Reason / Notes</label>
            <textarea
              required={formData.requestType === 'Other'}
              readOnly={formData.requestType !== 'Other'}
              id="reason"
              name="reason"
              placeholder="Reason (optional)"
              value={formData.reason}
              onChange={handleChange}
              className="p-2 border border-gray-500 rounded"
            />
          </div>

          {/* Submit Button */}
          <button
            disabled={loading}
            type="submit"
            className="bg-zinc-800 text-white
             p-2 rounded-md hover:bg-zinc-700 transition ease-in-out 
             duration-300 cursor-pointer"
          >
            Submit Request
          </button>
        </form>
      </div>
    </div>
  )
}

export default ClientApplyRequest