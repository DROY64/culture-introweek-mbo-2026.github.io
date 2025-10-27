"use client"

import { create } from "zustand"

// Types
export interface Institution {
  id: string
  name: string
  email: string
  generalEmail: string
  phone: string
  website: string
  visitAddress: string
  postalAddress: string
  contactPerson: string
  description: string
  capacity: number
  availableDays: string[]
  timeSlots: { day: string; startTime: string; endTime: string }[]
  logo?: string
  createdAt: string
}

export interface Teacher {
  id: string
  name: string
  email: string
  phone: string
  school: string
  className: string
  numberOfStudents: number
  yearLevel: string
  mentorAttending: boolean
  preferredDay: string
  startTime: string
  endTime: string
  numberOfActivities: number
  preferences: string[]
  createdAt: string
}

export interface ProgramActivity {
  id: string
  institutionId: string
  institutionName: string
  teacherId: string
  teacherName: string
  className: string
  day: string
  date: string
  startTime: string
  endTime: string
  numberOfStudents: number
  status: "confirmed" | "pending" | "cancelled"
}

interface AdminState {
  institutions: Institution[]
  teachers: Teacher[]
  programActivities: ProgramActivity[]
  isAuthenticated: boolean
  currentUser: { email: string; role: string } | null

  // Actions
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  register: (email: string, password: string, name: string) => Promise<boolean>

  // Institution actions
  addInstitution: (institution: Omit<Institution, "id" | "createdAt">) => void
  updateInstitution: (id: string, institution: Partial<Institution>) => void
  deleteInstitution: (id: string) => void

  // Teacher actions
  addTeacher: (teacher: Omit<Teacher, "id" | "createdAt">) => void
  updateTeacher: (id: string, teacher: Partial<Teacher>) => void
  deleteTeacher: (id: string) => void

  // Program actions
  addActivity: (activity: Omit<ProgramActivity, "id">) => void
  updateActivity: (id: string, activity: Partial<ProgramActivity>) => void
  deleteActivity: (id: string) => void

  // Search and filter
  searchInstitutions: (query: string) => Institution[]
  searchTeachers: (query: string) => Teacher[]
  filterActivitiesByDay: (day: string) => ProgramActivity[]
}

// Mock data
const mockInstitutions: Institution[] = [
  {
    id: "1",
    name: "Van Gogh Museum",
    email: "info@vangoghmuseum.nl",
    generalEmail: "contact@vangoghmuseum.nl",
    phone: "020-5705200",
    website: "https://www.vangoghmuseum.nl",
    visitAddress: "Museumplein 6, 1071 DJ Amsterdam",
    postalAddress: "Postbus 75366, 1070 AJ Amsterdam",
    contactPerson: "Dhr. Van der Berg",
    description: "Het Van Gogh Museum herbergt de grootste collectie kunstwerken van Vincent van Gogh ter wereld.",
    capacity: 30,
    availableDays: ["Maandag", "Dinsdag", "Donderdag"],
    timeSlots: [
      { day: "Maandag", startTime: "09:00", endTime: "12:00" },
      { day: "Dinsdag", startTime: "10:00", endTime: "13:00" },
    ],
    createdAt: "2025-01-15T10:00:00Z",
  },
  {
    id: "2",
    name: "NEMO Science Museum",
    email: "info@nemosciencemuseum.nl",
    generalEmail: "contact@nemosciencemuseum.nl",
    phone: "020-5313233",
    website: "https://www.nemosciencemuseum.nl",
    visitAddress: "Oosterdok 2, 1011 VX Amsterdam",
    postalAddress: "Postbus 95007, 1090 HA Amsterdam",
    contactPerson: "Mw. Jansen",
    description: "NEMO is het grootste science center van Nederland.",
    capacity: 40,
    availableDays: ["Dinsdag", "Woensdag", "Donderdag", "Vrijdag"],
    timeSlots: [
      { day: "Dinsdag", startTime: "09:00", endTime: "12:00" },
      { day: "Woensdag", startTime: "10:00", endTime: "13:00" },
    ],
    createdAt: "2025-01-16T11:00:00Z",
  },
  {
    id: "3",
    name: "Anne Frank Huis",
    email: "info@annefrank.nl",
    generalEmail: "contact@annefrank.nl",
    phone: "020-5567105",
    website: "https://www.annefrank.org",
    visitAddress: "Prinsengracht 263-267, 1016 GV Amsterdam",
    postalAddress: "Postbus 730, 1000 AS Amsterdam",
    contactPerson: "Dhr. De Vries",
    description: "Het Anne Frank Huis is een museum gewijd aan de Joods-Duitse dagboekschrijfster Anne Frank.",
    capacity: 25,
    availableDays: ["Maandag", "Woensdag", "Vrijdag"],
    timeSlots: [
      { day: "Maandag", startTime: "10:00", endTime: "12:00" },
      { day: "Woensdag", startTime: "09:00", endTime: "11:00" },
    ],
    createdAt: "2025-01-17T09:00:00Z",
  },
]

