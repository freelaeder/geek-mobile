// src/shared/loading/index.tsx
import styles from "@styles/loading.module.less";
import ReactDOM from "react-dom";

export default function Loading() {
    return ReactDOM.createPortal(
        <div className={styles.container}>
            <div className={styles.loading}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>,
        document.body
    );
}