import styles from './styles/Pieces.module.css';
import classNames from 'classnames';

const XPiece = ({isHidden}: {isHidden?: boolean}) =>
    <div className={classNames(styles.pieceContainer, {[styles.isHidden]: isHidden})}>
        <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 229.53 229.53">
            <polygon className="cls-1"
                     points="228.83 14.85 214.68 0.71 114.77 100.62 14.85 0.71 0.71 14.85 100.62 114.77 0.71 214.68 14.85 228.83 114.77 128.91 214.68 228.83 228.83 214.68 128.91 114.77 228.83 14.85"/>
        </svg>
    </div>;

export default XPiece;
