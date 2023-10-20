import { createBrowserRouter } from "react-router-dom"

import HomePage from "../pages/home";
import Books from "../pages/books";
import BookDetails from "../pages/bookDetails";
import Authors from "../pages/authors";
import Checkout from "../pages/checkout";
import Layout from "../layout/layout";

const router = createBrowserRouter([
  {
    // element: <Layout />,
    // children: [
    //   {
        path: "/",
        element: <HomePage />,
        children: [
          {
            path: "/books",
            element: <Books />,
            children: [
              {
                path: ":book-url-name",
                element: <BookDetails />,
              },
            ],
          },
          {
            path: "authors",
            element: <Authors />,
          },
          {
            path: "checkout",
            element: <Checkout />,
          },
        ],
      },
    // ],
  // },
]);

export default router;

