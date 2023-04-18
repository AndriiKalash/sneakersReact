import ContentLoader from "react-content-loader";
import styles from './Card/Card.module.scss';

export const Loader = () => (
    <div className={styles.card}>
            <ContentLoader
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
   </div>
)
                
