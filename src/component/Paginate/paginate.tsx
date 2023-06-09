import React, {useState} from 'react';
import styles from'./paginate.module.css';
import prev from './icon/prev.svg'
import next from './icon/next.svg'

interface Props{
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<Props> = ({ currentPage, totalPages, onPageChange }: Props) => {

    const [selectedPage, setSelectedPage] = useState(currentPage);

    const handleClick = (pageNumber: number) => {
        setSelectedPage(pageNumber);
        onPageChange(pageNumber);
    }

    const pageNumbers = []
    for( let i = 0; i <= totalPages; i++){
        pageNumbers.push(i); 
    }
    return(
        <div className={styles.Paginate}>
            <button className={styles.Prev} disabled={currentPage === 1} onClick={() => handleClick(currentPage - 1)}>
                <img src={prev} alt="" />
            </button> 
            {pageNumbers.map((pageNumber, index) => {
                if(pageNumber === 1 || pageNumber === totalPages || (pageNumber >= currentPage - 4 && pageNumber <= currentPage + 4)){
                    return (
                        <button
                            key={index}
                            className={`${styles.numberPagi} ${pageNumber === selectedPage ? styles.active : ""}`}
                            onClick={() => handleClick(pageNumber)}
                        >
                            {pageNumber}
                        </button>
                    )
                }else if(pageNumber === currentPage - 5 || pageNumber === currentPage + 5){
                    return (
                        <span key={index} className={styles.ellipsis}>...</span>
                    );
                }else{
                    return null;
                }
            })}      
            <button className={styles.Next} disabled={currentPage === totalPages} onClick={() => handleClick(currentPage + 1)}>
                <img src={next} alt="" />
            </button>
        </div>
    )
}
export default Pagination;