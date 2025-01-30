import Link from "next/link";
import {AppName} from "@/lib/constants";
import getPackageVersion from "@/lib/utils/getPackageVersion";
import styles from './footer.module.css'

const Footer = () => {
  return (
    <footer className={styles.container}>
      <div>
        {AppName}
      </div>

      <div>
        &copy; 2024 Powered by:
        <Link href="https://makmakale.github.io/portfolio/" className="ml-1 underline">MakMakAle</Link>
      </div>

      <div>
        ver. {getPackageVersion()}
      </div>
    </footer>
  );
};

export default Footer;