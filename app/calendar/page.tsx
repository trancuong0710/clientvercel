import { AppShell } from "@/components/AppShell";
import { MyCalendar } from "@/components/MyCalendar";

export default function CalendarPage() {
  return (
    <AppShell
      title="Lịch Khám"
      searchPlaceholder="Tìm kiếm"
      showBack={false}
      showFooter
      plainContent
      activeNav="Appointments"
    >
      <MyCalendar />
    </AppShell>
  );
}
