import Navbar from "@/components/Navbar"
import { CONFIG } from "@/config/store"

export default function PrivacidadPage() {
  return (
    <main className="min-h-screen bg-background text-foreground pt-32 pb-20">
      <Navbar />
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-3xl md:text-5xl font-black mb-8 text-primary">Política de Privacidad</h1>
        
        <div className="prose prose-invert prose-orange max-w-none space-y-6 text-muted-foreground leading-relaxed">
          <p>
            En <strong>{CONFIG.storeName}</strong> valoramos la privacidad de nuestros clientes y nos comprometemos a proteger su información personal. Esta política describe cómo recopilamos, usamos y protegemos los datos proporcionados al realizar un pedido en nuestra tienda.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Información que recopilamos</h2>
          <p>Podemos recopilar la siguiente información cuando realizas un pedido:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Nombre y apellidos</li>
            <li>Número de teléfono</li>
            <li>Dirección de envío</li>
            <li>Ciudad y departamento</li>
            <li>Correo electrónico (opcional)</li>
            <li>Información adicional necesaria para la entrega</li>
          </ul>

          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Uso de la información</h2>
          <p>Utilizamos la información únicamente para:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Procesar y gestionar pedidos</li>
            <li>Coordinar la entrega del producto</li>
            <li>Contactar al cliente para confirmar el pedido</li>
            <li>Brindar soporte y atención al cliente</li>
            <li>Mejorar la experiencia de compra</li>
          </ul>
          <p>
            No vendemos ni compartimos tu información con terceros, excepto cuando sea necesario para realizar el envío del pedido con nuestros operadores logísticos.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Protección de datos</h2>
          <p>
            Implementamos medidas razonables de seguridad para proteger la información personal contra accesos no autorizados, alteración o divulgación.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Cookies</h2>
          <p>
            Nuestro sitio puede utilizar cookies para mejorar la experiencia del usuario y analizar el tráfico del sitio.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Consentimiento</h2>
          <p>
            Al utilizar nuestro sitio web y realizar un pedido, aceptas esta política de privacidad.
          </p>
        </div>
      </div>
    </main>
  )
}
