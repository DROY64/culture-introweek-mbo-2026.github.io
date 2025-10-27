"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Building2, Calendar, Download, Plus, Edit, Trash2, Eye, Search } from "lucide-react"
import Link from "next/link"
import { useAdminStore } from "@/lib/admin-store"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AdminDashboardPage() {
  const router = useRouter()
  const {
    isAuthenticated,
    currentUser,
    logout,
    institutions,
    teachers,
    programActivities,
    deleteInstitution,
    deleteTeacher,
    deleteActivity,
  } = useAdminStore()

  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDay, setSelectedDay] = useState("all")

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/admin/login")
    }
  }, [isAuthenticated, router])

  const handleLogout = () => {
    logout()
    router.push("/admin/login")
  }

  const handleExportPDF = (type: string) => {
    console.log("[v0] Exporting PDF for:", type)
    alert(`PDF export voor ${type} wordt voorbereid...`)
  }

  const handleDelete = (type: string, id: string, name: string) => {
    if (confirm(`Weet je zeker dat je "${name}" wilt verwijderen?`)) {
      if (type === "institution") deleteInstitution(id)
      if (type === "teacher") deleteTeacher(id)
      if (type === "activity") deleteActivity(id)
    }
  }

  const filteredInstitutions = institutions.filter(
    (inst) =>
      inst.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inst.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredTeachers = teachers.filter(
    (teacher) =>
      teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.school.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredActivities =
    selectedDay === "all" ? programActivities : programActivities.filter((activity) => activity.day === selectedDay)

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Admin Dashboard</h1>
              <p className="text-muted-foreground">
                Welkom, {currentUser?.email} | Beheer de Culturele IntroWeek MBO 2026
              </p>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              Uitloggen
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Instellingen</CardTitle>
                <Building2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{institutions.length}</div>
                <p className="text-xs text-muted-foreground">Geregistreerde instellingen</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Docenten</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{teachers.length}</div>
                <p className="text-xs text-muted-foreground">Geregistreerde docenten</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Activiteiten</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{programActivities.length}</div>
                <p className="text-xs text-muted-foreground">Geplande activiteiten</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Studenten</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{teachers.reduce((sum, t) => sum + t.numberOfStudents, 0)}</div>
                <p className="text-xs text-muted-foreground">Verwachte deelnemers</p>
              </CardContent>
            </Card>
          </div>

          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Zoek instellingen, docenten, of activiteiten..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Management Tabs */}
          <Tabs defaultValue="institutions" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="institutions">Instellingen ({institutions.length})</TabsTrigger>
              <TabsTrigger value="teachers">Docenten ({teachers.length})</TabsTrigger>
              <TabsTrigger value="program">Programma ({programActivities.length})</TabsTrigger>
            </TabsList>

            {/* Institutions Tab */}
            <TabsContent value="institutions" className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Culturele Instellingen</h2>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => handleExportPDF("instellingen")}>
                    <Download className="w-4 h-4 mr-2" />
                    Exporteer PDF
                  </Button>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Nieuwe instelling
                  </Button>
                </div>
              </div>

              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="border-b bg-muted/50">
                        <tr className="text-left">
                          <th className="p-4 font-medium">Naam</th>
                          <th className="p-4 font-medium">E-mail</th>
                          <th className="p-4 font-medium">Locatie</th>
                          <th className="p-4 font-medium">Capaciteit</th>
                          <th className="p-4 font-medium">Beschikbaarheid</th>
                          <th className="p-4 font-medium">Acties</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredInstitutions.map((institution) => (
                          <tr key={institution.id} className="border-b hover:bg-muted/50 transition-colors">
                            <td className="p-4 font-medium">{institution.name}</td>
                            <td className="p-4 text-sm">{institution.email}</td>
                            <td className="p-4 text-sm">{institution.visitAddress}</td>
                            <td className="p-4 text-sm">{institution.capacity} studenten</td>
                            <td className="p-4 text-sm">{institution.availableDays.join(", ")}</td>
                            <td className="p-4">
                              <div className="flex gap-2">
                                <Button size="sm" variant="ghost" title="Bekijken">
                                  <Eye className="w-4 h-4" />
                                </Button>
                                <Button size="sm" variant="ghost" title="Bewerken">
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  title="Verwijderen"
                                  onClick={() => handleDelete("institution", institution.id, institution.name)}
                                >
                                  <Trash2 className="w-4 h-4 text-destructive" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Teachers Tab */}
            <TabsContent value="teachers" className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Docenten Registraties</h2>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => handleExportPDF("docenten")}>
                    <Download className="w-4 h-4 mr-2" />
                    Exporteer PDF
                  </Button>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Nieuwe registratie
                  </Button>
                </div>
              </div>

              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="border-b bg-muted/50">
                        <tr className="text-left">
                          <th className="p-4 font-medium">Naam</th>
                          <th className="p-4 font-medium">School</th>
                          <th className="p-4 font-medium">Klas</th>
                          <th className="p-4 font-medium">Studenten</th>
                          <th className="p-4 font-medium">Tijdslot</th>
                          <th className="p-4 font-medium">Activiteiten</th>
                          <th className="p-4 font-medium">Acties</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredTeachers.map((teacher) => (
                          <tr key={teacher.id} className="border-b hover:bg-muted/50 transition-colors">
                            <td className="p-4 font-medium">{teacher.name}</td>
                            <td className="p-4 text-sm">{teacher.school}</td>
                            <td className="p-4 text-sm">{teacher.className}</td>
                            <td className="p-4 text-sm">{teacher.numberOfStudents}</td>
                            <td className="p-4 text-sm">
                              {teacher.preferredDay} {teacher.startTime}-{teacher.endTime}
                            </td>
                            <td className="p-4 text-sm">{teacher.numberOfActivities}</td>
                            <td className="p-4">
                              <div className="flex gap-2">
                                <Button size="sm" variant="ghost" title="Bekijken">
                                  <Eye className="w-4 h-4" />
                                </Button>
                                <Button size="sm" variant="ghost" title="Bewerken">
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  title="Verwijderen"
                                  onClick={() => handleDelete("teacher", teacher.id, teacher.name)}
                                >
                                  <Trash2 className="w-4 h-4 text-destructive" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Program Tab */}
            <TabsContent value="program" className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Programma Overzicht</h2>
                <div className="flex gap-2">
                  <Select value={selectedDay} onValueChange={setSelectedDay}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter op dag" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Alle dagen</SelectItem>
                      <SelectItem value="Maandag">Maandag</SelectItem>
                      <SelectItem value="Dinsdag">Dinsdag</SelectItem>
                      <SelectItem value="Woensdag">Woensdag</SelectItem>
                      <SelectItem value="Donderdag">Donderdag</SelectItem>
                      <SelectItem value="Vrijdag">Vrijdag</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" onClick={() => handleExportPDF("programma")}>
                    <Download className="w-4 h-4 mr-2" />
                    Exporteer PDF
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/programma">
                      <Eye className="w-4 h-4 mr-2" />
                      Bekijk publiek programma
                    </Link>
                  </Button>
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Week Planning</CardTitle>
                  <CardDescription>31 augustus - 4 september 2026</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="border-b bg-muted/50">
                        <tr className="text-left">
                          <th className="p-4 font-medium">Dag</th>
                          <th className="p-4 font-medium">Tijd</th>
                          <th className="p-4 font-medium">Instelling</th>
                          <th className="p-4 font-medium">Docent</th>
                          <th className="p-4 font-medium">Klas</th>
                          <th className="p-4 font-medium">Studenten</th>
                          <th className="p-4 font-medium">Status</th>
                          <th className="p-4 font-medium">Acties</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredActivities.map((activity) => (
                          <tr key={activity.id} className="border-b hover:bg-muted/50 transition-colors">
                            <td className="p-4 font-medium">{activity.day}</td>
                            <td className="p-4 text-sm">
                              {activity.startTime} - {activity.endTime}
                            </td>
                            <td className="p-4 text-sm">{activity.institutionName}</td>
                            <td className="p-4 text-sm">{activity.teacherName}</td>
                            <td className="p-4 text-sm">{activity.className}</td>
                            <td className="p-4 text-sm">{activity.numberOfStudents}</td>
                            <td className="p-4">
                              <span
                                className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                  activity.status === "confirmed"
                                    ? "bg-green-100 text-green-800"
                                    : activity.status === "pending"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : "bg-red-100 text-red-800"
                                }`}
                              >
                                {activity.status === "confirmed"
                                  ? "Bevestigd"
                                  : activity.status === "pending"
                                    ? "In afwachting"
                                    : "Geannuleerd"}
                              </span>
                            </td>
                            <td className="p-4">
                              <div className="flex gap-2">
                                <Button size="sm" variant="ghost" title="Bewerken">
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  title="Verwijderen"
                                  onClick={() =>
                                    handleDelete(
                                      "activity",
                                      activity.id,
                                      `${activity.institutionName} - ${activity.className}`,
                                    )
                                  }
                                >
                                  <Trash2 className="w-4 h-4 text-destructive" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  )
}
