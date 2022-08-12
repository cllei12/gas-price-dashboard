# gasoline_price



## **Architecture** 

![image-20220812142752481](https://s2.loli.net/2022/08/13/jbr2AfGOwVIo8U3.png)

## Dashboard Demo

![img](https://s2.loli.net/2022/08/13/vkMd859EUbecROp.png)

![img](https://s2.loli.net/2022/08/13/l7SWQXdOMmhaFHr.png)

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

## Get started

1. Install all dependency of 

    ```shell
    npm install
    ```

2. Create an `.env` file in `server` folder for connecting AWS RDS MySQL instance

    Note: you may have no access to our database. If you want more details about this step, feel free to contact me.

    ```
    PORT=
    HOST=
    DB_PORT=
    USERNAME=
    PASSWORD=
    DATABASE=
    ```

3. Go to `./server` and run the server

   ```shell
   npm start
   ```

4. Go to `./client` and open the front-end web

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
