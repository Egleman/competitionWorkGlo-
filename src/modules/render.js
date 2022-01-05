import { getData } from './getData';
const render = () => {
    const table = document.querySelector('.table');
    const filter = document.querySelector('.filter');
    
    let newActors = {};
    
    class CardHero {
        constructor (element) {
            this.name = element.name;
            this.realName = element.realName;
            this.species = element.species;
            this.citizenship = element.citizenship;
            this.genger = element.genger;
            this.birthDay = element.birthDay;
            this.deathDay = element.deathDay;
            this.status = element.status;
            this.actors = element.actors;
            this.photo = element.photo;
            this.movies = element.movies ? element.movies.map(movie => movie.trim()) : [];
        }
    
        newCard() {
            const card = document.createElement('div');
            const imageDiv = document.createElement('div');
            const info = document.createElement('div');
    
            const name = document.createElement('p');
            const realName = document.createElement('p');
            const species = document.createElement('p');
            const citizenship = document.createElement('p');
            const gender = document.createElement('p');
            const birthDay = document.createElement('p');
            const deathDay = document.createElement('p');
            const status = document.createElement('p');
            const actors = document.createElement('p');
            const photo = document.createElement('img');
            const moviesAbout = document.createElement('p');
            const movies = document.createElement('ul');
    
            card.className = 'card';
            imageDiv.className = 'image';
            info.className = 'info';
    
            name.innerHTML = `<b>Name: </b>${this.name}`;
            realName.innerHTML = `${this.realName ? '<b>Real name: </b>' + this.realName : ''}`;
            species.innerHTML = `<b>Species: </b> ${this.species}`;
            citizenship.innerHTML = `${this.citizenship ? '<b>Citizenship: </b>' + this.citizenship : ''}`;
            gender.innerHTML = `<b>Gender: </b>${this.genger}`;
            birthDay.innerHTML = `${this.birthDay ? '<b>Birth day: </b>' + this.birthDay : ''}`;
            deathDay.innerHTML = `${this.deathDay ? '<b>Death day: </b>' + this.deathDay : ''}`;
            status.innerHTML = `<b>Status: </b> ${this.status}`;
            actors.innerHTML = `<b>Actors: </b> ${this.actors}`;
            photo.src = `./db/${this.photo ? this.photo : ''}`;
    
            imageDiv.append(photo);
            info.append(name);
            info.append(realName);
            info.append(species);
            info.append(citizenship);
            info.append(gender);
            info.append(birthDay);
            info.append(deathDay);
            info.append(status);
            info.append(actors);
    
            card.append(imageDiv);
            card.append(info);
    
            if (this.movies.length > 0) {
                moviesAbout.innerHTML = '<b>Movies:</b> ';
    
                this.movies.forEach(elem => {
                    const listItem = document.createElement('li');
    
                    listItem.textContent = elem;
    
                    movies.append(listItem);
                });
    
                info.appendChild(moviesAbout);
                info.appendChild(movies);
            }
            return card;
        }      
        checkMovie(filter = '') {
            if (filter === '') {
                return true;
            } else {
                return this.movies.filter(movie => movie === filter).length > 0;
            }
        }
    }
    
    const addHeroes = (movie = '') => {
        newActors.filter(cardHero => cardHero.checkMovie(movie))
        .forEach(cardHero => table.append(cardHero.newCard()));
    };
    
    const addMovie = () => {
        const allMovies = [];
        
        newActors.forEach((cardHero) => {
            cardHero.movies.forEach(movie => {
                if (allMovies.indexOf(movie) < 0) {
                    allMovies.push(movie);
                }
            });
        });

        allMovies.sort().forEach(movie => {
            const option = document.createElement('option');
    
            option.value = movie;
            option.textContent = movie;
    
            filter.append(option);
        });
    };   
     
    getData((data) => {
        newActors = data.map(item => new CardHero(item));
        addHeroes();
        addMovie();
    });

    filter.addEventListener('change', (e) => {
        table.textContent = '';
    
        addHeroes(e.target.value);
    });
};

export default render;
