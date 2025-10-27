import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Video, ImageIcon, Download } from "lucide-react"

export default function ResourcesPage() {
  const resources = [
    {
      category: "Evaluaties",
      icon: FileText,
      items: [
        { title: "Evaluatierapport 2025", type: "PDF", size: "2.4 MB" },
        { title: "Feedback Studenten 2025", type: "PDF", size: "1.8 MB" },
        { title: "Analyse Deelname", type: "PDF", size: "3.1 MB" },
      ],
    },
    {
      category: "Video's",
      icon: Video,
      items: [
        { title: "IntroWeek 2025 Aftermovie", type: "MP4", size: "45 MB" },
        { title: "Impressie Workshops", type: "MP4", size: "28 MB" },
        { title: "Interviews Studenten", type: "MP4", size: "32 MB" },
      ],
    },
    {
      category: "Foto's",
      icon: ImageIcon,
      items: [
        { title: "Fotogalerij 2025 (ZIP)", type: "ZIP", size: "156 MB" },
        { title: "Highlights Dag 1-3", type: "ZIP", size: "89 MB" },
        { title: "Highlights Dag 4-5", type: "ZIP", size: "92 MB" },
      ],
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1 py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Resources & Materialen</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Download evaluaties, bekijk foto's en video's van vorige edities van de Culturele IntroWeek MBO.
            </p>
          </div>

          {/* Resources Grid */}
          <div className="space-y-8">
            {resources.map((resource) => (
              <Card key={resource.category}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <resource.icon className="w-5 h-5 text-primary" />
                    </div>
                    <CardTitle>{resource.category}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {resource.items.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded bg-muted flex items-center justify-center">
                            <span className="text-xs font-mono font-semibold text-muted-foreground">{item.type}</span>
                          </div>
                          <div>
                            <p className="font-medium">{item.title}</p>
                            <p className="text-sm text-muted-foreground">{item.size}</p>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Info Card */}
          <Card className="mt-12 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <h3 className="text-xl font-semibold">Materialen voor 2026</h3>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Nieuwe evaluaties, foto's en video's van de IntroWeek 2026 worden na afloop van het evenement
                  (september 2026) beschikbaar gesteld op deze pagina.
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
