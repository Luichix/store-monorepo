import { HeartIcon } from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/20/solid';
import Image from 'next/image';
import Gallery from '@/components/common/Gallery';
import Details from '@/components/common/Details';
import { classNames } from '@/utils/classNames';
import { fetchItem } from '@/utils';
import ButtonBag from '@/components/common/ButtonBag';

const reviews = {
  average: 4,
  totalCount: 1624,
  counts: [
    { rating: 5, count: 1019 },
    { rating: 4, count: 162 },
    { rating: 3, count: 97 },
    { rating: 2, count: 199 },
    { rating: 1, count: 147 },
  ],
  featured: [
    {
      id: 1,
      rating: 5,
      content: `
        <p>This is the bag of my dreams. I took it on my last vacation and was able to fit an absurd amount of snacks for the many long and hungry flights.</p>
      `,
      author: 'Emily Selman',
      avatarSrc:
        'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80',
    },
    // More reviews...
  ],
};

const product = {
  name: 'Zip Tote Basket',
  price: '$140',
  rating: 4,
  images: [
    {
      id: 1,
      name: 'Angled view',
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-03-product-01.jpg',
      alt: 'Angled front view with bag zipped and handles upright.',
    },
    // More images...
  ],
  colors: [
    {
      name: 'Washed Black',
      bgColor: 'bg-gray-700',
      selectedColor: 'ring-gray-700',
    },
    { name: 'White', bgColor: 'bg-white', selectedColor: 'ring-gray-400' },
    {
      name: 'Washed Gray',
      bgColor: 'bg-gray-500',
      selectedColor: 'ring-gray-500',
    },
  ],
  description: `
    <p>The Zip Tote Basket is the perfect midpoint between shopping tote and comfy backpack. With convertible straps, you can hand carry, should sling, or backpack this convenient and spacious bag. The zip top and durable canvas construction keeps your goods protected for all-day use.</p>
  `,
  details: [
    {
      name: 'Features',
      items: [
        'Multiple strap configurations',
        'Spacious interior with top zip',
        'Leather handle and tabs',
        'Interior dividers',
        'Stainless strap loops',
        'Double stitched construction',
        'Water-resistant',
      ],
    },
    // More sections...
  ],
};
const relatedProducts = [
  {
    id: 1,
    name: 'Zip Tote Basket',
    color: 'White and black',
    href: '#',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/product-page-03-related-product-01.jpg',
    imageAlt:
      'Front of zip tote bag with white canvas, black canvas straps and handle, and black zipper pulls.',
    price: '$140',
  },
  // More products...
];

