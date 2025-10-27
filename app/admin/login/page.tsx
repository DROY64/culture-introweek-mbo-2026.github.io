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
import { Lock, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Image from "next/image"
import Link from "next/link"
import { useAdminStore } from "@/lib/admin-store"

export default function AdminLoginPage() {
  const router = useRouter()
  const login = useAdminStore((state) => state.login)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const success = await login(email, password)
      if (success) {
        router.push("/admin/dashboard")
      } else {
        setError("Ongeldige inloggegevens. Controleer uw e-mailadres en wachtwoord.")
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
        <div className="absolute top-20 left-10 w-24 h-24 opacity-5">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot_16-10-2025_115235_-paSFaaxtwh9WKSrsqOvRbOWkdbHjMy.jpeg"
            alt=""
            fill
            className="object-contain"
          />
        </div>
        <div className="absolute bottom-20 right-10 w-24 h-24 opacity-5">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot_16-10-2025_115318_-7CM2VlvWsZMty0TTLZWqOfY7BwNMFp.jpeg"
            alt=""
            fill
            className="object-contain"
          />
        </div>

        <div className="container mx-auto px-4 max-w-md relative z-10">
          <Card className="shadow-xl">
            <CardHeader className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4 mx-auto">
                <Lock className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">Admin Inloggen</CardTitle>
              <CardDescription>Log in om toegang te krijgen tot het beheerportaal</CardDescription>
            </CardHeader>
            <CardContent>
              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

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

                <div className="space-y-2">
                  <Label htmlFor="password">Wachtwoord</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Inloggen..." : "Inloggen"}
                </Button>

                <div className="flex flex-col gap-2 text-center">
                  <Link href="/admin/forgot-password">
                    <Button variant="link" className="text-sm">
                      Wachtwoord vergeten?
                    </Button>
                  </Link>
                  <Link href="/admin/register">
                    <Button variant="link" className="text-sm">
                      Nog geen account? Registreer hier
                    </Button>
                  </Link>
                </div>
              </form>

              <div className="mt-6 pt-6 border-t">
                <p className="text-sm text-muted-foreground text-center">
                  Alleen geautoriseerde beheerders hebben toegang tot dit portaal.
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
