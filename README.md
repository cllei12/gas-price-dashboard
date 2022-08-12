# dsci551_gasoline_price

<!-- 
This template: https://www.creative-tim.com/product/argon-dashboard-bs4

## How to create a new page

e.g. table

- `controllers/homeController.js`

  ```js
  const tableView =  (req, res, next) => {
      res.render('table');
  }

  module.exports = {
      ...,
      tableView
  }
  ``` 

- `routes/home-routes.js`

  ```js
  const {..., tableView} = require('../controllers/homeController');
  ...
  router.get('/table', tableView);
  ```

- `views`

  `views/table.ejs`: content (html format)
-->

## Require

**server**

```
>> npm list
./server
├── cors@2.8.5
├── dotenv@16.0.0
├── express@4.17.3
├── mysql@2.18.1
└── nodemon@2.0.15
```

**client**

All lib were loaded in index.html without build tools, like node.

- bootstrap5 
- bootstrap-select
- chart.js
<!-- - vue-multiselect -->

## Server API Explanation

http://localhost:4999/gasoline?desp=all&scope=cities&col=LosAngeles,NewYorkCity&start=2022-01-01&end=2022-01-31

- desp:
  - all: "gasoline"
  - mid: "midgrade"
  - pre: "premium"
  - reg: "regular"
- scope:
  - US
  - states
  - cities
- col:
  - states
    - California, Colorado, Florida, Massachusetts, Minnesota, NewYork, Ohio, Texas, Washington
  - cities
    - Chicago, Cleveland, Denver, Houston, LosAngeles, Miami, NewYorkCity, SanFrancisco, Seattle
- start
- end

<!-- ## Get started

```bash
# ./clent
npm start
``` -->