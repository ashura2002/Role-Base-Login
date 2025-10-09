import React, { useContext, useState } from "react";
import axiosInstance from "../../utils/AxiosInstance";
import { jwtDecode } from "jwt-decode"
import type { TokenPayload } from "../LoginPage";
import Swal from "sweetalert2";
import { RequestContext } from "../../contexts/FormRequestContext";
import LoadingContext from "../../contexts/LoadingContext";
import { AxiosError } from "axios";



const ClientApplyLeavePage = () => {
  const context = useContext(RequestContext)
  const loadingContext = useContext(LoadingContext)
  if (!loadingContext) return <div>Loading...</div>
  if (!context) return <div>Loading...</div>

  const { setLoading, loading } = loadingContext
  const { setRequest } = context

  const token = localStorage.getItem('token') || ''
  const decoded = jwtDecode<TokenPayload>(token)

  const [formData, setFormData] = useState({
    userId: decoded.userId,
    requestType: "Sick Leave",
    startDate: "",
    endDate: "",
    reason: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true)
    try {
      const res = await axiosInstance.post(`/requests/form`, formData)
      Swal.fire({
        title: 'Success',
        text: res.data.message,
        timer: 1000
      })
      setRequest(prev => [...prev, res.data.requests])
      setFormData({
        userId: decoded.userId,
        requestType: "Sick Leave",
        startDate: "",
        endDate: "",
        reason: "",
      })
    } catch (error) {
      if (error instanceof AxiosError) {
        Swal.fire({
          title: 'Error',
          text: error.response?.data?.errorMessage[0].msg,
          timer: 1000
        })
      }
    } finally {
      setLoading(false)
    }
  };


  return (
    <div className="min-h-screen bg-zinc-900 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg bg-zinc-800 rounded-2xl shadow-xl border border-zinc-700 p-8">
        <h1 className="text-3xl font-bold text-white text-center mb-6">
          Apply for Leave
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">

          <div>
            <label className="block text-gray-300 font-medium mb-2">Request Type</label>
            <select
              name="requestType"
              value={formData.requestType}
              onChange={handleChange}
              className="w-full bg-zinc-700 border border-zinc-600
               text-white p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 
               focus:border-transparent outline-none transition duration-200"
            >
              <option value="Sick Leave">Sick Leave</option>
              <option value="Vacation">Vacation</option>
              <option value="Personal Leave">Personal Leave</option>
              <option value="Other">Other</option>
            </select>
          </div>


          <div>
            <label className="block text-gray-300 font-medium mb-2">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full bg-zinc-700 border border-zinc-600
               text-white p-3 rounded-xl focus:ring-2 focus:ring-indigo-500
                focus:border-transparent outline-none transition duration-200"
              required
            />
          </div>


          <div>
            <label className="block text-gray-300 font-medium mb-2">End Date</label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="w-full bg-zinc-700 border border-zinc-600
               text-white p-3 rounded-xl focus:ring-2 focus:ring-indigo-500
                focus:border-transparent outline-none transition duration-200"
              required
            />
          </div>


          <div>
            <label className="block text-gray-300 font-medium mb-2">Reason</label>
            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              placeholder="Briefly explain your reason..."
              rows={4}
              className="w-full bg-zinc-700 border border-zinc-600
               text-white p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 
               focus:border-transparent outline-none transition duration-200"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            disabled={loading}
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700
             text-white font-semibold py-3 rounded-xl transition transform 
             hover:scale-105 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          >
            {loading ? 'Submitting Request...' : 'Submit Request'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ClientApplyLeavePage;
