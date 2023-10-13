import { useState, useEffect } from "react";
import styles from "../painel/styles.module.scss";
import Head from "next/head";
import { canSSRAuth } from "../../utils/canSSRAuth";
import { SideMenu } from "../../components/SideMenu";
import { SetupApiClient } from "../../services/api";
import { FiTrash2, FiCheck } from "react-icons/fi";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

type ItemProps = {
  id: string;
  title: string;
  description?: string;
  status: boolean;
};

interface NoteProps {
  list_id: string;
  listNotes: ItemProps[];
}

export default function Painel({ list_id, listNotes }: NoteProps) {
  const router = useRouter();
  const [listName, setListName] = useState("");
  const [notes, setNotes] = useState(listNotes || []);

  useEffect(() => {
    hadleGetList(list_id);
  }, []);

  async function hadleGetList(list_id) {
    try {
      const apiClient = SetupApiClient();
      const response = await apiClient.get(`/list`, {
        params: {
          list_id: list_id,
        },
      });

      setListName(response.data.name);
    } catch (error) {
      setListName("Lista");
      console.log("Error: ", error);
    }
  }

  async function handleDeleteNote(note_id) {
    try {
      const apiClient = SetupApiClient();
      const response = await apiClient.delete(`/note/delete`, {
        params: {
          note_id: note_id,
        },
      });

      setNotes(notes.filter((note) => note.id != note_id));
      toast.success("Apagada");
    } catch (error) {
      toast.error("Algo deu errado");
      console.log("Error: ", error);
    }
  }

  async function handleStatusNote(note_id, note_status) {
    try {
      const apiClient = SetupApiClient();
      const response = await apiClient.put(`/note/edit?note_id=${note_id}`, {
        status: !note_status,
      });
      toast.info("Status alterado");
      router.reload();
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
        <h1 className={styles.title}>{listName}</h1>
        <hr />
        <div className={styles.contentNotes}>
          {notes.map((item, index) => {
            return (
              <div key={item.id} className={styles.note}>
                <div className={styles.noteContent}>
                  <div className={styles.header}>
                    <h2>{item.title}</h2>
                    <button
                      value={index}
                      onClick={() => handleStatusNote(item.id, item.status)}
                      className={styles.btnCheck}
                    >
                      <div className={styles.svgContainer}>
                        {item.status ? (
                          <FiCheck size={30} color="green" />
                        ) : (
                          <FiCheck size={30} color="white"/>
                        )}
                      </div>
                    </button>
                  </div>
                  <div className={styles.description}>{item.description}</div>
                  <div className={styles.footer}>
                    <button
                      value={index}
                      onClick={() => handleDeleteNote(item.id)}
                      className={styles.btnDelete}
                    >
                      <div className={styles.svgContainer}>
                        <FiTrash2 size={20} />
                      </div>
                    </button>
                  </div>
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

  const response = await apiClient.get(`/note/list`, {
    params: {
      list_id: ctx.query.list_id,
    },
  });

  return {
    props: {
      list_id: ctx.query.list_id,
      listNotes: response.data,
    },
  };
});
