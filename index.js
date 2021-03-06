const express = require('express');
const path = require('path')
const app = express();

app.use(express.json());


// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


const casos = [
    {id: 1, n: 10, c: 2, m: 5, enroll: true},
    {id: 2, n: 12, c: 4, m: 4, enroll: false},
    {id: 3, n: 6, c: 2, m: 2, enroll: false}
];

app.get('/', (req, res) => {   
    res.send('Chocolate Feast Api');
});

app.get('/api/casos', (req, res) => {
    res.send(casos);
});
    

app.get('/api/casos/:id', (req, res) => {
    const caso = casos.find(c => c.id === parseInt(req.params.id));
    if (!caso) return res.status(404).send('Caso no encontrado');
    else res.send(caso);
})

app.post('/api/casos', (req,res) => {
    const caso = {
        id: casos.length + 1,
        n: req.body.n,
        c: req.body.c,
        m: req.body.m,
        enroll: (req.body.enroll == 'true')
    };

    casos.push(caso);
    res.send(caso);
})

app.delete('/api/casos/:id', (req, res) => {
    const caso = casos.find(c => c.id === parseInt(req.params.id));
    if(!caso) return res.status(404).send('Caso no encontrado');

    const index = casos.indexOf(caso);
    casos.splice(index, 1);
    res.send(caso);
})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Escuchando el puerto ${port}`));