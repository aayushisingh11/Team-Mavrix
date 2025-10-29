import React from "react";
import { Users, UserCircle2, ChevronRight } from "lucide-react";

const TravelCompanionsEnhanced = () => {
  const groupInfo = [
    { name: "John Doe", age: 29, gender: "Male" },
    { name: "Sarah Wilson", age: 27, gender: "Female" },
    { name: "Mike Chen", age: 31, gender: "Male" },
  ];

  const getAvatarColor = (gender) => {
    return gender === "Female"
      ? "bg-pink-100 text-pink-600"
      : "bg-blue-100 text-blue-600";
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                Travel Companions
                <span className="text-xs font-medium bg-indigo-100 text-indigo-700 px-2.5 py-1 rounded-full">
                  {groupInfo.length}{" "}
                  {groupInfo.length === 1 ? "member" : "members"}
                </span>
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Group members for this trip
              </p>
            </div>
          </div>

          {/* Members List */}
          <div className="space-y-3">
            {groupInfo.map((member, index) => (
              <div
                key={index}
                className="group relative flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all duration-200 cursor-pointer"
              >
                {/* Avatar */}
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${getAvatarColor(
                    member.gender
                  )} transition-transform group-hover:scale-110`}
                >
                  <UserCircle2 className="w-6 h-6" />
                </div>

                {/* Member Info */}
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-gray-900 truncate">
                    {member.name}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mt-0.5">
                    <span>{member.age} years</span>
                    <span className="w-1 h-1 rounded-full bg-gray-400"></span>
                    <span>{member.gender}</span>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="flex items-center gap-3">
                  <span className="text-xs font-medium bg-green-100 text-green-700 px-2.5 py-1 rounded-full">
                    Confirmed
                  </span>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-indigo-500 transition-colors" />
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/0 to-purple-500/0 group-hover:from-indigo-500/5 group-hover:to-purple-500/5 transition-all pointer-events-none"></div>
              </div>
            ))}
          </div>

          {/* Footer Action */}
          <button className="w-full mt-4 py-3 px-4 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-medium rounded-xl transition-colors duration-200 flex items-center justify-center gap-2 border border-indigo-200 hover:border-indigo-300">
            <Users className="w-4 h-4" />
            Add Another Companion
          </button>
        </div>
      </div>
    </div>
  );
};

export default TravelCompanionsEnhanced;
