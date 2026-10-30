export type Clinic = {
  id: string;
  name: string;
  hours: string;
  city: string;
  distance: string;
  rating: number;
  reviews: string;
  price: string;
  logoInitials: string;
  logoColor: string;
  logoSrc: string;
  establishedYears: number;
  staffCount: number;
  address: string;
};

export type DoctorBadge = "flame" | "care" | "bag";

export type Doctor = {
  id: string;
  name: string;
  code: string;
  specialty: string;
  rating: number;
  reviews: number;
  avatar: string;
  price: string;
  slots: string[];
  allSlots: string[];
  badge: DoctorBadge;
  clinicId: string;
  experienceYears: number;
  consultations: number;
  conditions: string[];
  role: string;
  rolePeriod: string;
  languages: string[];
};

export const clinics: Clinic[] = [
  {
    id: "cho-ray",
    name: "Cho Ray Hospital",
    hours: "06:00 - 16:00",
    city: "Ho Chi Minh City",
    distance: "~7.6 km",
    rating: 4.0,
    reviews: "15k",
    price: "40,000đ",
    logoInitials: "CR",
    logoColor: "#1B6CA8",
    logoSrc:
      "https://vgec2022.vfde.vn/wp-content/uploads/sites/11/2022/07/LogoBVCR2016_300px_1S.png",
    establishedYears: 5,
    staffCount: 30,
    address: "201B Nguyen Chi Thanh St., District 5, Ho Chi Minh City, Vietnam",
  },
  {
    id: "gia-dinh",
    name: "Gia Dinh People's Hospital",
    hours: "24/7 hours",
    city: "Ho Chi Minh City",
    distance: "~1.6 km",
    rating: 4.1,
    reviews: "3.2k",
    price: "42,100đ",
    logoInitials: "GD",
    logoColor: "#2B6CB0",
    logoSrc:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAT3BYGEOy8a7On5xSNsBUQg2VMOlVk7edxZMriI40JQ&s=10",
    establishedYears: 8,
    staffCount: 30,
    address: "1 No Trang Long St., Binh Thanh District, Ho Chi Minh City, Vietnam",
  },
  {
    id: "vinmec",
    name: "Vinmec Central Park International Hospital",
    hours: "05:30 - 16:00",
    city: "Ho Chi Minh City",
    distance: "~4.2 km",
    rating: 4.7,
    reviews: "8.1k",
    price: "512,000đ",
    logoInitials: "VM",
    logoColor: "#0B7A5A",
    logoSrc:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREV-Hdr-0011K10thXRZw7bIvPaTFhreQ2abkmBTCAmLICpOrFXnawsB8&s=10",
    establishedYears: 10,
    staffCount: 30,
    address: "208 Nguyen Huu Canh St., Binh Thanh District, Ho Chi Minh City, Vietnam",
  },
  {
    id: "115",
    name: "115 People's Hospital",
    hours: "24/7 hours",
    city: "Ho Chi Minh City",
    distance: "~3.1 km",
    rating: 2.6,
    reviews: "4.5k",
    price: "120,000đ",
    logoInitials: "115",
    logoColor: "#C53030",
    logoSrc:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCC_wys3n_H1JInMf-TzZ9zBNeLRP8cVI1WsqheZt-UQUwqXf4NhYnG_6H&s=10",
    establishedYears: 12,
    staffCount: 30,
    address: "527 Su Van Hanh St., District 10, Ho Chi Minh City, Vietnam",
  },
  {
    id: "hoan-my",
    name: "Hoan My Saigon General Hospital",
    hours: "07:00 - 17:00",
    city: "Ho Chi Minh City",
    distance: "~5.4 km",
    rating: 4.3,
    reviews: "6.7k",
    price: "280,000đ",
    logoInitials: "HM",
    logoColor: "#2C7A7B",
    logoSrc: "/logos/hoan-my.svg",
    establishedYears: 7,
    staffCount: 30,
    address: "60-60A Nguyen Van Troi St., Phu Nhuan District, Ho Chi Minh City, Vietnam",
  },
  {
    id: "ump",
    name: "Ho Chi Minh City University of Medicine",
    hours: "06:30 - 16:30",
    city: "Ho Chi Minh City",
    distance: "~2.8 km",
    rating: 4.5,
    reviews: "9.4k",
    price: "890,000đ",
    logoInitials: "UMP",
    logoColor: "#1A365D",
    logoSrc:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJ-yfTz-vi1irdAL-kmaK19gOzxnacSywLpPvQ70A36yjJOaaO_mJPiw0&s=10",
    establishedYears: 15,
    staffCount: 30,
    address: "217 Hong Bang St., District 5, Ho Chi Minh City, Vietnam",
  },
  {
    id: "children",
    name: "Children's Hospital",
    hours: "24/7 hours",
    city: "Ho Chi Minh City",
    distance: "~6.0 km",
    rating: 4.2,
    reviews: "5.8k",
    price: "95,000đ",
    logoInitials: "CH",
    logoColor: "#D69E2E",
    logoSrc: "/logos/children.svg",
    establishedYears: 9,
    staffCount: 30,
    address: "15 Vo Van Tan St., District 3, Ho Chi Minh City, Vietnam",
  },
  {
    id: "saigon",
    name: "Saigon General Hospital",
    hours: "06:00 - 18:00",
    city: "Ho Chi Minh City",
    distance: "~3.9 km",
    rating: 3.9,
    reviews: "2.1k",
    price: "150,000đ",
    logoInitials: "SG",
    logoColor: "#3182CE",
    logoSrc:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmzh0KuSjOjmQCWRYiWJReNfQc5sOCN7cHs7ByVWXLJYGlm2-xOhCfJkok&s=10",
    establishedYears: 6,
    staffCount: 30,
    address: "125 Le Loi St., District 1, Ho Chi Minh City, Vietnam",
  },
];

