"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var movie_service_1 = require("../../services/movie.service");
var person_service_1 = require("../../services/person.service");
var router_1 = require("@angular/router");
var MoviePageComponent = (function () {
    function MoviePageComponent(movieService, personService, router) {
        this.movieService = movieService;
        this.personService = personService;
        this.router = router;
        this.pageSize = 10;
        this.currentPage = 1;
        this.queryString = "";
        this.toggleRelateMovies = false;
    }
    /*
    *   Ez a függvény minden egyes MoviePageComponent példányosodása esetén meghívódik azonnal.
    *   Meghívja a getMovies() fv-t.
    */
    MoviePageComponent.prototype.ngOnInit = function () {
        this.getMovies();
    };
    /*
    *   A konstruktorban beállított paraméterek segítségével
    *   feltölti a movies tagváltozót aszinkron módon, majd a
    *   betöltött filmek értékelését két tizedesjegy pontossággal kerekíti.
    *   Továbbá megvizsgálja, hogy kevesebb, mint 10 film érkezett-e.
    *   Ennek függvényében a lapozó gombot letiltó boolean értékét beállítja.
    *
    */
    MoviePageComponent.prototype.getMovies = function () {
        var _this = this;
        this.movieService.getMovies({
            pageSize: this.pageSize,
            page: this.currentPage,
            query: this.queryString
        })
            .subscribe(function (movies) {
            if (!movies)
                throw "Hiba történt az adatlekérdezés során.";
            _this.movies = movies;
            _this.ratingRounding(_this.movies);
            _this.lastPage = movies.length < 10 ? true : false;
        });
    };
    /*
    *   Szintén aszinkron módon, a subscribe segítségével
    *   feltölti a personService segítségével a kiválasztott
    *   filmhez tartozó színészek tömbjét
    *   Ha nem érkezett adat hibát dob.
    */
    MoviePageComponent.prototype.getActors = function () {
        var _this = this;
        this.personService.getPeopleOfMovie(this.selectedMovie.ids.trakt)
            .subscribe(function (people) {
            if (!people)
                throw "Hiba történt az adatlekérdezés során.";
            _this.selectedMovie.actors = [];
            people.cast.forEach(function (cast) { return _this.selectedMovie.actors.push(cast.person); });
        });
    };
    /*
    *   A böngészőben az actors/:id oldalra navigálja a felhasználót.
    */
    MoviePageComponent.prototype.goActorPage = function () {
        this.router.navigate(["/actors/" + this.selectedActor.ids.trakt]);
    };
    /*
    *   Aszinkron módon értéket ad a kapcsolódó filmek tömbjének
    *   majd kerekíti a filmek értékelését két tizedesjegy pontossággal
    *   Ha nem érkezett adat hibát dob.
    */
    MoviePageComponent.prototype.getRelatedMovies = function () {
        var _this = this;
        this.movieService.getRelatedMovies(this.selectedMovie.ids.trakt)
            .subscribe(function (movies) {
            if (!movies)
                throw "Hiba történt az adatlekérdezés során.";
            _this.relatedMovies = movies;
            _this.ratingRounding(_this.relatedMovies);
        });
    };
    /*
    *   Kerekítéshez használatos segédfüggvény, mely egy paraméterül
    *   kapott számot, a szintén paraméterül kapott pontossággal kerekíti.
    */
    MoviePageComponent.prototype.numberRounder = function (number, punctuality) {
        var power = Math.pow(10, punctuality);
        return Math.ceil(number * power) / power;
    };
    /*
    *   Ennek a függvénynek a segítségével a paraméterül adott
    *   filmeket tartalmazó tömb elemeinek értékelését két tizedesjegyre kerekíthetjük.
    */
    MoviePageComponent.prototype.ratingRounding = function (movies) {
        var _this = this;
        movies.forEach(function (movie) { return movie.rating = _this.numberRounder(movie.rating, 2); });
    };
    return MoviePageComponent;
}());
MoviePageComponent = __decorate([
    core_1.Component({
        selector: "movie-page",
        templateUrl: "./movie-page.component.html"
    }),
    __metadata("design:paramtypes", [movie_service_1.MovieService,
        person_service_1.PersonService,
        router_1.Router])
], MoviePageComponent);
exports.MoviePageComponent = MoviePageComponent;
//# sourceMappingURL=movie-page.component.js.map