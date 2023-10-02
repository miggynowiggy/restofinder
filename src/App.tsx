import GMapContainer from "./components/GMapContainer";
import GlobalStoreProvider from "./context/GlobalStore";
import MainPage from "./pages/MainPage";

export default function App() {
  return (
    <GlobalStoreProvider>
      <div className="w-screen h-screen p-0 m-0">
        <GMapContainer>
          <MainPage />
        </GMapContainer>
      </div>
    </GlobalStoreProvider>
  );
}