const mockTeachers: Teacher[] = [
  {
    id: "1",
    name: "Mw. De Vries",
    email: "m.devries@mbocollegewest.nl",
    phone: "06-12345678",
    school: "MBO College West",
    className: "2A",
    numberOfStudents: 28,
    yearLevel: "2",
    mentorAttending: true,
    preferredDay: "Maandag",
    startTime: "09:00",
    endTime: "13:00",
    numberOfActivities: 2,
    preferences: ["Van Gogh Museum", "NEMO Science Museum"],
    createdAt: "2025-02-01T10:00:00Z",
  },
  {
    id: "2",
    name: "Dhr. Bakker",
    email: "j.bakker@rocamsterdam.nl",
    phone: "06-23456789",
    school: "ROC van Amsterdam",
    className: "3B",
    numberOfStudents: 24,
    yearLevel: "3",
    mentorAttending: false,
    preferredDay: "Dinsdag",
    startTime: "10:00",
    endTime: "14:00",
    numberOfActivities: 2,
    preferences: ["Anne Frank Huis", "Stedelijk Museum"],
    createdAt: "2025-02-02T11:00:00Z",
  },
  {
    id: "3",
    name: "Mw. Jansen",
    email: "l.jansen@mboamstelland.nl",
    phone: "06-34567890",
    school: "MBO College Amstelland",
    className: "1C",
    numberOfStudents: 30,
    yearLevel: "1",
    mentorAttending: true,
    preferredDay: "Woensdag",
    startTime: "09:00",
    endTime: "13:00",
    numberOfActivities: 1,
    preferences: ["NEMO Science Museum"],
    createdAt: "2025-02-03T09:00:00Z",
  },
]

const mockActivities: ProgramActivity[] = [
  {
    id: "1",
    institutionId: "1",
    institutionName: "Van Gogh Museum",
    teacherId: "1",
    teacherName: "Mw. De Vries",
    className: "2A",
    day: "Maandag",
    date: "2026-08-31",
    startTime: "09:00",
    endTime: "11:00",
    numberOfStudents: 28,
    status: "confirmed",
  },
  {
    id: "2",
    institutionId: "2",
    institutionName: "NEMO Science Museum",
    teacherId: "3",
    teacherName: "Mw. Jansen",
    className: "1C",
    day: "Woensdag",
    date: "2026-09-02",
    startTime: "10:00",
    endTime: "12:00",
    numberOfStudents: 30,
    status: "confirmed",
  },
  {
    id: "3",
    institutionId: "3",
    institutionName: "Anne Frank Huis",
    teacherId: "2",
    teacherName: "Dhr. Bakker",
    className: "3B",
    day: "Dinsdag",
    date: "2026-09-01",
    startTime: "10:00",
    endTime: "12:00",
    numberOfStudents: 24,
    status: "pending",
  },
]

export const useAdminStore = create<AdminState>((set, get) => ({
  institutions: mockInstitutions,
  teachers: mockTeachers,
  programActivities: mockActivities,
  isAuthenticated: false,
  currentUser: null,

  login: async (email: string, password: string) => {
    // Mock authentication - in production, this would call an API
    if (email.includes("@rocva.nl") && password.length >= 6) {
      set({
        isAuthenticated: true,
        currentUser: { email, role: "admin" },
      })
      return true
    }
    return false
  },

  logout: () => {
    set({
      isAuthenticated: false,
      currentUser: null,
    })
  },

  register: async (email: string, password: string, name: string) => {
    // Mock registration - in production, this would call an API
    if (email.includes("@rocva.nl") && password.length >= 6) {
      set({
        isAuthenticated: true,
        currentUser: { email, role: "admin" },
      })
      return true
    }
    return false
  },

  addInstitution: (institution) => {
    const newInstitution: Institution = {
      ...institution,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    }
    set((state) => ({
      institutions: [...state.institutions, newInstitution],
    }))
  },

  updateInstitution: (id, updates) => {
    set((state) => ({
      institutions: state.institutions.map((inst) => (inst.id === id ? { ...inst, ...updates } : inst)),
    }))
  },

  deleteInstitution: (id) => {
    set((state) => ({
      institutions: state.institutions.filter((inst) => inst.id !== id),
    }))
  },

  addTeacher: (teacher) => {
    const newTeacher: Teacher = {
      ...teacher,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    }
    set((state) => ({
      teachers: [...state.teachers, newTeacher],
    }))
  },

  updateTeacher: (id, updates) => {
    set((state) => ({
      teachers: state.teachers.map((teacher) => (teacher.id === id ? { ...teacher, ...updates } : teacher)),
    }))
  },

  deleteTeacher: (id) => {
    set((state) => ({
      teachers: state.teachers.filter((teacher) => teacher.id !== id),
    }))
  },

  addActivity: (activity) => {
    const newActivity: ProgramActivity = {
      ...activity,
      id: Date.now().toString(),
    }
    set((state) => ({
      programActivities: [...state.programActivities, newActivity],
    }))
  },

  updateActivity: (id, updates) => {
    set((state) => ({
      programActivities: state.programActivities.map((activity) =>
        activity.id === id ? { ...activity, ...updates } : activity,
      ),
    }))
  },

  deleteActivity: (id) => {
    set((state) => ({
      programActivities: state.programActivities.filter((activity) => activity.id !== id),
    }))
  },

  searchInstitutions: (query) => {
    const { institutions } = get()
    const lowerQuery = query.toLowerCase()
    return institutions.filter(
      (inst) =>
        inst.name.toLowerCase().includes(lowerQuery) ||
        inst.email.toLowerCase().includes(lowerQuery) ||
        inst.visitAddress.toLowerCase().includes(lowerQuery),
    )
  },

  searchTeachers: (query) => {
    const { teachers } = get()
    const lowerQuery = query.toLowerCase()
    return teachers.filter(
      (teacher) =>
        teacher.name.toLowerCase().includes(lowerQuery) ||
        teacher.email.toLowerCase().includes(lowerQuery) ||
        teacher.school.toLowerCase().includes(lowerQuery) ||
        teacher.className.toLowerCase().includes(lowerQuery),
    )
  },

  filterActivitiesByDay: (day) => {
    const { programActivities } = get()
    return programActivities.filter((activity) => activity.day === day)
  },
}))
