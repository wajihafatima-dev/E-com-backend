import Link from 'next/link';

export default function Home() {
  const apiUrls = [
    { method: "GET", url: "/api/products", description: "Fetch all products" },
    { method: "POST", url: "/api/products", description: "Create a new product" },
    { method: "PUT", url: "/api/products/:id", description: "Update a product by ID" },
    { method: "DELETE", url: "/api/products/:id", description: "Delete a product by ID" },
  ];

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-2xl font-bold">API URLs</h1>
      <div className="w-full max-w-lg">
        <ul className="space-y-3">
          {apiUrls.map((api, index) => (
            <li key={index} className="p-4 border rounded shadow-md">
              <div className="text-sm font-medium text-gray-600">{api.method}</div>
              <div className="text-lg font-semibold text-blue-600">
                <Link href={api.url}>
                  <h1 className="hover:underline">{api.url}</h1>
                </Link>
              </div>
              <div className="text-sm text-gray-500">{api.description}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
