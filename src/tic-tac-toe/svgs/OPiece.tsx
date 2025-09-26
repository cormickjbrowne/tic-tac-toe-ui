import styles from './styles/Pieces.module.css';
import classNames from 'classnames';

const OPiece = ({isHidden}: {isHidden?: boolean}) =>
    <div className={classNames(styles.pieceContainer, {[styles.isHidden]: isHidden})}>
        <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 231 231">
            <path className="cls-1"
                  d="M1346,328.29a115,115,0,1,0,115,115A115,115,0,0,0,1346,328.29Zm0,210a95,95,0,1,1,95-95A95,95,0,0,1,1346,538.29Z"
                  transform="translate(-1230.5 -327.79)"/>
        </svg>
    </div>;

export default OPiece;
