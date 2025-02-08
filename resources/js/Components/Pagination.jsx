import { Link, usePage } from '@inertiajs/react';

export default function Pagination({ links }) {
    const { url } = usePage(); // Get the current URL with query parameters

    // Function to append existing query parameters to a new URL
    const preserveQueryParams = (newUrl) => {
        const currentUrl = new URL(url, window.location.origin);
        const newUrlObj = new URL(newUrl, window.location.origin);

        // Append existing query parameters to the new URL
        currentUrl.searchParams.forEach((value, key) => {
            if (!newUrlObj.searchParams.has(key)) {
                newUrlObj.searchParams.append(key, value);
            }
        });

        return newUrlObj.toString();
    };

    return (
        <nav className="flex justify-center mt-2">
            {links.map((link) => (
                <Link
                    preserveScroll // Preserve scroll position
                    preserveState // Preserve component state
                    key={link.label}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                    href={link.url ? preserveQueryParams(link.url) : '#'}
                    className={
                        "inline-block py-2 px-3 rounded-lg text-gray-200 text-xs" +
                        (link.active ? " bg-gray-950" : " ") +
                        (link.url ? " hover:bg-gray-950" : " cursor-not-allowed !text-gray-500")
                    }
                />
            ))}
        </nav>
    );
}
