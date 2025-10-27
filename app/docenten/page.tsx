"use client"

import type React from "react"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Users, Calendar, Info, Plus, Trash2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAdminStore } from "@/lib/admin-store"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function DocentenPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [yearLevel, setYearLevel] = useState("")
  const [participatedBefore, setParticipatedBefore] = useState("")
  const [numberOfClasses, setNumberOfClasses] = useState(1)
  const [classes, setClasses] = useState([{ name: "", students: "", year: "" }])
  const addTeacher = useAdminStore((state) => state.addTeacher)
  const router = useRouter()

  const handleAddClass = () => {
    setClasses([...classes, { name: "", students: "", year: "" }])
    setNumberOfClasses(numberOfClasses + 1)
  }

  const handleRemoveClass = (index: number) => {
    const newClasses = classes.filter((_, i) => i !== index)
    setClasses(newClasses)
    setNumberOfClasses(numberOfClasses - 1)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)

    const email = formData.get("teacher-email") as string
    const emailConfirm = formData.get("teacher-email-confirm") as string

    if (email !== emailConfirm) {
      alert("De e-mailadressen komen niet overeen. Controleer uw invoer.")
      setIsSubmitting(false)
      return
    }

    const teacher = {
      name: formData.get("teacher-name") as string,
      function: formData.get("teacher-function") as string,
      email: email,
      phone: "",
      school: formData.get("college") as string,
      program: formData.get("opleiding") as string,
      address: formData.get("address") as string,
      numberOfClasses: numberOfClasses,
      classes: classes,
      className: classes[0]?.name || "",
      numberOfStudents: Number.parseInt(classes[0]?.students || "0"),
      yearLevel: classes[0]?.year || "",
      mentorAttending: formData.get("mentor") === "on",
      participatedBefore: formData.get("participated-before") as string,
      previousLocations: formData.get("previous-locations") as string,
      preferredDay: formData.get("preferred-day") as string,
      startTime: formData.get("start-time") as string,
      endTime: formData.get("end-time") as string,
      numberOfActivities: Number.parseInt(formData.get("activities") as string),
      preferences: [],
    }

    addTeacher(teacher)

    alert("Aanmelding succesvol verzonden! U ontvangt een bevestigingsmail op " + teacher.email)

    setIsSubmitting(false)
    router.push("/")
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1 py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/10 mb-4">
              <Users className="w-8 h-8 text-secondary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Aanmelding voor Docenten</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Meld uw klas(sen) aan voor de Culturele IntroWeek MBO 2026 en kies uit meer dan 60 culturele activiteiten.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 border border-secondary rounded-lg">
              <Calendar className="w-4 h-4 text-secondary" />
              <span className="text-sm font-medium">Deadline: 1 maart 2026</span>
            </div>
          </div>

          <Alert className="mb-8">
            <Info className="h-4 w-4" />
            <AlertDescription>
              Na aanmelding ontvangt u een bevestigingsmail met een overzicht van uw ingevulde gegevens. Het definitieve
              programma ontvangt u later per e-mail.
            </AlertDescription>
          </Alert>

          <Card>
            <CardHeader>
              <CardTitle>Aanmeldformulier Docenten</CardTitle>
              <CardDescription>
                Vul onderstaande gegevens in om uw klas(sen) aan te melden voor de IntroWeek 2026.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Docent Gegevens</h3>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="teacher-name">Naam Docent/Aanmelder *</Label>
                      <Input id="teacher-name" name="teacher-name" placeholder="Voor- en achternaam" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="teacher-function">Functie Docent/Aanmelder *</Label>
                      <Input
                        id="teacher-function"
                        name="teacher-function"
                        placeholder="Bijv. Mentor, Docent"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="college">Welk College *</Label>
                    <Select name="college" required>
                      <SelectTrigger id="college">
                        <SelectValue placeholder="Selecteer uw college" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hout-meubilering">Hout en Meubileringscollege</SelectItem>
                        <SelectItem value="mediacollege">Mediacollege</SelectItem>
                        <SelectItem value="amstelland">MBO College Amstelland</SelectItem>
                        <SelectItem value="airport">MBO College Airport</SelectItem>
                        <SelectItem value="almere">MBO College Almere</SelectItem>
                        <SelectItem value="almere-poort">MBO College Almere Poort</SelectItem>
                        <SelectItem value="centrum">MBO College Centrum</SelectItem>
                        <SelectItem value="hilversum">MBO College Hilversum</SelectItem>
                        <SelectItem value="lelystad">MBO College Lelystad</SelectItem>
                        <SelectItem value="noord">MBO College Noord</SelectItem>
                        <SelectItem value="west">MBO College West</SelectItem>
                        <SelectItem value="westpoort">MBO College Westpoort</SelectItem>
                        <SelectItem value="zuid">MBO College Zuid</SelectItem>
                        <SelectItem value="zuidoost">MBO College Zuidoost</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="opleiding">Welke Opleiding *</Label>
                    <Input
                      id="opleiding"
                      name="opleiding"
                      placeholder="Bijv. Administratie, ICT, Zorg & Welzijn"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Adres waar de opleiding is gevestigd *</Label>
                    <Input id="address" name="address" placeholder="Straat, huisnummer, postcode en plaats" required />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="teacher-email">E-mailadres *</Label>
                      <Input
                        id="teacher-email"
                        name="teacher-email"
                        type="email"
                        placeholder="naam@rocva.nl"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="teacher-email-confirm">Bevestig E-mailadres *</Label>
                      <Input
                        id="teacher-email-confirm"
                        name="teacher-email-confirm"
                        type="email"
                        placeholder="naam@rocva.nl"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4 pt-6 border-t">
                  <h3 className="text-lg font-semibold">Klasinformatie</h3>

                  <div className="space-y-2">
                    <Label htmlFor="number-of-classes">Hoeveel klassen meldt je aan? *</Label>
                    <div className="flex items-center gap-4">
                      <Input
                        id="number-of-classes"
                        name="number-of-classes"
                        type="number"
                        min="1"
                        value={numberOfClasses}
                        onChange={(e) => {
                          const num = Number.parseInt(e.target.value) || 1
                          setNumberOfClasses(num)
                          const newClasses = Array(num)
                            .fill(null)
                            .map((_, i) => classes[i] || { name: "", students: "", year: "" })
                          setClasses(newClasses)
                        }}
                        className="w-32"
                        required
                      />
                      <span className="text-sm text-muted-foreground">klas(sen)</span>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {classes.map((classItem, index) => (
                      <div key={index} className="p-4 border rounded-lg space-y-4 bg-muted/20">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">Klas {index + 1}</h4>
                          {classes.length > 1 && (
                            <Button type="button" variant="ghost" size="sm" onClick={() => handleRemoveClass(index)}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`class-name-${index}`}>Naam van de klas *</Label>
                          <Input
                            id={`class-name-${index}`}
                            name={`class-name-${index}`}
                            placeholder="Bijv. WAGTAO2SA"
                            value={classItem.name}
                            onChange={(e) => {
                              const newClasses = [...classes]
                              newClasses[index].name = e.target.value
                              setClasses(newClasses)
                            }}
                            required
                          />
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor={`student-count-${index}`}>Hoeveel studenten zitten er in de klas? *</Label>
                            <Select
                              name={`student-count-${index}`}
                              value={classItem.students}
                              onValueChange={(value) => {
                                const newClasses = [...classes]
                                newClasses[index].students = value
                                setClasses(newClasses)
                              }}
                              required
                            >
                              <SelectTrigger id={`student-count-${index}`}>
                                <SelectValue placeholder="Selecteer aantal" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="<20">Minder dan 20 studenten</SelectItem>
                                <SelectItem value="<25">Minder dan 25 studenten</SelectItem>
                                <SelectItem value="<30">Minder dan 30 studenten</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor={`level-${index}`}>In welk jaar zit de klas? *</Label>
                            <Select
                              name={`level-${index}`}
                              value={classItem.year}
                              onValueChange={(value) => {
                                const newClasses = [...classes]
                                newClasses[index].year = value
                                setClasses(newClasses)
                                if (index === 0) setYearLevel(value)
                              }}
                              required
                            >
                              <SelectTrigger id={`level-${index}`}>
                                <SelectValue placeholder="Selecteer leerjaar" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="1">1e jaar</SelectItem>
                                <SelectItem value="2">2e jaar</SelectItem>
                                <SelectItem value="3">3e jaar</SelectItem>
                                <SelectItem value="4">4e jaar</SelectItem>
                                <SelectItem value="other">Anders namelijk</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                    ))}

                    <Button type="button" variant="outline" onClick={handleAddClass} className="w-full bg-transparent">
                      <Plus className="w-4 h-4 mr-2" />
                      Nog een klas toevoegen
                    </Button>
                  </div>

                  {(yearLevel === "2" || yearLevel === "3" || yearLevel === "4") && (
                    <div className="space-y-4 p-4 border rounded-lg bg-secondary/5">
                      <div className="space-y-2">
                        <Label>Vorig jaar ook meegedaan aan de Culturele INTROWEEK? *</Label>
                        <RadioGroup
                          name="participated-before"
                          value={participatedBefore}
                          onValueChange={setParticipatedBefore}
                          required
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="yes" id="participated-yes" />
                            <Label htmlFor="participated-yes" className="font-normal cursor-pointer">
                              Ja
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="no" id="participated-no" />
                            <Label htmlFor="participated-no" className="font-normal cursor-pointer">
                              Nee
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>

                      {participatedBefore === "yes" && (
                        <div className="space-y-2">
                          <Label htmlFor="previous-locations">
                            Waar zijn de studenten (als je dat weet) naartoe geweest?
                          </Label>
                          <Textarea
                            id="previous-locations"
                            name="previous-locations"
                            placeholder="Bijv. Rijksmuseum, Van Gogh Museum, Stedelijk Museum..."
                            rows={3}
                          />
                          <p className="text-sm text-muted-foreground">
                            Dit helpt ons om te voorkomen dat studenten naar dezelfde instellingen gaan
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="flex items-center space-x-2 pt-2">
                    <Checkbox id="mentor" name="mentor" />
                    <Label htmlFor="mentor" className="cursor-pointer font-normal">
                      De mentor gaat mee
                    </Label>
                  </div>
                </div>

                <div className="space-y-4 pt-6 border-t">
                  <h3 className="text-lg font-semibold">Voorkeuren</h3>

                  <div className="space-y-2">
                    <Label htmlFor="preferred-day">Klik aan op welke dag je gebruik wilt maken van het aanbod *</Label>
                    <Select name="preferred-day" required>
                      <SelectTrigger id="preferred-day">
                        <SelectValue placeholder="Selecteer dag" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mon">Maandag 31 augustus 2026</SelectItem>
                        <SelectItem value="tue">Dinsdag 1 september 2026</SelectItem>
                        <SelectItem value="wed">Woensdag 2 september 2026</SelectItem>
                        <SelectItem value="thu">Donderdag 3 september 2026</SelectItem>
                        <SelectItem value="fri">Vrijdag 4 september 2026</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="activities">1 of 2 activiteiten *</Label>
                    <Select name="activities" required>
                      <SelectTrigger id="activities">
                        <SelectValue placeholder="Selecteer aantal activiteiten" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 activiteit</SelectItem>
                        <SelectItem value="2">2 activiteiten</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-muted-foreground">
                      Bij 2 activiteiten wordt er automatisch een pauze van 1,5 uur ingepland tussen de activiteiten
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label>Welk dagdeel? (Optioneel)</Label>
                    <p className="text-sm text-muted-foreground mb-2">
                      U kunt hieronder aangeven wanneer u wilt komen, of laat het systeem automatisch een programma
                      maken
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="start-time">Gewenste starttijd</Label>
                        <Input id="start-time" name="start-time" type="time" placeholder="09:00" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="end-time">Gewenste eindtijd</Label>
                        <Input id="end-time" name="end-time" type="time" placeholder="13:00" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t">
                  <Button type="submit" size="lg" className="w-full md:w-auto" disabled={isSubmitting}>
                    {isSubmitting ? "Bezig met aanmelden..." : "Klas(sen) Aanmelden"}
                  </Button>
                  <p className="text-sm text-muted-foreground mt-4">
                    Na aanmelding ontvangt u een bevestigingsmail van{" "}
                    <span className="font-medium">cultureleintroweek@rocva.nl</span> met een overzicht van uw ingevulde
                    gegevens. Het definitieve programma ontvangt u later per e-mail.
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
