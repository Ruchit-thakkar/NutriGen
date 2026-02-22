import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import api from "../utils/api";
import {
  Loader2,
  User,
  Activity,
  HeartPulse,
  Moon,
  Droplets,
  Ruler,
  Weight,
  Target,
  Briefcase,
  Pill,
  Flame,
  Globe,
  CheckCircle2,
  Save,
} from "lucide-react";

const Profile = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    age: "",
    gender: "Male",
    height: "",
    weight: "",
    bodyFat: "",
    regionFoodPreference: "",
    activityLevel: "sedentary",
    stepsPerDay: "",
    jobType: "desk",
    primaryGoal: "fat_loss",
    targetWeight: "",
    timeline: "",
    medicalConditions: "",
    allergies: "",
    medications: "",
    sleepTarget: 8,
    waterTarget: 3,
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/api/profile/get");
        if (res.data.success && res.data.profile) {
          const p = res.data.profile;
          setFormData({
            age: p.basic?.age || "",
            gender: p.basic?.gender || "Male",
            height: p.basic?.height || "",
            weight: p.basic?.weight || "",
            bodyFat: p.basic?.bodyFat || "",
            regionFoodPreference: p.basic?.regionFoodPreference || "",
            activityLevel: p.lifestyle?.activityLevel || "sedentary",
            stepsPerDay: p.lifestyle?.stepsPerDay || "",
            jobType: p.lifestyle?.jobType || "desk",
            primaryGoal: p.goals?.primaryGoal || "fat_loss",
            targetWeight: p.goals?.targetWeight || "",
            timeline: p.goals?.timeline || "",
            medicalConditions: p.health?.medicalConditions?.join(", ") || "",
            allergies: p.health?.allergies?.join(", ") || "",
            medications: p.health?.medications?.join(", ") || "",
            sleepTarget: p.health?.sleepTarget || 8,
            waterTarget: p.health?.waterTarget || 3,
          });
        }
      } catch (error) {
        // Expected if no profile exists
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    // 🟢 FIX 3: Helper to stop empty strings from turning into 0 or NaN
    const safeNum = (val) =>
      val === "" || isNaN(val) ? undefined : Number(val);

    const payload = {
      basic: {
        age: safeNum(formData.age),
        gender: formData.gender,
        height: safeNum(formData.height),
        weight: safeNum(formData.weight),
        bodyFat: safeNum(formData.bodyFat),
        regionFoodPreference: formData.regionFoodPreference,
      },
      lifestyle: {
        activityLevel: formData.activityLevel,
        stepsPerDay: safeNum(formData.stepsPerDay),
        jobType: formData.jobType,
      },
      goals: {
        primaryGoal: formData.primaryGoal,
        targetWeight: safeNum(formData.targetWeight),
        timeline: safeNum(formData.timeline),
      },
      health: {
        medicalConditions: formData.medicalConditions
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        allergies: formData.allergies
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        medications: formData.medications
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        sleepTarget: safeNum(formData.sleepTarget) || 8,
        waterTarget: safeNum(formData.waterTarget) || 3,
      },
    };

    try {
      const res = await api.post("/api/profile/update", payload);
      if (res.data.success) {
        toast.success("Profile updated successfully.");
      }
    } catch (error) {
      // This will now catch the exact backend error message!
      toast.error(error.response?.data?.message || "Failed to save profile.");
    } finally {
      setIsSaving(false);
    }
  };

  if (loading)
    return (
      <div className="min-h-[70vh] flex flex-col justify-center items-center">
        <div className="bg-white/60 backdrop-blur-xl p-8 rounded-3xl border border-white shadow-xl flex flex-col items-center">
          <Loader2 className="animate-spin text-indigo-500 mb-4" size={48} />
          <p className="text-slate-500 font-bold tracking-widest uppercase text-sm">
            Loading Data
          </p>
        </div>
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto pb-32 pt-4 animate-in fade-in duration-700 relative z-10">
      <div className="mb-10 mt-8">
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">
          Health Profile
        </h1>
        <p className="mt-2 text-slate-500 font-medium text-lg max-w-2xl">
          Keep your biometrics updated. Our AI uses this exact math to generate
          your daily plans.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <CleanCard
            className="lg:col-span-2"
            icon={<User className="text-blue-500" size={24} />}
            title="Core Biometrics"
          >
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <CleanInput
                label="Age"
                name="age"
                type="number"
                value={formData.age}
                onChange={handleChange}
              />
              <CleanSelect
                label="Gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                options={["Male", "Female", "Other"]}
              />
              <CleanInput
                label="Height (cm)"
                name="height"
                type="number"
                value={formData.height}
                onChange={handleChange}
                icon={<Ruler size={16} />}
              />
              <CleanInput
                label="Weight (kg)"
                name="weight"
                type="number"
                value={formData.weight}
                onChange={handleChange}
                icon={<Weight size={16} />}
              />
              <CleanInput
                label="Body Fat %"
                name="bodyFat"
                type="number"
                value={formData.bodyFat}
                onChange={handleChange}
                required={false}
                icon={<Flame size={16} />}
              />
              <CleanInput
                label="Diet Region"
                name="regionFoodPreference"
                value={formData.regionFoodPreference}
                onChange={handleChange}
                required={false}
                icon={<Globe size={16} />}
              />
            </div>
          </CleanCard>

          <div className="bg-white/60 backdrop-blur-2xl rounded-[2.5rem] p-8 border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col justify-between hover:shadow-[0_20px_60px_rgb(59,130,246,0.1)] transition-all">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-blue-50 text-blue-500 rounded-2xl shadow-inner border border-white">
                <Droplets size={24} />
              </div>
              <span className="font-black text-slate-800 text-xl tracking-tight">
                Hydration
              </span>
            </div>
            <div>
              <div className="flex items-baseline gap-2 border-b-2 border-white/50 focus-within:border-blue-500 pb-2 transition-colors">
                <input
                  type="number"
                  step="0.5"
                  name="waterTarget"
                  value={formData.waterTarget}
                  onChange={handleChange}
                  required
                  className="w-full text-6xl font-black text-slate-900 bg-transparent outline-none placeholder-slate-300 tracking-tighter"
                />
                <span className="text-xl font-bold text-slate-400">Liters</span>
              </div>
              <p className="text-slate-500 font-medium text-sm mt-4">
                Target intake per day
              </p>
            </div>
          </div>

          <CleanCard
            className="lg:col-span-2"
            icon={<Target className="text-emerald-500" size={24} />}
            title="Optimization Goals"
          >
            <div className="flex flex-col gap-6">
              <CleanSelect
                label="Primary Objective"
                name="primaryGoal"
                value={formData.primaryGoal}
                onChange={handleChange}
                options={[
                  { val: "fat_loss", label: "Fat Loss" },
                  { val: "muscle_gain", label: "Muscle Gain" },
                  { val: "recomposition", label: "Body Recomposition" },
                  { val: "maintain", label: "Maintenance" },
                  { val: "endurance", label: "Endurance & Performance" },
                ]}
              />
              <div className="grid grid-cols-2 gap-6">
                <CleanInput
                  label="Target Weight (kg)"
                  name="targetWeight"
                  type="number"
                  value={formData.targetWeight}
                  onChange={handleChange}
                  required={false}
                />
                <CleanInput
                  label="Timeline (Weeks)"
                  name="timeline"
                  type="number"
                  value={formData.timeline}
                  onChange={handleChange}
                  required={false}
                />
              </div>
            </div>
          </CleanCard>

          <div className="bg-white/60 backdrop-blur-2xl rounded-[2.5rem] p-8 border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col justify-between hover:shadow-[0_20px_60px_rgb(99,102,241,0.1)] transition-all">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-indigo-50 text-indigo-500 rounded-2xl shadow-inner border border-white">
                <Moon size={24} />
              </div>
              <span className="font-black text-slate-800 text-xl tracking-tight">
                Nightly Rest
              </span>
            </div>
            <div>
              <div className="flex items-baseline gap-2 border-b-2 border-white/50 focus-within:border-indigo-500 pb-2 transition-colors">
                <input
                  type="number"
                  name="sleepTarget"
                  value={formData.sleepTarget}
                  onChange={handleChange}
                  required
                  className="w-full text-6xl font-black text-slate-900 bg-transparent outline-none placeholder-slate-300 tracking-tighter"
                />
                <span className="text-xl font-bold text-slate-400">Hours</span>
              </div>
              <p className="text-slate-500 font-medium text-sm mt-4">
                Target sleep per night
              </p>
            </div>
          </div>

          <CleanCard
            className="lg:col-span-1"
            icon={<Activity className="text-amber-500" size={24} />}
            title="Lifestyle"
          >
            <div className="flex flex-col gap-6">
              <CleanSelect
                label="Activity Level"
                name="activityLevel"
                value={formData.activityLevel}
                onChange={handleChange}
                options={[
                  { val: "sedentary", label: "Sedentary" },
                  { val: "light", label: "Lightly Active" },
                  { val: "moderate", label: "Moderately Active" },
                  { val: "active", label: "Highly Active" },
                  { val: "athlete", label: "Athlete" },
                ]}
              />
              <CleanSelect
                label="Job Type"
                name="jobType"
                value={formData.jobType}
                onChange={handleChange}
                options={[
                  { val: "desk", label: "Desk / Office" },
                  { val: "field", label: "Field / Physical" },
                  { val: "mixed", label: "Mixed Context" },
                ]}
              />
              <CleanInput
                label="Avg Steps/Day"
                name="stepsPerDay"
                type="number"
                value={formData.stepsPerDay}
                onChange={handleChange}
                required={false}
                icon={<Briefcase size={16} />}
              />
            </div>
          </CleanCard>

          <CleanCard
            className="lg:col-span-2"
            icon={<HeartPulse className="text-rose-500" size={24} />}
            title="Clinical Details"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CleanInput
                label="Medical Conditions (Comma separated)"
                name="medicalConditions"
                value={formData.medicalConditions}
                onChange={handleChange}
                required={false}
              />
              <CleanInput
                label="Known Allergies (Comma separated)"
                name="allergies"
                value={formData.allergies}
                onChange={handleChange}
                required={false}
              />
              <div className="md:col-span-2">
                <CleanInput
                  label="Current Medications (Comma separated)"
                  name="medications"
                  value={formData.medications}
                  onChange={handleChange}
                  required={false}
                  icon={<Pill size={16} />}
                />
              </div>
            </div>
          </CleanCard>
        </div>

        {/* Floating Save Button */}
        <div className="bottom-6 left-0 mt-6 right-0 z-50 flex justify-center px-4 pointer-events-none">
          <button
            type="submit"
            disabled={isSaving}
            className={`pointer-events-auto flex items-center justify-center gap-2 w-full max-w-md px-8 py-4 rounded-2xl font-bold text-base transition-all duration-200 shadow-[0_8px_30px_rgba(0,0,0,0.12)] active:scale-[0.98] ${
              isSaving
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-gray-900 text-white hover:bg-gray-800 hover:shadow-[0_12px_40px_rgba(0,0,0,0.15)]"
            }`}
          >
            {isSaving ? (
              <>
                <Loader2 className="animate-spin" size={20} /> Saving Changes...
              </>
            ) : (
              <>
                <CheckCircle2 size={20} /> Save Profile Data
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

/* --- MINIMALIST CLEAN COMPONENTS --- */
const CleanCard = ({ className = "", icon, title, children }) => (
  <div
    className={`bg-white/60 backdrop-blur-2xl rounded-[2.5rem] p-8 border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] ${className}`}
  >
    <div className="flex items-center gap-4 mb-8 pb-6 border-b border-white/50">
      <div className="p-3 bg-white border border-white shadow-sm rounded-2xl">
        {icon}
      </div>
      <h2 className="text-2xl font-black text-slate-800 tracking-tight">
        {title}
      </h2>
    </div>
    {children}
  </div>
);

const CleanInput = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  icon,
  required = true,
}) => (
  <div className="flex flex-col gap-2 w-full">
    <label
      htmlFor={name}
      className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1 flex justify-between"
    >
      {label} {required && <span className="text-rose-500">*</span>}
    </label>
    <div className="relative flex items-center">
      {icon && (
        <div className="absolute left-4 text-slate-400 pointer-events-none">
          {icon}
        </div>
      )}
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        required={required}
        className={`w-full py-3.5 bg-white/50 border border-white shadow-sm text-slate-900 rounded-2xl focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/30 transition-all outline-none text-base font-semibold placeholder:text-slate-300 ${icon ? "pl-11 pr-4" : "px-4"}`}
      />
    </div>
  </div>
);

const CleanSelect = ({ label, name, value, onChange, options }) => (
  <div className="flex flex-col gap-2 w-full">
    <label
      htmlFor={name}
      className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1 flex justify-between"
    >
      {label} <span className="text-rose-500">*</span>
    </label>
    <div className="relative flex items-center">
      <select
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        className="w-full py-3.5 bg-white/50 border border-white shadow-sm text-slate-900 rounded-2xl focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/30 transition-all outline-none text-base font-semibold appearance-none px-4 cursor-pointer"
      >
        {options.map((opt, i) => {
          const val = typeof opt === "string" ? opt : opt.val;
          const lbl = typeof opt === "string" ? opt : opt.label;
          return (
            <option key={i} value={val}>
              {lbl}
            </option>
          );
        })}
      </select>
      <div className="absolute right-4 text-slate-400 pointer-events-none">
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </div>
    </div>
  </div>
);

export default Profile;
