"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, MapPin, Users, Search, ExternalLink, Filter } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { culturalInstitutions, partnerOrganizations } from "@/lib/institutions-data"

export default function ProgrammaPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSense, setSelectedSense] = useState("all")
  const [selectedDistrict, setSelectedDistrict] = useState("all")
  const [selectedDay, setSelectedDay] = useState("all")

  const getSenseColor = (sense: string) => {
    const colors: Record<string, string> = {
      Zien: "bg-blue-100 text-blue-800 border-blue-200",
      Horen: "bg-purple-100 text-purple-800 border-purple-200",
      Proeven: "bg-orange-100 text-orange-800 border-orange-200",
      Voelen: "bg-green-100 text-green-800 border-green-200",
      Ruiken: "bg-pink-100 text-pink-800 border-pink-200",
    }
    return colors[sense] || "bg-muted"
  }

  const getSenseIcon = (sense: string) => {
    const icons: Record<string, string> = {
      Zien: "👁️",
      Horen: "👂",
      Proeven: "👅",
      Voelen: "✋",
      Ruiken: "👃",
    }
    return icons[sense] || "🎨"
  }

  // Filter institutions
  const filteredInstitutions = culturalInstitutions.filter((institution) => {
    const matchesSearch =
      institution.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      institution.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      institution.district.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesSense = selectedSense === "all" || institution.sense === selectedSense
    const matchesDistrict = selectedDistrict === "all" || institution.district === selectedDistrict
    const matchesDay =
      selectedDay === "all" || institution.availableDays.some((day) => day.toLowerCase() === selectedDay.toLowerCase())

    return matchesSearch && matchesSense && matchesDistrict && matchesDay
  })

  const uniqueDistricts = Array.from(new Set(culturalInstitutions.map((inst) => inst.district))).sort()

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-muted/20">
      <Navigation />

      <main className="flex-1 py-12 md:py-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12 max-w-4xl mx-auto animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Programma Overzicht 2026
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground text-pretty leading-relaxed mb-6">
              Ontdek het volledige programma van de Culturele IntroWeek MBO 2026. Meer dan 60 culturele instellingen
              bieden unieke ervaringen aan voor alle MBO-studenten in Amsterdam.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 border border-primary rounded-xl hover:bg-primary/20 transition-colors">
                <Calendar className="w-5 h-5 text-primary" />
                <span className="font-semibold">31 augustus - 4 september 2026</span>
              </div>
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-secondary/10 border border-secondary rounded-xl hover:bg-secondary/20 transition-colors">
                <Users className="w-5 h-5 text-secondary" />
                <span className="font-semibold">60+ Culturele Instellingen</span>
              </div>
            </div>
          </div>

          {/* Program Schedule Info */}
          <Card className="mb-12 border-2 border-primary/20 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-primary/5 to-secondary/5">
              <CardTitle className="text-2xl">Wanneer ontvang je het programma?</CardTitle>
              <CardDescription className="text-base">
                Het definitieve programma voor jouw klas wordt op de volgende momenten verstuurd:
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
                  <Calendar className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">Voor de IntroWeek</h3>
                    <p className="text-sm text-muted-foreground">
                      Uiterlijk <strong>1 juni 2026</strong> ontvangen alle geregistreerde docenten het definitieve
                      programma per e-mail met de bevestigde tijdsloten en locaties.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
                  <MapPin className="w-6 h-6 text-secondary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">Tijdens de IntroWeek</h3>
                    <p className="text-sm text-muted-foreground">
                      Op de dag zelf ontvangen studenten een gedetailleerde routebeschrijving en praktische informatie
                      over hun bezoeken.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Search and Filters */}
          <Card className="mb-8 shadow-lg">
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="relative lg:col-span-2">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Zoek instellingen..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <Select value={selectedSense} onValueChange={setSelectedSense}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter op zintuig" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Alle zintuigen</SelectItem>
                    <SelectItem value="Zien">👁️ Zien</SelectItem>
                    <SelectItem value="Horen">👂 Horen</SelectItem>
                    <SelectItem value="Ruiken">👃 Ruiken</SelectItem>
                    <SelectItem value="Proeven">👅 Proeven</SelectItem>
                    <SelectItem value="Voelen">✋ Voelen</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter op stadsdeel" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Alle stadsdelen</SelectItem>
                    {uniqueDistricts.map((district) => (
                      <SelectItem key={district} value={district}>
                        {district}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">
                  <Filter className="w-3 h-3 mr-1" />
                  {filteredInstitutions.length} resultaten
                </Badge>
                {(searchQuery || selectedSense !== "all" || selectedDistrict !== "all") && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSearchQuery("")
                      setSelectedSense("all")
                      setSelectedDistrict("all")
                      setSelectedDay("all")
                    }}
                  >
                    Wis filters
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Institutions Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredInstitutions.map((institution, index) => (
              <Card
                key={institution.id}
                className="hover:shadow-xl transition-all duration-300 overflow-hidden group animate-slide-up border-2 hover:border-primary/50"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="relative h-48 bg-gradient-to-br from-primary/5 to-secondary/5 overflow-hidden">
                  <Image
                    src={institution.imageUrl || "/placeholder.svg"}
                    alt={institution.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className={getSenseColor(institution.sense)}>
                      <span className="mr-1">{getSenseIcon(institution.sense)}</span>
                      {institution.sense}
                    </Badge>
                  </div>
                </div>

                <CardHeader>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {institution.name}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4" />
                    {institution.district}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground line-clamp-3">{institution.description}</p>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users className="w-4 h-4 flex-shrink-0" />
                      <span>Max. {institution.capacity} studenten</span>
                    </div>

                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-4 h-4 flex-shrink-0" />
                      <span className="line-clamp-1">{institution.availableDays.join(", ")}</span>
                    </div>

                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="w-4 h-4 flex-shrink-0" />
                      <span>{institution.timeSlots.length} tijdsloten beschikbaar</span>
                    </div>
                  </div>

                  {institution.website && (
                    <Button variant="outline" className="w-full group/btn bg-transparent" asChild>
                      <Link href={institution.website} target="_blank" rel="noopener noreferrer">
                        Bezoek website
                        <ExternalLink className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredInstitutions.length === 0 && (
            <Card className="text-center py-12">
              <CardContent>
                <p className="text-muted-foreground mb-4">Geen instellingen gevonden met de huidige filters.</p>
                <Button
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedSense("all")
                    setSelectedDistrict("all")
                    setSelectedDay("all")
                  }}
                >
                  Wis alle filters
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Partner Organizations */}
          <Card className="mb-12 border-2 border-secondary/20 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-secondary/5 to-accent/5">
              <CardTitle className="text-2xl">Samenwerkende Partners</CardTitle>
              <CardDescription className="text-base">
                De Culturele INTROWEEK MBO 2026 wordt mogelijk gemaakt door de volgende organisaties:
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {partnerOrganizations.map((partner) => (
                  <Link
                    key={partner.name}
                    href={partner.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors group"
                  >
                    <div className="text-center">
                      <div className="relative h-16 w-full mb-2">
                        <Image
                          src={partner.logo || "/placeholder.svg"}
                          alt={partner.name}
                          fill
                          className="object-contain opacity-70 group-hover:opacity-100 transition-opacity"
                        />
                      </div>
                      <p className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                        {partner.name}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* About Section */}
          <Card className="bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 border-2">
            <CardContent className="pt-6">
              <div className="prose prose-lg max-w-none">
                <h2 className="text-2xl font-bold mb-4">Over de Culturele INTROWEEK MBO 2026</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Hoe en waar kun je het nieuwe collegejaar beter beginnen dan in inspirerend Amsterdam? In week 36 van
                  31 augustus t/m 4 september 2026 openen meer dan 60 culturele instellingen hun deuren voor alle
                  mbo-studenten in Amsterdam.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Ook deze derde editie van de Culturele INTROWEEK MBO brengt mbo-studenten in contact met de stad door
                  middel van kunst en cultuur. Studenten leren elkaar beter kennen, ontdekken Amsterdam en maken kennis
                  met het brede culturele aanbod van de stad. Laat je inspireren door al het moois dat Amsterdam te
                  bieden heeft.
                </p>
                <blockquote className="border-l-4 border-primary pl-4 italic text-lg my-6">
                  "Meer dan 60 culturele instellingen openen hun deuren voor de toekomst van de stad. Cultuur Werkt."
                </blockquote>
                <p className="text-muted-foreground leading-relaxed">
                  Culturele INTROWEEK MBO 2026 is een initiatief van de Cultuurcoördinatoren van het ROC van Amsterdam,
                  Mediacollege Amsterdam en Hout en Meubileringscollege Amsterdam. De Culturele INTROWEEK MBO 2026 wordt
                  georganiseerd door het Amsterdams Platform Cultuureducatie MBO, Stichting Museumnacht Amsterdam,
                  Museum Vereniging, GVB, MOCCA Expertisecentrum Cultuuronderwijs en CJP.
                </p>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  Veel dank aan alle culturele instellingen van Amsterdam die meedoen met de derde editie van de
                  culturele INTROWEEK MBO voor het openen van hun deuren voor de toekomst van de stad.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
