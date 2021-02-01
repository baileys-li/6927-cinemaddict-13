import {generateMovie} from "./mock/movie";
import {generateFilter} from "./mock/filters";
import {render} from "./utils/render";
import {MOVIE_COUNT} from "./const";

import HeaderProfile from "./view/header-profile";
import MainNavigation from "./view/main-navigation";
import MovieBoard from "./presenter/board";
import FooterStatistics from "./view/footer-statistics";


const body = document.body;
const siteHeaderElement = body.querySelector(`.header`);
render(siteHeaderElement, new HeaderProfile());

const movies = new Array(MOVIE_COUNT).fill().map(generateMovie);
const filters = generateFilter(movies);

const siteMainElement = body.querySelector(`.main`);

const movieBoard = new MovieBoard(siteMainElement);
render(siteMainElement, new MainNavigation(filters));
movieBoard.init(movies);

const siteFooterElement = body.querySelector(`.footer`);
render(siteFooterElement, new FooterStatistics(movies.length));
