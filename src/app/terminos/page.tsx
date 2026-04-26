import Navbar from "@/components/Navbar"
import { CONFIG } from "@/config/store"

export default function TerminosPage() {
  return (
    <main className="min-h-screen bg-background text-foreground pt-32 pb-20">
      <Navbar />
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-3xl md:text-5xl font-black mb-8 text-primary">Términos y Condiciones</h1>
        
        <div className="prose prose-invert prose-orange max-w-none space-y-6 text-muted-foreground leading-relaxed">
          <p>
            Al acceder y realizar un pedido en <strong>{CONFIG.storeName}</strong>, aceptas los siguientes términos:
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Información general</h2>
          <p>
            {CONFIG.storeName} es una tienda online dedicada a la comercialización de productos para el hogar, tecnología y uso cotidiano mediante la modalidad de pago contra entrega.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Pedidos</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Todos los pedidos están sujetos a confirmación telefónica o por WhatsApp</li>
            <li>Nos reservamos el derecho de cancelar pedidos sospechosos o incompletos</li>
            <li>El cliente debe proporcionar información verídica y correcta</li>
          </ul>

          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Envíos</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Realizamos envíos a nivel nacional según cobertura del operador logístico</li>
            <li>El tiempo de entrega puede variar entre 2 a 7 días hábiles</li>
            <li>El envío es totalmente gratis a cualquier destino a nivel nacional</li>
          </ul>

          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Pago contra entrega</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>El pago se realiza únicamente al momento de recibir el producto</li>
            <li>El cliente debe contar con el valor exacto o disponible al momento de la entrega</li>
            <li>Si el cliente rechaza el pedido sin justificación, puede restringirse futuros pedidos</li>
          </ul>

          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Garantía</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Los productos cuentan con garantía por defectos de fabricación</li>
            <li>El cliente debe reportar cualquier inconveniente dentro de las primeras 24 horas después de recibir el producto</li>
            <li>La garantía no cubre daños por mal uso</li>
          </ul>

          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Cambios y devoluciones</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Solo aplican en caso de producto defectuoso o incorrecto</li>
            <li>El producto debe estar en las mismas condiciones de entrega</li>
            <li>Nuestro equipo coordinará el proceso correspondiente</li>
          </ul>

          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Modificaciones</h2>
          <p>
            Nos reservamos el derecho de actualizar estos términos y condiciones en cualquier momento sin previo aviso.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Contacto</h2>
          <p>
            Para cualquier consulta puedes comunicarte a través de nuestro canal oficial de atención al cliente.
          </p>
        </div>
      </div>
    </main>
  )
}
