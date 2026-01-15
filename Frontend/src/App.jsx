import { Header, Footer } from "./components/Index";
import AllRoutes from "./routes/AllRoutes";
import { useLocation } from "react-router-dom";

function App() {
  const location = useLocation();

  // Routes where Header & Footer should NOT appear
  const hideLayoutRoutes = ["/login", "/signup"];

  const hideLayout = hideLayoutRoutes.includes(location.pathname);

  return (
    <>
      {!hideLayout && <Header />}

      <main>
        <AllRoutes />
      </main>

      {!hideLayout && <Footer />}
    </>
  );
}

export default App;
