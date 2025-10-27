"use client"

import type React from "react"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { KeyRound, AlertCircle, CheckCircle2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      // Mock password reset - in production, this would call an API
      if (email.includes("@rocva.nl")) {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setSuccess(true)
      } else {
        setError("Alleen @rocva.nl e-mailadressen zijn toegestaan")
      }
    } catch (err) {
      setError("Er is een fout opgetreden. Probeer het opnieuw.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1 py-12 md:py-16 flex items-center justify-center relative overflow-hidden">
        <div className="absolute top-20 right-10 w-24 h-24 opacity-5">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot_16-10-2025_115235_-paSFaaxtwh9WKSrsqOvRbOWkdbHjMy.jpeg"
            alt=""
            fill
            className="object-contain"
          />
        </div>

        <div className="container mx-auto px-4 max-w-md relative z-10">
          <Card className="shadow-xl">
            <CardHeader className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4 mx-auto">
                <KeyRound className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">Wachtwoord vergeten</CardTitle>
              <CardDescription>Voer je e-mailadres in om je wachtwoord te resetten</CardDescription>
            </CardHeader>
            <CardContent>
              {success ? (
                <Alert className="mb-6">
                  <CheckCircle2 className="h-4 w-4" />
                  <AlertDescription>Een reset link is verzonden naar {email}. Controleer je inbox.</AlertDescription>
                </Alert>
              ) : (
                <Alert className="mb-6">
                  <AlertDescription className="text-sm">
                    Je ontvangt een e-mail met instructies om je wachtwoord opnieuw in te stellen.
                  </AlertDescription>
                </Alert>
              )}

              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {!success && (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">E-mailadres</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="admin@rocva.nl"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Verzenden..." : "Reset link versturen"}
                  </Button>

                  <div className="text-center">
                    <Link href="/admin/login">
                      <Button variant="link" className="text-sm">
                        Terug naar inloggen
                      </Button>
                    </Link>
                  </div>
                </form>
              )}

              {success && (
                <div className="text-center">
                  <Link href="/admin/login">
                    <Button className="w-full">Terug naar inloggen</Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
