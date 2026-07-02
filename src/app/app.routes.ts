import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Library } from './pages/library/library';
import { About } from './pages/about/about';
import { Manga } from './pages/manga/manga';
import { Chapter } from './pages/chapter/chapter';
import { Search } from './pages/search/search';
import { Browse } from './pages/browse/browse';

export const routes: Routes = [
    {
        path: '',
        component: Home,
    },
    {
        path: 'manga/:id',
        component: Manga
    },
    {
        path: 'search/:searched',
        component: Search
    },
    {
        path: 'browse/:title/:query',
        component: Browse
    },
    {
        path: 'chapter/:mangaID/:chapterID',
        component: Chapter
    },
    {
        path: 'library',
        component: Library
    },
    {
        path: 'about',
        component: About
    },
];
