"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, Phone, MapPin, Clock } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1 py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Contact</h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-pretty">
              Voor vragen over de Culturele INTROWEEK MBO en Cultuureducatie MBO in het algemeen; neem contact op met
              jouw College CultuurCoördinator.
            </p>
          </div>

          <Card className="mb-12 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 border-2">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold mb-4">Culturele INTROWEEK MBO 2026</h2>
              <div className="prose prose-sm max-w-none text-muted-foreground space-y-3">
                <p>
                  Hoe en waar kun je het nieuwe collegejaar beter beginnen dan in inspirerend Amsterdam? In{" "}
                  <strong>week 36 van 31 augustus t/m 4 september 2026</strong> openen meer dan 60 culturele
                  instellingen hun deuren voor alle mbo-studenten in Amsterdam.
                </p>
                <p>
                  Ook deze derde editie van de Culturele INTROWEEK MBO brengt mbo-studenten in contact met de stad door
                  middel van kunst en cultuur. Studenten leren elkaar beter kennen, ontdekken Amsterdam en maken kennis
                  met het brede culturele aanbod van de stad. Laat je inspireren door al het moois dat Amsterdam te
                  bieden heeft.
                </p>
                <p className="italic font-medium text-foreground">
                  "Meer dan 60 culturele instellingen openen hun deuren voor de toekomst van de stad. Cultuur Werkt."
                </p>
                <div className="pt-4 border-t mt-4">
                  <p className="text-xs">
                    <strong>Culturele INTROWEEK MBO 2026</strong> is een initiatief van de Cultuurcoördinatoren van het
                    ROC van Amsterdam, Mediacollege Amsterdam en Hout en Meubileringscollege Amsterdam. De Culturele
                    INTROWEEK MBO 2026 wordt georganiseerd door het Amsterdams Platform Cultuureducatie MBO, Stichting
                    Museumnacht Amsterdam, Museum Vereniging, GVB, MOCCA Expertisecentrum Cultuuronderwijs en CJP.
                  </p>
                  <p className="text-xs mt-2">
                    Veel dank aan alle culturele instellingen van Amsterdam die meedoen met de derde editie van de
                    culturele INTROWEEK MBO voor het openen van hun deuren voor de toekomst van de stad.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle>Stuur ons een bericht</CardTitle>
                <CardDescription>Vul het formulier in en we nemen zo snel mogelijk contact met u op.</CardDescription>
              </CardHeader>
              <CardContent>
                <form
                  className="space-y-4"
                  onSubmit={(e) => {
                    e.preventDefault()
                    const formData = new FormData(e.currentTarget)
                    const email = formData.get("email")
                    const emailConfirm = formData.get("email-confirm")

                    if (email !== emailConfirm) {
                      alert("De e-mailadressen komen niet overeen. Controleer uw invoer.")
                      return
                    }

                    alert("Uw bericht is verzonden naar cultureleintroweek@rocva.nl")
                    e.currentTarget.reset()
                  }}
                >
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">Voornaam *</Label>
                      <Input id="first-name" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="last-name">Achternaam *</Label>
                      <Input id="last-name" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">E-mailadres *</Label>
                    <Input id="email" name="email" type="email" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email-confirm">Bevestig E-mailadres *</Label>
                    <Input id="email-confirm" name="email-confirm" type="email" required />
                    <p className="text-xs text-muted-foreground">
                      Vul uw e-mailadres nogmaals in zodat we zeker weten wie de afzender is
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefoonnummer</Label>
                    <Input id="phone" type="tel" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Onderwerp *</Label>
                    <Select>
                      <SelectTrigger id="subject">
                        <SelectValue placeholder="Selecteer onderwerp" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="institution">Vraag over instellingsregistratie</SelectItem>
                        <SelectItem value="teacher">Vraag over docentenaanmelding</SelectItem>
                        <SelectItem value="program">Vraag over het programma</SelectItem>
                        <SelectItem value="technical">Technische vraag</SelectItem>
                        <SelectItem value="other">Anders</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Bericht *</Label>
                    <Textarea id="message" placeholder="Typ hier uw vraag of opmerking..." rows={6} required />
                  </div>

                  <Button type="submit" className="w-full">
                    Verstuur Bericht
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    Uw bericht wordt automatisch verstuurd naar{" "}
                    <span className="font-medium">cultureleintroweek@rocva.nl</span>
                  </p>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Contactgegevens</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">E-mail</p>
                      <p className="text-sm text-muted-foreground">cultureleintroweek@rocva.nl</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-secondary" />
                    </div>
                    <div>
                      <p className="font-medium">Telefoon</p>
                      <p className="text-sm text-muted-foreground">020 123 4567</p>
                      <p className="text-sm text-muted-foreground">Ma-Vr: 09:00 - 17:00</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <p className="font-medium">Adres</p>
                      <p className="text-sm text-muted-foreground">Culturele IntroWeek MBO</p>
                      <p className="text-sm text-muted-foreground">Postbus 12345</p>
                      <p className="text-sm text-muted-foreground">1000 AB Amsterdam</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-chart-4/10 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-chart-4" />
                    </div>
                    <div>
                      <p className="font-medium">Openingstijden</p>
                      <p className="text-sm text-muted-foreground">Maandag - Vrijdag</p>
                      <p className="text-sm text-muted-foreground">09:00 - 17:00 uur</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Cultuurcoördinatoren per College</CardTitle>
                  <CardDescription>
                    Voor vragen over de Culturele INTROWEEK MBO en Cultuureducatie MBO in het algemeen
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-sm space-y-3">
                    <div>
                      <p className="font-medium">MBO College Almere, Poort & Lelystad</p>
                      <p className="text-muted-foreground text-xs">Jeroen Paape - j.paape@rocvf.nl</p>
                    </div>
                    <div>
                      <p className="font-medium">MBO College Amstelland</p>
                      <p className="text-muted-foreground text-xs">Marieke Kruijssen - m.kruijssen@rocva.nl</p>
                    </div>
                    <div>
                      <p className="font-medium">MBO College Airport</p>
                      <p className="text-muted-foreground text-xs">Jørgen van Waes - j.vanwaes@rocva.nl</p>
                    </div>
                    <div>
                      <p className="font-medium">MBO College Centrum</p>
                      <p className="text-muted-foreground text-xs">Claudia van den Bos - c.vandenbos@rocva.nl</p>
                    </div>
                    <div>
                      <p className="font-medium">MBO College Hilversum</p>
                      <p className="text-muted-foreground text-xs">(Nog niet bekend)</p>
                    </div>
                    <div>
                      <p className="font-medium">Mediacollege Amsterdam</p>
                      <p className="text-muted-foreground text-xs">Ernst Herstel - e.herstel@ma-web.nl</p>
                    </div>
                    <div>
                      <p className="font-medium">MBO College Noord</p>
                      <p className="text-muted-foreground text-xs">Edwin Erich - e.erich@rocva.nl</p>
                    </div>
                    <div>
                      <p className="font-medium">MBO College West</p>
                      <p className="text-muted-foreground text-xs">Jillis Slingerland - j.slingerland@rocva.nl</p>
                    </div>
                    <div>
                      <p className="font-medium">MBO College Westpoort</p>
                      <p className="text-muted-foreground text-xs">Sevim Cecen - s.cecen@rocva.nl</p>
                    </div>
                    <div>
                      <p className="font-medium">MBO College Zuid</p>
                      <p className="text-muted-foreground text-xs">
                        Frie Trustfull - f.strustfull@rocva.nl
                        <br />& Lotte Bant - l.bant@rocva.nl
                      </p>
                    </div>
                    <div>
                      <p className="font-medium">MBO College Zuidoost</p>
                      <p className="text-muted-foreground text-xs">
                        Charita Zandgrond - c.zandgrond@rocva.nl
                        <br />& Lieke Koningen - l.koningen@rocva.nl
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10">
                <CardContent className="pt-6 space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Social Media</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Volg ons en gebruik de hashtag <span className="font-medium">#CultureleINTROWEEKMBO</span>
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Persberichten</h3>
                    <Button variant="outline" size="sm" className="w-full bg-transparent">
                      Download Persbericht (PDF)
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
