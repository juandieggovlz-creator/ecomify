import Navbar from "@/components/Navbar"
import HeroSection from "@/components/HeroSection"
import dynamic from "next/dynamic"
import { CONFIG } from "@/config/store"
import { Zap, ShieldCheck, Truck, Clock } from "lucide-react"

const ProblemSolutionSection = dynamic(() => import("@/components/ProblemSolutionSection"))
const BenefitsSection = dynamic(() => import("@/components/BenefitsSection"))
const VideoSection = dynamic(() => import("@/components/VideoSection"))
const TestimonialsSection = dynamic(() => import("@/components/TestimonialsSection"))
const UrgencySection = dynamic(() => import("@/components/UrgencySection"))
const OrderForm = dynamic(() => import("@/components/OrderForm"))
const FeatureScrollSection = dynamic(() => import("@/components/FeatureScrollSection"))
const WhatsAppButton = dynamic(() => import("@/components/WhatsAppButton"))

function TrustBar() {
  const items = [
    { icon: Truck, title: "Envío Gratis", sub: "A todo Colombia" },
    { icon: ShieldCheck, title: "Pago Seguro", sub: "Contra Entrega" },
    { icon: Clock, title: "Entrega Rápida", sub: "2-5 días hábiles" },
    { icon: Zap, title: "Garantía Total", sub: "12 Meses" },
  ]
  return (
    <div className="bg-surface/50 border-y border-border transition-colors duration-300">
      <div className="container mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-8">
        {items.map((item, i) => (
          <div key={i} className="flex flex-col items-center text-center gap-2">
            <item.icon className="w-6 h-6 text-primary" />
            <div className="text-sm font-black text-foreground uppercase tracking-tight">{item.title}</div>
            <div className="text-[10px] font-bold text-muted uppercase tracking-widest">{item.sub}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function Footer() {
  const waLink = `https://wa.me/${CONFIG.waNumber}?text=${encodeURIComponent(CONFIG.waMessage)}`
  return (
    <footer className="py-20 bg-background border-t border-border transition-colors duration-300">
      <div className="container mx-auto px-4 text-center">
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-16 h-16 overflow-hidden rounded-xl flex items-center justify-center bg-transparent">
            <img src="/images/Logo Ecomify.jpeg" alt="Logo" className="w-full h-full object-contain" />
          </div>
          <span className="text-2xl font-black tracking-tighter uppercase text-foreground">
            {CONFIG.storeName}
          </span>
        </div>
        <p className="text-muted text-sm max-w-md mx-auto mb-10 leading-relaxed font-medium">
          Venta directa con pago contra entrega. 
          Envío gratis a todo Colombia sin mínimo de compra.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
           <a href={waLink} target="_blank" rel="noopener noreferrer" className="text-secondary font-black text-sm uppercase tracking-widest flex items-center gap-2 hover:opacity-80 transition-opacity">
              Soporte WhatsApp
           </a>
           <span className="hidden sm:block text-border">|</span>
           <a href="/privacidad" className="text-muted text-xs uppercase tracking-[0.2em] hover:text-primary transition-colors">Políticas de Privacidad</a>
           <span className="hidden sm:block text-border">|</span>
           <a href="/terminos" className="text-muted text-xs uppercase tracking-[0.2em] hover:text-primary transition-colors">Términos de Servicio</a>
        </div>
        <p className="text-muted/50 text-[10px] font-bold uppercase tracking-[0.3em]">
          © 2025 {CONFIG.storeName}

        </p>
      </div>
    </footer>
  )
}

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Navbar />
      <HeroSection />
      <TrustBar />
      <FeatureScrollSection />
      <ProblemSolutionSection />
      <BenefitsSection />
      <VideoSection />
      <TestimonialsSection />
      <UrgencySection />
      <div className="bg-surface/30">
        <OrderForm />
      </div>
      <Footer />
      <WhatsAppButton />
    </main>
  )
}
