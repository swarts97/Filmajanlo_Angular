import { Person } from "./person.type";
import { Movie } from "./movie.type";
import { Show } from "./show.type";

export interface Cast {
    characters: string[];
    person: Person;
    movie: Movie;
    show: Show;
}