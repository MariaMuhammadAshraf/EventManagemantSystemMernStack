import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { MapPin, Calendar, ArrowLeft } from "lucide-react";

function ExpoDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [expo, setExpo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExpo = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/expos/${id}`
        );
        setExpo(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchExpo();
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center text-white text-xl">
        Loading event details...
      </div>
    );

  if (!expo)
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center text-white text-xl">
        Expo not found
      </div>
    );

  return (
    <div className="min-h-screen bg-[#020617] text-white relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-sky-500/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 blur-[120px] rounded-full" />

      {/* Hero Section */}
      <div className="relative h-[400px] w-full">
        <img
          src={
            expo.image ||
            "https://images.unsplash.com/photo-1540575467063-178a50c2df87"
          }
          alt={expo.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-black/60 to-transparent" />

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20 hover:bg-white hover:text-black transition-all"
        >
          <ArrowLeft size={18} />
          Back
        </button>
      </div>

      {/* Content Card */}
      <div className="relative -mt-24 max-w-5xl mx-auto px-6 pb-16">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 shadow-2xl">

          {/* Status Badge */}
          <div className="mb-4">
            <span className="px-4 py-1 text-xs font-bold uppercase tracking-widest rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-400/30">
              {expo.availability === "available"
                ? "Available"
                : "Closed"}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-sky-400 to-purple-500 bg-clip-text text-transparent">
            {expo.title}
          </h1>

          {/* Info Row */}
          <div className="flex flex-col md:flex-row md:items-center gap-6 text-slate-300 mb-8">

            <div className="flex items-center gap-3">
              <MapPin className="text-sky-400" size={20} />
              <span>{expo.location}</span>
            </div>

            <div className="flex items-center gap-3">
              <Calendar className="text-purple-400" size={20} />
              <span>
                {expo.startDate
                  ? new Date(expo.startDate).toLocaleDateString()
                  : "TBA"}{" "}
                -{" "}
                {expo.endDate
                  ? new Date(expo.endDate).toLocaleDateString()
                  : "TBA"}
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="text-slate-400 leading-relaxed text-lg">
            {expo.description ||
              "No description available for this event. Stay tuned for updates and announcements regarding this expo."}
          </div>

          

        </div>
      </div>
    </div>
  );
}

export default ExpoDetails;