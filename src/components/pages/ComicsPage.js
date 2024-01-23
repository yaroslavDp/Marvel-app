import AppBanner from "../appBanner/AppBanner";
import ComicsList from "../comicsList/ComicsList";
import React from 'react'
import { Route, Routes } from "react-router-dom";
import {SingleComicPage} from '../pages';
const ComicsPage = () => {
  return (
    <>
        <AppBanner />
        <Routes>
            <Route>
                <Route path=":comicId" element={<SingleComicPage/>}/>
                <Route path="/" element={<ComicsList/>}/>
            </Route>
        </Routes>
    </>
  )
}

export default ComicsPage