import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { CONFIG } from "@/config/store"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { 
      firstName, 
      lastName, 
      phone, 
      email, 
      department, 
      city, 
      address, 
      reference, 
      complement, 
      quantity 
    } = body

    // 1. Generar código de reserva único
    const reservationCode = `RES-${Math.random().toString(36).substr(2, 6).toUpperCase()}`
    const total = CONFIG.productPrice * quantity

    // 2. Guardar en la Base de Datos (Prisma)
    console.log("Creating order in DB:", reservationCode);
    let order;
    try {
      order = await prisma.order.create({
        data: {
          orderNumber: reservationCode,
          firstName,
          lastName,
          phone,
          email: email || null,
          department,
          city,
          address,
          reference,
          complement: complement || null,
          quantity,
          total,
          status: "PENDING",
        },
      })
      console.log("Order created successfully:", order.id);
    } catch (dbError) {
      console.error("DATABASE ERROR:", dbError);
      return NextResponse.json({ error: "Error saving to database" }, { status: 500 });
    }

    // 3. Formatear mensaje para Telegram
    const telegramMessage = `
🛒 *NUEVA ORDEN RECIBIDA*
━━━━━━━━━━━━━━━━━━
🆔 *Código:* \`${reservationCode}\`
👤 *Cliente:* ${firstName} ${lastName}
📞 *Celular:* \`+57 ${phone}\`
📧 *Email:* ${email || "No proporcionado"}

📍 *UBICACIÓN*
🏢 *Depto:* ${department}
🏙️ *Ciudad:* ${city}
🏠 *Dirección:* ${address}
📌 *Ref:* ${reference}
🏢 *Comp:* ${complement || "N/A"}

📦 *DETALLES DEL PEDIDO*
🔌 *Producto:* ${CONFIG.productName}
🔢 *Cantidad:* ${quantity}
💰 *TOTAL A PAGAR:* \`$${total.toLocaleString("es-CO")}\`

🚚 *ESTADO:* PAGO CONTRA ENTREGA
━━━━━━━━━━━━━━━━━━
`

    // 4. Enviar notificación a Telegram
    try {
      const rawToken = process.env.TELEGRAM_BOT_TOKEN
      const rawChatId = process.env.TELEGRAM_CHAT_ID

      const token = rawToken?.replace(/"/g, '')
      const chatId = rawChatId?.replace(/"/g, '')

      console.log("Sending Telegram notification...");
      if (token && chatId) {
        const telResp = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: chatId,
            text: telegramMessage,
            parse_mode: "Markdown",
          }),
        })
        const telResult = await telResp.json();
        console.log("Telegram API Response:", telResult);
      } else {
        console.warn("Telegram Token or Chat ID missing in environment");
      }
    } catch (telError) {
      console.error("TELEGRAM NOTIFICATION FAILED (Non-blocking):", telError);
    }

    return NextResponse.json({ success: true, orderNumber: reservationCode })
  } catch (error) {
    console.error("Error creating order:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
