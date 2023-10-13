import { useState } from "react";
import styles from "./styles.module.scss";
import Head from "next/head";
import { canSSRAuth } from "../../utils/canSSRAuth";
import { SideMenu } from "../../components/SideMenu";
import { SetupApiClient } from "../../services/api";
import Router from "next/router";
import { FiTrash2, FiPaperclip } from "react-icons/fi";
import { toast } from "react-toastify";

type ItemProps = {
  id: string;
  name: string;
};

interface ListProps {
  listList: ItemProps[];
}

export default function Painel({ listList }: ListProps) {
  const [lists, setLists] = useState(listList || []);

  function handleListNotes(list_id) {
    Router.push({ pathname: "/notas", query: { list_id: list_id } });
  }

  async function handleDeleteList(list_id) {
    try {
      const apiClient = SetupApiClient();
      const response = await apiClient.delete(`/list/delete`, {
        params: {
          list_id: list_id,
        },
      });

      setLists(lists.filter((list) => list.id != list_id));

      toast.success("Apagada");
    } catch (error) {
      toast.error("Algo deu errado");
      console.log("Error: ", error);
    }
  }

  return (
    <>
      <Head>
        <title>Tasklist</title>
      </Head>
      <SideMenu />
      <main className={styles.main}>
        <h1 className={styles.title}>Minhas Listas</h1>
        <hr />
        <div className={styles.content}>
          {lists.map((item, index) => {
            return (
              <div key={item.id} className={styles.list}>
                <h2>{item.name}</h2>
                <div className={styles.listRight}>
                  <button
                    value={index}
                    onClick={() => handleListNotes(item.id)}
                    className={styles.btnSeeMore}
                  >
                    <span>Ver lista</span>
                    <div className={styles.svgContainer}>
                      <FiPaperclip size={20} />
                    </div>
                  </button>
                  <button
                    value={index}
                    onClick={() => handleDeleteList(item.id)}
                    className={styles.btnDelete}
                  >
                    <div className={styles.svgContainer}>
                      <FiTrash2 size={20} />
                    </div>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  const apiClient = SetupApiClient(ctx);

  const response = await apiClient.get("/list/list");

  return {
    props: {
      listList: response.data,
    },
  };
});
