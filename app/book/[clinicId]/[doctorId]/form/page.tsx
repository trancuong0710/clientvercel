import { notFound } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { BookingForm } from "@/components/BookingForm";
import { DoctorBookingSidebar } from "@/components/DoctorBookingSidebar";
import { getClinic, getDoctor } from "@/lib/data";

export default async function BookingFormPage({
  params,
  searchParams,
}: {
  params: Promise<{ clinicId: string; doctorId: string }>;
  searchParams: Promise<{ slot?: string; date?: string }>;
}) {
  const { clinicId, doctorId } = await params;
  const query = await searchParams;
  const slot = query.slot?.trim() || "";
  const date = query.date?.trim() || "";
  const clinic = getClinic(clinicId);
  const doctor = getDoctor(clinicId, doctorId);

  if (!clinic || !doctor) {
    notFound();
  }

  return (
    <AppShell
      backHref={`/book/${clinicId}/${doctorId}`}
      showFooter
      plainContent
    >
      <div className="booking-form-layout">
        <div className="booking-form-panel content-panel">
          <BookingForm
            clinic={clinic}
            doctor={doctor}
            selectedSlot={slot}
            selectedDate={date}
          />
        </div>
        <DoctorBookingSidebar doctor={doctor} clinic={clinic} />
      </div>
    </AppShell>
  );
}
