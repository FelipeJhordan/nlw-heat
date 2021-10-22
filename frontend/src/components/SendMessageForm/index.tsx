import { VscSignOut } from 'react-icons/vsc'
import styles from './styles.module.scss'

export function SendMessageForm() {
    return (
        <div className={styles.sendMessageFormWrapper}>
            <button className={styles.signOutButton}>
                <VscSignOut size={32} />
            </button>

            <header className={styles.userInformation}>
                <div className={styles.userImage}>
                    <img src="" alt="" />
                </div>
            </header>
        </div>
    )
}