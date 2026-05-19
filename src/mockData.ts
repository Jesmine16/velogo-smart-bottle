export const mockUser = {
  name: "Alex Carter",
  email: "alex@velogo.app",
  avatar: "https://i.pravatar.cc/200?img=12",
  joinedAt: "March 2026",
};

export const mockBottles = [
  {
    id: "vg-001",
    name: "VeloGo Pro",
    model: "VG-Pro 2026",
    serial: "VG-PRO-A1B2C3",
    firmware: "v2.1.4",
    color: "Glacier White",
    battery: 78,
    connected: true,
    temperature: 18,
    waterLevel: 65,
    capacity: 750,
    lastSync: "Just now",
  },
  {
    id: "vg-002",
    name: "VeloGo Lite",
    model: "VG-Lite 2025",
    serial: "VG-LITE-X9Y8Z7",
    firmware: "v1.8.2",
    color: "Midnight",
    battery: 42,
    connected: false,
    temperature: 22,
    waterLevel: 30,
    capacity: 500,
    lastSync: "2h ago",
  },
];

export const mockHydration = {
  goal: 2500,
  current: 1620,
  intakeToday: [
    { time: "07:30", amount: 250 },
    { time: "09:15", amount: 200 },
    { time: "10:45", amount: 300 },
    { time: "12:30", amount: 350 },
    { time: "14:10", amount: 220 },
    { time: "16:00", amount: 300 },
  ],
  weekly: [1800, 2400, 2100, 2600, 2300, 1900, 1620],
  weeklyLabels: ["M", "T", "W", "T", "F", "S", "S"],
  monthly: [2100, 2350, 2200, 2450],
  monthlyLabels: ["W1", "W2", "W3", "W4"],
  daily: [120, 250, 300, 0, 350, 220, 300, 80],
  dailyLabels: ["7a", "9a", "11a", "1p", "3p", "5p", "7p", "9p"],
  streak: 12,
};

export const mockWaterQuality = {
  status: "Excellent",
  score: 94,
  bacteriaLevel: "Very Low",
  ph: 7.2,
  tds: 142,
  lastCleaned: "2 days ago",
  nextCleaning: "In 5 days",
};

export const mockAchievements = [
  { id: "1", title: "First Sip", icon: "water-outline", earned: true, desc: "Logged your first drink" },
  { id: "2", title: "7-Day Streak", icon: "flame", earned: true, desc: "7 days in a row" },
  { id: "3", title: "Hydration Hero", icon: "trophy", earned: true, desc: "Hit your goal 10 times" },
  { id: "4", title: "Early Bird", icon: "sunny", earned: false, desc: "Drink before 8am for 5 days" },
  { id: "5", title: "Marathon", icon: "ribbon", earned: false, desc: "30-day streak" },
  { id: "6", title: "Crystal Clear", icon: "diamond", earned: false, desc: "100% quality for a month" },
];

export const mockReminders = {
  enabled: true,
  frequency: 60,
  startTime: "08:00",
  endTime: "22:00",
  days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
};

export const mockLocation = {
  lat: 37.7749,
  lng: -122.4194,
  address: "Mission Street, San Francisco, CA",
  lastSeen: "3 minutes ago",
};
