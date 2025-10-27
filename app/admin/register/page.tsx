"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { UserPlus, AlertCircle, CheckCircle2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAdminStore } from "@/lib/admin-store"

export default function AdminRegisterPage() {
  const router = useRouter()
  const register = useAdminStore((state) => state.register)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    emailConfirm: "",
    password: "",
    passwordConfirm: "",
    role: "",
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const validateForm = () => {
    if (formData.email !== formData.emailConfirm) {
      setError("E-mailadressen komen niet overeen")
      return false
    }
    if (formData.password !== formData.passwordConfirm) {
      setError("Wachtwoorden komen niet overeen")
      return false
    }
    if (formData.password.length < 8) {
      setError("Wachtwoord moet minimaal 8 tekens bevatten")
      return false
    }
    if (!formData.email.includes("@rocva.nl")) {
      setError("Alleen @rocva.nl e-mailadressen zijn toegestaan")
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!validateForm()) return

    setLoading(true)
    try {
      const success = await register(formData.email, formData.password, formData.name)
      if (success) {
        router.push("/admin/dashboard")
      } else {
        setError("Registratie mislukt. Probeer het opnieuw.")
      }
    } catch (err) {
      setError("Er is een fout opgetreden. Probeer het opnieuw.")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1 py-12 md:py-16 flex items-center justify-center relative overflow-hidden">
        <div className="absolute top-20 left-10 w-24 h-24 opacity-5">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot_16-10-2025_11533_-DALNMVQcHT1CSkf6coL7XtWbTzcS6O.jpeg"
            alt=""
            fill
            className="object-contain"
          />
        </div>

        <div className="container mx-auto px-4 max-w-md relative z-10">
          <Card className="shadow-xl">
            <CardHeader className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4 mx-auto">
                <UserPlus className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">Admin Registratie</CardTitle>
              <CardDescription>Maak een nieuw beheerdersaccount aan</CardDescription>
            </CardHeader>
            <CardContent>
              <Alert className="mb-6">
                <CheckCircle2 className="h-4 w-4" />
                <AlertDescription className="text-sm">
                  Nieuwe admin accounts moeten worden goedgekeurd door een bestaande beheerder.
                </AlertDescription>
              </Alert>

              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Volledige naam</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Jan Jansen"
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">E-mailadres</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@rocva.nl"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email-confirm">Bevestig e-mailadres</Label>
                  <Input
                    id="email-confirm"
                    type="email"
                    placeholder="admin@rocva.nl"
                    value={formData.emailConfirm}
                    onChange={(e) => handleChange("emailConfirm", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Wachtwoord</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => handleChange("password", e.target.value)}
                    required
                  />
                  <p className="text-xs text-muted-foreground">Minimaal 8 tekens, inclusief hoofdletters en cijfers</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password-confirm">Bevestig wachtwoord</Label>
                  <Input
                    id="password-confirm"
                    type="password"
                    placeholder="••••••••"
                    value={formData.passwordConfirm}
                    onChange={(e) => handleChange("passwordConfirm", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">Rol</Label>
                  <Input
                    id="role"
                    type="text"
                    placeholder="Cultuurcoördinator"
                    value={formData.role}
                    onChange={(e) => handleChange("role", e.target.value)}
                    required
                  />
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Registreren..." : "Registreren"}
                </Button>

                <div className="text-center">
                  <Link href="/admin/login">
                    <Button variant="link" className="text-sm">
                      Al een account? Log hier in
                    </Button>
                  </Link>
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
