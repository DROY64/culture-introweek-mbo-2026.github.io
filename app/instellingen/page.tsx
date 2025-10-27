"use client"

import type React from "react"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar, Building2, Plus, X } from "lucide-react"
import { useState } from "react"
import { useAdminStore } from "@/lib/admin-store"
import { useRouter } from "next/navigation"

export default function InstellingenPage() {
  const [timeSlots, setTimeSlots] = useState([{ id: 1, day: "", startTime: "", endTime: "" }])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const addInstitution = useAdminStore((state) => state.addInstitution)
  const router = useRouter()

  const addTimeSlot = () => {
    setTimeSlots([...timeSlots, { id: Date.now(), day: "", startTime: "", endTime: "" }])
  }

  const removeTimeSlot = (id: number) => {
    setTimeSlots(timeSlots.filter((slot) => slot.id !== id))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)

    let logoBase64 = ""
    if (logoFile) {
      const reader = new FileReader()
      logoBase64 = await new Promise((resolve) => {
        reader.onloadend = () => resolve(reader.result as string)
        reader.readAsDataURL(logoFile)
      })
    }

    const availableDays: string[] = []
    const days = ["mon", "tue", "wed", "thu", "fri"]
    const dayNames = ["Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag"]
    days.forEach((day, index) => {
      if (formData.get(day) === "on") {
        availableDays.push(dayNames[index])
      }
    })

    const institution = {
      name: formData.get("institution-name") as string,
      email: formData.get("contact-email") as string,
      generalEmail: formData.get("general-email") as string,
      phone: formData.get("contact-phone") as string,
      website: "",
      visitAddress: (formData.get("visit-address") as string) || "Nog niet bekend",
      postalAddress: `${formData.get("postal-address")}, ${formData.get("postal-code")} ${formData.get("city")}`,
      contactPerson: formData.get("contact-name") as string,
      description: formData.get("activity-description") as string,
      capacity: Number.parseInt(formData.get("capacity") as string),
      availableDays,
      timeSlots: timeSlots.filter((slot) => slot.day && slot.startTime && slot.endTime),
      logo: logoBase64,
    }

    addInstitution(institution)

    alert("Registratie succesvol verzonden! U ontvangt een bevestigingsmail op " + institution.email)

    setIsSubmitting(false)
    router.push("/")
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1 py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <Building2 className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Registratie Culturele Instelling</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Registreer uw instelling voor de Culturele IntroWeek MBO 2026 en bied unieke ervaringen aan duizenden
              studenten.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent rounded-lg">
              <Calendar className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium">Deadline: 1 maart 2026</span>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Instellingsgegevens</CardTitle>
              <CardDescription>
                Vul onderstaande gegevens in om uw instelling te registreren voor de IntroWeek 2026.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Basisinformatie</h3>

                  <div className="space-y-2">
                    <Label htmlFor="institution-name">Naam Instelling *</Label>
                    <Input id="institution-name" name="institution-name" placeholder="" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="general-email">Algemeen E-mailadres *</Label>
                    <Input id="general-email" type="email" placeholder="info@instelling.nl" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="logo">Logo Instelling *</Label>
                    <Input
                      id="logo"
                      name="logo"
                      type="file"
                      accept="image/*"
                      required
                      onChange={(e) => setLogoFile(e.target.files?.[0] || null)}
                    />
                    <p className="text-sm text-muted-foreground">
                      Upload uw logo zoals het in het programma weergegeven mag worden (PNG, JPG, max 2MB)
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="institution-type">Type Instelling *</Label>
                      <Select>
                        <SelectTrigger id="institution-type">
                          <SelectValue placeholder="Selecteer type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="museum">Museum</SelectItem>
                          <SelectItem value="theater">Theater</SelectItem>
                          <SelectItem value="music">Muziekinstelling</SelectItem>
                          <SelectItem value="gallery">Galerie</SelectItem>
                          <SelectItem value="cultural-center">Cultureel Centrum</SelectItem>
                          <SelectItem value="other">Anders</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="district">Stadsdeel</Label>
                      <Select>
                        <SelectTrigger id="district">
                          <SelectValue placeholder="Selecteer" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="centrum">Centrum</SelectItem>
                          <SelectItem value="noord">Noord</SelectItem>
                          <SelectItem value="oost">Oost</SelectItem>
                          <SelectItem value="zuid">Zuid</SelectItem>
                          <SelectItem value="west">West</SelectItem>
                          <SelectItem value="zuidoost">Zuidoost</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="postal-address">Postadres *</Label>
                    <Input id="postal-address" placeholder="Straat en huisnummer" required />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="postal-code">Postcode *</Label>
                      <Input id="postal-code" placeholder="1234 AB" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="city">Stad *</Label>
                      <Input id="city" placeholder="Amsterdam" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="visit-address">Bezoekadres</Label>
                    <Input id="visit-address" placeholder="Straat en huisnummer of 'Nog niet bekend'" />
                    <p className="text-sm text-muted-foreground">
                      Indien het bezoekadres afwijkt van het postadres, of nog niet bekend is
                    </p>
                  </div>
                </div>

                <div className="space-y-4 pt-6 border-t">
                  <h3 className="text-lg font-semibold">Contactpersoon</h3>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="contact-name">Naam *</Label>
                      <Input id="contact-name" placeholder="Voor- en achternaam" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contact-function">Functie *</Label>
                      <Input id="contact-function" placeholder="Bijv. Educatief medewerker" required />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="contact-email">E-mailadres *</Label>
                      <Input id="contact-email" type="email" placeholder="naam@instelling.nl" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contact-email-confirm">Bevestig E-mailadres *</Label>
                      <Input id="contact-email-confirm" type="email" placeholder="naam@instelling.nl" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contact-phone">Telefoonnummer *</Label>
                    <Input id="contact-phone" type="tel" placeholder="06 12345678" required />
                  </div>
                </div>

                <div className="space-y-4 pt-6 border-t">
                  <h3 className="text-lg font-semibold">Activiteit Details</h3>

                  <div className="space-y-2">
                    <Label htmlFor="activity-description">Beschrijving Instelling & Activiteit *</Label>
                    <Textarea
                      id="activity-description"
                      placeholder="Beschrijf uw instelling en de activiteit die u aanbiedt tijdens de IntroWeek..."
                      rows={5}
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="capacity">Capaciteit (aantal klassen) *</Label>
                      <Select>
                        <SelectTrigger id="capacity">
                          <SelectValue placeholder="Selecteer" />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                            <SelectItem key={num} value={num.toString()}>
                              {num} {num === 1 ? "klas" : "klassen"} (à 25 studenten)
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="duration">Tijdsduur *</Label>
                      <Select>
                        <SelectTrigger id="duration">
                          <SelectValue placeholder="Selecteer" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="60">60 minuten</SelectItem>
                          <SelectItem value="75">75 minuten</SelectItem>
                          <SelectItem value="90">90 minuten</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cost">Kosten per student</Label>
                      <Input id="cost" type="number" placeholder="0" />
                    </div>
                  </div>
                </div>

                <div className="space-y-4 pt-6 border-t">
                  <h3 className="text-lg font-semibold">Beschikbaarheid</h3>

                  <div className="space-y-2">
                    <Label>Welke dagen bent u beschikbaar? *</Label>
                    <div className="space-y-3">
                      {[
                        { day: "Maandag", date: "31 augustus 2026", value: "mon" },
                        { day: "Dinsdag", date: "1 september 2026", value: "tue" },
                        { day: "Woensdag", date: "2 september 2026", value: "wed" },
                        { day: "Donderdag", date: "3 september 2026", value: "thu" },
                        { day: "Vrijdag", date: "4 september 2026", value: "fri" },
                      ].map((day) => (
                        <div key={day.value} className="flex items-center space-x-2">
                          <Checkbox id={day.value} />
                          <Label htmlFor={day.value} className="cursor-pointer font-normal">
                            {day.day} {day.date}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label>Tijdsloten *</Label>
                    <p className="text-sm text-muted-foreground">
                      Voeg de tijdsloten toe waarop u activiteiten kunt aanbieden
                    </p>

                    {timeSlots.map((slot, index) => (
                      <div key={slot.id} className="flex gap-2 items-end">
                        <div className="flex-1 grid grid-cols-3 gap-2">
                          <div className="space-y-2">
                            <Label htmlFor={`day-${slot.id}`} className="text-sm">
                              Dag
                            </Label>
                            <Select>
                              <SelectTrigger id={`day-${slot.id}`}>
                                <SelectValue placeholder="Dag" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="mon">Maandag</SelectItem>
                                <SelectItem value="tue">Dinsdag</SelectItem>
                                <SelectItem value="wed">Woensdag</SelectItem>
                                <SelectItem value="thu">Donderdag</SelectItem>
                                <SelectItem value="fri">Vrijdag</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`start-${slot.id}`} className="text-sm">
                              Van
                            </Label>
                            <Input id={`start-${slot.id}`} type="time" placeholder="09:00" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`end-${slot.id}`} className="text-sm">
                              Tot
                            </Label>
                            <Input id={`end-${slot.id}`} type="time" placeholder="10:30" />
                          </div>
                        </div>
                        {timeSlots.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => removeTimeSlot(slot.id)}
                            className="shrink-0"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}

                    <Button type="button" variant="outline" onClick={addTimeSlot} className="w-full bg-transparent">
                      <Plus className="h-4 w-4 mr-2" />
                      Tijdslot Toevoegen
                    </Button>
                  </div>
                </div>

                <div className="space-y-4 pt-6 border-t">
                  <h3 className="text-lg font-semibold">Opmerkingen</h3>

                  <div className="space-y-2">
                    <Label htmlFor="remarks">Opmerkingen (optioneel)</Label>
                    <Textarea
                      id="remarks"
                      placeholder="Eventuele aanvullende opmerkingen of bijzonderheden..."
                      rows={4}
                    />
                  </div>
                </div>

                <div className="pt-6 border-t">
                  <Button type="submit" size="lg" className="w-full md:w-auto" disabled={isSubmitting}>
                    {isSubmitting ? "Bezig met verzenden..." : "Registratie Verzenden"}
                  </Button>
                  <p className="text-sm text-muted-foreground mt-4">
                    Na verzending ontvangt u een bevestigingsmail van{" "}
                    <span className="font-medium">cultureleintroweek@rocva.nl</span> met een PDF-overzicht en een link
                    om uw gegevens te wijzigen (geldig tot 1 maart 2026).
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
