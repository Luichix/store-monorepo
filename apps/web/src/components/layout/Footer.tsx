import Link from 'next/link';
import footerNavigation from 'public/data/footer-navigation.json';

export const Footer = () => {
  return (
    <footer aria-labelledby="footer-heading" className="bg-white">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-20 xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="grid grid-cols-2 gap-8 xl:col-span-2">
            <div className="space-y-16 md:grid md:grid-cols-2 md:gap-8 md:space-y-0">
              <div>
                <h3 className="text-sm font-medium text-gray-900">Tienda</h3>
                <ul role="list" className="mt-6 space-y-6">
                  {footerNavigation.shop.map((item) => (
                    <li key={item.name} className="text-sm">
                      <Link
                        href={item.href}
                        className="text-gray-500 hover:text-gray-600"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900">Empresa</h3>
                <ul role="list" className="mt-6 space-y-6">
                  {footerNavigation.company.map((item) => (
                    <li key={item.name} className="text-sm">
                      <a
                        href={item.href}
                        className="text-gray-500 hover:text-gray-600"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="space-y-16 md:grid md:grid-cols-2 md:gap-8 md:space-y-0">
              <div>
                <h3 className="text-sm font-medium text-gray-900">Cuenta</h3>
                <ul role="list" className="mt-6 space-y-6">
                  {footerNavigation.account.map((item) => (
                    <li key={item.name} className="text-sm">
                      <a
                        href={item.href}
                        className="text-gray-500 hover:text-gray-600"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900">Conectar</h3>
                <ul role="list" className="mt-6 space-y-6">
                  {footerNavigation.connect.map((item) => (
                    <li key={item.name} className="text-sm">
                      <a
                        href={item.href}
                        className="text-gray-500 hover:text-gray-600"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-16 md:mt-16 xl:mt-0">
            <h3 className="text-sm font-medium text-gray-900">
              Suscríbete a nuestro boletín
            </h3>
            <p className="mt-6 text-sm text-gray-500">
              Las últimas ofertas y ahorros, enviados a su bandeja de entrada
              semanalmente.
            </p>
            <form className="mt-2 flex sm:max-w-md">
              <label htmlFor="email-address" className="sr-only">
                Correo electronico
              </label>
              <input
                id="email-address"
                type="text"
                autoComplete="email"
                required
                className="w-full min-w-0 appearance-none rounded-md border border-gray-300 bg-white px-4 py-2 text-base text-indigo-500 placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
              <div className="ml-4 flex-shrink-0">
                <button
                  type="submit"
                  className="flex w-full items-center justify-center rounded-md border border-transparent bg-pink-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Inscribirse
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-200 py-10">
          <p className="text-sm text-gray-500">
            Todos los derecheros reservados &copy; 2023 Queen Clothes, Inc.
          </p>
        </div>
      </div>
    </footer>
  );
};
