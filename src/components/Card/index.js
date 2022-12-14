import React from 'react';
import ContentLoader from "react-content-loader"
import AppContext from '../../context';
import styles from './Card.module.scss';

const Card = ({
    id,
    onFavorite,
    imageUrl,
    title,
    price,
    onPlus,
    favorited = false,
    loading = false
}) => {

    const { isItemAdded } = React.useContext(AppContext);
    const [isFavorite, setIsFavorite] = React.useState(favorited);
    const obj = { id, parentId: id, title, imageUrl, price };

    const onClickPlus = () => {
        onPlus(obj);
    };

    const onClickFavorite = () => {
        onFavorite(obj);
        setIsFavorite(!isFavorite);
    };


    return (

        <div className={styles.card}>

            {
                loading ? <ContentLoader
                    speed={2}
                    width={150}
                    height={260}
                    viewBox="0 0 150 200"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb" >

                    <rect x="498" y="404" rx="0" ry="0" width="141" height="180" />
                    <rect x="0" y="0" rx="10" ry="10" width="150" height="90" />
                    <rect x="0" y="107" rx="5" ry="5" width="150" height="15" />
                    <rect x="0" y="126" rx="5" ry="5" width="93" height="15" />


                    <rect x="0" y="162" rx="5" ry="5" width="80" height="24" />
                    <rect x="118" y="163" rx="5" ry="5" width="32" height="32" />
                </ContentLoader>

                    :

                    <>
                        {onFavorite && (
                            <div className={styles.favorite} onClick={onClickFavorite} > <img src={isFavorite ? "/img/heart-like.svg" : "/img/heart-unlike.svg"} alt="unlike" />
                            </div>
                        )}

                        <img width={133} height={112} src={imageUrl} alt="sneakers" />
                        <h5>{title}</h5>
                        <div className="d-flex justify-between align-center" >
                            <div className="d-flex flex-column">
                                <span>????????:</span>
                                <b>{price}</b>
                            </div>
                            {onPlus && (
                                <img
                                    className={styles.plus}
                                    onClick={onClickPlus}
                                    src={isItemAdded(id) ? "/img/btn-cheked.svg" : "/img/btn-plus.svg"} alt="plus" />
                            )}
                        </div>
                    </>
            }
        </div>
    );
}

export default Card;

