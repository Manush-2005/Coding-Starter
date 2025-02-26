import { ICONS } from "@/assets/icons/icons";
import React from "react";
import { Link } from "react-router-dom";

const Navigate = ({ name, item, path }) => {
  return (
    <>
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="my-6">
        <ol
          role="list"
          className="flex items-center px-4 mx-auto space-x-2 md:px-6 sm:px-0 lg:max-w-7xl lg:px-0"
        >
          <li>
            <Link to="/" className="text-sm font-medium text-gray-900">
              <ICONS.HOME size={20} />
            </Link>
          </li>
          <li>
            <span className="mx-2 text-gray-400">/</span>
            <Link to={`/${path}`} className="text-sm font-medium text-gray-900">
              {name}
            </Link>
          </li>
          <span className="mx-2 text-gray-400">/</span>
          <li className="text-sm font-medium text-gray-500">{item}</li>
        </ol>
      </nav>
    </>
  );
};

export default Navigate;
