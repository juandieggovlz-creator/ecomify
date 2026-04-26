"use client"

import { motion } from "framer-motion"
import { XCircle, CheckCircle2, AlertCircle } from "lucide-react"

export default function ProblemSolutionSection() {
  return (
    <section className="py-24 bg-background transition-colors duration-300 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black text-foreground sm:text-4xl lg:text-5xl tracking-tight mb-4 uppercase">
            ¿Enchufes imposibles de alcanzar?
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            Mover los muebles para conectar un cargador es cosa del pasado.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 max-w-5xl mx-auto">
          {/* Problem */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex-1 bg-danger/5 p-8 lg:p-12 rounded-[2.5rem] border border-danger/10"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-danger/20 rounded-2xl flex items-center justify-center text-danger">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-black text-danger uppercase tracking-wider">Sin FlexiPlug</h3>
            </div>
            <ul className="space-y-5">
              {[
                "Tienes que mover el sofá cada vez que vas a cargar.",
                "Cables doblados y dañados por la presión del mueble.",
                "Enchufes muertos que no puedes usar por falta de espacio.",
                "Peligro de cortocircuito por cables apretados.",
                "Desorden visual de cables por toda la pared."
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4 text-muted lg:text-lg">
                  <XCircle className="w-6 h-6 text-danger shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Solution */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex-1 bg-primary/5 p-8 lg:p-12 rounded-[2.5rem] border border-primary/20 shadow-2xl shadow-primary/5"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center text-primary">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-black text-primary uppercase tracking-wider">Con FlexiPlug</h3>
            </div>
            <ul className="space-y-5">
              {[
                "Llega a cualquier enchufe extendiendo el brazo.",
                "Gira 180° para que el cable salga hacia donde lo necesites.",
                "Usa 4 dispositivos (2 CA + 2 USB) desde un solo punto.",
                "Diseño ultra plano que cabe en espacios de 1 pulgada.",
                "Instalación firme que protege tus paredes y cables."
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4 text-foreground lg:text-lg font-medium">
                  <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
