import { Routes, Route } from "react-router-dom";
import { Outlet } from "react-router-dom";

import HomePage from "../pages/home";
import Books from "../pages/books";
import BookDetails from "../pages/bookDetails";
import Authors from "../pages/authors";
import Checkout from "../pages/checkout";
import Layout from "../layout/layout";

const AppRoutes = () => {
    return (
        <Routes>
            <Route element={
                <>
                    <Layout />
                    <Outlet />
                </>
            }>
                <Route path="/" element={<HomePage />} />
                <Route path="/books" element={<Books />} />
                <Route path="/books/:book-slug" element={<BookDetails />} />
                <Route path="/authors" element={<Authors />} />
                <Route path="/checkout" element={<Checkout />} />
            </Route>
        </Routes>
    )
}

export default AppRoutes;
