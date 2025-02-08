import {ChevronDownIcon, ChevronUpIcon} from "@heroicons/react/20/solid/index.js";

export default function TableHeading({ children, sortField, sortDir, field, dir }) {
    return (
        <div className="flex gap-x-1 cursor-pointer">
        {children}
        <span className="flex flex-col">
            <ChevronUpIcon className={`w-4 h-4 inline-block -mt-1 ${sortDir === 'desc' && sortField  === field ? 'text-white' : ''}`} />
            <ChevronDownIcon className={`w-4 h-4 inline-block -mt-2 ${sortDir === 'asc' && sortField  === field ? 'text-white' : ''}`} />
        </span>
        </div>
    );
}
