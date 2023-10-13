import { FormEvent, useContext, useState } from "react";
import Link from "next/link";
import Head from "next/head";
import styles from "../login/styles.module.scss";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { AuthContext } from "../../contexts/AuthContext";
import { toast } from "react-toastify";
import { canSSRGuest } from "../../utils/canSSRGuest";

export default function Home() {
  const { signUp } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleSignUp(e: FormEvent) {
    e.preventDefault();

    if (name === "" || email === "" || password === "") {
      toast.warn("Preencha os dados");
      return;
    }

    setLoading(true);
    let data = {
      name: name,
      email: email,
      password: password,
    };

    await signUp(data);
    setLoading(false);
  }

  return (
    <>
      <Head>
        <title>Tasklist</title>
      </Head>
      <main className={styles.main}>
        <div className={styles.content}>
          <div className={styles.contentLeft}>
            <img src="/logo2.svg" width={275} height={290} />
          </div>
          <div className={styles.contentRight}>
            <h1>Cadastre-se</h1>
            <form onSubmit={handleSignUp} className={styles.form}>
              <label>
                <span>Nome:</span>
                <Input
                  type="text"
                  value={name}
                  placeholder="Digite seu nome"
                  onChange={(e) => setName(e.target.value)}
                />
              </label>

              <label>
                <span>Email:</span>
                <Input
                  type="email"
                  value={email}
                  placeholder="Digite seu email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>

              <label>
                <span>Senha:</span>
                <Input
                  type="password"
                  value={password}
                  placeholder="##########"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>

              <Button type="submit" loading={loading}>
                Cadastrar
              </Button>
            </form>
            <Link href="/login" legacyBehavior>
              <a className={styles.text}>Já tem uma conta? Entrar</a>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

export const getServerSideProps = canSSRGuest(async (ctx) => {
  return {
    props: {},
  };
});
