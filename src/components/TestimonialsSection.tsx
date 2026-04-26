"use client"

import { motion } from "framer-motion"
import { Star, CheckCircle } from "lucide-react"
import Image from "next/image"

const testimonials = [
  {
    n: "Valentina M.",
    city: "Medellín",
    stars: 5,
    avatar: "https://i.pravatar.cc/150?u=valentina",
    txt: "Tenía solo 2 enchufes en mi oficina. Ahora cargo el PC, el celular, la lámpara y la cámara al mismo tiempo. Llegó en 3 días. Perfecto."
  },
  {
    n: "Carlos R.",
    city: "Bogotá",
    stars: 5,
    avatar: "https://i.pravatar.cc/150?u=carlos",
    txt: "Lo pedí con algo de desconfianza por ser contra entrega. Llegó rápido y funciona exactamente como dice. Ya compré otro para la sala."
  },
  {
    n: "Paola G.",
    city: "Cali",
    stars: 5,
    avatar: "https://i.pravatar.cc/150?u=paola",
    txt: "El USB-C carga mi MacBook. No lo creía posible a ese precio. Ya lo recomendé a toda mi familia y todas están contentas."
  },
  {
    n: "Jhon E.",
    city: "Barranquilla",
    stars: 5,
    avatar: "https://i.pravatar.cc/150?u=jhon",
    txt: "Lo instalé en mi estudio de música. 6 equipos conectados sin problema. La protección contra sobretensiones me da mucha tranquilidad."
  },
  {
    n: "Diana T.",
    city: "Bucaramanga",
    stars: 5,
    avatar: "https://i.pravatar.cc/150?u=diana",
    txt: "Muy buen producto. El PowerHub cumple todo lo que promete. La protección eléctrica es lo mejor para los bajones de luz."
  },
  {
    n: "Andrés P.",
    city: "Pereira",
    stars: 5,
    avatar: "https://i.pravatar.cc/150?u=andres",
    txt: "PC, dos monitores, cargador del celular y la lámpara. Todo conectado sin ningún problema. Diseño elegante en el escritorio."
  }
]

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-surface/30 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black text-foreground sm:text-4xl lg:text-5xl tracking-tight mb-4">
            Lo que dicen nuestros clientes
          </h2>
          <div className="flex flex-col items-center gap-2">
            <div className="text-5xl font-black text-primary tracking-tighter">4.8</div>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-accent text-accent" />
              ))}
            </div>
            <p className="text-muted text-sm font-bold uppercase tracking-widest mt-2">
              +1,247 pedidos verificados en Colombia
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-card p-8 rounded-3xl border border-border shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(r.stars)].map((_, j) => (
                  <Star key={j} className="w-3 h-3 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-foreground leading-relaxed mb-8 italic">
                "{r.txt}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary/20 relative">
                  <Image
                    src={r.avatar}
                    alt={r.n}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-foreground text-sm">{r.n}</h4>
                  <div className="flex items-center gap-1.5 text-muted text-[10px] font-bold uppercase tracking-wider">
                    <CheckCircle className="w-3 h-3 text-primary" />
                    {r.city} • Compra Verificada
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
