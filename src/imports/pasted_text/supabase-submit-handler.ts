Step 2: Install and Initialize the Supabase Client
Install the official client SDK in your project terminal:

Bash
npm install @supabase/supabase-js
Create a helper file to instantiate the client (e.g., inside @/lib/supabaseClient.ts or @/utils/supabase.ts):

TypeScript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
Make sure to drop your NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY variables inside your .env.local file.

Step 3: Wire Up the Submission Handler in App.tsx
Update your component file to import the client and map the camelCase keys from your local state into the snake_case columns in Supabase. You'll also want to introduce a loading state to prevent double-submitting.

Here is the modified codebase structure for the final step:

TypeScript
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient"; // 1. Import your client
// ... keeping your other imports intact

export default function App() {
  const [section, setSection] = useState(1);
  const [teamSection, setTeamSection] = useState(false);
  const [form, setForm] = useState<FormData>(INITIAL);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // 2. Loading state

  const set = <K extends keyof FormData>(key: K, value: FormData[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  // 3. Define the actual DB insertion logic
  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
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
            about_yourself: form.aboutYourself,
            why_join: form.whyJoin,
            interests: form.interests,
            participated: form.participated,
            achievements: form.achievements,
            preferred_team: form.preferredTeam,
            why_team: form.whyTeam,
            marketing_tools: form.marketingTools,
            marketing_focus: form.marketingFocus || null,
            marketing_portfolio: form.marketingPortfolio || null,
            events_experience: form.eventsExperience || null,
            events_focus: form.eventsFocus || null,
            events_description: form.eventsDescription || null,
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
    } catch (error: any) {
      console.error("Submission failed:", error.message);
      alert("Error submitting application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ... rest of your layout logic remains identical

  // 4. Update the final UI button inside your sticky footer:
  return (
    <div className="min-h-screen bg-[#161e2d] relative overflow-x-hidden">
      {/* ... Content UI ... */}
      
      {/* Sticky footer implementation updates */}
      <div className="fixed bottom-0 left-0 right-0 z-20 bg-[#111825]/95 backdrop-blur-md border-t border-white/6">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center gap-3">
          {/* Back button ... */}

          {/* Continue / Submit Logic */}
          {(section < SECTIONS.length || teamSection) ? (
            <button
              onClick={next}
              className="flex items-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-lg bg-[#00D68F] text-[#0d1520] text-sm font-semibold hover:bg-[#00c080]"
            >
              Continue
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmit} // Call DB handler here
              disabled={isSubmitting}
              className="flex items-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-lg bg-[#00D68F] text-[#0d1520] text-sm font-semibold hover:bg-[#00c080] disabled:opacity-50"
            >
              <span>{isSubmitting ? "Submitting..." : "Submit Application"}</span>
              <CheckCircle2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}