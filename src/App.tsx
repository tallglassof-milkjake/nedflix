import React, { useEffect } from 'react';
import Input from './components/Form/Input';
import NavBar from './components/Navigation/NavBar';
import MainLayout from './components/Layouts/MainLayout';
import { UseDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { RootState, AppDispatch } from './store/store';

function App() {
    const searchResults = useSelector((state: RootState) => state.omdb.searchResults);
    const loading = useSelector((state: RootState) => state.omdb.loading);
    const error = useSelector((state: RootState) => state.omdb.error);

    useEffect(()=>{
        console.log(searchResults);
    },[searchResults])

    return (
        <>
            <div className="max-w-screen w-screen max-h-screen h-screen">
                {/* {!searchResults.length 
                ?
                    <div className="w-fit h-full flex flex-col gap-2 m-auto justify-center">
                        <h1>
                            OMDB CHALLENGE
                        </h1>
                        <Input />
                    </div>
                :
                <>
                    <NavBar />

                    <MainLayout />
                </>
                } */}
                <NavBar />

                <MainLayout />
            </div>
        </>
    )
}

export default App
