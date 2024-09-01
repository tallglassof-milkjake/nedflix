import NavBar from './components/Navigation/NavBar';
import MainLayout from './components/Layouts/MainLayout';

function App() {

    return (
        <>
            <div className="max-w-screen w-screen max-h-screen h-screen">
                <NavBar />

                <MainLayout />
            </div>
        </>
    );
}

export default App
