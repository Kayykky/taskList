import { FormEvent, useContext, useState } from "react";
import styles from "./styles.module.scss";
import Link from "next/link";
import Head from "next/head";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { AuthContext } from "../../contexts/AuthContext";
import { toast } from "react-toastify";
import { canSSRGuest } from "../../utils/canSSRGuest";

export default function Login() {
  const { signIn } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleLogin(e: FormEvent) {
    e.preventDefault();

    if (email === "" || password === "") {
      toast.warn("Preencha os dados");
      return;
    }

    setLoading(true);
    let data = {
      email: email,
      password: password,
    };
    
    await signIn(data);
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
            <h1>Login</h1>
            <form onSubmit={handleLogin} className={styles.form}>
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
                Entrar
              </Button>
            </form>
            <Link href="/cadastro" legacyBehavior>
              <a className={styles.text}>ou cadastre-se</a>
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
