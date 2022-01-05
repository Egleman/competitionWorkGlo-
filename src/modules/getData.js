const getData = (data) => {
    //const db = './db/dbHeroes.json';
    fetch('./db/dbHeroes.json')
    .then(response => {
        return response.json();
    })
    .then(data)
    .catch(err => {
        console.log(err, 'ошибка, файл не найден');
    });
};

export { getData };