import { useEffect, useState } from "react";
import axiosIns from "../../config/axios";
import Book from "../../components/Book/Book";
import styles from "./books.module.css"

const Books = () => {
    const [booksData, setBooksData] = useState(null);

    const getBooksData = async (search = "", author_id = "") => {
        try {
            let url = "/books?";
            if (search)
                url += `title=${search}&`
            if (author_id) {
                url += `author_id=${author_id}`
            }
            const { data } = await axiosIns.get(url);
            setBooksData(data);
        } catch (err) {
            console.log(err);
            setBooksData([]);
        }
    };

    useEffect(() => {
        getBooksData();
    }, []);

    if (!booksData) return null;

    return (
        <>
            {booksData.length ? (
                <div className={styles.booksWrapper}>
                    {booksData.map((bookData, idx) => (
                        <Book
                            key={bookData.id}
                            bookData={bookData}
                        />
                    ))}
                </div>
            ) : (
                <span>"No Books Found"</span>
            )}
        </>
    );
};

export default Books;
