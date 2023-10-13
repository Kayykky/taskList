import { FormEvent, useEffect, useState } from "react";
import styles from "../NewLista/styles.module.scss";
import { toast } from "react-toastify";
import { SetupApiClient } from "../../services/api";
import { Input, TextArea } from "../ui/Input";
import { useRouter } from "next/router";
import { Button } from "../ui/Button";

export function NewNota() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const [lists, setLists] = useState([]);

  const [listSelected, setListSelected] = useState("Selecione");

  useEffect(() => {
    loadLists();
  }, []);

  async function loadLists() {
    try {
      const apiClient = SetupApiClient();

      const response = await apiClient.get("/list/list");
      setLists(response.data);
    } catch (error) {
      toast.error("Algo deu errado");
    }
  }

  function handleChangeList(event) {
    setListSelected(event.target.value);
  }

  async function handleRegister(e: FormEvent) {
    e.preventDefault();

    try {
      if (!title || listSelected === "Selecione") {
        toast.warn("Preencha os dados");
        return;
      }

      const apiClient = SetupApiClient();
      await apiClient.post("/note", {
        title: title,
        description: desc,
        list_id: lists[listSelected].id,
      });
    } catch (error) {
      toast.error("Algo deu errado");
      console.log("Error: ", error);
      return;
    }

    toast.success("Nota cadastrada com sucesso");
    setTitle("");
    setDesc("");
    if (router.pathname === "/notas") {
      router.reload();
    } else {
      router.push({
        pathname: "/notas",
        query: { list_id: lists[listSelected].id },
      });
    }
    setListSelected("Selecione");
  }

  return (
    <>
      <div className={styles.container}>
        <h1>Nova Nota</h1>
        <form onSubmit={handleRegister}>
          <Input
            type="text"
            placeholder="Digite o título da nota"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={15}
          />

          <TextArea
            placeholder="Digite a descrição da nota"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            maxLength={30}
          />

          <select value={listSelected} onChange={handleChangeList} className={styles.select}>
            <option disabled selected>
              Selecione
            </option>
            {lists.map((item, index) => {
              return (
                <option key={item.id} value={index}>
                  {item.name}
                </option>
              );
            })}
          </select>

          <Button type="submit">Criar nota</Button>
        </form>
      </div>
    </>
  );
}
