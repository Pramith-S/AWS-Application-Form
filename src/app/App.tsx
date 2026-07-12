import { useState } from "react";
import { motion } from "motion/react";
import { supabase } from "@/lib/supabaseClient";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import jssateLogo from "@/imports/JSSATE-B-logo-black__1_.png";
import brandAsset from "@/imports/brand-asset-instagram-post-20260623T152419.png";
import awsLogo from "@/imports/AWS-Dark.png";
import greenChipIcon from "@/imports/AWS_Student_Builder_Group_RGB_Program_Icon_Purple.png";
import greenChipIcon2 from "@/imports/AWS_Student_Builder_Group_RGB_Program_Icon_Purple-1.png";
import {
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface FormData {
  // S1
  fullName: string;
  usn: string;
  email: string;
  phone: string;
  branch: string;
  year: string;
  linkedin: string;
  github: string;
  resumeLink: string;
  // S2
  aboutYourself: string;
  whyJoin: string;
  interests: string[];
  // S3
  participated: string[];
  achievements: string;
  // S4
  preferredTeam: string;
  whyTeam: string;
  // S4b — Tech
  techAreas: string[];
  techTools: string[];
  techProject: string;
  // S4b — Marketing
  marketingTools: string[];
  marketingCustomTools: string;
  marketingFocus: string;
  marketingPortfolio: string;
  // S4b — Events
  eventsExperience: string;
  eventsFocus: string;
  eventsDescription: string;
  // S4b — Operations
  opsComfort: string;
  opsFocus: string;
  opsDescription: string;
  // S5
  lowRegistrations: string;
  initiative: string;
  taskDeadline: string;
  // S6
  projectIdea: string;
  openSource: string;
  // S7
  timeCommitment: string;
  volunteer: string;
  whySelect: string;
}

const INITIAL: FormData = {
  fullName: "",
  usn: "",
  email: "",
  phone: "",
  branch: "",
  year: "",
  linkedin: "",
  github: "",
  resumeLink: "",
  aboutYourself: "",
  whyJoin: "",
  interests: [],
  participated: [],
  achievements: "",
  preferredTeam: "",
  whyTeam: "",
  techAreas: [],
  techTools: [],
  techProject: "",
  marketingTools: [],
  marketingCustomTools: "",
  marketingFocus: "",
  marketingPortfolio: "",
  eventsExperience: "",
  eventsFocus: "",
  eventsDescription: "",
  opsComfort: "",
  opsFocus: "",
  opsDescription: "",
  lowRegistrations: "",
  initiative: "",
  taskDeadline: "",
  projectIdea: "",
  openSource: "",
  timeCommitment: "",
  volunteer: "",
  whySelect: "",
};

const SECTIONS = [
  { id: 1, label: "Basic Info" },
  { id: 2, label: "About You" },
  { id: 3, label: "Experience" },
  { id: 4, label: "Team" },
  { id: 5, label: "Leadership" },
  { id: 6, label: "Builder" },
  { id: 7, label: "Commitment" },
  { id: 8, label: "Submit" },
];

const BRANCHES = [
  "CSE (AI & ML)",
  "Computer Science and Engineering",
  "Information Science and Engineering",
  "Electronics and Communication Engineering",
  "Robotics and Automation",
  "Electronics and Instrumentation Engineering",
];

const YEARS = ["2nd Year", "3rd Year", "4th Year"];

const INTERESTS = [
  "Cloud Computing",
  "Artificial Intelligence",
  "Machine Learning",
  "Open Source",
  "DevOps",
  "Web Development",
  "Mobile Development",
  "Cybersecurity",
  "Community Building",
  "Event Management",
  "Content Creation",
  "Entrepreneurship",
];

const PARTICIPATION = [
  "Hackathons",
  "Student Clubs",
  "Technical Communities",
  "Workshops",
  "Open Source Contributions",
  "Event Organization",
  "Leadership Roles",
  "Research Projects",
  "None",
];

const TEAMS = [
  "Tech Team — Automation, Web Dev, Technical Stuff",
  "Marketing — Design, Content Creation and Outreach",
  "Events — Production, Sponsorship and Outreach",
  "Operations — Finance and Management",
];

const TECH_AREAS = [
  "Web Development",
  "Automation & Scripting",
  "Cloud & AWS",
  "DevOps",
  "Mobile Development",
  "AI / ML",
];
const TECH_TOOLS = [
  "HTML / CSS",
  "JavaScript / TypeScript",
  "Python",
  "React",
  "Node.js",
  "Git",
  "Docker",
  "AWS CLI",
];
const MARKETING_TOOLS = [
  "Figma",
  "Canva",
  "Photoshop",
  "DSLR Camera",
  "Instagram Creator Studio",
  "CapCut",
  "Other video editing softwares",
];
const MARKETING_FOCUS = [
  "Graphic Design",
  "Photography",
  "Content Creating",
  "Video Editing",
];
const EVENTS_FOCUS = [
  "Production & Logistics",
  "Sponsorship & Partnerships",
  "Outreach & Promotions",
  "All of the above",
];
const OPS_FOCUS = [
  "Finance & Budgeting",
  "Team Coordination",
  "Documentation & Reporting",
  "Resource Planning",
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function Label({
  children,
  required,
}: {
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label className="block text-sm font-medium text-[#c8d8ee] mb-2 font-['Space_Grotesk']">
      {children}
      {required && (
        <span className="text-[#00D68F] ml-1">*</span>
      )}
    </label>
  );
}

function TextInput({
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="
        w-full px-4 py-3 rounded-lg bg-[#111825] border border-white/10
        text-[#e8edf5] placeholder-[#3d5070] font-['Inter'] text-sm
        focus:outline-none focus:border-[#00D68F]/60 focus:ring-1 focus:ring-[#00D68F]/30
        transition-all duration-200
      "
    />
  );
}

function TextArea({
  value,
  onChange,
  placeholder,
  rows = 4,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="
        w-full px-4 py-3 rounded-lg bg-[#111825] border border-white/10
        text-[#e8edf5] placeholder-[#3d5070] font-['Inter'] text-sm
        focus:outline-none focus:border-[#00D68F]/60 focus:ring-1 focus:ring-[#00D68F]/30
        transition-all duration-200 resize-none
      "
    />
  );
}

function SelectInput({
  value,
  onChange,
  options,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder?: string;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="
        w-full px-4 py-3 rounded-lg bg-[#111825] border border-white/10
        text-[#e8edf5] font-['Inter'] text-sm
        focus:outline-none focus:border-[#00D68F]/60 focus:ring-1 focus:ring-[#00D68F]/30
        transition-all duration-200 appearance-none cursor-pointer
      "
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236b80a0' d='M6 8L1 3h10z'/%3E%3C/svg%3E\")",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right 1rem center",
      }}
    >
      <option value="" disabled className="bg-[#1d2940]">
        {placeholder ?? "Select…"}
      </option>
      {options.map((o) => (
        <option key={o} value={o} className="bg-[#1d2940]">
          {o}
        </option>
      ))}
    </select>
  );
}

function CheckboxGroup({
  options,
  selected,
  onChange,
}: {
  options: string[];
  selected: string[];
  onChange: (v: string[]) => void;
}) {
  const toggle = (opt: string) => {
    onChange(
      selected.includes(opt)
        ? selected.filter((x) => x !== opt)
        : [...selected, opt],
    );
  };
  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-2">
      {options.map((opt) => {
        const checked = selected.includes(opt);
        return (
          <button
            key={opt}
            type="button"
            onClick={() => toggle(opt)}
            className={`
              flex items-center gap-2 px-3 py-2.5 rounded-lg border text-left text-sm
              font-['Inter'] transition-all duration-150 cursor-pointer
              ${
                checked
                  ? "border-[#00D68F]/50 bg-[#00D68F]/10 text-[#00D68F]"
                  : "border-white/10 bg-[#111825] text-[#8a9bb8] hover:border-white/20 hover:text-[#c8d8ee]"
              }
            `}
          >
            <div
              className={`w-4 h-4 rounded flex-shrink-0 border flex items-center justify-center transition-colors duration-150 ${checked ? "border-[#00D68F] bg-[#00D68F]" : "border-white/20 bg-transparent"}`}
            >
              {checked && (
                <svg
                  width="9"
                  height="7"
                  viewBox="0 0 9 7"
                  fill="none"
                >
                  <path
                    d="M1 3.5L3.5 6L8 1"
                    stroke="#0d1520"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>
            <span>{opt}</span>
          </button>
        );
      })}
    </div>
  );
}

function RadioGroup({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      {options.map((opt) => {
        const selected = value === opt;
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={`
              flex items-center gap-3 px-4 py-3 rounded-lg border text-left text-sm
              font-['Inter'] transition-all duration-150 cursor-pointer
              ${
                selected
                  ? "border-[#00D68F]/50 bg-[#00D68F]/10 text-[#00D68F]"
                  : "border-white/10 bg-[#111825] text-[#8a9bb8] hover:border-white/20 hover:text-[#c8d8ee]"
              }
            `}
          >
            <div
              className={`w-4 h-4 rounded-full flex-shrink-0 border-2 flex items-center justify-center transition-colors duration-150 ${selected ? "border-[#00D68F]" : "border-white/20"}`}
            >
              {selected && (
                <div className="w-2 h-2 rounded-full bg-[#00D68F]" />
              )}
            </div>
            <span>{opt}</span>
          </button>
        );
      })}
    </div>
  );
}

function FormField({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`mb-6 ${className}`}>{children}</div>;
}

function WordHint({ range = "20–30" }: { range?: string }) {
  return (
    <p className="text-[10px] font-['DM_Mono'] text-[#00D68F]/70 tracking-wide mb-2">
      ✦ Keep your answer to {range} words
    </p>
  );
}

function SectionHeader({
  number,
  title,
  subtitle,
}: {
  number: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-8 pb-6 border-b border-white/8">
      <div className="flex items-center gap-3 mb-2">
        <span className="font-['DM_Mono'] text-xs text-[#00D68F] tracking-widest uppercase">
          {number}
        </span>
        <div className="h-px flex-1 bg-gradient-to-r from-[#00D68F]/30 to-transparent" />
      </div>
      <h2 className="text-xl font-bold text-white font-['Space_Grotesk']">
        {title}
      </h2>
      {subtitle && (
        <p className="text-sm text-[#6b80a0] mt-1 font-['Inter']">
          {subtitle}
        </p>
      )}
    </div>
  );
}

// ─── ChipIcon SVG (from brand) ────────────────────────────────────────────────
function ChipIcon({
  size = 24,
  color = "#7B40B0",
}: {
  size?: number;
  color?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
    >
      <rect
        x="12"
        y="12"
        width="24"
        height="24"
        rx="2"
        stroke={color}
        strokeWidth="3"
        fill="none"
      />
      <rect
        x="18"
        y="18"
        width="12"
        height="12"
        rx="1"
        stroke={color}
        strokeWidth="2.5"
        fill="none"
      />
      {/* top pins */}
      <line
        x1="18"
        y1="12"
        x2="18"
        y2="6"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <line
        x1="24"
        y1="12"
        x2="24"
        y2="6"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <line
        x1="30"
        y1="12"
        x2="30"
        y2="6"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* bottom pins */}
      <line
        x1="18"
        y1="36"
        x2="18"
        y2="42"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <line
        x1="24"
        y1="36"
        x2="24"
        y2="42"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <line
        x1="30"
        y1="36"
        x2="30"
        y2="42"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* left pins */}
      <line
        x1="12"
        y1="18"
        x2="6"
        y2="18"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <line
        x1="12"
        y1="24"
        x2="6"
        y2="24"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <line
        x1="12"
        y1="30"
        x2="6"
        y2="30"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* right pins */}
      <line
        x1="36"
        y1="18"
        x2="42"
        y2="18"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <line
        x1="36"
        y1="24"
        x2="42"
        y2="24"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <line
        x1="36"
        y1="30"
        x2="42"
        y2="30"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

// ─── Grid background ──────────────────────────────────────────────────────────
function GridBg() {
  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
      }}
    />
  );
}

// ─── Progress bar ─────────────────────────────────────────────────────────────
function ProgressBar({
  current,
  total,
}: {
  current: number;
  total: number;
}) {
  const pct = Math.round(((current - 1) / (total - 1)) * 100);
  return (
    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
      <div
        className="h-full bg-gradient-to-r from-[#00D68F] to-[#00b87a] rounded-full transition-all duration-500"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

// ─── Step nav dots ────────────────────────────────────────────────────────────
function StepNav({
  sections,
  current,
}: {
  sections: typeof SECTIONS;
  current: number;
}) {
  return (
    <div className="flex items-center justify-center gap-1.5 flex-wrap">
      {sections.map((s) => {
        const done = s.id < current;
        const active = s.id === current;
        return (
          <div key={s.id} className="flex items-center gap-1">
            <div
              className={`
              flex items-center justify-center w-6 h-6 rounded-full text-[10px] font-['DM_Mono'] font-medium
              transition-all duration-300
              ${active ? "bg-[#00D68F] text-[#0d1520] scale-110" : done ? "bg-[#00D68F]/20 text-[#00D68F]" : "bg-white/5 text-[#4a6080]"}
            `}
            >
              {done ? (
                <svg
                  width="10"
                  height="8"
                  viewBox="0 0 10 8"
                  fill="none"
                >
                  <path
                    d="M1 4L3.5 6.5L9 1"
                    stroke="#00D68F"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                s.id
              )}
            </div>
            {s.id < sections.length && (
              <div
                className={`w-4 h-px transition-colors duration-300 ${done ? "bg-[#00D68F]/40" : "bg-white/8"}`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

function RadialIntro({
  orbitItems,
  highlights,
}: {
  orbitItems: { id: number; name: string; src: string }[];
  highlights: { icon: string; label: string; color: string }[];
}) {
  const INNER_R = 88;
  const OUTER_R = 148;

  return (
    <div
      className="relative w-full flex items-center justify-center my-8 overflow-hidden rounded-2xl bg-[#09111c] border border-white/8"
      style={{ height: 340 }}
    >
      {/* Ambient radial glow from center */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 240,
          height: 240,
          background:
            "radial-gradient(circle, rgba(0,214,143,0.10) 0%, transparent 70%)",
        }}
        animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0.9, 0.4] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Decorative orbit rings */}
      <div
        className="absolute rounded-full border border-dashed border-[#00D68F]/12 pointer-events-none"
        style={{ width: INNER_R * 2, height: INNER_R * 2 }}
      />
      <div
        className="absolute rounded-full border border-dashed border-[#7B40B0]/10 pointer-events-none"
        style={{ width: OUTER_R * 2, height: OUTER_R * 2 }}
      />
      <div
        className="absolute rounded-full border border-[#00D68F]/8 pointer-events-none"
        style={{ width: 52, height: 52 }}
      />

      {/* CENTER: AWS logo + session label */}
      <motion.div
        className="z-20 flex flex-col items-center justify-center bg-[#111825]/95 backdrop-blur-sm px-4 py-3 rounded-xl border border-[#00D68F]/30 text-center"
        style={{ boxShadow: "0 0 32px rgba(0,214,143,0.18)" }}
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <ImageWithFallback
          src={awsLogo}
          alt="AWS"
          className="h-4 object-contain mb-1.5"
          style={{ filter: "invert(1) brightness(0.75)" }}
        />
        <p className="text-[#00D68F] font-['DM_Mono'] text-[8px] tracking-widest font-semibold uppercase leading-none mb-0.5">
          Tech Session
        </p>
        <p className="text-white font-['Space_Grotesk'] text-xs font-bold leading-none">
          + Workshop
        </p>
      </motion.div>

      {/* INNER ORBIT: Highlight nodes with radial pop effect */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        animate={{ rotate: 360 }}
        transition={{ duration: 42, repeat: Infinity, ease: "linear" }}
      >
        {highlights.map((h, i) => {
          const angle = (i / highlights.length) * Math.PI * 2 - Math.PI / 2;
          const x = Math.cos(angle) * INNER_R;
          const y = Math.sin(angle) * INNER_R;
          return (
            <motion.div
              key={h.label}
              className="absolute"
              style={{ x, y }}
            >
              {/* Counter-rotate content to keep it upright */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 42, repeat: Infinity, ease: "linear" }}
              >
                {/* Radial pop animation */}
                <motion.div
                  className="flex flex-col items-center gap-0.5"
                  animate={{ scale: [0.8, 1.25, 0.8] }}
                  transition={{
                    duration: 2.8,
                    repeat: Infinity,
                    delay: i * 0.56,
                    ease: "easeInOut",
                  }}
                >
                  <motion.div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-base border"
                    style={{
                      borderColor: h.color + "55",
                      backgroundColor: h.color + "18",
                    }}
                    animate={{
                      boxShadow: [
                        `0 0 4px ${h.color}20`,
                        `0 0 20px ${h.color}80`,
                        `0 0 4px ${h.color}20`,
                      ],
                    }}
                    transition={{
                      duration: 2.8,
                      repeat: Infinity,
                      delay: i * 0.56,
                      ease: "easeInOut",
                    }}
                  >
                    {h.icon}
                  </motion.div>
                  <span
                    className="text-[8px] font-['DM_Mono'] tracking-wide whitespace-nowrap font-semibold"
                    style={{ color: h.color }}
                  >
                    {h.label}
                  </span>
                </motion.div>
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* OUTER ORBIT: Profile avatars (counter-clockwise) */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        animate={{ rotate: -360 }}
        transition={{ duration: 58, repeat: Infinity, ease: "linear" }}
      >
        {orbitItems.map((item, i) => {
          const angle = (i / orbitItems.length) * Math.PI * 2;
          const x = Math.cos(angle) * OUTER_R;
          const y = Math.sin(angle) * OUTER_R;
          return (
            <motion.div
              key={item.id}
              className="absolute"
              style={{ x, y }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + i * 0.09, duration: 0.4 }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 58, repeat: Infinity, ease: "linear" }}
              >
                <img
                  src={item.src}
                  alt={item.name}
                  className="w-8 h-8 rounded-full border border-white/15 shadow-lg object-cover"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(item.name)}&background=1d2940&color=00D68F&size=80&bold=true`;
                  }}
                />
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────

export default function App() {
  const [section, setSection] = useState(1);
  const [teamSection, setTeamSection] = useState(false);
  const [form, setForm] = useState<FormData>(INITIAL);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const set = <K extends keyof FormData>(
    key: K,
    value: FormData[K],
  ) => setForm((prev) => ({ ...prev, [key]: value }));

const handleSubmit = async () => {
    const errs = validate();
    if (errs.length > 0) { setValidationErrors(errs); return; }
    setValidationErrors([]);
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      // 1. Check how many applications this USN has already submitted
      const { data: existingApps, error: countError } = await supabase
        .from("applications")
        .select("preferred_team")
        .eq("usn", form.usn.trim());

      if (countError) throw countError;

      // 2. Enforce the maximum limit of 2 applications total
      if (existingApps && existingApps.length >= 2) {
        setSubmitError("Maximum limit reached. You can only submit up to 2 applications total.");
        setIsSubmitting(false);
        return;
      }

      // 3. Enforce that the 2 applications must be for different teams
      const isDuplicateTeam = existingApps?.some(
        (app) => app.preferred_team === form.preferredTeam
      );
      if (isDuplicateTeam) {
        setSubmitError("You have already submitted an application for this specific team structure. Please select a different team.");
        setIsSubmitting(false);
        return;
      }

      // 4. Proceed with insertion if validation checks pass successfully
      const { error } = await supabase
        .from("applications")
        .insert([
          {
            full_name: form.fullName,
            usn: form.usn,
            email: form.email,
            phone: form.phone,
            branch: form.branch,
            year: form.year,
            linkedin: form.linkedin,
            github: form.github || null,
            resume_link: form.resumeLink,
            about_yourself: form.aboutYourself,
            why_join: form.whyJoin,
            interests: form.interests,
            participated: form.participated,
            achievements: form.achievements,
            preferred_team: form.preferredTeam,
            why_team: form.whyTeam,

            // Section 4b — Tech Team Details
            tech_areas:
              form.techAreas.length > 0 ? form.techAreas : null,
            tech_tools:
              form.techTools.length > 0 ? form.techTools : null,
            tech_project: form.techProject || null,

            // Section 4b — Marketing Details
            marketing_tools:
              form.marketingTools.length > 0
                ? form.marketingTools
                : null,
            marketing_custom_tools:
              form.marketingCustomTools || null,
            marketing_focus: form.marketingFocus || null,
            marketing_portfolio:
              form.marketingPortfolio || null,

            // Section 4b — Events Details
            events_experience: form.eventsExperience || null,
            events_focus: form.eventsFocus || null,
            events_description: form.eventsDescription || null,

            // Section 4b — Operations Details
            ops_comfort: form.opsComfort || null,
            ops_focus: form.opsFocus || null,
            ops_description: form.opsDescription || null,

            // Core Long Answers & Commitments
            low_registrations: form.lowRegistrations,
            initiative: form.initiative,
            task_deadline: form.taskDeadline,
            project_idea: form.projectIdea,
            open_source: form.openSource,
            time_commitment: form.timeCommitment,
            volunteer: form.volunteer,
            why_select: form.whySelect,
          },
        ]);

      if (error) throw error;
      setSubmitted(true);
    } catch (err: any) {
      setSubmitError(
        err.message ?? "Submission failed. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const validate = (): string[] => {
    const errs: string[] = [];
    const req = (val: string, label: string) => { if (!val.trim()) errs.push(label); };
    const reqArr = (val: string[], label: string) => { if (val.length === 0) errs.push(label); };

    if (section === 1) {
      req(form.fullName, "Full Name");
      req(form.usn, "USN");
      req(form.email, "Email Address");
      req(form.phone, "Phone Number");
      req(form.branch, "Branch");
      req(form.year, "Year of Study");
      req(form.linkedin, "LinkedIn Profile URL");
      if (!form.resumeLink.trim()) {
        errs.push("Resume (Google Drive Link)");
      } else {
        try { new URL(form.resumeLink.trim()); } catch { errs.push("Resume link must be a valid URL (e.g. https://drive.google.com/...)"); }
      }
    } else if (section === 2) {
      req(form.aboutYourself, "Tell us about yourself");
      req(form.whyJoin, "Why do you want to join");
      reqArr(form.interests, "At least one interest");
    } else if (section === 3) {
      reqArr(form.participated, "At least one participation option");
      req(form.achievements, "Projects / Achievements");
    } else if (section === 4 && !teamSection) {
      req(form.preferredTeam, "Preferred Team");
      req(form.whyTeam, "Why this team");
    } else if (section === 4 && teamSection) {
      if (form.preferredTeam.startsWith("Tech")) {
        reqArr(form.techAreas, "At least one tech area");
        reqArr(form.techTools, "At least one tech tool");
        req(form.techProject, "Technical project description");
      } else if (form.preferredTeam.startsWith("Marketing")) {
        reqArr(form.marketingTools, "At least one marketing tool");
        req(form.marketingFocus, "Area that excites you most");
      } else if (form.preferredTeam.startsWith("Events")) {
        req(form.eventsExperience, "Events experience");
        if (Array.isArray(form.eventsFocus)) reqArr(form.eventsFocus as string[], "At least one events focus area");
        req(form.eventsDescription, "Events experience description");
      } else if (form.preferredTeam.startsWith("Operations")) {
        req(form.opsComfort, "Ops comfort level");
        if (Array.isArray(form.opsFocus)) reqArr(form.opsFocus as string[], "At least one ops focus area");
        req(form.opsDescription, "Ops experience description");
      }
    } else if (section === 5) {
      req(form.lowRegistrations, "Low registrations answer");
      req(form.initiative, "Initiative / leadership answer");
      req(form.taskDeadline, "Task deadline answer");
    } else if (section === 6) {
      req(form.projectIdea, "Project idea");
      req(form.openSource, "Open source interest");
    } else if (section === 7) {
      req(form.timeCommitment, "Time commitment");
      req(form.volunteer, "Volunteer availability");
      req(form.whySelect, "Why select you");
    }
    return errs;
  };

  const next = () => {
    const errs = validate();
    if (errs.length > 0) { setValidationErrors(errs); return; }
    setValidationErrors([]);
    if (section === 4 && !teamSection) {
      setTeamSection(true);
    } else if (section === 4 && teamSection) {
      setTeamSection(false);
      setSection(5);
    } else {
      setSection((s) => Math.min(s + 1, SECTIONS.length));
    }
  };

  const prev = () => {
    setValidationErrors([]);
    if (section === 5) {
      setTeamSection(true);
      setSection(4);
    } else if (section === 4 && teamSection) {
      setTeamSection(false);
    } else {
      setSection((s) => Math.max(s - 1, 1));
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#161e2d] flex items-center justify-center p-6 relative overflow-hidden">
        <GridBg />

        {/* corner ghost chips */}
        <div
          className="absolute -bottom-16 -right-16 w-80 h-80 pointer-events-none select-none"
          style={{ mixBlendMode: "screen", opacity: 0.07 }}
        >
          <ImageWithFallback
            src={greenChipIcon2}
            alt=""
            className="w-full h-full object-contain"
          />
        </div>
        <div
          className="absolute -top-20 -left-20 w-64 h-64 pointer-events-none select-none"
          style={{ mixBlendMode: "screen", opacity: 0.05 }}
        >
          <ImageWithFallback
            src={greenChipIcon2}
            alt=""
            className="w-full h-full object-contain"
          />
        </div>

        <div className="relative z-10 text-center max-w-sm w-full flex flex-col items-center">
          {/* hero chip — large, centered, screen-blended so white drops out and green glows */}
          <div
            className="w-36 h-36 sm:w-44 sm:h-44 mb-6 pointer-events-none select-none"
            style={{ mixBlendMode: "screen", opacity: 0.9 }}
          >
            <ImageWithFallback
              src={greenChipIcon2}
              alt="AWS Student Builder Group icon"
              className="w-full h-full object-contain"
            />
          </div>

          <div className="flex items-center gap-2 mb-5">
            <CheckCircle2 className="w-5 h-5 text-[#00D68F]" />
            <span className="text-[#00D68F] font-['DM_Mono'] text-xs tracking-widest uppercase">
              Application Received
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-white font-['Space_Grotesk'] mb-3">
            You&apos;re in the queue.
          </h1>
          <p className="text-[#6b80a0] font-['Inter'] text-sm leading-relaxed mb-8 px-2">
            Thank you for applying. Applications will be
            reviewed by the AWS Student Builders Core Team.
            Shortlisted candidates may be invited for a brief
            interaction before final selections are announced.
          </p>

          <div className="flex items-center justify-center gap-2 mb-8">
            {["Learn", "Build", "Connect", "Grow"].map(
              (word, i) => (
                <span
                  key={word}
                  className="flex items-center gap-2"
                >
                  <span className="text-[#00D68F] font-['DM_Mono'] text-sm font-medium">
                    {word}
                  </span>
                  {i < 3 && (
                    <span className="text-white/20">·</span>
                  )}
                </span>
              ),
            )}
          </div>

          {/* AWS logo at bottom */}
          <div className="flex items-center gap-3 opacity-40">
            <ImageWithFallback
              src={awsLogo}
              alt="Amazon Web Services"
              className="h-5 object-contain"
              style={{ filter: "invert(1)" }}
            />
            <span className="text-white/40 font-['DM_Mono'] text-[10px] tracking-widest uppercase">
              Student Builders · JSSATE-B
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#161e2d] relative overflow-x-hidden">
      <GridBg />

      {/* ── Header ── */}
      <header className="relative z-10 border-b border-white/6 bg-[#111825]/80 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          {/* JSSATE logo */}
          <ImageWithFallback
            src={jssateLogo}
            alt="JSSATE-B AWS Student Builder Center"
            className="h-7 sm:h-9 object-contain"
          />
          {/* centre label */}
          <div className="hidden sm:flex items-center gap-2">
            <span className="font-['DM_Mono'] text-[10px] text-[#00D68F] tracking-widest uppercase">
              Founding Member Applications
            </span>
          </div>
          {/* AWS logo right */}
          <div className="flex items-center gap-3">
            <ImageWithFallback
              src={awsLogo}
              alt="Amazon Web Services"
              className="h-5 sm:h-6 object-contain"
              style={{ filter: "invert(1) brightness(0.75)" }}
            />
            <span className="font-['DM_Mono'] text-xs text-[#4a6080]">
              {teamSection ? "4b" : section}/{SECTIONS.length}
            </span>
          </div>
        </div>
      </header>

      {/* ── Hero band ── */}
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 pt-8 pb-4">
        <div className="rounded-2xl overflow-hidden border border-white/8 bg-[#1d2940] flex flex-col">
          {/* brand image — full width, generous height */}
          <div className="w-full relative">
            <ImageWithFallback
              src={brandAsset}
              alt="AWS Student Builder Group at JSSATE-B — Join our community"
              className="w-full h-56 sm:h-72 object-cover object-center"
            />
            {/* green chip icon — blended over the image, bottom-right */}
            <div
              className="absolute bottom-3 right-3 w-20 h-20 sm:w-28 sm:h-28 pointer-events-none select-none"
              style={{ mixBlendMode: "screen", opacity: 0.55 }}
            >
              <ImageWithFallback
                src={greenChipIcon}
                alt=""
                className="w-full h-full object-contain"
              />
            </div>
            {/* gradient fade into card */}
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#1d2940] to-transparent" />
          </div>

          {/* text section */}
          <div className="flex-1 px-5 pb-5 pt-3 sm:px-6 sm:pb-6 flex flex-col justify-center relative overflow-hidden">
            {/* large ghost chip — blended background decoration */}
            <div
              className="absolute -right-6 -bottom-6 w-32 h-32 pointer-events-none select-none"
              style={{ mixBlendMode: "screen", opacity: 0.12 }}
            >
              <ImageWithFallback
                src={greenChipIcon}
                alt=""
                className="w-full h-full object-contain"
              />
            </div>

            <div className="flex items-center gap-2 mb-3">
              {/* small chip icon with blend */}
              <div
                className="w-5 h-5 flex-shrink-0"
                style={{ mixBlendMode: "screen", opacity: 0.9 }}
              >
                <ImageWithFallback
                  src={greenChipIcon}
                  alt=""
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-[10px] font-['DM_Mono'] text-[#00D68F] tracking-widest uppercase">
                AWS Student Builders
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-bold text-white font-['Space_Grotesk'] leading-tight mb-2">
              Founding Member Applications
              <span className="block text-[#00D68F]">
                JSSATE Bengaluru
              </span>
            </h1>
            <p className="text-sm text-[#6b80a0] font-['Inter'] leading-relaxed mb-4">
              We&apos;re looking for passionate students eager
              to learn, build, collaborate, and create impact.
            </p>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[10px] font-['DM_Mono'] text-[#4a6080]">
              <span>10–15 min · 7 sections</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Step nav + progress ── */}
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 py-4 space-y-3">
        <StepNav sections={SECTIONS} current={section} />
        <ProgressBar
          current={section}
          total={SECTIONS.length}
        />
        <p className="text-center text-[10px] font-['DM_Mono'] text-[#4a6080] tracking-wider uppercase">
          {teamSection
            ? "Section 4b: Team Detail Questions"
            : `Section ${section}: ${SECTIONS[section - 1].label}`}
        </p>
      </div>

      {/* ── Form card ── */}
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 pb-28">
        <div className="rounded-2xl border border-white/8 bg-[#1d2940]/70 backdrop-blur-sm p-6 sm:p-8">
          {/* SECTION 1 */}
          {section === 1 && (
            <div>
              <SectionHeader
                number="01 / 08"
                title="Basic Information"
                subtitle="Let's start with your contact details and academic background."
              />

              {/* AI detection notice */}
              <div className="mb-6 flex items-start gap-3 px-4 py-3 rounded-lg border border-amber-500/25 bg-amber-500/8">
                <svg
                  className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5"
                  fill="none"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M8 1.5L14.5 13H1.5L8 1.5Z"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8 6v3.5"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                  />
                  <circle
                    cx="8"
                    cy="11.5"
                    r="0.6"
                    fill="currentColor"
                  />
                </svg>
                <p className="text-xs text-amber-300/80 font-['Inter'] leading-relaxed">
                  <span className="font-semibold text-amber-300">
                    Heads up:
                  </span>{" "}
                  All responses are reviewed by the Core Team.
                  Use of AI-generated content will be detected
                  and may disqualify your application. Write in
                  your own words.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5">
                <FormField>
                  <Label required>Full Name</Label>
                  <TextInput
                    value={form.fullName}
                    onChange={(v) => set("fullName", v)}
                    placeholder="e.g. Arjun Sharma"
                  />
                </FormField>
                <FormField>
                  <Label required>USN</Label>
                  <TextInput
                    value={form.usn}
                    onChange={(v) => set("usn", v)}
                    placeholder="e.g. 1JS22CS001"
                  />
                </FormField>
                <FormField>
                  <Label required>Email Address</Label>
                  <TextInput
                    value={form.email}
                    onChange={(v) => set("email", v)}
                    placeholder="your@email.com"
                    type="email"
                  />
                </FormField>
                <FormField>
                  <Label required>Phone Number</Label>
                  <TextInput
                    value={form.phone}
                    onChange={(v) => set("phone", v)}
                    placeholder="+91 98765 43210"
                    type="tel"
                  />
                </FormField>
                <FormField>
                  <Label required>Branch</Label>
                  <SelectInput
                    value={form.branch}
                    onChange={(v) => set("branch", v)}
                    options={BRANCHES}
                    placeholder="Select your branch"
                  />
                </FormField>
                <FormField>
                  <Label required>Year of Study</Label>
                  <SelectInput
                    value={form.year}
                    onChange={(v) => set("year", v)}
                    options={YEARS}
                    placeholder="Select year"
                  />
                </FormField>
                <FormField className="sm:col-span-2">
                  <Label required>LinkedIn Profile URL</Label>
                  <TextInput
                    value={form.linkedin}
                    onChange={(v) => set("linkedin", v)}
                    placeholder="https://linkedin.com/in/yourprofile"
                  />
                </FormField>
                <FormField className="sm:col-span-2">
                  <Label>
                    GitHub Profile URL{" "}
                    <span className="text-[#4a6080] font-normal text-xs">
                      (Optional)
                    </span>
                  </Label>
                  <TextInput
                    value={form.github}
                    onChange={(v) => set("github", v)}
                    placeholder="https://github.com/yourusername"
                  />
                </FormField>
                <FormField className="sm:col-span-2">
                  <Label required>
                    Resume (Google Drive Link)
                    <span className="ml-2 text-[10px] font-['DM_Mono'] text-amber-400/80 font-normal normal-case tracking-normal">
                      ⚠ Set sharing to "Anyone with the link"
                    </span>
                  </Label>
                  <TextInput
                    value={form.resumeLink}
                    onChange={(v) => set("resumeLink", v)}
                    placeholder="https://drive.google.com/file/d/..."
                  />
                </FormField>
              </div>
            </div>
          )}

          {/* SECTION 2 */}
          {section === 2 && (
            <div>
              <SectionHeader
                number="02 / 08"
                title="About You"
                subtitle="Tell us about yourself and what drives you to build."
              />
              <FormField>
                <Label required>Tell us about yourself.</Label>
                <WordHint />
                <TextArea
                  value={form.aboutYourself}
                  onChange={(v) => set("aboutYourself", v)}
                  rows={4}
                  placeholder="Briefly share your background, interests, and skills that define you as a student and builder."
                />
              </FormField>
              <FormField>
                <Label required>
                  Why do you want to join AWS Student Builders?
                </Label>
                <WordHint />
                <TextArea
                  value={form.whyJoin}
                  onChange={(v) => set("whyJoin", v)}
                  rows={4}
                  placeholder="What draws you to this community and what do you hope to contribute or gain?"
                />
              </FormField>
              <FormField>
                <Label required>
                  What excites you the most?
                </Label>
                <p className="text-xs text-[#4a6080] font-['Inter'] mb-3">
                  Select all that apply.
                </p>
                <CheckboxGroup
                  options={INTERESTS}
                  selected={form.interests}
                  onChange={(v) => set("interests", v)}
                />
              </FormField>
            </div>
          )}

          {/* SECTION 3 */}
          {section === 3 && (
            <div>
              <SectionHeader
                number="03 / 08"
                title="Experience & Achievements"
                subtitle="Help us understand your background and what you've built so far."
              />
              <FormField>
                <Label required>
                  Have you participated in any of the following?
                </Label>
                <p className="text-xs text-[#4a6080] font-['Inter'] mb-3">
                  Select all that apply.
                </p>
                <CheckboxGroup
                  options={PARTICIPATION}
                  selected={form.participated}
                  onChange={(v) => set("participated", v)}
                />
              </FormField>
              <FormField>
                <Label required>
                  Describe any projects, certifications,
                  leadership roles, achievements, or experiences
                  you are proud of.
                </Label>
                <WordHint />
                <TextArea
                  value={form.achievements}
                  onChange={(v) => set("achievements", v)}
                  rows={5}
                  placeholder="e.g. Built a project, earned a certification, led a team, or contributed to an event or open-source repo."
                />
              </FormField>
            </div>
          )}

          {/* SECTION 4 — team selection */}
          {section === 4 && !teamSection && (
            <div>
              <SectionHeader
                number="04 / 08"
                title="Team Preferences"
                subtitle="Select your team — you'll answer a few focused questions next."
              />
              <FormField>
                <Label required>
                  Which team would you most like to contribute
                  to?
                </Label>
                <RadioGroup
                  options={TEAMS}
                  value={form.preferredTeam}
                  onChange={(v) => set("preferredTeam", v)}
                />
              </FormField>
              <FormField>
                <Label required>
                  Why are you interested in this team?
                </Label>
                <WordHint />
                <TextArea
                  value={form.whyTeam}
                  onChange={(v) => set("whyTeam", v)}
                  rows={4}
                  placeholder="Mention skills or experience relevant to this team and how you'd contribute."
                />
              </FormField>
            </div>
          )}

          {/* SECTION 4b — Tech Team */}
          {section === 4 &&
            teamSection &&
            form.preferredTeam.startsWith("Tech") && (
              <div>
                <SectionHeader
                  number="04b / 08"
                  title="Tech Team — Detail"
                  subtitle="Tell us about your technical interests and experience."
                />
                <div className="mb-4 px-3 py-2 rounded-lg bg-[#00D68F]/8 border border-[#00D68F]/20">
                  <span className="text-xs font-['DM_Mono'] text-[#00D68F]">
                    Selected: {form.preferredTeam}
                  </span>
                </div>
                <FormField>
                  <Label required>
                    Which tech areas interest you?
                  </Label>
                  <p className="text-xs text-[#4a6080] font-['Inter'] mb-3">
                    Select all that apply.
                  </p>
                  <CheckboxGroup
                    options={TECH_AREAS}
                    selected={form.techAreas}
                    onChange={(v) => set("techAreas", v)}
                  />
                </FormField>
                <FormField>
                  <Label required>
                    What languages or tools are you comfortable
                    with?
                  </Label>
                  <p className="text-xs text-[#4a6080] font-['Inter'] mb-3">
                    Select all that apply.
                  </p>
                  <CheckboxGroup
                    options={TECH_TOOLS}
                    selected={form.techTools}
                    onChange={(v) => set("techTools", v)}
                  />
                </FormField>
                <FormField>
                  <Label required>
                    Describe a technical project you've built or
                    want to build.
                  </Label>
                  <WordHint />
                  <TextArea
                    value={form.techProject}
                    onChange={(v) => set("techProject", v)}
                    rows={4}
                    placeholder="e.g. Built an AWS Lambda project, working on a React dashboard or automation script."
                  />
                </FormField>
              </div>
            )}

          {/* SECTION 4b — Marketing */}
          {section === 4 &&
            teamSection &&
            form.preferredTeam.startsWith("Marketing") && (
              <div>
                <SectionHeader
                  number="04b / 08"
                  title="Marketing — Detail"
                  subtitle="Tell us about your design, content, and creative experience."
                />
                <div className="mb-4 px-3 py-2 rounded-lg bg-[#00D68F]/8 border border-[#00D68F]/20">
                  <span className="text-xs font-['DM_Mono'] text-[#00D68F]">
                    Selected: {form.preferredTeam}
                  </span>
                </div>
                <FormField>
                  <Label required>
                    Which tools are you familiar with?
                  </Label>
                  <p className="text-xs text-[#4a6080] font-['Inter'] mb-3">
                    Select all that apply.
                  </p>
                  <CheckboxGroup
                    options={MARKETING_TOOLS}
                    selected={form.marketingTools}
                    onChange={(v) => set("marketingTools", v)}
                  />
                </FormField>
                <FormField>
                  <Label required>
                    Which area excites you most?
                  </Label>
                  <RadioGroup
                    options={MARKETING_FOCUS}
                    value={form.marketingFocus}
                    onChange={(v) => set("marketingFocus", v)}
                  />
                </FormField>
                <FormField>
                  <Label>
                    Portfolio link or describe content you've
                    created.{" "}
                    <span className="text-[#4a6080] font-normal text-xs">
                      (Optional)
                    </span>
                  </Label>
                  <TextInput
                    value={form.marketingPortfolio}
                    onChange={(v) =>
                      set("marketingPortfolio", v)
                    }
                    placeholder="https://behance.net/yourprofile  or describe your work…"
                  />
                </FormField>
                <FormField>
                  <Label>
                    Custom tools or software you use.{" "}
                    <span className="text-[#4a6080] font-normal text-xs">
                      (Optional)
                    </span>
                  </Label>
                  <TextInput
                    value={form.marketingCustomTools}
                    onChange={(v) =>
                      set("marketingCustomTools", v)
                    }
                    placeholder="e.g. Adobe After Effects, Blender, etc."
                  />
                </FormField>
              </div>
            )}

          {/* SECTION 4b — Events */}
          {section === 4 &&
            teamSection &&
            form.preferredTeam.startsWith("Events") && (
              <div>
                <SectionHeader
                  number="04b / 08"
                  title="Events Team — Detail"
                  subtitle="Tell us about your event planning and coordination experience."
                />
                <div className="mb-4 px-3 py-2 rounded-lg bg-[#00D68F]/8 border border-[#00D68F]/20">
                  <span className="text-xs font-['DM_Mono'] text-[#00D68F]">
                    Selected: {form.preferredTeam}
                  </span>
                </div>
                <FormField>
                  <Label required>
                    Have you organized or assisted in any events
                    before?
                  </Label>
                  <RadioGroup
                    options={["Yes", "No"]}
                    value={form.eventsExperience}
                    onChange={(v) => set("eventsExperience", v)}
                  />
                </FormField>
                <FormField>
                  <Label required>
                    Which aspect of event management interests
                    you most?
                  </Label>
                  <RadioGroup
                    options={EVENTS_FOCUS}
                    value={form.eventsFocus}
                    onChange={(v) => set("eventsFocus", v)}
                  />
                </FormField>
                <FormField>
                  <Label required>
                    Describe your experience with event
                    planning, coordination, or outreach.
                  </Label>
                  <WordHint />
                  <TextArea
                    value={form.eventsDescription}
                    onChange={(v) =>
                      set("eventsDescription", v)
                    }
                    rows={4}
                    placeholder="e.g. Coordinated a tech fest, managed registrations, or handled logistics for a workshop."
                  />
                </FormField>
              </div>
            )}

          {/* SECTION 4b — Operations */}
          {section === 4 &&
            teamSection &&
            form.preferredTeam.startsWith("Operations") && (
              <div>
                <SectionHeader
                  number="04b / 08"
                  title="Operations — Detail"
                  subtitle="Tell us about your management, finance, and coordination experience."
                />
                <div className="mb-4 px-3 py-2 rounded-lg bg-[#00D68F]/8 border border-[#00D68F]/20">
                  <span className="text-xs font-['DM_Mono'] text-[#00D68F]">
                    Selected: {form.preferredTeam}
                  </span>
                </div>
                <FormField>
                  <Label required>
                    Are you comfortable with documentation,
                    planning, and organisational tasks?
                  </Label>
                  <RadioGroup
                    options={["Yes", "No", "Somewhat"]}
                    value={form.opsComfort}
                    onChange={(v) => set("opsComfort", v)}
                  />
                </FormField>
                <FormField>
                  <Label required>
                    Which area interests you most?
                  </Label>
                  <RadioGroup
                    options={OPS_FOCUS}
                    value={form.opsFocus}
                    onChange={(v) => set("opsFocus", v)}
                  />
                </FormField>
                <FormField>
                  <Label required>
                    Describe any experience with management,
                    coordination, or finance.
                  </Label>
                  <WordHint />
                  <TextArea
                    value={form.opsDescription}
                    onChange={(v) => set("opsDescription", v)}
                    rows={4}
                    placeholder="e.g. Managed club budget, coordinated logistics for events, or maintained documentation for a student body."
                  />
                </FormField>
              </div>
            )}

          {/* SECTION 5 */}
          {section === 5 && (
            <div>
              <SectionHeader
                number="05 / 08"
                title="Leadership & Problem Solving"
                subtitle="Show us how you think and act when it matters."
              />
              <FormField>
                <Label required>
                  An event has low registrations 3 days before
                  it begins. What actions would you take?
                </Label>
                <WordHint range="30–40" />
                <TextArea
                  value={form.lowRegistrations}
                  onChange={(v) => set("lowRegistrations", v)}
                  rows={4}
                  placeholder="Outline your step-by-step plan to drive registrations in the remaining 3 days."
                />
              </FormField>
              <FormField>
                <Label required>
                  Describe a situation where you took initiative
                  or led a team/project.
                </Label>
                <WordHint range="40–50" />
                <TextArea
                  value={form.initiative}
                  onChange={(v) => set("initiative", v)}
                  rows={4}
                  placeholder="Describe the situation, the action you took, and the outcome it led to."
                />
              </FormField>
              <FormField>
                <Label required>
                  If assigned a task with a deadline, how would
                  you ensure it gets completed successfully?
                </Label>
                <WordHint range="40–50" />
                <TextArea
                  value={form.taskDeadline}
                  onChange={(v) => set("taskDeadline", v)}
                  rows={4}
                  placeholder="Describe how you plan, prioritise, and follow through to meet deadlines consistently."
                />
              </FormField>
            </div>
          )}

          {/* SECTION 6 */}
          {section === 6 && (
            <div>
              <SectionHeader
                number="06 / 08"
                title="Open Source & Builder Mindset"
                subtitle="What would you build if given the platform to do so?"
              />
              <FormField>
                <Label required>
                  If given the opportunity, what project or
                  initiative would you like AWS Student Builders
                  to create at JSSATE?
                </Label>
                <WordHint />
                <TextArea
                  value={form.projectIdea}
                  onChange={(v) => set("projectIdea", v)}
                  rows={5}
                  placeholder="What problem does it solve, who does it help, and how would you build it?"
                />
              </FormField>
              <FormField>
                <Label required>
                  Are you interested in contributing to
                  open-source projects and inter-college
                  collaborations?
                </Label>
                <RadioGroup
                  options={["Yes", "No", "Maybe"]}
                  value={form.openSource}
                  onChange={(v) => set("openSource", v)}
                />
              </FormField>
            </div>
          )}

          {/* SECTION 7 */}
          {section === 7 && (
            <div>
              <SectionHeader
                number="07 / 08"
                title="Commitment"
                subtitle="Founding Members are expected to show up, contribute, and lead by example."
              />
              <FormField>
                <Label required>
                  Can you dedicate approximately 3–5 hours per
                  week to community activities?
                </Label>
                <RadioGroup
                  options={["Yes", "No"]}
                  value={form.timeCommitment}
                  onChange={(v) => set("timeCommitment", v)}
                />
              </FormField>
              <FormField>
                <Label required>
                  Are you willing to volunteer during workshops,
                  events, and community initiatives?
                </Label>
                <RadioGroup
                  options={["Yes", "No"]}
                  value={form.volunteer}
                  onChange={(v) => set("volunteer", v)}
                />
              </FormField>
              <FormField>
                <Label required>
                  Why should we select you as a Founding Member?
                </Label>
                <WordHint />
                <TextArea
                  value={form.whySelect}
                  onChange={(v) => set("whySelect", v)}
                  rows={5}
                  placeholder="What unique value, perspective, or drive do you bring that sets you apart from others?"
                />
              </FormField>

              {/* Final note */}
              <div className="mt-6 p-4 rounded-xl border border-[#00D68F]/20 bg-[#00D68F]/5">
                <div className="flex items-start gap-3">
                  <ChipIcon size={18} color="#00D68F" />
                  <div>
                    <p className="text-xs text-[#00D68F] font-['Space_Grotesk'] font-semibold mb-1">
                      Before you submit
                    </p>
                    <p className="text-xs text-[#6b80a0] font-['Inter'] leading-relaxed">
                      Applications will be reviewed by the AWS
                      Student Builders Core Team. Shortlisted
                      candidates may be invited for a brief
                      interaction before final selections are
                      announced.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* SECTION 8 — Animated Submit */}
          {section === 8 && (() => {
            const HIGHLIGHTS = [
              { icon: "🧠", label: "AWS Session", text: "An exclusive AWS expert tech session with real-world cloud innovation insights.", color: "#38bdf8" },
              { icon: "⚡", label: "Hands-On", text: "An interactive hands-on building experience.", color: "#fbbf24" },
              { icon: "🎁", label: "Rewards", text: "Exclusive opportunities, exciting rewards, and surprises for participants.", color: "#f472b6" },
              { icon: "🏆", label: "Challenges", text: "Challenges designed to put your skills to the test.", color: "#fb923c" },
              { icon: "🚀", label: "Unveiling", text: "The official unveiling of our Founding Members.", color: "#00D68F" },
            ];

            const ITEMS = [
              { id: 1, name: 'Framer University', src: 'https://pbs.twimg.com/profile_images/1602734731728142336/9Bppcs67_400x400.jpg' },
              { id: 2, name: 'arhamkhnz', src: 'https://pbs.twimg.com/profile_images/1897311929028255744/otxpL-ke_400x400.jpg' },
              { id: 3, name: 'Skyleen', src: 'https://pbs.twimg.com/profile_images/1948770261848756224/oPwqXMD6_400x400.jpg' },
              { id: 4, name: 'Shadcn', src: 'https://pbs.twimg.com/profile_images/1593304942210478080/TUYae5z7_400x400.jpg' },
              { id: 5, name: 'Adam Wathan', src: 'https://pbs.twimg.com/profile_images/1677042510839857154/Kq4tpySA_400x400.jpg' },
              { id: 6, name: 'Guillermo Rauch', src: 'https://pbs.twimg.com/profile_images/1783856060249595904/8TfcCN0r_400x400.jpg' },
              { id: 7, name: 'Jhey', src: 'https://pbs.twimg.com/profile_images/1534700564810018816/anAuSfkp_400x400.jpg' },
              { id: 8, name: 'David Haz', src: 'https://pbs.twimg.com/profile_images/1927474594102784000/Al0g-I6o_400x400.jpg' },
              { id: 9, name: 'Matt Perry', src: 'https://pbs.twimg.com/profile_images/1690345911149375488/wfD0Ai9j_400x400.jpg' },
            ];

            return (
              <div className="relative overflow-hidden">
                {/* animated rotating chip bg */}
                <motion.div
                  className="absolute -right-12 -top-12 w-52 h-52 pointer-events-none select-none"
                  style={{ mixBlendMode: "screen", opacity: 0.12 }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                >
                  <ImageWithFallback src={greenChipIcon2} alt="" className="w-full h-full object-contain" />
                </motion.div>
                <motion.div
                  className="absolute -left-16 -bottom-16 w-40 h-40 pointer-events-none select-none"
                  style={{ mixBlendMode: "screen", opacity: 0.07 }}
                  animate={{ rotate: -360 }}
                  transition={{ duration: 55, repeat: Infinity, ease: "linear" }}
                >
                  <ImageWithFallback src={greenChipIcon2} alt="" className="w-full h-full object-contain" />
                </motion.div>

                {/* badge */}
                <motion.div className="flex justify-center mb-6"
                  initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                  <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00D68F]/10 border border-[#00D68F]/25 text-[#00D68F] text-xs font-['DM_Mono'] tracking-widest uppercase">
                    🎉 You're Almost In
                  </span>
                </motion.div>

                {/* heading */}
                <motion.h2
                  className="text-2xl sm:text-3xl font-bold text-white font-['Space_Grotesk'] text-center leading-tight mb-2"
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
                >
                  One last step, Builder.
                </motion.h2>
                <motion.p
                  className="text-center text-[#6b80a0] font-['Inter'] text-sm mb-8"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}
                >
                  Thank you for taking the first step toward becoming a Founding Member of{" "}
                  <span className="text-[#00D68F]">AWS Student Builders – JSSATE Bengaluru.</span>
                </motion.p>

                {/* divider */}
                <motion.div className="flex items-center gap-3 mb-6"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#00D68F]/30" />
                  <span className="text-[#4a6080] font-['DM_Mono'] text-[10px] tracking-widest uppercase whitespace-nowrap">But this isn't where your journey begins...</span>
                  <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#00D68F]/30" />
                </motion.div>

                {/* intro text */}
                <motion.div
                  className="mb-6 p-4 rounded-xl border border-white/8 bg-[#111825]"
                  initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
                >
                  <p className="text-sm text-[#8a9bb8] font-['Inter'] leading-relaxed">
                    As an applicant, you'll be among the first to receive an invitation to our{" "}
                    <span className="text-white font-medium">exclusive expert tech session and hands-on workshop</span>{" "}
                    — an experience that's designed to accelerate your builder journey.
                  </p>
                </motion.div>

                {/* preview label */}
                <motion.p
                  className="text-xs font-['DM_Mono'] text-[#00D68F] tracking-widest mb-2 text-center"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.38 }}
                >
                  ✨ Here&apos;s a small preview of what&apos;s waiting for you:
                </motion.p>

                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.42 }}>
                  <RadialIntro
                    orbitItems={ITEMS}
                    highlights={HIGHLIGHTS.map(({ icon, label, color }) => ({ icon, label, color }))}
                  />
                </motion.div>

                {/* and that's only the beginning */}
                <motion.div
                  className="flex items-center gap-3 mb-6"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
                >
                  <div className="flex-1 h-px bg-white/6" />
                  <span className="text-[#4a6080] text-xs font-['DM_Mono'] whitespace-nowrap">...and that&apos;s only the beginning.</span>
                  <div className="flex-1 h-px bg-white/6" />
                </motion.div>

                {/* closing info */}
                <motion.div
                  className="mb-6 p-4 rounded-xl border border-[#00D68F]/15 bg-[#00D68F]/5 text-center"
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.3 }}
                >
                  <p className="text-sm text-[#c8d8ee] font-['Inter'] leading-relaxed">
                    The full experience will be revealed on the day of your first AWS event.<br />
                    <span className="text-[#6b80a0]">
                      Keep an eye on your <span className="text-white">email</span> and{" "}
                      <span className="text-white">WhatsApp</span> — we'll be sharing the event invitation soon.
                    </span>
                  </p>
                </motion.div>

                {/* tagline */}
                <motion.div
                  className="flex items-center justify-center gap-2 mb-4"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
                >
                  {["Learn", "Build", "Connect", "Grow"].map((word, i) => (
                    <span key={word} className="flex items-center gap-2">
                      <span className="text-[#00D68F] font-['DM_Mono'] text-sm font-medium">{word}</span>
                      {i < 3 && <span className="text-white/20">·</span>}
                    </span>
                  ))}
                </motion.div>

                <motion.p
                  className="text-center text-[#c8d8ee] font-['Space_Grotesk'] text-base font-semibold mb-8"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
                >
                  See you there, Builder! 🚀
                </motion.p>

                {/* submit */}
                {submitError && (
                  <p className="text-center text-xs text-red-400 font-['DM_Mono'] mb-3">{submitError}</p>
                )}
                <motion.button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.6, duration: 0.4 }}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  className="
                    w-full flex items-center justify-center gap-2 py-4 rounded-xl
                    bg-[#00D68F] text-[#0d1520] font-['Space_Grotesk'] font-bold text-base
                    hover:bg-[#00c080] transition-colors duration-200
                    disabled:opacity-60 disabled:cursor-not-allowed
                  "
                >
                  <CheckCircle2 className="w-5 h-5" />
                  {isSubmitting ? "Submitting your application…" : "Confirm & Submit Application"}
                </motion.button>
                <p className="text-center text-[10px] text-[#3d5070] font-['DM_Mono'] mt-3 tracking-wide">
                  AWS Student Builders · JSSATE Bengaluru
                </p>
              </div>
            );
          })()}

        </div>
      </div>

      {/* ── Sticky nav footer ── */}
      <div className="fixed bottom-0 left-0 right-0 z-20 bg-[#111825]/95 backdrop-blur-md border-t border-white/6">
        {validationErrors.length > 0 && (
          <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-2.5">
            <div className="flex items-start gap-2 px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/25">
              <svg className="w-3.5 h-3.5 text-red-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 16 16">
                <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.4"/>
                <path d="M8 5v3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                <circle cx="8" cy="11" r="0.6" fill="currentColor"/>
              </svg>
              <p className="text-[11px] text-red-400 font-['Inter'] leading-relaxed">
                <span className="font-semibold">Please fill in: </span>
                {validationErrors.join(" · ")}
              </p>
            </div>
          </div>
        )}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center gap-3">
          {/* Back */}
          <button
            onClick={prev}
            disabled={section === 1}
            className="
              flex items-center gap-1.5 px-3 sm:px-4 py-2.5 rounded-lg border border-white/10
              text-[#6b80a0] text-sm font-['Space_Grotesk'] font-medium flex-shrink-0
              hover:border-white/20 hover:text-[#c8d8ee] disabled:opacity-30
              disabled:cursor-not-allowed transition-all duration-200
            "
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden xs:inline">Back</span>
          </button>

          {/* Section label — fills middle */}
          <div className="flex-1 text-center">
            <p className="text-[10px] font-['DM_Mono'] text-[#3d5070] tracking-wider truncate">
              {teamSection
                ? "Team detail questions"
                : section < SECTIONS.length
                  ? `${SECTIONS.length - section} section${SECTIONS.length - section !== 1 ? "s" : ""} remaining`
                  : "Final section"}
            </p>
          </div>

          {/* Continue — hidden on section 8 (submit lives inside the card) */}
          {(section < SECTIONS.length || teamSection) && section !== 8 && (
            <button
              onClick={next}
              className="
                flex items-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-lg flex-shrink-0
                bg-[#00D68F] text-[#0d1520] text-sm font-['Space_Grotesk'] font-semibold
                hover:bg-[#00c080] active:scale-95 transition-all duration-200
              "
            >
              Continue
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}