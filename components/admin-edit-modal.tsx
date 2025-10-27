"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import type { Institution, Teacher } from "@/lib/admin-store"

interface EditInstitutionModalProps {
  institution: Institution | null
  open: boolean
  onClose: () => void
  onSave: (id: string, updates: Partial<Institution>) => void
}

export function EditInstitutionModal({ institution, open, onClose, onSave }: EditInstitutionModalProps) {
  const [formData, setFormData] = useState<Partial<Institution>>(institution || {})

  if (!institution) return null

  const handleSave = () => {
    onSave(institution.id, formData)
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Instelling Bewerken</DialogTitle>
          <DialogDescription>Wijzig de gegevens van {institution.name}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="edit-name">Naam Instelling</Label>
            <Input
              id="edit-name"
              value={formData.name || ""}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-email">E-mailadres</Label>
            <Input
              id="edit-email"
              type="email"
              value={formData.email || ""}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-phone">Telefoonnummer</Label>
            <Input
              id="edit-phone"
              value={formData.phone || ""}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-address">Bezoekadres</Label>
            <Input
              id="edit-address"
              value={formData.visitAddress || ""}
              onChange={(e) => setFormData({ ...formData, visitAddress: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-description">Beschrijving</Label>
            <Textarea
              id="edit-description"
              value={formData.description || ""}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-capacity">Capaciteit</Label>
            <Input
              id="edit-capacity"
              type="number"
              value={formData.capacity || 0}
              onChange={(e) => setFormData({ ...formData, capacity: Number.parseInt(e.target.value) })}
            />
          </div>

          <div className="flex gap-2 justify-end pt-4">
            <Button variant="outline" onClick={onClose}>
              Annuleren
            </Button>
            <Button onClick={handleSave}>Opslaan</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

interface EditTeacherModalProps {
  teacher: Teacher | null
  open: boolean
  onClose: () => void
  onSave: (id: string, updates: Partial<Teacher>) => void
}

export function EditTeacherModal({ teacher, open, onClose, onSave }: EditTeacherModalProps) {
  const [formData, setFormData] = useState<Partial<Teacher>>(teacher || {})

  if (!teacher) return null

  const handleSave = () => {
    onSave(teacher.id, formData)
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Docent Bewerken</DialogTitle>
          <DialogDescription>Wijzig de gegevens van {teacher.name}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="edit-teacher-name">Naam</Label>
            <Input
              id="edit-teacher-name"
              value={formData.name || ""}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-teacher-email">E-mailadres</Label>
            <Input
              id="edit-teacher-email"
              type="email"
              value={formData.email || ""}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-school">School</Label>
            <Input
              id="edit-school"
              value={formData.school || ""}
              onChange={(e) => setFormData({ ...formData, school: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-class">Klas</Label>
            <Input
              id="edit-class"
              value={formData.className || ""}
              onChange={(e) => setFormData({ ...formData, className: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-students">Aantal Studenten</Label>
            <Input
              id="edit-students"
              type="number"
              value={formData.numberOfStudents || 0}
              onChange={(e) => setFormData({ ...formData, numberOfStudents: Number.parseInt(e.target.value) })}
            />
          </div>

          <div className="flex gap-2 justify-end pt-4">
            <Button variant="outline" onClick={onClose}>
              Annuleren
            </Button>
            <Button onClick={handleSave}>Opslaan</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