const titles = [
  "BS.",
  "BS.CKI",
  "BS.CKII",
  "TS. BS.",
  "PGS. TS. BS.",
];

const familyNames = [
  "Nguyễn",
  "Trần",
  "Lê",
  "Phạm",
  "Hoàng",
  "Huỳnh",
  "Phan",
  "Vũ",
  "Võ",
  "Đặng",
  "Bùi",
  "Đỗ",
  "Hồ",
  "Ngô",
  "Dương",
  "Lý",
  "Đinh",
  "Trương",
  "Đào",
  "Mai",
  "Cao",
  "Lâm",
  "Tạ",
  "Trịnh",
];

const middleNames = [
  "Văn",
  "Thị",
  "Minh",
  "Hoàng",
  "Thanh",
  "Quốc",
  "Xuân",
  "Kim",
  "Anh",
  "Đức",
  "Hữu",
  "Ngọc",
  "Tuấn",
  "Bảo",
  "Phi",
];

const givenNames = [
  "Tường",
  "Hùng",
  "Hoa",
  "Lộc",
  "Hương",
  "Khoa",
  "Hà",
  "Huy",
  "Mai",
  "Đức",
  "Tuấn",
  "Nam",
  "Lan",
  "Sơn",
  "Bích",
  "Bảo",
  "Châu",
  "Ngọc",
  "Thắng",
  "Phương",
  "Phong",
  "Anh",
  "Vinh",
  "Hạnh",
  "Trường",
  "Dung",
  "Long",
  "Thu",
  "Nhật",
  "Yến",
  "Khang",
  "My",
  "Quân",
  "Trang",
  "Dũng",
  "Linh",
  "Khôi",
  "Nhung",
  "Phúc",
  "Uyên",
];

const specialties = [
  "Nội tổng quát - Huyết học",
  "Tim mạch",
  "Nội tiết - Đái tháo đường",
  "Mắt",
  "Tai mũi họng",
  "Da liễu",
  "Thần kinh",
  "Tiêu hóa",
  "Hô hấp",
  "Chấn thương chỉnh hình",
  "Sản phụ khoa",
  "Nhi khoa",
  "Ung bướu",
  "Thận - Tiết niệu",
  "Tâm thần",
  "Cơ xương khớp",
  "Dị ứng - Miễn dịch",
  "Phẫu thuật tổng quát",
];

function seededRandom(seed: number) {
  let value = seed % 2147483646;
  if (value <= 0) value += 2147483646;
  return () => {
    value = (value * 16807) % 2147483647;
    return (value - 1) / 2147483646;
  };
}

function shuffleWithSeed<T>(items: T[], seed: number): T[] {
  const rand = seededRandom(seed);
  const next = [...items];
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rand() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
}

