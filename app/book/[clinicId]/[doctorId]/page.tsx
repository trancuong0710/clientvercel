import { notFound } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { BookingDoctorCard } from "@/components/BookingDoctorCard";
import { FilterBar } from "@/components/FilterBar";
import { getBookingDoctors, getClinic, getDoctor } from "@/lib/data";

export default async function BookAppointmentPage({
  params,
}: {
  params: Promise<{ clinicId: string; doctorId: string }>;
}) {
  const { clinicId, doctorId } = await params;
  const clinic = getClinic(clinicId);
  const selectedDoctor = getDoctor(clinicId, doctorId);

  if (!clinic || !selectedDoctor) {
    notFound();
  }

  const doctors = getBookingDoctors(clinicId, doctorId);

  return (
    <AppShell backHref={`/clinics/${clinicId}`} showFooter>
      <div className="service-tabs underline" role="tablist" aria-label="Appointment type">
        <button
          type="button"
          className="service-tab underline is-active"
          role="tab"
          aria-selected="true"
        >
          Online
        </button>
        <button type="button" className="service-tab underline" role="tab">
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

      <div className="booking-list">
        {doctors.map((doctor) => (
          <BookingDoctorCard
            key={doctor.id}
            doctor={doctor}
            clinic={clinic}
            highlighted={doctor.id === doctorId}
          />
        ))}
      </div>
    </AppShell>
  );
}
