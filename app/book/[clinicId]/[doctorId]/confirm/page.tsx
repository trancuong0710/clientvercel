import { notFound } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { ConfirmAppointment } from "@/components/ConfirmAppointment";
import { getClinic, getDoctor } from "@/lib/data";

export default async function ConfirmAppointmentPage({
  params,
}: {
  params: Promise<{ clinicId: string; doctorId: string }>;
}) {
  const { clinicId, doctorId } = await params;
  const clinic = getClinic(clinicId);
  const doctor = getDoctor(clinicId, doctorId);

  if (!clinic || !doctor) {
    notFound();
  }

  return (
    <AppShell
      title="Confirm Appointment"
      backHref={`/book/${clinicId}/${doctorId}/form`}
      showFooter
      plainContent
    >
      <ConfirmAppointment clinicId={clinicId} doctorId={doctorId} />
    </AppShell>
  );
}
