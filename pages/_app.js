import "tailwindcss/tailwind.css";
import Layout from "../components/Layout";
import { ShopContextProvider } from "../context/shopContext";
import { useRouter } from "next/router";
function MyApp({ Component, pageProps }) {
  let router = useRouter();
  return (
    <ShopContextProvider>
      <Layout>
        <Component {...pageProps} key={router.asPath} />
      </Layout>
    </ShopContextProvider>
  );
}

export default MyApp;