export default async function Product({ params }) {
  const { id } = params;

  const item = await fetchItem(id);

  // const [selectedColor, setSelectedColor] = useState(product.colors[0]);

  return (
    <div className="bg-white">
      <main className="mx-auto max-w-7xl sm:px-6 sm:pt-16 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          {/* Product */}
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
            {/* Image gallery */}
            <Gallery product={item} />

            {/* Product info */}
            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                {product.name}
              </h1>

              <div className="mt-3">
                <h2 className="sr-only">Product information</h2>
                <p className="text-3xl tracking-tight text-gray-900">
                  {product.price}
                </p>
              </div>

              {/* Reviews */}
              <div className="mt-3">
                <h3 className="sr-only">Reviews</h3>
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={classNames(
                          product.rating > rating
                            ? 'text-pink-500'
                            : 'text-gray-300',
                          'h-5 w-5 flex-shrink-0'
                        )}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <p className="sr-only">{product.rating} out of 5 stars</p>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="sr-only">Description</h3>

                <div
                  className="space-y-6 text-base text-gray-700"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
              </div>

              <form className="mt-6">
                {/* Colors */}
                <div>
                  <h3 className="text-sm text-gray-600">Color</h3>

                  {/* <RadioGroup
                    value={selectedColor}
                    onChange={setSelectedColor}
                    className="mt-2"
                  >
                    <RadioGroup.Label className="sr-only">
                      Choose a color
                    </RadioGroup.Label>
                    <div className="flex items-center space-x-3">
                      {product.colors.map((color) => (
                        <RadioGroup.Option
                          key={color.name}
                          value={color}
                          className={({ active, checked }) =>
                            classNames(
                              color.selectedColor,
                              active && checked ? 'ring ring-offset-1' : '',
                              !active && checked ? 'ring-2' : '',
                              'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none'
                            )
                          }
                        >
                          <RadioGroup.Label as="span" className="sr-only">
                            {color.name}
                          </RadioGroup.Label>
                          <span
                            aria-hidden="true"
                            className={classNames(
                              color.bgColor,
                              'h-8 w-8 rounded-full border border-black border-opacity-10'
                            )}
                          />
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup> */}
                </div>

                <div className="mt-10 flex">
                  <ButtonBag itemId={id} />
                  <button
                    type="button"
                    className="ml-4 flex items-center justify-center rounded-md px-3 py-3 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                  >
                    <HeartIcon
                      className="h-6 w-6 flex-shrink-0"
                      aria-hidden="true"
                    />
                    <span className="sr-only">Add to favorites</span>
                  </button>
                </div>
              </form>

              <section aria-labelledby="details-heading" className="mt-12">
                <h2 id="details-heading" className="sr-only">
                  Additional details
                </h2>

                <div className="divide-y divide-gray-200 border-t">
                  {product.details.map((detail, index) => (
                    <Details key={index} detail={detail} />
                  ))}
                </div>
              </section>
            </div>
          </div>

          {/** */}
          <section aria-labelledby="reviews-heading" className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-12 lg:gap-x-8 lg:px-8 lg:py-32">
              <div className="lg:col-span-4">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                  Customer Reviews
                </h2>

                <div className="mt-3 flex items-center">
                  <div>
                    <div className="flex items-center">
                      {[0, 1, 2, 3, 4].map((rating) => (
                        <StarIcon
                          key={rating}
                          className={classNames(
                            reviews.average > rating
                              ? 'text-yellow-400'
                              : 'text-gray-300',
                            'h-5 w-5 flex-shrink-0'
                          )}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                    <p className="sr-only">{reviews.average} out of 5 stars</p>
                  </div>
                  <p className="ml-2 text-sm text-gray-900">
                    Based on {reviews.totalCount} reviews
                  </p>
                </div>

                <div className="mt-6">
                  <h3 className="sr-only">Review data</h3>

                  <dl className="space-y-3">
                    {reviews.counts.map((count) => (
                      <div
                        key={count.rating}
                        className="flex items-center text-sm"
                      >
                        <dt className="flex flex-1 items-center">
                          <p className="w-3 font-medium text-gray-900">
                            {count.rating}
                            <span className="sr-only"> star reviews</span>
                          </p>
                          <div
                            aria-hidden="true"
                            className="ml-1 flex flex-1 items-center"
                          >
                            <StarIcon
                              className={classNames(
                                count.count > 0
                                  ? 'text-yellow-400'
                                  : 'text-gray-300',
                                'h-5 w-5 flex-shrink-0'
                              )}
                              aria-hidden="true"
                            />

                            <div className="relative ml-3 flex-1">
                              <div className="h-3 rounded-full border border-gray-200 bg-gray-100" />
                              {count.count > 0 ? (
                                <div
                                  className="absolute inset-y-0 rounded-full border border-yellow-400 bg-yellow-400"
                                  style={{
                                    width: `calc(${count.count} / ${reviews.totalCount} * 100%)`,
                                  }}
                                />
                              ) : null}
                            </div>
                          </div>
                        </dt>
                        <dd className="ml-3 w-10 text-right text-sm tabular-nums text-gray-900">
                          {Math.round((count.count / reviews.totalCount) * 100)}
                          %
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>

                <div className="mt-10">
                  <h3 className="text-lg font-medium text-gray-900">
                    Share your thoughts
                  </h3>
                  <p className="mt-1 text-sm text-gray-600">
                    If you’ve used this product, share your thoughts with other
                    customers
                  </p>

                  <a
                    href="#"
                    className="mt-6 inline-flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-8 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 sm:w-auto lg:w-full"
                  >
                    Write a review
                  </a>
                </div>
              </div>

              <div className="mt-16 lg:col-span-7 lg:col-start-6 lg:mt-0">
                <h3 className="sr-only">Recent reviews</h3>

                <div className="flow-root">
                  <div className="-my-12 divide-y divide-gray-200">
                    {reviews.featured.map((review) => (
                      <div key={review.id} className="py-12">
                        <div className="flex items-center">
                          <Image
                            width={48}
                            height={48}
                            src={review.avatarSrc}
                            alt={`${review.author}.`}
                            className="h-12 w-12 rounded-full"
                          />
                          <div className="ml-4">
                            <h4 className="text-sm font-bold text-gray-900">
                              {review.author}
                            </h4>
                            <div className="mt-1 flex items-center">
                              {[0, 1, 2, 3, 4].map((rating) => (
                                <StarIcon
                                  key={rating}
                                  className={classNames(
                                    review.rating > rating
                                      ? 'text-yellow-400'
                                      : 'text-gray-300',
                                    'h-5 w-5 flex-shrink-0'
                                  )}
                                  aria-hidden="true"
                                />
                              ))}
                            </div>
                            <p className="sr-only">
                              {review.rating} out of 5 stars
                            </p>
                          </div>
                        </div>

                        <div
                          className="mt-4 space-y-6 text-base italic text-gray-600"
                          dangerouslySetInnerHTML={{ __html: review.content }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section
            aria-labelledby="related-heading"
            className="mt-10 border-t border-gray-200 px-4 py-16 sm:px-0"
          >
            <h2
              id="related-heading"
              className="text-xl font-bold text-gray-900"
            >
              Customers also bought
            </h2>

            <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
              {relatedProducts.map((product) => (
                <div key={product.id}>
                  <div className="relative">
                    <div className="relative h-72 w-full overflow-hidden rounded-lg">
                      <Image
                        src={product.imageSrc}
                        alt={product.imageAlt}
                        width={288}
                        height={288}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="relative mt-4">
                      <h3 className="text-sm font-medium text-gray-900">
                        {product.name}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {product.color}
                      </p>
                    </div>
                    <div className="absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden rounded-lg p-4">
                      <div
                        aria-hidden="true"
                        className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
                      />
                      <p className="relative text-lg font-semibold text-white">
                        {product.price}
                      </p>
                    </div>
                  </div>
                  <div className="mt-6">
                    <a
                      href={product.href}
                      className="relative flex items-center justify-center rounded-md border border-transparent bg-gray-100 px-8 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200"
                    >
                      Add to bag
                      <span className="sr-only">, {product.name}</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
