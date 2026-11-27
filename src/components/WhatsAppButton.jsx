
import { MessageCircle } from 'lucide-react'

function WhatsAppButton() {
  const phoneNumber = '8801330467802'

  const message = encodeURIComponent(
    'Hello Naher Bags! I want to know more about your products.'
  )

  const whatsappLink = `https://wa.me/${phoneNumber}?text=${message}`

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact Naher Bags on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-xl transition hover:scale-110 hover:bg-green-600"
    >
      <MessageCircle size={28} />
    </a>
  )
}

export default WhatsAppButton
