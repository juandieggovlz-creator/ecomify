"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { motion, AnimatePresence } from "framer-motion"
import { 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Navigation, 
  Plus, 
  ShoppingCart, 
  CheckCircle2,
  Loader2,
  Minus,
  Home,
  ChevronDown,
  AlertTriangle,
  ShieldCheck
} from "lucide-react"
import { CONFIG, DEPARTMENTS } from "@/config/store"
import { cn } from "@/lib/utils"

const formSchema = z.object({
  firstName: z.string().min(2, "Nombre es obligatorio"),
  lastName: z.string().min(2, "Apellido es obligatorio"),
  phone: z.string().min(10, "Mínimo 10 dígitos").regex(/^\d+$/, "Solo números"),
  email: z.string().email("Correo inválido").optional().or(z.literal("")),
  department: z.string().min(1, "Selecciona un departamento"),
  city: z.string().min(1, "Selecciona una ciudad"),
  address: z.string().min(5, "Dirección es obligatoria"),
  reference: z.string().min(10, "Danos una referencia detallada (mín. 10 caracteres)"),
  complement: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

export default function OrderForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [cities, setCities] = useState<string[]>([])

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      department: "",
      city: "",
    }
  })

  const selectedDept = watch("department")

  useEffect(() => {
    if (selectedDept) {
      setCities(DEPARTMENTS[selectedDept as keyof typeof DEPARTMENTS] || [])
      setValue("city", "")
    }
  }, [selectedDept, setValue])

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true)
    try {
      const response = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, quantity }),
      })

      if (response.ok) {
        setIsSuccess(true)
        window.scrollTo({ top: document.getElementById('order-form')?.offsetTop || 0, behavior: 'smooth' })
      } else {
        alert("Error al procesar el pedido.")
      }
    } catch (error) {
      alert("Error de conexión.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="py-24 flex flex-col items-center justify-center text-center px-4 bg-background transition-colors duration-300">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mb-8"
        >
          <CheckCircle2 className="w-12 h-12 text-primary" />
        </motion.div>
        <h2 className="text-4xl font-black text-foreground mb-4 tracking-tight uppercase">¡PEDIDO CONFIRMADO!</h2>
        <p className="text-muted max-w-md mx-auto mb-10 text-lg leading-relaxed">
          Gracias por tu compra. Un asesor te contactará en los próximos minutos vía <strong className="text-foreground">WhatsApp</strong> para confirmar el despacho.
        </p>
        <div className="bg-surface p-6 rounded-3xl border border-border mb-10 w-full max-w-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted">Tiempo estimado:</span>
            <span className="text-sm font-black text-primary uppercase">2-5 días hábiles</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted">Envío:</span>
            <span className="text-sm font-black text-foreground uppercase tracking-widest">GRATIS</span>
          </div>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="px-10 py-4 bg-primary text-black font-black rounded-2xl hover:bg-primary-dark transition-all shadow-xl shadow-primary/20"
        >
          Volver a la tienda
        </button>
      </div>
    )
  }

  return (
    <section id="order-form" className="py-24 bg-background transition-colors duration-300">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-card rounded-[3rem] p-8 lg:p-12 shadow-2xl border border-border relative overflow-hidden">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-foreground tracking-tight mb-2 uppercase italic">🛒 Crear Orden</h2>
            <p className="text-muted font-medium">Completa tus datos y paga solo al recibir</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Info Personal */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-4">
                <User className="w-3 h-3" />
                Información Personal
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                    <input
                      {...register("firstName")}
                      placeholder="Nombres *"
                      className={cn(
                        "w-full pl-12 pr-4 py-4 rounded-2xl border bg-surface transition-all outline-none text-base font-medium",
                        errors.firstName ? "border-danger ring-1 ring-danger" : "border-border focus:border-primary"
                      )}
                    />
                  </div>
                  {errors.firstName && <p className="text-danger text-[10px] font-bold uppercase tracking-wider ml-2">{errors.firstName.message}</p>}
                </div>
                <div className="space-y-2">
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                    <input
                      {...register("lastName")}
                      placeholder="Apellidos *"
                      className={cn(
                        "w-full pl-12 pr-4 py-4 rounded-2xl border bg-surface transition-all outline-none text-base font-medium",
                        errors.lastName ? "border-danger ring-1 ring-danger" : "border-border focus:border-primary"
                      )}
                    />
                  </div>
                  {errors.lastName && <p className="text-danger text-[10px] font-bold uppercase tracking-wider ml-2">{errors.lastName.message}</p>}
                </div>
              </div>
            </div>

            {/* Contacto */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-4">
                <Phone className="w-3 h-3" />
                Contacto
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <div className="bg-surface border border-border rounded-2xl px-4 py-4 flex items-center gap-2 text-sm font-black text-foreground shrink-0">
                      🇨🇴 +57
                    </div>
                    <div className="relative flex-1">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                      <input
                        {...register("phone")}
                        placeholder="Celular *"
                        className={cn(
                          "w-full pl-12 pr-4 py-4 rounded-2xl border bg-surface transition-all outline-none text-base font-medium",
                          errors.phone ? "border-danger ring-1 ring-danger" : "border-border focus:border-primary"
                        )}
                      />
                    </div>
                  </div>
                  {errors.phone && <p className="text-danger text-[10px] font-bold uppercase tracking-wider ml-2">{errors.phone.message}</p>}
                </div>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                  <input
                    {...register("email")}
                    placeholder="Email (Opcional)"
                    className="w-full pl-12 pr-4 py-4 rounded-2xl border border-border bg-surface focus:border-primary transition-all outline-none text-base font-medium"
                  />
                </div>
              </div>
            </div>

            {/* Ubicación */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-4">
                <MapPin className="w-3 h-3" />
                Ubicación
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted pointer-events-none" />
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none" />
                    <select
                      {...register("department")}
                      className={cn(
                        "w-full pl-12 pr-10 py-4 rounded-2xl border bg-surface transition-all outline-none appearance-none text-base font-medium text-foreground",
                        errors.department ? "border-danger ring-1 ring-danger" : "border-border focus:border-primary"
                      )}
                    >
                      <option value="" className="text-black">Departamento *</option>
                      {Object.keys(DEPARTMENTS).sort().map(dep => (
                        <option key={dep} value={dep} className="text-black">{dep}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="relative">
                    <Navigation className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted pointer-events-none" />
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none" />
                    <select
                      {...register("city")}
                      disabled={!selectedDept}
                      className={cn(
                        "w-full pl-12 pr-10 py-4 rounded-2xl border bg-surface transition-all outline-none appearance-none text-base font-medium text-foreground",
                        errors.city ? "border-danger ring-1 ring-danger" : "border-border focus:border-primary",
                        !selectedDept && "opacity-50 grayscale"
                      )}
                    >
                      <option value="" className="text-black">{selectedDept ? "Seleccionar..." : "Primero el depto."}</option>
                      {cities.map(city => <option key={city} value={city} className="text-black">{city}</option>)}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Dirección */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-4">
                <Home className="w-3 h-3" />
                Dirección de Entrega
              </div>
              <div className="space-y-4">
                <div className="relative">
                  <Home className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                  <input
                    {...register("address")}
                    placeholder="Dirección principal (Calle, Nro, Barrio) *"
                    className={cn(
                      "w-full pl-12 pr-4 py-4 rounded-2xl border bg-surface transition-all outline-none text-base font-medium",
                      errors.address ? "border-danger ring-1 ring-danger" : "border-border focus:border-primary"
                    )}
                  />
                </div>
                
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
                  <input
                    {...register("reference")}
                    placeholder="Punto de referencia (Frente al parque, casa blanca, etc) *"
                    className={cn(
                      "w-full pl-12 pr-4 py-4 rounded-2xl border bg-surface transition-all outline-none text-base font-medium border-primary/20 focus:border-primary",
                      errors.reference && "border-danger ring-1 ring-danger"
                    )}
                  />
                  {errors.reference && <p className="text-danger text-[10px] font-bold uppercase tracking-wider ml-2 mt-1">{errors.reference.message}</p>}
                </div>

                <div className="relative">
                  <Plus className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                  <input
                    {...register("complement")}
                    placeholder="Apartamento, Oficina, Bloque (Opcional)"
                    className="w-full pl-12 pr-4 py-4 rounded-2xl border border-border bg-surface focus:border-primary transition-all outline-none text-base font-medium"
                  />
                </div>
              </div>
            </div>

            {/* Cantidad y Precio */}
            <div className="bg-surface/50 p-6 rounded-3xl border-2 border-dashed border-border flex flex-col sm:flex-row items-center justify-between gap-6 mt-8">
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-black text-muted uppercase tracking-[0.2em]">Cantidad</span>
                <div className="flex items-center gap-6">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 flex items-center justify-center rounded-xl bg-background border border-border hover:bg-surface transition-all text-foreground"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <span className="text-2xl font-black w-8 text-center text-foreground">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 flex items-center justify-center rounded-xl bg-primary/10 border border-primary/30 hover:bg-primary/20 transition-all text-primary"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="text-center sm:text-right">
                <span className="text-[10px] font-black text-muted uppercase tracking-[0.2em]">Total a pagar</span>
                <p className="text-4xl font-black text-primary tracking-tighter">
                  ${(CONFIG.productPrice * quantity).toLocaleString('es-CO')}
                </p>
                <div className="flex items-center gap-1.5 justify-center sm:justify-end mt-1">
                   <ShieldCheck className="w-3 h-3 text-secondary" />
                   <span className="text-[10px] font-bold text-secondary uppercase">Pago Seguro al Recibir</span>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-8 bg-primary text-black text-2xl font-black rounded-[2rem] shadow-[0_20px_50px_-15px_rgba(0,255,136,0.6)] hover:bg-primary-dark hover:translate-y-[-4px] transition-all flex items-center justify-center gap-4 active:scale-95 disabled:opacity-70 disabled:translate-y-0 uppercase tracking-tighter italic"
            >
              {isSubmitting ? (
                <Loader2 className="w-7 h-7 animate-spin" />
              ) : (
                <>
                  ✅ Confirmar Pedido Contra Entrega
                </>
              )}
            </button>
            
            <div className="flex items-center justify-center gap-8 text-[10px] font-black text-muted uppercase tracking-widest pt-4">
              <span className="flex items-center gap-2"><ShoppingCart className="w-3 h-3" /> Sin riesgo</span>
              <span className="flex items-center gap-2"><ShieldCheck className="w-3 h-3" /> Garantía</span>
              <span className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3" /> Verificado</span>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
