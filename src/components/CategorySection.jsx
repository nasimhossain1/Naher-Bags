
import { ArrowRight } from 'lucide-react'

const categories = [
  {
    name: 'Ladies Bags',
    image: 'photo-1584917865442-de89df76afd3',
    description: 'Elegant bags for every occasion',
  },
  {
    name: 'Backpacks',
    image: 'photo-1553062407-98eeb64c6a62',
    description: 'Style meets everyday comfort',
  },
  {
    name: 'Travel Bags',
    image: 'photo-1553062407-1e7e640cc6c0',
    description: 'Your perfect travel companion',
  },
  {
    name: 'Office Bags',
    image: 'photo-1553062407-7b4c4f1a0c6d',
    description: 'Professional and timeless',
  },
]

function CategorySection() {
  return (
    <section id="categories" className="container-width py-20">

      <div className="mb-10 text-center">
        <p className="text-xs font-semibold tracking-[0.3em] text-brand-gold">
          FIND YOUR PERFECT BAG
        </p>

        <h2 className="mt-3 text-3xl font-semibold text-brand-black md:text-4xl">
          Explore Categories
        </h2>

        <p className="mt-3 text-sm text-gray-500">
          Something beautiful for every occasion.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
        {categories.map((category) => (
          <a
            href="/shop"
            key={category.name}
            className="group"
          >
            <div className="overflow-hidden bg-brand-cream">
              <img
                src={`https://images.unsplash.com/${category.image}?w=600&q=85`}
                alt={category.name}
                loading="lazy"
                className="h-52 w-full object-cover transition duration-700 group-hover:scale-110 md:h-72"
              />
            </div>

            <div className="flex items-center justify-between py-4">
              <div>
                <h3 className="text-sm font-semibold md:text-base">
                  {category.name}
                </h3>

                <p className="mt-1 text-xs text-gray-500">
                  {category.description}
                </p>
              </div>

              <ArrowRight
                size={18}
                className="shrink-0 text-brand-gold transition group-hover:translate-x-1"
              />
            </div>
          </a>
        ))}
      </div>

    </section>
  )
}

export default CategorySection
