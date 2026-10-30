import { AppShell } from "@/components/AppShell";
import { ClinicCard } from "@/components/ClinicCard";
import { FilterBar } from "@/components/FilterBar";
import { clinics } from "@/lib/data";

export default function HomePage() {
  return (
    <AppShell showFooter>
      <div
        className="service-tabs underline"
        role="tablist"
        aria-label="Appointment type"
      >
        <button type="button" className="service-tab underline" role="tab">
          Online
        </button>
        <button
          type="button"
          className="service-tab underline is-active"
          role="tab"
          aria-selected="true"
        >
          At Clinic / Hospital
        </button>
        <button type="button" className="service-tab underline" role="tab">
          At Home
        </button>
      </div>

      <div className="section-head">
        <h2 className="section-title">Our Specialists</h2>
      </div>

      <FilterBar
        filters={[
          "Most Relevant",
          "Clinic/Hospital",
          "Condition",
          "Profile badge",
        ]}
      />

      <div className="clinic-grid">
        {clinics.map((clinic) => (
          <ClinicCard key={clinic.id} clinic={clinic} />
        ))}
      </div>
    </AppShell>
  );
}
