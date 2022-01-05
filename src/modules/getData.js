const getData = (data) => {
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