function buildDoctorName(seed: number, index: number) {
  const rand = seededRandom(seed * 97 + index * 13 + 11);
  const title = titles[Math.floor(rand() * titles.length)];
  const family = familyNames[Math.floor(rand() * familyNames.length)];
  const middle = middleNames[Math.floor(rand() * middleNames.length)];
  const given = givenNames[Math.floor(rand() * givenNames.length)];
  return `${title} ${family} ${middle} ${given}`;
}

export function getClinic(id: string) {
  return clinics.find((clinic) => clinic.id === id);
}

const badges: DoctorBadge[] = ["flame", "care", "bag"];

const morningSlots = [
  "07:00",
  "07:30",
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
];

const afternoonSlots = [
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
];

function buildAllSlots(seed: number, index: number) {
  const rand = seededRandom(seed + index * 17 + 3);
  const morning = morningSlots.filter(() => rand() > 0.28);
  const afternoon = afternoonSlots.filter(() => rand() > 0.32);
  const all = [...morning, ...afternoon];
  return all.length >= 6 ? all : [...morningSlots.slice(0, 4), ...afternoonSlots.slice(0, 4)];
}

const conditionPools = [
  ["CARDIOVASCULAR DISEASE", "ASTHMA", "ATRIAL FIBRILLATION", "HYPERTENSION"],
  ["DIABETES", "THYROID DISORDER", "OBESITY", "METABOLIC SYNDROME"],
  ["MIGRAINE", "EPILEPSY", "STROKE", "PARKINSON"],
  ["GASTRITIS", "IBS", "HEPATITIS", "ULCER"],
  ["DERMATITIS", "PSORIASIS", "ACNE", "ECZEMA"],
];

const rolePools = [
  "Head of Department",
  "Senior Consultant",
  "Attending Physician",
  "Specialist Doctor",
];

export function getDoctorsForClinic(clinicId: string): Doctor[] {
  const clinicIndex = clinics.findIndex((clinic) => clinic.id === clinicId);
  const seed = clinicIndex * 1009 + 41;
  const rand = seededRandom(seed);
  const specialtyOrder = shuffleWithSeed(specialties, seed + 7);
  const usedNames = new Set<string>();

  return Array.from({ length: 30 }, (_, index) => {
    let name = buildDoctorName(seed, index);
    let attempt = 1;
    while (usedNames.has(name) && attempt < 20) {
      name = buildDoctorName(seed + attempt * 31, index + attempt);
      attempt += 1;
    }
    usedNames.add(name);

    const specialty = specialtyOrder[index % specialtyOrder.length];
    const rating = Number((3.6 + rand() * 1.4).toFixed(1));
    const reviews = Math.floor(60 + rand() * 560);
    const code = `DR${String(1000 + clinicIndex * 100 + index + 1).padStart(4, "0")}`;
    const priceValue = Math.round((150 + rand() * 700) / 5) * 1000;
    const avatarImg = ((clinicIndex * 30 + index) % 70) + 1;
    const allSlots = buildAllSlots(seed, index);
    const experienceYears = 3 + Math.floor(rand() * 18);
    const startYear = 2026 - experienceYears;

    return {
      id: `${clinicId}-${index + 1}`,
      name,
      code,
      specialty,
      rating,
      reviews,
      avatar: `https://i.pravatar.cc/160?img=${avatarImg}`,
      price: `${priceValue.toLocaleString("en-US")}đ`,
      slots: allSlots.slice(0, 3),
      allSlots,
      badge: badges[(index + clinicIndex) % badges.length],
      clinicId,
      experienceYears,
      consultations: 12 + Math.floor(rand() * 40),
      conditions: conditionPools[(index + clinicIndex) % conditionPools.length],
      role: rolePools[(index + clinicIndex) % rolePools.length],
      rolePeriod: `${startYear} - now`,
      languages: index % 3 === 0 ? ["VIETNAMESE", "ENGLISH", "FRENCH"] : ["VIETNAMESE", "ENGLISH"],
    };
  });
}

export function getDoctor(clinicId: string, doctorId: string) {
  return getDoctorsForClinic(clinicId).find((doctor) => doctor.id === doctorId);
}

export function getBookingDoctors(clinicId: string, selectedDoctorId?: string) {
  const doctors = getDoctorsForClinic(clinicId);
  if (!selectedDoctorId) return doctors;

  const selected = doctors.find((doctor) => doctor.id === selectedDoctorId);
  if (!selected) return doctors;

  return [selected, ...doctors.filter((doctor) => doctor.id !== selectedDoctorId)];
}
