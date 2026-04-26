"use client"

import { motion } from "framer-motion"
import { MoveHorizontal, RotateCw, Zap, ShieldCheck, Home, LayoutGrid } from "lucide-react"

const benefits = [
  {
    icon: MoveHorizontal,
    title: "Extensión Ajustable",
    description: "Se extiende de 40cm a 60cm para llegar a enchufes escondidos detrás de cualquier mueble."
  },
  {
    icon: RotateCw,
    title: "Rotación 180°",
    description: "Gira la base en cualquier dirección. Colócalo vertical, horizontal o diagonalmente."
  },
  {
    icon: LayoutGrid,
    title: "4 Puertos en 1",
    description: "Incluye 2 salidas CA, 1 puerto USB-A y 1 puerto USB-C para cargar todo a la vez."
  },
  {
    icon: ShieldCheck,
    title: "Instalación Limpia",
    description: "Fíjalo firmemente a la pared sin herramientas, sin manchas y sin daños permanentes."
  },
  {
    icon: Home,
    title: "Diseño de Cable Oculto",
    description: "Mantiene tu escritorio o mesita de noche limpia, ocultando el cableado innecesario."
  },
  {
    icon: Zap,
    title: "Multiusos",
    description: "Ideal para sofás, camas, escritorios y gabinetes de difícil acceso en el hogar u oficina."
  }
]

export default function BenefitsSection() {
  return (
    <section className="py-24 bg-background transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black text-foreground sm:text-4xl lg:text-5xl tracking-tight mb-4 uppercase">
            Características de Alto Rendimiento
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            Solución inteligente para enchufes mal ubicados.
          </p>
        </div>
 
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-surface p-8 rounded-[2rem] border border-border hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 group"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
                <benefit.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-black text-foreground mb-3 tracking-tight">
                {benefit.title}
              </h3>
              <p className="text-muted leading-relaxed text-sm">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
