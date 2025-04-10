import React from 'react';
import { FaUserEdit, FaRegClock, FaCheckCircle, FaChartLine, FaSmile, FaMobileAlt, FaShareAlt, FaChartBar } from 'react-icons/fa';

function Benefits() {
    return (
        <div className="py-10 px-4 bg-gray-50 flex justify-center">
            <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 text-center">

                {/* How it Works */}
                <div>
                    <h2 className="text-2xl font-bold text-red-800 mb-6">How it Works</h2>
                    <div className="space-y-8">
                        <div className="flex flex-col items-center gap-2">
                            <FaUserEdit className="text-blue-600" size={40} />
                            <p>Enter Details (USN, Name, College)</p>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <FaRegClock className="text-blue-600" size={40} />
                            <p>Attempt Test Weekly</p>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <FaCheckCircle className="text-blue-600" size={40} />
                            <p>Get Instant Results</p>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <FaChartLine className="text-blue-600" size={40} />
                            <p>Track Your Progress</p>
                        </div>
                    </div>
                </div>

                {/* Benefits */}
                <div>
                    <h2 className="text-2xl font-bold text-red-800 mb-6">Benefits</h2>
                    <div className="space-y-8">
                        <div className="flex flex-col items-center gap-2">
                            <FaSmile className="text-blue-600" size={40} />
                            <p>Student-Friendly</p>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <FaMobileAlt className="text-blue-600" size={40} />
                            <p>Lightweight & Simple UI</p>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <FaShareAlt className="text-blue-600" size={40} />
                            <p>Result Sharing with College</p>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <FaChartBar className="text-blue-600" size={40} />
                            <p>Reports & Analytics for Admin</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Benefits;
