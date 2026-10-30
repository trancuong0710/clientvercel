import { notFound } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { ClinicProfile } from "@/components/ClinicProfile";
import { DoctorCard } from "@/components/DoctorCard";
import { FilterBar } from "@/components/FilterBar";
import { getClinic, getDoctorsForClinic, clinics } from "@/lib/data";

export function generateStaticParams() {
  return clinics.map((clinic) => ({ id: clinic.id }));
}

export default async function ClinicDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const clinic = getClinic(id);

  if (!clinic) {
    notFound();
  }

  const doctors = getDoctorsForClinic(clinic.id);

  return (
    <AppShell backHref="/">
      <div className="detail-layout">
        <div className="detail-main">
          <div className="detail-tabs" role="tablist" aria-label="Clinic sections">
            <button
              type="button"
              className="detail-tab is-active"
              role="tab"
              aria-selected="true"
            >
              Doctor
            </button>
            <button type="button" className="detail-tab" role="tab">
              Appointments
            </button>
            <button type="button" className="detail-tab" role="tab">
              Proactive Monitoring
            </button>
          </div>

          <div className="section-head">
            <h2 className="section-title">Our Specialists</h2>
          </div>

          <FilterBar filters={["Most Relevant", "Condition"]} />

          <div className="doctor-grid">
            {doctors.map((doctor) => (
              <DoctorCard
                key={doctor.id}
                doctor={doctor}
                clinicId={clinic.id}
              />
            ))}
          </div>
        </div>

        <ClinicProfile clinic={clinic} />
      </div>
    </AppShell>
  );
}
