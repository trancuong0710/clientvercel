import { notFound } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { BookAppointmentClient } from "@/components/BookAppointmentClient";
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
      <BookAppointmentClient
        clinic={clinic}
        doctors={doctors}
        selectedDoctorId={doctorId}
      />
    </AppShell>
  );
}
