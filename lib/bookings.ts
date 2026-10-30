export type BookingDraft = {
  clinicId: string;
  doctorId: string;
  doctorName: string;
  doctorCode: string;
  doctorSpecialty: string;
  doctorAvatar: string;
  clinicName: string;
  clinicCity: string;
  patientId: string;
  patientName: string;
  date: string;
  time: string;
  reason: string;
  details: string;
  symptomsStart: string;
  severity: string;
  medication: string;
  documents: string;
};

export type SavedBooking = BookingDraft & {
  id: string;
  createdAt: string;
  durationMinutes: number;
  color: "blue" | "pink" | "orange" | "red";
  isChild?: boolean;
};

export type PatientOption = {
  name: string;
  accountId: string;
  condition: string;
  avatar: string;
  isChild?: boolean;
  guardian?: string;
  guardianId?: string;
  guardianCondition?: string;
  guardianAvatar?: string;
};

export const PATIENT_OPTIONS: Record<string, PatientOption> = {
  "patient-1": {
    name: "Nguyễn Văn A",
    accountId: "YS1001",
    condition: "Hypertension",
    avatar: "https://i.pravatar.cc/80?img=12",
    guardian: "Phạm Linh",
    guardianId: "ID1234",
    guardianCondition: "Diabetes",
    guardianAvatar: "https://i.pravatar.cc/80?img=12",
  },
  "patient-2": {
    name: "Trần Thị B",
    accountId: "YS1002",
    condition: "Asthma",
    avatar: "https://i.pravatar.cc/80?img=5",
    guardian: "Phạm Linh",
    guardianId: "ID1234",
    guardianCondition: "Diabetes",
    guardianAvatar: "https://i.pravatar.cc/80?img=12",
  },
  "patient-3": {
    name: "Phạm Trần Trúc Linh",
    accountId: "ID1158",
    condition: "None",
    avatar: "https://i.pravatar.cc/80?img=32",
    isChild: true,
    guardian: "Phạm Linh",
    guardianId: "ID1234",
    guardianCondition: "Diabetes",
    guardianAvatar: "https://i.pravatar.cc/80?img=12",
  },
};

const DRAFT_KEY = "ysalus-booking-draft";
const BOOKINGS_KEY = "ysalus-bookings";

const COLORS: SavedBooking["color"][] = ["blue", "pink", "orange", "red"];

export function saveBookingDraft(draft: BookingDraft) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
}

export function getBookingDraft(): BookingDraft | null {
  if (typeof window === "undefined") return null;
  const raw = sessionStorage.getItem(DRAFT_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as BookingDraft;
  } catch {
    return null;
  }
}

export function clearBookingDraft() {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(DRAFT_KEY);
}

export function getSavedBookings(): SavedBooking[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(BOOKINGS_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as SavedBooking[];
  } catch {
    return [];
  }
}

export function saveBooking(draft: BookingDraft): SavedBooking {
  const bookings = getSavedBookings();
  const today = new Date();
  const fallbackDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  const booking: SavedBooking = {
    ...draft,
    date: draft.date || fallbackDate,
    time: draft.time || "09:30",
    id: `bk-${Date.now()}`,
    createdAt: new Date().toISOString(),
    durationMinutes: 15,
    color: COLORS[bookings.length % COLORS.length],
    isChild: PATIENT_OPTIONS[draft.patientId]?.isChild,
  };
  const next = [booking, ...bookings];
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(next));
  clearBookingDraft();
  return booking;
}

export function formatBookingDateTime(date: string, time: string) {
  if (!date && !time) return "Not selected";
  if (!date) return time;

  const parsed = new Date(`${date}T${normalizeTime(time)}`);
  if (Number.isNaN(parsed.getTime())) {
    return [date, time].filter(Boolean).join(", ");
  }

  const weekday = parsed.toLocaleDateString("en-US", { weekday: "long" });
  const day = String(parsed.getDate()).padStart(2, "0");
  const month = String(parsed.getMonth() + 1).padStart(2, "0");
  const year = parsed.getFullYear();
  const hour12 = parsed.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return `${weekday}, ${day}.${month}.${year}, ${hour12}`;
}

export function getEndTime(time: string, durationMinutes = 15) {
  const [hours, minutes] = normalizeTime(time).split(":").map(Number);
  if (Number.isNaN(hours) || Number.isNaN(minutes)) return time;
  const total = hours * 60 + minutes + durationMinutes;
  const endH = String(Math.floor(total / 60) % 24).padStart(2, "0");
  const endM = String(total % 60).padStart(2, "0");
  return `${endH}:${endM}`;
}

function normalizeTime(time: string) {
  if (!time) return "00:00";
  return time.length === 5 ? `${time}:00` : time;
}

export const HARDCODED_PRICING = {
  appointmentFee: "572,250 đ",
  applicationFee: "114,450 đ",
  participantFee: "23,500 đ",
  discount: "-72,220 đ",
  total: "637,980 đ",
};
