import { useContext, useState } from "react";
import styles from "./styles.module.scss";
import Link from "next/link";
import { FiLogOut } from "react-icons/fi";
import { AuthContext } from "../../contexts/AuthContext";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { NewNota } from "../NewNota";
import { NewLista } from "../NewLista";
import { FiClipboard, FiPlus } from "react-icons/fi";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 5,
  p: 4,
};

export function SideMenu() {
  const { signOut } = useContext(AuthContext);

  const [openLista, setOpenLista] = useState(false);
  const handleOpenLista = () => setOpenLista(true);
  const handleCloseLista = () => setOpenLista(false);

  const [openNota, setOpenNota] = useState(false);
  const handleOpenNota = () => setOpenNota(true);
  const handleCloseNota = () => setOpenNota(false);

  return (
    <div className={styles.sideMenu}>
      <div className={styles.sideMenuContent}>
        <Link href="/painel">
          <img src="/logo.svg" width={190} height={60} />
        </Link>

        <nav className={styles.nav}>
          <Link href="/painel" legacyBehavior>
            <a className={styles.textOrange}>
              <FiClipboard />
              <span>Minhas listas</span>
            </a>
          </Link>

          <button onClick={handleOpenLista} className={styles.textGreen}>
            <FiPlus />
            <span>Criar lista</span>
          </button>
          <Modal open={openLista} onClose={handleCloseLista}>
            <Box sx={style}>
              <NewLista />
            </Box>
          </Modal>

          <button onClick={handleOpenNota} className={styles.textGreen}>
            <FiPlus />
            <span>Criar nota</span>
          </button>
          <Modal open={openNota} onClose={handleCloseNota}>
            <Box sx={style}>
              <NewNota />
            </Box>
          </Modal>
        </nav>
        <button onClick={signOut} className={styles.logout}>
          <FiLogOut size={30} />
        </button>
      </div>
    </div>
  );
}
