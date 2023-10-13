import { FormEvent, useState } from "react";
import styles from "./styles.module.scss";
import { toast } from "react-toastify";
import { SetupApiClient } from "../../services/api";
import { Input } from "../ui/Input";
import { useRouter } from "next/router";
import { Button } from "../ui/Button";

export function NewLista() {
  const router = useRouter();

  const [name, setName] = useState("");

  async function handleRegister(e: FormEvent) {
    e.preventDefault();

    if (!name) {
      toast.warn("Preencha os dados");
      return;
    }

    const apiClient = SetupApiClient();
    await apiClient.post("/list", {
      name: name,
    });

    toast.success("Lista cadastrada com sucesso");
    setName("");
    router.reload();
  }

  return (
    <>
      <div className={styles.container}>
        <h1>Nova lista</h1>
        <form onSubmit={handleRegister}>
          <Input
            type="text"
            placeholder="Digite o nome da lista"
            value={name}
            maxLength={15}
            onChange={(e) => setName(e.target.value)}
          />
          <Button type="submit">Criar lista</Button>
        </form>
      </div>
    </>
  );
}
