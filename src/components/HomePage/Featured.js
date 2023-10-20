import { useEffect, useState } from "react";
import axiosIns from "../../config/axios";
import { Link } from "react-router-dom";
import styles from "./Featured.module.css"

const Featured = () => {
    const [bookData, setBookData] = useState(null);
    const [error, setError] = useState("");

    const getFeaturedBookData = async () => {
        try {
            let { data } = await axiosIns.get("/featured_book");
            let { data: featured_book_data } = await axiosIns.get(
                `/books/${data.book_id}`
            );
            setBookData(featured_book_data);
        } catch (err) {
            console.log(err);
            setError("Oh no! There is some problem in gettting data");
        }
    };

    useEffect(() => {
        getFeaturedBookData();
    }, []);

    console.log(bookData);

    if (!bookData) return null;

    return (
        <div className={styles.cont}>
            <p>Today's Featured Book...</p>
            <div className={styles.bookBriefCont}>
                <Link to={`books/${bookData.id}`}>
                    <img src={bookData.cover_image} height={'auto'} width={'300px'} />
                </Link>
                <div className={styles.bookBrief}>
                    <div>
                        <span>Title:&nbsp;</span>
                        <span>{bookData.title}</span>
                    </div>
                    <div className={styles.bookDesc}>
                        <span>Description:&nbsp;</span>
                        <span>{bookData.desc}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Featured;
